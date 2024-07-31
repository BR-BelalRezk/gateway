import type { AuthOptions, DefaultSession } from "next-auth";
import type { Provider } from "next-auth/providers";
import CredentialsProvider from "next-auth/providers/credentials";

import { WEBAPP_URL } from "@/lib/constants";
import { defaultCookies } from "@/lib/default-cookies";

import { ErrorCode } from "@/lib/ErrorCode";

export interface GatewayUser {
  id: string;
  name: string;
  image: string;
  email: string;
  branchId: string;
  timeZone: string;
  role: string;
  token: string;
  needToChangePassword:boolean;
}

export interface GatewaySession extends DefaultSession {
  user: GatewayUser;
}

const providers: Provider[] = [
  CredentialsProvider({
    id: "credentials",
    name: "Gateway",
    type: "credentials",
    credentials: {
      username: {
        label: "Username",
        type: "text",
        placeholder: "john.doe",
      },
      password: {
        label: "Password",
        type: "password",
        placeholder: "Your super secure password",
      },
    },
    async authorize(credentials) {
      if (!credentials) {
        console.error(`For some reason credentials are missing`);
        throw new Error(ErrorCode.InternalServerError);
      }

      const signInResponse = await fetch(`${process.env.API_URL}/api/Authenticate/login`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      }).catch((error) => {
        console.error("cached error", error);
        throw new Error(ErrorCode.InternalServerError);
      });

      // Don't leak information about it being username or password that is invalid
      if (!signInResponse.ok) {
        console.error(
          "signInResponse",
          signInResponse.status,
          await signInResponse.json()
        );

        throw new Error(ErrorCode.IncorrectUsernamePassword);
      }

      const signInData = await signInResponse.json();

      if (!signInData) {
        throw new Error(ErrorCode.IncorrectUsernamePassword);
      }

      const meResponse = await fetch(
        `${process.env.API_URL}/api/Authenticate/myInformation`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${signInData.token}`,
          },
        }
      ).catch((error) => {
        console.error("cached error", error);
        throw new Error(ErrorCode.InternalServerError);
      });

      // Don't leak information about it being username or password that is invalid
      if (!meResponse.ok) {
        console.error("meResponse", meResponse.status, await meResponse.json());

        throw new Error(ErrorCode.IncorrectUsernamePassword);
      }

      const meData = await meResponse.json();

      if (!meData) {
        throw new Error(ErrorCode.IncorrectUsernamePassword);
      }
      //console.log("##@$#@$#@$@#$")
      //console.log(signInData.needToChangePassword)
      return {
        id: meData.user.id,
        name: meData.user.userName,
        image: meData.user.image,
        email: meData.user.email,
        branchId: meData.user.branchId,
        timeZone: meData.user.timeZone,
        role: meData.role,
        token: signInData.token,
        needToChangePassword:signInData.needToChangePassword
      };
    },
  }),
];

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  cookies: defaultCookies(WEBAPP_URL?.startsWith("https://")),
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify",
  },
  providers,
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      if (trigger === "update") {
        token.token = session?.token ?? token.token;
        token.name = session?.name ?? token.name;
        token.email = session?.email ?? token.email;
        token.timeZone = session?.timeZone ?? token.timeZone;
        token.needToChangePassword = session?.needToChangePassword ?? token.needToChangePassword;

        return token;
      }

      // if account is null this means this is not the first time this callback is run
      // so we should just return the token as is
      if (!account) {
        return token;
      }

      const gatewayUser = user as GatewayUser;
      // any other credentials, add user info
      return {
        ...token,
        id: gatewayUser.id,
        name: gatewayUser.name,
        image: gatewayUser.image,
        email: gatewayUser.email,
        branchId: gatewayUser.branchId.toString(),
        timeZone: gatewayUser.timeZone,
        role: gatewayUser.role,
        token: gatewayUser.token,
        needToChangePassword:gatewayUser.needToChangePassword
      };
    },

    async session({ session, token }) {
      const gatewaySession: GatewaySession = {
        ...session,
        user: {
          id: token.id as string,
          name: token.name as string,
          image: token.image as string,
          email: token.email as string,
          branchId: (token.branchId as number).toString(),
          timeZone: token.timeZone as string,
          role: token.role as string,
          token: token.token as string,
          needToChangePassword:token.needToChangePassword as boolean
        },
      };
      return gatewaySession;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same domain
      else if (new URL(url).hostname === new URL(WEBAPP_URL).hostname)
        return url;
      return baseUrl;
    },
  },
};
