import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { tables, venues } from "../schemas/tables-schemas";

export const TableInsertSchema = createInsertSchema(tables, {
  id: z.string().uuid(),
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
  score: z.number().default(0).optional(),
}).omit({
  createdAt: true,
});

export type TableInputType = z.input<typeof TableInsertSchema>;
export type TableInsertType = z.infer<typeof TableInsertSchema>;

export const TableSelectSchema = createSelectSchema(tables);
export type TableSelectType = z.infer<typeof TableSelectSchema>;

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

export const VenueInsertSchema = createInsertSchema(venues, {
  userId: z.string().uuid(),
  name: z
    .string()
    .min(6)
    .max(24)
    .regex(/^[a-z0-9_-]+$/, {
      message:
        "Only lowercase letters (a-z), numbers (0-9), dashes (-) and underscores (_) are allowed",
    }),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  adressLine1: z.string().min(2),
  adressLine2: z.string().optional(),
  zip: z.string().min(5),
  city: z.string().min(2),
  country: z.enum(allowedCountries).optional(),
  bellName: z.string().optional(),
}).omit({
  createdAt: true,
});

export const VenueFormSchema = VenueInsertSchema.omit({
  lat: true,
  lng: true,
});

export type VenueInputType = z.input<typeof VenueFormSchema>;
export type VenueInsertType = z.infer<typeof VenueInsertSchema>;

export const VenueSelectSchema = createSelectSchema(venues);
export type VenueSelectType = z.infer<typeof VenueSelectSchema>;
