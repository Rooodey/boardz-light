import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "~/env";
import * as auth_schema from "./schemas/auth-schemas";
import * as events_schema from "./schemas/events-schemas";
import { follows } from "./schemas/follows";
import * as games_schema from "./schemas/games-schemas";
import * as tables_schema from "./schemas/tables-schemas";
import { userProfiles } from "./schemas/user-profiles";
import * as friends_schema from "./schemas/friends-schemas";

export const schema = {
  ...auth_schema,
  ...events_schema,
  follows,
  ...friends_schema,
  ...games_schema,
  ...tables_schema,
  userProfiles,
  ...friends_schema,
};

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn = globalForDb.conn ?? postgres(env.DATABASE_URL, { prepare: false });
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });
