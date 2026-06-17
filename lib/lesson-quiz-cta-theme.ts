import type { CSSProperties } from 'react';
import type { BeltWorld } from '@/types';

type Rgb = { r: number; g: number; b: number };

const BG_DARK = '#0f0e0c';
const TEXT_LIGHT = '#f0e6d8';
const TEXT_DARK = '#1a1814';

function parseHex(hex: string): Rgb {
  const normalized = hex.replace('#', '');
  const value =
    normalized.length === 3
      ? normalized
          .split('')
          .map((c) => c + c)
          .join('')
      : normalized;

  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function toRgba(hex: string, alpha: number): string {
  const { r, g, b } = parseHex(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function mixHex(a: string, b: string, t: number): string {
  const ca = parseHex(a);
  const cb = parseHex(b);
  const mix = (x: number, y: number) => Math.round(x + (y - x) * t);
  const channels = [mix(ca.r, cb.r), mix(ca.g, cb.g), mix(ca.b, cb.b)];

  return `#${channels.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

export function getLessonQuizCtaStyles(
  colors: BeltWorld['colors'],
  canQuiz: boolean,
  lightMode = false
): CSSProperties {
  const { primary, accent, surface } = colors;

  if (canQuiz) {
    return {
      '--cta-bg-top': surface,
      '--cta-bg-mid': mixHex(surface, primary, 0.55),
      '--cta-bg-bottom': mixHex(primary, accent, 0.32),
      '--cta-border': toRgba(accent, 0.48),
      '--cta-border-hover': toRgba(accent, 0.62),
      '--cta-highlight': toRgba(accent, 0.11),
      '--cta-highlight-hover': toRgba(accent, 0.15),
      '--cta-ring': toRgba(accent, 0.07),
      '--cta-ring-hover': toRgba(accent, 0.16),
      '--cta-glow-hover': toRgba(primary, 0.24),
      '--cta-text': lightMode ? TEXT_DARK : TEXT_LIGHT,
      '--cta-focus': toRgba(accent, 0.45),
    } as CSSProperties;
  }

  return {
    '--cta-bg-top': mixHex(surface, BG_DARK, 0.45),
    '--cta-bg-mid': mixHex(surface, BG_DARK, 0.6),
    '--cta-bg-bottom': mixHex(surface, BG_DARK, 0.3),
    '--cta-border': toRgba(accent, 0.16),
    '--cta-highlight': 'rgba(255, 255, 255, 0.03)',
    '--cta-ring': 'transparent',
    '--cta-text': lightMode
      ? toRgba(TEXT_DARK, 0.38)
      : 'rgba(240, 230, 216, 0.38)',
    '--cta-focus': toRgba(accent, 0.3),
  } as CSSProperties;
}
