import AppContainer from "~/components/app-container";
import AppHeader from "~/components/app-header";

import SignOutButton from "~/components/signout-button";

export default async function Page() {
  return (
    <AppContainer>
      <AppHeader title="Settings">
        <div className="flex flex-col items-start">
          <SignOutButton />
        </div>
      </AppHeader>
    </AppContainer>
  );
}
