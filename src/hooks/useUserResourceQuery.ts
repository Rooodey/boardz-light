"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ActionResult } from "~/lib/error";

type UseUserResourceQueryParams<T> = {
  key: string;
  fetcherAction: (userId: string) => Promise<ActionResult<T[]>>;
  options?: Partial<UseQueryOptions<T[], Error>>;
  userId?: string;
};

export function useUserResourceQuery<T>({
  key,
  fetcherAction,
  options,
  userId,
}: UseUserResourceQueryParams<T>) {
  const { data: session } = useSession();
  const resolvedUserId = userId ?? session?.user.id ?? "";

  return useQuery<T[], Error>({
    queryKey: [key, resolvedUserId],
    enabled: !!resolvedUserId,
    queryFn: async () => {
      const result = await fetcherAction(resolvedUserId);
      if (result.error) throw new Error(result.error.message);
      return result.data;
    },
    ...options,
  });
}
