import NavLink from "~/components/ui/nav-link";

export interface Tab {
  href: string;
  name: string;
}

export interface ProfileTabsProps {
  tabs: Tab[];
}

export default function ProfileTabs({ tabs }: ProfileTabsProps) {
  return (
    <div className="relative -mx-4 px-4 pt-2 md:-mx-6 md:px-6">
      <div className="no-scroll-animation z-50 flex flex-row gap-8 overflow-x-auto">
        {tabs.map((tab) => (
          <NavLink key={tab.href} href={tab.href}>
            {tab.name}
          </NavLink>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 w-full border-b border-border" />
    </div>
  );
}
