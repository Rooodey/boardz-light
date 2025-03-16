"use client";

import { useQuery } from "@tanstack/react-query";
import { Typography } from "~/components/typography";
import UserRow from "~/components/user-row";
import { getUsers } from "~/lib/user-service";

export default function UserList() {
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  return (
    <div className="flex flex-col items-start justify-start gap-4">
      {!users && <Typography>No Users yet...</Typography>}
      {users?.map((user) => (
        <UserRow
          key={user.user?.id}
          userName={user.user_profiles.userName}
          image={user.user?.image ?? undefined}
          href={`/user/${user.user_profiles.userName}`}
        />
      ))}
    </div>
  );
}
