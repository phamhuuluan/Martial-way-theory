'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Clock, FileText } from 'lucide-react';
import type { BeltWorld, LessonMeta } from '@/types';
import { ProgressBar } from '@/components/ui/Progress';
import { WorldArtwork } from '@/components/journey/WorldArtwork';
import {
  WORLD_LESSON_STATE_LABELS,
  getWorldLessonDisplayState,
} from '@/lib/world-helpers';
import { useProgressStore } from '@/store/progress-store';
import { cn } from '@/lib/utils';

interface WorldFeaturedLessonProps {
  lesson: LessonMeta;
  world: BeltWorld;
  lessonIndex: number;
}

export function WorldFeaturedLesson({
  lesson,
  world,
  lessonIndex,
}: WorldFeaturedLessonProps) {
  const progress = useProgressStore((s) => s.progress);
  const displayState = getWorldLessonDisplayState(lesson.id, progress);
  const readProgress = progress.lessons[lesson.id]?.readProgress ?? 0;
  const reduced = useReducedMotion();
  const href = `/world/${lesson.belt}/${lesson.lessonSlug}`;
  const ctaLabel =
    displayState === 'in-progress' ? 'Tiếp tục học' : 'Bắt đầu bài học';

  return (
    <section className="world-featured mb-8 lg:mb-10" aria-label="Bài học nổi bật">
      <p className="page-section-label mb-3">Bài học hiện tại</p>

      <motion.div
        initial={reduced ? {} : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link href={href} className="world-featured__card group block">
          <div className="world-featured__art" aria-hidden>
            <WorldArtwork
              beltId={world.id}
              variant="card"
              priority
              className="world-featured__artwork h-full w-full"
            />
            <div className="world-featured__art-shade" />
          </div>

          <div className="world-featured__content">
            <div className="world-featured__head">
              <span
                className={cn(
                  'world-featured__badge',
                  displayState === 'in-progress' && 'world-featured__badge--active',
                  displayState === 'available' && 'world-featured__badge--available'
                )}
              >
                {WORLD_LESSON_STATE_LABELS[displayState]}
              </span>
              <span className="world-featured__lesson-num">Bài {lessonIndex + 1}</span>
            </div>

            <h3 className="world-featured__title font-display">{lesson.title}</h3>

            <div className="world-featured__meta">
              <span className="world-featured__meta-item">
                <Clock className="h-3 w-3" strokeWidth={1.75} aria-hidden />
                {lesson.estimatedMinutes} phút
              </span>
              <span className="world-featured__meta-item">
                <FileText className="h-3 w-3" strokeWidth={1.75} aria-hidden />
                {lesson.questionsCount} câu
              </span>
              {displayState === 'in-progress' && readProgress > 0 && (
                <span className="world-featured__meta-item world-featured__meta-item--progress">
                  Đã đọc {readProgress}%
                </span>
              )}
            </div>

            {displayState === 'in-progress' && readProgress > 0 && (
              <ProgressBar
                value={readProgress}
                color={world.colors.accent}
                size="sm"
                className="world-featured__progress"
              />
            )}

            <span className="world-featured__cta">
              {ctaLabel}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden
              />
            </span>
          </div>
        </Link>
      </motion.div>
    </section>
  );
}
