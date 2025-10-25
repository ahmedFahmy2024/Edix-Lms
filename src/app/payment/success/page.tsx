/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
"use client";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useConfetti } from "@/hooks/use-confetti";
import { ArrowLeft, CheckIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function PaymentSuccess() {
  const { triggerConfetti } = useConfetti();

  useEffect(() => {
    triggerConfetti();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-1 justify-center items-center">
      <Card className="w-[350px]">
        <CardContent>
          <div className="flex justify-center w-full">
            <CheckIcon className="size-12 p-2 bg-green-500/30 text-green-500 rounded-full" />
          </div>

          <div className="flex flex-col items-center justify-center w-full mt-3 sm:mt-5">
            <h1 className="text-2xl font-semibold">Payment Success</h1>
            <p className="text-sm text-muted-foreground mt-2 text-center">
              Your payment was successful. Please go to your dashboard to view
              your course.
            </p>

            <Link
              href="/dashboard"
              className={buttonVariants({ className: "w-full mt-5" })}
            >
              <ArrowLeft className=" size-4" />
              Go to Dashboard
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
