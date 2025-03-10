"use client";

import { cn } from "~/lib/utils";

export interface SpinnerProps {
  classNames?: {
    root?: string;
    label?: string;
  };
  label?: string;
}

export default function Spinner({ classNames, label }: SpinnerProps) {
  return (
    <div className={cn("flex items-center justify-center", classNames?.root)}>
      <div
        className={cn(
          "animate-spin rounded-full border-4 border-solid border-current border-t-transparent",
          "h-8 w-8 text-primary",
        )}
      />
      {label && <span className={cn("ml-2", classNames?.label)}>{label}</span>}
    </div>
  );
}
