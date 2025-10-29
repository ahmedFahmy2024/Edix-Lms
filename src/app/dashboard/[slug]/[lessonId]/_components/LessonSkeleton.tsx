import { Skeleton } from "@/components/ui/skeleton";

export function LessonSkeleton() {
  return (
    <div className="flex flex-col h-full  pl-6">
      <div className="aspect-video rounded-lg flex flex-col items-center justify-center">
        <Skeleton className="h-16 w-16 rounded-full mb-4" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      <div className="py-4 border-b">
        <Skeleton className="h-10 w-1/2" />
      </div>

      <div className="space-y-3 pt-3">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
}
