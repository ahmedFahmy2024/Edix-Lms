import { getAllCourses } from "@/app/data/course/get-all-courses";
import {
  PublicCourseCard,
  PublicCourseCardSkeleton,
} from "../_components/PublicCourseCard";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function PublicCoursesRoute() {
  return (
    <div className="mt-5">
      <div className="flex flex-col gap-y-2 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Explore Courses
        </h1>
        <p className="text-muted-foreground">
          Browse a wide range of courses to enhance your knowledge and skills.
        </p>
      </div>
      <Suspense fallback={<CoursesSkeleton />}>
        <RenderCourses />
      </Suspense>
    </div>
  );
}

async function RenderCourses() {
  const courses = await getAllCourses();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <PublicCourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

function CoursesSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-7">
      {Array.from({ length: 4 }).map((_, i) => (
        <PublicCourseCardSkeleton key={i} />
      ))}
    </div>
  );
}
