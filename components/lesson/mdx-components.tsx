'use client';

import { useLessonSectionContext } from '@/components/lesson/LessonSectionContext';
import { QuestionCopyButton } from '@/components/lesson/QuestionCopyButton';
import { normalizeSectionTitle } from '@/lib/lesson-section-tracking';
import { parseQuestionHeading } from '@/lib/lesson-sections';

function getHeadingText(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) {
    return children.map(getHeadingText).join('');
  }
  if (children && typeof children === 'object' && 'props' in children) {
    return getHeadingText(
      (children as React.ReactElement<{ children?: React.ReactNode }>).props
        .children
    );
  }
  return '';
}

function SectionHeading({
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  const ctx = useLessonSectionContext();
  const headingText = normalizeSectionTitle(getHeadingText(children));
  const section = ctx?.sections.find(
    (item) => normalizeSectionTitle(item.title) === headingText
  );
  const id = section?.id;
  const isFirstSection = ctx?.sections[0]?.id === id;
  const parsed = parseQuestionHeading(headingText);

  const className = [
    'lesson-question',
    isFirstSection ? 'lesson-question--first' : 'lesson-question--follow',
  ].join(' ');

  const content = parsed.isQuestion ? (
    <span className="lesson-question__text">
      {parsed.prompt ? `${parsed.label} ${parsed.prompt}` : parsed.label}
    </span>
  ) : (
    <span className="lesson-question__text">{headingText}</span>
  );

  if (!id) {
    return (
      <h2 className={className} {...props}>
        {content}
      </h2>
    );
  }

  return (
    <h2 id={id} data-section-id={id} className={className} {...props}>
      <span className="lesson-question__row">
        {content}
        {parsed.isQuestion && <QuestionCopyButton sectionId={id} />}
      </span>
    </h2>
  );
}

export function VirtueCallout(_props: { virtue: string }) {
  return null;
}

export function QuestionPreview({ number }: { number?: number }) {
  const ctx = useLessonSectionContext();
  const count = ctx?.questionsCount ?? number ?? 0;

  return (
    <p className="lesson-question-preview">
      Bài kiểm tra gồm <strong>{count} câu hỏi</strong>. Đọc kỹ từng câu lý thuyết
      trước khi làm bài.
    </p>
  );
}

export function Quote({
  children,
  source,
}: {
  children: React.ReactNode;
  source?: string;
}) {
  return (
    <figure className="lesson-quote">
      <blockquote className="lesson-quote__text">{children}</blockquote>
      {source && <figcaption className="lesson-quote__source">— {source}</figcaption>}
    </figure>
  );
}

export function BeltDivider() {
  return null;
}

export function KeyPoint({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="lesson-key-point">
      <p className="lesson-key-point__title">{title}</p>
      <div className="lesson-key-point__body">{children}</div>
    </div>
  );
}

export function Illustration({
  src,
  alt,
}: {
  src: string;
  alt: string;
  parallax?: boolean;
}) {
  return (
    <figure className="lesson-illustration">
      <img src={src} alt={alt} className="h-auto w-full" loading="lazy" />
    </figure>
  );
}

export const mdxComponents = {
  VirtueCallout,
  QuestionPreview,
  Quote,
  BeltDivider,
  KeyPoint,
  Illustration,
  h2: SectionHeading,
};
