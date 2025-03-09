import { Typography } from "~/components/typography";
import AppContainer from "~/components/app-container";
import { auth } from "~/server/auth/auth";
import { getUserById } from "~/lib/user-service";
import { Profile } from "~/components/profile";
import { notFound } from "next/navigation";
import ProfileTabs from "~/components/profile-tabs";

export default async function Page({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <AppContainer>
        <Typography>Not authenticated.</Typography>;
      </AppContainer>
    );
  }

  const userProfile = await getUserById(session.user.id);

  if (!userProfile) {
    return notFound();
  }

  return (
    <AppContainer>
      <Profile profile={userProfile} session={session} />
      <ProfileTabs />
      {children}
    </AppContainer>
  );
}
