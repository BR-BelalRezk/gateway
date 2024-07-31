"use client";

import { NavItem } from "./NavItem";
import Image from "next/image";
import {
  Home,
  List,
  LucideIcon,
  Settings,
  UserIcon,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { User } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/providers/user";
// import logo from "../../public/logo.png";

export interface LinkItemProps {
  name: string;
  icon: LucideIcon;
  path: string;
}

interface SidebarProps {
  className: string;
}

export const SidebarContent = ({ className }: SidebarProps) => {
  const { user } = useUser();

  const canManageUsers = ["Manager", "SuperManager"].includes(user.role);

  return (
    <div
      className={cn(
        "flex w-[16rem] bg-white dark:bg-gray-950 flex-col h-full overflow-hidden border-r border-[rgb(239, 243, 244)] text-black dark:text-white",
        className
      )}
    >
      <div className="h-16 px-8 py-10 flex items-center justify-center text-2xl font-bold text-hussein w-full">
        {/* <Image src={logo} alt="logo" /> */}
        Gateway
      </div>
      <div className="flex flex-col items-center py-6 overflow-hidden">
        <div className="w-full max-w-[255px] px-9">
          <Avatar className="h-44 w-44">
            <AvatarImage src={user.image} alt="User Avatar" />
            <AvatarFallback>
              <span className="sr-only">{user.name}</span>
              <UserIcon className="h-28 w-28" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-1 overflow-auto">
        <NavItem icon={Home} path="/">
          Home
        </NavItem>
        {canManageUsers ? (
          <NavItem icon={Users} path="/users">
            Users
          </NavItem>
        ) : null}
        {canManageUsers ? (
          <NavItem icon={Users} path="/trainees">
            Trainees
          </NavItem>
        ) : null}
        <NavItem icon={List} path="/hold-list">
          Hold List
        </NavItem>
        <NavItem icon={List} path="/wait-list">
          Wait List
        </NavItem>
        <NavItem icon={List} path="/batches">
          Batches
        </NavItem>
        <NavItem icon={List} path="/pending-test">
          Pending Test List
        </NavItem>
      </div>
      <div className="flex flex-col border-t overflow-hidden py-2">
        <NavItem key={"Settings"} icon={Settings} path={"/settings"}>
          {"Settings"}
        </NavItem>
      </div>
    </div>
  );
};
