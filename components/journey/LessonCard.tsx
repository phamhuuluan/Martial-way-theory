'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { Lock, Check, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/Progress';
import type { LessonMeta, LessonState } from '@/types';
import { cn } from '@/lib/utils';
import { useProgressStore } from '@/store/progress-store';

interface LessonCardProps {
  lesson: LessonMeta;
  state: LessonState;
  beltAccent: string;
  index: number;
}

export function LessonCard({
  lesson,
  state,
  beltAccent,
  index,
}: LessonCardProps) {
  const progress = useProgressStore((s) => s.progress);
  const readProgress = progress.lessons[lesson.id]?.readProgress ?? 0;
  const quizScore = progress.quizzes[lesson.id]?.score;
  const reduced = useReducedMotion();

  const inner = (
    <Card
      variant="lesson"
      beltAccent={beltAccent}
      className={cn(
        'p-4 transition-all',
        state === 'locked' && 'opacity-50 grayscale',
        state === 'active' && 'ring-1 ring-unlock/30'
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {state === 'locked' && <Lock className="h-4 w-4 text-text-muted" />}
            {state === 'completed' && <Check className="h-4 w-4 text-success" />}
            {state === 'active' && (
              <span className="h-2 w-2 rounded-full bg-unlock animate-pulse" />
            )}
            <span className="text-xs text-text-muted">Bài {index + 1}</span>
          </div>
          <h3 className="font-display font-semibold">{lesson.title}</h3>
          <p className="text-sm text-text-secondary mt-0.5">{lesson.subtitle}</p>
          {state === 'completed' && quizScore !== undefined && (
            <Badge variant="success" className="mt-2">
              Điểm: {quizScore}%
            </Badge>
          )}
          {state === 'active' && readProgress > 0 && (
            <div className="mt-2">
              <ProgressBar value={readProgress} color={beltAccent} size="sm" />
              <p className="text-xs text-text-muted mt-1">Đã đọc {readProgress}%</p>
            </div>
          )}
        </div>
        {state !== 'locked' && (
          <ChevronRight className="h-5 w-5 text-text-muted shrink-0" />
        )}
      </div>
    </Card>
  );

  if (state === 'locked') {
    return (
      <motion.div
        initial={reduced ? {} : { opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
      >
        {inner}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={reduced ? {} : { opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/world/${lesson.belt}/${lesson.lessonSlug}`}>{inner}</Link>
    </motion.div>
  );
}
