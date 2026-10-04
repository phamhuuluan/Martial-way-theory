'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ExamQuestion } from '@/components/exam/ExamQuestion';
import { getExamAttempt } from '@/lib/exam-attempts';
import {
  formatBirthDate,
  formatDuration,
  formatExamTimestamp,
  formatSelectedAnswer,
} from '@/lib/exam-paper';
import { formatCorrectAnswer } from '@/lib/quiz-engine';
import { getExamLevelName } from '@/lib/exam-config';
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

export function PracticeAttemptView() {
  const searchParams = useSearchParams();
  const attemptId = searchParams.get('id') ?? '';
  const [attempt, setAttempt] = useState<ExamAttempt | null | undefined>(undefined);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    setAttempt(attemptId ? getExamAttempt(attemptId) : null);
  }, [attemptId]);

  useEffect(() => {
    if (!showReview) return;
    document.getElementById('xem-lai')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [showReview]);

  if (attempt === undefined) {
    return <div className="profile-page px-4 py-16 text-center text-sm text-text-secondary">Đang mở bài làm…</div>;
  }

  if (!attempt) {
    return (
      <div className="profile-page px-4 py-16 text-center">
        <p className="text-text-secondary">Không tìm thấy bài làm.</p>
        <Link href="/profile" className="mt-4 inline-block text-sm text-unlock">
          Về hồ sơ
        </Link>
      </div>
    );
  }

  const rankName = getExamLevelName(attempt.rankId);

  return (
    <div className="profile-page relative min-h-screen px-4 py-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-3xl">
        <p className="mb-2 text-sm text-text-muted">
          <Link href="/profile" className="hover:text-text-primary">
            Hồ sơ
          </Link>
        </p>
        <h1 className="font-display text-3xl font-bold">Kết quả luyện đề</h1>
        <p className="mt-2 text-text-secondary">{rankName}</p>
        <p className="mt-1 text-sm text-text-muted">
          {[
            attempt.candidate.fullName,
            formatBirthDate(attempt.candidate.dateOfBirth),
            attempt.candidate.club,
            attempt.candidate.dojo,
            attempt.candidate.coach,
          ]
            .map((part) => part?.trim())
            .filter(Boolean)
            .join(' · ')}
        </p>
        <p className="mt-1 text-sm text-text-muted">
          Nộp lúc {formatExamTimestamp(attempt.submittedAt)}
          {attempt.autoSubmitted ? ' · Hết giờ, hệ thống tự nộp' : ''}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="profile-card">
            <p className="profile-stat-label">Điểm</p>
            <p className="profile-stat-sub">{attempt.score.toFixed(1)} / 10</p>
          </div>
          <div className="profile-card">
            <p className="profile-stat-label">Thời gian làm</p>
            <p className="profile-stat-sub">{formatDuration(attempt.durationMs)}</p>
          </div>
          <div className="profile-card sm:col-span-2">
            <p className="text-sm text-text-secondary">
              Tổng {attempt.totalQuestions} câu · {attempt.correctCount} đúng · {attempt.incorrectCount} sai ·{' '}
              {attempt.unansweredCount} chưa trả lời
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button variant="primary" className="flex-1" onClick={() => setShowReview(true)}>
            Xem lại bài
          </Button>
          <Link href="/profile/practice" className="flex-1">
            <Button variant="secondary" className="w-full">
              Luyện đề khác
            </Button>
          </Link>
        </div>

        {showReview && (
          <section id="xem-lai" className="mt-10 flex flex-col gap-6">
            <h2 className="profile-card__title">Xem lại bài</h2>
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
        )}
      </div>
    </div>
  );
}
