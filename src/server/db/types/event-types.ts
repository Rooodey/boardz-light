import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { events } from "../schemas/events-schemas";

export const eventSchema = createInsertSchema(events, {
  id: z.string().uuid().optional(), // UUID, wird oft automatisch generiert
  userId: z.string().uuid(), // User-ID als UUID
  venueId: z.string().uuid(), // Venue-ID als UUID
  title: z.string().min(3).max(100), // Titel zwischen 3 und 100 Zeichen
  description: z.string().max(500).optional(), // Optional, max. 500 Zeichen
  categoryId: z.number().positive().int().default(1), // Kategorie-ID als positive Ganzzahl
  minGamePoints: z.number().min(0).int().optional(), // Optional, min. 0
  beginner: z.boolean().default(true), // Standardmäßig Anfängerfreundlich
  minPlayers: z.number().min(1).max(100).optional(), // Mind. 1, max. 100 Spieler
  maxPlayers: z.number().min(1).max(100).optional(), // Mind. 1, max. 100 Spieler
  startTime: z.string().datetime({ offset: true }), // RFC 3339 Datetime mit Zeitzone
  endTime: z.string().datetime({ offset: true }), // RFC 3339 Datetime mit Zeitzone
  permissionsId: z.number().positive().int().default(1), // Berechtigungs-ID
  minUserPoints: z.number().min(0).int().optional(), // Optional
  verified: z.boolean().default(false), // Standardmäßig nicht verifiziert
  guests: z.boolean().default(true), // Gäste erlaubt?
  smoker: z.boolean().default(false), // Raucher-Option
  barrier_free: z.boolean().default(false), // Barrierefreiheit
  only_women: z.boolean().default(false), // Frauen-only?
  only_men: z.boolean().default(false), // Männer-only?
  diverse: z.boolean().default(true), // Diverse erlaubt?
  outside: z.boolean().default(false), // Draußen?
  createdAt: z.date().optional(), // Optional, wird in der DB automatisch gesetzt
});

// 🎯 TypeScript-Typ aus Zod-Schema ableiten
export type EventInput = z.infer<typeof eventSchema>;
