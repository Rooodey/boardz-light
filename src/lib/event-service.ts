"use server";

import { db } from "~/server/db";
import { events } from "~/server/db/schemas/events-schemas";
import { EventInput } from "~/server/db/types/event-types";

export async function insertEvent(insertData: EventInput) {
  await db.insert(events).values({ ...insertData });
}
