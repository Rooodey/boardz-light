"use client";

import { useEffect, useState } from "react";
import { Typography } from "~/components/typography";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { getEventsByDistance } from "~/lib/distance-service";
import {
  type AutocompleteResponse,
  fetchAutocomplete,
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
  const [predictions, setPredictions] = useState<
    AutocompleteResponse["predictions"]
  >([]);
  const [input, setInput] = useState("");
  const [location, setLocation] = useState<LocationType | null>(null);
  const [venues, setVenues] = useState<ExpandedVenue[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchPredictions = async () => {
        const predictions = await fetchAutocomplete(input);
        setPredictions(predictions ?? []);
        console.log("predictions:", predictions);
      };

      void fetchPredictions();
    }, 500);

    return () => clearTimeout(timer);
  }, [input]);

  async function handleSelect(
    selectedPrediction: AutocompleteResponse["predictions"][0],
  ) {
    const coords = await getCoordinatesFromPlaceId(selectedPrediction.place_id);
    setLocation({
      description: selectedPrediction.description,
      lat: coords.result.geometry.location.lat,
      lng: coords.result.geometry.location.lng,
    });
  }

  async function handleUseLocation() {
    setIsFocused(false);
    setInput(location?.description ?? "");
    if (!location) return;
    const result = await getEventsByDistance(location.lat, location.lng, 100);
    if (result) {
      setVenues(result as unknown as ExpandedVenue[]);
    }
  }

  function handleFocus() {
    setIsFocused(true);
    console.log("focus");
  }
  return (
    <>
      <div className="flex flex-row items-center justify-between gap-4">
        <Input
          placeholder="Choose your location..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={handleFocus}
          className="z-50"
        />
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
          {venues?.map((venue) => (
            <div key={venue.id}>
              {venue.name} ({Math.ceil(venue.distance / 1000)}km)
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 flex flex-col space-y-16">
          <div className="flex flex-col items-start justify-start gap-4">
            <Typography className="mb-4">Suggestions</Typography>
            {predictions.map((prediction) => (
              <button
                key={prediction.place_id}
                onMouseDown={() => handleSelect(prediction)}
                className="text-left"
              >
                {prediction.description}
              </button>
            ))}
          </div>
          <Button onClick={handleUseLocation}>Use Location</Button>
        </div>
      )}
    </>
  );
}
