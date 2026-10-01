'use client';

import { useMemo } from 'react';
import { asAdminJourney } from '@/lib/admin-journey';
import { useAdminStore } from '@/store/admin-store';
import { useProgressStore } from '@/store/progress-store';
import type { UserProgress } from '@/types';

export function useEffectiveProgress(): UserProgress {
  const progress = useProgressStore((s) => s.progress);
  const isAdmin = useAdminStore((s) => s.isAdmin);

  return useMemo(
    () => (isAdmin ? asAdminJourney(progress) : progress),
    [isAdmin, progress]
  );
}
