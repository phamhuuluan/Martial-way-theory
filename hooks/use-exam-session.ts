import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isCandidateProfileComplete } from '@/lib/candidate-profile';
import { getExamAttempt, saveExamAttempt } from '@/lib/exam-attempts';
import { ADMIN_EXAM_CANDIDATE, postExamResult, toExamResultRecord } from '@/lib/exam-results';
import { clearExamDraft, createExamDraft, readExamDraft, writeExamDraft } from '@/lib/exam-draft';
import { buildExamAttempt, createExamId, selectExamQuestions, selectPracticeQuestions } from '@/lib/exam-paper';
import { claimExamFinish, exitOfficialExam, officialAttemptPath, peekOfficialExamExitRedirect, releaseExamFinish } from '@/lib/official-exam';
import { useAdminStore } from '@/store/admin-store';
import { useProgressStore } from '@/store/progress-store';
import type { BeltId, UserProfile } from '@/types';
import type { ExamBankQuestion, ExamCandidateSnapshot, ExamDraft, ExamMode } from '@/types/exam';
import type { QuizAnswer } from '@/lib/quiz-engine';

export interface UseExamSessionProps {
  mode: ExamMode;
  rankId: string;
  beltId: BeltId;
  questions: ExamBankQuestion[];
  questionCount?: number;
  durationMinutes?: number;
  examSessionId?: string;
  examSessionName?: string;
}

function resolveCandidate(profile: UserProfile, isPractice: boolean): ExamCandidateSnapshot {
  return {
    fullName: profile.name!.trim(),
    dateOfBirth: profile.dateOfBirth!,
    club: profile.club!.trim(),
    dojo: profile.dojo!.trim(),
    coach: (profile.coach ?? '').trim(),
  };
}

export function useExamSession({ mode, rankId, beltId, questions, questionCount, durationMinutes, examSessionId, examSessionName }: UseExamSessionProps) {
  const router = useRouter();
  const hydrated = useProgressStore((s) => s.hydrated);
  const adminHydrated = useAdminStore((s) => s.hydrated);
  const isAdmin = useAdminStore((s) => s.isAdmin);
  const profile = useProgressStore((s) => s.progress.profile);
  
  const [draft, setDraft] = useState<ExamDraft | null>(null);
  const [ready, setReady] = useState(false);
  const [index, setIndex] = useState(0);
  const [submitError, setSubmitError] = useState('');
  
  const openedRef = useRef(false);
  const submittingRef = useRef(false);
  const submitFailedRef = useRef(false);

  const profileComplete = isCandidateProfileComplete(profile);
  const canAttempt = isAdmin || profileComplete;
  const isOfficial = mode === 'official';

  const submitDraft = useCallback(
    (source: ExamDraft, autoSubmitted: boolean) => {
      if (submittingRef.current) return;
      if (isOfficial && !claimExamFinish(source.id)) return;
      
      submittingRef.current = true;
      submitFailedRef.current = false;
      setSubmitError('');

      const finish = async () => {
        const submittedAt = new Date().toISOString();
        const candidate = isAdmin
          ? ADMIN_EXAM_CANDIDATE
          : profileComplete
            ? resolveCandidate(profile, !isOfficial)
            : source.candidate;
            
        const existingAttempt = getExamAttempt(source.id);
        const attempt = existingAttempt
          ? { ...existingAttempt, candidate, outcome: 'submitted' as const }
          : buildExamAttempt({
              id: source.id,
              mode: source.mode,
              candidate,
              rankId: source.rankId,
              beltId: source.beltId,
              startedAt: source.startedAt,
              submittedAt,
              timeLimitMs: source.timeLimitMs,
              autoSubmitted,
              questions: source.questions,
              answers: source.answers,
              examSessionId: source.examSessionId,
              examSessionName: source.examSessionName,
              outcome: 'submitted',
            });
            
        saveExamAttempt(attempt);

        try {
          await postExamResult(toExamResultRecord(attempt));
        } catch (error) {
          if (isOfficial) releaseExamFinish(source.id);
          submittingRef.current = false;
          submitFailedRef.current = true;
          setSubmitError(error instanceof Error ? error.message : 'Không lưu được kết quả. Hãy thử lại.');
          return;
        }

        clearExamDraft();
        const redirectPath = isOfficial 
            ? officialAttemptPath(attempt.id)
            : `/exam/practice/attempt?id=${encodeURIComponent(attempt.id)}`;
        router.push(redirectPath);
      };

      void finish();
    },
    [isAdmin, profile, profileComplete, router, isOfficial]
  );

  const startExam = useCallback(() => {
    if (!canAttempt) {
      router.replace('/profile?notice=practice');
      return;
    }
    const paper = isOfficial 
      ? selectExamQuestions(questions.filter((q) => q.rankId === rankId), questionCount || questions.length)
      : selectPracticeQuestions(questions.filter((q) => q.rankId === rankId));
    
    if (isOfficial && paper.length === 0) {
      router.replace('/exam/official');
      return;
    }
    
    const next = createExamDraft({
      id: createExamId(),
      mode,
      rankId,
      beltId,
      candidate: isAdmin ? ADMIN_EXAM_CANDIDATE : resolveCandidate(profile, !isOfficial),
      startedAt: new Date().toISOString(),
      timeLimitMs: isOfficial ? (durationMinutes || 0) * 60 * 1000 : 0,
      examSessionId,
      examSessionName,
      questions: paper,
    });
    
    writeExamDraft(next);
    setIndex(0);
    setDraft(next);
    setReady(true);
  }, [beltId, canAttempt, durationMinutes, isAdmin, mode, profile, questionCount, questions, rankId, router, isOfficial, examSessionId, examSessionName]);

  useEffect(() => {
    if (!hydrated || !adminHydrated || openedRef.current) return;
    if (!canAttempt) {
      router.replace('/profile?notice=practice');
      return;
    }

    openedRef.current = true;

    if (isOfficial) {
      const redirectId = peekOfficialExamExitRedirect();
      if (redirectId && getExamAttempt(redirectId)) {
        router.replace(officialAttemptPath(redirectId));
        return;
      }
    }

    const existing = readExamDraft();
    
    if (existing?.mode === mode && existing.rankId === rankId) {
      if (isOfficial) {
        const expireAt = new Date(existing.startedAt).getTime() + existing.timeLimitMs;
        if (Date.now() >= expireAt) {
          submitDraft(existing, true);
          return;
        }
        setDraft(existing);
        setReady(true);
        return;
      }
      // For practice mode, we intentionally fall through to startExam() 
      // so it always generates a fresh attempt on mount (even if back/refresh).
    }

    // if an official exam is running but we entered practice, or vice versa
    if (existing?.mode === 'official') {
      const ended = exitOfficialExam();
      if (ended) {
        router.replace(officialAttemptPath(ended.id));
        return;
      }
    }

    startExam();
  }, [adminHydrated, canAttempt, hydrated, rankId, router, startExam, submitDraft, isOfficial, mode]);

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

  return {
    draft,
    ready,
    index,
    setIndex,
    submitError,
    submitDraft,
    updateAnswer,
    submitFailedRef,
  };
}
