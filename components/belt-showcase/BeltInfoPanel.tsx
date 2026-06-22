'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { BeltRank } from '@/lib/belt-ranks';
import {
  getBeltShowcaseAccent,
  getBeltShowcaseTextAccent,
} from '@/lib/belt-showcase-accent';
import { cn } from '@/lib/utils';

interface BeltInfoPanelProps {
  rank: BeltRank;
  reducedMotion: boolean;
  isLightTheme: boolean;
}

const FIELDS = [
  {
    key: 'fullName',
    label: 'Trình độ',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden>
        <path
          d="M10 2l2.2 4.5 5 .7-3.6 3.5.85 5L10 13.8 5.55 15.7l.85-5L2.8 7.2l5-.7L10 2z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    ),
    accent: true,
  },
  {
    key: 'trainingTime',
    label: 'Thời gian tập luyện',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden>
        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M10 5.5V10l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    accent: false,
  },
  {
    key: 'danhXung',
    label: 'Danh xưng',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden>
        <circle cx="10" cy="6.5" r="3" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M4.5 17c0-3 2.5-5 5.5-5s5.5 2 5.5 5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
    accent: false,
  },
  {
    key: 'capBac',
    label: 'Cấp bậc',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden>
        <path d="M3 14h14M5 10h10M7 6h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    accent: false,
  },
] as const;

export function BeltInfoPanel({ rank, reducedMotion, isLightTheme }: BeltInfoPanelProps) {
  const iconAccent = getBeltShowcaseAccent(rank, isLightTheme);
  const textAccent = getBeltShowcaseTextAccent(rank, isLightTheme);

  return (
    <div
      className="belt-info-panel"
      style={{ ['--panel-accent' as string]: iconAccent }}
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={rank.id}
          className="belt-info-panel__inner"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="belt-info-panel__header">
            <span className="belt-info-panel__badge" aria-hidden />
            <span className="belt-info-panel__header-text">Thông tin cấp đai</span>
          </div>

          <dl className="belt-info-panel__list">
            {FIELDS.map((field) => (
              <div key={field.key} className="belt-info-panel__row">
                <dt className="belt-info-panel__label">
                  <span className="belt-info-panel__icon">{field.icon}</span>
                  {field.label}
                </dt>
                <dd
                  className={cn(
                    'belt-info-panel__value',
                    field.accent &&
                      rank.beltWorldId === 'white' &&
                      'belt-info-panel__value--bach-trinh-do'
                  )}
                  style={
                    field.accent && rank.beltWorldId !== 'white'
                      ? { color: textAccent }
                      : undefined
                  }
                >
                  {rank[field.key]}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
