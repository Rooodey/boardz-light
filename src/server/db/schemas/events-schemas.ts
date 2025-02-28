import {
  timestamp,
  pgTable,
  text,
  integer,
  boolean,
  serial,
} from "drizzle-orm/pg-core";
import { users } from "./auth-schemas";

export const events = pgTable("events", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  title: text("title").notNull(),
  description: text("description"),
  categoryId: integer("category_id")
    .references(() => eventCategories.id)
    .notNull(),
  minGamePoints: integer("min_game_points"),
  beginner: boolean("beginner").default(true),
  minPlayers: integer("min_players"),
  maxPlayers: integer("max_players"),
  startTime: timestamp("start_time", {
    mode: "string",
    withTimezone: true,
  }).notNull(),
  endTime: timestamp("end_time", {
    mode: "string",
    withTimezone: true,
  }).notNull(),
  permissionsId: integer("permissions_id")
    .references(() => permissions.id)
    .notNull(),
  minUserPoints: integer("min_user_points"),
  verified: boolean("verified").default(false),
  guests: boolean("guests").default(true),
  smoker: boolean("smoker").default(false),
  barrier_free: boolean("barrier_free").default(false),
  only_women: boolean("only_women").default(false),
  only_men: boolean("only_men").default(false),
  diverse: boolean("diverse").default(true),
  outside: boolean("outside").default(false),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const eventCategories = pgTable("event_categories", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
});

export const permissions = pgTable("permissions", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
});
