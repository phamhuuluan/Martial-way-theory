'use client';

import { useReducedMotion } from 'framer-motion';
import { useProgressStore } from '@/store/progress-store';

/** System prefers-reduced-motion or user preference from profile settings. */
export function useAppReducedMotion(): boolean {
  const systemReduced = useReducedMotion();
  const userReduced = useProgressStore(
    (s) => s.progress.preferences.reducedMotion
  );
  return Boolean(systemReduced || userReduced);
}
