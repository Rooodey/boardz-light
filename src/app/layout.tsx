import "~/styles/globals.css";
import { SessionProvider } from "next-auth/react";

import { Nunito_Sans } from "next/font/google";
import { Viewport, type Metadata } from "next";
import { auth } from "~/server/auth/auth";
import AppNavbar from "~/components/app-navbar";
import TopNav from "~/components/topnav";
import { getUserById } from "~/lib/user-service";
import { DefaultSession } from "next-auth";
import { notFound } from "next/navigation";
import UserProfileProvider from "~/contexts/UserProfileProvider";
import { ReactQueryProvider } from "~/lib/react-query-provider";

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
    return notFound();
  }
  return (
    <UserProfileProvider initialProfile={userProfile}>
      <AppNavbar />
      <main className="mb-14 flex flex-grow md:mb-0 md:ml-64">{children}</main>
    </UserProfileProvider>
  );
}
