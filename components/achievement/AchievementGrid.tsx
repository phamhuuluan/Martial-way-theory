'use client';

import { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, Lock } from 'lucide-react';
import { ACHIEVEMENTS } from '@/lib/achievements';
import { AchievementBadge } from '@/components/achievement/AchievementBadge';
import { AchievementBadgeFrameShell } from '@/components/achievement/AchievementBadgeFrame';
import { getAchievementProgressHint } from '@/components/achievement/achievement-progress';
import type { UserProgress } from '@/types';
import { cn } from '@/lib/utils';

interface AchievementGridProps {
  earnedIds: string[];
  progress: UserProgress;
}

export function AchievementGrid({ earnedIds, progress }: AchievementGridProps) {
  const reduced = useReducedMotion();

  return (
    <div className="achievement-list grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
      {ACHIEVEMENTS.map((achievement, index) => {
        const earned = earnedIds.includes(achievement.id);
        const hint = earned
          ? null
          : getAchievementProgressHint(achievement.id, progress);
        const showVirtue =
          achievement.virtue.toLocaleLowerCase('vi-VN') !==
          achievement.name.toLocaleLowerCase('vi-VN');

        return (
          <motion.article
            key={achievement.id}
            className={cn(
              'achievement-card flex overflow-hidden',
              earned ? 'achievement-card--earned' : 'achievement-card--locked',
              earned && `achievement-card--tier-${achievement.tier}`
            )}
            initial={reduced ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ delay: index * 0.02, duration: 0.3 }}
          >
            <AchievementBadge id={achievement.id} earned={earned} size="lg" />

            <div className="achievement-card__content flex min-w-0 flex-1 flex-col px-4 py-4 sm:px-5 sm:py-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="achievement-card__title font-display text-base font-semibold leading-snug sm:text-[1.0625rem]">
                  {achievement.name}
                </h3>

                <span
                  className={cn(
                    'achievement-card__status shrink-0',
                    earned
                      ? cn(
                          'achievement-card__status--earned',
                          `achievement-card__status--tier-${achievement.tier}`
                        )
                      : 'achievement-card__status--locked'
                  )}
                >
                  {earned ? (
                    <>
                      <Check className="achievement-card__status-icon" strokeWidth={2.75} />
                      <span className="achievement-card__status-label">Đã đạt</span>
                    </>
                  ) : (
                    <>
                      <Lock className="achievement-card__status-icon" strokeWidth={2.5} />
                      <span className="achievement-card__status-label">Chưa mở</span>
                    </>
                  )}
                </span>
              </div>

              <p className="achievement-card__description mt-2 text-sm leading-relaxed">
                {achievement.description}
              </p>

              {!earned && hint && typeof hint.percent === 'number' && hint.percent > 0 && (
                <div className="achievement-card__progress mt-3 h-0.5 max-w-[11.5rem] overflow-hidden rounded-full">
                  <div
                    className="achievement-card__progress-fill h-full rounded-full transition-[width] duration-500"
                    style={{ width: `${hint.percent}%` }}
                  />
                </div>
              )}

              <div className="achievement-card__footer mt-auto pt-4">
                {earned ? (
                  <p className="achievement-card__meta text-[11px] uppercase tracking-[0.12em]">
                    {showVirtue && (
                      <>
                        <span>{achievement.virtue}</span>
                        <span className="achievement-card__meta-sep" aria-hidden>
                          |
                        </span>
                      </>
                    )}
                    <span>Mốc đã ghi nhận trên hành trình</span>
                  </p>
                ) : (
                  hint && (
                    <p className="achievement-card__meta text-xs">{hint.label}</p>
                  )
                )}
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}

interface BadgeRevealProps {
  name: string;
  icon: string;
  achievementId?: string;
  onDismiss: () => void;
}

export function BadgeReveal({
  name,
  icon,
  achievementId,
  onDismiss,
}: BadgeRevealProps) {
  const reduced = useReducedMotion();
  const fallbackGradId = useId().replace(/:/g, '');

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onDismiss}
    >
      <motion.div
        className="w-full max-w-sm rounded-[var(--radius-xl)] border border-unlock/20 bg-bg-secondary p-8 text-center shadow-elevated"
        initial={reduced ? {} : { scale: 0.9, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="page-section-label mb-6">Ghi nhận đức tính</p>

        {achievementId ? (
          <AchievementBadge
            id={achievementId}
            earned
            size="xl"
            className="mx-auto mb-6"
          />
        ) : (
          <div className="mx-auto mb-6 flex items-center justify-center">
            <AchievementBadgeFrameShell
              tier="gold"
              earned
              gradientId={`ach-badge-grad-${fallbackGradId}`}
              badgeSizeClass="h-[6.5rem] w-[6.5rem] sm:h-[7rem] sm:w-[7rem]"
              charSizeClass="text-[3.25rem] sm:text-[3.5rem] lg:text-[4.25rem]"
              character="德"
            />
          </div>
        )}

        <h2 className="font-display text-2xl font-bold text-unlock">{name}</h2>
        <p className="mt-2 text-sm text-text-secondary">
          Đức tính võ đạo đã được ghi nhận trên hành trình của bạn
        </p>
        <button
          onClick={onDismiss}
          className="mt-8 inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-sm)] bg-unlock/12 px-6 text-sm font-semibold text-unlock transition-colors hover:bg-unlock/20"
        >
          Tiếp tục
        </button>
      </motion.div>
    </motion.div>
  );
}
