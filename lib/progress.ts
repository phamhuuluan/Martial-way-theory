import type { BeltId, LessonState, UserProgress } from '@/types';
import {
  ALL_LESSON_IDS,
  BELT_WORLDS,
  READ_THRESHOLD,
  getBeltById,
  getNextLessonId,
  getPrevLessonId,
} from '@/lib/constants';
import {
  getProgress,
  saveProgress,
  setPendingCeremony,
  updateQuizProgress,
} from '@/lib/storage';
import { checkAchievements } from '@/lib/achievements';

export function isLessonUnlocked(
  lessonId: string,
  progress?: UserProgress
): boolean {
  const p = progress ?? getProgress();

  if (lessonId === 'brown-lesson-01') return true;

  const idx = ALL_LESSON_IDS.indexOf(lessonId);
  if (idx <= 0) return false;

  const prevId = ALL_LESSON_IDS[idx - 1];
  const prevQuiz = p.quizzes[prevId];
  return prevQuiz?.passed === true;
}

export function isLessonCompleted(
  lessonId: string,
  progress?: UserProgress
): boolean {
  const p = progress ?? getProgress();
  return p.quizzes[lessonId]?.passed === true;
}

export function getLessonState(
  lessonId: string,
  progress?: UserProgress
): LessonState {
  const p = progress ?? getProgress();
  if (isLessonCompleted(lessonId, p)) return 'completed';
  if (isLessonUnlocked(lessonId, p)) return 'active';
  return 'locked';
}

export function isBeltUnlocked(beltId: BeltId, progress?: UserProgress): boolean {
  const p = progress ?? getProgress();
  return p.belts[beltId]?.unlocked ?? false;
}

export function isBeltCompleted(beltId: BeltId, progress?: UserProgress): boolean {
  const belt = getBeltById(beltId);
  const p = progress ?? getProgress();
  return belt.lessons.every((id) => isLessonCompleted(id, p));
}

export function getBeltCompletionPercent(
  beltId: BeltId,
  progress?: UserProgress
): number {
  const belt = getBeltById(beltId);
  const p = progress ?? getProgress();
  const completed = belt.lessons.filter((id) =>
    isLessonCompleted(id, p)
  ).length;
  return Math.round((completed / belt.totalLessons) * 100);
}

export function getOverallProgress(progress?: UserProgress): {
  completedLessons: number;
  totalLessons: number;
  percent: number;
  averageScore: number;
} {
  const p = progress ?? getProgress();
  const totalLessons = ALL_LESSON_IDS.length;
  const completedLessons = ALL_LESSON_IDS.filter((id) =>
    isLessonCompleted(id, p)
  ).length;

  const scores = Object.values(p.quizzes)
    .filter((q) => q.passed)
    .map((q) => q.score);

  const averageScore =
    scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;

  return {
    completedLessons,
    totalLessons,
    percent: Math.round((completedLessons / totalLessons) * 100),
    averageScore,
  };
}

export function getCurrentBelt(progress?: UserProgress): BeltId {
  const p = progress ?? getProgress();

  for (const belt of BELT_WORLDS) {
    if (!isBeltCompleted(belt.id, p)) return belt.id;
  }
  return 'white';
}

export function getCurrentLessonId(progress?: UserProgress): string {
  const p = progress ?? getProgress();

  for (const lessonId of ALL_LESSON_IDS) {
    if (!isLessonCompleted(lessonId, p)) return lessonId;
  }
  return ALL_LESSON_IDS[ALL_LESSON_IDS.length - 1];
}

export function getLearningDepth(averageScore: number): string {
  if (averageScore >= 90) return 'Đang thấm nhuần';
  if (averageScore >= 70) return 'Đang củng cố';
  return 'Đang học';
}

export function isLessonReadingComplete(
  readProgress: number,
  progress?: UserProgress,
  lessonId?: string
): boolean {
  const stored =
    lessonId !== undefined
      ? (progress ?? getProgress()).lessons[lessonId]?.readProgress ?? readProgress
      : readProgress;
  return (
    Math.max(Math.floor(stored), Math.floor(readProgress)) >= READ_THRESHOLD
  );
}

export function canTakeQuiz(
  lessonId: string,
  readProgress: number,
  progress?: UserProgress
): { allowed: boolean; warning: boolean } {
  const unlocked = isLessonUnlocked(lessonId, progress);
  if (!unlocked) return { allowed: false, warning: false };
  if (!isLessonReadingComplete(readProgress, progress, lessonId)) {
    return { allowed: false, warning: true };
  }
  return { allowed: true, warning: false };
}

export function processQuizCompletion(
  lessonId: string,
  score: number,
  passed: boolean,
  wrongQuestions: string[]
): UserProgress {
  let p = updateQuizProgress(lessonId, { score, passed, wrongQuestions });

  if (passed) {
    p = {
      ...p,
      lessons: {
        ...p.lessons,
        [lessonId]: {
          ...p.lessons[lessonId],
          completed: true,
          readProgress: Math.max(p.lessons[lessonId]?.readProgress ?? 0, 100),
          completedAt: new Date().toISOString(),
        },
      },
    };

    const beltId = lessonId.split('-')[0] as BeltId;
    const belt = getBeltById(beltId);
    const lessonsCompleted = belt.lessons.filter((id) =>
      isLessonCompleted(id, p)
    ).length;

    p = {
      ...p,
      belts: {
        ...p.belts,
        [beltId]: {
          ...p.belts[beltId],
          lessonsCompleted,
          totalLessons: belt.totalLessons,
        },
      },
    };

    if (isBeltCompleted(beltId, p)) {
      p = {
        ...p,
        belts: {
          ...p.belts,
          [beltId]: {
            ...p.belts[beltId],
            completedAt: new Date().toISOString(),
          },
        },
      };

      const beltIndex = BELT_WORLDS.findIndex((b) => b.id === beltId);
      const nextBelt = BELT_WORLDS[beltIndex + 1];
      if (nextBelt) {
        p = {
          ...p,
          belts: {
            ...p.belts,
            [nextBelt.id]: {
              ...p.belts[nextBelt.id],
              unlocked: true,
            },
          },
        };
        setPendingCeremony(beltId);
        p = { ...p, pendingCeremony: beltId };
      }
    }

    saveProgress(p);
    p = checkAchievements(p);
  }

  return p;
}

export function syncBeltProgress(progress: UserProgress): UserProgress {
  const belts = { ...progress.belts };

  BELT_WORLDS.forEach((belt, index) => {
    const lessonsCompleted = belt.lessons.filter((id) =>
      isLessonCompleted(id, progress)
    ).length;

    const prevCompleted =
      index === 0 || isBeltCompleted(BELT_WORLDS[index - 1].id, progress);

    belts[belt.id] = {
      ...belts[belt.id],
      unlocked: index === 0 || prevCompleted || belts[belt.id]?.unlocked,
      lessonsCompleted,
      totalLessons: belt.totalLessons,
      completedAt:
        lessonsCompleted === belt.totalLessons
          ? belts[belt.id]?.completedAt ?? new Date().toISOString()
          : belts[belt.id]?.completedAt,
    };
  });

  return { ...progress, belts };
}

export { getNextLessonId, getPrevLessonId };
