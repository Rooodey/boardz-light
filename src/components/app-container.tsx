import { redirect } from "next/navigation";
import { checkIfUserExists } from "~/lib/user-service";
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
  const isUser = await checkIfUserExists(session.user.id);
  if (!isUser) {
    redirect("/onboarding");
  }

  return (
    <div className="relative mx-auto flex max-w-xl flex-grow flex-col gap-4 bg-white p-4 shadow-sm sm:p-6">
      {children}
    </div>
  );
}
