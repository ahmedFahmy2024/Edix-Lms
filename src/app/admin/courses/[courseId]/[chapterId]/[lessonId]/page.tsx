import { adminGetLesson } from "@/app/data/admin/admin-get-lesson";
import LessonForm from "./_components/LessonForm";

type Props = {
  params: Promise<{ lessonId: string; chapterId: string; courseId: string }>;
};

export default async function LessonIdPage({ params }: Props) {
  const { lessonId, chapterId, courseId } = await params;
  const lesson = await adminGetLesson(lessonId);

  return (
    <div>
      <LessonForm data={lesson} chapterId={chapterId} courseId={courseId} />
    </div>
  );
}
