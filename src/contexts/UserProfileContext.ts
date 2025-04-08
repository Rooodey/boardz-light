"use client";

import { createContext, useContext } from "react";
import { ExtendedUserProfileSelectType } from "~/server/db/types/user-types";

interface UserProfileContextProps {
  profile: ExtendedUserProfileSelectType | null;
  setProfile: React.Dispatch<
    React.SetStateAction<ExtendedUserProfileSelectType>
  >;
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
