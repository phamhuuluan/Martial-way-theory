'use client';

import { useEffect } from 'react';
import { useProgressStore } from '@/store/progress-store';

export function PreferencesEffect() {
  const fontSize = useProgressStore((s) => s.progress.preferences.fontSize);
  const reducedMotion = useProgressStore((s) => s.progress.preferences.reducedMotion);

  useEffect(() => {
    document.body.classList.toggle('font-large', fontSize === 'large');
  }, [fontSize]);

  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion-override', reducedMotion);
  }, [reducedMotion]);

  return null;
}
