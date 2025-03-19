import AppContainer from "~/components/app-container";
import AppHeader from "~/components/app-header";
import { VenueForm } from "./components/venue-form";

export default async function Page() {
  return (
    <AppContainer>
      <AppHeader title="Create Venue">
        <VenueForm />
      </AppHeader>
    </AppContainer>
  );
}
