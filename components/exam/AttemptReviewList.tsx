'use client';

import { ExamQuestion } from '@/components/exam/ExamQuestion';
import { formatSelectedAnswer } from '@/lib/exam-paper';
import { formatCorrectAnswer } from '@/lib/quiz-engine';
import type { ExamAnswerStatus, ExamAttempt } from '@/types/exam';
import { cn } from '@/lib/utils';

const STATUS_LABEL: Record<ExamAnswerStatus, string> = {
  correct: 'Đúng',
  incorrect: 'Sai',
  unanswered: 'Chưa trả lời',
};

function statusClass(status: ExamAnswerStatus): string {
  if (status === 'correct') return 'text-success';
  if (status === 'incorrect') return 'text-error';
  return 'text-text-muted';
}

export function AttemptReviewList({
  attempt,
  title,
}: {
  attempt: ExamAttempt;
  title: string;
}) {
  return (
    <section id="xem-lai" className="mt-10 flex flex-col gap-6">
      <h2 className="profile-card__title">{title}</h2>
      {attempt.questions.map((item, questionIndex) => (
        <article key={item.question.id} className="profile-card">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm font-medium">Câu {questionIndex + 1}</p>
            <p className={cn('text-sm font-semibold', statusClass(item.status))}>
              {STATUS_LABEL[item.status]}
            </p>
          </div>
          <h3 className="mb-4 whitespace-pre-line font-display text-lg leading-relaxed">
            {item.question.question}
          </h3>
          <ExamQuestion
            question={item.question}
            answer={item.answer ?? undefined}
            revealed
            disabled
            onChange={() => {}}
          />
          <div className="mt-4 space-y-1 text-sm">
            <p>
              <span className="text-text-muted">Đáp án của bạn: </span>
              {formatSelectedAnswer(item.question, item.answer)}
            </p>
            <p className="text-success">Đáp án đúng: {formatCorrectAnswer(item.question)}</p>
          </div>
          {item.question.explanation && (
            <p className="mt-3 text-sm text-text-secondary">{item.question.explanation}</p>
          )}
        </article>
      ))}
    </section>
  );
}
