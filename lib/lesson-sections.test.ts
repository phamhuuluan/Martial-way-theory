import { describe, expect, it } from 'vitest';
import { parseLessonSections, parseQuestionHeading, formatLessonDisplayTitle, formatQuestionHeadingLine } from '@/lib/lesson-sections';

describe('formatLessonDisplayTitle', () => {
  it('adds Đệ before cấp level in subtitle', () => {
    expect(formatLessonDisplayTitle('Lý thuyết Lam Đai Nhất Cấp')).toBe(
      'Lý thuyết Lam Đai Đệ Nhất Cấp'
    );
  });

  it('leaves titles without cấp unchanged', () => {
    expect(formatLessonDisplayTitle('Lý thuyết Đai Nâu')).toBe('Lý thuyết Đai Nâu');
  });
});

describe('formatQuestionHeadingLine', () => {
  it('joins label and prompt', () => {
    expect(formatQuestionHeadingLine('Câu 2:', 'Võ nghệ là gì?')).toBe(
      'Câu 2: Võ nghệ là gì?'
    );
  });
});

describe('parseQuestionHeading', () => {
  it('splits Câu N label and prompt', () => {
    expect(parseQuestionHeading('Câu 1. First question')).toEqual({
      isQuestion: true,
      number: 1,
      label: 'Câu 1:',
      prompt: 'First question',
    });
  });

  it('normalizes trailing colon and Hỏi prefix', () => {
    expect(parseQuestionHeading('Câu 2. Võ nghệ là gì:')).toEqual({
      isQuestion: true,
      number: 2,
      label: 'Câu 2:',
      prompt: 'Võ nghệ là gì?',
    });
  });

  it('returns plain title for non-question headings', () => {
    expect(parseQuestionHeading('Giới thiệu')).toEqual({
      isQuestion: false,
      number: null,
      label: 'Giới thiệu',
      prompt: null,
    });
  });
});

describe('parseLessonSections', () => {
  it('extracts H2 headings as ordered sections', () => {
    const content = `
<QuestionPreview number={12} />

## Câu 1. First question

Body one.

## Câu 2. Second question

Body two.
`;

    const sections = parseLessonSections(content);

    expect(sections).toHaveLength(2);
    expect(sections[0]).toEqual({
      id: 'section-01',
      title: 'Câu 1. First question',
      index: 0,
    });
    expect(sections[1]).toEqual({
      id: 'section-02',
      title: 'Câu 2. Second question',
      index: 1,
    });
  });
});
