import { timestamp, pgTable, text, real, integer } from "drizzle-orm/pg-core";
import { users } from "./auth-schemas";

export const tables = pgTable("tables", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  venueId: text("venue_id")
    .references(() => venues.id)
    .notNull(),
  name: text("name").unique().notNull(),
  description: text("description"),
  access: text("access").notNull(),
  image: text("image"),
  score: integer("score").default(0).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const venues = pgTable("venues", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  name: text("name").unique().notNull(),
  lat: real("lat").notNull(),
  lng: real("lng").notNull(),
  adressLine1: text("adress_line1").notNull(),
  adressLine2: text("adress_line2"),
  zip: text("zip").notNull(),
  city: text("city").notNull(),
  country: text("country"),
  bellName: text("bell_name"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

// SQL Editor:
// CREATE EXTENSION IF NOT EXISTS cube;
// CREATE EXTENSION IF NOT EXISTS earthdistance;

// CREATE INDEX idx_event_locations
// ON venues
// USING GIST ( ll_to_earth(lat, lng) );
