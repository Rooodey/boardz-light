import Link from "next/link";
import { Typography } from "~/components/typography";
import NavLink from "~/components/ui/nav-link";

export default function ProfileTabs() {
  return (
    <div className="-mx-4 flex flex-row gap-6 border-b border-border px-4 py-2 sm:-mx-6 sm:px-6">
      <NavLink href="/profile/game-type">
        <Typography>Game Type</Typography>
      </NavLink>
      <NavLink href="/profile/highscores">
        <Typography>Highscores</Typography>
      </NavLink>
    </div>
  );
}
