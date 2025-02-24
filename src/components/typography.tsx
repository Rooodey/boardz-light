import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";
import React from "react";

const typographyVariants = cva("text-card-foreground font-semibold", {
  variants: {
    variant: {
      h1: "text-4xl font-extrabold tracking-tight sm:text-5xl",
      h2: "text-3xl font-bold tracking-tight sm:text-4xl",
      h3: "text-2xl font-semibold tracking-tight sm:text-3xl",
      h4: "text-xl font-semibold sm:text-2xl",
      p: "text-base text-muted-foreground",
      small: "text-sm text-muted-foreground",
      muted: "text-sm text-gray-500",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

interface TypographyProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof typographyVariants> {}

export function Typography({ variant, className, ...props }: TypographyProps) {
  const Tag =
    variant === "h1"
      ? "h1"
      : variant === "h2"
        ? "h2"
        : variant === "h3"
          ? "h3"
          : variant === "h4"
            ? "h4"
            : "p";

  return (
    <Tag
      className={cn(typographyVariants({ variant }), className)}
      {...props}
    />
  );
}
