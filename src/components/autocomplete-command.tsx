"use client";

import { useEffect, useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "~/components/ui/command";

import {
  fetchAutocomplete,
  type AutocompleteResponse,
} from "~/lib/geo-services";

export default function AutocompleteCommand() {
  const [predictions, setPredictions] = useState<
    AutocompleteResponse["predictions"]
  >([]);
  const [input, setInput] = useState("");

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

  return (
    <Command>
      <CommandInput
        placeholder="Type a command or search..."
        value={input}
        onValueChange={setInput}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {predictions.map((prediction) => (
            <CommandItem key={prediction.place_id}>
              {prediction.description}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="My Locations"></CommandGroup>
        <CommandItem>Home</CommandItem>
      </CommandList>
    </Command>
  );
}
