import { pgTable, integer, primaryKey, timestamp} from "drizzle-orm/pg-core";
import { users } from "./auth-schemas";

export const follows = pgTable(
  "follows",
  {
    followerId: integer("follower_id")
      .references(() => users.id, { onDelete: "cascade" }) 
      .notNull(),
    followingId: integer("following_id")
      .references(() => users.id, { onDelete: "cascade" }) 
      .notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.followerId, table.followingId] }),
  })
);
