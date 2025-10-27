import { ChartAreaInteractive } from "@/components/sidebar/chart-area-interactive";
import { DataTable } from "@/components/sidebar/data-table";
import { SectionCards } from "@/components/sidebar/section-cards";

import data from "./data.json";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { adminGetRecentCourses } from "../data/admin/admiin-get-recent-courses";
import EmptyState from "@/components/general/EmptyState";
import AdminCourseCard, {
  AdminCourseCardSkeleton,
} from "./courses/_components/AdminCourseCard";
import { Suspense } from "react";

export default function AdminIndexPage() {
  return (
    <>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />

      <div className="px-4 lg:px-6 space-y-4 mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Courses</h2>
          <Link
            href="/admin/courses"
            className={buttonVariants({ variant: "outline" })}
          >
            View all courses
          </Link>
        </div>

        <Suspense fallback={<CoursesSkeleton />}>
          <RenderRecentCourses />
        </Suspense>
      </div>
    </>
  );
}

async function RenderRecentCourses() {
  const courses = await adminGetRecentCourses();

  if (courses.length === 0) {
    return (
      <EmptyState
        title="No courses found"
        description="No courses found"
        buttonLabel="create course"
        buttonLink="/admin/courses/create"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {courses.map((course) => (
        <AdminCourseCard key={course.id} data={course} />
      ))}
    </div>
  );
}

function CoursesSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-7">
      {Array.from({ length: 4 }).map((_, i) => (
        <AdminCourseCardSkeleton key={i} />
      ))}
    </div>
  );
}
