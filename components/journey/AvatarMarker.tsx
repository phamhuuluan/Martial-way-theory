'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { User } from 'lucide-react';
import { useProgressStore } from '@/store/progress-store';

interface AvatarMarkerProps {
  beltAccent?: string;
}

export function AvatarMarker({ beltAccent = '#FFD700' }: AvatarMarkerProps) {
  const reduced = useReducedMotion();
  const name = useProgressStore((s) => s.progress.profile.name);
  const initial = name?.trim().charAt(0).toUpperCase();

  return (
    <motion.div
      layoutId="journey-avatar"
      className="journey-avatar pointer-events-none absolute top-1/2 z-30"
      transition={
        reduced
          ? { duration: 0 }
          : { type: 'spring', stiffness: 180, damping: 22 }
      }
      aria-hidden
    >
      <div className="journey-avatar__inner flex flex-col items-center gap-1.5">
        <div className="journey-avatar__label whitespace-nowrap rounded-full border border-unlock/25 bg-bg-primary/90 px-3 py-1 text-[10px] font-semibold text-unlock backdrop-blur-sm sm:text-xs">
          Bạn đang ở đây
        </div>

        <div
          className="journey-avatar__marker relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-unlock bg-bg-primary text-sm font-bold text-unlock"
          style={{
            boxShadow: `0 0 0 4px ${beltAccent}33, 0 0 24px ${beltAccent}55, 0 4px 12px rgb(0 0 0 / 0.3)`,
          }}
        >
          {!reduced && (
            <span
              className="absolute inset-0 animate-ping rounded-full border border-unlock/40 opacity-25"
              aria-hidden
            />
          )}
          {initial ? (
            <span className="relative font-display">{initial}</span>
          ) : (
            <User className="relative h-5 w-5" strokeWidth={2.5} />
          )}
        </div>
      </div>
    </motion.div>
  );
}
