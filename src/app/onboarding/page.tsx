import { redirect } from "next/navigation";
import { OnboardingForm } from "~/app/onboarding/components/onboarding-form";
import { Typography } from "~/components/typography";
import { auth } from "~/server/auth/auth";

export default async function Page() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="relative mx-auto flex max-w-xl flex-grow flex-col gap-4 p-4 sm:p-6">
      <Typography variant={"h3"}>Please complete your first login: </Typography>
      <OnboardingForm />
    </div>
  );
}
