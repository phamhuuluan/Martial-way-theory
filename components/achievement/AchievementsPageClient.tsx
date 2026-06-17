'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { AchievementGrid } from '@/components/achievement/AchievementGrid';
import { useProgressStore } from '@/store/progress-store';
import { ACHIEVEMENTS } from '@/lib/achievements';

function AchievementProgressRing({ percent }: { percent: number }) {
  const size = 92;
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="achievement-progress-ring shrink-0" aria-hidden>
      <div className="achievement-progress-ring__glass" />
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className="achievement-progress-ring__track"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className="achievement-progress-ring__fill"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className="achievement-progress-ring__label font-display tabular-nums">
        {percent}%
      </span>
    </div>
  );
}

export function AchievementsPageClient() {
  const progress = useProgressStore((s) => s.progress);
  const earned = progress.achievements.length;
  const total = ACHIEVEMENTS.length;
  const progressPercent = Math.round((earned / total) * 100);
  const reduced = useReducedMotion();

  return (
    <div className="achievements-page relative min-h-screen overflow-hidden px-4 py-8 lg:px-10 lg:py-10">
      <div className="relative mx-auto max-w-6xl">
        <header className="achievement-header mb-8 lg:mb-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
            <div className="min-w-0 flex-1">
              <h1 className="achievement-header__title font-display text-[1.75rem] font-bold uppercase tracking-[0.06em] sm:text-[2.125rem]">
                Huy Hiệu Đức Tính
              </h1>
            </div>
            <div className="achievement-summary shrink-0 lg:min-w-[17.5rem]">
              <div className="flex items-center gap-5">
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-snug text-text-muted">
                    <span className="achievement-summary__count font-display text-base font-bold tabular-nums">
                      {earned} / {total}
                    </span>{' '}
                    <span className="achievement-summary__earned-label font-semibold">
                      huy hiệu đã đạt
                    </span>
                  </p>
                  <div className="achievement-summary__bar mt-2.5 h-0.5 overflow-hidden rounded-full">
                    <motion.div
                      className="achievement-summary__bar-fill h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={
                        reduced ? { duration: 0 } : { duration: 0.55, ease: 'easeOut' }
                      }
                    />
                  </div>
                </div>
                <AchievementProgressRing percent={progressPercent} />
              </div>
            </div>
          </div>
        </header>

        <AchievementGrid earnedIds={progress.achievements} progress={progress} />
      </div>
    </div>
  );
}
