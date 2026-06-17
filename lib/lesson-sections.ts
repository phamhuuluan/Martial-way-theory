export interface LessonSection {
  id: string;
  title: string;
  index: number;
}

const QUESTION_HEADING_RE = /^Câu\s+(\d+)\.\s*(.*)$/i;

function normalizeQuestionPrompt(raw: string): string {
  let prompt = raw.trim();
  prompt = prompt.replace(/^Hỏi:\s*/i, '').replace(/^Hỏi\s+/i, '');
  if (prompt.endsWith(':')) {
    prompt = `${prompt.slice(0, -1)}?`;
  }
  return prompt;
}

export function parseQuestionHeading(title: string) {
  const match = title.trim().match(QUESTION_HEADING_RE);
  if (!match) {
    return {
      isQuestion: false as const,
      number: null,
      label: title,
      prompt: null as string | null,
    };
  }

  const number = match[1];
  const prompt = normalizeQuestionPrompt(match[2] ?? '');

  return {
    isQuestion: true as const,
    number: parseInt(number, 10),
    label: `Câu ${number}:`,
    prompt: prompt || null,
  };
}

/** Tiêu đề hiển thị trên trang bài học — dùng subtitle, chuẩn hóa "Đệ Nhất Cấp"… */
export function formatLessonDisplayTitle(subtitle: string, fallbackTitle = ''): string {
  const base = (subtitle || fallbackTitle).trim();
  if (/Đệ\s+(Nhất|Nhị|Tam|Tứ)\s+Cấp/.test(base)) return base;
  return base.replace(/\s(Nhất|Nhị|Tam|Tứ)\s+Cấp/g, ' Đệ $1 Cấp');
}

export function formatQuestionHeadingLine(label: string, prompt: string | null): string {
  if (!prompt) return label;
  return `${label} ${prompt}`;
}

export function parseLessonSections(mdxContent: string): LessonSection[] {
  const sections: LessonSection[] = [];
  let index = 0;

  for (const line of mdxContent.split('\n')) {
    const match = line.match(/^##\s+(.+)$/);
    if (!match) continue;

    index += 1;
    sections.push({
      id: `section-${String(index).padStart(2, '0')}`,
      title: match[1].trim(),
      index: index - 1,
    });
  }

  return sections;
}

/** Số câu lý thuyết trong bài — mỗi heading ## Câu N tương ứng một câu */
export function countLessonTheoryQuestions(mdxContent: string): number {
  return parseLessonSections(mdxContent).length;
}
