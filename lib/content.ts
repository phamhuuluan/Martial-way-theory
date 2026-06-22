import fs from 'fs';
import path from 'path';
import { parseFrontMatter } from '@/lib/frontmatter';
import lessonManifest from '@/content/manifest.json';
import type { BeltId, LessonMeta, QuizData } from '@/types';
import { BELT_WORLDS } from '@/lib/constants';
import { validateUniqueQuestionIds } from '@/lib/validate-question-ids';
import { countLessonTheoryQuestions } from '@/lib/lesson-sections';

type ManifestEntry = {
  belt: BeltId;
  lessonSlug: string;
  id: string;
};

const LESSON_MANIFEST = lessonManifest as ManifestEntry[];

if (process.env.NODE_ENV === 'development') {
  validateUniqueQuestionIds();
}

const CONTENT_DIR = path.join(process.cwd(), 'content');
const QUIZ_DIR = path.join(CONTENT_DIR, 'quizzes');

export function getAllBelts(): BeltId[] {
  return BELT_WORLDS.map((b) => b.id);
}

export function getAllLessonParams(): { belt: BeltId; lesson: string }[] {
  return LESSON_MANIFEST.map((entry) => ({
    belt: entry.belt,
    lesson: entry.lessonSlug,
  }));
}

function enrichLessonMeta(
  data: Omit<LessonMeta, 'lessonSlug' | 'quizQuestionsCount'>,
  lessonSlug: string,
  mdxContent: string
): LessonMeta {
  const quiz = getQuizData(data.id);
  const theoryCount = countLessonTheoryQuestions(mdxContent);

  return {
    ...data,
    lessonSlug,
    questionsCount: theoryCount > 0 ? theoryCount : data.questionsCount,
    quizQuestionsCount: quiz?.questions.length ?? 0,
  };
}

export function getLessonMeta(belt: BeltId, lessonSlug: string): LessonMeta | null {
  const filePath = path.join(CONTENT_DIR, `${belt}-belt`, `${lessonSlug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = parseFrontMatter(raw);

  return enrichLessonMeta(
    data as Omit<LessonMeta, 'lessonSlug' | 'quizQuestionsCount'>,
    lessonSlug,
    content
  );
}

export function getLessonContent(belt: BeltId, lessonSlug: string): {
  meta: LessonMeta;
  content: string;
} | null {
  const filePath = path.join(CONTENT_DIR, `${belt}-belt`, `${lessonSlug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = parseFrontMatter(raw);

  return {
    meta: enrichLessonMeta(
      data as Omit<LessonMeta, 'lessonSlug' | 'quizQuestionsCount'>,
      lessonSlug,
      content
    ),
    content,
  };
}

export function getLessonId(belt: BeltId, lessonSlug: string): string {
  return `${belt}-${lessonSlug}`;
}

export function getQuizData(lessonId: string): QuizData | null {
  const filePath = path.join(QUIZ_DIR, `${lessonId}.json`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as QuizData;
}

export function getAllLessons(): LessonMeta[] {
  const lessons: LessonMeta[] = [];

  for (const belt of BELT_WORLDS) {
    for (const lessonId of belt.lessons) {
      const slug = lessonId.replace(`${belt.id}-`, '');
      const meta = getLessonMeta(belt.id, slug);
      if (meta) lessons.push(meta);
    }
  }

  return lessons.sort((a, b) => a.order - b.order);
}

export function getLessonsForBelt(belt: BeltId): LessonMeta[] {
  const world = BELT_WORLDS.find((b) => b.id === belt);
  if (!world) return [];

  return world.lessons
    .map((id) => {
      const slug = id.replace(`${belt}-`, '');
      return getLessonMeta(belt, slug);
    })
    .filter((m): m is LessonMeta => m !== null);
}
