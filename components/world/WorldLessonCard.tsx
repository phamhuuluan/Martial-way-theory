'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  FileText,
  Lock,
  PlayCircle,
} from 'lucide-react';
import type { BeltWorld, LessonMeta } from '@/types';
import { ProgressBar } from '@/components/ui/Progress';
import { WorldArtwork } from '@/components/journey/WorldArtwork';
import {
  WORLD_LESSON_STATE_LABELS,
  getWorldLessonDisplayState,
  type WorldLessonDisplayState,
} from '@/lib/world-helpers';
import { useProgressStore } from '@/store/progress-store';
import { cn } from '@/lib/utils';

export type WorldLessonCardVariant = 'featured' | 'grid';

interface WorldLessonCardProps {
  lesson: LessonMeta;
  world: BeltWorld;
  index: number;
  variant?: WorldLessonCardVariant;
}

const STATE_ICONS: Record<WorldLessonDisplayState, typeof PlayCircle> = {
  locked: Lock,
  available: PlayCircle,
  'in-progress': PlayCircle,
  completed: CheckCircle2,
};

export function WorldLessonCard({
  lesson,
  world,
  index,
  variant = 'grid',
}: WorldLessonCardProps) {
  const progress = useProgressStore((s) => s.progress);
  const displayState = getWorldLessonDisplayState(lesson.id, progress);
  const readProgress = progress.lessons[lesson.id]?.readProgress ?? 0;
  const quizScore = progress.quizzes[lesson.id]?.score;
  const reduced = useReducedMotion();
  const href = `/world/${lesson.belt}/${lesson.lessonSlug}`;
  const StateIcon = STATE_ICONS[displayState];
  const isLocked = displayState === 'locked';

  const card = (
    <article
      className={cn(
        'world-lesson-card group',
        `world-lesson-card--${displayState}`,
        variant === 'featured' && 'world-lesson-card--featured',
        variant === 'grid' && 'world-lesson-card--grid'
      )}
      aria-label={`Bài ${index + 1}: ${lesson.title} — ${WORLD_LESSON_STATE_LABELS[displayState]}`}
    >
      <div className="world-lesson-card__media">
        <WorldArtwork
          beltId={world.id}
          variant="card"
          dimmed={isLocked}
          className={cn(
            'h-full w-full transition-transform duration-500 ease-out',
            !isLocked && 'group-hover:scale-[1.04]',
            displayState === 'completed' && 'brightness-[0.92] saturate-[0.88]',
            isLocked && 'brightness-[0.65] saturate-[0.55]'
          )}
        />
        <div className="world-lesson-card__media-overlay" />
        <span
          className={cn(
            'world-lesson-card__state',
            `world-lesson-card__state--${displayState}`
          )}
        >
          <StateIcon className="h-3 w-3" strokeWidth={2} aria-hidden />
          {WORLD_LESSON_STATE_LABELS[displayState]}
        </span>
        <span className="world-lesson-card__index">Bài {index + 1}</span>
      </div>

      <div className="world-lesson-card__body">
        <h3 className="world-lesson-card__title font-display">{lesson.title}</h3>
        <p className="world-lesson-card__subtitle">{lesson.subtitle}</p>

        <div className="world-lesson-card__meta">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" strokeWidth={1.75} />
            {lesson.estimatedMinutes} phút
          </span>
            <span className="inline-flex items-center gap-1">
              <FileText className="h-3.5 w-3.5" strokeWidth={1.75} />
              {lesson.questionsCount} câu lý thuyết
            </span>
        </div>

        {displayState === 'in-progress' && readProgress > 0 && (
          <div className="world-lesson-card__progress">
            <ProgressBar value={readProgress} color={world.colors.accent} size="sm" />
            <p className="world-lesson-card__progress-label">Đã đọc {readProgress}%</p>
          </div>
        )}

        {displayState === 'completed' && quizScore !== undefined && (
          <p className="world-lesson-card__score">Điểm quiz: {quizScore}%</p>
        )}

        {!isLocked && (
          <span className="world-lesson-card__action">
            {displayState === 'in-progress'
              ? 'Tiếp tục đọc'
              : displayState === 'completed'
                ? 'Xem lại'
                : 'Bắt đầu học'}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        )}
      </div>
    </article>
  );

  return (
    <motion.div
      initial={reduced ? {} : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-24px' }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {isLocked ? (
        card
      ) : (
        <Link href={href} className="block h-full">
          {card}
        </Link>
      )}
    </motion.div>
  );
}
