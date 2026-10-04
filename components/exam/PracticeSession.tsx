'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { ExamQuestion } from '@/components/exam/ExamQuestion';
import { isCandidateProfileComplete } from '@/lib/candidate-profile';
import { getExamAttempt, saveExamAttempt } from '@/lib/exam-attempts';
import { ADMIN_EXAM_CANDIDATE, postExamResult, toExamResultRecord } from '@/lib/exam-results';
import { clearExamDraft, createExamDraft, readExamDraft, writeExamDraft } from '@/lib/exam-draft';
import {
  buildExamAttempt,
  createExamId,
  formatClock,
  isExamAnswerProvided,
  selectPracticeQuestions,
} from '@/lib/exam-paper';
import {
  getQuestionType,
  isDefinitionQuestion,
  isFillQuestion,
  isMatchingQuestion,
  isMultipleChoice,
  isOrderingQuestion,
  isTrueFalseQuestion,
  type QuizAnswer,
} from '@/lib/quiz-engine';
import { useAdminStore } from '@/store/admin-store';
import { useProgressStore } from '@/store/progress-store';
import type { BeltId } from '@/types';
import type { ExamBankQuestion, ExamDraft } from '@/types/exam';
import { cn } from '@/lib/utils';

interface PracticeSessionProps {
  rankId: string;
  fullName: string;
  beltId: BeltId;
  durationMinutes: number;
  questions: ExamBankQuestion[];
}

function hintFor(question: ExamBankQuestion | undefined): string | null {
  if (!question) return null;
  if (isMultipleChoice(question)) return 'Chọn tất cả đáp án đúng. Có thể sửa trước khi nộp bài.';
  if (isTrueFalseQuestion(question)) return 'Mệnh đề trên đúng hay sai?';
  if (isFillQuestion(question)) return 'Chọn từ trong ngân hàng từ để điền vào từng chỗ trống.';
  if (isMatchingQuestion(question)) return 'Ghép từng mục bên trái với nội dung đúng bên phải.';
  if (isOrderingQuestion(question)) return 'Dùng mũi tên để sắp xếp theo đúng thứ tự.';
  if (getQuestionType(question) === 'scenario') return 'Đọc tình huống và chọn đáp án phù hợp nhất.';
  if (isDefinitionQuestion(question)) return 'Viết một câu ngắn. Không có lựa chọn sẵn.';
  return null;
}

