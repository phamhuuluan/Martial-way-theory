'use client';

import { useEffect } from 'react';
import { applyColorScheme, getStoredColorScheme } from '@/lib/theme';
import { useProgressStore } from '@/store/progress-store';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const hydrated = useProgressStore((s) => s.hydrated);
  const colorScheme = useProgressStore((s) => s.progress.preferences.colorScheme);

  useEffect(() => {
    if (hydrated) {
      applyColorScheme(colorScheme ?? 'light');
      return;
    }
    applyColorScheme(getStoredColorScheme());
  }, [hydrated, colorScheme]);

  return <>{children}</>;
}
