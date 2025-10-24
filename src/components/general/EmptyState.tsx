import { Ban } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonLabel: string;
  buttonLink: string;
}

export default function EmptyState({
  title,
  description,
  buttonLabel,
  buttonLink,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col h-full flex-1 items-center justify-center rounded-md border-dashed border p-8 text-center animate-in fade-in-50">
      <div className="flex size-20 items-center justify-center rounded-full bg-primary/10 p-3 text-primary">
        <Ban className="h-12 w-12" />
      </div>
      <h2 className="mt-6 text-2xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <Link
        href={buttonLink}
        className={buttonVariants({ variant: "default", className: "mt-6" })}
      >
        {buttonLabel}
      </Link>
    </div>
  );
}
