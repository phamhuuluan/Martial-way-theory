import type { BeltId } from '@/types';
import type { BeltRank } from '@/lib/belt-ranks';
import { getBeltById } from '@/lib/constants';

interface BeltAccentPair {
  dark: string;
  light: string;
}

/** Showcase glow / panel accent — tuned per belt, theme-aware for readability */
const BELT_SHOWCASE_ACCENTS: Record<BeltId, BeltAccentPair> = {
  brown: { dark: '#d4a574', light: '#92400e' },
  blue: { dark: '#4da3e0', light: '#1a5f9e' },
  green: { dark: '#5cb87a', light: '#166534' },
  red: { dark: '#ef4444', light: '#c62828' },
  yellow: { dark: '#ffd966', light: '#d4af37' },
  white: { dark: '#f5f3ef', light: '#d4af37' },
};

export function getBeltShowcaseAccent(rank: BeltRank, isLightTheme: boolean): string {
  const pair = BELT_SHOWCASE_ACCENTS[rank.beltWorldId];
  if (pair) return isLightTheme ? pair.light : pair.dark;
  return rank.textColor ?? getBeltById(rank.beltWorldId).colors.accent;
}

/** Text highlight in info panel — accent on text only */
export function getBeltShowcaseTextAccent(rank: BeltRank, isLightTheme: boolean): string {
  return getBeltShowcaseAccent(rank, isLightTheme);
}
