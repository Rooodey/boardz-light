import { notFound } from "next/navigation";
import { db } from "~/server/db";
import { userProfiles } from "~/server/db/schemas/user-profiles";
import { getUserByName } from "~/lib/user-service";
import AppContainer from "~/components/app-container";
import { Profile } from "~/components/profile";

// Optional: Für statische Generierung aller User-Seiten
export async function generateStaticParams() {
  const allUsers = await db
    .select({ userName: userProfiles.userName })
    .from(userProfiles);
  return allUsers.map((user) => ({ userName: user.userName.toString() }));
}

interface UserPageProps {
  params: Promise<{ userName: string }>;
}

export default async function UserPage({ params }: UserPageProps) {
  const { userName } = await params;

  const userProfile = await getUserByName(userName);

  if (!userProfile) {
    return notFound();
  }

  return (
    <AppContainer>
      <Profile profile={userProfile} />
    </AppContainer>
  );
}
