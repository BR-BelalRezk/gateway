import "./globals.css";
import { Inter } from "next/font/google";

import { NextAuthProvider } from "@/providers/next-auth";
import { getServerSession } from "next-auth/next";
import { GatewaySession, authOptions } from "@/lib/auth";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/providers/user";
import { AuthOptions } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gateway",
  description: "Gateway english community",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession<AuthOptions, GatewaySession>(
    authOptions
  );

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextAuthProvider session={session}>
            <UserProvider user={session?.user}>{children}</UserProvider>
          </NextAuthProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
