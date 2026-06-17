'use client';

import { useEffect, useState } from 'react';

/** True on phones/tablets and other coarse-pointer (touch-first) devices. */
export function useCoarsePointer(): boolean {
  const [isCoarse, setIsCoarse] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)');
    const noHover = window.matchMedia('(hover: none)');

    const update = () => {
      setIsCoarse(coarse.matches || noHover.matches);
    };

    update();
    coarse.addEventListener('change', update);
    noHover.addEventListener('change', update);
    return () => {
      coarse.removeEventListener('change', update);
      noHover.removeEventListener('change', update);
    };
  }, []);

  return isCoarse;
}
