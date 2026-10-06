'use client';

import { useState, useEffect } from 'react';
import { OfficialExamGate } from './OfficialExamGate';
import { OfficialExamSession } from './OfficialExamSession';
import type { ExamSession } from '@/lib/exam-results';
import { readExamDraft } from '@/lib/exam-draft';

export function OfficialExamWrapper(props: any) {
  const [session, setSession] = useState<ExamSession | null>(null);

  useEffect(() => {
    // If there's an active official exam draft, we shouldn't prompt for the gate again
    // We can infer the session from the draft if it exists, or let it bypass if the draft already has it.
    const draft = readExamDraft();
    if (draft && draft.mode === 'official' && draft.rankId === props.rankId) {
      setSession({
        id: draft.examSessionId || '',
        name: draft.examSessionName || '',
        status: true,
        createdAt: ''
      });
    }
  }, [props.rankId]);

  if (!session) {
    return <OfficialExamGate rankName={props.fullName} onSelectSession={setSession} />;
  }

  return (
    <OfficialExamSession 
      {...props} 
      examSessionId={session.id} 
      examSessionName={session.name} 
    />
  );
}
