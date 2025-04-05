import { TableForm } from "~/app/(protected)/create-table/components/table-form";
import AppHeader from "~/components/app-header";

export default async function Page() {
  return (
    <AppHeader title="Create Table">
      <TableForm />
    </AppHeader>
  );
}
