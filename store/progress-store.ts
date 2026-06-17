'use client';

import { create } from 'zustand';
import type { UserProgress, UserPreferences } from '@/types';
import {
  createDefaultProgress,
  getProgress,
  saveProgress,
  updateProfile,
  updatePreferences,
  resetProgress as resetStorage,
  importProgress as importStorage,
  exportProgress as exportStorage,
  updateLessonProgress,
  setPendingCeremony,
} from '@/lib/storage';
import { syncBeltProgress, processQuizCompletion } from '@/lib/progress';
import { checkAchievements } from '@/lib/achievements';

interface ProgressStore {
  progress: UserProgress;
  hydrated: boolean;
  hydrate: () => void;
  setName: (name: string) => void;
  setPreferences: (prefs: Partial<UserPreferences>) => void;
  updateReading: (lessonId: string, readProgress: number) => void;
  markSectionsComplete: (lessonId: string, sectionIds: string[]) => void;
  completeQuiz: (
    lessonId: string,
    score: number,
    passed: boolean,
    wrongQuestions: string[]
  ) => UserProgress;
  clearCeremony: () => void;
  reset: () => void;
  exportData: () => string;
  importData: (json: string) => boolean;
  refresh: () => void;
}

export const useProgressStore = create<ProgressStore>((set, get) => ({
  progress: createDefaultProgress(),
  hydrated: false,

  hydrate: () => {
    if (typeof window === 'undefined') return;
    let p = getProgress();
    p = syncBeltProgress(p);
    saveProgress(p);
    set({ progress: p, hydrated: true });

    window.addEventListener('storage', () => {
      set({ progress: getProgress() });
    });
  },

  setName: (name) => {
    const p = updateProfile(name);
    set({ progress: p });
  },

  setPreferences: (prefs) => {
    const p = updatePreferences(prefs);
    set({ progress: p });
  },

  updateReading: (lessonId, readProgress) => {
    const p = updateLessonProgress(lessonId, { readProgress });
    set({ progress: p });
  },

  markSectionsComplete: (lessonId, sectionIds) => {
    if (sectionIds.length === 0) return;
    const p = updateLessonProgress(lessonId, { completedSections: sectionIds });
    set({ progress: p });
  },

  completeQuiz: (lessonId, score, passed, wrongQuestions) => {
    let p = processQuizCompletion(lessonId, score, passed, wrongQuestions);
    p = syncBeltProgress(p);
    p = checkAchievements(p);
    set({ progress: p });
    return p;
  },

  clearCeremony: () => {
    const p = setPendingCeremony(null);
    set({ progress: p });
  },

  reset: () => {
    const p = resetStorage();
    set({ progress: p });
  },

  exportData: () => exportStorage(),

  importData: (json) => {
    const ok = importStorage(json);
    if (ok) {
      let p = getProgress();
      p = syncBeltProgress(p);
      set({ progress: p });
    }
    return ok;
  },

  refresh: () => {
    set({ progress: getProgress() });
  },
}));
