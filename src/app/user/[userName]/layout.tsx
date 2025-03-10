import { notFound } from "next/navigation";
import { db } from "~/server/db";
import { userProfiles } from "~/server/db/schemas/user-profiles";
import { getUserByName } from "~/lib/user-service";
import AppContainer from "~/components/app-container";
import { Profile } from "~/components/profile";
import ProfileTabs, { type Tab } from "~/components/profile-tabs";
import React from "react";
import UserProfileProvider from "~/contexts/UserProfileProvider";

// Optional: Für statische Generierung aller User-Seiten
export async function generateStaticParams() {
  const allUsers = await db
    .select({ userName: userProfiles.userName })
    .from(userProfiles);
  return allUsers.map((user) => ({ userName: user.userName.toString() }));
}

interface UserPageProps {
  params: Promise<{ userName: string }>;
  children: React.ReactNode;
}

export default async function UserPage({ params, children }: UserPageProps) {
  const { userName } = await params;

  const userProfile = await getUserByName(userName);

  if (!userProfile) {
    return notFound();
  }
  const tabs: Tab[] = [
    { href: `/user/${userName}/about`, name: "About" },
    { href: `/user/${userName}/highscores`, name: "Highscores" },
    { href: `/user/${userName}/played`, name: "Played" },
    { href: `/user/${userName}/tables`, name: "Tables" },
    { href: `/user/${userName}/latest`, name: "Latest Events" },
  ];

  return (
    <UserProfileProvider userProfile={userProfile}>
      <AppContainer>
        <Profile profile={userProfile} />
        <ProfileTabs tabs={tabs} />
        {children}
      </AppContainer>
    </UserProfileProvider>
  );
}
