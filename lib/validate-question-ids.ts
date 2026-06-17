import fs from 'fs';
import path from 'path';
import type { QuizData } from '@/types';

export interface DuplicateQuestionIdEntry {
  file: string;
  count: number;
}

export interface DuplicateQuestionIdReport {
  id: string;
  sources: DuplicateQuestionIdEntry[];
  total: number;
}

const DEFAULT_QUIZ_DIR = path.join(process.cwd(), 'content', 'quizzes');

function listQuizFiles(quizDir: string): string[] {
  if (!fs.existsSync(quizDir)) return [];

  return fs
    .readdirSync(quizDir)
    .filter((file) => file.endsWith('.json'))
    .sort();
}

export function findDuplicateQuestionIds(
  quizDir: string = DEFAULT_QUIZ_DIR
): DuplicateQuestionIdReport[] {
  const idSources = new Map<string, Map<string, number>>();

  for (const file of listQuizFiles(quizDir)) {
    const raw = fs.readFileSync(path.join(quizDir, file), 'utf-8');
    const quiz = JSON.parse(raw) as QuizData;

    for (const question of quiz.questions ?? []) {
      if (!idSources.has(question.id)) {
        idSources.set(question.id, new Map());
      }

      const fileCounts = idSources.get(question.id)!;
      fileCounts.set(file, (fileCounts.get(file) ?? 0) + 1);
    }
  }

  const duplicates: DuplicateQuestionIdReport[] = [];

  for (const [id, fileCounts] of idSources) {
    const total = [...fileCounts.values()].reduce((sum, count) => sum + count, 0);
    const hasDuplicateInFile = [...fileCounts.values()].some((count) => count > 1);
    const appearsInMultipleFiles = fileCounts.size > 1;

    if (hasDuplicateInFile || appearsInMultipleFiles) {
      duplicates.push({
        id,
        sources: [...fileCounts.entries()].map(([file, count]) => ({ file, count })),
        total,
      });
    }
  }

  return duplicates.sort((a, b) => a.id.localeCompare(b.id));
}

export function validateUniqueQuestionIds(
  quizDir: string = DEFAULT_QUIZ_DIR
): void {
  const duplicates = findDuplicateQuestionIds(quizDir);

  if (duplicates.length === 0) return;

  const lines = duplicates.map((duplicate) => {
    const locations = duplicate.sources
      .flatMap(({ file, count }) =>
        Array.from({ length: count }, () => `- ${file}`)
      )
      .join('\n');

    return `Duplicate question ID detected:\n${duplicate.id}\n\nFound in:\n${locations}`;
  });

  throw new Error(`${lines.join('\n\n')}`);
}
