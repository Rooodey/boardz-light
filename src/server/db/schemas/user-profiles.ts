import { timestamp, pgTable, text, integer } from "drizzle-orm/pg-core";
import { users } from "./auth-schemas";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const userProfiles = pgTable("user_profiles", {
  userId: text("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  userName: text("user_name").unique().notNull(),
  realName: text("real_name"),
  bio: text("bio"),
  points: integer("points").default(0).notNull(),
  awards: integer("awards").default(0).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const userProfileSchema = createInsertSchema(userProfiles, {
  userId: z.string().uuid(),
  userName: z
    .string()
    .min(6)
    .max(24)
    .regex(/^[a-z0-9_-]+$/, {
      message:
        "Only lowercase letters (a-z), numbers (0-9), dashes (-) and underscores (_) are allowed",
    }),
  realName: z.string().max(24).nullable().optional(),
  bio: z.string().max(120).nullable().optional(),
}).omit({
  points: true,
  awards: true,
  createdAt: true,
});
