import type { ExamResultQuery, ExamResultRecord } from '@/lib/exam-results';

export type ExamResultTimePreset =
  | 'today'
  | 'thisWeek'
  | 'thisMonth'
  | 'lastMonth'
  | 'thisYear'
  | 'all';

export const EXAM_RESULT_PRESETS: {
  id: ExamResultTimePreset;
  label: string;
  emptyLabel: string;
}[] = [
  { id: 'today', label: 'Hôm nay', emptyLabel: 'Không có kết quả hôm nay.' },
  { id: 'thisWeek', label: 'Tuần này', emptyLabel: 'Không có kết quả trong tuần này.' },
  { id: 'thisMonth', label: 'Tháng này', emptyLabel: 'Không có kết quả trong tháng này.' },
  { id: 'lastMonth', label: 'Tháng trước', emptyLabel: 'Không có kết quả tháng trước.' },
  { id: 'thisYear', label: 'Năm nay', emptyLabel: 'Không có kết quả trong năm nay.' },
  { id: 'all', label: 'Tất cả', emptyLabel: 'Chưa có bài luyện đề nào được nộp.' },
];

export const EXAM_RESULT_FILTER_EMPTY = 'Không có kết quả theo bộ lọc hiện tại.';
export const MISSING_CLUB_LABEL = 'Chưa có CLB';
const INVALID_DAY_KEY = 'invalid';

export interface ExamPersonGroup {
  key: string;
  fullName: string;
  clubLabel: string;
  attemptCount: number;
  attempts: ExamResultRecord[];
}

export interface ExamDayGroup {
  key: string;
  label: string;
  attemptCount: number;
  people: ExamPersonGroup[];
}

export interface ExamResultView {
  days: ExamDayGroup[];
  matchCount: number;
}

interface ViewOptions {
  preset: ExamResultTimePreset;
  query: string;
  now: Date;
  timeZone?: string;
}

interface ZonedParts {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  weekday: string;
}

const WEEKDAY_INDEX: Record<string, number> = {
  Mon: 0,
  Monday: 0,
  Tue: 1,
  Tuesday: 1,
  Wed: 2,
  Wednesday: 2,
  Thu: 3,
  Thursday: 3,
  Fri: 4,
  Friday: 4,
  Sat: 5,
  Saturday: 5,
  Sun: 6,
  Sunday: 6,
};

function zonedParts(date: Date, timeZone?: string): ZonedParts {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const map: Record<string, string> = {};
  for (const part of fmt.formatToParts(date)) {
    if (part.type !== 'literal') map[part.type] = part.value;
  }
  const hour = Number(map.hour);
  return {
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
    hour: hour === 24 ? 0 : hour,
    minute: Number(map.minute),
    second: Number(map.second),
    weekday: map.weekday ?? '',
  };
}

function timeZoneOffsetMs(instant: Date, timeZone?: string): number {
  const parts = zonedParts(instant, timeZone);
  const asUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second
  );
  return asUtc - instant.getTime();
}

function zonedMidnightUtc(year: number, month: number, day: number, timeZone?: string): Date {
  let utc = Date.UTC(year, month - 1, day, 0, 0, 0);
  for (let step = 0; step < 2; step += 1) {
    utc = Date.UTC(year, month - 1, day, 0, 0, 0) - timeZoneOffsetMs(new Date(utc), timeZone);
  }
  return new Date(utc);
}

function addCivilDays(year: number, month: number, day: number, days: number) {
  const utc = new Date(Date.UTC(year, month - 1, day + days));
  return { year: utc.getUTCFullYear(), month: utc.getUTCMonth() + 1, day: utc.getUTCDate() };
}

export function submittedDayKey(iso: string, timeZone?: string): string | null {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  const parts = zonedParts(date, timeZone);
  const month = String(parts.month).padStart(2, '0');
  const day = String(parts.day).padStart(2, '0');
  return `${parts.year}-${month}-${day}`;
}

export function formatExamDayLabel(dayKey: string, now: Date, timeZone?: string): string {
  const [year, month, day] = dayKey.split('-');
  if (!year || !month || !day) return 'Không rõ ngày';
  const display = `${day}/${month}/${year}`;
  if (dayKey === submittedDayKey(now.toISOString(), timeZone)) return `Hôm nay — ${display}`;
  return display;
}

