import { prisma } from "@/lib/db";
import { env } from "@/lib/env";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";

// Disable body parsing, need raw body for signature verification
export const runtime = "nodejs";

export async function POST(req: Request) {
  // Get raw body as text (required for signature verification)
  const body = await req.text();

  const headerList = await headers();
  const signature = headerList.get("Stripe-Signature") as string;

  if (!signature) {
    return new Response("No signature provided", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new Response(
      `Webhook error: ${err instanceof Error ? err.message : "Unknown error"}`,
      { status: 400 }
    );
  }

  const session = event.data.object as Stripe.Checkout.Session;

  try {
    if (event.type === "checkout.session.completed") {
      const courseId = session.metadata?.courseId;
      const enrollmentId = session.metadata?.enrollmentId;
      const customerId = session.customer as string;

      if (!courseId) {
        console.error("Course ID not found in session metadata");
        return new Response("Course ID not found", { status: 400 });
      }

      if (!enrollmentId) {
        console.error("Enrollment ID not found in session metadata");
        return new Response("Enrollment ID not found", { status: 400 });
      }

      const user = await prisma.user.findUnique({
        where: {
          stripeCustomerId: customerId,
        },
      });

      if (!user) {
        console.error(`User not found for customer ID: ${customerId}`);
        return new Response("User not found", { status: 400 });
      }

      await prisma.enrollment.update({
        where: {
          id: enrollmentId,
        },
        data: {
          userId: user.id,
          courseId: courseId,
          amount: session.amount_total as number,
          status: "Active",
        },
      });

      console.log(
        `✅ Enrollment ${enrollmentId} activated for user ${user.id}`
      );
    }
  } catch (err) {
    console.error("Error processing webhook:", err);
    return new Response("Webhook processing error", { status: 500 });
  }

  return new Response(null, { status: 200 });
}
