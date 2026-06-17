/**
 * Converts assets/doc docx files to content MDX and quiz JSON
 * Run: node scripts/convert-content.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseQuestionsFromParagraphs } from './lib/content-parser.mjs';
import { buildQuiz } from './lib/quiz-builder.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DOC_DIR = path.join(ROOT, 'assets', 'doc');
const CONTENT_DIR = path.join(ROOT, 'content');
const QUIZ_DIR = path.join(CONTENT_DIR, 'quizzes');

const LESSON_MAP = [
  {
    file: '1-ĐAI NÂU THI LÊN LAM ĐAI 1 chỉnh tháng 6 năm 2026.docx',
    belt: 'brown',
    lessonSlug: 'lesson-01',
    id: 'brown-lesson-01',
    title: 'Đai Nâu',
    subtitle: 'Lý thuyết thi thăng cấp Lam Đai 1',
    virtues: ['giản-dị', 'bền-bỉ', 'khiêm-cung'],
    order: 1,
    prerequisites: [],
  },
  {
    file: '2 - LAM ĐAI 1 THI LÊN LAM ĐAI 2 6.9.2026.pdf.docx',
    belt: 'blue',
    lessonSlug: 'lesson-01',
    id: 'blue-lesson-01',
    title: 'Lam Đai Nhất Cấp',
    subtitle: 'Lý thuyết thi thăng cấp Lam Đai Nhị Cấp',
    virtues: ['khiêm-hạ', 'nhẫn-nhục'],
    order: 2,
    prerequisites: ['brown-lesson-01'],
  },
  {
    file: '3-LAM ĐAI 2 THI LÊN LAM ĐAI 3 chỉnh 9.6.2026.pdf.docx',
    belt: 'blue',
    lessonSlug: 'lesson-02',
    id: 'blue-lesson-02',
    title: 'Lam Đai Nhị Cấp',
    subtitle: 'Lý thuyết thi thăng cấp Lam Đai Tam Cấp',
    virtues: ['khiêm-hạ', 'nhẫn-nhục'],
    order: 3,
    prerequisites: ['blue-lesson-01'],
  },
  {
    file: '4 - LAM ĐAI 3 THI LÊN LAM ĐAI 4 chỉnh 9.6.2026.pdf.docx',
    belt: 'blue',
    lessonSlug: 'lesson-03',
    id: 'blue-lesson-03',
    title: 'Lam Đai Tam Cấp',
    subtitle: 'Lý thuyết thi thăng cấp Lam Đai Tứ Cấp',
    virtues: ['khiêm-hạ', 'nhẫn-nhục'],
    order: 4,
    prerequisites: ['blue-lesson-02'],
  },
  {
    file: '5 - LAM ĐAI 4 THI LÊN LỤC ĐAI 1 chỉnh 9.6.2026.pdf.docx',
    belt: 'blue',
    lessonSlug: 'lesson-04',
    id: 'blue-lesson-04',
    title: 'Lam Đai Tứ Cấp',
    subtitle: 'Lý thuyết thi thăng cấp Lục Đai Nhất Cấp',
    virtues: ['khiêm-hạ', 'nhẫn-nhục'],
    order: 5,
    prerequisites: ['blue-lesson-03'],
  },
  {
    file: '6- LỤC ĐAI 1 THI LÊN LỤC ĐAI 2 chỉnh 9.6.2026.pdf.docx',
    belt: 'green',
    lessonSlug: 'lesson-01',
    id: 'green-lesson-01',
    title: 'Lục Đai Nhất Cấp',
    subtitle: 'Lý thuyết thi thăng cấp Lục Đai Nhị Cấp',
    virtues: ['siêng-năng', 'vươn-lên'],
    order: 6,
    prerequisites: ['blue-lesson-04'],
  },
  {
    file: '7- LỤC ĐAI 2 THI LÊN LỤC ĐAI 3 chỉnh 9.6.2026.pdf.docx',
    belt: 'green',
    lessonSlug: 'lesson-02',
    id: 'green-lesson-02',
    title: 'Lục Đai Nhị Cấp',
    subtitle: 'Lý thuyết thi thăng cấp Lục Đai Tam Cấp',
    virtues: ['siêng-năng', 'vươn-lên'],
    order: 7,
    prerequisites: ['green-lesson-01'],
  },
  {
    file: '8-  LỤC ĐAI 3 THI LÊN LỤC ĐAI 4 sửa 9.6.2026.pdf.docx',
    belt: 'green',
    lessonSlug: 'lesson-03',
    id: 'green-lesson-03',
    title: 'Lục Đai Tam Cấp',
    subtitle: 'Lý thuyết thi thăng cấp Lục Đai Tứ Cấp',
    virtues: ['siêng-năng', 'vươn-lên'],
    order: 8,
    prerequisites: ['green-lesson-02'],
  },
  {
    file: '9- LỤC ĐAI 4 THI LÊN HỒNG ĐAI 1 chỉnh 9.6.2026.pdf.docx',
    belt: 'green',
    lessonSlug: 'lesson-04',
    id: 'green-lesson-04',
    title: 'Lục Đai Tứ Cấp',
    subtitle: 'Lý thuyết thi thăng cấp Hồng Đai Nhất Cấp',
    virtues: ['siêng-năng', 'vươn-lên'],
    order: 9,
    prerequisites: ['green-lesson-03'],
  },
  {
    file: '10- HỒNG ĐAI 1 THI LÊN HỒNG ĐAI 2 chỉnh 9.6.2026.pdf.docx',
    belt: 'red',
    lessonSlug: 'lesson-01',
    id: 'red-lesson-01',
    title: 'Hồng Đai Nhất Cấp',
    subtitle: 'Lý thuyết thi thăng cấp Hồng Đai Nhị Cấp',
    virtues: ['dũng-cảm'],
    order: 10,
    prerequisites: ['green-lesson-04'],
  },
  {
    file: '11- HỒNG ĐAI 2 THI LÊN HỒNG ĐAI 3 chỉnh 9.6.2026.pdf.docx',
    belt: 'red',
    lessonSlug: 'lesson-02',
    id: 'red-lesson-02',
    title: 'Hồng Đai Nhị Cấp',
    subtitle: 'Lý thuyết thi thăng cấp Hồng Đai Tam Cấp',
    virtues: ['dũng-cảm'],
    order: 11,
    prerequisites: ['red-lesson-01'],
  },
  {
    file: '12- HỒNG ĐAI 3 THI LÊN HỒNG ĐAI 4 CHỈNH 9.6.2026.pdf.docx',
    belt: 'red',
    lessonSlug: 'lesson-03',
    id: 'red-lesson-03',
    title: 'Hồng Đai Tam Cấp',
    subtitle: 'Lý thuyết thi thăng cấp Hồng Đai Tứ Cấp',
    virtues: ['dũng-cảm'],
    order: 12,
    prerequisites: ['red-lesson-02'],
  },
  {
    file: '13- HỒNG ĐAI 4 LÊN HOÀNG ĐAI 1 chỉnh 9.6.2026.pdf.docx',
    belt: 'red',
    lessonSlug: 'lesson-04',
    id: 'red-lesson-04',
    title: 'Hồng Đai Tứ Cấp',
    subtitle: 'Lý thuyết thi thăng cấp Hoàng Đai Nhất Cấp',
    virtues: ['dũng-cảm'],
    order: 13,
    prerequisites: ['red-lesson-03'],
  },
  {
    file: '14- HOÀNG ĐAI 1 THI LÊN HOÀNG ĐAI 2 chỉnh 9.6.2026.pdf.docx',
    belt: 'yellow',
    lessonSlug: 'lesson-01',
    id: 'yellow-lesson-01',
    title: 'Hoàng Đai Nhất Cấp',
    subtitle: 'Lý thuyết thi thăng cấp Hoàng Đai Nhị Cấp',
    virtues: ['vững-vàng', 'bao-dung'],
    order: 14,
    prerequisites: ['red-lesson-04'],
  },
  {
    file: '15-HOÀNG ĐAI 2 THI LÊN HOÀNG ĐAI 3 chỉnh 9.6.2026.pdf.docx',
    belt: 'yellow',
    lessonSlug: 'lesson-02',
    id: 'yellow-lesson-02',
    title: 'Hoàng Đai Nhị Cấp',
    subtitle: 'Lý thuyết thi thăng cấp Hoàng Đai Tam Cấp',
    virtues: ['vững-vàng', 'bao-dung'],
    order: 15,
    prerequisites: ['yellow-lesson-01'],
  },
  {
    file: '16-HOÀNG ĐAI 3 THI LÊN HOÀNG ĐAI 4 chỉnh 9.6.2026pdf.docx',
    belt: 'yellow',
    lessonSlug: 'lesson-03',
    id: 'yellow-lesson-03',
    title: 'Hoàng Đai Tam Cấp',
    subtitle: 'Lý thuyết thi thăng cấp Hoàng Đai Tứ Cấp',
    virtues: ['vững-vàng', 'bao-dung'],
    order: 16,
    prerequisites: ['yellow-lesson-02'],
  },
  {
    file: '17-HOÀNG ĐAI 4 THI LÊN CHUẨN BẠCH ĐAI CHỈNH 9.6.2026.pdf.docx',
    belt: 'yellow',
    lessonSlug: 'lesson-04',
    id: 'yellow-lesson-04',
    title: 'Hoàng Đai Tứ Cấp',
    subtitle: 'Lý thuyết thi thăng cấp Chuẩn Bạch Đai',
    virtues: ['vững-vàng', 'bao-dung'],
    order: 17,
    prerequisites: ['yellow-lesson-03'],
  },
  {
    file: '18 - CHUẨN BẠCH ĐAI THI LÊN BẠCH ĐAI chỉnh 9.6.2026.docx',
    belt: 'white',
    lessonSlug: 'lesson-01',
    id: 'white-lesson-01',
    title: 'Chuẩn Bạch Đai',
    subtitle: 'Lý thuyết thi thăng cấp Bạch Đai',
    virtues: ['chính-trực', 'thanh-khiết'],
    order: 18,
    prerequisites: ['yellow-lesson-04'],
  },
  {
    file: '19-BẠCH ĐAI THI LÊN BẠCH ĐAI 1 chỉnh 9.6.2026.docx',
    belt: 'white',
    lessonSlug: 'lesson-02',
    id: 'white-lesson-02',
    title: 'Bạch Đai',
    subtitle: 'Lý thuyết thi thăng cấp Bạch Đai Nhất Cấp',
    virtues: ['chính-trực', 'thanh-khiết'],
    order: 19,
    prerequisites: ['white-lesson-01'],
  },
];

for (const lesson of LESSON_MAP) {
  lesson.subtitle = `Lý thuyết ${lesson.title}`;
}

function findDocFile(expectedName) {
  const files = fs.readdirSync(DOC_DIR);
  const normalized = expectedName.normalize('NFC').toLowerCase();
  const match = files.find((f) => f.normalize('NFC').toLowerCase() === normalized);
  if (match) return path.join(DOC_DIR, match);
  const partial = files.find((f) => {
    const num = expectedName.match(/^\d+/);
    return num && f.startsWith(num[0]);
  });
  if (partial) return path.join(DOC_DIR, partial);
  throw new Error(`Doc not found: ${expectedName}`);
}

async function extractDocxText(filePath) {
  const { execSync } = await import('child_process');
  const scriptPath = path.join(__dirname, 'extract_docx.py');
  const out = execSync(`python3 "${scriptPath}" "${filePath}"`, {
    encoding: 'utf-8',
    maxBuffer: 10 * 1024 * 1024,
  });
  return JSON.parse(out.trim());
}

function escapeMdx(text) {
  return text.replace(/\{/g, '\\{').replace(/</g, '&lt;');
}

function buildMdx(meta, questions, quizCount) {
  const fm = `---
id: ${meta.id}
belt: ${meta.belt}
level: ${meta.order}
title: "${meta.title.replace(/"/g, '\\"')}"
subtitle: "${meta.subtitle.replace(/"/g, '\\"')}"
virtues: [${meta.virtues.map((v) => v).join(', ')}]
estimatedMinutes: ${Math.max(10, Math.ceil(questions.length * 1.5))}
questionsCount: ${quizCount}
passThreshold: 70
prerequisites: [${meta.prerequisites.join(', ')}]
sourceDoc: "${meta.file.replace(/"/g, '\\"')}"
order: ${meta.order}
---

<QuestionPreview />

`;

  const sections = questions.map((q, i) => {
    const virtue = meta.virtues[i % meta.virtues.length];
    const answerParagraphs = q.answer
      .split('\n')
      .filter((l) => l.trim())
      .map((l) => escapeMdx(l.trim()))
      .join('\n\n');

    return `## Câu ${q.number}. ${escapeMdx(q.question)}

${answerParagraphs || '_Nội dung đáp án xem trong tài liệu gốc._'}

${i % 3 === 0 ? `\n<VirtueCallout virtue="${virtue}" />\n` : ''}${i > 0 && i % 4 === 0 ? '\n<BeltDivider />\n' : ''}`;
  });

  return fm + sections.join('\n\n');
}

async function main() {
  fs.mkdirSync(QUIZ_DIR, { recursive: true });

  const manifest = [];

  for (const meta of LESSON_MAP) {
    const docPath = findDocFile(meta.file);
    const paragraphs = await extractDocxText(docPath);
    let questions = parseQuestionsFromParagraphs(paragraphs);

    if (questions.length === 0) {
      console.warn(`Warning: No questions parsed for ${meta.id}, using paragraph fallback`);
      questions = paragraphs
        .slice(2)
        .filter((p) => p.trim().length > 20)
        .slice(0, 12)
        .map((p, i) => ({
          number: i + 1,
          question: p.slice(0, 200),
          answer: p,
        }));
    }

    const beltDir = path.join(CONTENT_DIR, `${meta.belt}-belt`);
    fs.mkdirSync(beltDir, { recursive: true });

    const mdxPath = path.join(beltDir, `${meta.lessonSlug}.mdx`);
    const quizPath = path.join(QUIZ_DIR, `${meta.id}.json`);

    const quiz = buildQuiz(meta, questions);
    const quizCount = quiz.questions.length;

    fs.writeFileSync(mdxPath, buildMdx(meta, questions, quizCount), 'utf-8');
    fs.writeFileSync(quizPath, JSON.stringify(quiz, null, 2), 'utf-8');

    manifest.push({
      ...meta,
      questionsCount: quizCount,
      mdxPath: path.relative(ROOT, mdxPath),
      quizPath: path.relative(ROOT, quizPath),
    });

    console.log(`✓ ${meta.id}: ${questions.length} sections → ${quizCount} quiz questions`);
  }

  fs.writeFileSync(
    path.join(CONTENT_DIR, 'manifest.json'),
    JSON.stringify(manifest, null, 2),
    'utf-8'
  );

  console.log(`\nConverted ${manifest.length} lessons.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
