'use client';

import { createContext, useContext, useMemo } from 'react';
import type { LessonSection } from '@/lib/lesson-sections';

interface LessonSectionContextValue {
  sections: LessonSection[];
  questionsCount?: number;
}

const LessonSectionContext = createContext<LessonSectionContextValue | null>(
  null
);

export function LessonSectionProvider({
  sections,
  questionsCount,
  children,
}: {
  sections: LessonSection[];
  questionsCount?: number;
  children: React.ReactNode;
}) {
  const value = useMemo(
    () => ({
      sections,
      questionsCount,
    }),
    [sections, questionsCount]
  );

  return (
    <LessonSectionContext.Provider value={value}>
      {children}
    </LessonSectionContext.Provider>
  );
}

export function useLessonSectionContext() {
  return useContext(LessonSectionContext);
}
