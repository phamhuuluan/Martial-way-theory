'use client';

import { useMemo, useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { ExamQuestion } from '@/components/exam/ExamQuestion';
import { useExamPointerGuard } from '@/hooks/use-exam-pointer-guard';
import { useFinePointer } from '@/hooks/use-coarse-pointer';
import { useExamSession } from '@/hooks/use-exam-session';
import { formatClock, isExamAnswerProvided } from '@/lib/exam-paper';
import { exitOfficialExam, officialAttemptPath } from '@/lib/official-exam';
import type { BeltId } from '@/types';
import type { ExamBankQuestion } from '@/types/exam';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface OfficialExamSessionProps {
  rankId: string;
  fullName: string;
  beltId: BeltId;
  durationMinutes: number;
  questionCount: number;
  questions: ExamBankQuestion[];
  examSessionId?: string;
  examSessionName?: string;
}

export function OfficialExamSession({
  rankId,
  fullName,
  beltId,
  durationMinutes,
  questionCount,
  questions,
  examSessionId,
  examSessionName,
}: OfficialExamSessionProps) {
  const router = useRouter();
  const finePointer = useFinePointer();
  
  const {
    draft,
    ready,
    index,
    setIndex,
    submitError,
    submitDraft,
    updateAnswer,
    submitFailedRef,
  } = useExamSession({
    mode: 'official',
    rankId,
    beltId,
    questions,
    questionCount,
    durationMinutes,
    examSessionId,
    examSessionName,
  });

  const [confirmingSubmit, setConfirmingSubmit] = useState(false);
  const [pointerWarning, setPointerWarning] = useState(0);
  const [warningCountdown, setWarningCountdown] = useState(10);
  const [ending, setEnding] = useState(false);
  const [zone, setZone] = useState<HTMLDivElement | null>(null);
  const [now, setNow] = useState(() => Date.now());

  const finishLeftExam = () => {
    const attempt = exitOfficialExam();
    if (!attempt) return;
    setEnding(true);
    router.replace(officialAttemptPath(attempt.id));
  };

  useExamPointerGuard(
    zone,
    finePointer && pointerWarning === 0 && !confirmingSubmit && !ending && !!draft,
    (strike) => setPointerWarning(strike),
    finishLeftExam
  );

  useEffect(() => {
    if (pointerWarning > 0) {
      setWarningCountdown(10);
      const timer = window.setInterval(() => {
        setWarningCountdown((prev) => {
          if (prev <= 1) {
            window.clearInterval(timer);
            setTimeout(() => finishLeftExam(), 0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => window.clearInterval(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pointerWarning]);

  useEffect(() => {
    if (!draft) return;
    const expireAt = new Date(draft.startedAt).getTime() + draft.timeLimitMs;
    const timer = window.setInterval(() => {
      const current = Date.now();
      setNow(current);
      if (current >= expireAt && !submitFailedRef.current) submitDraft(draft, true);
    }, 250);
    return () => window.clearInterval(timer);
  }, [draft, submitDraft, submitFailedRef]);

  // Handle history popstate for official exams
  useEffect(() => {
    if (!draft) return;
    const markerKey = `pqq-official-history:${draft.id}`;
    let alreadyMarked = false;
    try {
      alreadyMarked = window.sessionStorage.getItem(markerKey) === '1';
      if (!alreadyMarked) window.sessionStorage.setItem(markerKey, '1');
    } catch {
      alreadyMarked = false;
    }
    if (!alreadyMarked) {
      try {
        window.history.pushState({ officialExam: draft.id }, '');
      } catch {}
    }

    const onPop = () => finishLeftExam();
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest('a');
      if (!anchor || (anchor.target && anchor.target !== '_self')) return;
      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#')) return;
      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      event.preventDefault();
      event.stopPropagation();
      finishLeftExam();
    };

    const onVisibilityChange = () => {
      if (document.hidden) finishLeftExam();
    };

    window.addEventListener('popstate', onPop);
    document.addEventListener('click', onClick, true);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      window.removeEventListener('popstate', onPop);
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft]);

  const remainingMs = useMemo(() => {
    if (!draft) return durationMinutes * 60 * 1000;
    const expireAt = new Date(draft.startedAt).getTime() + draft.timeLimitMs;
    return Math.max(0, expireAt - now);
  }, [draft, durationMinutes, now]);

  if (ending || !ready || !draft) {
    return (
      <div className="profile-page px-4 py-16 text-center text-sm text-text-secondary">
        {ending ? 'Đang kết thúc bài thi…' : 'Đang mở đề thi…'}
      </div>
    );
  }

  const current = draft.questions[index];
  const answeredCount = draft.questions.filter((question) =>
    isExamAnswerProvided(question, draft.answers[question.id])
  ).length;

  return (
    <div className="profile-page relative min-h-screen px-4 py-6 lg:px-10">
      <div
        ref={setZone}
        data-exam-safe-zone={finePointer ? 'true' : 'false'}
        className={cn(
          'mx-auto max-w-lg',
          finePointer && 'rounded-[var(--radius-lg)] border-2 border-dashed border-unlock/70 p-4'
        )}
      >
        {finePointer && (
          <p className="mb-3 text-sm text-text-muted">
            Giữ chuột trong khung này. Lần rời khung thứ 3 sẽ kết thúc bài thi.
          </p>
        )}
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
          <Button variant="primary" size="lg" className="w-full" onClick={() => setConfirmingSubmit(true)}>
            Nộp bài
          </Button>
        </div>

        <Modal open={pointerWarning > 0} onClose={() => setPointerWarning(0)} title="Cảnh báo">
          <p className="mb-4 text-sm text-text-secondary">
            Chuột đã rời vùng làm bài. Đây là cảnh báo lần {pointerWarning}. Lần thứ 3 bài thi sẽ kết thúc ngay.
            <br />
            <br />
            <span className="font-medium text-error">
              Bài thi sẽ tự động kết thúc sau {warningCountdown}s nếu bạn không tiếp tục.
            </span>
          </p>
          <Button variant="primary" className="w-full" onClick={() => setPointerWarning(0)}>
            Tiếp tục làm bài
          </Button>
        </Modal>

        <Modal open={confirmingSubmit} onClose={() => setConfirmingSubmit(false)} title="Nộp bài">
          <p className="mb-4 text-sm text-text-secondary">
            Bạn đã trả lời {answeredCount}/{draft.questions.length} câu. Sau khi nộp không sửa được đáp án.
          </p>
          {submitError && <p className="mb-4 text-sm text-error">{submitError}</p>}
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setConfirmingSubmit(false)}>
              Làm tiếp
            </Button>
            <Button variant="primary" className="flex-1" onClick={() => submitDraft(draft, false)}>
              Nộp bài
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
