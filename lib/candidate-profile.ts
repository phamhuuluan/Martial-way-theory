import { z } from 'zod';
import type { UserProfile } from '@/types';

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function isValidBirthDate(value: string, today = new Date()): boolean {
  if (!DATE_PATTERN.test(value)) return false;

  const [year, month, day] = value.split('-').map(Number);
  if (year < 1920) return false;

  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return false;
  }

  const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return date <= endOfToday;
}

export const candidateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Họ và tên phải có ít nhất 2 ký tự')
    .max(80, 'Họ và tên tối đa 80 ký tự'),
  dateOfBirth: z
    .string()
    .trim()
    .refine((value) => isValidBirthDate(value), 'Ngày sinh không hợp lệ'),
  club: z
    .string()
    .trim()
    .min(2, 'CLB phải có ít nhất 2 ký tự')
    .max(80, 'CLB tối đa 80 ký tự'),
  dojo: z
    .string()
    .trim()
    .min(2, 'Võ đường phải có ít nhất 2 ký tự')
    .max(80, 'Võ đường tối đa 80 ký tự'),
  coach: z
    .string()
    .trim()
    .min(2, 'HLV hướng dẫn phải có ít nhất 2 ký tự')
    .max(80, 'HLV hướng dẫn tối đa 80 ký tự'),
});

export type CandidateProfileInput = z.infer<typeof candidateProfileSchema>;

export function splitBirthDate(value: string): { day: string; month: string; year: string } {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return { day: '', month: '', year: '' };
  return {
    day: String(Number(match[3])),
    month: String(Number(match[2])),
    year: match[1],
  };
}

export function composeBirthDate(day: string, month: string, year: string): string {
  const d = day.replace(/\D/g, '');
  const m = month.replace(/\D/g, '');
  const y = year.replace(/\D/g, '');
  if (!d && !m && !y) return '';
  if (y.length === 4 && m.length > 0 && d.length > 0) {
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }
  return `${y}-${m}-${d}`;
}

export function readCandidateForm(form: HTMLFormElement): CandidateProfileInput {
  const data = new FormData(form);
  const fromParts = composeBirthDate(
    String(data.get('birthDay') ?? ''),
    String(data.get('birthMonth') ?? ''),
    String(data.get('birthYear') ?? '')
  );
  return {
    name: String(data.get('name') ?? ''),
    dateOfBirth: String(data.get('dateOfBirth') ?? '') || fromParts,
    club: String(data.get('club') ?? ''),
    dojo: String(data.get('dojo') ?? ''),
    coach: String(data.get('coach') ?? ''),
  };
}

export function candidateFieldErrors(
  error: z.ZodError
): Partial<Record<keyof CandidateProfileInput, string>> {
  const errors: Partial<Record<keyof CandidateProfileInput, string>> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (
      (key === 'name' ||
        key === 'dateOfBirth' ||
        key === 'club' ||
        key === 'dojo' ||
        key === 'coach') &&
      !errors[key]
    ) {
      errors[key] = issue.message;
    }
  }
  return errors;
}

export function candidateFieldError(
  field: keyof CandidateProfileInput,
  value: string
): string | undefined {
  const parsed = candidateProfileSchema.shape[field].safeParse(value);
  if (parsed.success) return undefined;
  return parsed.error.issues[0]?.message;
}

export function isCandidateProfileComplete(
  profile: Pick<UserProfile, 'name' | 'dateOfBirth' | 'club' | 'dojo' | 'coach'>
): boolean {
  return candidateProfileSchema.safeParse({
    name: profile.name ?? '',
    dateOfBirth: profile.dateOfBirth ?? '',
    club: profile.club ?? '',
    dojo: profile.dojo ?? '',
    coach: profile.coach ?? '',
  }).success;
}

export function todayDateInputValue(today = new Date()): string {
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${today.getFullYear()}-${month}-${day}`;
}
