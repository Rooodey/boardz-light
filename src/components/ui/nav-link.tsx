"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Typography } from "~/components/typography";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (isActive && linkRef.current) {
      // Scrollt den Link in den sichtbaren Bereich, z.B. zentriert ihn horizontal
      linkRef.current.scrollIntoView({
        behavior: "auto",
        inline: "center",
        block: "nearest",
      });
    }
  }, [isActive]);

  return (
    <Link
      href={href}
      ref={linkRef}
      className={`${isActive ? "z-50 border-b border-primary" : ""} pb-2`}
    >
      <Typography
        className={`${isActive ? "font-semibold text-primary" : ""} whitespace-nowrap`}
      >
        {children}
      </Typography>
    </Link>
  );
}
