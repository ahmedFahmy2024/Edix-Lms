import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function authMiddleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // matcher tells Next.js which routes to run the middleware on.
  // This runs the middleware on all routes except for static assets.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};

export default async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return authMiddleware(request);
  }

  return NextResponse.next();
}
