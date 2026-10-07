'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

import { ExamLoadingOverlay } from '@/components/exam/ExamLoadingOverlay';
import { ExamQuestion } from '@/components/exam/ExamQuestion';
import { useExamSession } from '@/hooks/use-exam-session';
import { isExamAnswerProvided } from '@/lib/exam-paper';
import {
  isFillQuestion,
  isMatchingQuestion,
  isMultipleChoice,
  isOrderingQuestion,
  isDefinitionQuestion,
  formatCorrectAnswer,
  evaluateQuestion,
  type QuizAnswer,
} from '@/lib/quiz-engine';
import type { BeltId } from '@/types';
import type { ExamBankQuestion } from '@/types/exam';
import { cn } from '@/lib/utils';

interface PracticeSessionProps {
  rankId: string;
  fullName: string;
  beltId: BeltId;
  questions: ExamBankQuestion[];
}

export function PracticeSession({
  rankId,
  fullName,
  beltId,
  questions,
}: PracticeSessionProps) {
  const {
    draft,
    ready,
    index,
    setIndex,
    submitError,
    isSubmitting,
    submitDraft,
    updateAnswer,
  } = useExamSession({
    mode: 'practice',
    rankId,
    beltId,
    questions,
  });


  const [confirmedAnswers, setConfirmedAnswers] = useState<Record<string, boolean>>({});
  const [confirmingFinish, setConfirmingFinish] = useState(false);

  useEffect(() => {
    if (draft && Object.keys(confirmedAnswers).length === 0) {
      const initial: Record<string, boolean> = {};
      for (const q of draft.questions) {
        if (isExamAnswerProvided(q, draft.answers[q.id])) {
          initial[q.id] = true;
        }
      }
      setConfirmedAnswers(initial);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  if (!ready || !draft || isSubmitting) {
    return (
      <ExamLoadingOverlay message={isSubmitting ? 'Đang gửi kết quả…' : 'Đang mở đề…'} />
    );
  }

  const current = draft.questions[index];

  const isMultiple = isMultipleChoice(current);
  const usesConfirmButton =
    isMultiple ||
    isFillQuestion(current) ||
    isMatchingQuestion(current) ||
    isOrderingQuestion(current) ||
    isDefinitionQuestion(current);

  const isConfirmed = confirmedAnswers[current.id];
  const hasAnswer = isExamAnswerProvided(current, draft.answers[current.id]);
  const canConfirm = hasAnswer && !isConfirmed;

  const handleAnswerChange = (answer: QuizAnswer) => {
    if (isConfirmed) return;
    updateAnswer(answer);
    if (!usesConfirmButton) {
      setConfirmedAnswers((prev) => ({ ...prev, [answer.questionId]: true }));
    }
  };

  const handleConfirmAction = () => {
    if (!hasAnswer) return;
    setConfirmedAnswers((prev) => ({ ...prev, [current.id]: true }));
  };

  const evaluation = isConfirmed ? evaluateQuestion(current, draft.answers[current.id]) : null;

  return (
    <div className="profile-page relative min-h-screen px-4 py-6 lg:px-10">
      <div className="mx-auto max-w-lg">
        <div className="sticky top-0 z-10 -mx-4 mb-6 border-b border-border/70 bg-bg-primary/95 px-4 py-3 backdrop-blur-md">
          <p className="min-w-0 truncate text-sm font-medium">{fullName}</p>
        </div>

        <h2 className="mb-6 whitespace-pre-line font-display text-xl font-semibold leading-relaxed">
          {current.question}
        </h2>
        
        <ExamQuestion
          question={current}
          answer={draft.answers[current.id]}
          revealed={isConfirmed}
          disabled={isConfirmed}
          onChange={handleAnswerChange}
        />

        {isConfirmed && evaluation && (
          <div className={cn(
            "mt-6 rounded-[var(--radius-md)] border p-4 text-sm",
            evaluation.level === 'correct' ? "border-success/30 bg-success/5" :
            evaluation.level === 'partial' ? "border-unlock/30 bg-unlock/5" :
            "border-error/30 bg-error/5"
          )}>
            <p className={cn("font-semibold", 
              evaluation.level === 'correct' ? "text-success" :
              evaluation.level === 'partial' ? "text-unlock" :
              "text-error"
            )}>
              {evaluation.level === 'correct' ? 'Chính xác' : 
               evaluation.level === 'partial' ? 'Đúng một phần' : 'Chưa đúng'}
            </p>
            {evaluation.level !== 'correct' && (
              <p className="mt-2 text-success">
                Đáp án đúng: {formatCorrectAnswer(current)}
              </p>
            )}
            {current.explanation && (
              <p className="mt-2 text-text-secondary">{current.explanation}</p>
            )}
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3">
          {usesConfirmButton && !isConfirmed && (
            <Button
              variant="primary"
              size="lg"
              className="w-full mb-4"
              disabled={!canConfirm}
              onClick={handleConfirmAction}
            >
              Kiểm tra
            </Button>
          )}

          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="flex-1"
              disabled={index === 0}
              onClick={() => setIndex((value) => Math.max(0, value - 1))}
            >
              Câu trước
            </Button>
            <Button
              variant="secondary"
              className="flex-1"
              disabled={index >= draft.questions.length - 1}
              onClick={() =>
                setIndex((value) => Math.min(draft.questions.length - 1, value + 1))
              }
            >
              Câu sau
            </Button>
          </div>
          {submitError && <p className="text-sm text-error">{submitError}</p>}
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => setConfirmingFinish(true)}
          >
            Kết thúc ôn luyện
          </Button>
        </div>

        <Modal
          open={confirmingFinish}
          onClose={() => {
            if (!isSubmitting) setConfirmingFinish(false);
          }}
          title="Kết thúc ôn luyện"
        >
          <p className="mb-4 text-sm text-text-secondary">
            Bạn có chắc muốn kết thúc buổi ôn luyện? Sau khi kết thúc, bạn sẽ được xem kết quả.
          </p>
          {submitError && <p className="mb-4 text-sm text-error">{submitError}</p>}
          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="flex-1"
              disabled={isSubmitting}
              onClick={() => setConfirmingFinish(false)}
            >
              Làm tiếp
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              disabled={isSubmitting}
              onClick={() => submitDraft(draft, false)}
            >
              {isSubmitting ? 'Đang kết thúc...' : 'Kết thúc'}
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
