"use client";

import { ReactNode, useState } from "react";
import { UserProfileContext } from "./UserProfileContext";
import type { ExtendedUserProfile } from "~/server/db/schemas/user-profiles";

export default function UserProfileProvider({
  children,
  initialProfile,
}: {
  children: ReactNode;
  initialProfile: ExtendedUserProfile;
}) {
  const [profile, setProfile] = useState<ExtendedUserProfile>(initialProfile);
  return (
    <UserProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
}
