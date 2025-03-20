"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Typography } from "~/components/typography";
import { useSession } from "next-auth/react";
import SignOutButton from "~/components/signout-button";
import { Button } from "~/components/ui/button";

export default function TopNav() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="border-b border-border p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Typography variant={"h2"} className="text-primary">
            bordz
          </Typography>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-6 md:flex">
          {session ? (
            <SignOutButton>Sign Out</SignOutButton>
          ) : (
            <>
              <Link href="/events" className="text-lg hover:text-foreground/70">
                Events
              </Link>
              <Button asChild>
                <Link href="/login" onClick={closeMenu}>
                  Login
                </Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Navigation Button */}
        {session ? (
          <SignOutButton className="md:hidden">Sign Out</SignOutButton>
        ) : (
          <button onClick={toggleMenu} className="relative z-50 md:hidden">
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        )}
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

        <Button className="w-full max-w-[80%]" asChild>
          <Link href="/login" onClick={closeMenu}>
            Login
          </Link>
        </Button>
      </motion.div>
    </nav>
  );
}
