'use client';

import { create } from 'zustand';
import type { UserProgress, UserPreferences } from '@/types';
import {
  createDefaultProgress,
  getProgress,
  saveProgress,
  updateProfile,
  updateCandidateProfile,
  updateCandidateDraft,
  didPersistCandidate,
  updatePreferences,
  resetProgress as resetStorage,
  importProgress as importStorage,
  updateLessonProgress,
  setPendingCeremony,
} from '@/lib/storage';
import { candidateProfileSchema, type CandidateProfileInput } from '@/lib/candidate-profile';
import { getExamAttempts, parseImportedExamAttempts, replaceExamAttempts } from '@/lib/exam-attempts';
import { syncBeltProgress, processQuizCompletion } from '@/lib/progress';
import { checkAchievements } from '@/lib/achievements';

interface ProgressStore {
  progress: UserProgress;
  hydrated: boolean;
  hydrate: () => void;
  setName: (name: string) => void;
  setCandidateProfile: (input: CandidateProfileInput) => boolean;
  saveCandidateDraft: (input: CandidateProfileInput) => void;
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
  },

  setName: (name) => {
    const p = updateProfile(name);
    set({ progress: p });
  },

  setCandidateProfile: (input) => {
    const parsed = candidateProfileSchema.safeParse(input);
    if (!parsed.success) return false;
    const p = updateCandidateProfile(parsed.data);
    set({ progress: p });
    return didPersistCandidate(parsed.data);
  },

  saveCandidateDraft: (input) => {
    updateCandidateDraft(input);
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

  exportData: () => {
    return JSON.stringify(
      { ...getProgress(), examAttempts: getExamAttempts() },
      null,
      2
    );
  },

  importData: (json) => {
    let parsed: unknown;
    try {
      parsed = JSON.parse(json);
    } catch {
      return false;
    }
    const ok = importStorage(json);
    if (ok) {
      const attempts = parseImportedExamAttempts(parsed);
      if (attempts) replaceExamAttempts(attempts);
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
