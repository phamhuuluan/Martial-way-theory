import type { ExamResultQuery, ExamResultRecord } from '@/lib/exam-results';

export type ExamResultTimePreset =
  | 'today'
  | 'thisWeek'
  | 'thisMonth'
  | 'selectMonth'
  | 'all';

export const EXAM_RESULT_PRESETS: {
  id: ExamResultTimePreset;
  label: string;
  emptyLabel: string;
}[] = [
  { id: 'today', label: 'Hôm nay', emptyLabel: 'Không có kết quả hôm nay.' },
  { id: 'thisWeek', label: 'Tuần này', emptyLabel: 'Không có kết quả trong tuần này.' },
  { id: 'thisMonth', label: 'Tháng này', emptyLabel: 'Không có kết quả trong tháng này.' },
  { id: 'selectMonth', label: 'Chọn tháng', emptyLabel: 'Không có kết quả trong tháng đã chọn.' },
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

export interface ExamSessionGroup {
  key: string;
  label: string;
  attemptCount: number;
  people: ExamPersonGroup[];
}

export interface ExamResultView {
  sessions: ExamSessionGroup[];
  matchCount: number;
}

interface ViewOptions {
  preset: ExamResultTimePreset;
  selectedMonth?: string;
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
  timeZone?: string,
  selectedMonth?: string
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

  if (preset === 'selectMonth' && selectedMonth) {
    const [selYear, selMonth] = selectedMonth.split('-').map(Number);
    if (selYear && selMonth) {
      const nextMonth = selMonth === 12 ? { year: selYear + 1, month: 1 } : { year: selYear, month: selMonth + 1 };
      return {
        from: zonedMidnightUtc(selYear, selMonth, 1, timeZone).toISOString(),
        to: zonedMidnightUtc(nextMonth.year, nextMonth.month, 1, timeZone).toISOString(),
      };
    }
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

function searchableBirthDate(value: string): string {
  const trimmed = value.trim();
  const [year, month, day] = trimmed.split('-');
  if (!year || !month || !day) return trimmed;
  return `${trimmed}\n${day}/${month}/${year}`;
}

function matchesQuery(record: ExamResultRecord, query: string): boolean {
  const needle = query.trim().toLocaleLowerCase('vi');
  if (!needle) return true;
  return [
    record.fullName,
    searchableBirthDate(record.dateOfBirth),
    record.candidateNumber,
    record.club,
    record.dojo,
    record.coach,
    record.paperName,
  ]
    .join('\n')
    .toLocaleLowerCase('vi')
    .includes(needle);
}

export function filterExamResults(records: ExamResultRecord[], options: ViewOptions): ExamResultRecord[] {
  const range = examResultRange(options.preset, options.now, options.timeZone, options.selectedMonth);
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
  records: ExamResultRecord[]
): ExamSessionGroup[] {
  const buckets = new Map<string, ExamResultRecord[]>();
  for (const record of records) {
    const key = record.examSessionId || 'unknown';
    const list = buckets.get(key);
    if (list) list.push(record);
    else buckets.set(key, [record]);
  }

  return [...buckets.keys()]
    .sort((a, b) => {
      if (a === 'unknown') return 1;
      if (b === 'unknown') return -1;
      const aRecords = buckets.get(a) ?? [];
      const bRecords = buckets.get(b) ?? [];
      const aMax = aRecords.reduce((max, r) => r.submittedAt > max ? r.submittedAt : max, '');
      const bMax = bRecords.reduce((max, r) => r.submittedAt > max ? r.submittedAt : max, '');
      return bMax.localeCompare(aMax);
    })
    .map((key) => {
      const sessionRecords = buckets.get(key) ?? [];
      const label = key === 'unknown' ? 'Luyện tập / Không có kỳ thi' : (sessionRecords[0]?.examSessionName || key);
      return {
        key,
        label,
        attemptCount: sessionRecords.length,
        people: groupPeople(sessionRecords),
      };
    });
}

export function buildExamResultView(records: ExamResultRecord[], options: ViewOptions): ExamResultView {
  const filtered = filterExamResults(records, options);
  return {
    sessions: groupExamResults(filtered),
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
