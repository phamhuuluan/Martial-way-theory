'use client';

import { Check, Copy } from 'lucide-react';
import { useLessonCopy } from '@/components/lesson/LessonCopyContext';
import { cn } from '@/lib/utils';

interface QuestionCopyButtonProps {
  sectionId: string;
}

export function QuestionCopyButton({ sectionId }: QuestionCopyButtonProps) {
  const { copyQuestion, copiedSectionId } = useLessonCopy();
  const isCopied = copiedSectionId === sectionId;

  return (
    <button
      type="button"
      className={cn(
        'lesson-question__copy',
        isCopied && 'lesson-question__copy--copied'
      )}
      onClick={() => copyQuestion(sectionId)}
      aria-label={isCopied ? 'Copied question' : 'Copy question'}
    >
      {isCopied ? (
        <Check className="lesson-question__copy-icon" aria-hidden />
      ) : (
        <Copy className="lesson-question__copy-icon" aria-hidden />
      )}
    </button>
  );
}
