"use server";

import { eq } from "drizzle-orm";
import { getGeoCoordinates } from "~/lib/geo-services";
import { db } from "~/server/db";
import { tables, venues } from "~/server/db/schemas/tables-schemas";
import {
  type TableInputType,
  type VenueInputType,
  VenueInsertSchema,
  TableInsertSchema,
  VenueSelectType,
  TableSelectType,
} from "./../server/db/types/table-types";
import {
  ActionResult,
  fetchingError,
  tryCatch,
  validationError,
} from "~/lib/error";

export async function insertVenue(
  input: VenueInputType,
): Promise<ActionResult<null>> {
  const parsed = VenueInsertSchema.safeParse(input);
  if (!parsed.success) {
    return validationError("Errot at validating venue input.");
  }
  const venueData = parsed.data;

  const { data: coordinates, error: coordinatesError } = await tryCatch(
    getGeoCoordinates(
      venueData.adressLine1,
      venueData.adressLine2,
      venueData.zip,
      venueData.city,
      venueData.country,
    ),
  );

  if (coordinatesError) {
    return fetchingError("Error at getting geo coordinates.");
  } else {
    const { lat, lng } = coordinates;
    const result = await tryCatch(
      db.insert(venues).values({ ...venueData, lat, lng }),
    );
    if (result.error) {
      return { data: null, error: result.error };
    }

    return { data: null, error: null };
  }
}

export async function getVenuesByUserId(
  userId: string,
): Promise<ActionResult<VenueSelectType[]>> {
  const { data: result, error } = await tryCatch(
    db
      .select()
      .from(venues)
      .where(eq(venues.userId, userId))
      .orderBy(venues.createdAt)
      .limit(20),
  );
  if (error) {
    return { data: null, error };
  }
  if (result.length === 0) {
    return { data: [], error: null };
  } else {
    return { data: result, error: null };
  }
}

export async function insertTable(
  input: TableInputType,
): Promise<ActionResult<null>> {
  const parsed = TableInsertSchema.safeParse(input);
  if (!parsed.success) {
    return validationError("Error at validating table input.");
  }
  const tableData = parsed.data;
  const result = await tryCatch(db.insert(tables).values(tableData));
  if (result.error) {
    return { data: null, error: result.error };
  }
  return { data: null, error: null };
}

export async function getTablesByUserId(
  userId: string,
): Promise<ActionResult<TableSelectType[]>> {
  const result = await tryCatch(
    db
      .select()
      .from(tables)
      .where(eq(tables.userId, userId))
      .orderBy(tables.createdAt),
  );
  if (result.error) {
    return { data: null, error: result.error };
  }
  return { data: result.data, error: null };
}
