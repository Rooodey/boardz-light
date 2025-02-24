"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      className="flex items-center space-x-3 text-gray-700 hover:text-black"
      onClick={() => signOut()}
    >
      <LogOut size={24} />
      <span className="text-lg">Sign Out</span>
    </button>
  );
}
