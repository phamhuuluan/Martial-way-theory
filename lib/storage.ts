import type {
  UserProgress,
  LessonProgress,
  QuizProgress,
  BeltProgress,
  UserPreferences,
} from '@/types';
import { BELT_WORLDS, STORAGE_KEY, CURRENT_VERSION } from '@/lib/constants';
import { mergeReadProgress } from '@/lib/lesson-reading';

export const DEFAULT_PREFERENCES: UserPreferences = {
  reducedMotion: false,
  fontSize: 'normal',
  colorScheme: 'light',
  onboardingComplete: false,
};

function createDefaultBelts(): Record<string, BeltProgress> {
  const belts: Record<string, BeltProgress> = {};
  BELT_WORLDS.forEach((belt, index) => {
    belts[belt.id] = {
      unlocked: index === 0,
      lessonsCompleted: 0,
      totalLessons: belt.totalLessons,
    };
  });
  return belts;
}

export function createDefaultProgress(): UserProgress {
  const now = new Date().toISOString();
  return {
    version: CURRENT_VERSION,
    profile: {
      startedAt: now,
      lastActiveAt: now,
    },
    lessons: {},
    quizzes: {},
    belts: createDefaultBelts(),
    achievements: [],
    preferences: { ...DEFAULT_PREFERENCES },
    pendingCeremony: null,
  };
}

let memoryStore: UserProgress | null = null;
let storageAvailable = true;

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

function detectStorage(): boolean {
  if (!isBrowser()) return false;
  try {
    const test = '__pqq_test__';
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

export function isUsingMemoryFallback(): boolean {
  return isBrowser() && !storageAvailable;
}

export function migrateProgress(raw: unknown): UserProgress {
  const defaults = createDefaultProgress();
  if (!raw || typeof raw !== 'object') return defaults;

  const data = raw as Partial<UserProgress>;
  return {
    ...defaults,
    ...data,
    version: CURRENT_VERSION,
    profile: { ...defaults.profile, ...data.profile },
    lessons: { ...defaults.lessons, ...data.lessons },
    quizzes: { ...defaults.quizzes, ...data.quizzes },
    belts: { ...defaults.belts, ...data.belts },
    achievements: data.achievements ?? [],
    preferences: { ...defaults.preferences, ...data.preferences },
  };
}

export function getProgress(): UserProgress {
  if (!isBrowser()) return createDefaultProgress();

  if (!storageAvailable && memoryStore) return memoryStore;

  storageAvailable = detectStorage();

  if (!storageAvailable) {
    memoryStore = memoryStore ?? createDefaultProgress();
    return memoryStore;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultProgress();
    return migrateProgress(JSON.parse(raw));
  } catch {
    return createDefaultProgress();
  }
}

export function saveProgress(data: UserProgress): void {
  if (!isBrowser()) return;

  const toSave = {
    ...data,
    profile: {
      ...data.profile,
      lastActiveAt: new Date().toISOString(),
    },
  };

  if (!storageAvailable) {
    memoryStore = toSave;
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (e) {
    if (e instanceof DOMException && e.name === 'QuotaExceededError') {
      console.error('localStorage quota exceeded');
    }
    memoryStore = toSave;
    storageAvailable = false;
  }
}

export function updateLessonProgress(
  lessonId: string,
  update: Partial<LessonProgress>
): UserProgress {
  const current = getProgress();
  const existing = current.lessons[lessonId] ?? {
    completed: false,
    readProgress: 0,
  };

  const merged: LessonProgress = {
    ...existing,
    ...update,
    readProgress:
      update.readProgress !== undefined
        ? mergeReadProgress(existing.readProgress ?? 0, update.readProgress)
        : existing.readProgress ?? 0,
    completedSections:
      update.completedSections !== undefined
        ? [
            ...new Set([
              ...(existing.completedSections ?? []),
              ...update.completedSections,
            ]),
          ]
        : existing.completedSections,
    lastReadAt: new Date().toISOString(),
  };

  const next: UserProgress = {
    ...current,
    lessons: { ...current.lessons, [lessonId]: merged },
  };

  saveProgress(next);
  return next;
}

export function updateQuizProgress(
  lessonId: string,
  result: Partial<QuizProgress> & { score: number; passed: boolean }
): UserProgress {
  const current = getProgress();
  const existing = current.quizzes[lessonId];
  const attempts = (existing?.attempts ?? 0) + 1;

  const merged: QuizProgress = {
    score: Math.max(existing?.score ?? 0, result.score),
    passed: (existing?.passed ?? false) || result.passed,
    attempts,
    lastAttempt: new Date().toISOString(),
    lastScore: result.score,
    wrongQuestions: result.wrongQuestions ?? existing?.wrongQuestions,
  };

  const next: UserProgress = {
    ...current,
    quizzes: { ...current.quizzes, [lessonId]: merged },
  };

  saveProgress(next);
  return next;
}

export function earnAchievement(achievementId: string): UserProgress {
  const current = getProgress();
  if (current.achievements.includes(achievementId)) return current;

  const next: UserProgress = {
    ...current,
    achievements: [...current.achievements, achievementId],
  };

  saveProgress(next);
  return next;
}

export function resetProgress(): UserProgress {
  const existing = getProgress();
  const fresh = createDefaultProgress();
  if (existing.profile.name) {
    fresh.profile.name = existing.profile.name;
  }
  saveProgress(fresh);
  return fresh;
}

export function exportProgress(): string {
  return JSON.stringify(getProgress(), null, 2);
}

export function importProgress(json: string): boolean {
  try {
    const parsed = JSON.parse(json);
    const migrated = migrateProgress(parsed);
    if (!migrated.profile?.startedAt) return false;
    if (migrated.version > CURRENT_VERSION) return false;
    saveProgress(migrated);
    return true;
  } catch {
    return false;
  }
}

export function updateProfile(name: string): UserProgress {
  const current = getProgress();
  const next: UserProgress = {
    ...current,
    profile: { ...current.profile, name },
    preferences: { ...current.preferences, onboardingComplete: true },
  };
  saveProgress(next);
  return next;
}

export function updatePreferences(
  prefs: Partial<UserPreferences>
): UserProgress {
  const current = getProgress();
  const next: UserProgress = {
    ...current,
    preferences: { ...current.preferences, ...prefs },
  };
  saveProgress(next);
  return next;
}

export function setPendingCeremony(beltId: string | null): UserProgress {
  const current = getProgress();
  const next: UserProgress = {
    ...current,
    pendingCeremony: beltId as UserProgress['pendingCeremony'],
  };
  saveProgress(next);
  return next;
}
