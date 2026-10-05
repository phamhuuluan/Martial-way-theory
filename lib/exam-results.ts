import { getExamLevelName } from '@/lib/exam-config';
import type { ExamAttempt, ExamCandidateSnapshot } from '@/types/exam';

export const ADMIN_EXAM_CANDIDATE: ExamCandidateSnapshot = {
  fullName: 'admin',
  dateOfBirth: '',
  club: '',
  dojo: '',
  coach: '',
  candidateNumber: 'admin',
};

export interface ExamResultQuery {
  /** ISO inclusive lower bound on submittedAt. */
  from?: string;
  /** ISO exclusive upper bound on submittedAt. */
  to?: string;
}

export interface ExamResultRecord {
  id: string;
  fullName: string;
  candidateNumber: string;
  rankId: string;
  paperName: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  startedAt: string;
  submittedAt: string;
  durationMs: number;
  /** Lượt nộp trước khi sheet có cột tương ứng để trống. */
  club: string;
  dojo: string;
  dateOfBirth: string;
  coach: string;
  /** Bài cũ trên sheet không có cột này được coi là đã nộp. */
  outcome: 'submitted' | 'exited';
  exitedAt: string;
}

const CONFIG_ERROR = 'Chưa cấu hình địa chỉ lưu kết quả.';
const LOAD_ERROR = 'Không tải được danh sách kết quả.';
const SAVE_ERROR = 'Không lưu được kết quả. Hãy thử lại.';
const INVALID_ERROR = 'Dữ liệu kết quả không hợp lệ.';

export function examResultsUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_EXAM_RESULTS_URL?.trim();
  return url ? url : null;
}

export function toExamResultRecord(attempt: ExamAttempt): ExamResultRecord {
  return {
    id: attempt.id,
    fullName: attempt.candidate.fullName.trim(),
    candidateNumber: attempt.candidate.candidateNumber?.trim() ?? '',
    rankId: attempt.rankId,
    paperName: getExamLevelName(attempt.rankId),
    score: attempt.score,
    correctCount: attempt.correctCount,
    totalQuestions: attempt.totalQuestions,
    startedAt: attempt.startedAt,
    submittedAt: attempt.submittedAt,
    durationMs: attempt.durationMs,
    club: attempt.candidate.club.trim(),
    dojo: attempt.candidate.dojo.trim(),
    dateOfBirth: attempt.candidate.dateOfBirth.trim(),
    coach: attempt.candidate.coach?.trim() ?? '',
    outcome: attempt.outcome === 'exited' ? 'exited' : 'submitted',
    exitedAt: attempt.exitedAt?.trim() ?? '',
  };
}

function finiteNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function text(value: unknown): string | null {
  if (typeof value === 'string') return value;
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return null;
}

function parseRecord(value: unknown): ExamResultRecord | null {
  if (!value || typeof value !== 'object') return null;
  const row = value as Record<string, unknown>;
  const id = text(row.id)?.trim() ?? '';
  const fullName = text(row.fullName)?.trim() ?? '';
  const candidateNumber = text(row.candidateNumber)?.trim() ?? null;
  const rankId = text(row.rankId)?.trim() ?? '';
  const paperName = text(row.paperName)?.trim() ?? '';
  const startedAt = text(row.startedAt)?.trim() ?? '';
  const submittedAt = text(row.submittedAt)?.trim() ?? '';
  const club = text(row.club)?.trim() ?? '';
  const dojo = text(row.dojo)?.trim() ?? '';
  const dateOfBirth = text(row.dateOfBirth)?.trim() ?? '';
  const coach = text(row.coach)?.trim() ?? '';
  const outcomeText = text(row.outcome)?.trim() ?? '';
  const exitedAt = text(row.exitedAt)?.trim() ?? '';
  const score = finiteNumber(row.score);
  const correctCount = finiteNumber(row.correctCount);
  const totalQuestions = finiteNumber(row.totalQuestions);
  const durationMs = finiteNumber(row.durationMs);

  if (
    !id ||
    !fullName ||
    candidateNumber === null ||
    !rankId ||
    !paperName ||
    !startedAt ||
    !submittedAt ||
    score === null ||
    correctCount === null ||
    totalQuestions === null ||
    durationMs === null
  ) {
    return null;
  }

  return {
    id,
    fullName,
    candidateNumber,
    rankId,
    paperName,
    score,
    correctCount,
    totalQuestions,
    startedAt,
    submittedAt,
    durationMs,
    club,
    dojo,
    dateOfBirth,
    coach,
    outcome: outcomeText === 'exited' ? 'exited' : 'submitted',
    exitedAt,
  };
}

