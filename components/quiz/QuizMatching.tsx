'use client';

import { useMemo, useState } from 'react';
import { GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppReducedMotion } from '@/hooks/use-app-reduced-motion';
import { useCoarsePointer } from '@/hooks/use-coarse-pointer';

interface QuizMatchingProps {
  leftItems: string[];
  rightItems: string[];
  selectedByLeft: number[];
  correctPairs?: [number, number][];
  feedback?: boolean;
  disabled: boolean;
  onSelect: (leftIndex: number, rightIndex: number) => void;
}

type InteractionMode = 'drag' | 'tap' | 'dropdown';

export function QuizMatching({
  leftItems,
  rightItems,
  selectedByLeft,
  correctPairs = [],
  feedback = false,
  disabled,
  onSelect,
}: QuizMatchingProps) {
  const reduced = useAppReducedMotion();
  const isCoarse = useCoarsePointer();
  const [preferDropdown, setPreferDropdown] = useState(false);
  const [activeLeft, setActiveLeft] = useState<number | null>(null);
  const [activeRight, setActiveRight] = useState<number | null>(null);
  const [draggedRight, setDraggedRight] = useState<number | null>(null);

  const mode: InteractionMode = preferDropdown || reduced
    ? 'dropdown'
    : isCoarse
      ? 'tap'
      : 'drag';

  const assignedRightIndices = useMemo(
    () => new Set(selectedByLeft.filter((value) => value >= 0)),
    [selectedByLeft]
  );

  const availableRightIndices = useMemo(
    () => rightItems.map((_, index) => index).filter((index) => !assignedRightIndices.has(index)),
    [assignedRightIndices, rightItems]
  );

  const clearSelection = () => {
    setActiveLeft(null);
    setActiveRight(null);
    setDraggedRight(null);
  };

  const assignRightToLeft = (leftIndex: number, rightIndex: number) => {
    if (disabled || feedback) return;
    onSelect(leftIndex, rightIndex);
    clearSelection();
  };

  const handleDragStart = (event: React.DragEvent<HTMLElement>, rightIndex: number) => {
    if (disabled || feedback || mode !== 'drag') return;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', String(rightIndex));
    setDraggedRight(rightIndex);
  };

  const handleDropOnLeft = (leftIndex: number) => {
    if (draggedRight === null) return;
    assignRightToLeft(leftIndex, draggedRight);
  };

  const handleTapLeft = (leftIndex: number) => {
    if (disabled || feedback || mode !== 'tap') return;

    if (activeRight !== null) {
      assignRightToLeft(leftIndex, activeRight);
      return;
    }

    setActiveLeft((prev) => (prev === leftIndex ? null : leftIndex));
    setActiveRight(null);
  };

  const handleTapRight = (rightIndex: number) => {
    if (disabled || feedback || mode !== 'tap') return;

    if (activeLeft !== null) {
      assignRightToLeft(activeLeft, rightIndex);
      return;
    }

    setActiveRight((prev) => (prev === rightIndex ? null : rightIndex));
    setActiveLeft(null);
  };

  const clearLeft = (leftIndex: number) => {
    if (disabled || feedback) return;
    onSelect(leftIndex, -1);
    if (activeLeft === leftIndex) setActiveLeft(null);
  };

  const instructionText =
    mode === 'drag'
      ? 'Kéo đáp án phù hợp vào từng mục bên trên.'
      : mode === 'tap'
        ? 'Chạm một mục bên trái, rồi chạm đáp án phù hợp bên dưới.'
        : 'Chọn đáp án phù hợp cho từng mục.';

  const conceptGridClass = 'grid grid-cols-2 gap-3';

  const answerGridClass = cn(
    'grid gap-3',
    mode === 'drag' ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-2'
  );

  const answerCardClass = (isActive: boolean, isDragging: boolean) =>
    cn(
      'w-full rounded-[var(--radius-md)] border px-3 py-3 text-left text-sm leading-relaxed min-h-[72px] shadow-subtle transition-colors',
      mode === 'tap' && 'touch-manipulation',
      mode === 'drag' && !disabled && !feedback && 'cursor-grab active:cursor-grabbing',
      isActive || isDragging
        ? 'border-unlock bg-unlock/10 text-text-primary'
        : 'border-border bg-bg-secondary hover:border-unlock/50 active:bg-unlock/5',
      (disabled || feedback) && 'cursor-default opacity-60'
    );

  const renderLeftRow = (left: string, leftIndex: number) => {
    const selectedRight = selectedByLeft[leftIndex];
    const selectedLabel =
      selectedRight >= 0 ? rightItems[selectedRight] : null;
    const expectedRight = correctPairs.find(([leftIdx]) => leftIdx === leftIndex)?.[1];
    const isCorrect = feedback && selectedRight === expectedRight;
    const isIncorrect =
      feedback && selectedRight >= 0 && selectedRight !== expectedRight;
    const isDropTarget = !feedback && mode === 'drag' && draggedRight !== null;
    const isTapTarget = !feedback && mode === 'tap' && activeLeft === leftIndex;
    const canAcceptTap =
      !feedback && mode === 'tap' && activeRight !== null && selectedRight < 0;

    return (
      <div
        key={leftIndex}
        onDragOver={(event) => {
          if (mode === 'drag' && draggedRight !== null) event.preventDefault();
        }}
        onDrop={(event) => {
          event.preventDefault();
          handleDropOnLeft(leftIndex);
        }}
        onClick={() => handleTapLeft(leftIndex)}
        className={cn(
          'rounded-[var(--radius-md)] border p-3 shadow-subtle transition-colors touch-manipulation min-h-[168px]',
          isCorrect && 'border-success bg-success/5',
          isIncorrect && 'border-error bg-error/5',
          isDropTarget && 'border-unlock/50 bg-unlock/5',
          (isTapTarget || canAcceptTap) && 'border-unlock bg-unlock/10',
          !feedback && !isTapTarget && !isDropTarget && !canAcceptTap && 'border-border bg-bg-secondary'
        )}
      >
        <p className="mb-3 text-sm font-medium leading-relaxed line-clamp-4 lg:line-clamp-none">
          {left}
        </p>

        {mode === 'dropdown' ? (
          <select
            value={selectedRight >= 0 ? String(selectedRight) : ''}
            disabled={disabled}
            onClick={(event) => event.stopPropagation()}
            onChange={(event) =>
              assignRightToLeft(leftIndex, Number.parseInt(event.target.value, 10))
            }
            className={cn(
              'w-full rounded-[var(--radius-md)] border bg-bg-primary px-3 py-3 text-base min-h-[44px]',
              isCorrect && 'border-success',
              isIncorrect && 'border-error',
              !feedback && 'border-border'
            )}
          >
            <option value="">Chọn đáp án phù hợp</option>
            {rightItems.map((right, rightIndex) => (
              <option key={rightIndex} value={rightIndex}>
                {right}
              </option>
            ))}
          </select>
        ) : (
          <div
            className={cn(
              'min-h-[72px] rounded-[var(--radius-md)] border border-dashed px-3 py-3 text-sm',
              selectedLabel
                ? 'border-border bg-bg-primary'
                : 'border-border/70 bg-bg-primary/50 text-text-muted'
            )}
          >
            {selectedLabel ? (
              <div className="flex w-full items-start justify-between gap-2">
                <span className="leading-relaxed break-words line-clamp-3 lg:line-clamp-none">
                  {selectedLabel}
                </span>
                {!disabled && !feedback && (
                  <button
                    type="button"
                    aria-label={`Xóa ghép nối mục ${leftIndex + 1}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      clearLeft(leftIndex);
                    }}
                    className="flex h-8 min-w-[44px] shrink-0 items-center justify-center px-2 text-xs text-text-muted hover:text-error"
                  >
                    Xóa
                  </button>
                )}
              </div>
            ) : mode === 'tap' ? (
              'Chạm để ghép'
            ) : (
              'Kéo đáp án vào đây'
            )}
          </div>
        )}
      </div>
    );
  };

  const renderAnswerItem = (rightIndex: number) => {
    const isActive = mode === 'tap' && activeRight === rightIndex;
    const isDragging = mode === 'drag' && draggedRight === rightIndex;
    const text = rightItems[rightIndex];

    if (mode === 'tap') {
      return (
        <button
          key={rightIndex}
          type="button"
          disabled={disabled || feedback}
          onClick={() => handleTapRight(rightIndex)}
          className={answerCardClass(isActive, false)}
        >
          <span className="line-clamp-4 lg:line-clamp-none">{text}</span>
        </button>
      );
    }

    return (
      <div
        key={rightIndex}
        draggable={!disabled && !feedback}
        onDragStart={(event) => handleDragStart(event, rightIndex)}
        onDragEnd={() => setDraggedRight(null)}
        className={cn(answerCardClass(false, isDragging), 'flex items-start gap-2')}
      >
        <GripVertical className="mt-0.5 h-4 w-4 shrink-0 text-text-muted" />
        <span className="min-w-0 flex-1 leading-relaxed break-words line-clamp-4 lg:line-clamp-none">
          {text}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {!feedback && (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-text-muted">{instructionText}</p>
          {mode !== 'dropdown' && (
            <button
              type="button"
              onClick={() => {
                clearSelection();
                setPreferDropdown(true);
              }}
              className="shrink-0 self-start text-xs text-unlock hover:underline touch-manipulation min-h-[44px] sm:min-h-0"
            >
              Dùng danh sách chọn
            </button>
          )}
          {mode === 'dropdown' && !reduced && !isCoarse && (
            <button
              type="button"
              onClick={() => {
                clearSelection();
                setPreferDropdown(false);
              }}
              className="shrink-0 self-start text-xs text-unlock hover:underline touch-manipulation min-h-[44px] sm:min-h-0"
            >
              {isCoarse ? 'Dùng chạm để ghép' : 'Dùng kéo thả'}
            </button>
          )}
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
            Khái niệm
          </p>
          <div className={conceptGridClass}>
            {leftItems.map((left, leftIndex) => renderLeftRow(left, leftIndex))}
          </div>
        </div>

        {mode !== 'dropdown' && (
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
              Đáp án
            </p>
            <div className={answerGridClass}>
              {availableRightIndices.map((rightIndex) => renderAnswerItem(rightIndex))}
              {availableRightIndices.length === 0 && !feedback && (
                <p className="col-span-full text-sm text-text-muted">Đã ghép hết đáp án.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {mode === 'tap' && !feedback && (activeLeft !== null || activeRight !== null) && (
        <p className="text-sm text-unlock">
          {activeLeft !== null
            ? `Đã chọn mục ${activeLeft + 1} — chạm đáp án phù hợp bên dưới.`
            : 'Đã chọn đáp án — chạm mục bên trái để ghép.'}
        </p>
      )}
    </div>
  );
}
