"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Typography } from "~/components/typography";

interface AppHeaderProps {
  title: string;
  children: React.ReactNode;
}

export default function AppHeader({ title, children }: AppHeaderProps) {
  const router = useRouter();

  return (
    <>
      <div className="fixed top-0 z-50 flex h-12 w-full -translate-x-4 items-center justify-center border-b border-border bg-white md:h-16 md:max-w-2xl md:-translate-x-6">
        <button
          onClick={() => router.back()}
          className="absolute left-0 top-6 -translate-y-[50%] pl-2 md:top-8 md:pl-4"
        >
          <ChevronLeft size={32} />
        </button>
        <Typography variant="h3">{title}</Typography>
      </div>

      <div className="pt-12 md:pt-16">{children}</div>
    </>
  );
}
