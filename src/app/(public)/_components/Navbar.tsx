"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/final.png";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { authClient } from "@/lib/auth-client";
import { buttonVariants } from "@/components/ui/button";
import UserDropdown from "./UserDropdown";

const navigationItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Courses",
    href: "/courses",
  },
  {
    label: "Dashboard",
    href: "/dashboard",
  },
];

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center min-h-16 mx-auto px-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-x-2 mr-2">
          <Image src={logo} alt="Logo" className="size-9 rounded-sm" />
          <span className="font-bold">EdixLMS</span>
        </Link>

        <nav className="hidden md:flex md:items-center md:justify-between md:flex-1">
          <ul className="flex items-center gap-x-2 flex-1">
            {navigationItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-x-2">
            <ThemeToggle />

            {isPending ? null : session ? (
              <UserDropdown
                email={session.user.email}
                name={session.user.name}
                image={session.user.image || ""}
              />
            ) : (
              <>
                <Link
                  href="/login"
                  className={buttonVariants({ variant: "secondary" })}
                >
                  Login
                </Link>

                <Link href="/login" className={buttonVariants()}>
                  get started
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
