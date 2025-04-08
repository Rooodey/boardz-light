import { timestamp, pgTable, text, integer } from "drizzle-orm/pg-core";
import { users } from "./auth-schemas";

export const userProfiles = pgTable("user_profiles", {
  userId: text("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  userName: text("user_name").unique().notNull(),
  realName: text("real_name"),
  bio: text("bio"),
  points: integer("points").default(0).notNull(),
  awards: integer("awards").default(0).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});
