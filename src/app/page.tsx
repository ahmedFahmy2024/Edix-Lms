import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log("session", session);
  return (
    <div>
      <h1>hello world</h1>
      <ThemeToggle />
      {session?.user ? <p>hello {session.user.name}</p> : <p>hello guest</p>}
    </div>
  );
}
