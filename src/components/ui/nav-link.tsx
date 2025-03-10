"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
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
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (isActive && linkRef.current) {
      linkRef.current.scrollIntoView({
        behavior: "auto",
        inline: "nearest",
      });
    }
  }, [isActive]);

  return (
    <Link href={href} legacyBehavior>
      <a
        ref={linkRef}
        className={cn(
          "antialiased-text no-scroll-animation whitespace-nowrap pb-2 transition-colors",
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
