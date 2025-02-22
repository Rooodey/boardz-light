import { auth } from "~/server/auth/auth";

export const middleware = auth;

export const config = {
  matcher: ["/account"],
};
