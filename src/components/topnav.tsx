"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X } from "lucide-react"; // Icons für das Menü
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export default function TopNav() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 p-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl">
          BOARDZ
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-6 md:flex">
          <Link href="/about" className="hover:text-gray-400">
            About
          </Link>
          {session && (
            <Link href="/dashboard" className="hover:text-gray-400">
              Dashboard
            </Link>
          )}

          {/* Auth Section */}
          <div className="flex items-center justify-center space-x-4">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex flex-row items-center gap-2">
                    {session.user?.name}
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={session.user?.image ?? "/default-avatar.png"}
                      />
                      <AvatarFallback>
                        {session.user?.name?.charAt(0) ?? "U"}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    {session.user?.name ?? "User"}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/login"
                className="rounded-md bg-blue-600 px-4 py-2 hover:bg-blue-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mt-4 space-y-2 text-center md:hidden">
          <Link href="/" className="block hover:text-gray-400">
            Home
          </Link>
          <Link href="/about" className="block hover:text-gray-400">
            About
          </Link>
          {session && (
            <Link href="/dashboard" className="block hover:text-gray-400">
              Dashboard
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
