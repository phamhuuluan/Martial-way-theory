'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import type { BeltWorld, LessonMeta } from '@/types';
import type { LessonSection } from '@/lib/lesson-sections';
import { LessonReader } from '@/components/lesson/LessonReader';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import {
  getPrevLessonId,
  getNextLessonId,
  isLessonUnlocked,
  isLessonReadingComplete,
} from '@/lib/progress';
import { getLessonHref, READ_THRESHOLD } from '@/lib/constants';
import { formatLessonDisplayTitle } from '@/lib/lesson-sections';
import { useProgressStore } from '@/store/progress-store';
import { Clock, FileText } from 'lucide-react';

interface LessonPageClientProps {
  meta: LessonMeta;
  mdxSource: MDXRemoteSerializeResult;
  lessonId: string;
  world: BeltWorld;
  sections: LessonSection[];
  questionCopyTexts: Record<string, string>;
}

export function LessonPageClient({
  meta,
  mdxSource,
  lessonId,
  world,
  sections,
  questionCopyTexts,
}: LessonPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const quizLocked = searchParams.get('quizLocked') === '1';
  const progress = useProgressStore((s) => s.progress);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  const unlocked = isLessonUnlocked(lessonId, progress);
  const prevId = getPrevLessonId(lessonId);
  const nextId = getNextLessonId(lessonId);
  const prevHref = prevId ? getLessonHref(prevId) : null;
  const nextHref = nextId ? getLessonHref(nextId) : null;
  const storedProgress = progress.lessons[lessonId]?.readProgress ?? 0;
  const completedSections =
    progress.lessons[lessonId]?.completedSections ?? [];
  const effectiveProgress = Math.max(scrollProgress, storedProgress);
  const canQuiz = isLessonReadingComplete(effectiveProgress, progress, lessonId);

  useEffect(() => {
    if (!unlocked) {
      router.replace(`/world/${meta.belt}`);
    }
  }, [unlocked, router, meta.belt]);

  useEffect(() => {
    setScrollProgress(storedProgress);
  }, [storedProgress]);

  const handleScrollProgress = useCallback((value: number) => {
    setScrollProgress(value);
  }, []);

  const handleQuizClick = () => {
    if (!canQuiz) return;
    router.push(`/world/${meta.belt}/${meta.lessonSlug}/quiz`);
  };

  if (!unlocked) return null;

  const pageTitle = formatLessonDisplayTitle(meta.subtitle, meta.title);

  return (
    <div className="lesson-page min-h-screen pb-20 lg:pb-12">
      <div className="lesson-page__column mx-auto w-full max-w-[38rem] px-4 pt-4 lg:px-5">
        <Breadcrumb
          items={[
            { label: 'Hành trình', href: '/journey' },
            { label: world.name, href: `/world/${meta.belt}` },
            { label: pageTitle },
          ]}
          className="mb-4"
        />

        <header className="lesson-page__header mb-5">
          <h1 className="font-display text-[1.375rem] font-bold leading-snug text-text-primary lg:text-2xl">
            {pageTitle}
          </h1>
          <div className="mt-3 flex gap-4 text-xs text-text-muted">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              {meta.estimatedMinutes} phút
            </span>
            <span className="flex items-center gap-1">
              <FileText className="h-3.5 w-3.5" aria-hidden />
              {meta.quizQuestionsCount} câu
            </span>
          </div>
        </header>

        {quizLocked && !canQuiz && (
          <p
            role="alert"
            className="mb-4 text-sm text-warning"
          >
            Bạn cần đọc ít nhất {READ_THRESHOLD}% bài học trước khi vào bài kiểm
            tra.
          </p>
        )}

        <LessonReader
          mdxSource={mdxSource}
          lessonId={lessonId}
          beltAccent={world.colors.accent}
          sections={sections}
          questionCopyTexts={questionCopyTexts}
          initialProgress={storedProgress}
          initialCompletedSections={completedSections}
          questionsCount={meta.quizQuestionsCount}
          onScrollProgress={handleScrollProgress}
          mobileTocOpen={mobileTocOpen}
          onMobileTocOpenChange={setMobileTocOpen}
          quizColors={world.colors}
          quizLightMode={world.lightMode}
          canQuiz={canQuiz}
          onQuizClick={handleQuizClick}
        />

        {(prevHref || nextHref) && (
          <nav
            aria-label="Điều hướng bài học"
            className={`mt-8 flex gap-4 border-t border-border/25 pt-5 ${
              prevHref && nextHref
                ? 'justify-between'
                : prevHref
                  ? 'justify-start'
                  : 'justify-end'
            }`}
          >
            {prevHref && (
              <Link
                href={prevHref}
                className="text-sm text-text-muted transition-colors hover:text-text-secondary"
              >
                ← Bài trước
              </Link>
            )}
            {nextHref && (
              <Link
                href={nextHref}
                className="text-sm text-text-muted transition-colors hover:text-text-secondary"
              >
                Bài sau →
              </Link>
            )}
          </nav>
        )}
      </div>
    </div>
  );
}
