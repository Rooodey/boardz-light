import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";
import React from "react";

const typographyVariants = cva("text-card-foreground", {
  variants: {
    variant: {
      h1: "text-4xl tracking-wide sm:text-6xl md:text-7xl lg:text-8xl",
      h2: "text-3xl sm:text-4xl",
      h3: "text-2xl sm:text-3xl",
      h4: "text-xl sm:text-2xl",
      h5: "text-l sm:text-xl",
      p: "text-base text-muted-foreground",
      small: "text-sm text-muted-foreground",
      muted: "text-sm text-muted",
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
            : variant === "h5"
              ? "h5"
              : "p";

  return (
    <Tag
      className={cn(typographyVariants({ variant }), className)}
      {...props}
    />
  );
}
