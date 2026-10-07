'use client';

import { useEffect, useState, useMemo } from 'react';
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

  const groupedAttempts = useMemo(() => {
    const groups: Record<string, { key: string; sessionName: string; attempts: ExamAttempt[] }> = {};
    for (const attempt of attempts) {
      const key = attempt.examSessionId || 'unknown';
      if (!groups[key]) {
        groups[key] = {
          key,
          sessionName: attempt.examSessionName || (key === 'unknown' ? 'Luyện tập / Không có kỳ thi' : key),
          attempts: [],
        };
      }
      groups[key].attempts.push(attempt);
    }
    return Object.values(groups).sort((a, b) => {
      if (a.key === 'unknown') return 1;
      if (b.key === 'unknown') return -1;
      const aMax = a.attempts.reduce((max, r) => (r.submittedAt > max ? r.submittedAt : max), '');
      const bMax = b.attempts.reduce((max, r) => (r.submittedAt > max ? r.submittedAt : max), '');
      return bMax.localeCompare(aMax);
    });
  }, [attempts]);

  return (
    <section className="profile-card">
      <h2 className="profile-card__title">Lịch sử thi</h2>
      {attempts.length === 0 ? (
        <p className="text-sm text-text-secondary">Chưa có dữ liệu thi.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {groupedAttempts.map((group) => (
            <div key={group.key}>
              <h3 className="mb-3 font-medium text-text-primary">{group.sessionName}</h3>
              <ul className="flex flex-col gap-3">
                {group.attempts.map((attempt) => (
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
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
