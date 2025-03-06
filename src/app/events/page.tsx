import AppContainer from "~/components/app-container";
import AutocompleteCommand from "~/components/autocomplete-command";

import { getEventsByDistance } from "~/lib/distance-service";

export default function Page() {
  // const [distance, setDistance] = useState<number | null>(null);

  // const fetchDistance = async () => {
  //   const distance = await getEventsByDistance(52.427547, 10.78042, 100);
  //   if (distance) setDistance(Number(distance));
  // };

  // fetchDistance();
  // console.log("distance:", distance ?? "");

  return (
    <AppContainer>
      <AutocompleteCommand />
    </AppContainer>
  );
}
