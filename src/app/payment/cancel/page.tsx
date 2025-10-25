import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, XIcon } from "lucide-react";
import Link from "next/link";

export default function PaymentCancelled() {
  return (
    <div className="w-full min-h-screen flex flex-1 justify-center items-center">
      <Card className="w-[350px]">
        <CardContent>
          <div className="flex justify-center w-full">
            <XIcon className="size-12 p-2 bg-red-500/30 text-red-500 rounded-full" />
          </div>

          <div className="flex flex-col items-center justify-center w-full mt-3 sm:mt-5">
            <h1 className="text-2xl font-semibold">Payment Cancelled</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Your payment was cancelled. Please try again.
            </p>

            <Link
              href="/"
              className={buttonVariants({ className: "w-full mt-5" })}
            >
              <ArrowLeft className=" size-4" />
              Go to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
