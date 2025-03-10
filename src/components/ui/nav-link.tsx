"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { cn } from "~/lib/utils";

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

// forwardRef für die richtige Weitergabe des Ref
export default function NavLink({
  href,
  children,
  className = "",
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const navLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (
      isActive &&
      navLinkRef &&
      typeof navLinkRef !== "function" &&
      navLinkRef.current
    ) {
      navLinkRef.current.scrollIntoView({
        behavior: "auto",
        inline: "center",
      });
    }
  }, [isActive, navLinkRef]);

  return (
    <Link href={href} legacyBehavior>
      <a
        ref={navLinkRef}
        className={cn(
          "no-scroll-animation fix-ios-render whitespace-nowrap pb-2 transition-colors",
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
