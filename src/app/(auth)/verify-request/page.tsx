"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2Icon, Send } from "lucide-react";

export default function VerifyRequest() {
  const [otp, setOtp] = useState("");
  const [emailPending, startEmailTransition] = useTransition();
  const params = useSearchParams();
  const email = params.get("email") as string;
  const router = useRouter();
  const isOtpCompleted = otp.length === 6;

  async function verifyOtp() {
    startEmailTransition(async () => {
      const { data, error } = await authClient.signIn.emailOtp({
        email,
        otp,
        fetchOptions: {
          onSuccess: () => {
            toast.success("OTP verified successfully");
            router.push("/");
          },
          onError: () => {
            toast.error("Something went wrong");
          },
        },
      });
    });
  }

  return (
    <Card className="w-full mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Please check your email</CardTitle>
        <CardDescription>
          We have sent a verification email code to your email address. Please
          open the email and paste the code here.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        <div className="flex flex-col items-center justify-center gap-y-2">
          <InputOTP
            value={otp}
            onChange={(value) => setOtp(value)}
            maxLength={6}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-sm text-muted-foreground">
            Enter the 6 digit code sent to your email
          </p>
        </div>

        <Button
          onClick={verifyOtp}
          disabled={emailPending || !isOtpCompleted}
          className="w-full"
        >
          {emailPending ? (
            <>
              <Loader2Icon className="mr-2 size-4 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <Send className="mr-2 size-4" />
              <span>Verify OTP</span>
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
