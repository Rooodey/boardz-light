"use server";

import { db } from "~/server/db";
import { sql } from "drizzle-orm";
import { venues } from "~/server/db/schemas/tables-schemas";
import { EventInput } from "~/server/db/types/event-types";
import { events } from "~/server/db/schemas/events-schemas";

// export async function getEventsByDistance(
//   currentLat: number,
//   currentLng: number,
//   kmRadius: number,
// ) {
//   try {
//     const result = await db.execute(sql`
//       SELECT
//         ${venues}.*,
//         earth_distance(
//           ll_to_earth(${currentLat}, ${currentLng}),
//           ll_to_earth(${venues.lat}, ${venues.lng})
//         ) AS distance
//       FROM ${venues}
//       WHERE
//         earth_distance(
//           ll_to_earth(${currentLat}, ${currentLng}),
//           ll_to_earth(${venues.lat}, ${venues.lng})
//         ) <= ${kmRadius * 1000}
//       ORDER BY distance ASC
//       LIMIT 100;
//     `);
//     return result;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Error at getting events by distance");
//   }
// }

export async function getEventsByDistance(
  currentLat: number,
  currentLng: number,
  kmRadius: number,
): Promise<(EventInput & { distance: number })[]> {
  try {
    const result = await db.execute(sql`
      SELECT 
        ${events}.*, 
        earth_distance(
          ll_to_earth(${currentLat}, ${currentLng}), 
          ll_to_earth(${venues.lat}, ${venues.lng})
        ) AS distance
      FROM ${events}
      JOIN ${venues} ON ${events}.venue_id = ${venues}.id
      WHERE 
        earth_distance(
          ll_to_earth(${currentLat}, ${currentLng}), 
          ll_to_earth(${venues.lat}, ${venues.lng})
        ) <= ${kmRadius * 1000}
      ORDER BY distance ASC
      LIMIT 100;
    `);
    return result as unknown as (EventInput & { distance: number })[];
  } catch (error) {
    console.error(error);
    throw new Error("Error at getting events by distance");
  }
}

// ${category ? sql`${events.category} = ${category} AND` : sql``}
// ${dateFrom ? sql`${events.date} >= ${new Date(dateFrom as string)} AND` : sql``}
// ${dateTo ? sql`${events.date} <= ${new Date(dateTo as string)} AND` : sql``}
