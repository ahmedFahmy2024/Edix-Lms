import "server-only";
import { requireUser } from "./require-user";
import { prisma } from "@/lib/db";

export async function getEnrolledCourses() {
  const user = await requireUser();

  const data = await prisma.enrollment.findMany({
    where: {
      userId: user.id,
      status: "Active",
    },
    select: {
      course: {
        select: {
          id: true,
          title: true,
          slug: true,
          smallDescription: true,
          fileKey: true,
          duration: true,
          level: true,
          chapter: {
            select: {
              id: true,
              lessons: {
                select: {
                  id: true,
                  LessonProgress: {
                    where: {
                      userId: user.id,
                    },
                    select: {
                      id: true,
                      lessonId: true,
                      completed: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return data;
}

export type EnrolledCourseType = Awaited<
  ReturnType<typeof getEnrolledCourses>
>[0];
