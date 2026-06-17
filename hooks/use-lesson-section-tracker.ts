'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  buildSectionObserverRootMargin,
  DEFAULT_LESSON_SECTION_SCROLL_OFFSET,
  findScrollContainer,
  isSectionAlignedAtOffset,
  measureLessonScrollOffset,
  scrollToElementWithOffset,
} from '@/lib/lesson-reading';
import {
  collectSectionHeadings,
  getSectionRects,
  measureNewlyCompletedSectionIds,
  pickActiveSectionFromIntersectionSamples,
} from '@/lib/lesson-section-tracking';
import { useProgressStore } from '@/store/progress-store';

const INTERSECTION_THRESHOLDS = [0, 0.1, 0.25, 0.5, 0.75, 1] as const;

interface UseLessonSectionTrackerOptions {
  lessonId: string;
  contentRef: React.RefObject<HTMLElement | null>;
  initialCompleted?: string[];
  viewportBottomOffset?: number;
}

export function useLessonSectionTracker({
  lessonId,
  contentRef,
  initialCompleted = [],
  viewportBottomOffset = 0,
}: UseLessonSectionTrackerOptions) {
  const markSectionsComplete = useProgressStore((s) => s.markSectionsComplete);
  const completedRef = useRef(new Set(initialCompleted));
  const scrollIntentRef = useRef<string | null>(null);
  const scrollOffsetRef = useRef(DEFAULT_LESSON_SECTION_SCROLL_OFFSET);
  const intersectionRatiosRef = useRef(new Map<string, number>());
  const orderedSectionIdsRef = useRef<string[]>([]);
  const headingElementsRef = useRef<Map<string, HTMLElement>>(new Map());
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [completedSections, setCompletedSections] = useState<string[]>(
    initialCompleted
  );

  useEffect(() => {
    completedRef.current = new Set(initialCompleted);
    setCompletedSections(initialCompleted);
  }, [lessonId, initialCompleted]);

  const tryReleaseScrollIntent = useCallback(() => {
    const targetId = scrollIntentRef.current;
    if (!targetId) return;

    const targetEl = document.getElementById(targetId);
    if (
      targetEl &&
      isSectionAlignedAtOffset(targetEl, scrollOffsetRef.current)
    ) {
      scrollIntentRef.current = null;
    }
  }, []);

  const applyCompletionUpdates = useCallback(
    (nextActiveId: string | null) => {
      const root = contentRef.current;
      if (!root) return;

      const headings = collectSectionHeadings(root);
      const sections = getSectionRects(headings, root);
      const newlyCompleted = measureNewlyCompletedSectionIds(
        sections,
        nextActiveId,
        completedRef.current,
        scrollOffsetRef.current
      );

      if (newlyCompleted.length === 0) return;

      for (const id of newlyCompleted) {
        completedRef.current.add(id);
      }
      setCompletedSections([...completedRef.current]);
      markSectionsComplete(lessonId, newlyCompleted);
    },
    [contentRef, lessonId, markSectionsComplete]
  );

  const updateActiveFromIntersection = useCallback(() => {
    const scrollIntentId = scrollIntentRef.current;
    if (scrollIntentId) {
      setActiveSectionId((prev) =>
        prev === scrollIntentId ? prev : scrollIntentId
      );
      tryReleaseScrollIntent();
      applyCompletionUpdates(scrollIntentId);
      return;
    }

    const orderedIds = orderedSectionIdsRef.current;
    if (orderedIds.length === 0) return;

    const samples = orderedIds.map((id) => ({
      id,
      ratio: intersectionRatiosRef.current.get(id) ?? 0,
      top: headingElementsRef.current.get(id)?.getBoundingClientRect().top ?? Infinity,
    }));

    const viewportBottom =
      (typeof window !== 'undefined' ? window.innerHeight : 800) -
      viewportBottomOffset;

    const nextActiveId = pickActiveSectionFromIntersectionSamples(
      samples,
      orderedIds[0] ?? null,
      viewportBottom
    );

    if (nextActiveId) {
      setActiveSectionId((prev) => (prev === nextActiveId ? prev : nextActiveId));
    }

    applyCompletionUpdates(nextActiveId);
  }, [applyCompletionUpdates, tryReleaseScrollIntent, viewportBottomOffset]);

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    scrollIntentRef.current = sectionId;
    setActiveSectionId(sectionId);
    scrollToElementWithOffset(el, scrollOffsetRef.current);
  }, []);

  useEffect(() => {
    const root = contentRef.current;
    if (!root || typeof IntersectionObserver === 'undefined') return;

    let observer: IntersectionObserver | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let rafId: number | null = null;

    const setupObserver = () => {
      observer?.disconnect();

      scrollOffsetRef.current = measureLessonScrollOffset(root);
      const pageEl = root.closest('.lesson-page');
      if (pageEl instanceof HTMLElement) {
        pageEl.style.setProperty(
          '--lesson-scroll-offset',
          `${scrollOffsetRef.current}px`
        );
      }

      const headings = collectSectionHeadings(root);
      orderedSectionIdsRef.current = headings.map((heading) => heading.id);
      headingElementsRef.current = new Map(
        headings.map((heading) => [heading.id, heading.element])
      );
      intersectionRatiosRef.current = new Map(
        headings.map((heading) => [heading.id, 0])
      );

      if (headings.length === 0) return;

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const element = entry.target as HTMLElement;
            const id = element.dataset.sectionId ?? element.id;
            if (!id) continue;
            intersectionRatiosRef.current.set(
              id,
              entry.isIntersecting ? entry.intersectionRatio : 0
            );
          }
          updateActiveFromIntersection();
        },
        {
          root: null,
          rootMargin: buildSectionObserverRootMargin(
            scrollOffsetRef.current,
            viewportBottomOffset
          ),
          threshold: [...INTERSECTION_THRESHOLDS],
        }
      );

      for (const heading of headings) {
        observer.observe(heading.element);
      }

      updateActiveFromIntersection();
    };

    const scheduleSetup = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        setupObserver();
      });
    };

    const onScrollEnd = () => {
      tryReleaseScrollIntent();
      updateActiveFromIntersection();
    };

    setupObserver();

    window.addEventListener('scrollend', onScrollEnd);
    window.addEventListener('resize', scheduleSetup);

    const scrollContainer = findScrollContainer(root);
    if (scrollContainer !== window) {
      scrollContainer.addEventListener('scrollend', onScrollEnd);
    }

    resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => scheduleSetup())
        : null;
    resizeObserver?.observe(root);

    const mutationObserver =
      typeof MutationObserver !== 'undefined'
        ? new MutationObserver(() => scheduleSetup())
        : null;
    mutationObserver?.observe(root, { childList: true, subtree: true });

    return () => {
      observer?.disconnect();
      resizeObserver?.disconnect();
      mutationObserver?.disconnect();
      window.removeEventListener('scrollend', onScrollEnd);
      window.removeEventListener('resize', scheduleSetup);
      if (scrollContainer !== window) {
        scrollContainer.removeEventListener('scrollend', onScrollEnd);
      }
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [
    contentRef,
    lessonId,
    tryReleaseScrollIntent,
    updateActiveFromIntersection,
    viewportBottomOffset,
  ]);

  return {
    activeSectionId,
    completedSections,
    scrollToSection,
  };
}
