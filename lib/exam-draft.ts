import type { BeltId } from '@/types';
import type { QuizAnswer } from '@/lib/quiz-engine';
import type { ExamBankQuestion, ExamCandidateSnapshot, ExamDraft, ExamMode } from '@/types/exam';

export const EXAM_DRAFT_KEY = 'pqq-theory-exam-draft-v1';

const BELT_IDS = new Set(['brown', 'blue', 'green', 'red', 'yellow', 'white']);

function isExamDraft(value: unknown): value is ExamDraft {
  if (!value || typeof value !== 'object') return false;
  const draft = value as ExamDraft;
  return (
    typeof draft.id === 'string' &&
    (draft.mode === 'practice' || draft.mode === 'official') &&
    typeof draft.rankId === 'string' &&
    BELT_IDS.has(draft.beltId) &&
    typeof draft.startedAt === 'string' &&
    typeof draft.timeLimitMs === 'number' &&
    Array.isArray(draft.questions) &&
    draft.questions.length > 0 &&
    !!draft.answers &&
    typeof draft.answers === 'object' &&
    !!draft.candidate &&
    typeof draft.candidate.fullName === 'string'
  );
}

export function readExamDraft(): ExamDraft | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(EXAM_DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    return isExamDraft(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function writeExamDraft(draft: ExamDraft): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(EXAM_DRAFT_KEY, JSON.stringify(draft));
  } catch {
    // Bài đang làm vẫn nằm trong bộ nhớ trang hiện tại.
  }
}

export function clearExamDraft(): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.removeItem(EXAM_DRAFT_KEY);
  } catch {
    // Không chặn nộp bài nếu sessionStorage bị chặn.
  }
}

export function createExamDraft(input: {
  id: string;
  mode: ExamMode;
  rankId: string;
  beltId: BeltId;
  candidate: ExamCandidateSnapshot;
  startedAt: string;
  timeLimitMs: number;
  questions: ExamBankQuestion[];
  answers?: Record<string, QuizAnswer>;
  examSessionId?: string;
  examSessionName?: string;
}): ExamDraft {
  return {
    id: input.id,
    mode: input.mode,
    rankId: input.rankId,
    beltId: input.beltId,
    candidate: input.candidate,
    startedAt: input.startedAt,
    timeLimitMs: input.timeLimitMs,
    questions: input.questions,
    answers: input.answers ?? {},
    ...(input.examSessionId ? { examSessionId: input.examSessionId } : {}),
    ...(input.examSessionName ? { examSessionName: input.examSessionName } : {}),
  };
}
