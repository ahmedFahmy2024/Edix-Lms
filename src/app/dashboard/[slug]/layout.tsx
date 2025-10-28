import { getCourseSidebarData } from "@/app/data/course/get-course-sidebar-data";
import React from "react";
import CourseSidebar from "../_components/CourseSidebar";

interface Props {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

export default async function CourseLayout({ children, params }: Props) {
  const { slug } = await params;

  const courseSidebarData = await getCourseSidebarData(slug);

  return (
    <div className="flex flex-1">
      {/* sidebar */}
      <div className="w-80 border-r border-border shrink-0">
        <CourseSidebar course={courseSidebarData.course} />
      </div>

      {/* main content */}
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
