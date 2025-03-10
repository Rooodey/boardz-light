"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, forwardRef } from "react";
import { cn } from "~/lib/utils";

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

// forwardRef für die richtige Weitergabe des Ref
const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ href, children, className = "" }, ref) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    useEffect(() => {
      // Sicherstellen, dass ref.current existiert und richtig genutzt wird
      if (isActive && ref && typeof ref !== "function" && ref.current) {
        ref.current.scrollIntoView({
          behavior: "auto",
          inline: "nearest",
        });
      }
    }, [isActive, ref]);

    return (
      <Link href={href} legacyBehavior>
        <a
          ref={ref} // Ref wird hier korrekt weitergegeben
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
  },
);

// forwardRef benötigt eine Display-Name-Zuweisung für Debugging-Zwecke
NavLink.displayName = "NavLink";

export default NavLink;
