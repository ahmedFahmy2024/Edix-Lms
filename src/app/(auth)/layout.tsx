import { buttonVariants } from "@/components/ui/button";
import { MoveLeftIcon } from "@/components/ui/MoveLeftIcon";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/final.png";

interface AuthProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthProps) {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center">
      <Link
        href="/"
        className={buttonVariants({
          variant: "outline",
          className: "absolute top-4 left-4",
        })}
      >
        <MoveLeftIcon className="size-4" />
        Back
      </Link>

      <div className="w-full max-w-sm flex flex-col gap-6">
        <Link
          className="flex items-center gap-2 font-medium self-center"
          href="/"
        >
          <Image
            src={logo}
            alt="Logo"
            className="object-contain aspect-square rounded-sm"
            width={32}
            height={32}
          />
          EdixLms
        </Link>
        {children}
        <div className="text-center text-sm text-muted-foreground text-balance">
          By clicking continue, you agree to our
          <span className="hover:text-primary hover:underline">
            Terms of service
          </span>
          and
          <span className="hover:text-primary hover:underline">
            Privacy Policy
          </span>
        </div>
      </div>
    </div>
  );
}
