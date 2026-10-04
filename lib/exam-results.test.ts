import { describe, expect, it } from 'vitest';
import {
  ADMIN_EXAM_CANDIDATE,
  examResultsCallbackUrl,
  parseExamResults,
  toExamResultRecord,
} from '@/lib/exam-results';
import type { ExamAttempt } from '@/types/exam';

function attempt(partial: Partial<ExamAttempt> = {}): ExamAttempt {
  return {
    id: 'attempt-1',
    mode: 'practice',
    candidate: {
      fullName: 'Nguyễn Văn An',
      dateOfBirth: '2010-05-02',
      club: 'CLB Phật Quang',
      dojo: 'Võ đường Phật Quang',
      coach: 'Nguyễn Văn HLV',
    },
    rankId: 'lam-1',
    beltId: 'blue',
    startedAt: '2026-01-01T00:00:00.000Z',
    submittedAt: '2026-01-01T00:10:00.000Z',
    durationMs: 600000,
    timeLimitMs: 1200000,
    autoSubmitted: false,
    totalQuestions: 10,
    correctCount: 8,
    incorrectCount: 2,
    unansweredCount: 0,
    score: 8,
    questions: [],
    ...partial,
  };
}

describe('exam results', () => {
  it('maps a practice attempt and leaves a missing student code blank', () => {
    expect(toExamResultRecord(attempt())).toMatchObject({
      id: 'attempt-1',
      fullName: 'Nguyễn Văn An',
      candidateNumber: '',
      rankId: 'lam-1',
      correctCount: 8,
      totalQuestions: 10,
      score: 8,
      durationMs: 600000,
    });
    expect(toExamResultRecord(attempt()).paperName.length).toBeGreaterThan(0);
    expect(toExamResultRecord(attempt()).club).toBe('CLB Phật Quang');
    expect(toExamResultRecord(attempt()).dojo).toBe('Võ đường Phật Quang');
    expect(toExamResultRecord(attempt()).dateOfBirth).toBe('2010-05-02');
    expect(toExamResultRecord(attempt()).coach).toBe('Nguyễn Văn HLV');
  });

  it('keeps a student code when the attempt has one', () => {
    const record = toExamResultRecord(
      attempt({
        candidate: {
          fullName: 'Nguyễn Văn An',
          dateOfBirth: '2010-05-02',
          club: 'CLB Phật Quang',
          dojo: 'Võ đường Phật Quang',
          coach: 'Nguyễn Văn HLV',
          candidateNumber: 'HV-01',
        },
      })
    );
    expect(record.candidateNumber).toBe('HV-01');
  });

  it('sends an admin practice attempt as admin', () => {
    const record = toExamResultRecord(
      attempt({
        candidate: ADMIN_EXAM_CANDIDATE,
      })
    );
    expect(record.fullName).toBe('admin');
    expect(record.candidateNumber).toBe('admin');
    expect(record.club).toBe('');
    expect(record.dojo).toBe('');
    expect(record.dateOfBirth).toBe('');
    expect(record.coach).toBe('');
  });

  it('parses a results payload and sorts newest first', () => {
    const rows = parseExamResults({
      results: [
        {
          id: 'a',
          fullName: 'An',
          candidateNumber: '',
          rankId: 'lam-1',
          paperName: 'Lam đai 1',
          score: '8',
          correctCount: 8,
          totalQuestions: 10,
          startedAt: '2026-01-01T00:00:00.000Z',
          submittedAt: '2026-01-01T00:10:00.000Z',
          durationMs: 600000,
        },
        {
          id: 'b',
          fullName: 'Bình',
          candidateNumber: 'HV-02',
          rankId: 'lam-1',
          paperName: 'Lam đai 1',
          score: 9,
          correctCount: 9,
          totalQuestions: 10,
          startedAt: '2026-02-01T00:00:00.000Z',
          submittedAt: '2026-02-01T00:10:00.000Z',
          durationMs: 500000,
          dateOfBirth: '2012-03-04',
          coach: 'HLV Bình',
        },
      ],
    });

    expect(rows.map((row) => row.id)).toEqual(['b', 'a']);
    expect(rows[1]?.score).toBe(8);
    expect(rows[0]?.candidateNumber).toBe('HV-02');
    expect(rows[0]?.club).toBe('');
    expect(rows[0]?.dojo).toBe('');
    expect(rows[0]?.dateOfBirth).toBe('2012-03-04');
    expect(rows[0]?.coach).toBe('HLV Bình');
    expect(rows[1]?.dateOfBirth).toBe('');
    expect(rows[1]?.coach).toBe('');
  });

  it('adds a jsonp callback without dropping the web app path', () => {
    expect(
      examResultsCallbackUrl(
        'https://script.google.com/macros/s/abc/exec',
        'pqqExamResults_1'
      )
    ).toBe('https://script.google.com/macros/s/abc/exec?callback=pqqExamResults_1');
    expect(
      examResultsCallbackUrl('https://script.google.com/macros/s/abc/exec', 'pqqExamResults_1', {
        from: '2026-09-30T17:00:00.000Z',
        to: '2026-10-01T17:00:00.000Z',
      })
    ).toBe(
      'https://script.google.com/macros/s/abc/exec?callback=pqqExamResults_1&from=2026-09-30T17%3A00%3A00.000Z&to=2026-10-01T17%3A00%3A00.000Z'
    );
  });

  it('accepts an empty list and rejects a payload that is not a list', () => {
    expect(parseExamResults({ results: [] })).toEqual([]);
    expect(() => parseExamResults({ ok: true })).toThrow('Dữ liệu kết quả không hợp lệ.');
    expect(() => parseExamResults({ results: [{ id: 'x' }] })).toThrow(
      'Dữ liệu kết quả không hợp lệ.'
    );
  });
});
