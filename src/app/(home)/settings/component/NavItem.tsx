"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  path: string;
  children: string;
}
export const NavItem = ({ path, children }: NavItemProps) => {
  const pathname = usePathname();
  const active = pathname === path;

  return (
    <Link href={path} className="no-underline focus:shadow-none">
      <div
        className={cn(
          "py-3 px-5",
          active
            ? "border-b border-black font-bold bg-gray-50 text-hussein"
            : "text-black"
        )}
      >
        {children}
      </div>
    </Link>
  );
};
