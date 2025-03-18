"use client";

import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "~/hooks/useDebounce";
import { fetchAutocomplete } from "~/lib/geo-services";

export function useAutocomplete(input: string) {
  const debouncedInput = useDebounce(input, 500);

  return useQuery({
    queryKey: ["autocomplete", debouncedInput],
    queryFn: () => fetchAutocomplete(debouncedInput),
    enabled: !!debouncedInput,
    staleTime: 60 * 1000,
    cacheTime: 60 * 1000,
  });
}
