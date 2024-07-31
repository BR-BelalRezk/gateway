import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getCurrentUser } from "./lib/session";
import { toast } from "./components/ui/use-toast";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const isAuth = !!token;
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/signin") ||
      req.nextUrl.pathname.startsWith("/forget-password");

    if (isAuthPage) {
      if (isAuth) {
        // let user = await getCurrentUser();
        // //console.log("user", user);
        //console.log("AUTH")
        return NextResponse.redirect(new URL("/", req.url));
      }
      
      return null;
    }
    
   
    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }
      
      

      return NextResponse.redirect(
        new URL(`/signin?from=${encodeURIComponent(from)}`, req.url)
      );
    }
    //console.log(token.needToChangePassword)
    if(token.needToChangePassword && req.nextUrl.pathname != "/settings/password"){
        return NextResponse.redirect(
        new URL(`/settings/password?state=first-signin&m=${Math.floor(100000 + Math.random() * 900000)}`, req.url)
      );
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/:path*"],
};
