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
import { useCreateEntity } from "~/hooks/useCreateEntity";
import { insertUser } from "~/lib/user-service";
import {
  UserProfileInsertSchema,
  type UserProfileInputType,
} from "~/server/db/types/user-types";

export function OnboardingForm() {
  const { data } = useSession();
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);

  const mutation = useCreateEntity<UserProfileInputType>({
    mutationAction: insertUser,
    invalidateKey: ["users"],
    onSuccessAction: () => {
      form.reset();
      setFormError(null);
      router.push("/profile");
    },
    onErrorAction: (message) => {
      setFormError(message);
    },
  });

  const form = useForm<UserProfileInputType>({
    resolver: zodResolver(UserProfileInsertSchema),
    defaultValues: {
      userId: data?.user.id,
      userName: "",
    },
  });

  async function onSubmit(data: UserProfileInputType) {
    setFormError(null);
    mutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="example_username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
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
