"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  type EventInputType,
  EventInsertSchema,
} from "~/server/db/types/event-types";
import { useState } from "react";
import { useCreateEntity } from "~/hooks/useCreateEntity";
import { insertEvent } from "~/lib/event-service";
import { useUserResourceQuery } from "~/hooks/useUserResourceQuery";
import { getVenuesByUserId } from "~/lib/table-services";
import { VenueSelectType } from "~/server/db/types/table-types";

export function EventForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);

  const { data: venues = [], isError } = useUserResourceQuery<VenueSelectType>({
    key: "venues",
    fetcherAction: getVenuesByUserId,
  });

  const mutation = useCreateEntity<EventInputType>({
    mutationAction: insertEvent,
    invalidateKey: ["events"],
    onSuccessAction: () => {
      form.reset();
      setFormError(null);
      router.push("/events");
    },
    onErrorAction: (message) => {
      setFormError(message);
    },
  });

  const form = useForm<EventInputType>({
    resolver: zodResolver(EventInsertSchema),
    defaultValues: {
      userId: session?.user.id ?? "",
      venueId: "",
      title: "",
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
    },
  });

  function onSubmit(data: EventInputType) {
    setFormError(null);
    mutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* {Object.keys(form.formState.errors).length > 0 && (
          <pre className="bg-red-100 p-2 text-red-700">
            {JSON.stringify(form.formState.errors, null, 2)}
          </pre>
        )} */}
        <FormField
          control={form.control}
          name="venueId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Venue</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your venue" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {venues?.map((venue) => (
                    <SelectItem key={venue.id} value={venue.id}>
                      {venue.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                {isError
                  ? "Venues are not available at the moment. Please try again later."
                  : "The location where your table is located."}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Title</FormLabel>
              <FormControl>
                <Input placeholder="your_venue_name" {...field} />
              </FormControl>
              <FormDescription>This is your public event name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Start Time */}
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <Controller
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value ? new Date(field.value) : null}
                      onChange={(date) => field.onChange(date?.toISOString())}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="yyyy-MM-dd HH:mm"
                      className="w-full rounded border border-gray-300 p-2"
                    />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* End Time */}
        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Time</FormLabel>
              <FormControl>
                <Controller
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value ? new Date(field.value) : null}
                      onChange={(date) => field.onChange(date?.toISOString())}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="yyyy-MM-dd HH:mm"
                      className="w-full rounded border border-gray-300 p-2"
                    />
                  )}
                />
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
