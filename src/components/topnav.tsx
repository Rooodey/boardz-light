"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function TopNav() {
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
          <Link href="/events" className="hover:text-gray-400">
            Events
          </Link>
          <Link
            href="/login"
            className="rounded-md bg-blue-600 px-4 py-2 hover:bg-blue-700"
          >
            Login
          </Link>
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
          <Link href="/events" className="block hover:text-gray-400">
            Events
          </Link>
          <Link
            href="/login"
            className="block rounded-md bg-blue-600 px-4 py-2 hover:bg-blue-700"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
