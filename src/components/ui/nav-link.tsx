"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function NavLink({
  href,
  children,
  className = "",
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} legacyBehavior>
      <a
        className={cn(
          "whitespace-nowrap pb-2 transition-colors",
          isActive
            ? "z-50 border-b border-primary font-semibold text-primary"
            : "text-muted-foreground",
          className,
        )}
      >
        {children}
      </a>
    </Link>
  );
}
