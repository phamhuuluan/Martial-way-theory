'use client';

import type { ColorScheme } from '@/types';
import { useProgressStore } from '@/store/progress-store';
import { useMounted } from '@/hooks/use-mounted';

export function useColorScheme(): ColorScheme {
  const mounted = useMounted();
  const colorScheme = useProgressStore((s) => s.progress.preferences.colorScheme);

  if (!mounted) return 'light';
  return colorScheme ?? 'light';
}
