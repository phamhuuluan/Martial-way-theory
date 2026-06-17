/**
 * Audit quiz questions against MDX source answers.
 * Run: node scripts/audit-quiz-coverage.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseQuestionsFromMdx } from './lib/mdx-parser.mjs';
import { splitCompoundSourceQuestions } from './lib/compound-questions.mjs';
import {
  getCoverageItems,
} from './lib/quiz-builder.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const MANIFEST_PATH = path.join(ROOT, 'content', 'manifest.json');

const BROAD_QUESTION =
  /những gì|những điều gì|nêu các|kể ra các|liệt kê|gồm những|bao gồm những|bao gồm|các nguyên tắc|nguyên tắc nào|phẩm chất|nghĩa vụ|trường hợp nào|các trường hợp|điều kiện|mấy điều|mấy phần|mấy bước|mấy phẩm|mấy nguyên tắc|cần ghi nhớ|phải làm gì|phải thực hiện|phải có những|phải biết những|cần được|cần làm gì|những vấn đề nào|chi phần nào/i;

const MUST_DO_QUESTION = /phải làm gì|phải thực hiện|cần làm gì|phải có những|phải biết/i;

const COUNT_QUESTION =
  /có mấy|mấy điều|mấy điểm|mấy bước|mấy phần|mấy phẩm|mấy thời kỳ|mấy trường hợp|mấy loại|mấy nguyên tắc|mấy phương châm|bao nhiêu điều|bao nhiêu phần/i;

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenOverlap(a, b) {
  const aNorm = normalize(a);
  const bNorm = normalize(b);
  if (!aNorm || !bNorm) return 0;
  if (aNorm.includes(bNorm) || bNorm.includes(aNorm)) return 1;

  const aTokens = aNorm.split(' ').filter((t) => t.length > 3);
  if (aTokens.length === 0) return 0;
  const shared = aTokens.filter((t) => bNorm.includes(t)).length;
  return shared / aTokens.length;
}

function getSourceItems(sourceQ) {
  return getCoverageItems(sourceQ);
}

function getCorrectTexts(question) {
  if (question.type === 'multiple' && question.correctIndices) {
    return question.correctIndices.map((i) => question.options[i]).filter(Boolean);
  }
  if (question.type === 'single' || question.type === 'scenario' || question.type === 'truefalse') {
    const idx = question.correctIndex;
    if (idx != null && question.options?.[idx]) return [question.options[idx]];
  }
  if (question.type === 'fill' && question.blanks) return question.blanks;
  if (question.type === 'ordering' && question.items && question.correctOrder) {
    return question.correctOrder.map((i) => question.items[i]).filter(Boolean);
  }
  if (question.type === 'matching' && question.leftItems) {
    return question.leftItems;
  }
  return [];
}

function itemCoveredByCorrect(item, correctTexts) {
  return correctTexts.some((correct) => tokenOverlap(item, correct) >= 0.55);
}

function isSynthesizedAnswer(correctText, items) {
  if (!correctText || items.length < 2) return false;
  const covered = items.filter((item) => tokenOverlap(item, correctText) >= 0.45);
  return covered.length >= Math.min(items.length, 2) && covered.length / items.length >= 0.6;
}

function auditQuestion(lessonId, quizQ, sourceMap) {
  const sourceQ = sourceMap.get(quizQ.sourceQuestion || quizQ.question);
  if (!sourceQ) {
    return {
      lessonId,
      id: quizQ.id,
      issue: 'missing_source',
      reason: 'Không tìm thấy câu hỏi nguồn trong MDX',
      currentType: quizQ.type,
      proposedType: null,
      question: quizQ.question,
      sourceQuestion: quizQ.sourceQuestion,
      correctAfterFix: null,
    };
  }

  const items = getSourceItems(sourceQ);
  const correctTexts = getCorrectTexts(quizQ);
  const stem = quizQ.sourceQuestion || quizQ.question;
  const isBroad = BROAD_QUESTION.test(stem);
  const isMustDo = MUST_DO_QUESTION.test(stem);

  if (
    COUNT_QUESTION.test(stem) &&
    quizQ.type === 'single' &&
    /có\s+(\d+)\s+phần/i.test(sourceQ.answer)
  ) {
    const expectedCount = sourceQ.answer.match(/có\s+(\d+)\s+phần/i)?.[1];
    const correct = correctTexts[0] ?? '';
    if (expectedCount && correct.includes(expectedCount)) return null;
  }

  if (items.length < 2) return null;

  const coveredCount = items.filter((item) => itemCoveredByCorrect(item, correctTexts)).length;
  const uncovered = items.filter((item) => !itemCoveredByCorrect(item, correctTexts));

  // Multiple choice: all source items should be correct options
  if (quizQ.type === 'multiple') {
    if (coveredCount < items.length) {
      return {
        lessonId,
        id: quizQ.id,
        issue: 'multiple_incomplete',
        reason: `Chọn nhiều nhưng chỉ có ${coveredCount}/${items.length} ý đúng từ nguồn. Thiếu: ${uncovered.slice(0, 3).join(' | ')}`,
        currentType: 'multiple',
        proposedType: 'multiple',
        question: quizQ.question,
        sourceQuestion: stem,
        sourceAnswer: sourceQ.answer,
        correctAfterFix: items,
        uncovered,
      };
    }
    return null;
  }

  // Broad / must-do questions with list answers should not be single/scenario/truefalse with partial answer
  const needsFullCoverage = isBroad || (isMustDo && items.length >= 2);
  const singleCorrect = correctTexts[0] ?? '';
  const synthesized = isSynthesizedAnswer(singleCorrect, items);

  if (needsFullCoverage && coveredCount < items.length && !synthesized) {
    const proposedType =
      items.length >= 2 ? 'multiple' : 'single';
    return {
      lessonId,
      id: quizQ.id,
      issue: needsFullCoverage && isBroad ? 'broad_partial_single' : 'must_do_partial',
      reason:
        coveredCount === 0
          ? `Đáp án đúng không khớp ý nào trong danh sách nguồn (${items.length} ý).`
          : `Câu hỏi hỏi phạm vi rộng nhưng đáp án đúng chỉ phản ánh ${coveredCount}/${items.length} ý. Thiếu: ${uncovered.join(' | ')}`,
      currentType: quizQ.type,
      proposedType,
      question: quizQ.question,
      sourceQuestion: stem,
      sourceAnswer: sourceQ.answer,
      currentCorrect: correctTexts,
      correctAfterFix:
        proposedType === 'multiple'
          ? items
          : `[Tổng hợp] ${items.join('; ')}`,
      uncovered,
    };
  }

  // Scenario derived from multi-item must-do: only tests one bullet
  if (quizQ.type === 'scenario' && isMustDo && items.length >= 2 && coveredCount === 1) {
    return {
      lessonId,
      id: quizQ.id,
      issue: 'scenario_one_of_many',
      reason: `Câu nguồn yêu cầu ${items.length} việc nhưng tình huống chỉ kiểm tra 1 ý.`,
      currentType: 'scenario',
      proposedType: 'multiple',
      question: quizQ.question,
      sourceQuestion: stem,
      sourceAnswer: sourceQ.answer,
      currentCorrect: correctTexts,
      correctAfterFix: items,
      uncovered,
    };
  }

  return null;
}

function buildSourceMap(parsedQuestions) {
  const expanded = splitCompoundSourceQuestions(parsedQuestions);
  const map = new Map();
  for (const q of expanded) {
    map.set(q.question, q);
  }
  return map;
}

function main() {
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
  const issues = [];

  for (const lesson of manifest) {
    const mdxPath = path.join(ROOT, lesson.mdxPath);
    const quizPath = path.join(ROOT, lesson.quizPath);
    if (!fs.existsSync(mdxPath) || !fs.existsSync(quizPath)) continue;

    const parsed = parseQuestionsFromMdx(fs.readFileSync(mdxPath, 'utf-8'));
    const sourceMap = buildSourceMap(parsed);
    const quiz = JSON.parse(fs.readFileSync(quizPath, 'utf-8'));

    for (const q of quiz.questions) {
      const finding = auditQuestion(lesson.id, q, sourceMap);
      if (finding) issues.push(finding);
    }
  }

  console.log(JSON.stringify({ totalIssues: issues.length, issues }, null, 2));
}

main();
