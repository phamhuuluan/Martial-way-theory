import type { ColorScheme } from '@/types';
import { STORAGE_KEY } from '@/lib/constants';

export function applyColorScheme(scheme: ColorScheme): void {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('theme-light', scheme === 'light');
}

export function getStoredColorScheme(): ColorScheme {
  if (typeof window === 'undefined') return 'light';

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return 'light';
    const data = JSON.parse(raw) as {
      preferences?: { colorScheme?: ColorScheme };
    };
    return data.preferences?.colorScheme === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}
