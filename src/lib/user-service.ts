import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "~/server/db/index";
import {
  userProfiles,
  userProfileSchema,
} from "~/server/db/schemas/user-profiles";

export default async function getUser(userId: string) {
  const profile = await db
    .select()
    .from(userProfiles)
    .where(eq(userProfiles.userId, userId))
    .limit(1);

  if (!profile.length) {
    return notFound();
  }

  const validatedProfile = userProfileSchema.safeParse(profile[0]);

  if (!validatedProfile.success) {
    throw new Error("Invalid profile");
  }

  return profile[0];
}
