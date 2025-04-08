import {
  timestamp,
  pgTable,
  text,
  integer,
  jsonb,
  primaryKey,
  serial,
} from "drizzle-orm/pg-core";

export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
  strategies: jsonb("strategy").notNull().default([]),
  image: text("image"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const gameCategories = pgTable("game_categories", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
});

export const gameCategoryRelations = pgTable(
  "game_category_relations",
  {
    gameId: integer("game_id")
      .notNull()
      .references(() => games.id, { onDelete: "cascade" }),
    categoryId: integer("category_id")
      .notNull()
      .references(() => gameCategories.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.gameId, table.categoryId] })],
);
