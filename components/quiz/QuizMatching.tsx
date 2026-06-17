'use client';

import { cn } from '@/lib/utils';

interface QuizMatchingProps {
  leftItems: string[];
  rightItems: string[];
  selectedByLeft: number[];
  correctPairs?: [number, number][];
  feedback?: boolean;
  disabled: boolean;
  onSelect: (leftIndex: number, rightIndex: number) => void;
}

export function QuizMatching({
  leftItems,
  rightItems,
  selectedByLeft,
  correctPairs = [],
  feedback = false,
  disabled,
  onSelect,
}: QuizMatchingProps) {
  return (
    <div className="space-y-3">
      {leftItems.map((left, leftIndex) => {
        const selectedRight = selectedByLeft[leftIndex];
        const expectedRight = correctPairs.find(([leftIdx]) => leftIdx === leftIndex)?.[1];
        const isCorrect = feedback && selectedRight === expectedRight;
        const isIncorrect =
          feedback && selectedRight >= 0 && selectedRight !== expectedRight;

        return (
          <div
            key={leftIndex}
            className={cn(
              'rounded-[var(--radius-md)] border p-4',
              isCorrect && 'border-success bg-success/5',
              isIncorrect && 'border-error bg-error/5',
              !feedback && 'border-border bg-bg-secondary'
            )}
          >
            <p className="mb-3 text-sm font-medium leading-relaxed">{left}</p>
            <select
              value={selectedRight >= 0 ? String(selectedRight) : ''}
              disabled={disabled}
              onChange={(event) =>
                onSelect(leftIndex, Number.parseInt(event.target.value, 10))
              }
              className={cn(
                'w-full rounded-[var(--radius-md)] border bg-bg-primary px-3 py-3 text-sm min-h-[44px]',
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
          </div>
        );
      })}
    </div>
  );
}
