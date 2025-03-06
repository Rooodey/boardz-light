"use client";

import { Button } from "~/components/ui/button";
import { signIn } from "next-auth/react";
import { cn } from "~/lib/utils";
import type { VariantProps } from "class-variance-authority";
import type { buttonVariants } from "~/components/ui/button";

interface SignInButtonProps extends VariantProps<typeof buttonVariants> {
  provider: "discord" | "google" | "apple";
  className?: string;
}

export default function SignInButton({
  provider,
  variant = "outline",
  className,
}: SignInButtonProps) {
  const providerInfo: Record<string, { name: string; icon: JSX.Element }> = {
    discord: {
      name: "Discord",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515c-.211.375-.404.76-.577 1.152a18.123 18.123 0 0 0-5.71 0c-.173-.392-.366-.777-.577-1.152A19.785 19.785 0 0 0 3.683 4.37c-3.087 4.67-3.93 9.23-3.515 13.717A19.858 19.858 0 0 0 7.07 22.94a14.073 14.073 0 0 0 1.183-1.934 12.772 12.772 0 0 1-1.867-.892c.155-.11.305-.226.451-.347 3.625 1.68 7.547 1.68 11.172 0 .146.121.296.237.451.347a12.65 12.65 0 0 1-1.866.892c.352.677.747 1.32 1.183 1.934a19.88 19.88 0 0 0 6.902-4.853c.429-4.487-.426-9.047-3.518-13.718zM8.043 15.178c-1.201 0-2.185-1.108-2.185-2.478s.955-2.49 2.185-2.49c1.232 0 2.195 1.12 2.172 2.49 0 1.37-.94 2.478-2.172 2.478zm7.914 0c-1.201 0-2.185-1.108-2.185-2.478s.955-2.49 2.185-2.49c1.232 0 2.195 1.12 2.172 2.49 0 1.37-.94 2.478-2.172 2.478z" />
        </svg>
      ),
    },
    google: {
      name: "Google",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    apple: {
      name: "Apple",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
            fill="currentColor"
          />
        </svg>
      ),
    },
  };

  const providerData = providerInfo[provider];

  const options = { callbackUrl: "/" };
  const authorizationParams =
    provider === "google" ? { prompt: "select_account" } : {};

  return (
    <Button
      variant={variant}
      className={cn("w-full", className)}
      onClick={() => signIn(provider, options, authorizationParams)}
    >
      {providerData?.icon}
      Login with {providerData?.name}
    </Button>
  );
}
