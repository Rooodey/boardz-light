"use server";

import { type ActionResult, tryCatch, validationError } from "~/lib/error";
import { db } from "~/server/db";
import { events } from "~/server/db/schemas/events-schemas";
import {
  type EventInputType,
  EventInsertSchema,
} from "~/server/db/types/event-types";

export async function insertEvent(
  input: EventInputType,
): Promise<ActionResult<null>> {
  const parsed = EventInsertSchema.safeParse(input);
  if (!parsed.success) {
    return validationError("Error at validating event input.");
  }
  const result = await tryCatch(
    db.insert(events).values(parsed.data).execute(),
  );

  if (result.error) {
    return { data: null, error: result.error };
  }

  return { data: null, error: null };
}
