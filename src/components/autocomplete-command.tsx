"use client";

import { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";

import {
  fetchAutocomplete,
  getCoordinatesFromPlaceId,
  type AutocompleteResponse,
} from "~/lib/geo-services";

export default function AutocompleteCommand() {
  const [predictions, setPredictions] = useState<
    AutocompleteResponse["predictions"]
  >([]);
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

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

  async function handleClick(
    selectedPrediction: AutocompleteResponse["predictions"][0],
  ) {
    setInput(selectedPrediction.description);
    const coords = await getCoordinatesFromPlaceId(selectedPrediction.place_id);
    console.log("coords:", coords.result.geometry.location);
  }

  return (
    <Command>
      <CommandInput
        placeholder="Choose your location..."
        value={input}
        onValueChange={setInput}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setShowSuggestions(false)}
      />
      {showSuggestions && (
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {predictions.map((prediction) => (
              <CommandItem
                onMouseDown={() => handleClick(prediction)}
                key={prediction.place_id}
              >
                {prediction.description}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      )}
    </Command>
  );
}
