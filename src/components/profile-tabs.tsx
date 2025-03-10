import NavLink from "~/components/ui/nav-link";

export default function ProfileTabs() {
  return (
    <div className="relative -mx-4 px-4 pt-2 md:-mx-6 md:px-6">
      <div className="no-scroll-animation z-50 flex flex-row gap-8 overflow-x-auto">
        <NavLink href="/profile/about">About</NavLink>
        <NavLink href="/profile/highscores">Highscores</NavLink>
        <NavLink href="/profile/played">Played</NavLink>
        <NavLink href="/profile/tables">Tables</NavLink>
        <NavLink href="/profile/latest">Latest Events</NavLink>
      </div>
      <div className="absolute bottom-0 left-0 right-0 w-full border-b border-border" />
    </div>
  );
}
