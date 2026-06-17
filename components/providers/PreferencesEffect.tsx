'use client';

import { useEffect } from 'react';
import { applyColorScheme } from '@/lib/theme';
import { useProgressStore } from '@/store/progress-store';

export function PreferencesEffect() {
  const fontSize = useProgressStore((s) => s.progress.preferences.fontSize);
  const reducedMotion = useProgressStore((s) => s.progress.preferences.reducedMotion);
  const colorScheme = useProgressStore((s) => s.progress.preferences.colorScheme);

  useEffect(() => {
    document.body.classList.toggle('font-large', fontSize === 'large');
  }, [fontSize]);

  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion-override', reducedMotion);
  }, [reducedMotion]);

  useEffect(() => {
    applyColorScheme(colorScheme ?? 'dark');
  }, [colorScheme]);

  return null;
}
