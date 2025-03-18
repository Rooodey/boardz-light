"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import TableCard from "~/components/table-card";
import { Typography } from "~/components/typography";
import { Button } from "~/components/ui/button";
import { useUserProfile } from "~/contexts/UserProfileContext";
import { getTablesByUserId } from "~/lib/table-services";

export default function Page() {
  const { data: session } = useSession();
  const { profile } = useUserProfile();
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["tables", session?.user.id],
    queryFn: () => getTablesByUserId(session?.user.id ?? ""),
  });
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {!data && <Typography>No Tables yet...</Typography>}
      {session?.user.id === profile?.userId && (
        <Button
          variant={"accent"}
          className="my-2 w-full"
          onClick={() => router.push("/create-table")}
        >
          Create New Table
        </Button>
      )}
      <div className="w-full">
        {data?.map((table, index) => (
          <Suspense key={table.id} fallback={<div>loading...</div>}>
            <TableCard
              key={table.id}
              image={table.image}
              name={table.name}
              description={table.description}
              isLast={index === data.length - 1}
            />
          </Suspense>
        ))}
      </div>
    </div>
  );
}
