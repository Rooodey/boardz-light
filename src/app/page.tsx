import Link from "next/link";
import { Typography } from "~/components/typography";
import { Button } from "~/components/ui/button";
import { auth } from "~/server/auth/auth";

export default async function HomePage() {
  const session = await auth();

  if (session) {
    return <LoggedInHome />;
  } else {
    return <LoggedOutHome />;
  }
}

function LoggedInHome() {
  return <Typography>Still in progress...</Typography>;
}

function LoggedOutHome() {
  return (
    <div className="container mx-auto flex flex-grow flex-col items-center justify-center p-6 lg:flex-row">
      <div className="flex flex-1 flex-col space-y-20">
        <Typography variant={"h1"}>
          Your <span className="text-accent">Social </span>Network For Your Most
          Beloved Hobby!
        </Typography>
        <Button size={"xl"} className="max-w-fit" asChild>
          <Link href="/login">Joyn Our Community</Link>
        </Button>
      </div>
      <div className="flex-1"></div>
    </div>
  );
}
