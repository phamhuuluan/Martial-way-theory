import type { CSSProperties } from 'react';
import type { BeltId } from '@/types';

/** Display tokens for belt surfaces — brighter gradients & readable belt-colored text */
export interface BeltDisplayTheme {
  gradientFrom: string;
  gradientVia: string;
  gradientTo: string;
  title: string;
  meta: string;
  muted: string;
  titleShadow: string;
  metaShadow: string;
  cardShadow: string;
  badgeBg: string;
  badgeBorder: string;
  overlayTo: string;
}

export const BELT_DISPLAY_THEMES: Record<BeltId, BeltDisplayTheme> = {
  brown: {
    gradientFrom: '#4A2E18',
    gradientVia: '#8B5A32',
    gradientTo: '#C4844A',
    title: '#F5D4A0',
    meta: '#E8C898',
    muted: '#D4B080',
    titleShadow: '0 1px 2px rgb(0 0 0 / 0.55), 0 0 14px rgb(212 165 116 / 0.35)',
    metaShadow: '0 1px 3px rgb(0 0 0 / 0.45)',
    cardShadow:
      '0 4px 18px rgb(139 90 50 / 0.32), 0 8px 28px rgb(0 0 0 / 0.28), inset 0 1px 0 rgb(255 255 255 / 0.08)',
    badgeBg: 'rgb(74 46 24 / 0.55)',
    badgeBorder: 'rgb(245 212 160 / 0.35)',
    overlayTo: 'rgb(30 18 10 / 0.52)',
  },
  blue: {
    gradientFrom: '#0E2848',
    gradientVia: '#1E5A8C',
    gradientTo: '#3D9AD4',
    title: '#8ED4FF',
    meta: '#B8E4FF',
    muted: '#8EC8E8',
    titleShadow: '0 1px 2px rgb(0 0 0 / 0.5), 0 0 16px rgb(91 164 207 / 0.4)',
    metaShadow: '0 1px 3px rgb(0 0 0 / 0.4)',
    cardShadow:
      '0 4px 18px rgb(30 90 140 / 0.35), 0 8px 28px rgb(0 0 0 / 0.28), inset 0 1px 0 rgb(255 255 255 / 0.1)',
    badgeBg: 'rgb(14 40 72 / 0.55)',
    badgeBorder: 'rgb(142 212 255 / 0.35)',
    overlayTo: 'rgb(8 20 36 / 0.48)',
  },
  green: {
    gradientFrom: '#143828',
    gradientVia: '#2D6B48',
    gradientTo: '#4CB878',
    title: '#9AEFB8',
    meta: '#C4F5D4',
    muted: '#88D8A8',
    titleShadow: '0 1px 2px rgb(0 0 0 / 0.5), 0 0 16px rgb(124 182 142 / 0.38)',
    metaShadow: '0 1px 3px rgb(0 0 0 / 0.4)',
    cardShadow:
      '0 4px 18px rgb(45 107 72 / 0.32), 0 8px 28px rgb(0 0 0 / 0.28), inset 0 1px 0 rgb(255 255 255 / 0.1)',
    badgeBg: 'rgb(20 56 40 / 0.55)',
    badgeBorder: 'rgb(154 239 184 / 0.35)',
    overlayTo: 'rgb(10 28 20 / 0.48)',
  },
  red: {
    gradientFrom: '#3A0808',
    gradientVia: '#9B1818',
    gradientTo: '#E02828',
    title: '#FF5858',
    meta: '#FFB8B8',
    muted: '#E89090',
    titleShadow: '0 1px 2px rgb(0 0 0 / 0.55), 0 0 16px rgb(224 40 40 / 0.45)',
    metaShadow: '0 1px 3px rgb(0 0 0 / 0.45)',
    cardShadow:
      '0 4px 18px rgb(180 32 32 / 0.4), 0 8px 28px rgb(0 0 0 / 0.28), inset 0 1px 0 rgb(255 255 255 / 0.08)',
    badgeBg: 'rgb(58 8 8 / 0.58)',
    badgeBorder: 'rgb(255 88 88 / 0.4)',
    overlayTo: 'rgb(24 4 4 / 0.5)',
  },
  yellow: {
    gradientFrom: '#5A4208',
    gradientVia: '#B88818',
    gradientTo: '#F0D048',
    title: '#FFE878',
    meta: '#FFF4B8',
    muted: '#F0D878',
    titleShadow: '0 1px 2px rgb(0 0 0 / 0.5), 0 0 18px rgb(255 215 0 / 0.45)',
    metaShadow: '0 1px 3px rgb(0 0 0 / 0.4)',
    cardShadow:
      '0 4px 18px rgb(184 136 24 / 0.35), 0 8px 28px rgb(0 0 0 / 0.28), inset 0 1px 0 rgb(255 255 255 / 0.12)',
    badgeBg: 'rgb(90 66 8 / 0.55)',
    badgeBorder: 'rgb(255 232 120 / 0.4)',
    overlayTo: 'rgb(32 24 6 / 0.45)',
  },
  white: {
    gradientFrom: '#FFFFFF',
    gradientVia: '#F4F7FB',
    gradientTo: '#E2EAF2',
    title: '#FFFFFF',
    meta: '#F2F6FA',
    muted: '#D8E4F0',
    titleShadow: '0 1px 3px rgb(35 50 65 / 0.55), 0 0 14px rgb(255 255 255 / 0.35)',
    metaShadow: '0 1px 2px rgb(35 50 65 / 0.45)',
    cardShadow:
      '0 4px 22px rgb(200 215 230 / 0.45), 0 8px 32px rgb(180 195 215 / 0.2), inset 0 1px 0 rgb(255 255 255 / 1), inset 0 -1px 0 rgb(220 230 240 / 0.5)',
    badgeBg: 'rgb(255 255 255 / 0.92)',
    badgeBorder: 'rgb(180 195 215 / 0.7)',
    overlayTo: 'rgb(90 110 130 / 0.34)',
  },
};

export function getBeltDisplayTheme(beltId: BeltId): BeltDisplayTheme {
  return BELT_DISPLAY_THEMES[beltId];
}

/** CSS custom properties for belt surfaces (cards, hero previews, ceremony) */
export function beltThemeStyle(beltId: BeltId): CSSProperties {
  const t = getBeltDisplayTheme(beltId);
  return {
    '--belt-grad-from': t.gradientFrom,
    '--belt-grad-via': t.gradientVia,
    '--belt-grad-to': t.gradientTo,
    '--belt-title': t.title,
    '--belt-meta': t.meta,
    '--belt-muted': t.muted,
    '--belt-title-shadow': t.titleShadow,
    '--belt-meta-shadow': t.metaShadow,
    '--belt-card-shadow': t.cardShadow,
    '--belt-badge-bg': t.badgeBg,
    '--belt-badge-border': t.badgeBorder,
    '--belt-overlay-to': t.overlayTo,
  } as CSSProperties;
}
