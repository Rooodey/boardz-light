import { redirect } from "next/navigation";
import { auth } from "~/server/auth/auth";

export default async function AppContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="relative mx-auto flex max-w-lg flex-grow flex-col gap-4 p-4 sm:p-6">
      {children}
    </div>
  );
}
