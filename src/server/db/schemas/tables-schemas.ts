import { timestamp, pgTable, text, real } from "drizzle-orm/pg-core";
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
  street: text("street").notNull(),
  zip: text("zip").notNull(),
  city: text("city").notNull(),
  bell_name: text("bell_name"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});
