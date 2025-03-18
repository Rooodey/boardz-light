"use client";

import { X } from "lucide-react";
import { useState } from "react";
import EventCard from "~/components/event-card";
import { Typography } from "~/components/typography";
import { Input } from "~/components/ui/input";
import { useAutocomplete } from "~/hooks/useAutocomplete";
import { useEventsByDistance } from "~/hooks/useEventsByDistance";
import {
  type AutocompleteResponse,
  getCoordinatesFromPlaceId,
} from "~/lib/geo-services";
import type { Venue } from "~/server/db/schemas/tables-schemas";

interface LocationType {
  description: string;
  lat: number;
  lng: number;
}

export type ExpandedVenue = Venue & { distance: number };

export function SearchLocation() {
  const [isFocused, setIsFocused] = useState(false);

  const [input, setInput] = useState("");
  const [location, setLocation] = useState<LocationType | null>(null);

  const { data: predictions } = useAutocomplete(input);
  const { data: events } = useEventsByDistance(
    location?.lat ?? null,
    location?.lng ?? null,
  );

  async function handleSelect(
    selectedPrediction: AutocompleteResponse["predictions"][0],
  ) {
    const coords = await getCoordinatesFromPlaceId(selectedPrediction.place_id);
    setLocation({
      description: selectedPrediction.description,
      lat: coords.result.geometry.location.lat,
      lng: coords.result.geometry.location.lng,
    });
    setInput(location?.description ?? "");
    setIsFocused(false);
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="relative w-full">
          <Input
            placeholder="Choose your location..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            className="z-50 pr-10"
          />
          {input && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
              onClick={() => {
                setInput("");
              }}
            >
              <X size={18} />
            </button>
          )}
        </div>
        {isFocused && (
          <button
            onClick={() => setIsFocused(false)}
            className="cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>
      {!isFocused ? (
        <div className="">
          {events?.map(({ id, ...eventProps }, i) => (
            <EventCard
              key={id}
              {...eventProps}
              isLast={i === events.length - 1}
            />
          ))}
        </div>
      ) : (
        <div className="mt-4 flex flex-col space-y-16">
          <div className="flex flex-col items-start justify-start gap-4">
            <Typography className="mb-4">Suggestions</Typography>
            {predictions?.map((prediction) => (
              <button
                key={prediction.place_id}
                onClick={() => handleSelect(prediction)}
                className="text-left"
              >
                {prediction.description}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
