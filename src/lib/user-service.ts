"use server";

import { eq, or, getTableColumns } from "drizzle-orm";
import { FriendProfile } from "./../server/db/types/friends-types";

import {
  type ActionResult,
  notFoundError,
  tryCatch,
  validationError,
} from "~/lib/error";
import { db } from "~/server/db/index";
import { users } from "~/server/db/schemas/auth-schemas";
import { friends } from "~/server/db/schemas/friends-schemas";
import { userProfiles } from "~/server/db/schemas/user-profiles";
import {
  type ExtendedUserProfileSelectType,
  type UserProfileInputType,
  UserProfileInsertSchema,
} from "~/server/db/types/user-types";

export async function updateUserImage(
  userId: string,
  newImageUrl: string,
): Promise<ActionResult<string>> {
  const result = await tryCatch(
    db.update(users).set({ image: newImageUrl }).where(eq(users.id, userId)),
  );
  if (result.error) {
    return { data: null, error: result.error };
  } else if (result.data?.length === 0) {
    return notFoundError("User not found.");
  }
  return { data: newImageUrl, error: null };
}

export async function getUserById(
  userId: string,
): Promise<ActionResult<ExtendedUserProfileSelectType | undefined | null>> {
  const result = await tryCatch(
    db
      .select({
        ...getTableColumns(userProfiles),
        image: users.image,
      })
      .from(userProfiles)
      .leftJoin(users, eq(userProfiles.userId, users.id))
      .where(eq(userProfiles.userId, userId))
      .limit(1)
      .execute(),
  );
  if (result.error) {
    return { data: null, error: result.error };
  }
  if (result.data.length === 0) {
    return { data: null, error: null };
  }
  return { data: result.data[0], error: null };
}

export async function getUserByName(
  userName: string,
): Promise<ActionResult<ExtendedUserProfileSelectType | undefined | null>> {
  const result = await tryCatch(
    db
      .select({
        ...getTableColumns(userProfiles),
        image: users.image,
      })
      .from(userProfiles)
      .leftJoin(users, eq(userProfiles.userId, users.id))
      .where(eq(userProfiles.userName, userName))
      .limit(1)
      .execute(),
  );
  if (result.error) {
    return { data: null, error: result.error };
  }
  if (result.data.length === 0) {
    return { data: null, error: null };
  }
  return { data: result.data[0], error: null };
}

export async function getFriends(
  userId: string,
): Promise<ActionResult<FriendProfile[]>> {
  const result = await tryCatch(
    db
      .select({
        userId: userProfiles.userId,
        userName: userProfiles.userName,
        points: userProfiles.points,
        image: users.image,
      })
      .from(friends)
      .innerJoin(
        userProfiles,
        or(
          eq(userProfiles.userId, friends.userId1),
          eq(userProfiles.userId, friends.userId2),
        ),
      )
      .innerJoin(users, eq(userProfiles.userId, users.id))
      .where(or(eq(friends.userId1, userId), eq(friends.userId2, userId)))
      .execute(),
  );
  if (result.error) {
    return { data: null, error: result.error };
  }
  if (result.data.length === 0) {
    return { data: [], error: null };
  }
  return {
    data: result.data.filter((friend) => friend.userId !== userId),
    error: null,
  };
}

export async function checkIfUserExists(
  userId: string,
): Promise<ActionResult<boolean>> {
  const result = await tryCatch(
    db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.userId, userId))
      .limit(1)
      .execute(),
  );
  if (result.error) {
    return { data: null, error: result.error };
  }
  return { data: result.data.length > 0, error: null };
}

export async function insertUser(
  input: UserProfileInputType,
): Promise<ActionResult<null>> {
  const parsed = UserProfileInsertSchema.safeParse(input);
  if (!parsed.success) {
    return validationError("Error at validating user input.");
  }
  const userData = parsed.data;
  const result = await tryCatch(db.insert(userProfiles).values(userData));
  if (result.error) {
    return { data: null, error: result.error };
  }
  return { data: null, error: null };
}

export async function getUsers(): Promise<
  ActionResult<ExtendedUserProfileSelectType[]>
> {
  const result = await tryCatch(
    db
      .select({
        ...getTableColumns(userProfiles),
        image: users.image,
      })
      .from(userProfiles)
      .leftJoin(users, eq(userProfiles.userId, users.id))
      .execute(),
  );

  if (result.error) {
    return { data: null, error: result.error };
  }
  return { data: result.data, error: null };
}
