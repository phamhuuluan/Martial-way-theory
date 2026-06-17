import type { UserProgress } from '@/types';
import {
  ALL_LESSON_IDS,
  BELT_WORLDS,
  getBeltById,
} from '@/lib/constants';
import {
  getOverallProgress,
  isBeltCompleted,
  isLessonCompleted,
} from '@/lib/progress';

export interface AchievementProgressHint {
  label: string;
  percent?: number;
}

function consecutiveStreak(progress: UserProgress): number {
  let streak = 0;
  let max = 0;
  for (const id of ALL_LESSON_IDS) {
    if (isLessonCompleted(id, progress)) {
      streak++;
      max = Math.max(max, streak);
    } else {
      streak = 0;
    }
  }
  return max;
}

function beltProgress(beltId: string, progress: UserProgress): AchievementProgressHint {
  const belt = getBeltById(beltId as Parameters<typeof getBeltById>[0]);
  const completed = belt.lessons.filter((id) => isLessonCompleted(id, progress)).length;
  const percent = Math.round((completed / belt.totalLessons) * 100);
  return {
    label: `${completed}/${belt.totalLessons} bài · ${belt.name}`,
    percent,
  };
}

function perfectQuizProgress(progress: UserProgress): AchievementProgressHint {
  const perfect = ALL_LESSON_IDS.filter((id) => progress.quizzes[id]?.score === 100).length;
  const percent = Math.round((perfect / ALL_LESSON_IDS.length) * 100);
  return {
    label: `${perfect}/${ALL_LESSON_IDS.length} bài kiểm tra đạt 100%`,
    percent,
  };
}

/** Presentation-only hints — does not alter achievement logic */
export function getAchievementProgressHint(
  achievementId: string,
  progress: UserProgress
): AchievementProgressHint | null {
  switch (achievementId) {
    case 'first-step':
      return isLessonCompleted('brown-lesson-01', progress)
        ? null
        : { label: 'Hoàn thành bài Nâu Đai đầu tiên' };

    case 'perseverance': {
      const streak = consecutiveStreak(progress);
      if (streak >= 5) return null;
      return {
        label: `${Math.min(streak, 5)}/5 bài liên tiếp`,
        percent: Math.round((Math.min(streak, 5) / 5) * 100),
      };
    }

    case 'humility':
      return isBeltCompleted('brown', progress) ? null : beltProgress('brown', progress);

    case 'humility-deep':
      return isBeltCompleted('blue', progress) ? null : beltProgress('blue', progress);

    case 'patience': {
      const best = Object.values(progress.quizzes).reduce(
        (max, q) => Math.max(max, q.passed ? q.attempts : 0),
        0
      );
      if (best >= 3) return null;
      return {
        label: `${Math.min(best, 3)}/3 lần ôn trước khi vượt qua`,
        percent: Math.round((Math.min(best, 3) / 3) * 100),
      };
    }

    case 'diligence':
    case 'rising':
      return isBeltCompleted('green', progress) ? null : beltProgress('green', progress);

    case 'courage':
      return isBeltCompleted('red', progress) ? null : beltProgress('red', progress);

    case 'precision': {
      const hasPerfect = Object.values(progress.quizzes).some((q) => q.score === 100);
      if (hasPerfect) return null;
      return { label: 'Đạt 100% trong một bài kiểm tra' };
    }

    case 'steadfast':
    case 'tolerance':
      return isBeltCompleted('yellow', progress) ? null : beltProgress('yellow', progress);

    case 'integrity':
      return isBeltCompleted('white', progress) ? null : beltProgress('white', progress);

    case 'purity': {
      const completedBelts = BELT_WORLDS.filter((b) => isBeltCompleted(b.id, progress)).length;
      if (completedBelts >= BELT_WORLDS.length) return null;
      return {
        label: `${completedBelts}/${BELT_WORLDS.length} màu đai hoàn thành`,
        percent: Math.round((completedBelts / BELT_WORLDS.length) * 100),
      };
    }

    case 'master': {
      const overall = getOverallProgress(progress);
      if (
        overall.completedLessons === overall.totalLessons &&
        overall.averageScore >= 90
      ) {
        return null;
      }
      const lessonPercent = Math.round(
        (overall.completedLessons / overall.totalLessons) * 100
      );
      return {
        label: `${overall.completedLessons}/${overall.totalLessons} bài · TB ${overall.averageScore}%`,
        percent: lessonPercent,
      };
    }

    case 'perfect-quiz':
      return Object.values(progress.quizzes).every((q) => q.score === 100) &&
        ALL_LESSON_IDS.length > 0
        ? null
        : perfectQuizProgress(progress);

    default:
      return null;
  }
}
