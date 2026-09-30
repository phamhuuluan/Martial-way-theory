import type { ExamAttempt } from '@/types/exam';

export const EXAM_ATTEMPTS_KEY = 'pqq-theory-exam-attempts-v1';
export const EXAM_ATTEMPTS_EVENT = 'pqq-exam-attempts-changed';

const BELT_IDS = new Set(['brown', 'blue', 'green', 'red', 'yellow', 'white']);

let memoryAttempts: ExamAttempt[] | null = null;

function isExamAttempt(value: unknown): value is ExamAttempt {
  if (!value || typeof value !== 'object') return false;
  const attempt = value as ExamAttempt;
  return (
    typeof attempt.id === 'string' &&
    (attempt.mode === 'practice' || attempt.mode === 'official') &&
    typeof attempt.rankId === 'string' &&
    BELT_IDS.has(attempt.beltId) &&
    typeof attempt.startedAt === 'string' &&
    typeof attempt.submittedAt === 'string' &&
    typeof attempt.score === 'number' &&
    typeof attempt.correctCount === 'number' &&
    typeof attempt.incorrectCount === 'number' &&
    typeof attempt.unansweredCount === 'number' &&
    typeof attempt.totalQuestions === 'number' &&
    typeof attempt.durationMs === 'number' &&
    Array.isArray(attempt.questions) &&
    !!attempt.candidate &&
    typeof attempt.candidate.fullName === 'string' &&
    typeof attempt.candidate.dateOfBirth === 'string' &&
    typeof attempt.candidate.club === 'string' &&
    typeof attempt.candidate.dojo === 'string'
  );
}

export function sanitizeExamAttempts(raw: unknown): ExamAttempt[] {
  const list = Array.isArray(raw)
    ? raw
    : raw && typeof raw === 'object' && Array.isArray((raw as { attempts?: unknown }).attempts)
      ? (raw as { attempts: unknown[] }).attempts
      : [];

  return list
    .filter(isExamAttempt)
    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
}

export function parseImportedExamAttempts(raw: unknown): ExamAttempt[] | null {
  if (!raw || typeof raw !== 'object' || !('examAttempts' in raw)) return null;
  const value = (raw as { examAttempts?: unknown }).examAttempts;
  if (!Array.isArray(value)) return null;
  return sanitizeExamAttempts(value);
}

function notifyAttemptsChanged(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(EXAM_ATTEMPTS_EVENT));
}

export function getExamAttempts(): ExamAttempt[] {
  if (typeof window === 'undefined') return memoryAttempts ?? [];

  try {
    const raw = window.localStorage.getItem(EXAM_ATTEMPTS_KEY);
    if (!raw) return memoryAttempts ?? [];
    return sanitizeExamAttempts(JSON.parse(raw));
  } catch {
    return memoryAttempts ?? [];
  }
}

function writeAttempts(attempts: ExamAttempt[]): ExamAttempt[] {
  const next = sanitizeExamAttempts(attempts);
  memoryAttempts = next;
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(
        EXAM_ATTEMPTS_KEY,
        JSON.stringify({ version: 1, attempts: next })
      );
    } catch {
      // Giữ bản trong bộ nhớ khi trình duyệt chặn localStorage.
    }
  }
  notifyAttemptsChanged();
  return next;
}

export function saveExamAttempt(attempt: ExamAttempt): ExamAttempt[] {
  const current = getExamAttempts().filter((item) => item.id !== attempt.id);
  return writeAttempts([attempt, ...current]);
}

export function getExamAttempt(id: string): ExamAttempt | null {
  return getExamAttempts().find((attempt) => attempt.id === id) ?? null;
}

export function replaceExamAttempts(attempts: unknown): ExamAttempt[] {
  return writeAttempts(sanitizeExamAttempts(attempts));
}