export function parseExamResults(payload: unknown): ExamResultRecord[] {
  const rows = Array.isArray(payload)
    ? payload
    : payload &&
        typeof payload === 'object' &&
        Array.isArray((payload as { results?: unknown }).results)
      ? (payload as { results: unknown[] }).results
      : null;

  if (!rows) throw new Error(INVALID_ERROR);

  const records = rows
    .map(parseRecord)
    .filter((row): row is ExamResultRecord => row !== null);

  if (rows.length > 0 && records.length === 0) throw new Error(INVALID_ERROR);

  return records.sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
}

function requireUrl(): string {
  const url = examResultsUrl();
  if (!url) throw new Error(CONFIG_ERROR);
  return url;
}

export function examResultsCallbackUrl(
  url: string,
  callbackName: string,
  query?: ExamResultQuery
): string {
  const endpoint = new URL(url);
  endpoint.searchParams.set('callback', callbackName);
  if (query?.from) endpoint.searchParams.set('from', query.from);
  if (query?.to) endpoint.searchParams.set('to', query.to);
  return endpoint.toString();
}

function loadExamResults(url: string, query?: ExamResultQuery): Promise<unknown> {
  const callbackName = `pqqExamResults_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const timer = window.setTimeout(() => {
      cleanup();
      reject(new Error(LOAD_ERROR));
    }, 20000);

    const callbacks = window as unknown as Record<string, unknown>;
    const cleanup = () => {
      window.clearTimeout(timer);
      delete callbacks[callbackName];
      script.remove();
    };

    callbacks[callbackName] = (payload: unknown) => {
      cleanup();
      resolve(payload);
    };
    script.onerror = () => {
      cleanup();
      reject(new Error(LOAD_ERROR));
    };
    script.src = examResultsCallbackUrl(url, callbackName, query);
    document.head.appendChild(script);
  });
}

export async function fetchExamResults(query?: ExamResultQuery): Promise<ExamResultRecord[]> {
  const payload = await loadExamResults(requireUrl(), query);
  if (
    payload &&
    typeof payload === 'object' &&
    'ok' in payload &&
    (payload as { ok?: unknown }).ok === false
  ) {
    throw new Error(LOAD_ERROR);
  }

  try {
    return parseExamResults(payload);
  } catch (error) {
    if (error instanceof Error && error.message === INVALID_ERROR) throw error;
    throw new Error(LOAD_ERROR);
  }
}

function postExamResultForm(url: string, record: ExamResultRecord): Promise<void> {
  return new Promise((resolve) => {
    const frameName = `pqq-exam-post-${record.id}`;
    const iframe = document.createElement('iframe');
    iframe.name = frameName;
    iframe.hidden = true;
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = url;
    form.target = frameName;
    form.acceptCharset = 'UTF-8';
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'payload';
    input.value = JSON.stringify(record);
    form.append(input);
    document.body.append(iframe, form);
    form.submit();
    window.setTimeout(() => {
      form.remove();
      iframe.remove();
      resolve();
    }, 2500);
  });
}

export function postExamResultBeacon(record: ExamResultRecord): void {
  const url = examResultsUrl();
  if (!url || typeof navigator === 'undefined' || typeof navigator.sendBeacon !== 'function') return;
  const body = new Blob([JSON.stringify(record)], { type: 'text/plain;charset=UTF-8' });
  navigator.sendBeacon(url, body);
}

export async function postExamResult(record: ExamResultRecord): Promise<void> {
  const url = requireUrl();
  await postExamResultForm(url, record);
  const results = await fetchExamResults();
  if (!results.some((row) => row.id === record.id)) {
    throw new Error(SAVE_ERROR);
  }
}
