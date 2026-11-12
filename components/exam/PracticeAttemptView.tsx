'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { AttemptReviewList } from '@/components/exam/AttemptReviewList';
import { getExamAttempt } from '@/lib/exam-attempts';
import {
  formatBirthDate,
  formatDuration,
  formatExamTimestamp,
} from '@/lib/exam-paper';
import { getExamLevelName } from '@/lib/exam-config';

import type { ExamAttempt } from '@/types/exam';

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
        <Link href="/exam" className="mt-4 inline-block text-sm text-unlock">
          Về kỳ thi
        </Link>
      </div>
    );
  }

  const rankName = getExamLevelName(attempt.rankId);

  return (
    <div className="profile-page relative min-h-screen px-4 py-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-3xl">
        <p className="mb-2 text-sm text-text-muted">
          <Link href="/exam" className="hover:text-text-primary">
            Kỳ thi
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
          <Link href="/exam" className="flex-1">
            <Button variant="secondary" className="w-full">
              Luyện đề khác
            </Button>
          </Link>
        </div>

        {showReview && <AttemptReviewList attempt={attempt} title="Xem lại bài" />}
      </div>
    </div>
  );
}
