import { NextRequest, NextResponse } from "next/server";

export const config = {
  // Only run middleware on admin routes to reduce bundle size
  matcher: ["/admin/:path*"],
};

export default async function middleware(request: NextRequest) {
  // Simple auth check for admin routes
  const sessionCookie = request.cookies.get("better-auth.session_token");

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
