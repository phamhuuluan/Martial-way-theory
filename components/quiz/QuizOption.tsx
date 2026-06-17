'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizOptionProps {
  label: string;
  index: number;
  multiple?: boolean;
  selected: boolean;
  state: 'default' | 'correct' | 'incorrect' | 'reveal-correct' | 'missed-key';
  disabled: boolean;
  onSelect: () => void;
}

const LETTERS = ['A', 'B', 'C', 'D'];

export function QuizOption({
  label,
  index,
  multiple = false,
  selected,
  state,
  disabled,
  onSelect,
}: QuizOptionProps) {
  const reduced = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={cn(
        'flex w-full items-start gap-3 rounded-[var(--radius-md)] border p-4 text-left transition-colors min-h-[44px]',
        state === 'default' && 'border-border bg-bg-secondary hover:border-unlock/50',
        state === 'correct' && 'border-success bg-success/10',
        state === 'incorrect' && 'border-error bg-error/10',
        state === 'reveal-correct' && 'border-success/50 bg-success/5',
        state === 'missed-key' && 'border-unlock/60 bg-unlock/10',
        disabled && 'cursor-default'
      )}
      animate={
        state === 'incorrect' && !reduced
          ? { x: [0, -4, 4, -4, 4, 0] }
          : {}
      }
      transition={{ duration: 0.3 }}
      whileTap={!disabled && !reduced ? { scale: 0.98 } : undefined}
    >
      <span
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold',
          multiple && 'rounded-[var(--radius-sm)]',
          state === 'correct' || state === 'reveal-correct'
            ? 'bg-success text-white'
            : state === 'missed-key'
              ? 'bg-unlock text-white'
            : state === 'incorrect'
              ? 'bg-error text-white'
              : selected
                ? 'bg-unlock/20 text-unlock'
                : 'bg-bg-elevated text-text-secondary'
        )}
      >
        {state === 'correct' || state === 'reveal-correct' ? (
          <Check className="h-4 w-4" />
        ) : state === 'missed-key' ? (
          <span className="text-xs font-bold">!</span>
        ) : state === 'incorrect' && selected ? (
          <X className="h-4 w-4" />
        ) : multiple ? (
          selected ? '✓' : ''
        ) : (
          LETTERS[index]
        )}
      </span>
      <span className="flex-1 pt-1 text-base leading-relaxed">{label}</span>
    </motion.button>
  );
}
