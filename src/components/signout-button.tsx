"use client";

import { signOut } from "next-auth/react";
import { type ReactNode } from "react";
import { Button, type ButtonProps } from "~/components/ui/button";

interface SignOutButtonProps extends ButtonProps {
  children?: ReactNode;
}

export default function SignOutButton({
  children = "Sign Out",
  ...props
}: SignOutButtonProps) {
  return (
    <Button {...props} onClick={() => signOut()}>
      {children}
    </Button>
  );
}
