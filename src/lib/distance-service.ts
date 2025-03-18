"use server";

import { db } from "~/server/db";
import { sql } from "drizzle-orm";
import { tables, venues } from "~/server/db/schemas/tables-schemas";
import {
  eventCategories,
  events,
  tables_at_events,
} from "~/server/db/schemas/events-schemas";
import { users } from "~/server/db/schemas/auth-schemas";
import { userProfiles } from "~/server/db/schemas/user-profiles";

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

export interface EventByDistance {
  id: string;
  title: string;
  category: string;
  starttime: string;
  avatar: string | null;
  username: string;
  image: string | null;
  distance: number;
}

export async function getEventsByDistance(
  currentLat: number,
  currentLng: number,
  kmRadius: number,
): Promise<EventByDistance[]> {
  try {
    const result = await db.execute(sql`
      SELECT 
        e.id, 
        e.title, 
        ec.name AS category, 
        e.start_time AS startTime, 
        u.image AS avatar, 
        up.user_name AS userName, 
        t.image AS image, 
        earth_distance(
          ll_to_earth(${currentLat}, ${currentLng}), 
          ll_to_earth(v.lat, v.lng)
        ) AS distance
      FROM ${events} e
      LEFT JOIN ${venues} v ON e.venue_id = v.id
      LEFT JOIN ${users} u ON e.user_id = u.id
      LEFT JOIN ${userProfiles} up ON e.user_id = up.user_id
      LEFT JOIN ${eventCategories} ec ON e.category_id = ec.id
      LEFT JOIN LATERAL (
          SELECT t.*
          FROM ${tables_at_events} te
          JOIN ${tables} t ON te.table_id = t.id
          WHERE te.event_id = e.id
          ORDER BY t.score DESC
          LIMIT 1
        ) t ON true
      WHERE 
        earth_distance(
          ll_to_earth(${currentLat}, ${currentLng}), 
          ll_to_earth(v.lat, v.lng)
        ) <= ${kmRadius * 1000}
      ORDER BY start_time ASC
      LIMIT 100;
    `);
    console.log("🚀 Raw result from DB:", result);
    return result as unknown as EventByDistance[];
  } catch (error) {
    console.error(error);
    throw new Error("Error at getting events by distance");
  }
}

// ${category ? sql`${events.category} = ${category} AND` : sql``}
// ${dateFrom ? sql`${events.date} >= ${new Date(dateFrom as string)} AND` : sql``}
// ${dateTo ? sql`${events.date} <= ${new Date(dateTo as string)} AND` : sql``}
