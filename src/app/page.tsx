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
  return (
    <main className="flex flex-grow items-center justify-center p-6 md:ml-64">
      Welcome back! 🎉 Check out your feed.
    </main>
  );
}

function LoggedOutHome() {
  return (
    <main className="flex flex-grow items-center justify-center p-6">
      👋 Welcome! Sign up to get started.
    </main>
  );
}
