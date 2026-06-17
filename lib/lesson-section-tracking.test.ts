import { describe, expect, it } from 'vitest';
import {
  measureActiveSectionId,
  measureNewlyCompletedSectionIds,
  visibleSectionRatio,
  type TrackedSection,
} from '@/lib/lesson-section-tracking';

const HEADER_OFFSET = 88;

function sections(input: Array<[string, number, number]>): TrackedSection[] {
  return input.map(([id, top, bottom]) => ({ id, top, bottom }));
}

describe('visibleSectionRatio', () => {
  it('returns full ratio when section is fully visible', () => {
    const ratio = visibleSectionRatio(
      { id: 'section-01', top: 120, bottom: 420 },
      HEADER_OFFSET,
      800
    );
    expect(ratio).toBeCloseTo(1);
  });

  it('returns partial ratio when section is partially visible', () => {
    const ratio = visibleSectionRatio(
      { id: 'section-01', top: 700, bottom: 900 },
      HEADER_OFFSET,
      800
    );
    expect(ratio).toBeCloseTo(0.5);
  });
});

describe('measureActiveSectionId', () => {
  it('selects the section with the highest visible ratio', () => {
    const rects = sections([
      ['section-01', 80, 300],
      ['section-02', 300, 700],
      ['section-03', 700, 1100],
    ]);

    expect(
      measureActiveSectionId(rects, HEADER_OFFSET, 800)
    ).toBe('section-02');
  });

  it('prefers the higher section on equal visible ratios', () => {
    const rects = sections([
      ['section-01', 200, 500],
      ['section-02', 250, 550],
    ]);

    expect(
      measureActiveSectionId(rects, HEADER_OFFSET, 800)
    ).toBe('section-01');
  });

  it('falls back to the last section near page bottom', () => {
    const rects = sections([
      ['section-01', -400, -200],
      ['section-02', -200, 600],
    ]);

    expect(
      measureActiveSectionId(rects, HEADER_OFFSET, 800)
    ).toBe('section-02');
  });
});

describe('measureNewlyCompletedSectionIds', () => {
  it('completes all sections before the active section', () => {
    const rects = sections([
      ['section-01', -200, 100],
      ['section-02', 100, 400],
      ['section-03', 400, 700],
    ]);

    const newly = measureNewlyCompletedSectionIds(
      rects,
      'section-03',
      new Set(),
      HEADER_OFFSET
    );

    expect(newly).toEqual(['section-01', 'section-02']);
  });

  it('does not skip odd-numbered sections', () => {
    const rects = sections([
      ['section-01', -300, 90],
      ['section-02', 90, 280],
      ['section-03', 280, 470],
      ['section-04', 470, 660],
      ['section-05', 660, 850],
    ]);

    const newly = measureNewlyCompletedSectionIds(
      rects,
      'section-05',
      new Set(),
      HEADER_OFFSET
    );

    expect(newly).toEqual([
      'section-01',
      'section-02',
      'section-03',
      'section-04',
    ]);
  });

  it('marks a section complete after its content scrolls past the header', () => {
    const rects = sections([
      ['section-01', -300, 100],
      ['section-02', 200, 500],
    ]);

    const newly = measureNewlyCompletedSectionIds(
      rects,
      'section-02',
      new Set(),
      HEADER_OFFSET
    );

    expect(newly).toContain('section-01');
  });

  it('does not duplicate already completed sections', () => {
    const rects = sections([
      ['section-01', -300, 90],
      ['section-02', 200, 500],
      ['section-03', 500, 800],
    ]);

    const newly = measureNewlyCompletedSectionIds(
      rects,
      'section-03',
      new Set(['section-01']),
      HEADER_OFFSET
    );

    expect(newly).toEqual(['section-02']);
  });
});
