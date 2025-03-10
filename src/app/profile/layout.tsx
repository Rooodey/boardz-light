import { Typography } from "~/components/typography";
import AppContainer from "~/components/app-container";
import { auth } from "~/server/auth/auth";
import { getUserById } from "~/lib/user-service";
import { Profile } from "~/components/profile";
import { notFound } from "next/navigation";
import ProfileTabs, { type Tab } from "~/components/profile-tabs";
import UserProfileProvider from "~/contexts/UserProfileProvider";

const tabs: Tab[] = [
  { href: "/profile", name: "About" },
  { href: "/profile/highscores", name: "Highscores" },
  { href: "/profile/played", name: "Played" },
  { href: "/profile/tables", name: "Tables" },
  { href: "/profile/latest", name: "Latest Events" },
];

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <AppContainer>
        <Typography>Not authenticated.</Typography>
      </AppContainer>
    );
  }

  const userProfile = await getUserById(session.user.id);

  if (!userProfile) {
    return notFound();
  }

  return (
    <UserProfileProvider userProfile={userProfile}>
      <AppContainer>
        <Profile profile={userProfile} session={session} />
        <ProfileTabs tabs={tabs} />
        {children}
      </AppContainer>
    </UserProfileProvider>
  );
}
