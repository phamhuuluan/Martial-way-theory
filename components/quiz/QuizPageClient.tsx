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
    return null;
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
