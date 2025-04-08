"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type ActionResult } from "~/lib/error";

type UseCreateEntityOptions<TInput> = {
  mutationAction: (input: TInput) => Promise<ActionResult<null>>;
  invalidateKey: string[];
  onSuccessAction: () => void;
  onErrorAction?: (message: string) => void;
};

export function useCreateEntity<TInput>({
  mutationAction,
  invalidateKey,
  onSuccessAction,
  onErrorAction,
}: UseCreateEntityOptions<TInput>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: TInput) => {
      const result = await mutationAction(input);

      if (result.error) {
        const msg =
          result.error.message ??
          "An unknown error occurred. Please try again later.";
        onErrorAction?.(msg);
        return;
      }

      await queryClient.invalidateQueries({ queryKey: invalidateKey });
      onSuccessAction();
    },
    onError: (err) => {
      console.error(err);
      onErrorAction?.("An unknown error occurred. Please try again later.");
    },
  });
}
