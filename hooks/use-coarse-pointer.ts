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

/** True on desktop/laptop with precise pointer and hover (mouse/trackpad). */
export function useFinePointer(): boolean {
  const [isFine, setIsFine] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');

    const update = () => {
      setIsFine(fine.matches);
    };

    update();
    fine.addEventListener('change', update);
    return () => fine.removeEventListener('change', update);
  }, []);

  return isFine;
}
