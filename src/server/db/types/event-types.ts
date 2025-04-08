import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { events } from "../schemas/events-schemas";

export const EventInsertSchema = createInsertSchema(events, {
  id: z.string().uuid().optional(),
  userId: z.string().uuid(),
  venueId: z.string().uuid(),
  title: z.string().min(3).max(24),
  description: z.string().max(300).optional(),
  categoryId: z.number().positive().int().default(1),
  minGamePoints: z.number().min(0).int().default(0),
  beginner: z.boolean().default(true),
  minPlayers: z.number().min(1).max(100).optional(),
  maxPlayers: z.number().min(1).max(100).optional(),
  startTime: z.string().datetime({ offset: true }),
  endTime: z.string().datetime({ offset: true }),
  permissionsId: z.number().positive().int().default(1),
  minUserPoints: z.number().min(0).int().optional(),
  verified: z.boolean().default(false),
  guests: z.boolean().default(true),
  smoker: z.boolean().default(false),
  barrier_free: z.boolean().default(false),
  only_women: z.boolean().default(false),
  only_men: z.boolean().default(false),
  diverse: z.boolean().default(true),
  outside: z.boolean().default(false),
  createdAt: z.date().optional(),
}).omit({
  createdAt: true,
});

export type EventInsertType = z.infer<typeof EventInsertSchema>;
export type EventInputType = z.input<typeof EventInsertSchema>;
