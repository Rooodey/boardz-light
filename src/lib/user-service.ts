import { eq, or } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "~/server/db/index";
import { friends } from "~/server/db/schemas/friends-schemas";
import {
  userProfiles,
  userProfileSchema,
} from "~/server/db/schemas/user-profiles";

export async function getUser(userId: string) {
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

export async function getFriends(userId: string) {
  const friends_result = await db
    .select()
    .from(friends)
    .where(or(eq(friends.userId1, userId), eq(friends.userId2, userId)))
    .innerJoin(
      userProfiles,
      or(
        eq(userProfiles.userId, friends.userId1),
        eq(userProfiles.userId, friends.userId2),
      ),
    );

  if (!friends_result.length) {
    return notFound();
  }

  return friends_result.filter(
    (friend) => friend.user_profiles.userId !== userId,
  );
}
