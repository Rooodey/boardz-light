"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { signOut } from "next-auth/react";
import { Typography } from "~/components/typography";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  TrophyIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  TrophyIcon as TrophyIconSolid,
  UserGroupIcon as UserGroupIconSolid,
} from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { LogOut } from "lucide-react";
import { useUserProfile } from "~/contexts/UserProfileContext";

export default function AppNavbar() {
  return (
    <>
      {/* Desktop Sidebar (sichtbar ab md:) */}
      <nav className="fixed left-0 top-0 hidden h-full w-64 flex-col items-start border-r p-6 shadow-md md:flex">
        <Typography variant={"h3"} className="mb-6 text-primary">
          bordz
        </Typography>
        <div className="flex h-full flex-col justify-between">
          <div className="flex flex-col space-y-4">
            <SidebarItem
              href="/"
              icon={
                <HomeIcon
                  className="h-6 w-6 text-muted-foreground"
                  style={{ strokeWidth: 1.5 }}
                />
              }
              iconActive={
                <HomeIconSolid
                  className="h-6 w-6 text-accent"
                  style={{ strokeWidth: 1.5 }}
                />
              }
              label="Home"
            />
            <SidebarItem
              href="/search"
              icon={
                <MagnifyingGlassIcon
                  className="h-6 w-6 text-muted-foreground"
                  style={{ strokeWidth: 1.5 }}
                />
              }
              iconActive={
                <MagnifyingGlassIcon
                  className="h-6 w-6 text-accent"
                  style={{ strokeWidth: 2 }}
                />
              }
              label="Search"
            />
            <SidebarItem
              href="/events"
              icon={
                <TrophyIcon
                  className="h-6 w-6 text-muted-foreground"
                  style={{ strokeWidth: 1.5 }}
                />
              }
              iconActive={
                <TrophyIconSolid
                  className="h-6 w-6 text-accent"
                  style={{ strokeWidth: 1.5 }}
                />
              }
              label="Events"
            />
            <SidebarItem
              href="/groups"
              icon={
                <UserGroupIcon
                  className="h-6 w-6 text-muted-foreground"
                  style={{ strokeWidth: 1.5 }}
                />
              }
              iconActive={
                <UserGroupIconSolid
                  className="h-6 w-6 text-accent"
                  style={{ strokeWidth: 1.5 }}
                />
              }
              label="Groups"
            />
            <SidebarItem
              href="/profile"
              icon={<AvatarIcon />}
              iconActive={<AvatarIcon />}
              label="Profile"
            />
          </div>
          <div>
            <button
              className="flex items-center space-x-3 hover:text-foreground/70"
              onClick={() => signOut()}
            >
              <LogOut size={24} />
              <span className="text-lg">Sign Out</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navbar (sichtbar bis md:) */}
      <nav className="fixed bottom-0 left-0 z-50 h-14 w-full border-t bg-white shadow-md md:hidden">
        <div className="flex items-center justify-around py-3">
          <NavItem
            href="/"
            icon={
              <HomeIcon
                className="h-7 w-7 text-muted-foreground"
                style={{ strokeWidth: 1.5 }}
              />
            }
            iconActive={
              <HomeIconSolid
                className="h-7 w-7 text-accent"
                style={{ strokeWidth: 1.5 }}
              />
            }
          />
          <NavItem
            href="/search"
            icon={
              <MagnifyingGlassIcon
                className="h-7 w-7 text-muted-foreground"
                style={{ strokeWidth: 1.5 }}
              />
            }
            iconActive={
              <MagnifyingGlassIcon
                className="h-7 w-7 text-accent"
                style={{ strokeWidth: 1.5 }}
              />
            }
          />
          <NavItem
            href="/events"
            icon={
              <TrophyIcon
                className="h-7 w-7 text-muted-foreground"
                style={{ strokeWidth: 1.5 }}
              />
            }
            iconActive={
              <TrophyIconSolid
                className="h-7 w-7 text-accent"
                style={{ strokeWidth: 2 }}
              />
            }
          />
          <NavItem
            href="/groups"
            icon={
              <UserGroupIcon
                className="h-7 w-7 text-muted-foreground"
                style={{ strokeWidth: 1.5 }}
              />
            }
            iconActive={
              <UserGroupIconSolid
                className="h-7 w-7 text-accent"
                style={{ strokeWidth: 1.5 }}
              />
            }
          />
          <NavItem
            href="/profile"
            icon={<AvatarIcon className="h-7 w-7" />}
            iconActive={
              <AvatarIcon className="h-7 w-7 border-2 border-accent" />
            }
          />
        </div>
      </nav>
    </>
  );
}

/* Komponenten für Navbar-Items */
function NavItem({
  href,
  icon,
  iconActive,
}: {
  href: string;
  icon: React.ReactNode;
  iconActive: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link href={href} className="hover:text-accent">
      {isActive ? iconActive : icon}
    </Link>
  );
}

function SidebarItem({
  href,
  icon,
  iconActive,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  iconActive: React.ReactNode;
  label: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`flex items-center space-x-3 hover:text-accent ${isActive ? "text-accent" : "text-muted-foreground"}`}
    >
      {isActive ? iconActive : icon}
      <span className="text-lg">{label}</span>
    </Link>
  );
}

function AvatarIcon({ className = "h-6 w-6" }: { className?: string }) {
  const { profile } = useUserProfile();

  return (
    <Avatar className={className}>
      <AvatarImage
        src={profile?.image ?? "/default-avatar.png"}
        alt="User avatar"
        onError={(e) => (e.currentTarget.src = "/default-avatar.png")}
      />
      <AvatarFallback>
        {profile?.userName?.charAt(0).toUpperCase() ?? "U"}
      </AvatarFallback>
    </Avatar>
  );
}
