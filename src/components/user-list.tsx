"use client";

import { Typography } from "~/components/typography";
import UserRow from "~/components/user-row";
import { useUserResourceQuery } from "~/hooks/useUserResourceQuery";
import { getUsers } from "~/lib/user-service";
import { type ExtendedUserProfileSelectType } from "~/server/db/types/user-types";

export default function UserList() {
  const { data: users = [] } =
    useUserResourceQuery<ExtendedUserProfileSelectType>({
      key: "users",
      fetcherAction: getUsers,
    });

  return (
    <div className="flex flex-col items-start justify-start gap-4">
      {!users && <Typography>No Users yet...</Typography>}
      {users?.map((user) => (
        <UserRow
          key={user.userId}
          userName={user.userName}
          image={user.image ?? undefined}
          href={`/user/${user.userName}`}
        />
      ))}
    </div>
  );
}
