'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { QuizData } from '@/types';
import { QuizEngine } from '@/components/quiz/QuizEngine';
import { isLessonUnlocked, isLessonReadingComplete } from '@/lib/progress';
import { useProgressStore } from '@/store/progress-store';

interface QuizPageClientProps {
  quiz: QuizData;
  lessonId: string;
  belt: string;
  lessonSlug: string;
  beltAccent: string;
  nextLessonHref: string | null;
}

export function QuizPageClient(props: QuizPageClientProps) {
  const router = useRouter();
  const hydrated = useProgressStore((s) => s.hydrated);
  const progress = useProgressStore((s) => s.progress);
  const unlocked = isLessonUnlocked(props.lessonId, progress);
  const readProgress = progress.lessons[props.lessonId]?.readProgress ?? 0;
  const readingComplete = isLessonReadingComplete(
    readProgress,
    progress,
    props.lessonId
  );

  useEffect(() => {
    if (!hydrated) return;

    if (!unlocked || !readingComplete) {
      router.replace(`/world/${props.belt}/${props.lessonSlug}?quizLocked=1`);
    }
  }, [
    hydrated,
    unlocked,
    readingComplete,
    router,
    props.belt,
    props.lessonSlug,
  ]);

  if (!hydrated || !unlocked || !readingComplete) {
    return (
      <div className="mx-auto max-w-lg px-4 py-8" aria-busy="true" aria-label="Đang tải bài kiểm tra">
        <div className="mb-6">
          <div className="mb-2 h-4 w-24 rounded bg-border/70" />
          <div className="h-1 rounded-full bg-border" />
        </div>
        <div className="mb-6 h-7 w-4/5 max-w-md rounded bg-border/70" />
        <div className="space-y-3">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="h-[3.75rem] rounded-[var(--radius-md)] bg-border/50" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <QuizEngine
      quiz={props.quiz}
      lessonId={props.lessonId}
      belt={props.belt}
      lessonSlug={props.lessonSlug}
      beltAccent={props.beltAccent}
      nextLessonHref={props.nextLessonHref}
    />
  );
}
