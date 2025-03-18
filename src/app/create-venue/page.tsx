import { TableForm } from "~/app/create-table/components/table-form";
import AppContainer from "~/components/app-container";
import AppHeader from "~/components/app-header";

export default async function Page() {
  return (
    <AppContainer>
      <AppHeader title="Create Venue">
        <TableForm />
      </AppHeader>
    </AppContainer>
  );
}
