'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { READ_THRESHOLD } from '@/lib/constants';
import {
  calculateLessonReadProgress,
  findScrollContainer,
  measureVisibleContentHeight,
  mergeReadProgress,
} from '@/lib/lesson-reading';
import { useProgressStore } from '@/store/progress-store';

interface UseLessonReadingTrackerOptions {
  lessonId: string;
  contentRef: React.RefObject<HTMLElement | null>;
  initialProgress?: number;
  viewportBottomOffset?: number;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
}

export function useLessonReadingTracker({
  lessonId,
  contentRef,
  initialProgress = 0,
  viewportBottomOffset = 0,
  onProgress,
  onComplete,
}: UseLessonReadingTrackerOptions) {
  const updateReading = useProgressStore((s) => s.updateReading);
  const baselineVisibleRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const maxProgressRef = useRef(Math.floor(initialProgress));
  const maxCompleteRef = useRef(Math.floor(initialProgress) >= READ_THRESHOLD);
  const completionNotifiedRef = useRef(maxCompleteRef.current);
  const onProgressRef = useRef(onProgress);
  const onCompleteRef = useRef(onComplete);
  const [displayProgress, setDisplayProgress] = useState(
    Math.floor(initialProgress)
  );
  const [isComplete, setIsComplete] = useState(maxCompleteRef.current);

  onProgressRef.current = onProgress;
  onCompleteRef.current = onComplete;

  const emitProgress = useCallback(
    (snapshot: ReturnType<typeof calculateLessonReadProgress>) => {
      const mergedDisplay = mergeReadProgress(
        maxProgressRef.current,
        snapshot.display
      );
      const mergedComplete = maxCompleteRef.current || snapshot.complete;

      if (
        mergedDisplay === maxProgressRef.current &&
        mergedComplete === maxCompleteRef.current
      ) {
        return;
      }

      maxProgressRef.current = mergedDisplay;
      maxCompleteRef.current = mergedComplete;
      setDisplayProgress(mergedDisplay);
      setIsComplete(mergedComplete);
      updateReading(lessonId, mergedDisplay);
      onProgressRef.current?.(mergedDisplay);

      if (!completionNotifiedRef.current && mergedComplete) {
        completionNotifiedRef.current = true;
        onCompleteRef.current?.();
      }
    },
    [lessonId, updateReading]
  );

  const measureProgress = useCallback(() => {
    const el = contentRef.current;
    if (!el) {
      emitProgress({ ratio: 0, display: 0, complete: false });
      return;
    }

    if (baselineVisibleRef.current === null) {
      baselineVisibleRef.current = measureVisibleContentHeight(
        el,
        viewportBottomOffset
      );
    }

    emitProgress(
      calculateLessonReadProgress(
        el,
        viewportBottomOffset,
        baselineVisibleRef.current
      )
    );
  }, [contentRef, emitProgress, viewportBottomOffset]);

  const scheduleMeasure = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      measureProgress();
    });
  }, [measureProgress]);

  useEffect(() => {
    baselineVisibleRef.current = null;
  }, [lessonId]);

  useEffect(() => {
    const merged = mergeReadProgress(maxProgressRef.current, initialProgress);
    maxProgressRef.current = merged;
    maxCompleteRef.current = merged >= READ_THRESHOLD;
    setDisplayProgress(merged);
    setIsComplete(maxCompleteRef.current);
    completionNotifiedRef.current = maxCompleteRef.current;
  }, [initialProgress]);

  useEffect(() => {
    const scrollContainer = findScrollContainer(contentRef.current);
    const scrollTargets: Array<HTMLElement | Window> = [window];
    if (scrollContainer !== window) {
      scrollTargets.push(scrollContainer);
    }

    for (const target of scrollTargets) {
      target.addEventListener('scroll', scheduleMeasure, { passive: true });
    }
    document.addEventListener('scroll', scheduleMeasure, {
      passive: true,
      capture: true,
    });
    window.addEventListener('resize', scheduleMeasure, { passive: true });

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => scheduleMeasure())
        : null;

    const mutationObserver =
      typeof MutationObserver !== 'undefined' && contentRef.current
        ? new MutationObserver(() => scheduleMeasure())
        : null;

    if (contentRef.current) {
      resizeObserver?.observe(contentRef.current);
      mutationObserver?.observe(contentRef.current, {
        childList: true,
        subtree: true,
      });
    }

    scheduleMeasure();
    const delayedMeasure = window.setTimeout(scheduleMeasure, 100);
    const rafMeasure = window.requestAnimationFrame(scheduleMeasure);

    return () => {
      for (const target of scrollTargets) {
        target.removeEventListener('scroll', scheduleMeasure);
      }
      document.removeEventListener('scroll', scheduleMeasure, true);
      window.removeEventListener('resize', scheduleMeasure);
      resizeObserver?.disconnect();
      mutationObserver?.disconnect();
      window.clearTimeout(delayedMeasure);
      window.cancelAnimationFrame(rafMeasure);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [contentRef, scheduleMeasure]);

  return { displayProgress, isComplete };
}
