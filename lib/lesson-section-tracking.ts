import { DEFAULT_LESSON_SECTION_SCROLL_OFFSET } from '@/lib/lesson-reading';

/** @deprecated Use DEFAULT_LESSON_SECTION_SCROLL_OFFSET */
export const LESSON_SECTION_SCROLL_OFFSET = DEFAULT_LESSON_SECTION_SCROLL_OFFSET;

export interface TrackedSection {
  id: string;
  top: number;
  bottom: number;
}

export interface SectionHeadingElement {
  id: string;
  element: HTMLElement;
}

export function normalizeSectionTitle(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

export function collectSectionHeadings(root: HTMLElement): SectionHeadingElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>('[data-section-id]'))
    .map((element) => {
      const id = element.dataset.sectionId ?? element.id;
      return id ? { id, element } : null;
    })
    .filter((section): section is SectionHeadingElement => section !== null);
}

export function getSectionRects(
  headings: SectionHeadingElement[],
  contentRoot: HTMLElement
): TrackedSection[] {
  if (headings.length === 0) return [];

  const contentBottom = contentRoot.getBoundingClientRect().bottom;

  return headings.map((heading, index) => {
    const top = heading.element.getBoundingClientRect().top;
    const bottom =
      index < headings.length - 1
        ? headings[index + 1].element.getBoundingClientRect().top
        : contentBottom;

    return { id: heading.id, top, bottom };
  });
}

export function visibleSectionRatio(
  section: TrackedSection,
  viewportTop: number,
  viewportBottom: number
): number {
  const visibleTop = Math.max(section.top, viewportTop);
  const visibleBottom = Math.min(section.bottom, viewportBottom);
  const visibleHeight = Math.max(0, visibleBottom - visibleTop);
  const sectionHeight = Math.max(1, section.bottom - section.top);
  return visibleHeight / sectionHeight;
}

export interface SectionIntersectionSample {
  id: string;
  ratio: number;
  top: number;
}

export function pickActiveSectionFromIntersectionSamples(
  samples: SectionIntersectionSample[],
  fallbackFirstId: string | null,
  viewportBottom: number
): string | null {
  if (samples.length === 0) return fallbackFirstId;

  const intersecting = samples.filter((sample) => sample.ratio > 0);

  if (intersecting.length > 0) {
    return intersecting.reduce((best, current) => {
      if (current.ratio > best.ratio) return current;
      if (current.ratio === best.ratio && current.top < best.top) {
        return current;
      }
      return best;
    }).id;
  }

  const sorted = [...samples].sort((a, b) => a.top - b.top);
  for (let index = sorted.length - 1; index >= 0; index -= 1) {
    if (sorted[index].top <= viewportBottom) {
      return sorted[index].id;
    }
  }

  return fallbackFirstId ?? sorted[0]?.id ?? null;
}

export function measureActiveSectionId(
  sections: TrackedSection[],
  headerOffset = DEFAULT_LESSON_SECTION_SCROLL_OFFSET,
  viewportHeight?: number,
  viewportBottomOffset = 0
): string | null {
  if (sections.length === 0) return null;

  const viewportTop = headerOffset;
  const viewportBottom =
    (viewportHeight ?? (typeof window !== 'undefined' ? window.innerHeight : 800)) -
    viewportBottomOffset;

  let bestId = sections[0].id;
  let bestRatio = 0;
  let bestTop = Infinity;

  for (const section of sections) {
    const ratio = visibleSectionRatio(section, viewportTop, viewportBottom);

    if (
      ratio > bestRatio ||
      (ratio > 0 && ratio === bestRatio && section.top < bestTop)
    ) {
      bestRatio = ratio;
      bestId = section.id;
      bestTop = section.top;
    }
  }

  if (bestRatio > 0) return bestId;

  const last = sections[sections.length - 1];
  if (last.top < viewportBottom) return last.id;

  return sections[0].id;
}

export function measureNewlyCompletedSectionIds(
  sections: TrackedSection[],
  activeSectionId: string | null,
  alreadyCompleted: ReadonlySet<string>,
  headerOffset = DEFAULT_LESSON_SECTION_SCROLL_OFFSET
): string[] {
  const newlyCompleted: string[] = [];

  if (activeSectionId) {
    const activeIndex = sections.findIndex((section) => section.id === activeSectionId);
    if (activeIndex > 0) {
      for (let i = 0; i < activeIndex; i++) {
        const id = sections[i].id;
        if (!alreadyCompleted.has(id) && !newlyCompleted.includes(id)) {
          newlyCompleted.push(id);
        }
      }
    }
  }

  for (const section of sections) {
    if (alreadyCompleted.has(section.id) || newlyCompleted.includes(section.id)) {
      continue;
    }

    if (section.bottom <= headerOffset + 16) {
      newlyCompleted.push(section.id);
    }
  }

  return newlyCompleted;
}

export interface SectionTrackingSnapshot {
  activeSectionId: string | null;
  newlyCompleted: string[];
}

export function measureSectionTracking(
  root: HTMLElement | null,
  alreadyCompleted: ReadonlySet<string>,
  headerOffset = DEFAULT_LESSON_SECTION_SCROLL_OFFSET,
  viewportHeight?: number,
  viewportBottomOffset = 0
): SectionTrackingSnapshot {
  if (!root) {
    return { activeSectionId: null, newlyCompleted: [] };
  }

  const headings = collectSectionHeadings(root);
  const sections = getSectionRects(headings, root);
  const activeSectionId = measureActiveSectionId(
    sections,
    headerOffset,
    viewportHeight,
    viewportBottomOffset
  );
  const newlyCompleted = measureNewlyCompletedSectionIds(
    sections,
    activeSectionId,
    alreadyCompleted,
    headerOffset
  );

  return { activeSectionId, newlyCompleted };
}
