'use client';

import { ArrowRight, Compass, Flag } from 'lucide-react';
import Link from 'next/link';
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

export function JourneyProgressHeader() {
  const progress = useProgressStore((s) => s.progress);
  const overall = getOverallProgress(progress);
  const currentBeltId = getCurrentBelt(progress);
  const currentBelt = getBeltById(currentBeltId);
  const currentLessonId = getCurrentLessonId(progress);
  const allComplete = overall.completedLessons === overall.totalLessons;

  const currentBeltIndex = BELT_WORLDS.findIndex((b) => b.id === currentBeltId);
  const nextBelt =
    currentBeltIndex >= 0 && currentBeltIndex < BELT_WORLDS.length - 1
      ? BELT_WORLDS[currentBeltIndex + 1]
      : null;

  return (
    <div className="journey-header mb-12 overflow-hidden rounded-[var(--radius-lg)] border border-border/50 bg-bg-secondary/90 shadow-card backdrop-blur-sm">
      <div className="relative aspect-[2.4/1] min-h-[140px] max-h-[220px] w-full overflow-hidden sm:min-h-[160px]">
        <WorldArtwork beltId={currentBeltId} variant="banner" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/92 via-bg-primary/72 to-bg-primary/35" />
        <div className="absolute inset-0 flex items-center justify-between gap-4 p-5 sm:p-6">
          <div className="min-w-0">
            <p className="page-section-label mb-1.5 flex items-center gap-1.5">
              <Compass className="h-3.5 w-3.5 text-unlock" strokeWidth={2} />
              Vị trí trên hành trình
            </p>
            <h2 className="font-display text-xl font-bold sm:text-2xl">
              {allComplete ? 'Hoàn thành hành trình' : currentBelt.name}
            </h2>
            <p className="mt-0.5 truncate text-sm text-text-secondary">
              {allComplete
                ? 'Bạn đã đi qua trọn hệ thống 6 màu đai'
                : currentBelt.scene}
            </p>
          </div>
          <div className="shrink-0 rounded-[var(--radius-md)] border border-unlock/20 bg-bg-primary/60 px-4 py-3 text-center backdrop-blur-sm">
            <p className="page-section-label mb-0.5">Tiến độ</p>
            <p className="font-display text-3xl font-bold text-unlock">{overall.percent}%</p>
            <p className="text-[11px] text-text-muted">
              {overall.completedLessons}/{overall.totalLessons} bài
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {/* Mini belt path indicator */}
        <div className="mb-5 flex items-center gap-1">
          {BELT_WORLDS.map((belt, i) => {
            const completed = isBeltCompleted(belt.id, progress);
            const unlocked = isBeltUnlocked(belt.id, progress);
            const isCurrent = belt.id === currentBeltId;

            return (
              <div key={belt.id} className="flex flex-1 items-center gap-1">
                <div
                  className={cn(
                    'journey-header__step h-2 flex-1 rounded-full transition-all',
                    completed && 'bg-unlock/70',
                    isCurrent && !completed && 'bg-unlock shadow-[0_0_8px_rgba(255,215,0,0.4)]',
                    unlocked && !completed && !isCurrent && 'bg-current/40',
                    !unlocked && 'bg-border/60'
                  )}
                  style={
                    unlocked && !completed && !isCurrent
                      ? { backgroundColor: `${belt.colors.accent}66` }
                      : undefined
                  }
                  title={belt.name}
                />
                {i < BELT_WORLDS.length - 1 && (
                  <span className="hidden h-px w-0 sm:block" aria-hidden />
                )}
              </div>
            );
          })}
        </div>

        <ProgressBar
          value={overall.percent}
          color={currentBelt.colors.accent}
          size="md"
          className="mb-4"
        />

        {!allComplete && (
          <div className="flex flex-col gap-3 rounded-[var(--radius-md)] border border-unlock/15 bg-unlock/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <Flag className="mt-0.5 h-4 w-4 shrink-0 text-unlock" strokeWidth={1.75} />
              <div>
                <p className="text-sm font-medium text-text-primary">Điểm đến tiếp theo</p>
                <p className="text-sm text-text-secondary">
                  {isBeltCompleted(currentBeltId, progress) && nextBelt
                    ? `Mở khóa ${nextBelt.name} — ${nextBelt.scene}`
                    : `Tiếp tục bài học tại ${currentBelt.name}`}
                </p>
              </div>
            </div>
            <Link
              href={`/world/${currentBeltId}/${getLessonSlugFromId(currentLessonId)}`}
              className="inline-flex items-center justify-center gap-1.5 self-start rounded-[var(--radius-sm)] bg-unlock px-4 py-2.5 text-sm font-semibold text-bg-primary transition-opacity hover:opacity-90 sm:self-auto"
            >
              Tiếp tục học
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
