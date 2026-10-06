import type { BeltId, QuizQuestion } from '@/types';
import type { QuizAnswer } from '@/lib/quiz-engine';

export type ExamMode = 'practice' | 'official';

/** submitted: nộp bài. exited: thoát giữa chừng. */
export type ExamOutcome = 'submitted' | 'exited';

export type ExamAnswerStatus = 'correct' | 'incorrect' | 'unanswered';

export interface ExamBlueprintSlot {
  topic: string;
  count: number;
}

export interface ExamBankQuestion extends QuizQuestion {
  rankId: string;
  beltId: BeltId;
  topic?: string;
}

export interface ExamBankFile {
  rankId: string;
  beltId: BeltId;
  lessonId: string;
  /** Ngân hàng còn thiếu câu, ví dụ Nâu đai. */
  todo?: string;
  questions: ExamBankQuestion[];
}

export interface ExamCandidateSnapshot {
  fullName: string;
  dateOfBirth: string;
  club: string;
  dojo: string;
  /** Hồ sơ cũ lưu trước khi có HLV có thể thiếu trường này. */
  coach?: string;
  candidateNumber?: string;
}

export interface ExamQuestionSnapshot {
  question: ExamBankQuestion;
  answer: QuizAnswer | null;
  status: ExamAnswerStatus;
}

export interface ExamAttempt {
  id: string;
  mode: ExamMode;
  candidate: ExamCandidateSnapshot;
  rankId: string;
  beltId: BeltId;
  startedAt: string;
  submittedAt: string;
  durationMs: number;
  timeLimitMs: number;
  autoSubmitted: boolean;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  /** Thang 10, một chữ số thập phân */
  score: number;
  questions: ExamQuestionSnapshot[];
  examSessionId?: string;
  examSessionName?: string;
  /** Bài cũ lưu trước khi có trạng thái này được coi là đã nộp. */
  outcome?: ExamOutcome;
  /** Có khi outcome là exited. */
  exitedAt?: string;
}

export interface ExamDraft {
  id: string;
  mode: ExamMode;
  rankId: string;
  beltId: BeltId;
  candidate: ExamCandidateSnapshot;
  startedAt: string;
  timeLimitMs: number;
  examSessionId?: string;
  examSessionName?: string;
  questions: ExamBankQuestion[];
  answers: Record<string, QuizAnswer>;
}

export interface ExamGrade {
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  score: number;
  questions: ExamQuestionSnapshot[];
}
