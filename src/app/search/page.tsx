import AppContainer from "~/components/app-container";
import UserList from "~/components/user-list";

export default async function Page() {
  return (
    <AppContainer>
      <UserList />
    </AppContainer>
  );
}
