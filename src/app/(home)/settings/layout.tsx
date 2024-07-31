import { NavItem } from "@/app/(home)/settings/component/NavItem";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  // const pathname = usePathname();
  // const active = pathname === path;

  return (
    <div className="flex flex-col flex-1 overflow-hidden p-5 w-full">
      <Card className="flex bg-white w-full h-full overflow-hidden rounded-md flex-col py-4">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between px-4">
            <h2 className="text-3xl font-bold">Settings</h2>
          </div>
          <nav className="flex w-full gap-5 border-b border-black text-md">
            <NavItem path={"/settings/profile"}>Profile</NavItem>
            <NavItem path={"/settings/password"}>Change Password</NavItem>
          </nav>
        </div>
        <div className="w-full flex-1 overflow-y-hidden">{children}</div>
      </Card>
    </div>
  );
}
