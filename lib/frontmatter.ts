import yaml from 'js-yaml';

const FRONT_MATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

export function parseFrontMatter<T extends Record<string, unknown> = Record<string, unknown>>(
  raw: string
): { data: T; content: string } {
  const match = raw.match(FRONT_MATTER_RE);
  if (!match) {
    return { data: {} as T, content: raw };
  }

  const parsed = yaml.load(match[1]);
  return {
    data: (parsed && typeof parsed === 'object' ? parsed : {}) as T,
    content: match[2],
  };
}
