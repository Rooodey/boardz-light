"use client";

import type { ExtendedUserProfile } from "./../server/db/schemas/user-profiles";
import { createContext, useContext } from "react";

export const UserProfileContext = createContext<ExtendedUserProfile | null>(
  null,
);

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return context;
}
