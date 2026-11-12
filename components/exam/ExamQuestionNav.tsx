'use client';

import { Button } from '@/components/ui/Button';

export function ExamQuestionNav({
  index,
  total,
  onIndex,
}: {
  index: number;
  total: number;
  onIndex: (next: number) => void;
}) {
  return (
    <div className="flex gap-3">
      <Button
        variant="secondary"
        className="flex-1"
        disabled={index === 0}
        onClick={() => onIndex(Math.max(0, index - 1))}
      >
        Câu trước
      </Button>
      <Button
        variant="secondary"
        className="flex-1"
        disabled={index >= total - 1}
        onClick={() => onIndex(Math.min(total - 1, index + 1))}
      >
        Câu sau
      </Button>
    </div>
  );
}
