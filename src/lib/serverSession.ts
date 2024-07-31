import { AuthOptions, getServerSession } from "next-auth";
import { GatewaySession, GatewayUser, authOptions } from "./auth";

export async function getServerUser(): Promise<GatewayUser | undefined> {
  const session = await getServerSession<AuthOptions, GatewaySession>(
    authOptions
  );

  if (session?.user) {
    return session?.user as GatewayUser;
  } else return undefined;
}
