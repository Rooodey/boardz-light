import AppContainer from "~/components/app-container";
import { SearchLocation } from "~/components/search-location";

import { getEventsByDistance } from "~/lib/distance-service";

export default function Page() {
  return (
    <AppContainer>
      <SearchLocation />
    </AppContainer>
  );
}
