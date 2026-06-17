import { describe, expect, it } from 'vitest';
import {
  hasUnsupportedColorFunction,
  needsColorNormalization,
  normalizeColorsInCSSValue,
} from '@/lib/html2canvas-color-compat';

describe('html2canvas color compat', () => {
  it('detects modern CSS color functions', () => {
    expect(hasUnsupportedColorFunction('color-mix(in oklab, gold 50%, transparent)')).toBe(
      true
    );
    expect(hasUnsupportedColorFunction('oklab(0.7 0.1 0.05 / 0.5)')).toBe(true);
    expect(hasUnsupportedColorFunction('oklch(0.7 0.1 180 / 0.5)')).toBe(true);
    expect(hasUnsupportedColorFunction('color(display-p3 1 0.5 0)')).toBe(true);
  });

  it('allows html2canvas-safe color formats', () => {
    expect(hasUnsupportedColorFunction('#ffd700')).toBe(false);
    expect(hasUnsupportedColorFunction('rgba(255, 215, 0, 0.5)')).toBe(false);
    expect(hasUnsupportedColorFunction('rgb(26, 24, 20)')).toBe(false);
    expect(hasUnsupportedColorFunction('hsl(50 100% 50%)')).toBe(false);
  });

  it('flags values that are not safe for html2canvas parsing', () => {
    expect(needsColorNormalization('oklab(0.7 0.1 0.05 / 0.5)')).toBe(true);
    expect(needsColorNormalization('#1a1814')).toBe(false);
    expect(needsColorNormalization('rgba(255, 215, 0, 0.5)')).toBe(false);
    expect(needsColorNormalization('transparent')).toBe(false);
    expect(needsColorNormalization('none')).toBe(false);
  });

  it('replaces unsupported color functions inside shadow values when canvas is available', () => {
    if (typeof document === 'undefined') return;

    const normalized = normalizeColorsInCSSValue(
      '0px 0px 20px color-mix(in oklab, rgb(255, 215, 0) 30%, transparent)'
    );

    expect(normalized).not.toMatch(/oklab|oklch|color-mix/i);
  });
});
