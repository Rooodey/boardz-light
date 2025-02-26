"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export default function TopNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="border-b border-border p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl text-primary">
          BOARDZ
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-6 md:flex">
          <Link href="/events" className="text-lg hover:text-foreground/70">
            Events
          </Link>
          <Link
            href="/login"
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          >
            Login
          </Link>
        </div>

        {/* Mobile Navigation Button */}
        <button onClick={toggleMenu} className="relative z-50 md:hidden">
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Fullscreen Mobile Menu */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: isOpen ? "0%" : "100%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`fixed inset-0 z-50 flex flex-col items-center justify-around bg-background/90 text-2xl backdrop-blur-lg md:hidden`}
      >
        <div className="flex flex-col items-center space-y-8">
          <Link href="/" className="text-4xl" onClick={closeMenu}>
            Home
          </Link>
          <Link href="/events" className="text-4xl" onClick={closeMenu}>
            Events
          </Link>
        </div>

        <Link
          href="/login"
          className="block w-full max-w-[80%] rounded-md bg-primary px-6 py-3 text-center text-primary-foreground hover:bg-primary/90"
          onClick={closeMenu}
        >
          Login
        </Link>
      </motion.div>
    </nav>
  );
}
