import {
  timestamp,
  pgTable,
  text,
} from "drizzle-orm/pg-core";
import { users } from "./auth-schemas";

export const userProfiles = pgTable("user_profiles", {
  userId: text("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  userName: text("user_name").unique().notNull(),
  realName: text("real_name"),
  bio: text("bio"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});