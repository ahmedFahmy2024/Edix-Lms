"use client";
import { EnrolledCourseType } from "@/app/data/user/get-enrolled-courses";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { useCourseProgress } from "@/hooks/use-course-progress";
import Image from "next/image";
import Link from "next/link";

export function CourseProgressCard({ course }: { course: EnrolledCourseType }) {
  const thumbnailUrl = useConstructUrl(course.course.fileKey);
  const { completedLessons, totalLessons, progressPercentage } =
    useCourseProgress({ courseData: course.course as any });

  return (
    <Card className="group relative py-0 gap-0">
      <Badge className="absolute top-2 right-2 z-10">
        {course.course.level}
      </Badge>
      <Image
        src={thumbnailUrl}
        alt={course.course.title}
        width={600}
        height={400}
        className="w-full h-full object-cover aspect-video rounded-t-xl"
      />

      <CardContent className="p-4">
        <Link
          href={`/dashboard/${course.course.slug}`}
          className="font-medium text-lg line-clamp-2 hover:underline group-hover:text-primary transition-colors"
        >
          {course.course.title}
        </Link>

        <p className="line-clamp-2 text-sm text-muted-foreground leading-tight mt-2">
          {course.course.smallDescription}
        </p>

        <div className="space-y-4 mt-5">
          <div className="flex justify-between mb-1 text-sm">
            <p>Progress:</p>
            <p>{progressPercentage}%</p>
          </div>
          <Progress value={progressPercentage} className="h-1.5" />

          <p className="text-xs text-muted-foreground">
            {completedLessons} of {totalLessons} lessons completed
          </p>
        </div>

        <Link
          href={`/dashboard/${course.course.slug}`}
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
