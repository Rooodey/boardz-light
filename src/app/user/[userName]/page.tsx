import { notFound } from "next/navigation";

import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { userProfiles } from "~/server/db/schemas/user-profiles";

// Optional: Für statische Generierung aller User-Seiten
export async function generateStaticParams() {
  const allUsers = await db
    .select({ userName: userProfiles.userName })
    .from(userProfiles);
  return allUsers.map((user) => ({ userName: user.userName.toString() }));
}

interface UserPageProps {
  params: Promise<{ userName: string }>;
}

export default async function UserPage({ params }: UserPageProps) {
  const { userName } = await params;

  const userResult = await db
    .select()
    .from(userProfiles)
    .where(eq(userProfiles.userName, userName))
    .limit(1);

  if (!userResult || userResult.length === 0) {
    return notFound();
  }

  const currentUser = userResult[0];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{currentUser?.userName}</h1>
      {/* Hier kannst du weitere User-Details rendern */}
    </div>
  );
}
