"use client";

import { type ReactNode, useState } from "react";
import { UserProfileContext } from "./UserProfileContext";
import { type ExtendedUserProfileSelectType } from "~/server/db/types/user-types";

export default function UserProfileProvider({
  children,
  initialProfile,
}: {
  children: ReactNode;
  initialProfile: ExtendedUserProfileSelectType;
}) {
  const [profile, setProfile] =
    useState<ExtendedUserProfileSelectType>(initialProfile);
  return (
    <UserProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
}
