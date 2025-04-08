import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { games } from "../schemas/games-schemas";

export const GameInsertSchema = createInsertSchema(games, {
  strategies: z.array(z.any()),
  image: z.string().url().optional(),
});
