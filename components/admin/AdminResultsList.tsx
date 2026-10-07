'use client';

import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { examResultsUrl, fetchExamResults, type ExamResultRecord } from '@/lib/exam-results';
import {
  EXAM_RESULT_FILTER_EMPTY,
  EXAM_RESULT_PRESETS,
  buildExamResultView,
  examResultRange,
  formatAttemptScore,
  formatCompactDuration,
  type ExamResultTimePreset,
} from '@/lib/exam-results-view';
import { formatBirthDate, formatDuration, formatExamTimestamp } from '@/lib/exam-paper';
import { cn } from '@/lib/utils';

const fieldClass =
  'w-full rounded-[var(--radius-sm)] border border-border bg-bg-primary px-4 py-3 text-base focus:border-unlock focus:outline-none focus:ring-1 focus:ring-unlock/50';

function toggleKey(current: Set<string>, key: string): Set<string> {
  const next = new Set(current);
  if (next.has(key)) next.delete(key);
  else next.add(key);
  return next;
}

export function AdminResultsList() {
  const [preset, setPreset] = useState<ExamResultTimePreset>('thisMonth');
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  });
  const [query, setQuery] = useState('');
  const [rows, setRows] = useState<ExamResultRecord[] | null>(null);
  const [fetchedAt, setFetchedAt] = useState<Date | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [expandedSessions, setExpandedSessions] = useState<Set<string>>(() => new Set());
  const [expandedPeople, setExpandedPeople] = useState<Set<string>>(() => new Set());
  const [expandedAttempts, setExpandedAttempts] = useState<Set<string>>(() => new Set());
  const requestRef = useRef(0);
  const loadingRef = useRef(false);

  const load = useCallback(async (nextPreset: ExamResultTimePreset) => {
    if (!examResultsUrl()) {
      requestRef.current += 1;
      loadingRef.current = false;
      setRows(null);
      setFetchedAt(null);
      setError('Chưa cấu hình địa chỉ lưu kết quả.');
      setLoading(false);
      return;
    }

    const requestId = ++requestRef.current;
    const at = new Date();
    loadingRef.current = true;
    setLoading(true);
    setError('');
    try {
      const nextRows = await fetchExamResults(examResultRange(nextPreset, at));
      if (requestId !== requestRef.current) return;
      setRows(nextRows);
      setFetchedAt(at);
    } catch (loadError) {
      if (requestId !== requestRef.current) return;
      setError(loadError instanceof Error ? loadError.message : 'Không tải được danh sách kết quả.');
    } finally {
      if (requestId === requestRef.current) {
        loadingRef.current = false;
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void load(preset);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [load, preset]);

  const deferredQuery = useDeferredValue(query);
  const view = useMemo(() => {
    if (!rows || !fetchedAt) return { sessions: [], matchCount: 0 };
    return buildExamResultView(rows, { preset, selectedMonth, query: deferredQuery, now: fetchedAt });
  }, [deferredQuery, fetchedAt, preset, selectedMonth, rows]);

  const sessionSignature = view.sessions.map((session) => session.key).join('|');
  useEffect(() => {
    const keys = sessionSignature ? sessionSignature.split('|') : [];
    if (keys.length === 0) return;
    setExpandedSessions((current) => {
      for (const key of current) {
        if (keys.includes(key)) return current;
      }
      return new Set([keys[0]]);
    });
  }, [sessionSignature]);

  const emptyLabel =
    deferredQuery.trim().length > 0
      ? EXAM_RESULT_FILTER_EMPTY
      : (EXAM_RESULT_PRESETS.find((item) => item.id === preset)?.emptyLabel ?? EXAM_RESULT_FILTER_EMPTY);

  return (
    <section className="profile-card" aria-label="Kết quả thi" aria-busy={loading}>
      <div className="flex flex-col gap-4">
        <h2 className="profile-card__title">Kết quả thi</h2>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Lọc theo thời gian">
          {EXAM_RESULT_PRESETS.map((item) => (
            <Button
              key={item.id}
              type="button"
              size="sm"
              variant={preset === item.id ? 'primary' : 'secondary'}
              aria-pressed={preset === item.id}
              onClick={() => setPreset(item.id)}
            >
              {item.label}
            </Button>
          ))}
          {preset === 'selectMonth' && (
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="rounded-[var(--radius-sm)] border border-border bg-bg-primary px-3 py-1.5 text-sm focus:border-unlock focus:outline-none focus:ring-1 focus:ring-unlock/50"
            />
          )}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className={fieldClass}
            placeholder="Tên, ngày sinh, mã học viên, CLB, võ đường, HLV, bộ đề"
            aria-label="Tìm kết quả thi"
            type="search"
          />
          <Button
            type="button"
            variant="secondary"
            className="shrink-0"
            disabled={loading}
            onClick={() => {
              if (loadingRef.current) return;
              void load(preset);
            }}
          >
            {loading ? 'Đang tải…' : 'Làm mới'}
          </Button>
        </div>
        {rows && (
          <p className="text-sm text-text-muted">
            {view.matchCount} lượt
          </p>
        )}
      </div>

      {error && <p className="mt-4 text-sm text-error">{error}</p>}

      {loading && view.sessions.length === 0 ? (
        <div className="mt-4 h-24 animate-pulse rounded-[var(--radius-md)] bg-border/40" />
      ) : view.sessions.length > 0 ? (
        <div className="mt-2">
          {view.sessions.map((session) => {
            const sessionOpen = expandedSessions.has(session.key);
            return (
              <section key={session.key} className="border-b border-border">
                <button
                  type="button"
                  className="flex w-full items-center gap-3 py-3 text-left"
                  aria-expanded={sessionOpen}
                  onClick={() => setExpandedSessions((current) => toggleKey(current, session.key))}
                >
                  <ChevronRight
                    aria-hidden
                    className={cn('size-4 shrink-0 text-text-muted transition-transform', sessionOpen && 'rotate-90')}
                  />
                  <span className="min-w-0 flex-1 truncate font-medium">{session.label}</span>
                  <span className="shrink-0 text-sm text-text-muted">{session.attemptCount} lượt</span>
                </button>
                {sessionOpen && (
                  <ul className="pb-2">
                    {session.people.map((person) => {
                      const personKey = `${session.key}\0${person.key}`;
                      const personOpen = expandedPeople.has(personKey);
                      return (
                        <li
                          key={personKey}
                          style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 44px' }}
                        >
                          <button
                            type="button"
                            className="flex w-full items-center gap-3 py-2.5 pl-1 text-left"
                            aria-expanded={personOpen}
                            onClick={() => setExpandedPeople((current) => toggleKey(current, personKey))}
                          >
                            <ChevronRight
                              aria-hidden
                              className={cn(
                                'size-4 shrink-0 text-text-muted transition-transform',
                                personOpen && 'rotate-90'
                              )}
                            />
                            <span className="min-w-0 flex-1 truncate text-sm">
                              {person.fullName} · {person.clubLabel}
                            </span>
                            <span className="shrink-0 text-sm text-text-muted">{person.attemptCount} lượt</span>
                          </button>
                          {personOpen && (
                            <ul className="mb-2 ml-7 border-l border-border pl-3">
                              {person.attempts.map((attempt) => {
                                const attemptOpen = expandedAttempts.has(attempt.id);
                                return (
                                  <li key={attempt.id}>
                                    <button
                                      type="button"
                                      className="flex w-full items-center gap-2 py-2 text-left"
                                      aria-expanded={attemptOpen}
                                      onClick={() =>
                                        setExpandedAttempts((current) => toggleKey(current, attempt.id))
                                      }
                                    >
                                      <ChevronRight
                                        aria-hidden
                                        className={cn(
                                          'size-3.5 shrink-0 text-text-muted transition-transform',
                                          attemptOpen && 'rotate-90'
                                        )}
                                      />
                                      <span className="min-w-0 truncate text-sm text-text-secondary">
                                        {attempt.paperName} · {formatAttemptScore(attempt.score)} điểm ·{' '}
                                        {formatCompactDuration(attempt.durationMs)}
                                      </span>
                                    </button>
                                    {attemptOpen && <AttemptDetail attempt={attempt} />}
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </section>
            );
          })}
        </div>
      ) : (
        !loading && rows !== null && <p className="mt-4 text-sm text-text-secondary">{emptyLabel}</p>
      )}
    </section>
  );
}

function displayText(value: string): string {
  const trimmed = value.trim();
  return trimmed || '—';
}

function AttemptDetail({ attempt }: { attempt: ExamResultRecord }) {
  const birthDate = formatBirthDate(attempt.dateOfBirth.trim());
  const fields = [
    { label: 'Họ và tên', value: displayText(attempt.fullName) },
    { label: 'Ngày sinh', value: displayText(birthDate) },
    { label: 'CLB đang theo tập', value: displayText(attempt.club) },
    { label: 'Võ đường', value: displayText(attempt.dojo) },
    { label: 'HLV hướng dẫn', value: displayText(attempt.coach) },
    { label: 'Mã học viên', value: displayText(attempt.candidateNumber) },
    { label: 'Kỳ thi', value: attempt.examSessionName ? attempt.examSessionName : '—' },
    { label: 'Bộ đề', value: attempt.paperName },
    { label: 'Điểm', value: attempt.score.toFixed(1) },
    { label: 'Số câu đúng / tổng câu', value: `${attempt.correctCount}/${attempt.totalQuestions}` },
    { label: 'Thời gian bắt đầu', value: formatExamTimestamp(attempt.startedAt) },
    { label: 'Thời gian nộp', value: formatExamTimestamp(attempt.submittedAt) },
    { label: 'Tổng thời gian làm bài', value: formatDuration(attempt.durationMs) },
    {
      label: 'Trạng thái',
      value: attempt.outcome === 'exited' ? 'Thoát giữa chừng' : 'Nộp bài',
    },
    ...(attempt.outcome === 'exited'
      ? [{ label: 'Thời điểm thoát', value: formatExamTimestamp(attempt.exitedAt) || '—' }]
      : []),
  ];

  return (
    <div className="mb-3 ml-6 rounded-[var(--radius-sm)] bg-bg-primary/40 px-3 py-3">
      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.label}>
            <dt className="text-xs text-text-muted">{field.label}</dt>
            <dd className="text-sm text-text-secondary">{field.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 flex justify-end">
        <Link href={`/pqq-management/attempt?id=${attempt.id}`}>
          <Button type="button" size="sm" variant="secondary">
            Xem bài làm
          </Button>
        </Link>
      </div>
    </div>
  );
}
