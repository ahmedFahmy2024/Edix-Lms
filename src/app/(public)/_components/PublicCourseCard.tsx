import { PublicCourseType } from "@/app/data/course/get-all-courses";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { School, TimerIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function PublicCourseCard({ course }: { course: PublicCourseType }) {
  const thumbnailUrl = useConstructUrl(course.fileKey);
  return (
    <Card className="group relative py-0 gap-0">
      <Badge className="absolute top-2 right-2 z-10">{course.level}</Badge>
      <Image
        src={thumbnailUrl}
        alt={course.title}
        width={600}
        height={400}
        className="w-full h-full object-cover aspect-video rounded-t-xl"
      />

      <CardContent className="p-4">
        <Link
          href={`/courses/${course.slug}`}
          className="font-medium text-lg line-clamp-2 hover:underline group-hover:text-primary transition-colors"
        >
          {course.title}
        </Link>

        <p className="line-clamp-2 text-sm text-muted-foreground leading-tight mt-2">
          {course.smallDescription}
        </p>

        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <TimerIcon className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <p className="text-sm text-muted-foreground">{course.duration}h</p>
          </div>

          <div className="flex items-center gap-x-2">
            <School className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <p className="text-sm text-muted-foreground">{course.category}</p>
          </div>
        </div>

        <Link
          href={`/courses/${course.slug}`}
          className={buttonVariants({ className: "mt-4 w-full" })}
        >
          Learn more
        </Link>
      </CardContent>
    </Card>
  );
}

export function PublicCourseCardSkeleton() {
  return (
    <Card className="overflow-hidden py-0">
      <div className="relative">
        <div className="absolute top-2 right-2 z-10">
          <Skeleton className="h-4 w-16 rounded-md" />
        </div>
        <Skeleton className="w-full h-40 rounded-t-xl" />
      </div>
      <CardContent className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-5/6 mb-4" />
        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex items-center gap-x-2">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        <Skeleton className="mt-4 h-10 w-full" />
      </CardContent>
    </Card>
  );
}
