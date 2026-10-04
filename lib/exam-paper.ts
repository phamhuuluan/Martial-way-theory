import type { BeltId } from '@/types';
import type { QuizQuestion } from '@/types';
import type { QuizAnswer } from '@/lib/quiz-engine';
import {
  formatCorrectAnswer,
  getQuestionType,
  isAnswerCorrect,
  TRUE_FALSE_OPTIONS,
} from '@/lib/quiz-engine';
import { randomizeQuestionPresentation, type RandomFn } from '@/lib/quiz-randomize';
import type {
  ExamAttempt,
  ExamBankQuestion,
  ExamBlueprintSlot,
  ExamCandidateSnapshot,
  ExamGrade,
  ExamMode,
  ExamQuestionSnapshot,
} from '@/types/exam';

function shuffle<T>(items: T[], random: RandomFn): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function isIntroFillQuestion(question: ExamBankQuestion): boolean {
  return (
    (question.type ?? 'single') === 'fill' &&
    question.question.toLowerCase().includes('lời thiệu')
  );
}

function isIntroQuestion(question: ExamBankQuestion): boolean {
  return isIntroFillQuestion(question);
}

function introGroupKey(question: ExamBankQuestion): string {
  const source = question.sourceQuestion?.trim();
  if (source) return source;
  return question.question.split('\n')[0].trim().toLowerCase();
}

function pickWithConstraints(
  pool: ExamBankQuestion[],
  count: number,
  random: RandomFn,
  usedIds: Set<string>,
  usedIntroGroups: Set<string>
): ExamBankQuestion[] {
  const result: ExamBankQuestion[] = [];
  const shuffled = shuffle(pool, random);

  for (const question of shuffled) {
    if (result.length >= count) break;
    if (usedIds.has(question.id)) continue;

    if (isIntroQuestion(question)) {
      const group = introGroupKey(question);
      if (usedIntroGroups.has(group)) continue;
      usedIntroGroups.add(group);
    }

    usedIds.add(question.id);
    result.push(question);
  }

  return result;
}

function pickWithBlueprint(
  bank: ExamBankQuestion[],
  drawCount: number,
  blueprint: ExamBlueprintSlot[],
  random: RandomFn
): ExamBankQuestion[] {
  const usedIds = new Set<string>();
  const usedIntroGroups = new Set<string>();
  const picked: ExamBankQuestion[] = [];

  for (const slot of blueprint) {
    if (slot.count <= 0) continue;
    const pool = bank.filter(
      (question) => question.topic === slot.topic && !usedIds.has(question.id)
    );
    picked.push(...pickWithConstraints(pool, slot.count, random, usedIds, usedIntroGroups));
  }

  if (picked.length < drawCount) {
    const rest = bank.filter((question) => !usedIds.has(question.id));
    picked.push(
      ...pickWithConstraints(rest, drawCount - picked.length, random, usedIds, usedIntroGroups)
    );
  }

  return picked.slice(0, drawCount);
}

export function selectExamQuestions(
  bank: ExamBankQuestion[],
  questionCount: number,
  random: RandomFn = Math.random,
  blueprint?: ExamBlueprintSlot[]
): ExamBankQuestion[] {
  if (questionCount <= 0 || bank.length === 0) return [];

  const rankIds = new Set(bank.map((question) => question.rankId));
  if (rankIds.size > 1) {
    throw new Error('Không trộn câu hỏi của nhiều cấp đai trong cùng một đề.');
  }

  const drawCount = Math.min(questionCount, bank.length);
  const picked = blueprint?.length
    ? shuffle(pickWithBlueprint(bank, drawCount, blueprint, random), random)
    : shuffle(
        pickWithConstraints(bank, drawCount, random, new Set<string>(), new Set<string>()),
        random
      );

  return picked.map((question) => randomizeExamQuestion(question, random));
}

/**
 * Ôn luyện: xáo toàn bộ ngân hàng, bỏ câu trùng id,
 * và chỉ giữ 1 câu điền chỗ trống của lời thiệu.
 */
