import { describe, expect, it } from 'vitest';
import {
  buildSectionObserverRootMargin,
  isSectionAlignedAtOffset,
} from '@/lib/lesson-reading';
import {
  pickActiveSectionFromIntersectionSamples,
} from '@/lib/lesson-section-tracking';

describe('buildSectionObserverRootMargin', () => {
  it('builds top and bottom inset margins', () => {
    expect(buildSectionObserverRootMargin(88, 80)).toBe('-88px 0px -80px 0px');
  });
});

describe('isSectionAlignedAtOffset', () => {
  it('returns true when element top is within tolerance of offset', () => {
    const element = {
      getBoundingClientRect: () => ({ top: 90 }),
    } as HTMLElement;

    expect(isSectionAlignedAtOffset(element, 88, 6)).toBe(true);
  });

  it('returns false when element is far from offset', () => {
    const element = {
      getBoundingClientRect: () => ({ top: 240 }),
    } as HTMLElement;

    expect(isSectionAlignedAtOffset(element, 88)).toBe(false);
  });
});

describe('pickActiveSectionFromIntersectionSamples', () => {
  it('picks the section with the highest intersection ratio', () => {
    const active = pickActiveSectionFromIntersectionSamples(
      [
        { id: 'section-01', ratio: 0.2, top: 100 },
        { id: 'section-02', ratio: 0.7, top: 300 },
        { id: 'section-03', ratio: 0.1, top: 700 },
      ],
      'section-01',
      800
    );

    expect(active).toBe('section-02');
  });

  it('prefers the higher section on equal ratios', () => {
    const active = pickActiveSectionFromIntersectionSamples(
      [
        { id: 'section-01', ratio: 0.5, top: 120 },
        { id: 'section-02', ratio: 0.5, top: 260 },
      ],
      'section-01',
      800
    );

    expect(active).toBe('section-01');
  });

  it('falls back to the last section above the viewport bottom', () => {
    const active = pickActiveSectionFromIntersectionSamples(
      [
        { id: 'section-01', ratio: 0, top: -200 },
        { id: 'section-02', ratio: 0, top: 500 },
      ],
      'section-01',
      800
    );

    expect(active).toBe('section-02');
  });
});
