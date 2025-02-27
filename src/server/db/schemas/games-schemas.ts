import {
  timestamp,
  pgTable,
  text,
  integer,
  jsonb,
  primaryKey
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const games = pgTable("games", {
  id: integer("id").primaryKey(),
  name: text("name").unique().notNull(),
  strategies: jsonb("strategy").notNull().default([]),
  image: text("image"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});


export const gamesSchema = createInsertSchema(games).extend({
  strategy: z.array(z.string()).min(1, "Mindestens eine Strategie angeben"),
  image: z.string().url("Bild muss eine gültige URL sein"),
});

export type GameInput = z.infer<typeof gamesSchema>;

export const categories = pgTable("categories", {
  id: integer("id").primaryKey(),
  name: text("name").unique().notNull(),
});

export const gameCategories = pgTable(
  "game_categories",
  {
    gameId: integer("game_id")
      .notNull()
      .references(() => games.id, { onDelete: "cascade" }),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.gameId, table.categoryId] })
  })
);