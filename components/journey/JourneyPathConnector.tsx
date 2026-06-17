'use client';

import { BELT_WORLDS } from '@/lib/constants';
import type { BeltId, UserProgress } from '@/types';
import { cn } from '@/lib/utils';

interface JourneyPathConnectorProps {
  progress: UserProgress;
  currentBeltId: BeltId;
  className?: string;
}

/** Vertical timeline spine — fill grows from top (Nâu) downward */
export function JourneyPathConnector({
  progress,
  currentBeltId,
  className,
}: JourneyPathConnectorProps) {
  return (
    <div
      className={cn('journey-path-spine pointer-events-none absolute inset-y-0', className)}
      aria-hidden
    >
      <div className="journey-path-spine__track" />
      <div
        className="journey-path-spine__fill journey-path-spine__fill--down"
        style={{ height: `${getPathFillPercent(progress, currentBeltId)}%` }}
      />
    </div>
  );
}

export function JourneyStageMarker({
  completed,
  isCurrent,
  unlocked,
  accent,
}: {
  completed: boolean;
  isCurrent: boolean;
  unlocked: boolean;
  accent: string;
}) {
  return (
    <div
      className={cn(
        'journey-stage-marker shrink-0',
        completed && 'journey-stage-marker--completed',
        isCurrent && 'journey-stage-marker--current',
        unlocked && !completed && !isCurrent && 'journey-stage-marker--upcoming',
        !unlocked && 'journey-stage-marker--locked'
      )}
      style={
        (unlocked && !completed) || isCurrent
          ? { ['--node-accent' as string]: accent }
          : undefined
      }
      aria-hidden
    >
      <span className="journey-stage-marker__ring">
        {isCurrent && !completed && <span className="journey-stage-marker__dot" />}
        {completed && (
          <svg viewBox="0 0 12 12" className="journey-stage-marker__check">
            <path
              d="M2.5 6 L5 8.5 L9.5 3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </div>
  );
}

function getPathFillPercent(progress: UserProgress, currentBeltId: BeltId): number {
  const currentIndex = BELT_WORLDS.findIndex((b) => b.id === currentBeltId);
  if (currentIndex === -1) return 0;

  const totalSegments = BELT_WORLDS.length - 1;
  if (totalSegments <= 0) return 100;

  const belt = BELT_WORLDS[currentIndex];
  const beltProgress = progress.belts[belt.id];
  const partial =
    belt.totalLessons > 0
      ? (beltProgress?.lessonsCompleted ?? 0) / belt.totalLessons
      : 0;

  const segmentSize = 100 / totalSegments;
  const nodePosition = (currentIndex / totalSegments) * 100;
  return Math.min(100, nodePosition + partial * segmentSize * 0.9);
}
