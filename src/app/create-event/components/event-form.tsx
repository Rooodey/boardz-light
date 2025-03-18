"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";
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
import { insertEvent } from "~/lib/event-service";
import { getVenuesByUserId } from "~/lib/table-services";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { EventInput, eventSchema } from "~/server/db/types/event-types";

export function EventForm() {
  const { data: session, status } = useSession();
  const { data } = useQuery({
    queryKey: ["venues", session?.user.id],
    queryFn: () => getVenuesByUserId(session?.user.id ?? ""),
  });
  const mutation = useMutation({
    mutationFn: async (values: EventInput) => {
      await insertEvent(values);
    },
    onSuccess: () => {
      router.back();
    },
    onError: (error) => {
      console.error("Error inserting table:", error);
    },
  });

  const router = useRouter();
  const formSchema = eventSchema;
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: session?.user.id ?? "",
      venueId: "",
      title: "",
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
    },
  });

  function onSubmit(values: z.infer<typeof eventSchema>) {
    console.log("Form values:", values);
    const result = eventSchema.safeParse(values);
    if (!result.success) {
      console.error("Validation failed:", result.error.format());
      return;
    }
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {Object.keys(form.formState.errors).length > 0 && (
          <pre className="bg-red-100 p-2 text-red-700">
            {JSON.stringify(form.formState.errors, null, 2)}
          </pre>
        )}
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
                  {data?.map((venue) => (
                    <SelectItem key={venue.id} value={venue.id}>
                      {venue.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                The location where your table is located.
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
