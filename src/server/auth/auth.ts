import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "~/server/db/index";
import NextAuth from "next-auth";
import { env } from "~/env";
import Discord from "next-auth/providers/discord";
import Google from "next-auth/providers/google";
import Apple from "next-auth/providers/apple";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Discord({
      clientId: env.AUTH_DISCORD_ID,
      clientSecret: env.AUTH_DISCORD_SECRET,
    }),
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    }),
    Apple({
      clientId: env.AUTH_APPLE_ID,
      clientSecret: env.AUTH_APPLE_SECRET,
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    session: (opts) => {
      if (!("user" in opts))
        throw new Error("unreachable with session strategy");

      return {
        ...opts.session,
        user: {
          ...opts.session.user,
          id: opts.user.id,
        },
      };
    },
  },
  pages: {
    signIn: "/login",
    // newUser: "/onboarding",
  },
});
