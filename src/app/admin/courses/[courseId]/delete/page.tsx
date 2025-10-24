"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { tryCatch } from "@/hooks/try-catch";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteCourse } from "./actions";
import { useParams } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";

export default function DeleteCourse() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { courseId } = useParams<{ courseId: string }>();

  function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(deleteCourse(courseId));

      if (error) {
        console.error(error);
        toast.error(error.message);
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        router.push("/admin/courses");
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Are you sure you want to delete this course?</CardTitle>
          <CardDescription>
            This action cannot be undone. This will permanently delete this
            course and remove your data from our servers.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <Link
            href={"/admin/courses"}
            className={buttonVariants({ variant: "outline" })}
          >
            Cancel
          </Link>
          <Button
            variant={"destructive"}
            onClick={onSubmit}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
