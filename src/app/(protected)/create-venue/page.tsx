import AppHeader from "~/components/app-header";
import { VenueForm } from "./components/venue-form";

export default async function Page() {
  return (
    <AppHeader title="Create Venue">
      <VenueForm />
    </AppHeader>
  );
}
