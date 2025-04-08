"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "~/components/ui/select";
import { useCreateEntity } from "~/hooks/useCreateEntity";
import { insertVenue } from "~/lib/table-services";
import {
  allowedCountries,
  type VenueInputType,
  VenueFormSchema,
} from "~/server/db/types/table-types";

export function VenueForm() {
  const { data } = useSession();
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);

  const mutation = useCreateEntity<VenueInputType>({
    mutationAction: insertVenue,
    invalidateKey: ["venues"],
    onSuccessAction: () => {
      form.reset();
      setFormError(null);
      router.push("/profile/tables");
    },
    onErrorAction: (message) => {
      setFormError(message);
    },
  });

  const form = useForm<VenueInputType>({
    resolver: zodResolver(VenueFormSchema),
    defaultValues: {
      userId: data?.user.id,
      name: "",
      adressLine1: "",
      adressLine2: "",
      zip: "",
      city: "",
      country: "DE",
      bellName: "",
    },
  });

  async function onSubmit(data: VenueInputType) {
    setFormError(null);
    mutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Venue Name</FormLabel>
              <FormControl>
                <Input placeholder="your_venue_name" {...field} />
              </FormControl>
              <FormDescription>This is your public venue name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="adressLine1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 1</FormLabel>
              <FormControl>
                <Input placeholder="Street and number" {...field} />
              </FormControl>
              <FormDescription>Enter your street address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="adressLine2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 2 (optional)</FormLabel>
              <FormControl>
                <Input placeholder="Apartment, suite, etc." {...field} />
              </FormControl>
              <FormDescription>Additional address details.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="zip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal Code</FormLabel>
              <FormControl>
                <Input placeholder="Zip / Postal Code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country (optional)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {allowedCountries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Wähle den Ländercode aus (z.B. DE, US).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bellName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name On The Doorbell (optional)</FormLabel>
              <FormControl>
                <Input placeholder="Name On The Doorbell" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {formError && <p className="font-semibold text-red-700">{formError}</p>}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
