"use client";

import { LessonContentType } from "@/app/data/course/get-lesson-content";
import { RenderDescription } from "@/components/rich-text-editor/RenderDescription";
import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { BookIcon, CheckCircle } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { markLessonComplete } from "../actions/actions";
import { useConfetti } from "@/hooks/use-confetti";

type Props = {
  data: LessonContentType;
};

export default function CourseContent({ data }: Props) {
  const [isPending, startTransition] = useTransition();
  const { triggerConfetti } = useConfetti();

  function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        markLessonComplete(data.id, data.Chapter.Course.slug)
      );

      if (error) {
        console.error(error);
        toast.error(error.message);
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        triggerConfetti();
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }

  return (
    <div className="flex flex-col h-full bg-background pl-6">
      <VideoPlayer thumbnailKey={data.thumbnailKey} videoKey={data.videoKey} />

      <div className="py-4 border-b">
        {data.LessonProgress.length > 0 ? (
          <Button
            variant="outline"
            onClick={onSubmit}
            disabled={isPending}
            className="bg-green-500/10 text-green-500 hover:text-green-600"
          >
            <CheckCircle className="size-4 mr-2 text-green-500" />
            Completed
          </Button>
        ) : (
          <Button variant="outline" onClick={onSubmit} disabled={isPending}>
            <CheckCircle className="size-4 mr-2 text-green-500" />
            Mark as Completed
          </Button>
        )}
      </div>

      <div className="space-y-3 pt-3">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {data.title}
        </h1>
        {data.description && (
          <RenderDescription json={JSON.parse(data.description)} />
        )}
      </div>
    </div>
  );
}

function VideoPlayer({
  thumbnailKey,
  videoKey,
}: {
  thumbnailKey: string | null;
  videoKey: string | null;
}) {
  const videoUrl = useConstructUrl(videoKey ?? "");
  const thumbnailUrl = useConstructUrl(thumbnailKey ?? "");

  if (!videoKey) {
    return (
      <div className="aspect-video bg-muted rounded-lg flex flex-col items-center justify-center">
        <BookIcon className="size-16 mx-auto mb-4 text-primary" />
        <p className="text-center text-muted-foreground">
          This Lesson doesnt have any video uploaded
        </p>
      </div>
    );
  }

  return (
    <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
      <video
        poster={thumbnailUrl}
        controls
        className="w-full h-full object-cover"
      >
        <source src={videoUrl} type="video/mp4" />
        <source src={videoUrl} type="video/webm" />
        <source src={videoUrl} type="video/ogg" />
        <track kind="captions" srcLang="en" src="" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
