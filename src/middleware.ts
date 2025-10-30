import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export const config = {
  // Only run middleware on admin routes to reduce bundle size
  matcher: ["/admin/:path*"],
};

export default async function middleware(request: NextRequest) {
  try {
    // Get session from the auth library
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    // Check if user is authenticated
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Check if user has admin role
    if (session.user.role !== "admin") {
      return NextResponse.redirect(new URL("/not-admin", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    // If there's an error getting the session, redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
