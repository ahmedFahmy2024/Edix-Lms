import { getLessonContent } from "@/app/data/course/get-lesson-content";
import CourseContent from "./_components/CourseContent";

type Props = {
  params: Promise<{
    lessonId: string;
  }>;
};

export default async function LessonContentPage({ params }: Props) {
  const { lessonId } = await params;
  const data = await getLessonContent(lessonId);
  return <CourseContent data={data} />;
}
