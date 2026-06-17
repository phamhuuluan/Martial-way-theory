'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { copyTextToClipboard } from '@/lib/copy-to-clipboard';

interface LessonCopyContextValue {
  copyQuestion: (sectionId: string) => Promise<void>;
  copiedSectionId: string | null;
}

const LessonCopyContext = createContext<LessonCopyContextValue | null>(null);

const COPIED_FEEDBACK_MS = 1500;

export function LessonCopyProvider({
  questionCopyTexts,
  children,
}: {
  questionCopyTexts: Record<string, string>;
  children: React.ReactNode;
}) {
  const [copiedSectionId, setCopiedSectionId] = useState<string | null>(null);
  const resetTimerRef = useRef<number | null>(null);

  const copyQuestion = useCallback(
    async (sectionId: string) => {
      const text = questionCopyTexts[sectionId];
      if (!text) return;

      const copied = await copyTextToClipboard(text);
      if (!copied) return;

      setCopiedSectionId(sectionId);

      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }

      resetTimerRef.current = window.setTimeout(() => {
        setCopiedSectionId(null);
        resetTimerRef.current = null;
      }, COPIED_FEEDBACK_MS);
    },
    [questionCopyTexts]
  );

  const value = useMemo(
    () => ({
      copyQuestion,
      copiedSectionId,
    }),
    [copyQuestion, copiedSectionId]
  );

  return (
    <LessonCopyContext.Provider value={value}>
      {children}
    </LessonCopyContext.Provider>
  );
}

export function useLessonCopy() {
  const context = useContext(LessonCopyContext);
  if (!context) {
    throw new Error('useLessonCopy must be used within LessonCopyProvider');
  }
  return context;
}
