"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Typography } from "~/components/typography";

interface AppHeaderProps {
  title: string;
  children: React.ReactNode; // 🔹 children als Prop hinzufügen
}

export default function AppHeader({ title, children }: AppHeaderProps) {
  const router = useRouter();

  return (
    <>
      <div className="fixed top-0 z-50 flex h-12 w-full max-w-lg -translate-x-4 items-center justify-center border-b border-border bg-white sm:-translate-x-6">
        <button onClick={() => router.back()} className="absolute left-0 p-2">
          <ChevronLeft size={24} />
        </button>
        <Typography variant="h4">{title}</Typography>
      </div>

      <div className="pt-12">{children}</div>
    </>
  );
}
