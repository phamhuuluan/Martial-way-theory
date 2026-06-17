'use client';

import type { CSSProperties } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, Lock, Play } from 'lucide-react';
import type { BeltId } from '@/types';
import { cn } from '@/lib/utils';
import { getBeltById } from '@/lib/constants';
import {
  isBeltUnlocked,
  isBeltCompleted,
  getBeltCompletionPercent,
  isLessonCompleted,
} from '@/lib/progress';
import { ProgressBar } from '@/components/ui/Progress';
import { WorldArtwork } from '@/components/journey/WorldArtwork';
import { useProgressStore } from '@/store/progress-store';

interface JourneyNodeProps {
  beltId: BeltId;
  index: number;
  isCurrent: boolean;
}

export function JourneyNode({ beltId, index, isCurrent }: JourneyNodeProps) {
  const progress = useProgressStore((s) => s.progress);
  const belt = getBeltById(beltId);
  const unlocked = isBeltUnlocked(beltId, progress);
  const completed = isBeltCompleted(beltId, progress);
  const percent = getBeltCompletionPercent(beltId, progress);
  const reduced = useReducedMotion();

  const completedLessons = belt.lessons.filter((id) =>
    isLessonCompleted(id, progress)
  ).length;

  const actionLabel = completed
    ? 'Xem lại'
    : unlocked
      ? isCurrent || completedLessons > 0
        ? 'Tiếp tục học'
        : 'Bắt đầu học'
      : 'Bắt đầu học';

  const ActionIcon = completed ? BookOpen : unlocked ? Play : Lock;

  const card = (
    <motion.article
      className={cn(
        'journey-row__card group relative min-h-[132px] overflow-hidden rounded-2xl border transition-all duration-300',
        completed && 'journey-row__card--completed border-unlock/25',
        isCurrent && 'journey-row__card--current border-unlock/45 shadow-glow',
        unlocked && !completed && !isCurrent && 'border-border/50',
        !unlocked && 'journey-row__card--locked border-border/35',
        unlocked && 'hover:border-unlock/25 hover:shadow-elevated'
      )}
      aria-label={`${belt.name} — ${belt.scene}`}
      initial={reduced ? {} : { opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Cinematic artwork background */}
      <div className="absolute inset-0">
        <WorldArtwork
          beltId={beltId}
          variant="card"
          className={cn('h-full w-full', !unlocked && 'brightness-[0.88] saturate-[0.9]')}
        />
      </div>

      <div className="relative flex min-h-[132px] flex-col sm:flex-row">
        {/* Belt identity — name + virtues */}
        <div className="flex flex-1 flex-col justify-center px-5 py-4 sm:py-5 sm:pl-6">
          <h3
            className="font-display text-2xl font-bold leading-tight drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] sm:text-[1.65rem]"
            style={{
              color: unlocked
                ? belt.colors.accent
                : `color-mix(in srgb, ${belt.colors.accent} 72%, white)`,
            }}
          >
            {belt.name}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)] sm:text-[0.9rem]">
            {belt.scene}
          </p>
        </div>

        {/* Progress panel */}
        <div className="journey-row__panel flex flex-col justify-center gap-2.5 border-t border-white/15 bg-black/30 px-5 py-4 backdrop-blur-sm sm:w-[11.5rem] sm:shrink-0 sm:border-l sm:border-t-0 sm:border-white/15 sm:px-4">
          <p className="text-xs text-white/85 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
            {completedLessons}/{belt.totalLessons} bài học
          </p>

          <ProgressBar
            value={percent}
            color={unlocked ? belt.colors.accent : 'rgb(255 255 255 / 0.35)'}
            size="sm"
          />

          <p
            className="text-xs font-medium tabular-nums drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
            style={{
              color: unlocked
                ? belt.colors.accent
                : `color-mix(in srgb, ${belt.colors.accent} 65%, white)`,
            }}
          >
            {percent}%
          </p>

          <span
            className={cn(
              'inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors',
              completed &&
                'border border-unlock/40 bg-unlock/10 text-unlock group-hover:bg-unlock/15',
              unlocked &&
                !completed &&
                'bg-[color-mix(in_srgb,var(--belt-accent)_18%,transparent)] text-[var(--belt-accent)] group-hover:brightness-110',
              !unlocked &&
                'cursor-not-allowed border border-white/25 bg-black/35 text-white/80 backdrop-blur-[2px]'
            )}
            style={
              unlocked && !completed
                ? ({ ['--belt-accent' as string]: belt.colors.accent } as CSSProperties)
                : undefined
            }
          >
            <ActionIcon className="h-3.5 w-3.5" strokeWidth={2} />
            {actionLabel}
          </span>
        </div>
      </div>
    </motion.article>
  );

  if (unlocked) {
    return (
      <Link href={`/world/${beltId}`} className="block flex-1 min-w-0">
        {card}
      </Link>
    );
  }

  return <div className="flex-1 min-w-0">{card}</div>;
}
