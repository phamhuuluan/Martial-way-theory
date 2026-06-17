'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizOrderingProps {
  items: string[];
  order: number[];
  correctOrder?: number[];
  feedback?: boolean;
  disabled: boolean;
  onMove: (index: number, direction: -1 | 1) => void;
}

export function QuizOrdering({
  items,
  order,
  correctOrder = [],
  feedback = false,
  disabled,
  onMove,
}: QuizOrderingProps) {
  return (
    <div className="space-y-3">
      {order.map((itemIndex, position) => {
        const isCorrect = feedback && correctOrder[position] === itemIndex;
        const isIncorrect = feedback && !isCorrect;

        return (
          <div
            key={`${itemIndex}-${position}`}
            className={cn(
              'flex items-start gap-3 rounded-[var(--radius-md)] border p-4',
              isCorrect && 'border-success bg-success/5',
              isIncorrect && 'border-error bg-error/5',
              !feedback && 'border-border bg-bg-secondary'
            )}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bg-elevated text-sm font-bold text-text-secondary">
              {position + 1}
            </span>
            <p className="flex-1 pt-1 text-sm leading-relaxed">{items[itemIndex]}</p>
            {!disabled && !feedback && (
              <div className="flex shrink-0 flex-col gap-1">
                <button
                  type="button"
                  aria-label="Di chuyển lên"
                  disabled={position === 0}
                  onClick={() => onMove(position, -1)}
                  className="rounded border border-border p-1 disabled:opacity-30"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Di chuyển xuống"
                  disabled={position === order.length - 1}
                  onClick={() => onMove(position, 1)}
                  className="rounded border border-border p-1 disabled:opacity-30"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
