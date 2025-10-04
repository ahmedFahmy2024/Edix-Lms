"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { Loader2Icon, Send } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [githubPending, startGithubTransition] = useTransition();
  const [emailPending, startEmailTransition] = useTransition();
  const [email, setEmail] = useState("");
  const router = useRouter();

  async function signInWithGithub() {
    startGithubTransition(async () => {
      const data = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in With Github, you will be redirected...");
          },
          onError: () => {
            toast.error("Something went wrong");
          },
        },
      });

      console.log("data", data);
    });
  }

  async function signInWithEmail() {
    startEmailTransition(async () => {
      const { data } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "sign-in", // required
        fetchOptions: {
          onSuccess: () => {
            toast.success("OTP sent successfully");
            router.push(`/verify-request?email=${email}`);
          },
          onError: () => {
            toast.error("Something went wrong");
          },
        },
      });

      console.log("data", data);
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>
          Login with your Github or Email Account
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Button
          disabled={githubPending}
          onClick={signInWithGithub}
          className="w-full"
          variant="outline"
        >
          {githubPending ? (
            <>
              <Loader2Icon className="mr-2 size-4 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <GithubIcon className="size-4" />
              Sign in with Github
            </>
          )}
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <Button
            disabled={emailPending}
            onClick={signInWithEmail}
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
                <span>Continue with Email</span>
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
