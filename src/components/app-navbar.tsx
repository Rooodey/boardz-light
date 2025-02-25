"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Home, Search, PlusCircle, UsersRound, LogOut } from "lucide-react"; // Icons
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import type { DefaultSession } from "next-auth";
import { signOut } from "next-auth/react";

export default function AppNavbar() {
  const { data: session } = useSession();

  return (
    <>
      {/* Desktop Sidebar (sichtbar ab md:) */}
      <nav className="fixed left-0 top-0 hidden h-full w-64 flex-col items-start border-r p-6 shadow-md md:flex">
        <h1 className="mb-6 text-xl">BOARDZ</h1>
        <div className="flex h-full flex-col justify-between">
          <div className="flex flex-col space-y-4">
            <SidebarItem href="/" icon={<Home size={24} />} label="Home" />
            <SidebarItem
              href="/search"
              icon={<Search size={24} />}
              label="Search"
            />
            <SidebarItem
              href="/events"
              icon={<PlusCircle size={24} />}
              label="Events"
            />
            <SidebarItem
              href="/groups"
              icon={<UsersRound size={24} />}
              label="Groups"
            />
            <SidebarItem
              href="/profile"
              icon={<AvatarIcon session={session} />}
              label="Profile"
            />
          </div>
          <div>
            <button
              className="flex items-center space-x-3 text-gray-500 hover:text-black"
              onClick={() => signOut()}
            >
              <LogOut size={24} />
              <span className="text-lg">Sign Out</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navbar (sichtbar bis md:) */}
      <nav className="fixed bottom-0 left-0 z-50 w-full border-t shadow-md md:hidden">
        <div className="flex items-center justify-around py-3">
          <NavItem href="/" icon={<Home size={28} />} />
          <NavItem href="/search" icon={<Search size={28} />} />
          <NavItem href="/events" icon={<PlusCircle size={28} />} />
          <NavItem href="/groups" icon={<UsersRound size={28} />} />
          <NavItem
            href="/profile"
            icon={<AvatarIcon session={session} className="h-7 w-7" />}
          />
        </div>
      </nav>
    </>
  );
}

/* Komponenten für Navbar-Items */
function NavItem({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-500 hover:text-black">
      {icon}
    </Link>
  );
}

function SidebarItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center space-x-3 text-gray-500 hover:text-black"
    >
      {icon}
      <span className="text-lg">{label}</span>
    </Link>
  );
}

function AvatarIcon({
  session,
  className = "h-6 w-6",
}: {
  session: DefaultSession | null;
  className?: string;
}) {
  return (
    <Avatar className={className}>
      <AvatarImage
        src={session?.user?.image ?? "/default-avatar.png"}
        alt="User avatar"
        onError={(e) => (e.currentTarget.src = "/default-avatar.png")}
      />
      <AvatarFallback>
        {session?.user?.name?.charAt(0).toUpperCase() ?? "U"}
      </AvatarFallback>
    </Avatar>
  );
}
