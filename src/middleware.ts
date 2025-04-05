import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const sessionToken =
    req.cookies.get("authjs.session-token")?.value ??
    req.cookies.get("__Secure-authjs.session-token")?.value;

  if (!sessionToken) {
    console.log("❌ No session token found, redirecting...");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/user/:path*",
    "/settings/:path*",
    "/search/:path*",
    "/create-table",
    "/create-event",
    "/create-venue",
    "/groups/:path*",
    "/events/:path*",
  ],
};
