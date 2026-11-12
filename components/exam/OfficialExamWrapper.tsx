'use client';

import { useEffect, useState } from 'react';
import { OfficialExamGate } from './OfficialExamGate';
import { OfficialExamSession } from './OfficialExamSession';
import type { ExamSession } from '@/lib/exam-results';
import { readExamDraft } from '@/lib/exam-draft';
import type { BeltId } from '@/types';
import type { ExamBankQuestion } from '@/types/exam';

interface OfficialExamWrapperProps {
  rankId: string;
  fullName: string;
  beltId: BeltId;
  durationMinutes: number;
  questionCount: number;
  questions: ExamBankQuestion[];
}

export function OfficialExamWrapper({
  rankId,
  fullName,
  beltId,
  durationMinutes,
  questionCount,
  questions,
}: OfficialExamWrapperProps) {
  const [session, setSession] = useState<ExamSession | null>(null);

  useEffect(() => {
    const draft = readExamDraft();
    if (draft && draft.mode === 'official' && draft.rankId === rankId) {
      setSession({
        id: draft.examSessionId || '',
        name: draft.examSessionName || '',
        status: true,
        createdAt: '',
      });
    }
  }, [rankId]);

  if (!session) {
    return <OfficialExamGate rankName={fullName} onSelectSession={setSession} />;
  }

  return (
    <OfficialExamSession
      rankId={rankId}
      fullName={fullName}
      beltId={beltId}
      durationMinutes={durationMinutes}
      questionCount={questionCount}
      questions={questions}
      examSessionId={session.id}
      examSessionName={session.name}
    />
  );
}
