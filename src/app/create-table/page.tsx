import { Table } from "lucide-react";
import { TableForm } from "~/app/create-table/components/table-form";
import AppContainer from "~/components/app-container";
import { Typography } from "~/components/typography";

export default async function Page() {
  return (
    <AppContainer>
      <Typography variant={"h3"}>Create Table: </Typography>
      <TableForm />
    </AppContainer>
  );
}