export function examResultRange(
  preset: ExamResultTimePreset,
  now: Date,
  timeZone?: string
): ExamResultQuery {
  if (preset === 'all') return {};
  const { year, month, day, weekday } = zonedParts(now, timeZone);
  const startToday = zonedMidnightUtc(year, month, day, timeZone);

  if (preset === 'today') {
    const next = addCivilDays(year, month, day, 1);
    return {
      from: startToday.toISOString(),
      to: zonedMidnightUtc(next.year, next.month, next.day, timeZone).toISOString(),
    };
  }

  if (preset === 'thisWeek') {
    const mondayOffset = WEEKDAY_INDEX[weekday];
    if (mondayOffset === undefined) return { from: startToday.toISOString(), to: startToday.toISOString() };
    const monday = addCivilDays(year, month, day, -mondayOffset);
    const nextMonday = addCivilDays(monday.year, monday.month, monday.day, 7);
    return {
      from: zonedMidnightUtc(monday.year, monday.month, monday.day, timeZone).toISOString(),
      to: zonedMidnightUtc(nextMonday.year, nextMonday.month, nextMonday.day, timeZone).toISOString(),
    };
  }

  if (preset === 'thisMonth') {
    const nextMonth = month === 12 ? { year: year + 1, month: 1 } : { year, month: month + 1 };
    return {
      from: zonedMidnightUtc(year, month, 1, timeZone).toISOString(),
      to: zonedMidnightUtc(nextMonth.year, nextMonth.month, 1, timeZone).toISOString(),
    };
  }

  if (preset === 'lastMonth') {
    const prev = month === 1 ? { year: year - 1, month: 12 } : { year, month: month - 1 };
    return {
      from: zonedMidnightUtc(prev.year, prev.month, 1, timeZone).toISOString(),
      to: zonedMidnightUtc(year, month, 1, timeZone).toISOString(),
    };
  }

  return {
    from: zonedMidnightUtc(year, 1, 1, timeZone).toISOString(),
    to: zonedMidnightUtc(year + 1, 1, 1, timeZone).toISOString(),
  };
}

function inSubmittedRange(submittedAt: string, range: ExamResultQuery): boolean {
  const time = Date.parse(submittedAt);
  if (Number.isNaN(time)) return range.from === undefined && range.to === undefined;
  if (range.from && time < Date.parse(range.from)) return false;
  if (range.to && time >= Date.parse(range.to)) return false;
  return true;
}

function matchesQuery(record: ExamResultRecord, query: string): boolean {
  const needle = query.trim().toLocaleLowerCase('vi');
  if (!needle) return true;
  return [record.fullName, record.candidateNumber, record.club, record.dojo, record.paperName]
    .join('\n')
    .toLocaleLowerCase('vi')
    .includes(needle);
}

export function filterExamResults(records: ExamResultRecord[], options: ViewOptions): ExamResultRecord[] {
  const range = examResultRange(options.preset, options.now, options.timeZone);
  return records.filter(
    (record) => inSubmittedRange(record.submittedAt, range) && matchesQuery(record, options.query)
  );
}

function personKey(record: ExamResultRecord): string {
  return `${record.fullName.trim()}\0${record.club.trim()}`;
}

function groupPeople(records: ExamResultRecord[]): ExamPersonGroup[] {
  const buckets = new Map<string, ExamResultRecord[]>();
  for (const record of records) {
    const key = personKey(record);
    const list = buckets.get(key);
    if (list) list.push(record);
    else buckets.set(key, [record]);
  }

  const people = [...buckets.entries()].map(([key, attempts]) => {
    const sorted = [...attempts].sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
    const club = sorted[0]?.club.trim() ?? '';
    return {
      key,
      fullName: sorted[0]?.fullName.trim() ?? '',
      clubLabel: club || MISSING_CLUB_LABEL,
      attemptCount: sorted.length,
      attempts: sorted,
    };
  });

  people.sort(
    (a, b) =>
      (b.attempts[0]?.submittedAt ?? '').localeCompare(a.attempts[0]?.submittedAt ?? '') ||
      a.fullName.localeCompare(b.fullName, 'vi')
  );
  return people;
}

export function groupExamResults(
  records: ExamResultRecord[],
  options: { now: Date; timeZone?: string }
): ExamDayGroup[] {
  const buckets = new Map<string, ExamResultRecord[]>();
  for (const record of records) {
    const key = submittedDayKey(record.submittedAt, options.timeZone) ?? INVALID_DAY_KEY;
    const list = buckets.get(key);
    if (list) list.push(record);
    else buckets.set(key, [record]);
  }

  return [...buckets.keys()]
    .sort((a, b) => {
      if (a === INVALID_DAY_KEY) return 1;
      if (b === INVALID_DAY_KEY) return -1;
      return b.localeCompare(a);
    })
    .map((key) => {
      const dayRecords = buckets.get(key) ?? [];
      return {
        key,
        label: key === INVALID_DAY_KEY ? 'Không rõ ngày' : formatExamDayLabel(key, options.now, options.timeZone),
        attemptCount: dayRecords.length,
        people: groupPeople(dayRecords),
      };
    });
}

export function buildExamResultView(records: ExamResultRecord[], options: ViewOptions): ExamResultView {
  const filtered = filterExamResults(records, options);
  return {
    days: groupExamResults(filtered, options),
    matchCount: filtered.length,
  };
}

export function formatCompactDuration(ms: number): string {
  const totalSeconds = Math.max(0, Math.round(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes <= 0) return `${String(seconds).padStart(2, '0')} giây`;
  if (seconds === 0) return `${minutes} phút`;
  return `${minutes} phút ${String(seconds).padStart(2, '0')} giây`;
}

export function formatAttemptScore(score: number): string {
  const rounded = Math.round(score * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}
