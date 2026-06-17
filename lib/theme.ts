import type { ColorScheme } from '@/types';
import { STORAGE_KEY } from '@/lib/constants';

export function applyColorScheme(scheme: ColorScheme): void {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('theme-light', scheme === 'light');
}

/** Inline script: apply saved theme before React hydrates to avoid flash. */
export const THEME_BOOTSTRAP_SCRIPT = `(function(){try{var raw=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});if(!raw)return;var data=JSON.parse(raw);var scheme=data&&data.preferences&&data.preferences.colorScheme;if(scheme==='light'){document.documentElement.classList.add('theme-light')}}catch(e){}})();`;
