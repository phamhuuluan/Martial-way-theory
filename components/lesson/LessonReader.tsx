'use client';

import { useRef } from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { mdxComponents } from '@/components/lesson/mdx-components';
import { LessonCopyProvider } from '@/components/lesson/LessonCopyContext';
import { LessonSectionProvider } from '@/components/lesson/LessonSectionContext';
import { TableOfContents } from '@/components/lesson/TableOfContents';
import { LessonQuizCta } from '@/components/lesson/LessonQuizCta';
import { useLessonReadingTracker } from '@/hooks/use-lesson-reading-tracker';
import { useLessonSectionTracker } from '@/hooks/use-lesson-section-tracker';
import type { LessonSection } from '@/lib/lesson-sections';
import type { BeltWorld } from '@/types';
import { useProgressStore } from '@/store/progress-store';
import { cn } from '@/lib/utils';

interface LessonReaderProps {
  mdxSource: MDXRemoteSerializeResult;
  lessonId: string;
  beltAccent: string;
  sections: LessonSection[];
  questionCopyTexts: Record<string, string>;
  initialProgress?: number;
  initialCompletedSections?: string[];
  questionsCount?: number;
  viewportBottomOffset?: number;
  onScrollProgress?: (progress: number) => void;
  onReadingComplete?: () => void;
  mobileTocOpen: boolean;
  onMobileTocOpenChange: (open: boolean) => void;
  quizColors: BeltWorld['colors'];
  quizLightMode?: boolean;
  canQuiz: boolean;
  onQuizClick: () => void;
}

const DEFAULT_BOTTOM_OFFSET = 80;
const QUIZ_REVEAL_THRESHOLD = 75;

export function LessonReader({
  mdxSource,
  lessonId,
  beltAccent,
  sections,
  questionCopyTexts,
  initialProgress = 0,
  initialCompletedSections = [],
  questionsCount,
  viewportBottomOffset = DEFAULT_BOTTOM_OFFSET,
  onScrollProgress,
  onReadingComplete,
  mobileTocOpen,
  onMobileTocOpenChange,
  quizColors,
  quizLightMode = false,
  canQuiz,
  onQuizClick,
}: LessonReaderProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const { displayProgress, isComplete } = useLessonReadingTracker({
    lessonId,
    contentRef,
    initialProgress,
    viewportBottomOffset,
    onProgress: onScrollProgress,
    onComplete: onReadingComplete,
  });

  const { activeSectionId, completedSections, scrollToSection } =
    useLessonSectionTracker({
      lessonId,
      contentRef,
      initialCompleted: initialCompletedSections,
      viewportBottomOffset,
    });

  const showQuizSection = displayProgress >= QUIZ_REVEAL_THRESHOLD || canQuiz;

  return (
    <LessonCopyProvider questionCopyTexts={questionCopyTexts}>
      <LessonSectionProvider sections={sections} questionsCount={questionsCount}>
      <div
        className="lesson-reading-progress fixed left-0 right-0 top-0 z-30 h-0.5 lg:left-60"
        role="progressbar"
        aria-valuenow={displayProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Tiến độ đọc bài học"
      >
        <div
          className="h-full transition-[width] duration-300 ease-out"
          style={{
            width: `${displayProgress}%`,
            backgroundColor: beltAccent,
            opacity: 0.75,
          }}
        />
      </div>

      <div className="lesson-reader">
        <div ref={contentRef} className="prose-lesson min-w-0">
          <MDXRemote {...mdxSource} components={mdxComponents} />
        </div>

        <div
          className={cn(
            'lesson-quiz-end mt-8 border-t border-border/25 pt-6 transition-opacity duration-300',
            showQuizSection ? 'opacity-100' : 'pointer-events-none opacity-0'
          )}
          aria-hidden={!showQuizSection}
        >
          <p className="mb-3 text-xs text-text-muted">
            {canQuiz
              ? `${displayProgress}% · Đủ điều kiện làm bài kiểm tra`
              : `${displayProgress}% · Đọc thêm để mở khóa bài kiểm tra`}
            {isComplete && canQuiz && (
              <span className="ml-1 text-success/80" aria-label="Hoàn thành">
                ✓
              </span>
            )}
          </p>
          <LessonQuizCta
            colors={quizColors}
            lightMode={quizLightMode}
            canQuiz={canQuiz}
            isLoading={false}
            onClick={onQuizClick}
            variant="default"
          />
        </div>
      </div>

      <TableOfContents
        sections={sections}
        activeSectionId={activeSectionId}
        completedSections={completedSections}
        onSectionClick={scrollToSection}
        mobileOpen={mobileTocOpen}
        onMobileOpenChange={onMobileTocOpenChange}
        beltAccent={beltAccent}
        readProgress={displayProgress}
      />
      </LessonSectionProvider>
    </LessonCopyProvider>
  );
}

export function useReadingProgress(lessonId: string) {
  const progress = useProgressStore((s) => s.progress);
  return progress.lessons[lessonId]?.readProgress ?? 0;
}
