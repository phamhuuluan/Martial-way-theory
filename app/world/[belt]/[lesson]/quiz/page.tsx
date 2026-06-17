import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllLessonParams, getLessonContent, getQuizData } from '@/lib/content';
import { getBeltById, getLessonHref, getNextLessonId } from '@/lib/constants';
import { QuizPageClient } from '@/components/quiz/QuizPageClient';

interface Props {
  params: Promise<{ belt: string; lesson: string }>;
}

export async function generateStaticParams() {
  return getAllLessonParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { belt, lesson } = await params;
  const data = getLessonContent(
    belt as Parameters<typeof getLessonContent>[0],
    lesson
  );
  if (!data) return { title: 'Kiểm tra' };
  return {
    title: `Kiểm tra: ${data.meta.title}`,
    description: `Bài kiểm tra lý thuyết ${data.meta.subtitle}`,
  };
}

export default async function QuizPage({ params }: Props) {
  const { belt, lesson } = await params;

  const lessonData = getLessonContent(
    belt as Parameters<typeof getLessonContent>[0],
    lesson
  );
  if (!lessonData) notFound();

  const lessonId = lessonData.meta.id;
  const quiz = getQuizData(lessonId);
  if (!quiz) notFound();

  const world = getBeltById(belt as Parameters<typeof getBeltById>[0]);
  const nextId = getNextLessonId(lessonId);
  const nextLessonHref = nextId ? getLessonHref(nextId) : null;

  return (
    <QuizPageClient
      quiz={quiz}
      lessonId={lessonId}
      belt={belt}
      lessonSlug={lesson}
      beltAccent={world.colors.accent}
      nextLessonHref={nextLessonHref}
    />
  );
}
