import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildRankBank } from './lib/exam-bank-build.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const quizDir = path.join(root, 'content', 'quizzes');
const contentDir = path.join(root, 'content');
const bankDir = path.join(contentDir, 'exam-bank');

/** Một ngân hàng cho mỗi cấp có bài lý thuyết. Khớp promotionLessonId trong lib/belt-ranks.ts. */
const RANK_LESSONS = [
  ['nau', 'brown', 'brown-lesson-01'],
  ['lam-1', 'blue', 'blue-lesson-01'],
  ['lam-2', 'blue', 'blue-lesson-02'],
  ['lam-3', 'blue', 'blue-lesson-03'],
  ['lam-4', 'blue', 'blue-lesson-04'],
  ['luc-1', 'green', 'green-lesson-01'],
  ['luc-2', 'green', 'green-lesson-02'],
  ['luc-3', 'green', 'green-lesson-03'],
  ['luc-4', 'green', 'green-lesson-04'],
  ['hong-1', 'red', 'red-lesson-01'],
  ['hong-2', 'red', 'red-lesson-02'],
  ['hong-3', 'red', 'red-lesson-03'],
  ['hong-4', 'red', 'red-lesson-04'],
  ['hoang-1', 'yellow', 'yellow-lesson-01'],
  ['hoang-2', 'yellow', 'yellow-lesson-02'],
  ['hoang-3', 'yellow', 'yellow-lesson-03'],
  ['hoang-4', 'yellow', 'yellow-lesson-04'],
  ['chuan-bach', 'white', 'white-lesson-01'],
  ['bach', 'white', 'white-lesson-02'],
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function lessonPath(lessonId) {
  const belt = lessonId.split('-')[0];
  const fileName = lessonId.slice(belt.length + 1);
  return path.join(contentDir, `${belt}-belt`, `${fileName}.mdx`);
}

fs.mkdirSync(bankDir, { recursive: true });
const written = new Set();

for (const [rankId, beltId, lessonId] of RANK_LESSONS) {
  const bank = buildRankBank({
    rankId,
    beltId,
    lessonId,
    mdx: fs.readFileSync(lessonPath(lessonId), 'utf-8'),
    quiz: readJson(path.join(quizDir, `${lessonId}.json`)),
    target: 60,
  });
  const fileName = `${rankId}.json`;
  fs.writeFileSync(path.join(bankDir, fileName), `${JSON.stringify(bank, null, 2)}\n`);
  written.add(fileName);

  const types = {};
  for (const question of bank.questions) {
    const type = question.type ?? 'single';
    types[type] = (types[type] ?? 0) + 1;
  }
  console.log(`${rankId}: ${bank.questions.length} câu ${JSON.stringify(types)}`);
}

for (const file of fs.readdirSync(bankDir)) {
  if (file.endsWith('.json') && !written.has(file)) {
    fs.unlinkSync(path.join(bankDir, file));
    console.log(`đã xóa ngân hàng cũ ${file}`);
  }
}
