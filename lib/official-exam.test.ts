import { describe, expect, it } from 'vitest';
import { applyPointerLeave, isOfficialExamSessionPath } from '@/lib/official-exam';

describe('official exam pointer strikes', () => {
  it('warns twice and ends the exam on the third leave', () => {
    expect(applyPointerLeave(0)).toEqual({ strikes: 1, action: 'warn' });
    expect(applyPointerLeave(1)).toEqual({ strikes: 2, action: 'warn' });
    expect(applyPointerLeave(2)).toEqual({ strikes: 3, action: 'exit' });
  });
});

describe('official exam session path', () => {
  it('matches a rank session and ignores the result page', () => {
    expect(isOfficialExamSessionPath('/exam/official/lam-1')).toBe(true);
    expect(isOfficialExamSessionPath('/exam/official/nau')).toBe(true);
    expect(isOfficialExamSessionPath('/exam/official')).toBe(false);
    expect(isOfficialExamSessionPath('/exam/official/attempt')).toBe(false);
    expect(isOfficialExamSessionPath('/exam/practice/lam-1')).toBe(false);
  });
});
