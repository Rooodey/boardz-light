"use client";

import { ChevronLeft, Menu } from "lucide-react";
import type { DefaultSession } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Typography } from "~/components/typography";
import type { ExtendedUserProfile } from "~/server/db/schemas/user-profiles";

interface ProfileProps {
  profile: ExtendedUserProfile;
  session?: DefaultSession;
  children?: React.ReactNode;
}

export default function ProfileHeader({
  profile,
  session,
  children,
}: ProfileProps) {
  const router = useRouter();
  return (
    <>
      {session?.user?.id === profile.userId ? (
        <>
          <div className="fixed top-0 z-50 flex h-12 w-full max-w-xl -translate-x-4 items-center justify-center border-b border-border md:h-16 md:-translate-x-6">
            <Typography
              variant="h3"
              className="absolute left-0 top-6 -translate-y-[50%] pl-4 md:top-8 md:pl-6"
            >
              {profile?.userName}
            </Typography>
            <Link
              href="/settings"
              className="absolute right-0 top-6 -translate-y-[50%] pr-4 md:top-8 md:pr-6"
            >
              <Menu size={28} />
            </Link>
          </div>
          <div className="-m-4 mb-1 h-12 md:-m-6 md:mb-1 md:h-16"></div>
        </>
      ) : (
        <>
          <div className="fixed top-0 z-50 flex h-12 w-full max-w-xl -translate-x-4 items-center justify-center border-b border-border md:h-16 md:-translate-x-6">
            <button
              onClick={() => router.back()}
              className="absolute left-0 top-6 -translate-y-[50%] pl-2 md:top-8 md:pl-4"
            >
              <ChevronLeft size={32} />
            </button>
            <Typography variant="h3">{profile?.userName}</Typography>
          </div>
          <div className="-m-4 mb-1 h-12 md:-m-6 md:mb-1 md:h-16"></div>
        </>
      )}
    </>
  );
}
