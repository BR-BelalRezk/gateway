import React, { ReactNode } from "react";
import { SidebarContent } from "@/components/sidebar-content";
import { Menu } from "lucide-react";
import { UserNav } from "@/components/user-nav";
import { NotificationNav } from "@/components/notification-nav";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { TopNavbarSearch } from "@/components/top-navbar-search";
import ThemeModeToggle from "@/components/ThemeModeToggle";

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <SidebarContent className="hidden lg:flex" />

      <div className="flex flex-col h-full flex-1 overflow-hidden">
        <div className="w-full h-16 bg-white dark:bg-gray-950 border-b border-[rgb(239, 243, 244)] flex items-center justify-between px-5">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="block lg:hidden">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side={"left"}>
              <SidebarContent className="w-full border-none" />
            </SheetContent>
          </Sheet>
          <div className="text-lg font-semibold">Dashboard</div>
          <div className="flex flex-row items-center gap-4">
            <TopNavbarSearch />
            <NotificationNav />
            <UserNav />
            <ThemeModeToggle />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
