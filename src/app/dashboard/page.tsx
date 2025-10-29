import EmptyState from "@/components/general/EmptyState";
import { getAllCourses } from "../data/course/get-all-courses";
import { getEnrolledCourses } from "../data/user/get-enrolled-courses";
import { PublicCourseCard } from "../(public)/_components/PublicCourseCard";
import { CourseProgressCard } from "./_components/CourseProgressCard";

export default async function DashboardPage() {
  const [allCourses, enrolledCourses] = await Promise.all([
    getAllCourses(),
    getEnrolledCourses(),
  ]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Enrolled Courses</h1>
        <p className="text-muted-foreground">
          Here you can see all the courses you have access to
        </p>
      </div>

      {enrolledCourses.length === 0 ? (
        <EmptyState
          title="No enrolled courses"
          description="You have not enrolled in any courses yet."
          buttonLabel="Enroll in a course"
          buttonLink="/courses"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrolledCourses.map((course) => (
            <CourseProgressCard key={course.course.id} course={course} />
          ))}
        </div>
      )}

      <section className="mt-10">
        <div className="flex flex-col gap-2 mb-5">
          <h1 className="text-3xl font-bold">Available Courses</h1>
          <p className="text-muted-foreground">
            Here you can see all the courses you can purchase
          </p>
        </div>

        {allCourses.filter(
          (course) =>
            !enrolledCourses.some(
              (enrolledCourse) => enrolledCourse.course.id === course.id
            )
        ).length === 0 ? (
          <EmptyState
            title="No available courses"
            description="There are no courses available at the moment."
            buttonLabel="View courses"
            buttonLink="/courses"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allCourses
              .filter(
                (course) =>
                  !enrolledCourses.some(
                    (enrolledCourse) => enrolledCourse.course.id === course.id
                  )
              )
              .map((course) => (
                <PublicCourseCard key={course.id} course={course} />
              ))}
          </div>
        )}
      </section>
    </>
  );
}
