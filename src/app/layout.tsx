import "~/styles/globals.css";
import { SessionProvider } from "next-auth/react";

import { Nunito_Sans } from "next/font/google";
import { type Metadata } from "next";
import { auth } from "~/server/auth/auth";
import AppNavbar from "~/components/app-navbar";
import TopNav from "~/components/topnav";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"], // font-light, font-normal, font-semibold, font-bold
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" className={`${nunito.variable} antialiased`}>
        <body className="flex min-h-screen flex-col">
          {session ? (
            <LoggedInLayout>{children}</LoggedInLayout>
          ) : (
            <LoggedOutLayout>{children}</LoggedOutLayout>
          )}
        </body>
      </html>
    </SessionProvider>
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

function LoggedInLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppNavbar />
      <main className="flex flex-grow md:ml-64">{children}</main>
    </>
  );
}
