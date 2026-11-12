'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { AttemptReviewList } from '@/components/exam/AttemptReviewList';
import { getExamAttempt } from '@/lib/exam-attempts';
import { fetchExamAttemptData } from '@/lib/exam-results';
import { clearOfficialExamExitRedirect } from '@/lib/official-exam';
import {
  formatBirthDate,
  formatDuration,
  formatExamTimestamp,
} from '@/lib/exam-paper';
import { getExamLevelName } from '@/lib/exam-config';
import type { ExamAttempt } from '@/types/exam';

export function OfficialAttemptView() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const attemptId = searchParams.get('id') ?? '';
  const isAdmin = pathname.includes('/pqq-management');
  const [attempt, setAttempt] = useState<ExamAttempt | null | undefined>(undefined);

  useEffect(() => {
    if (!isAdmin) {
      clearOfficialExamExitRedirect();
    }
    if (!attemptId) {
      setAttempt(null);
      return;
    }
    if (isAdmin) {
      void fetchExamAttemptData(attemptId).then((data) => setAttempt(data));
    } else {
      setAttempt(getExamAttempt(attemptId));
    }
  }, [attemptId, isAdmin]);

  if (attempt === undefined) {
    return (
      <div className="profile-page px-4 py-16 text-center text-sm text-text-secondary">
        Đang mở bài làm…
      </div>
    );
  }

  if (!attempt) {
    return (
      <div className="profile-page px-4 py-16 text-center">
        <p className="text-text-secondary">Không tìm thấy bài thi.</p>
        <Link href="/exam/official" className="mt-4 inline-block text-sm text-unlock">
          Về mục thi
        </Link>
      </div>
    );
  }

  const rankName = getExamLevelName(attempt.rankId);
  const exited = attempt.outcome === 'exited';
  const exitedAt = attempt.exitedAt ?? attempt.submittedAt;

  return (
    <div className="profile-page relative min-h-screen px-4 py-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-3xl">
        <p className="mb-2 text-sm text-text-muted">
          <Link href={isAdmin ? "/pqq-management" : "/exam/official"} className="hover:text-text-primary">
            {isAdmin ? "Quản lý" : "Kỳ thi"}
          </Link>
        </p>
        <h1 className="font-display text-3xl font-bold">Kết quả thi</h1>
        <p className="mt-2 text-text-secondary">
          {rankName} {attempt.examSessionName ? `· ${attempt.examSessionName}` : ''}
        </p>
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
          {exited
            ? `Thoát bài lúc ${formatExamTimestamp(exitedAt)}`
            : `Nộp lúc ${formatExamTimestamp(attempt.submittedAt)}${
                attempt.autoSubmitted ? ' · Hết giờ, hệ thống tự nộp' : ''
              }`}
        </p>
        <p className="mt-1 text-sm font-medium">{exited ? 'Thoát giữa chừng' : 'Đã nộp bài'}</p>

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

        <div className="mt-8">
          <Link href={isAdmin ? "/pqq-management" : "/exam/official"}>
            <Button variant="secondary" className="w-full sm:w-auto">
              {isAdmin ? "Về trang quản lý" : "Về mục thi"}
            </Button>
          </Link>
        </div>

        <AttemptReviewList attempt={attempt} title="Chi tiết bài làm" />
      </div>
    </div>
  );
}
