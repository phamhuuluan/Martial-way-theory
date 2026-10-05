'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { EXAM_ATTEMPTS_EVENT, getExamAttempts } from '@/lib/exam-attempts';
import { formatDuration, formatExamTimestamp } from '@/lib/exam-paper';
import { getExamLevelName } from '@/lib/exam-config';
import type { ExamAttempt } from '@/types/exam';

function rankName(rankId: string): string {
  return getExamLevelName(rankId);
}

export function PracticeHistory() {
  const [attempts, setAttempts] = useState<ExamAttempt[]>([]);

  useEffect(() => {
    const refresh = () => setAttempts(getExamAttempts().filter(a => a.mode === 'official'));
    refresh();
    window.addEventListener(EXAM_ATTEMPTS_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(EXAM_ATTEMPTS_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  return (
    <section className="profile-card">
      <h2 className="profile-card__title">Lịch sử thi</h2>
      {attempts.length === 0 ? (
        <p className="text-sm text-text-secondary">Chưa có dữ liệu thi.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {attempts.map((attempt) => (
            <li key={attempt.id}>
              <Link
                href={
                  attempt.mode === 'official'
                    ? `/exam/official/attempt?id=${encodeURIComponent(attempt.id)}`
                    : `/exam/practice/attempt?id=${encodeURIComponent(attempt.id)}`
                }
                className="flex flex-col gap-1 rounded-[var(--radius-md)] border border-border px-4 py-3 transition-colors hover:border-unlock/40"
              >
                <span className="font-medium">
                  Thi · {rankName(attempt.rankId)}
                </span>
                <span className="text-sm text-text-secondary">
                  {attempt.outcome === 'exited'
                    ? `Thoát lúc ${formatExamTimestamp(attempt.exitedAt ?? attempt.submittedAt)}`
                    : formatExamTimestamp(attempt.submittedAt)}{' '}
                  · {attempt.score.toFixed(1)} điểm · {attempt.correctCount} đúng / {attempt.incorrectCount} sai ·{' '}
                  {formatDuration(attempt.durationMs)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
