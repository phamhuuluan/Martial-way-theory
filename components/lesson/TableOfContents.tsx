'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { List, X } from 'lucide-react';
import { ProgressBar } from '@/components/ui/Progress';
import type { LessonSection } from '@/lib/lesson-sections';
import { parseQuestionHeading, formatQuestionHeadingLine } from '@/lib/lesson-sections';
import { useIsLgUp } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';

interface TableOfContentsProps {
  sections: LessonSection[];
  activeSectionId: string | null;
  completedSections: string[];
  onSectionClick: (sectionId: string) => void;
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
  beltAccent: string;
  readProgress: number;
}

interface TocListProps {
  sections: LessonSection[];
  activeSectionId: string | null;
  completedSections: string[];
  onSectionClick: (sectionId: string) => void;
  beltAccent: string;
  readProgress: number;
  onNavigate?: () => void;
  listClassName?: string;
}

function TocList({
  sections,
  activeSectionId,
  completedSections,
  onSectionClick,
  beltAccent,
  readProgress,
  onNavigate,
  listClassName,
}: TocListProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const activeItemRef = useRef<HTMLLIElement>(null);
  const completedSet = new Set(completedSections);
  const completedCount = completedSections.length;
  const activeIndex = sections.findIndex((s) => s.id === activeSectionId);

  useEffect(() => {
    const activeEl = activeItemRef.current;
    const listEl = listRef.current;
    if (!activeSectionId || !activeEl || !listEl) return;

    const listRect = listEl.getBoundingClientRect();
    const itemRect = activeEl.getBoundingClientRect();

    if (itemRect.top < listRect.top || itemRect.bottom > listRect.bottom) {
      activeEl.scrollIntoView({ block: 'nearest', behavior: 'auto' });
    }
  }, [activeSectionId]);

  return (
    <nav aria-label="Mục lục bài học" className="lesson-toc-panel">
      <header className="lesson-toc-panel__header">
        <div className="lesson-toc-panel__heading">
          <p className="page-section-label">Mục lục</p>
          <span className="lesson-toc-panel__count tabular-nums">
            {completedCount}/{sections.length}
          </span>
        </div>
        <ProgressBar
          value={readProgress}
          color={beltAccent}
          size="md"
          className="lesson-toc-panel__progress"
        />
        <p className="lesson-toc-panel__meta tabular-nums">
          {readProgress}% đã đọc
          {activeIndex >= 0 && (
            <>
              {' · '}
              <span className="text-text-secondary">
                {(() => {
                  const active = sections[activeIndex];
                  const parsedActive = active
                    ? parseQuestionHeading(active.title)
                    : null;
                  const num = parsedActive?.number ?? activeIndex + 1;
                  return `Câu ${num}/${sections.length}`;
                })()}
              </span>
            </>
          )}
        </p>
      </header>

      <ol ref={listRef} className={cn('lesson-toc-panel__list', listClassName)}>
        {sections.map((section, index) => {
          const isActive = activeSectionId === section.id;
          const isComplete = completedSet.has(section.id);
          const parsed = parseQuestionHeading(section.title);
          const line = parsed.isQuestion
            ? formatQuestionHeadingLine(parsed.label, parsed.prompt)
            : section.title;
          const displayText =
            parsed.isQuestion && parsed.prompt ? parsed.prompt : line;

          return (
            <li
              key={section.id}
              ref={isActive ? activeItemRef : undefined}
              className="lesson-toc-panel__item"
            >
              <button
                type="button"
                title={section.title}
                onClick={() => {
                  onSectionClick(section.id);
                  onNavigate?.();
                }}
                className={cn(
                  'lesson-toc-item',
                  isActive && 'lesson-toc-item--active',
                  isComplete && 'lesson-toc-item--complete',
                  !isActive && !isComplete && 'lesson-toc-item--idle'
                )}
                style={
                  isActive
                    ? ({
                        '--toc-accent': beltAccent,
                      } as React.CSSProperties)
                    : undefined
                }
                aria-current={isActive ? 'location' : undefined}
              >
                <span className="lesson-toc-item__indicator" aria-hidden />
                <span className="lesson-toc-item__body">
                  <span className="lesson-toc-item__index tabular-nums">
                    {parsed.isQuestion ? parsed.label : `${index + 1}.`}
                  </span>
                  <span className="lesson-toc-item__text">{displayText}</span>
                </span>
                {isComplete && (
                  <span className="lesson-toc-item__check" aria-label="Đã đọc">
                    ✓
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function TocPanelShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('lesson-toc-shell', className)}>{children}</div>;
}

export function TableOfContents({
  sections,
  activeSectionId,
  completedSections,
  onSectionClick,
  mobileOpen,
  onMobileOpenChange,
  beltAccent,
  readProgress,
}: TableOfContentsProps) {
  const isDesktop = useIsLgUp();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onMobileOpenChange(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen, onMobileOpenChange]);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const tocListProps: TocListProps = {
    sections,
    activeSectionId,
    completedSections,
    onSectionClick,
    beltAccent,
    readProgress,
  };

  if (sections.length === 0) return null;

  if (isDesktop) {
    return (
      <aside className="lesson-toc fixed right-0 top-[4.25rem] z-[var(--z-overlay,30)] w-[15.5rem] px-3 xl:w-[17rem] xl:px-4">
        <TocPanelShell>
          <TocList {...tocListProps} />
        </TocPanelShell>
      </aside>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => onMobileOpenChange(true)}
        className="lesson-toc-fab fixed bottom-20 right-3 z-[var(--z-overlay,30)]"
        aria-label="Mở mục lục"
      >
        <List className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.2 }}
              className="fixed inset-0 z-[var(--z-overlay,30)] bg-black/50"
              aria-label="Đóng mục lục"
              onClick={() => onMobileOpenChange(false)}
            />
            <motion.div
              initial={reduced ? false : { y: '100%' }}
              animate={{ y: 0 }}
              exit={reduced ? undefined : { y: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed inset-x-0 bottom-0 z-[calc(var(--z-overlay,30)+1)] flex max-h-[72vh] flex-col rounded-t-[var(--radius-lg)] border border-border/60 bg-bg-secondary p-4 pb-6 shadow-elevated"
              role="dialog"
              aria-modal="true"
              aria-label="Mục lục bài học"
            >
              <div className="mb-3 flex shrink-0 items-center justify-between">
                <span className="page-section-label">Mục lục bài học</span>
                <button
                  type="button"
                  onClick={() => onMobileOpenChange(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] text-text-muted transition-colors hover:bg-bg-elevated/70 hover:text-text-secondary"
                  aria-label="Đóng"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <TocPanelShell className="min-h-0 flex-1 overflow-hidden">
                <TocList
                  {...tocListProps}
                  onNavigate={() => onMobileOpenChange(false)}
                  listClassName="max-h-[calc(72vh-7rem)]"
                />
              </TocPanelShell>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
