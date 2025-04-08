import { z } from "zod";

export const FriendProfileSchema = z.object({
  userId: z.string().uuid(),
  userName: z.string(),
  points: z.number(),
  image: z.string().nullable(),
});

export type FriendProfile = z.infer<typeof FriendProfileSchema>;
