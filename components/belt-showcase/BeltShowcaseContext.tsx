'use client';

import { createContext } from 'react';

export type BeltShowcaseNavContextValue = {
  onAnimationStart: () => void;
  onAnimationComplete: () => void;
};

export const BeltShowcaseNavContext =
  createContext<BeltShowcaseNavContextValue | null>(null);
