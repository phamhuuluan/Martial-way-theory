import { describe, expect, it } from 'vitest';
import {
  buildLessonQuestionCopyTexts,
  buildQuestionCopyText,
  mdxBodyToPlainText,
} from '@/lib/lesson-question-copy';
import { parseLessonSections } from '@/lib/lesson-sections';

describe('mdxBodyToPlainText', () => {
  it('removes hidden components and keeps paragraphs', () => {
    const body = `
Paragraph one.

<VirtueCallout virtue="chính-trực" />

Paragraph two.
`.trim();

    expect(mdxBodyToPlainText(body)).toBe('Paragraph one.\n\nParagraph two.');
  });

  it('formats quotes and key points', () => {
    const body = `
<KeyPoint title="Ghi nhớ">
- Point one
- Point two
</KeyPoint>

<Quote source="Sư phụ">
Học đi đôi với hành.
</Quote>
`.trim();

    expect(mdxBodyToPlainText(body)).toBe(
      'Ghi nhớ\n- Point one\n- Point two\n\nHọc đi đôi với hành.\n— Sư phụ'
    );
  });

  it('strips inline markdown emphasis', () => {
    expect(mdxBodyToPlainText('This is **important** text.')).toBe(
      'This is important text.'
    );
  });
});

describe('buildQuestionCopyText', () => {
  it('normalizes heading and includes body', () => {
    const text = buildQuestionCopyText(
      'Câu 1. Hỏi: Thống nhất chỉ huy là gì:',
      'Thống nhất chỉ huy là việc điều hành.'
    );

    expect(text).toBe(
      'Câu 1: Thống nhất chỉ huy là gì?\n\nThống nhất chỉ huy là việc điều hành.'
    );
  });
});

describe('buildLessonQuestionCopyTexts', () => {
  it('maps section ids to full copy text from mdx source', () => {
    const content = `
<QuestionPreview />

## Câu 1. Hỏi: First question:

Body one.

<VirtueCallout virtue="chính-trực" />

## Câu 2. Second question

Body two.
`.trim();

    const sections = parseLessonSections(content);
    const copyTexts = buildLessonQuestionCopyTexts(content, sections);

    expect(copyTexts['section-01']).toBe(
      'Câu 1: First question?\n\nBody one.'
    );
    expect(copyTexts['section-02']).toBe(
      'Câu 2: Second question\n\nBody two.'
    );
  });
});
