"use server";

import { eq, or, getTableColumns } from "drizzle-orm";
import type { z } from "zod";
import { db } from "~/server/db/index";
import { users } from "~/server/db/schemas/auth-schemas";
import { friends } from "~/server/db/schemas/friends-schemas";
import {
  ExtendedUserProfile,
  userProfiles,
  type userProfileSchema,
} from "~/server/db/schemas/user-profiles";

export async function updateUserImage(
  userId: string,
  newImageUrl: string,
): Promise<string> {
  try {
    await db
      .update(users)
      .set({ image: newImageUrl })
      .where(eq(users.id, userId));
    console.log("User image updated successfully.");
    return newImageUrl;
  } catch (error) {
    console.error("Failed to update user image:", error);
    throw error;
  }
}

export async function getUserById(userId: string) {
  const profile = await db
    .select({
      ...getTableColumns(userProfiles),
      image: users.image,
    })
    .from(userProfiles)
    .leftJoin(users, eq(userProfiles.userId, users.id))
    .where(eq(userProfiles.userId, userId))
    .limit(1);

  if (!profile.length) {
    return null;
  }

  return profile[0];
}

export async function getUserByName(userName: string) {
  const profile = await db
    .select({
      ...getTableColumns(userProfiles),
      image: users.image,
    })
    .from(userProfiles)
    .leftJoin(users, eq(userProfiles.userId, users.id))
    .where(eq(userProfiles.userName, userName))
    .limit(1);

  if (!profile.length) {
    return null;
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
    return null;
  }

  return friends_result.filter(
    (friend) => friend.user_profiles.userId !== userId,
  );
}

export async function checkIfUserExists(userId: string) {
  const profile = await db
    .select()
    .from(userProfiles)
    .where(eq(userProfiles.userId, userId))
    .limit(1);

  return profile.length > 0;
}

export async function insertUser(
  insertData: z.infer<typeof userProfileSchema>,
) {
  try {
    await db.insert(userProfiles).values({ ...insertData });
  } catch (error) {
    console.error("Error at inserting UserProfile:", error);
    throw error; // oder anderweitig behandeln
  }
}

export async function getUsers() {
  const result = await db
    .select()
    .from(userProfiles)
    .leftJoin(users, eq(userProfiles.userId, users.id));

  return result;
}
