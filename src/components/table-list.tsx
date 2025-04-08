"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import TableCard from "~/components/table-card";
import { Typography } from "~/components/typography";
import { Button } from "~/components/ui/button";
import { useUserProfile } from "~/contexts/UserProfileContext";
import { useUserResourceQuery } from "~/hooks/useUserResourceQuery";
import { getTablesByUserId } from "~/lib/table-services";
import type {
  TableInputType,
  TableSelectType,
} from "~/server/db/types/table-types";

export default function TableList() {
  const { data: session } = useSession();
  const { profile } = useUserProfile();
  const router = useRouter();
  const { data } = useUserResourceQuery<TableSelectType>({
    key: "tables",
    fetcherAction: getTablesByUserId,
    userId: profile.userId,
  });

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {data?.length === 0 && <Typography>No Tables yet...</Typography>}
      {session?.user.id === profile?.userId && (
        <Button
          variant={"accent"}
          className="my-2 w-full"
          onClick={() => router.push("/create-table")}
        >
          Create New Table
        </Button>
      )}
      {data?.map((table) => (
        <Suspense key={table.id} fallback={<div>loading...</div>}>
          <TableCard
            key={table.id}
            image={table.image}
            name={table.name}
            description={table.description}
          />
        </Suspense>
      ))}
    </div>
  );
}
