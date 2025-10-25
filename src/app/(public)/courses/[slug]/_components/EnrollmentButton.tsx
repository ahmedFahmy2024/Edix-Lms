"use client";

import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { useTransition } from "react";
import { enrollInCourseAction } from "../actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function EnrollmentButton({ courseId }: { courseId: string }) {
  const [isPending, startTransition] = useTransition();

  function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        enrollInCourseAction(courseId)
      );

      if (error) {
        toast.error("An error occurred while enrolling in the course.");
        console.log(error);
      }

      if (result?.status === "success") {
        toast.success("You have successfully enrolled in the course.");
      } else if (result?.status === "error") {
        toast.error(result.message);
      }
    });
  }

  return (
    <Button onClick={onSubmit} className="w-full" disabled={isPending}>
      {isPending ? (
        <>
          Enrolling... <Loader2 className="ml-2 size-4 animate-spin" />
        </>
      ) : (
        "Enroll Now"
      )}
    </Button>
  );
}
