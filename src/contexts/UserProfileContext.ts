"use client";

import type { ExtendedUserProfile } from "./../server/db/schemas/user-profiles";
import { createContext, useContext } from "react";

interface UserProfileContextProps {
  profile: ExtendedUserProfile | null;
  setProfile: React.Dispatch<React.SetStateAction<ExtendedUserProfile>>;
}

export const UserProfileContext = createContext<
  UserProfileContextProps | undefined
>(undefined);

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return context;
}
