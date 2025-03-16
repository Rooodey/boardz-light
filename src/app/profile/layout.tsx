import AppContainer from "~/components/app-container";
import { Profile } from "~/components/profile";
import ProfileTabs, { type Tab } from "~/components/profile-tabs";

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
  return (
    <AppContainer>
      <Profile />
      <ProfileTabs tabs={tabs} />
      {children}
    </AppContainer>
  );
}
