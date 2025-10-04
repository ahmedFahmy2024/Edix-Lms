"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          toast.success("Signed out");
        },
      },
    });
  }

  console.log("session", session);
  return (
    <div>
      <h1>hello world</h1>
      <ThemeToggle />
      {session?.user ? (
        <div>
          <p>hello {session.user.name}</p>
          <Button onClick={signOut}>Sign out</Button>
        </div>
      ) : (
        <Button>Login</Button>
      )}
    </div>
  );
}
