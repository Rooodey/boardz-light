import "~/styles/globals.css";
import { SessionProvider } from "next-auth/react";

import { Nunito_Sans } from "next/font/google";
import { type Viewport, type Metadata } from "next";
import { auth } from "~/server/auth/auth";
import AppNavbar from "~/components/app-navbar";
import TopNav from "~/components/topnav";
import { getUserById } from "~/lib/user-service";
import { type DefaultSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import UserProfileProvider from "~/contexts/UserProfileProvider";
import { ReactQueryProvider } from "~/lib/react-query-provider";
import { Typography } from "~/components/typography";
import { OnboardingForm } from "./onboarding/components/onboarding-form";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"], // font-light, font-normal, font-semibold, font-bold
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "bordz",
  description: "Social Network for Boardgamers",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  return (
    <html lang="en" className={`${nunito.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <SessionProvider session={session}>
          <ReactQueryProvider>
            {session ? (
              <LoggedInLayout session={session}>{children}</LoggedInLayout>
            ) : (
              <LoggedOutLayout>{children}</LoggedOutLayout>
            )}
          </ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

function LoggedOutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNav />
      <main className="flex flex-grow">{children}</main>
    </>
  );
}

async function LoggedInLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: DefaultSession;
}) {
  if (!session?.user?.id) {
    return notFound();
  }
  const userProfile = await getUserById(session.user.id);

  if (!userProfile) {
    return (
      <>
        <AppNavbar />
        <main className="mb-14 flex flex-grow md:mb-0 md:ml-64">
          <div className="relative mx-auto flex max-w-xl flex-grow flex-col gap-4 p-4 sm:p-6">
            <Typography variant={"h3"}>
              Please complete your first login:{" "}
            </Typography>
            <OnboardingForm />
          </div>
        </main>
      </>
    );
  }
  return (
    <UserProfileProvider initialProfile={userProfile}>
      <AppNavbar />
      <main className="mb-14 flex flex-grow md:mb-0 md:ml-64">{children}</main>
    </UserProfileProvider>
  );
}
