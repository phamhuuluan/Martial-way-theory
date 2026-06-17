/**
 * Regenerate quiz JSON from existing MDX lesson files.
 * Run: node scripts/regenerate-quizzes.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseQuestionsFromMdx } from './lib/mdx-parser.mjs';
import { buildQuiz } from './lib/quiz-builder.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const MANIFEST_PATH = path.join(ROOT, 'content', 'manifest.json');

function loadManifest() {
  return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
}

function main() {
  const manifest = loadManifest();
  let regenerated = 0;

  for (const lesson of manifest) {
    const mdxPath = path.join(ROOT, lesson.mdxPath);
    const quizPath = path.join(ROOT, lesson.quizPath);

    if (!fs.existsSync(mdxPath)) {
      console.warn(`Skip ${lesson.id}: MDX not found at ${lesson.mdxPath}`);
      continue;
    }

    const mdxContent = fs.readFileSync(mdxPath, 'utf-8');
    const parsedQuestions = parseQuestionsFromMdx(mdxContent);

    if (parsedQuestions.length === 0) {
      console.warn(`Skip ${lesson.id}: no questions parsed from MDX`);
      continue;
    }

    const quiz = buildQuiz(
      {
        id: lesson.id,
        title: lesson.title,
      },
      parsedQuestions
    );

    fs.mkdirSync(path.dirname(quizPath), { recursive: true });
    fs.writeFileSync(quizPath, `${JSON.stringify(quiz, null, 2)}\n`, 'utf-8');
    regenerated += 1;
    console.log(
      `${lesson.id}: ${parsedQuestions.length} source → ${quiz.questions.length} quiz questions`
    );
  }

  console.log(`\nRegenerated ${regenerated} quiz file(s).`);
}

main();
