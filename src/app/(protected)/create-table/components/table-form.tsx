"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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
import { Textarea } from "~/components/ui/textarea";
import { getVenuesByUserId, insertTable } from "~/lib/table-services";
import {
  tableSchema,
  type TableType,
} from "~/server/db/schemas/tables-schemas";

export function TableForm() {
  const { data: session } = useSession();
  const { data } = useQuery({
    queryKey: ["venues", session?.user.id],
    queryFn: () => getVenuesByUserId(session?.user.id ?? ""),
  });
  const mutation = useMutation({
    mutationFn: async (values: TableType) => {
      await insertTable(values);
    },
    onSuccess: () => {
      router.push("/profile/tables");
    },
    onError: (error) => {
      console.error("Error inserting table:", error);
    },
  });
  const router = useRouter();
  const form = useForm<z.infer<typeof tableSchema>>({
    resolver: zodResolver(tableSchema),
    defaultValues: {
      userId: session?.user.id,
      venueId: "",
      name: "",
      description: "",
      access: "private",
    },
  });

  async function onSubmit(values: z.infer<typeof tableSchema>) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="venueId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Venue</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        data?.length === 0
                          ? "You have no venue yet..."
                          : "Choose your venue"
                      }
                    />
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
        <Button
          variant="outline"
          className="w-full"
          type="button"
          onClick={() => router.push("/create-venue")}
        >
          Create Venue
        </Button>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Table Name</FormLabel>
              <FormControl>
                <Input placeholder="your_table_name" {...field} />
              </FormControl>
              <FormDescription>This is your public table name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Table Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your table..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="access"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Accessibility</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Choose who can create an event with your table.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
