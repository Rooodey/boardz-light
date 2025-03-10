"use client";

import { redirect } from "next/navigation";
import { useUserProfile } from "~/contexts/UserProfileContext";

export default function ProfileIndex() {
  const userProfile = useUserProfile();

  redirect(`/user/${userProfile.userName}/about`);
}
