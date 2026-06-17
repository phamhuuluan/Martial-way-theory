'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BELT_WORLDS } from '@/lib/constants';
import {
  getCurrentBelt,
  getCurrentLessonId,
  getOverallProgress,
  isBeltCompleted,
  isBeltUnlocked,
} from '@/lib/progress';
import { getBeltById, getLessonSlugFromId } from '@/lib/constants';
import { ProgressBar } from '@/components/ui/Progress';
import { WorldArtwork } from '@/components/journey/WorldArtwork';
import { useProgressStore } from '@/store/progress-store';
import { cn } from '@/lib/utils';

/** Compact overall progress — sits under page header without competing with belt cards */
export function JourneySummaryStrip() {
  const progress = useProgressStore((s) => s.progress);
  const overall = getOverallProgress(progress);
  const currentBeltId = getCurrentBelt(progress);
  const currentBelt = getBeltById(currentBeltId);
  const currentLessonId = getCurrentLessonId(progress);
  const allComplete = overall.completedLessons === overall.totalLessons;

  return (
    <div className="journey-summary mb-8 overflow-hidden rounded-xl border border-border/40 bg-bg-secondary/80 max-md:backdrop-blur-none sm:bg-bg-secondary/60 sm:backdrop-blur-sm">
      <div className="relative aspect-[2.8/1] min-h-[96px] max-h-[160px] w-full overflow-hidden sm:min-h-[112px]">
        <WorldArtwork beltId={currentBeltId} variant="banner" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-black/10" />
        <div className="absolute inset-0 flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4">
          <div className="min-w-0">
            <p className="text-xs text-white/70">
              {allComplete ? 'Hoàn thành hành trình' : 'Tiến độ tổng'}
            </p>
            <p
              className="font-display text-lg font-semibold leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] sm:text-xl"
              style={{ color: allComplete ? '#fff' : currentBelt.colors.accent }}
            >
              {allComplete ? '6/6 cấp đai' : currentBelt.name}
            </p>
            {!allComplete && (
              <p className="mt-0.5 truncate text-sm text-white/85 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
                {currentBelt.scene}
              </p>
            )}
          </div>
          <p className="font-display text-2xl font-bold tabular-nums text-unlock drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]">
            {overall.percent}%
            <span className="ml-1.5 text-xs font-normal text-white/75">
              ({overall.completedLessons}/{overall.totalLessons})
            </span>
          </p>
        </div>
      </div>

      <div className="px-4 py-3 sm:px-5 sm:py-4">
        <div className="mb-3 flex items-center gap-1">
          {BELT_WORLDS.map((belt) => {
            const completed = isBeltCompleted(belt.id, progress);
            const unlocked = isBeltUnlocked(belt.id, progress);
            const isCurrent = belt.id === currentBeltId;

            return (
              <div
                key={belt.id}
                className={cn(
                  'h-1.5 flex-1 rounded-full transition-all',
                  completed && 'bg-unlock/70',
                  isCurrent && !completed && 'bg-unlock shadow-[0_0_6px_rgba(255,215,0,0.35)]',
                  unlocked && !completed && !isCurrent && 'opacity-80',
                  !unlocked && 'bg-border/50'
                )}
                style={
                  unlocked && !completed && !isCurrent
                    ? { backgroundColor: `${belt.colors.accent}55` }
                    : undefined
                }
                title={belt.name}
              />
            );
          })}
        </div>

        <ProgressBar
          value={overall.percent}
          color={currentBelt.colors.accent}
          size="sm"
        />

        {!allComplete && (
          <Link
            href={`/world/${currentBeltId}/${getLessonSlugFromId(currentLessonId)}`}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-unlock transition-opacity hover:opacity-80"
          >
            Tiếp tục học
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
          </Link>
        )}
      </div>
    </div>
  );
}
