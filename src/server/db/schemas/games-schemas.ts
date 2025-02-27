import {
  timestamp,
  pgTable,
  text,
  integer,
  jsonb,
  primaryKey,
  serial,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
  strategies: jsonb("strategy").notNull().default([]),
  image: text("image"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const gameSchema = createInsertSchema(games, {
  strategies: z.array(z.any()),
  image: z.string().url().optional(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
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
    pk: primaryKey({ columns: [table.gameId, table.categoryId] }),
  }),
);
