'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { BeltWorld, LessonMeta } from '@/types';
import { BELT_WORLDS } from '@/lib/constants';
import { isBeltCompleted } from '@/lib/progress';
import { useProgressStore } from '@/store/progress-store';

interface WorldCompletionBannerProps {
  world: BeltWorld;
}

export function WorldCompletionBanner({ world }: WorldCompletionBannerProps) {
  const progress = useProgressStore((s) => s.progress);
  const reduced = useReducedMotion();
  const beltIndex = BELT_WORLDS.findIndex((b) => b.id === world.id);
  const nextBelt = BELT_WORLDS[beltIndex + 1];
  const completed = isBeltCompleted(world.id, progress);

  if (!completed) return null;

  return (
    <motion.section
      className="world-completion mb-8 lg:mb-10"
      initial={reduced ? {} : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      aria-label="Hoàn thành cấp đai"
    >
      <div className="world-completion__inner">
        <div className="min-w-0 flex-1">
          <p className="page-section-label mb-1 text-unlock">Cột mốc đạt được</p>
          <h3 className="font-display text-lg font-bold sm:text-xl">
            Hoàn thành {world.name}
          </h3>
          <p className="mt-1 text-sm text-text-secondary">
            Bạn đã vượt qua toàn bộ bài học và bài kiểm tra tại cấp đai này.
          </p>
        </div>
        {nextBelt ? (
          <Link href={`/world/${nextBelt.id}`} className="world-cta-primary shrink-0">
            Khám phá {nextBelt.nameShort} Đai
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        ) : (
          <Link href="/journey" className="world-cta-primary shrink-0">
            Xem hành trình
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        )}
      </div>
    </motion.section>
  );
}
