import AppHeader from "~/components/app-header";
import { EventForm } from "./components/event-form";

export default async function Page() {
  return (
    <AppHeader title="Create Event">
      <EventForm />
    </AppHeader>
  );
}
