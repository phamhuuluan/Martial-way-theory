'use client';

import { useEffect, useState } from 'react';

function readLightTheme(): boolean {
  if (typeof document === 'undefined') return false;
  return document.documentElement.classList.contains('theme-light');
}

export function useIsLightTheme(): boolean {
  const [isLightTheme, setIsLightTheme] = useState(readLightTheme);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setIsLightTheme(root.classList.contains('theme-light'));

    sync();

    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  return isLightTheme;
}
