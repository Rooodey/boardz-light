import { useQuery } from "@tanstack/react-query";
import { getEventsByDistance } from "~/lib/distance-service";

export function useEventsByDistance(
  lat: number | null,
  lng: number | null,
  radius: number = 100,
) {
  return useQuery({
    queryKey: ["events", lat, lng, radius],
    queryFn: () => {
      if (!lat || !lng) return [];
      return getEventsByDistance(lat, lng, radius);
    },
    enabled: !!lat && !!lng,
    staleTime: 5 * 60 * 1000,
  });
}
