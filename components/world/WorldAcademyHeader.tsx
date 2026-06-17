'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, ScrollText } from 'lucide-react';
import type { BeltWorld, LessonMeta } from '@/types';
import { VIRTUES, getLessonSlugFromId } from '@/lib/constants';
import { getBeltCompletionPercent, isBeltCompleted } from '@/lib/progress';
import {
  getBeltAverageQuizScore,
  getCompletedLessonCount,
  getContinueLessonInBelt,
  getRemainingMinutesInBelt,
} from '@/lib/world-helpers';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { ProgressBar } from '@/components/ui/Progress';
import { useProgressStore } from '@/store/progress-store';
import { cn } from '@/lib/utils';

interface WorldAcademyHeaderProps {
  world: BeltWorld;
  lessons: LessonMeta[];
}

export function WorldAcademyHeader({ world, lessons }: WorldAcademyHeaderProps) {
  const progress = useProgressStore((s) => s.progress);
  const percent = getBeltCompletionPercent(world.id, progress);
  const completed = isBeltCompleted(world.id, progress);
  const completedCount = getCompletedLessonCount(lessons, progress);
  const averageScore = getBeltAverageQuizScore(world.id, progress);
  const continueLesson = getContinueLessonInBelt(lessons, progress);
  const remainingMinutes = getRemainingMinutesInBelt(lessons, progress);
  const continueHref = `/world/${world.id}/${getLessonSlugFromId(continueLesson.id)}`;

  return (
    <header className="world-academy-header mb-8 lg:mb-10" aria-label="Thư viện võ đạo">
      <div className="world-academy-header__accent" style={{ background: world.colors.accent }} />

      <div className="world-academy-header__inner">
        <div className="mb-4">
          <Breadcrumb
            items={[
              { label: 'Hành trình', href: '/journey' },
              { label: world.name },
            ]}
            className="mb-3"
          />
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="world-academy-header__eyebrow">
                <ScrollText className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
                Thư viện lý thuyết
              </p>
              <h1
                className="world-academy-header__title font-display text-2xl font-bold sm:text-[1.75rem]"
                style={{ color: world.colors.accent }}
              >
                {world.name}
              </h1>
              <p className="mt-1 text-sm text-text-secondary">{world.scene}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {world.virtues.map((v) => (
                  <span key={v} className="world-academy-header__virtue">
                    {VIRTUES[v]?.icon} {VIRTUES[v]?.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="world-academy-header__progress shrink-0 text-right">
              <p className="world-academy-header__percent font-display tabular-nums">
                {percent}%
              </p>
              <p className="text-xs text-text-muted">
                {completedCount}/{world.totalLessons} bài
              </p>
            </div>
          </div>
        </div>

        <ProgressBar value={percent} color={world.colors.accent} size="md" className="mb-4" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-text-secondary">
            {!completed && remainingMinutes > 0 && (
              <>Còn khoảng {remainingMinutes} phút nội dung · </>
            )}
            {averageScore !== null ? (
              <>Điểm TB quiz {averageScore}%</>
            ) : (
              <>Chưa có điểm quiz</>
            )}
          </p>

          <Link
            href={continueHref}
            className={cn('world-cta-primary shrink-0', completed && 'world-cta-secondary')}
          >
            {completed ? (
              <>
                <BookOpen className="h-4 w-4" strokeWidth={2} />
                Xem lại bài học
              </>
            ) : (
              <>
                Tiếp tục học
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
