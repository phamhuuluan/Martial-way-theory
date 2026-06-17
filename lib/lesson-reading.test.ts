import { describe, expect, it } from 'vitest';
import { READ_THRESHOLD } from '@/lib/constants';
import {
  calculateLessonReadProgress,
  isLessonReadingComplete,
  mergeReadProgress,
  progressFromViewedHeight,
} from '@/lib/lesson-reading';
import { canTakeQuiz } from '@/lib/progress';

describe('lesson reading gate', () => {
  it('merges read progress without decreasing', () => {
    expect(mergeReadProgress(80, 60)).toBe(80);
    expect(mergeReadProgress(80, 95)).toBe(95);
  });

  it('requires 95 percent before quiz access', () => {
    expect(READ_THRESHOLD).toBe(95);
    expect(isLessonReadingComplete(94)).toBe(false);
    expect(isLessonReadingComplete(94.9)).toBe(false);
    expect(isLessonReadingComplete(95)).toBe(true);
  });

  it('uses floor for display and ratio for completion', () => {
    const almost = progressFromViewedHeight(1898, 2000);
    expect(almost.display).toBe(94);
    expect(almost.complete).toBe(false);

    const complete = progressFromViewedHeight(1900, 2000);
    expect(complete.display).toBe(95);
    expect(complete.complete).toBe(true);
  });

  it('increases viewed progress as more content enters the viewport', () => {
    const totalContentHeight = 3000;
    const baselineVisibleHeight = 400;
    const totalReadDistance = totalContentHeight - baselineVisibleHeight;

    const initial = progressFromViewedHeight(0, totalReadDistance);
    const scrolled = progressFromViewedHeight(
      totalReadDistance,
      totalReadDistance
    );

    expect(initial.display).toBe(0);
    expect(scrolled.display).toBe(100);
    expect(scrolled.complete).toBe(true);
  });

  it('starts at zero and reaches one hundred when content bottom hits viewport', () => {
    const totalContentHeight = 5806;
    const viewportBottom = 692;
    const baselineVisibleHeight = viewportBottom;

    const atOpen = progressFromViewedHeight(0, totalContentHeight - baselineVisibleHeight);
    const atEnd = progressFromViewedHeight(
      totalContentHeight - baselineVisibleHeight,
      totalContentHeight - baselineVisibleHeight
    );

    expect(atOpen.display).toBe(0);
    expect(atEnd.display).toBe(100);
    expect(atEnd.complete).toBe(true);
  });

  it('returns zero progress before baseline is established', () => {
    expect(calculateLessonReadProgress(null).display).toBe(0);
  });

  it('blocks quiz when reading is incomplete', () => {
    const result = canTakeQuiz('brown-lesson-01', 50);
    expect(result.allowed).toBe(false);
    expect(result.warning).toBe(true);
  });

  it('allows quiz when reading reaches threshold', () => {
    const result = canTakeQuiz('brown-lesson-01', 95);
    expect(result.allowed).toBe(true);
    expect(result.warning).toBe(false);
  });
});
