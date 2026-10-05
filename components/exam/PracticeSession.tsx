'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';

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

    updateAnswer,
  } = useExamSession({
    mode: 'practice',
    rankId,
    beltId,
    questions,
  });


  const [confirmedAnswers, setConfirmedAnswers] = useState<Record<string, boolean>>({});

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

  if (!ready || !draft) {
    return (
      <div className="profile-page px-4 py-16 text-center text-sm text-text-secondary">
        Đang mở đề…
      </div>
    );
  }

  const current = draft.questions[index];
  const answeredCount = draft.questions.filter((question) =>
    isExamAnswerProvided(question, draft.answers[question.id])
  ).length;

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
          <p className="mt-1 text-sm text-text-secondary">
            Câu {index + 1}/{draft.questions.length} · Đã trả lời {answeredCount}
          </p>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {draft.questions.map((question, questionIndex) => {
              const answered = isExamAnswerProvided(question, draft.answers[question.id]);
              return (
                <button
                  key={question.id}
                  type="button"
                  aria-current={questionIndex === index}
                  aria-label={`Câu ${questionIndex + 1}`}
                  className={cn(
                    'h-10 w-10 shrink-0 rounded-full border text-sm',
                    questionIndex === index
                      ? 'border-unlock bg-unlock/15 text-text-primary'
                      : answered
                        ? 'border-border bg-bg-elevated text-text-primary'
                        : 'border-border text-text-muted'
                  )}
                  onClick={() => setIndex(questionIndex)}
                >
                  {questionIndex + 1}
                </button>
              );
            })}
          </div>
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
        </div>
      </div>
    </div>
  );
}
