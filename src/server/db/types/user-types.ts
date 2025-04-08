import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { userProfiles } from "../schemas/user-profiles";

export const UserProfileInsertSchema = createInsertSchema(userProfiles, {
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
  points: z.number().default(0),
  awards: z.number().default(0),
}).omit({
  createdAt: true,
});

export type UserProfileInputType = z.input<typeof UserProfileInsertSchema>;

export const UserProfileSelectSchema = createSelectSchema(userProfiles);
export type ExtendedUserProfileSelectType = z.infer<
  typeof UserProfileSelectSchema
> & {
  image?: string | null;
};
