import { timestamp, pgTable, text, real } from "drizzle-orm/pg-core";
import { users } from "./auth-schemas";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

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
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const tableSchema = createInsertSchema(tables, {
  userId: z.string().uuid(),
  venueId: z.string().uuid(),
  name: z
    .string()
    .min(6)
    .max(24)
    .regex(/^[a-z0-9_-]+$/, {
      message:
        "Only lowercase letters (a-z), numbers (0-9), dashes (-) and underscores (_) are allowed",
    }),
  description: z.string().optional(),
  access: z.enum(["public", "private"]),
  image: z.string().url().optional(),
}).omit({
  createdAt: true,
});

export type TableType = z.infer<typeof tableSchema>;

export const allowedCountries = [
  "DE",
  "US",
  "FR",
  "IT",
  "ES",
  "AT",
  "CZ",
  "PL",
  "UK",
] as const;

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

export const venueSchema = createInsertSchema(venues, {
  userId: z.string().uuid(),
  name: z
    .string()
    .min(6)
    .max(24)
    .regex(/^[a-z0-9_-]+$/, {
      message:
        "Only lowercase letters (a-z), numbers (0-9), dashes (-) and underscores (_) are allowed",
    }),
  adressLine1: z.string().min(2),
  adressLine2: z.string().optional(),
  zip: z.string().min(5),
  city: z.string().min(2),
  country: z.enum(allowedCountries).optional(),
  bellName: z.string().optional(),
}).omit({
  lat: true,
  lng: true,
  createdAt: true,
});

export type Venue = z.infer<typeof venueSchema>;

// SQL Editor:
// CREATE EXTENSION IF NOT EXISTS cube;
// CREATE EXTENSION IF NOT EXISTS earthdistance;

// CREATE INDEX idx_event_locations
// ON venues
// USING GIST ( ll_to_earth(lat, lng) );
