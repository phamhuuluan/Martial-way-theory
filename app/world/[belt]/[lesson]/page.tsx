import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllLessonParams, getLessonContent, getLessonId } from '@/lib/content';
import { getBeltById } from '@/lib/constants';
import { serializeMdx } from '@/lib/mdx';
import { buildLessonQuestionCopyTexts } from '@/lib/lesson-question-copy';
import { parseLessonSections } from '@/lib/lesson-sections';
import { LessonPageClient } from '@/components/lesson/LessonPageClient';

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
  if (!data) return { title: 'Bài học' };
  return {
    title: data.meta.title,
    description: data.meta.subtitle,
  };
}

export default async function LessonPage({ params }: Props) {
  const { belt, lesson } = await params;

  const data = getLessonContent(
    belt as Parameters<typeof getLessonContent>[0],
    lesson
  );
  if (!data) notFound();

  const world = getBeltById(belt as Parameters<typeof getBeltById>[0]);
  const lessonId = getLessonId(
    belt as Parameters<typeof getLessonId>[0],
    lesson
  );
  const mdxSource = await serializeMdx(data.content);
  const sections = parseLessonSections(data.content);
  const questionCopyTexts = buildLessonQuestionCopyTexts(data.content, sections);

  return (
    <Suspense fallback={null}>
      <LessonPageClient
        meta={data.meta}
        mdxSource={mdxSource}
        lessonId={lessonId}
        world={world}
        sections={sections}
        questionCopyTexts={questionCopyTexts}
      />
    </Suspense>
  );
}
