import { describe, expect, it } from 'vitest';
import { ACHIEVEMENTS } from '@/lib/achievements';
import { asAdminJourney } from '@/lib/admin-journey';
import { createDefaultProgress } from '@/lib/storage';
import {
  getOverallProgress,
  isBeltUnlocked,
  isLessonUnlocked,
} from '@/lib/progress';

describe('admin journey view', () => {
  it('mở toàn bộ hành trình mà không sửa progress gốc', () => {
    const progress = createDefaultProgress();
    progress.quizzes['brown-lesson-01'] = {
      score: 80,
      passed: true,
      attempts: 1,
      lastAttempt: progress.profile.startedAt,
      lastScore: 80,
    };
    const snapshot = JSON.stringify(progress);

    const view = asAdminJourney(progress);

    expect(JSON.stringify(progress)).toBe(snapshot);
    expect(isLessonUnlocked('white-lesson-02', progress)).toBe(false);
    expect(isBeltUnlocked('white', progress)).toBe(false);
    expect(isLessonUnlocked('white-lesson-02', view)).toBe(true);
    expect(isBeltUnlocked('white', view)).toBe(true);
    expect(getOverallProgress(view).percent).toBe(100);
    expect(getOverallProgress(view).averageScore).toBe(80);
    expect(view.achievements).toEqual(ACHIEVEMENTS.map((achievement) => achievement.id));
    expect(progress.achievements).toEqual([]);
    expect(view.pendingCeremony).toBe(progress.pendingCeremony);
  });
});
