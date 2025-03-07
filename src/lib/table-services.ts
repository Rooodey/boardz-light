"use server";

import type { z } from "zod";
import { getGeoCoordinates } from "~/lib/geo-services";
import { db } from "~/server/db";
import { type venueSchema, venues } from "~/server/db/schemas/tables-schemas";

export async function insertVenue(insertData: z.infer<typeof venueSchema>) {
  let lat: number;
  let lng: number;
  try {
    ({ lat, lng } = await getGeoCoordinates(
      insertData.adressLine1,
      insertData.adressLine2,
      insertData.zip,
      insertData.city,
      insertData.country,
    ));
  } catch (error) {
    console.error("Error at getting geo coordinates:", error);
    throw error;
  }

  try {
    await db.insert(venues).values({ ...insertData, lat, lng });
  } catch (error) {
    console.error("Error at inserting venue:", error);
    throw error;
  }
}
