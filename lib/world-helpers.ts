import type { BeltId, BeltWorld, LessonMeta, UserProgress } from '@/types';
import { BELT_WORLDS } from '@/lib/constants';
import {
  getLessonState,
  isLessonCompleted,
} from '@/lib/progress';

export type WorldLessonDisplayState =
  | 'locked'
  | 'available'
  | 'in-progress'
  | 'completed';

export interface GroupedWorldLessons {
  inProgress: LessonMeta[];
  available: LessonMeta[];
  completed: LessonMeta[];
  locked: LessonMeta[];
}

export function getWorldLessonDisplayState(
  lessonId: string,
  progress: UserProgress
): WorldLessonDisplayState {
  const state = getLessonState(lessonId, progress);
  if (state === 'locked') return 'locked';
  if (state === 'completed') return 'completed';

  const readProgress = progress.lessons[lessonId]?.readProgress ?? 0;
  return readProgress > 0 ? 'in-progress' : 'available';
}

export function groupLessonsByDisplayState(
  lessons: LessonMeta[],
  progress: UserProgress,
  excludeLessonId?: string
): GroupedWorldLessons {
  const groups: GroupedWorldLessons = {
    inProgress: [],
    available: [],
    completed: [],
    locked: [],
  };

  for (const lesson of lessons) {
    if (excludeLessonId && lesson.id === excludeLessonId) continue;

    const state = getWorldLessonDisplayState(lesson.id, progress);
    switch (state) {
      case 'in-progress':
        groups.inProgress.push(lesson);
        break;
      case 'available':
        groups.available.push(lesson);
        break;
      case 'completed':
        groups.completed.push(lesson);
        break;
      case 'locked':
        groups.locked.push(lesson);
        break;
    }
  }

  return groups;
}

export function getFirstIncompleteLessonInBelt(
  lessons: LessonMeta[],
  progress: UserProgress
): LessonMeta | null {
  return lessons.find((l) => !isLessonCompleted(l.id, progress)) ?? null;
}

export function getContinueLessonInBelt(
  lessons: LessonMeta[],
  progress: UserProgress
): LessonMeta {
  const next = getFirstIncompleteLessonInBelt(lessons, progress);
  return next ?? lessons[lessons.length - 1];
}

export function getPreviousBelt(beltId: BeltId): BeltWorld | null {
  const index = BELT_WORLDS.findIndex((b) => b.id === beltId);
  return index > 0 ? BELT_WORLDS[index - 1] : null;
}

export function getCompletedLessonCount(
  lessons: LessonMeta[],
  progress: UserProgress
): number {
  return lessons.filter((l) => isLessonCompleted(l.id, progress)).length;
}

export function getBeltAverageQuizScore(
  beltId: BeltId,
  progress: UserProgress
): number | null {
  const belt = BELT_WORLDS.find((b) => b.id === beltId);
  if (!belt) return null;

  const scores = belt.lessons
    .filter((id) => progress.quizzes[id]?.passed)
    .map((id) => progress.quizzes[id]!.score);

  if (scores.length === 0) return null;
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
}

export function getRemainingMinutesInBelt(
  lessons: LessonMeta[],
  progress: UserProgress
): number {
  return lessons
    .filter((l) => !isLessonCompleted(l.id, progress))
    .reduce((sum, l) => sum + l.estimatedMinutes, 0);
}

export const WORLD_LESSON_STATE_LABELS: Record<WorldLessonDisplayState, string> = {
  locked: 'Chưa mở',
  available: 'Sẵn sàng',
  'in-progress': 'Đang học',
  completed: 'Hoàn thành',
};
