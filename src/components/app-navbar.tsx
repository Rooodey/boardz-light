"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Home, Search, PlusCircle, UsersRound } from "lucide-react"; // Icons
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import type { DefaultSession } from "next-auth";
import { signOut } from "next-auth/react";

export default function AppNavbar() {
  const { data: session } = useSession();

  return (
    <>
      {/* Desktop Sidebar (sichtbar ab md:) */}
      <nav className="fixed left-0 top-0 hidden h-full w-64 flex-col items-start border-r bg-white p-6 shadow-md md:flex">
        <h1 className="mb-6 text-xl">BOARDZ</h1>
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
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      </nav>

      {/* Mobile Bottom Navbar (sichtbar bis md:) */}
      <nav className="fixed bottom-0 left-0 w-full border-t bg-white shadow-md md:hidden">
        <div className="flex justify-around py-3">
          <NavItem href="/" icon={<Home size={28} />} />
          <NavItem href="/search" icon={<Search size={28} />} />
          <NavItem href="/events" icon={<PlusCircle size={28} />} />
          <NavItem href="/groups" icon={<UsersRound size={28} />} />
          <Link href="/profile">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={session?.user?.image ?? "/default-avatar.png"}
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </nav>
    </>
  );
}

/* Komponenten für Navbar-Items */
function NavItem({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-700 hover:text-black">
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
      className="flex items-center space-x-3 text-gray-700 hover:text-black"
    >
      {icon}
      <span className="text-lg">{label}</span>
    </Link>
  );
}

function AvatarIcon({ session }: { session: DefaultSession | null }) {
  return (
    <Avatar className="h-6 w-6">
      <AvatarImage src={session?.user?.image ?? "/default-avatar.png"} />
      <AvatarFallback>U</AvatarFallback>
    </Avatar>
  );
}
