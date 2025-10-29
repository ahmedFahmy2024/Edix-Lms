import { NextRequest, NextResponse } from "next/server";
import arcjet, { detectBot } from "@arcjet/next";
import { env } from "@/lib/env";

const aj = arcjet({
  key: env.ARCJET_KEY,
  rules: [
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        "CATEGORY:MONITOR",
        "CATEGORY:PREVIEW",
        "STRIPE_WEBHOOK",
      ],
    }),
  ],
});

export async function POST(request: NextRequest) {
  const decision = await aj.protect(request);

  if (decision.isDenied()) {
    return NextResponse.json(
      { error: "Forbidden", reason: decision.reason },
      { status: 403 }
    );
  }

  return NextResponse.json({ allowed: true });
}
