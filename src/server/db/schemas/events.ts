import {
  timestamp,
  pgTable,
  text,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { users } from "./auth-schemas"


export const events = pgTable("events", {
  id: integer("id").primaryKey(),
  userId: text("user_id").references(() => users.id).notNull(),
  title: text("title").notNull(),
  description: text("description"),
  categoryId: text("category_id").references(() => eventCategories.id).notNull(),
  minGamePoints: integer("min_game_points"),
  beginner: boolean("beginner").default(true),
  minPlayers: integer("min_players"),
  maxPlayers: integer("max_players"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const eventCategories = pgTable("event_categories", {
  id: integer("id").primaryKey(),
  name: text("name").notNull()
})