import { prisma } from "@/lib/db";

export async function getAllCourses() {
  const data = await prisma.course.findMany({
    where: {
      status: "Published",
    },
    select: {
      id: true,
      title: true,
      slug: true,
      fileKey: true,
      price: true,
      status: true,
      smallDescription: true,
      level: true,
      duration: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export type PublicCourseType = Awaited<ReturnType<typeof getAllCourses>>[0];
