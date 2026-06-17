'use client';

import { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizFillBlankProps {
  wordBank: string[];
  blankCount: number;
  selectedByBlank: number[];
  feedback?: boolean;
  correctBlanks?: string[];
  disabled: boolean;
  onSelect: (blankIndex: number, optionIndex: number) => void;
  onRemove: (blankIndex: number) => void;
}

export function QuizFillBlank({
  wordBank,
  blankCount,
  selectedByBlank,
  feedback = false,
  correctBlanks = [],
  disabled,
  onSelect,
  onRemove,
}: QuizFillBlankProps) {
  const [focusedBlank, setFocusedBlank] = useState<number | null>(null);

  useEffect(() => {
    setFocusedBlank(null);
  }, [blankCount]);

  const activeBlank = useMemo(() => {
    if (
      focusedBlank !== null &&
      focusedBlank < blankCount &&
      selectedByBlank[focusedBlank] < 0
    ) {
      return focusedBlank;
    }

    const firstEmpty = selectedByBlank.findIndex((value) => value < 0);
    return firstEmpty >= 0 ? firstEmpty : blankCount - 1;
  }, [blankCount, focusedBlank, selectedByBlank]);

  const handleSelect = (optionIndex: number) => {
    onSelect(activeBlank, optionIndex);
    if (focusedBlank === activeBlank) {
      setFocusedBlank(null);
    }
  };

  const handleRemove = (blankIndex: number) => {
    if (disabled || feedback) return;
    setFocusedBlank(blankIndex);
    onRemove(blankIndex);
  };

  const handleFocusBlank = (blankIndex: number) => {
    if (disabled || feedback || selectedByBlank[blankIndex] >= 0) return;
    setFocusedBlank(blankIndex);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: blankCount }).map((_, blankIndex) => {
          const selectedIndex = selectedByBlank[blankIndex];
          const selectedWord =
            selectedIndex >= 0 ? wordBank[selectedIndex] : null;
          const isCorrect =
            feedback &&
            selectedWord &&
            correctBlanks[blankIndex] &&
            selectedWord.trim().toLowerCase() ===
              correctBlanks[blankIndex].trim().toLowerCase();
          const isIncorrect = feedback && selectedWord && !isCorrect;
          const isActive = !feedback && blankIndex === activeBlank;

          return (
            <div
              key={blankIndex}
              className={cn(
                'flex min-w-[120px] items-center justify-between gap-2 rounded-[var(--radius-md)] border px-3 py-2 text-sm transition-colors',
                !feedback && isActive && 'border-unlock bg-unlock/10',
                !feedback && !isActive && 'border-border bg-bg-secondary',
                isCorrect && 'border-success bg-success/10',
                isIncorrect && 'border-error bg-error/10',
                feedback && !isCorrect && !isIncorrect && 'border-border bg-bg-secondary'
              )}
            >
              {selectedWord ? (
                <>
                  <span className="flex-1 py-1 leading-snug">{selectedWord}</span>
                  {!disabled && !feedback && (
                    <button
                      type="button"
                      aria-label={`Xóa đáp án ở chỗ trống ${blankIndex + 1}`}
                      onClick={() => handleRemove(blankIndex)}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-bg-elevated hover:text-text-primary"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </>
              ) : (
                <button
                  type="button"
                  disabled={disabled || feedback}
                  onClick={() => handleFocusBlank(blankIndex)}
                  className="w-full py-1 text-left text-text-muted"
                >
                  {`Chỗ trống ${blankIndex + 1}`}
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div>
        <p className="mb-2 text-sm text-text-muted">Chọn từ trong ngân hàng từ:</p>
        <div className="flex flex-wrap gap-2">
          {wordBank.map((word, optionIndex) => {
            const usedAt = selectedByBlank.indexOf(optionIndex);
            const isUsed = usedAt >= 0;
            const isCorrectUsage =
              feedback &&
              isUsed &&
              correctBlanks[usedAt] &&
              word.trim().toLowerCase() ===
                correctBlanks[usedAt].trim().toLowerCase();

            return (
              <button
                key={optionIndex}
                type="button"
                disabled={disabled || (isUsed && !feedback)}
                onClick={() => handleSelect(optionIndex)}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm transition-colors min-h-[44px]',
                  isCorrectUsage && 'border-success bg-success/10',
                  feedback && isUsed && !isCorrectUsage && 'border-error bg-error/10',
                  !feedback && isUsed && 'border-border bg-bg-elevated text-text-muted',
                  !feedback && !isUsed && 'border-border bg-bg-secondary hover:border-unlock/50'
                )}
              >
                {word}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
