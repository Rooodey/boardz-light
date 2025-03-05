import AppContainer from "~/components/app-container";
import { getEventsByDistance } from "~/lib/distance-service";

export default async function Page() {
  const distance = await getEventsByDistance(52.427547, 10.78042, 100);
  console.log("distance:", distance ?? "");

  return <AppContainer>events</AppContainer>;
}
