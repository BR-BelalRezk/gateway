import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  icon: LucideIcon;
  path: string;
  children: string;
}
export const NavItem = ({ icon: Icon, path, children }: NavItemProps) => {
  const pathname = usePathname();
  const active = pathname === path;

  return (
    <Link href={path} className="no-underline focus:shadow-none">
      <div
        className={cn(
          "group flex items-center mx-4 px-3 py-3 rounded-lg font-semibold hover:text-hussein hover:bg-gray-100 dark:hover:bg-gray-900",
          active
            ? " bg-gray-100 dark:bg-gray-900 text-hussein"
            : "text-black dark:text-white"
        )}
      >
        {Icon && <Icon className="me-4" size={22} />}
        {children}
      </div>
    </Link>
  );
};