export function selectPracticeQuestions(
  bank: ExamBankQuestion[],
  random: RandomFn = Math.random
): ExamBankQuestion[] {
  if (bank.length === 0) return [];

  const rankIds = new Set(bank.map((question) => question.rankId));
  if (rankIds.size > 1) {
    throw new Error('Không trộn câu hỏi của nhiều cấp đai trong cùng một đề.');
  }

  const usedIds = new Set<string>();
  const picked: ExamBankQuestion[] = [];
  let introFillTaken = false;

  for (const question of shuffle(bank, random)) {
    if (usedIds.has(question.id)) continue;
    if (isIntroFillQuestion(question)) {
      if (introFillTaken) continue;
      introFillTaken = true;
    }
    usedIds.add(question.id);
    picked.push(question);
  }

  return shuffle(picked, random).map((question) => randomizeExamQuestion(question, random));
}

function randomizeExamQuestion(
  question: ExamBankQuestion,
  random: RandomFn
): ExamBankQuestion {
  const presented = randomizeQuestionPresentation(question, random) as ExamBankQuestion;
  if (getQuestionType(presented) !== 'truefalse') return presented;

  const options =
    presented.options.length >= 2 ? [...presented.options] : [...TRUE_FALSE_OPTIONS];
  const originalCorrect =
    typeof presented.correctIndex === 'number' ? presented.correctIndex : 0;
  const order = shuffle(options.map((_, index) => index), random);

  return {
    ...presented,
    options: order.map((index) => options[index]),
    correctIndex: order.indexOf(originalCorrect),
  };
}

export function isExamAnswerProvided(
  question: QuizQuestion,
  answer: QuizAnswer | null | undefined
): boolean {
  if (!answer) return false;

  const type = getQuestionType(question);

  if (type === 'multiple') {
    return (answer.selectedIndices?.length ?? 0) > 0;
  }

  if (type === 'truefalse') {
    return typeof answer.trueFalseIndex === 'number';
  }

  if (type === 'fill') {
    return (answer.fillAnswers ?? []).some((index) => index >= 0);
  }

  if (type === 'matching') {
    return (answer.matchingAnswers ?? []).some((index) => index >= 0);
  }

  if (type === 'ordering') {
    const expected = question.items?.length ?? 0;
    return expected > 0 && (answer.orderAnswers?.length ?? 0) === expected;
  }

  if (type === 'definition') {
    return (answer.textAnswer ?? '').trim().length > 0;
  }

  return typeof answer.selectedIndex === 'number';
}

export function gradeExamQuestion(
  question: ExamBankQuestion,
  answer: QuizAnswer | null | undefined
): ExamQuestionSnapshot['status'] {
  if (!isExamAnswerProvided(question, answer)) return 'unanswered';
  return isAnswerCorrect(question, answer!) ? 'correct' : 'incorrect';
}

export function gradeExam(
  questions: ExamBankQuestion[],
  answers: Record<string, QuizAnswer | undefined>
): ExamGrade {
  const snapshots: ExamQuestionSnapshot[] = questions.map((question) => {
    const answer = answers[question.id] ?? null;
    return {
      question,
      answer,
      status: gradeExamQuestion(question, answer),
    };
  });

  const correctCount = snapshots.filter((item) => item.status === 'correct').length;
  const incorrectCount = snapshots.filter((item) => item.status === 'incorrect').length;
  const unansweredCount = snapshots.filter((item) => item.status === 'unanswered').length;
  const totalQuestions = snapshots.length;
  const score =
    totalQuestions > 0
      ? Math.round((correctCount / totalQuestions) * 100) / 10
      : 0;

  return {
    totalQuestions,
    correctCount,
    incorrectCount,
    unansweredCount,
    score,
    questions: snapshots,
  };
}

