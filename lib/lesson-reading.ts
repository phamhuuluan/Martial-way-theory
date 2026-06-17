import { READ_THRESHOLD } from '@/lib/constants';

export interface LessonReadProgressSnapshot {
  ratio: number;
  display: number;
  complete: boolean;
}

export function progressFromViewedHeight(
  viewedContentHeight: number,
  totalContentHeight: number
): LessonReadProgressSnapshot {
  if (totalContentHeight <= 0) {
    return { ratio: 0, display: 0, complete: false };
  }

  const ratio = Math.min(1, Math.max(0, viewedContentHeight / totalContentHeight));
  const display = Math.min(100, Math.floor(ratio * 100));

  return {
    ratio,
    display,
    complete: ratio >= READ_THRESHOLD / 100,
  };
}

export function findScrollContainer(el: HTMLElement | null): HTMLElement | Window {
  if (!el || typeof window === 'undefined') return window;

  let node: HTMLElement | null = el.parentElement;
  while (node) {
    const style = window.getComputedStyle(node);
    const overflowY = style.overflowY;
    const scrollable =
      overflowY === 'auto' ||
      overflowY === 'scroll' ||
      overflowY === 'overlay';

    if (scrollable && node.scrollHeight > node.clientHeight + 1) {
      return node;
    }

    node = node.parentElement;
  }

  return window;
}

export function measureVisibleContentHeight(
  contentEl: HTMLElement,
  viewportBottomOffset = 0
): number {
  const viewportBottom = window.innerHeight - viewportBottomOffset;
  const rect = contentEl.getBoundingClientRect();

  return Math.min(
    contentEl.scrollHeight,
    Math.max(0, viewportBottom - rect.top)
  );
}

export function calculateLessonReadProgress(
  contentEl: HTMLElement | null,
  viewportBottomOffset = 0,
  baselineVisibleHeight?: number
): LessonReadProgressSnapshot {
  if (!contentEl || typeof window === 'undefined') {
    return { ratio: 0, display: 0, complete: false };
  }

  const totalContentHeight = contentEl.scrollHeight;
  if (totalContentHeight <= 0) {
    return { ratio: 0, display: 0, complete: false };
  }

  const visibleFromTop = measureVisibleContentHeight(
    contentEl,
    viewportBottomOffset
  );

  if (baselineVisibleHeight === undefined) {
    return { ratio: 0, display: 0, complete: false };
  }

  const totalReadDistance = totalContentHeight - baselineVisibleHeight;
  if (totalReadDistance <= 0) {
    return { ratio: 1, display: 100, complete: true };
  }

  const scrolledReadHeight = Math.min(
    totalReadDistance,
    Math.max(0, visibleFromTop - baselineVisibleHeight)
  );

  return progressFromViewedHeight(scrolledReadHeight, totalReadDistance);
}

export function isLessonReadingComplete(readProgress: number): boolean {
  return Math.floor(readProgress) >= READ_THRESHOLD;
}

export function mergeReadProgress(current: number, next: number): number {
  return Math.max(Math.floor(current), Math.floor(next));
}

/** Default scroll offset when measurement is unavailable (SSR/tests). */
export const DEFAULT_LESSON_SECTION_SCROLL_OFFSET = 88;

/** @deprecated Use measureLessonScrollOffset() — kept for tests importing the old name. */
export const LESSON_SECTION_SCROLL_OFFSET = DEFAULT_LESSON_SECTION_SCROLL_OFFSET;

const SECTION_ALIGNMENT_TOLERANCE_PX = 6;

export function measureLessonScrollOffset(
  contentRoot?: HTMLElement | null
): number {
  if (typeof window === 'undefined') {
    return DEFAULT_LESSON_SECTION_SCROLL_OFFSET;
  }

  const pageEl =
    contentRoot?.closest('.lesson-page') ??
    document.querySelector('.lesson-page');
  const styleSource = pageEl ?? document.documentElement;
  const rootStyle = window.getComputedStyle(styleSource);
  const cssBase = parseFloat(
    rootStyle.getPropertyValue('--lesson-scroll-offset-base')
  );
  const scrollMargin =
    Number.isFinite(cssBase) && cssBase > 0 ? cssBase : 80;

  const progressEl = document.querySelector('.lesson-reading-progress');
  const progressHeight = progressEl?.getBoundingClientRect().height ?? 2;

  return Math.ceil(progressHeight + scrollMargin + 8);
}

export function isSectionAlignedAtOffset(
  element: HTMLElement,
  offset: number,
  tolerance = SECTION_ALIGNMENT_TOLERANCE_PX
): boolean {
  return Math.abs(element.getBoundingClientRect().top - offset) <= tolerance;
}

export function buildSectionObserverRootMargin(
  topOffset: number,
  bottomOffset: number
): string {
  return `-${Math.max(0, topOffset)}px 0px -${Math.max(0, bottomOffset)}px 0px`;
}

export function scrollToElementWithOffset(
  el: HTMLElement,
  offset = DEFAULT_LESSON_SECTION_SCROLL_OFFSET
): void {
  const scrollContainer = findScrollContainer(el);

  if (scrollContainer === window) {
    const top =
      el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    return;
  }

  const container = scrollContainer as HTMLElement;
  const containerRect = container.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  const top =
    container.scrollTop + (elRect.top - containerRect.top) - offset;
  container.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}
