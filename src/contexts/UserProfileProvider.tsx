"use client";

import { UserProfileContext } from "./UserProfileContext";
import type { ExtendedUserProfile } from "~/server/db/schemas/user-profiles";

interface UserProfileProviderProps {
  userProfile: ExtendedUserProfile;
  children: React.ReactNode;
}

export default function UserProfileProvider({
  userProfile,
  children,
}: UserProfileProviderProps) {
  return (
    <UserProfileContext.Provider value={userProfile}>
      {children}
    </UserProfileContext.Provider>
  );
}
