import { LogOut } from "lucide-react";
import AppHeader from "~/components/app-header";

import SignOutButton from "~/components/signout-button";

export default async function Page() {
  return (
    <AppHeader title="Settings">
      <div className="flex flex-col items-start">
        <SignOutButton
          variant="nothing"
          className="flex items-center justify-center space-x-3 hover:text-accent"
        >
          <LogOut className="!h-6 !w-6" />
          <span className="text-2xl">Sign Out</span>
        </SignOutButton>
      </div>
    </AppHeader>
  );
}