export function examElapsedMs(
  startedAt: string,
  submittedAt: string,
  timeLimitMs: number
): number {
  const elapsed = new Date(submittedAt).getTime() - new Date(startedAt).getTime();
  if (!Number.isFinite(elapsed)) return 0;
  return Math.min(Math.max(0, elapsed), Math.max(0, timeLimitMs));
}

export function buildExamAttempt(input: {
  id: string;
  mode: ExamMode;
  candidate: ExamCandidateSnapshot;
  rankId: string;
  beltId: BeltId;
  startedAt: string;
  submittedAt: string;
  timeLimitMs: number;
  autoSubmitted: boolean;
  questions: ExamBankQuestion[];
  answers: Record<string, QuizAnswer | undefined>;
  examSessionId?: string;
  candidateNumber?: string;
}): ExamAttempt {
  const grade = gradeExam(input.questions, input.answers);
  const candidate = input.candidateNumber
    ? { ...input.candidate, candidateNumber: input.candidateNumber }
    : input.candidate;

  return {
    id: input.id,
    mode: input.mode,
    candidate,
    rankId: input.rankId,
    beltId: input.beltId,
    startedAt: input.startedAt,
    submittedAt: input.submittedAt,
    durationMs: examElapsedMs(input.startedAt, input.submittedAt, input.timeLimitMs),
    timeLimitMs: input.timeLimitMs,
    autoSubmitted: input.autoSubmitted,
    totalQuestions: grade.totalQuestions,
    correctCount: grade.correctCount,
    incorrectCount: grade.incorrectCount,
    unansweredCount: grade.unansweredCount,
    score: grade.score,
    questions: grade.questions,
    ...(input.examSessionId ? { examSessionId: input.examSessionId } : {}),
  };
}

export function formatSelectedAnswer(
  question: QuizQuestion,
  answer: QuizAnswer | null | undefined
): string {
  if (!isExamAnswerProvided(question, answer) || !answer) return 'Chưa trả lời';

  const type = getQuestionType(question);

  if (type === 'truefalse') {
    const index = answer.trueFalseIndex;
    return typeof index === 'number' ? (TRUE_FALSE_OPTIONS[index] ?? 'Chưa trả lời') : 'Chưa trả lời';
  }

  if (type === 'multiple') {
    return (answer.selectedIndices ?? [])
      .slice()
      .sort((a, b) => a - b)
      .map((index) => question.options[index])
      .filter(Boolean)
      .join('; ');
  }

  if (type === 'single' || type === 'scenario') {
    return typeof answer.selectedIndex === 'number'
      ? (question.options[answer.selectedIndex] ?? 'Chưa trả lời')
      : 'Chưa trả lời';
  }

  if (type === 'fill') {
    return (answer.fillAnswers ?? [])
      .map((index) => (index >= 0 ? question.options[index] : '…'))
      .join('; ');
  }

  if (type === 'matching') {
    const leftItems = question.leftItems ?? [];
    const rightItems = question.rightItems ?? [];
    return leftItems
      .map((left, index) => {
        const rightIndex = answer.matchingAnswers?.[index] ?? -1;
        const right = rightIndex >= 0 ? rightItems[rightIndex] : '…';
        return `${left} → ${right}`;
      })
      .join('; ');
  }

  if (type === 'ordering') {
    const items = question.items ?? [];
    return (answer.orderAnswers ?? [])
      .map((index) => items[index])
      .filter(Boolean)
      .join(' → ');
  }

  if (type === 'definition') {
    const written = answer.textAnswer?.trim();
    return written ? written : 'Chưa trả lời';
  }

  return formatCorrectAnswer(question);
}

export function formatDuration(ms: number): string {
  const totalSeconds = Math.max(0, Math.round(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes} phút ${seconds.toString().padStart(2, '0')} giây`;
}

export function formatClock(ms: number): string {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function formatBirthDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-');
  if (!year || !month || !day) return isoDate;
  return `${day}/${month}/${year}`;
}

export function formatExamTimestamp(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);
}

export function createExamId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `exam-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
