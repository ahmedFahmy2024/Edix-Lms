"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { courseSchema, CourseSchemaType } from "@/lib/schema/courses.schema";
import { ApiResponse } from "@/lib/types";
import { headers } from "next/headers";

export async function CreateCourse(
  values: CourseSchemaType
): Promise<ApiResponse> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const validation = courseSchema.safeParse(values);

    if (!validation.success) {
      return {
        status: "error",
        message: "Invalid Form Data",
      };
    }

    const data = await prisma.course.create({
      data: {
        ...validation.data,
        userId: session?.user.id as string,
        status: "Draft",
      },
    });

    return {
      status: "success",
      message: "Course Created Successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Failed to create course",
    };
  }
}
