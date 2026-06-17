'use client';

import { useMemo } from 'react';
import type { BeltWorld } from '@/types';
import { getLessonQuizCtaStyles } from '@/lib/lesson-quiz-cta-theme';
import { cn } from '@/lib/utils';
import { Lock } from 'lucide-react';

interface LessonQuizCtaProps {
  colors: BeltWorld['colors'];
  lightMode?: boolean;
  canQuiz: boolean;
  isLoading: boolean;
  onClick: () => void;
  variant?: 'default' | 'inline';
}

export function LessonQuizCta({
  colors,
  lightMode = false,
  canQuiz,
  isLoading,
  onClick,
  variant: _variant = 'default',
}: LessonQuizCtaProps) {
  const themeStyle = useMemo(
    () => getLessonQuizCtaStyles(colors, canQuiz, lightMode),
    [colors, canQuiz, lightMode]
  );

  return (
    <button
      type="button"
      disabled={!canQuiz || isLoading}
      aria-disabled={!canQuiz || isLoading}
      aria-label={
        canQuiz ? 'Làm bài kiểm tra' : 'Làm bài kiểm tra — chưa đủ điều kiện'
      }
      onClick={onClick}
      style={themeStyle}
      className={cn(
        'lesson-quiz-cta w-full',
        canQuiz ? 'lesson-quiz-cta--unlocked' : 'lesson-quiz-cta--locked',
        isLoading && 'lesson-quiz-cta--loading'
      )}
    >
      <span className="inline-flex items-center justify-center gap-2">
        <Lock
          className={cn(
            'h-3 w-3 shrink-0 transition-opacity duration-500',
            canQuiz ? 'opacity-0' : 'opacity-40'
          )}
          aria-hidden={canQuiz}
        />
        Làm bài kiểm tra →
      </span>
    </button>
  );
}
