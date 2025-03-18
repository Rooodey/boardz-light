import AppContainer from "~/components/app-container";
import AppHeader from "~/components/app-header";
import { EventForm } from "./components/event-form";

export default async function Page() {
  return (
    <AppContainer>
      <AppHeader title="Create Event">
        <EventForm />
      </AppHeader>
    </AppContainer>
  );
}