export function PracticeSession({
  rankId,
  fullName,
  beltId,
  durationMinutes,
  questions,
}: PracticeSessionProps) {
  const router = useRouter();
  const hydrated = useProgressStore((s) => s.hydrated);
  const adminHydrated = useAdminStore((s) => s.hydrated);
  const isAdmin = useAdminStore((s) => s.isAdmin);
  const profile = useProgressStore((s) => s.progress.profile);
  const [draft, setDraft] = useState<ExamDraft | null>(null);
  const [ready, setReady] = useState(false);
  const [index, setIndex] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const [confirming, setConfirming] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const submittingRef = useRef(false);
  const submitFailedRef = useRef(false);
  const openedRef = useRef(false);

  const profileComplete = isCandidateProfileComplete(profile);
  const canPractice = isAdmin || profileComplete;

  const submitDraft = useCallback(
    (source: ExamDraft, autoSubmitted: boolean) => {
      if (submittingRef.current) return;
      submittingRef.current = true;
      submitFailedRef.current = false;
      setSubmitError('');

      const finish = async () => {
        const submittedAt = new Date().toISOString();
        const candidate = isAdmin
          ? ADMIN_EXAM_CANDIDATE
          : profileComplete
            ? {
                fullName: profile.name!.trim(),
                dateOfBirth: profile.dateOfBirth!,
                club: profile.club!.trim(),
                dojo: profile.dojo!.trim(),
              }
            : source.candidate;
        const existingAttempt = getExamAttempt(source.id);
        const attempt = existingAttempt
          ? { ...existingAttempt, candidate }
          : buildExamAttempt({
              id: source.id,
              mode: 'practice',
              candidate,
              rankId: source.rankId,
              beltId: source.beltId,
              startedAt: source.startedAt,
              submittedAt,
              timeLimitMs: source.timeLimitMs,
              autoSubmitted,
              questions: source.questions,
              answers: source.answers,
            });
        saveExamAttempt(attempt);

        try {
          await postExamResult(toExamResultRecord(attempt));
        } catch (error) {
          submittingRef.current = false;
          submitFailedRef.current = true;
          setSubmitError(
            error instanceof Error ? error.message : 'Không lưu được kết quả. Hãy thử lại.'
          );
          return;
        }

        clearExamDraft();
        router.push(`/profile/practice/attempt?id=${encodeURIComponent(attempt.id)}`);
      };

      void finish();
    },
    [isAdmin, profile.club, profile.dateOfBirth, profile.dojo, profile.name, profileComplete, router]
  );

  const startExam = useCallback(() => {
    if (!canPractice) {
      router.replace('/profile?notice=practice');
      return;
    }
    const paper = selectPracticeQuestions(
      questions.filter((question) => question.rankId === rankId)
    );
    const next = createExamDraft({
      id: createExamId(),
      mode: 'practice',
      rankId,
      beltId,
      candidate: isAdmin
        ? ADMIN_EXAM_CANDIDATE
        : {
            fullName: profile.name!.trim(),
            dateOfBirth: profile.dateOfBirth!,
            club: profile.club!.trim(),
            dojo: profile.dojo!.trim(),
          },
      startedAt: new Date().toISOString(),
      timeLimitMs: durationMinutes * 60 * 1000,
      questions: paper,
    });
    writeExamDraft(next);
    setIndex(0);
    setNow(Date.now());
    setDraft(next);
    setReady(true);
  }, [
    beltId,
    durationMinutes,
    profile.club,
    profile.dateOfBirth,
    profile.dojo,
    profile.name,
    canPractice,
    isAdmin,
    questions,
    rankId,
    router,
  ]);

  useEffect(() => {
    if (!hydrated || !adminHydrated || openedRef.current) return;
    if (!canPractice) {
      router.replace('/profile?notice=practice');
      return;
    }

    openedRef.current = true;
    const existing = readExamDraft();
    if (existing?.rankId === rankId) {
      const expireAt = new Date(existing.startedAt).getTime() + existing.timeLimitMs;
      if (Date.now() >= expireAt) {
        submitDraft(existing, true);
        return;
      }
      setDraft(existing);
      setReady(true);
      return;
    }

    startExam();
  }, [adminHydrated, canPractice, hydrated, rankId, router, startExam, submitDraft]);

  useEffect(() => {
    if (!draft) return;
    const onPageShow = () => {
      const stored = readExamDraft();
      if (!stored || stored.id !== draft.id) {
        submittingRef.current = false;
        setConfirming(false);
        router.replace('/profile/practice');
      }
    };
    window.addEventListener('pageshow', onPageShow);
    return () => window.removeEventListener('pageshow', onPageShow);
  }, [draft, router]);

  useEffect(() => {
    if (!draft) return;
    const expireAt = new Date(draft.startedAt).getTime() + draft.timeLimitMs;
    const timer = window.setInterval(() => {
      const current = Date.now();
      setNow(current);
      if (current >= expireAt && !submitFailedRef.current) submitDraft(draft, true);
    }, 250);
    return () => window.clearInterval(timer);
  }, [draft, submitDraft]);

  const remainingMs = useMemo(() => {
    if (!draft) return durationMinutes * 60 * 1000;
    const expireAt = new Date(draft.startedAt).getTime() + draft.timeLimitMs;
    return Math.max(0, expireAt - now);
  }, [draft, durationMinutes, now]);

  const updateAnswer = useCallback((answer: QuizAnswer) => {
    setDraft((current) => {
      if (!current) return current;
      const next = {
        ...current,
        answers: { ...current.answers, [answer.questionId]: answer },
      };
      writeExamDraft(next);
      return next;
    });
  }, []);

  if (!hydrated || !adminHydrated || !ready || !canPractice || !draft) {
    return (
      <div className="profile-page px-4 py-16 text-center text-sm text-text-secondary">
        Đang mở đề…
      </div>
    );
  }

  const current = draft.questions[index];
  const answeredCount = draft.questions.filter((question) =>
    isExamAnswerProvided(question, draft.answers[question.id])
  ).length;
  const hint = hintFor(current);

  return (
    <div className="profile-page relative min-h-screen px-4 py-6 lg:px-10">
      <div className="mx-auto max-w-lg">
        <div className="sticky top-0 z-10 -mx-4 mb-6 border-b border-border/70 bg-bg-primary/95 px-4 py-3 backdrop-blur-md">
          <div className="flex items-center justify-between gap-3">
            <p className="min-w-0 truncate text-sm font-medium">{fullName}</p>
            <p
              className={cn(
                'font-display text-lg tabular-nums',
                remainingMs <= 60_000 ? 'text-error' : 'text-text-primary'
              )}
              aria-live="polite"
            >
              {formatClock(remainingMs)}
            </p>
          </div>
          <p className="mt-1 text-sm text-text-secondary">
            Câu {index + 1}/{draft.questions.length} · Đã trả lời {answeredCount}
          </p>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {draft.questions.map((question, questionIndex) => {
              const answered = isExamAnswerProvided(question, draft.answers[question.id]);
              return (
                <button
                  key={question.id}
                  type="button"
                  aria-current={questionIndex === index}
                  aria-label={`Câu ${questionIndex + 1}`}
                  className={cn(
                    'h-10 w-10 shrink-0 rounded-full border text-sm',
                    questionIndex === index
                      ? 'border-unlock bg-unlock/15 text-text-primary'
                      : answered
                        ? 'border-border bg-bg-elevated text-text-primary'
                        : 'border-border text-text-muted'
                  )}
                  onClick={() => setIndex(questionIndex)}
                >
                  {questionIndex + 1}
                </button>
              );
            })}
          </div>
        </div>

        {hint && <p className="mb-3 text-sm text-text-muted">{hint}</p>}
        <h2 className="mb-6 whitespace-pre-line font-display text-xl font-semibold leading-relaxed">
          {current.question}
        </h2>
        <ExamQuestion
          question={current}
          answer={draft.answers[current.id]}
          onChange={updateAnswer}
        />

        <div className="mt-8 flex flex-col gap-3">
          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="flex-1"
              disabled={index === 0}
              onClick={() => setIndex((value) => Math.max(0, value - 1))}
            >
              Câu trước
            </Button>
            <Button
              variant="secondary"
              className="flex-1"
              disabled={index >= draft.questions.length - 1}
              onClick={() =>
                setIndex((value) => Math.min(draft.questions.length - 1, value + 1))
              }
            >
              Câu sau
            </Button>
          </div>
          {submitError && <p className="text-sm text-error">{submitError}</p>}
          <Button variant="primary" size="lg" className="w-full" onClick={() => setConfirming(true)}>
            Nộp bài
          </Button>
        </div>
      </div>

      <Modal open={confirming} onClose={() => setConfirming(false)} title="Nộp bài">
        <p className="mb-4 text-sm text-text-secondary">
          Bạn đã trả lời {answeredCount}/{draft.questions.length} câu. Sau khi nộp không sửa được đáp án.
        </p>
        {submitError && <p className="mb-4 text-sm text-error">{submitError}</p>}
        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={() => setConfirming(false)}>
            Làm tiếp
          </Button>
          <Button variant="primary" className="flex-1" onClick={() => submitDraft(draft, false)}>
            Nộp bài
          </Button>
        </div>
      </Modal>
    </div>
  );
}
