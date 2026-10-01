import { ACHIEVEMENTS } from '@/lib/achievements';
import { ALL_LESSON_IDS, BELT_WORLDS } from '@/lib/constants';
import type { QuizProgress, UserProgress } from '@/types';

/**
 * Bản xem của Admin. Không ghi storage và không sửa object progress gốc.
 * Quiz chưa từng làm có attempts = 0 để điểm trung bình không bị kéo về 0.
 */
export function asAdminJourney(progress: UserProgress): UserProgress {
  const lessons = { ...progress.lessons };
  const quizzes = { ...progress.quizzes };

  for (const lessonId of ALL_LESSON_IDS) {
    const lesson = lessons[lessonId];
    lessons[lessonId] = {
      ...lesson,
      completed: true,
      readProgress: Math.max(lesson?.readProgress ?? 0, 100),
    };

    const quiz = quizzes[lessonId];
    const viewed: QuizProgress = quiz
      ? { ...quiz, passed: true }
      : {
          score: 0,
          passed: true,
          attempts: 0,
          lastAttempt: progress.profile.startedAt,
          lastScore: 0,
        };
    quizzes[lessonId] = viewed;
  }

  const belts = { ...progress.belts };
  for (const belt of BELT_WORLDS) {
    const current = belts[belt.id];
    belts[belt.id] = {
      ...current,
      unlocked: true,
      lessonsCompleted: belt.lessons.length,
      totalLessons: belt.totalLessons,
    };
  }

  return {
    ...progress,
    lessons,
    quizzes,
    belts,
    achievements: ACHIEVEMENTS.map((achievement) => achievement.id),
    preferences: { ...progress.preferences, onboardingComplete: true },
  };
}
