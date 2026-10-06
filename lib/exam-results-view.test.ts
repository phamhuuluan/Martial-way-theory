import { describe, expect, it } from 'vitest';
import type { ExamResultRecord } from '@/lib/exam-results';
import {
  MISSING_CLUB_LABEL,
  buildExamResultView,
  examResultRange,
  formatCompactDuration,
} from '@/lib/exam-results-view';

const ZONE = 'Asia/Ho_Chi_Minh';
const NOW = new Date('2026-10-01T12:00:00.000Z');

function record(partial: Partial<ExamResultRecord> & Pick<ExamResultRecord, 'id' | 'submittedAt'>): ExamResultRecord {
  return {
    fullName: 'Nguyễn Văn A',
    candidateNumber: '',
    rankId: 'lam-1',
    paperName: 'Lam đai 1',
    score: 0,
    correctCount: 0,
    totalQuestions: 10,
    startedAt: partial.submittedAt,
    durationMs: 3000,
    club: '',
    dojo: '',
    dateOfBirth: '',
    coach: '',
    outcome: 'submitted',
    exitedAt: '',
    examSessionId: '',
    examSessionName: '',
    ...partial,
  };
}

describe('exam result ranges', () => {
  it('bounds presets on submitted local days in Vietnam', () => {
    expect(examResultRange('today', NOW, ZONE)).toEqual({
      from: '2026-09-30T17:00:00.000Z',
      to: '2026-10-01T17:00:00.000Z',
    });
    expect(examResultRange('thisWeek', NOW, ZONE)).toEqual({
      from: '2026-09-27T17:00:00.000Z',
      to: '2026-10-04T17:00:00.000Z',
    });
    expect(examResultRange('thisMonth', NOW, ZONE)).toEqual({
      from: '2026-09-30T17:00:00.000Z',
      to: '2026-10-31T17:00:00.000Z',
    });
    expect(examResultRange('lastMonth', NOW, ZONE)).toEqual({
      from: '2026-08-31T17:00:00.000Z',
      to: '2026-09-30T17:00:00.000Z',
    });
    expect(examResultRange('thisYear', NOW, ZONE)).toEqual({
      from: '2025-12-31T17:00:00.000Z',
      to: '2026-12-31T17:00:00.000Z',
    });
    expect(examResultRange('all', NOW, ZONE)).toEqual({});
  });
});

describe('exam result grouping', () => {
  const rows = [
    record({
      id: 'late-sep',
      fullName: 'Nguyễn Văn C',
      club: 'CLB X',
      submittedAt: '2026-09-30T16:00:00.000Z',
      startedAt: '2026-10-01T00:00:00.000Z',
    }),
    record({
      id: 'today-1',
      fullName: 'luan',
      club: 'Võ đường Thắng Quang',
      dojo: 'Võ đường Thắng Quang',
      submittedAt: '2026-10-01T01:00:00.000Z',
      durationMs: 3000,
      paperName: 'Tự vệ đai nâu',
    }),
    record({
      id: 'today-2',
      fullName: 'luan',
      club: 'Võ đường Thắng Quang',
      dojo: 'Võ đường khác',
      submittedAt: '2026-10-01T02:00:00.000Z',
      durationMs: 300000,
      paperName: 'Lam đai 1',
      score: 1,
    }),
    record({
      id: 'other-club',
      fullName: 'Nguyễn Văn A',
      club: 'CLB Hà Nội',
      submittedAt: '2026-10-01T03:00:00.000Z',
    }),
    record({
      id: 'thai-minh',
      fullName: 'Nguyễn Văn A',
      club: 'CLB Thái Minh',
      candidateNumber: 'HV-01',
      dateOfBirth: '2010-05-02',
      coach: 'HLV Minh',
      submittedAt: '2026-10-01T04:00:00.000Z',
    }),
    record({
      id: 'no-club',
      fullName: 'Trần Văn B',
      club: '',
      dojo: 'Võ đường không dùng làm CLB',
      submittedAt: '2026-10-01T05:00:00.000Z',
    }),
    record({
      id: 'bad-date',
      fullName: 'Lỗi ngày',
      submittedAt: 'không-phải-ngày',
    }),
  ];

  it('groups by local submitted day, then by name and club', () => {
    const view = buildExamResultView(rows, { preset: 'all', query: '', now: NOW, timeZone: ZONE });

    expect(view.days.map((day) => day.label)).toEqual([
      'Hôm nay — 01/10/2026',
      '30/09/2026',
      'Không rõ ngày',
    ]);

    const today = view.days[0];
    expect(today?.people.map((person) => `${person.fullName} · ${person.clubLabel}`)).toEqual([
      'Trần Văn B · Chưa có CLB',
      'Nguyễn Văn A · CLB Thái Minh',
      'Nguyễn Văn A · CLB Hà Nội',
      'luan · Võ đường Thắng Quang',
    ]);
    expect(today?.people[0]?.clubLabel).toBe(MISSING_CLUB_LABEL);
    expect(today?.people[3]?.attemptCount).toBe(2);
    expect(today?.people[3]?.attempts.map((attempt) => attempt.id)).toEqual(['today-2', 'today-1']);
    expect(view.days[1]?.people.map((person) => person.fullName)).toEqual(['Nguyễn Văn C']);
  });

  it('filters only on submittedAt', () => {
    const view = buildExamResultView(rows, {
      preset: 'lastMonth',
      query: '',
      now: NOW,
      timeZone: ZONE,
    });

    expect(view.days.flatMap((day) => day.people.flatMap((person) => person.attempts.map((row) => row.id)))).toEqual([
      'late-sep',
    ]);
  });

  it('searches name, birth date, student code, club, dojo, coach, and paper on the fetched rows', () => {
    const byCode = buildExamResultView(rows, {
      preset: 'all',
      query: 'hv-01',
      now: NOW,
      timeZone: ZONE,
    });
    expect(byCode.matchCount).toBe(1);
    expect(byCode.days[0]?.people[0]?.fullName).toBe('Nguyễn Văn A');
    expect(byCode.days[0]?.people[0]?.clubLabel).toBe('CLB Thái Minh');

    const byPaper = buildExamResultView(rows, {
      preset: 'today',
      query: 'tự vệ',
      now: NOW,
      timeZone: ZONE,
    });
    expect(byPaper.days[0]?.people[0]?.attempts.map((row) => row.id)).toEqual(['today-1']);

    const byDojo = buildExamResultView(rows, {
      preset: 'all',
      query: 'không dùng',
      now: NOW,
      timeZone: ZONE,
    });
    expect(byDojo.days[0]?.people[0]?.fullName).toBe('Trần Văn B');

    const byCoach = buildExamResultView(rows, {
      preset: 'all',
      query: 'hlv minh',
      now: NOW,
      timeZone: ZONE,
    });
    expect(byCoach.days[0]?.people[0]?.attempts.map((row) => row.id)).toEqual(['thai-minh']);

    const byBirthDate = buildExamResultView(rows, {
      preset: 'all',
      query: '02/05/2010',
      now: NOW,
      timeZone: ZONE,
    });
    expect(byBirthDate.days[0]?.people[0]?.attempts.map((row) => row.id)).toEqual(['thai-minh']);
  });
});

describe('compact duration', () => {
  it('shortens the attempt summary', () => {
    expect(formatCompactDuration(3000)).toBe('03 giây');
    expect(formatCompactDuration(300000)).toBe('5 phút');
    expect(formatCompactDuration(65000)).toBe('1 phút 05 giây');
  });
});
