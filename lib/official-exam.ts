import { saveExamAttempt } from '@/lib/exam-attempts';
import { clearExamDraft, readExamDraft } from '@/lib/exam-draft';
import { buildExamAttempt } from '@/lib/exam-paper';
import { postExamResult, postExamResultBeacon, toExamResultRecord } from '@/lib/exam-results';
import type { ExamAttempt } from '@/types/exam';

export const OFFICIAL_EXAM_EXIT_REDIRECT_KEY = 'pqq-official-exam-exit-id';
export const EXAM_POINTER_EXIT_STRIKE = 3;

const claimedFinishIds = new Set<string>();
let lastExitedAttemptId: string | null = null;

export function claimExamFinish(id: string): boolean {
  if (claimedFinishIds.has(id)) return false;
  claimedFinishIds.add(id);
  return true;
}

export function releaseExamFinish(id: string): void {
  claimedFinishIds.delete(id);
}

export function takeLastExitedAttemptId(): string | null {
  const id = lastExitedAttemptId;
  lastExitedAttemptId = null;
  return id;
}

export type PointerLeaveAction = 'warn' | 'exit';

export function applyPointerLeave(previousStrikes: number): {
  strikes: number;
  action: PointerLeaveAction;
} {
  const strikes = previousStrikes + 1;
  return {
    strikes,
    action: strikes >= EXAM_POINTER_EXIT_STRIKE ? 'exit' : 'warn',
  };
}

export function isOfficialExamSessionPath(pathname: string): boolean {
  const path = pathname.split('?')[0] ?? pathname;
  return /^\/exam\/official\/(?!attempt$)[^/]+$/.test(path);
}

export function officialAttemptPath(id: string): string {
  return `/exam/official/attempt?id=${encodeURIComponent(id)}`;
}

export function markOfficialExamExitRedirect(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(OFFICIAL_EXAM_EXIT_REDIRECT_KEY, id);
  } catch {
    // Trang vẫn kết thúc bài trong bộ nhớ nếu sessionStorage bị chặn.
  }
}

export function peekOfficialExamExitRedirect(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const id = window.sessionStorage.getItem(OFFICIAL_EXAM_EXIT_REDIRECT_KEY);
    return id && id.trim() ? id : null;
  } catch {
    return null;
  }
}

export function clearOfficialExamExitRedirect(): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.removeItem(OFFICIAL_EXAM_EXIT_REDIRECT_KEY);
  } catch {
    // Không chặn bài thi mới.
  }
}

export function exitOfficialExam(options?: {
  beacon?: boolean;
  rememberReload?: boolean;
}): ExamAttempt | null {
  const draft = readExamDraft();
  if (!draft || draft.mode !== 'official') return null;
  if (!claimExamFinish(draft.id)) return null;

  const exitedAt = new Date().toISOString();
  const attempt = buildExamAttempt({
    id: draft.id,
    mode: 'official',
    candidate: draft.candidate,
    rankId: draft.rankId,
    beltId: draft.beltId,
    startedAt: draft.startedAt,
    submittedAt: exitedAt,
    timeLimitMs: draft.timeLimitMs,
    autoSubmitted: false,
    questions: draft.questions,
    answers: draft.answers,
    outcome: 'exited',
    exitedAt,
    examSessionId: draft.examSessionId,
    examSessionName: draft.examSessionName,
  });

  saveExamAttempt(attempt);
  clearExamDraft();
  lastExitedAttemptId = attempt.id;
  if (options?.rememberReload) markOfficialExamExitRedirect(attempt.id);

  const record = toExamResultRecord(attempt);
  if (options?.beacon) postExamResultBeacon(record);
  else void postExamResult(record).catch(() => {});

  return attempt;
}
