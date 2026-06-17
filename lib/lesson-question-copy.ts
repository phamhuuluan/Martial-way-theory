import {
  formatQuestionHeadingLine,
  parseQuestionHeading,
  type LessonSection,
} from '@/lib/lesson-sections';

const HIDDEN_COMPONENT_RE =
  /^<(?:VirtueCallout|BeltDivider|QuestionPreview)\b[^>]*\/?>\s*$/gm;

export function splitMdxIntoSectionBodies(
  mdxContent: string
): { title: string; body: string }[] {
  const sections: { title: string; body: string }[] = [];
  const lines = mdxContent.split('\n');
  let currentTitle: string | null = null;
  let currentBody: string[] = [];

  for (const line of lines) {
    const match = line.match(/^##\s+(.+)$/);
    if (match) {
      if (currentTitle !== null) {
        sections.push({
          title: currentTitle,
          body: currentBody.join('\n').trim(),
        });
      }
      currentTitle = match[1].trim();
      currentBody = [];
      continue;
    }

    if (currentTitle !== null) {
      currentBody.push(line);
    }
  }

  if (currentTitle !== null) {
    sections.push({
      title: currentTitle,
      body: currentBody.join('\n').trim(),
    });
  }

  return sections;
}

export function formatSectionHeadingForCopy(title: string): string {
  const parsed = parseQuestionHeading(title);
  if (parsed.isQuestion) {
    return formatQuestionHeadingLine(parsed.label, parsed.prompt);
  }
  return title;
}

function stripInlineMarkdown(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1');
}

export function mdxBodyToPlainText(body: string): string {
  let text = body.replace(HIDDEN_COMPONENT_RE, '');

  text = text.replace(
    /<Quote(?:\s+source="([^"]*)")?\s*>([\s\S]*?)<\/Quote>/gi,
    (_, source: string | undefined, content: string) => {
      const quote = mdxBodyToPlainText(content).trim();
      const attribution = source?.trim();
      if (quote && attribution) return `${quote}\n— ${attribution}`;
      return quote || attribution || '';
    }
  );

  text = text.replace(
    /<KeyPoint\s+title="([^"]*)"\s*>([\s\S]*?)<\/KeyPoint>/gi,
    (_match, title: string, content: string) => {
      const inner = mdxBodyToPlainText(content).trim();
      const heading = title.trim();
      if (heading && inner) return `${heading}\n${inner}`;
      return heading || inner;
    }
  );

  text = text.replace(
    /<Illustration[^>]*\balt="([^"]*)"[^>]*\/?>/gi,
    (_match, alt: string) => alt.trim()
  );
  text = text.replace(/<Illustration[^>]*\/?>/gi, '');

  text = stripInlineMarkdown(text);
  text = text.replace(/\n{3,}/g, '\n\n');

  return text.trim();
}

export function buildQuestionCopyText(title: string, body: string): string {
  const heading = formatSectionHeadingForCopy(title);
  const plainBody = mdxBodyToPlainText(body);
  return plainBody ? `${heading}\n\n${plainBody}` : heading;
}

export function buildLessonQuestionCopyTexts(
  mdxContent: string,
  sections: LessonSection[]
): Record<string, string> {
  const bodiesByTitle = new Map(
    splitMdxIntoSectionBodies(mdxContent).map((section) => [
      section.title,
      section.body,
    ])
  );

  const result: Record<string, string> = {};

  for (const section of sections) {
    const body = bodiesByTitle.get(section.title) ?? '';
    result[section.id] = buildQuestionCopyText(section.title, body);
  }

  return result;
}
