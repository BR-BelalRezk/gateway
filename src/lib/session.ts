import { getServerSession } from "next-auth/next";

import { GatewaySession, authOptions } from "@/lib/auth";
import { AuthOptions } from "next-auth";

export async function getCurrentUser() {
  const session = await getServerSession<AuthOptions, GatewaySession>(authOptions);

  return session?.user;
}
