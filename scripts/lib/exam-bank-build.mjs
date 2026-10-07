import { parseQuestionsFromMdx } from './mdx-parser.mjs';

const TYPE_ORDER = ['matching', 'ordering', 'fill', 'scenario', 'multiple', 'truefalse', 'single'];

const ORDINAL =
  /^(?:một|hai|ba|bốn|năm|sáu|bảy|tám|chín|mười|thứ\s+(?:nhất|hai|ba|tư|năm|sáu))[,،.:\s]+/i;

const normalizedText = new Map();

function normalize(value) {
  const raw = String(value ?? '');
  const cached = normalizedText.get(raw);
  if (cached !== undefined) return cached;
  const result = raw
    .toLowerCase()
    .normalize('NFC')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  normalizedText.set(raw, result);
  return result;
}

function clean(value) {
  return String(value ?? '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[•●▪]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function clip(value, max = 220) {
  const text = clean(value);
  if (text.length <= max) return text;
  const sliced = text.slice(0, max);
  const space = sliced.lastIndexOf(' ');
  const cut = (space > 80 ? sliced.slice(0, space) : sliced).trim();
  return `${cut}…`;
}

function cleanQuestion(value) {
  return clean(value)
    .replace(/^(câu hỏi|hỏi)\s*:\s*/i, '')
    .replace(/\s+\?/g, '?')
    .replace(/[:：]\s*$/g, '')
    .trim();
}

function shortTopic(value) {
  const text = cleanQuestion(value)
    .replace(/\([^)]*\)/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\?+$/g, '')
    .trim();
  if (text.length <= 120) return text;
  const comma = text.indexOf(',');
  if (comma >= 28 && comma <= 120) return text.slice(0, comma);
  return clip(text, 120);
}

function isSolidSnippet(value) {
  const text = clean(value);
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length < 4 || text.length < 24 || text.length > 280) return false;
  if (/^(gọi là|là|và|hoặc|của)(\s|$)/i.test(text)) return false;
  return true;
}

function hash(value) {
  let result = 0;
  for (const char of value) result = (result * 31 + char.charCodeAt(0)) >>> 0;
  return result;
}

function overlaps(left, right) {
  const a = normalize(left);
  const b = normalize(right);
  if (a.length < 16 || b.length < 16) return false;
  const aProbe = a.slice(0, 42);
  const bProbe = b.slice(0, 42);
  return a.includes(bProbe) || b.includes(aProbe);
}

function uniqueTexts(items, minLength = 8) {
  const seen = new Set();
  const result = [];
  for (const item of items) {
    const text = clean(item);
    const key = normalize(text);
    if (key.length < minLength || seen.has(key)) continue;
    seen.add(key);
    result.push(text);
  }
  return result;
}

function sentencesOf(answer) {
  return clean(answer)
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter((part) => part.length >= 28 && part.length <= 240 && !part.endsWith(':'));
}

function lineItems(answer) {
  return answer
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !/^<[^>]+>$/.test(line));
}

function orderedItems(lines) {
  const items = [];
  for (const line of lines) {
    const ordinal = line.match(ORDINAL);
    const numbered = line.match(/^(\d+)[.)]\s+(.+)$/);
    if (ordinal) {
      items.push(clean(line.replace(ORDINAL, '')));
      continue;
    }
    if (numbered) items.push(clean(numbered[2]));
  }
  return uniqueTexts(items).filter((item) => item.length >= 12 && item.length <= 180);
}

function labeledPairs(lines) {
  const pairs = [];
  for (const line of lines) {
    const match = clean(line).match(/^([^:：]{2,32})[:：]\s+(\S.{11,180})$/);
    if (!match) continue;
    const label = match[1].trim();
    const value = match[2].trim();
    if (/[.?!]/.test(label)) continue;
    if (label.split(/\s+/).length > 6) continue;
    if (/^(đáp|ví dụ|lưu ý|nguồn|vì sao)$/i.test(label)) continue;
    pairs.push({ label, value: clip(value, 160) });
  }

  const seenLabels = new Set();
  const seenValues = new Set();
  return pairs.filter((pair) => {
    const labelKey = normalize(pair.label);
    const valueKey = normalize(pair.value);
    if (seenLabels.has(labelKey) || seenValues.has(valueKey) || labelKey === valueKey) return false;
    seenLabels.add(labelKey);
    seenValues.add(valueKey);
    return true;
  });
}

function bulletItems(lines) {
  const items = [];
  for (const line of lines) {
    const bullet = line.match(/^(?:[-*]|[•●▪])\s*(.+)$/);
    if (!bullet) continue;
    items.push(clean(bullet[1]));
  }
  return uniqueTexts(items).filter((item) => item.length >= 16 && item.length <= 180);
}

function yearsIn(answer) {
  return [...new Set([...clean(answer).matchAll(/\b(?:1[0-9]{3}|20[0-9]{2})\b/g)].map((match) => match[0]))];
}

function prepareTheory(mdx) {
  return parseQuestionsFromMdx(mdx).map((item) => {
    const lines = lineItems(item.answer);
    const statements = sentencesOf(item.answer);
    const ordered = orderedItems(lines);
    const pairs = labeledPairs(lines);
    const bullets = bulletItems(lines);
    const snippets = uniqueTexts([
      ...statements,
      ...ordered,
      ...bullets,
      ...pairs.map((pair) => `${pair.label}: ${pair.value}`),
    ]).filter(isSolidSnippet);
    return {
      ...item,
      question: cleanQuestion(item.question),
      statements,
      ordered,
      pairs,
      bullets,
      snippets,
      years: yearsIn(item.answer),
      explanation: clip(item.answer, 700),
    };
  });
}

function pickStable(items, count, seed, blocked = []) {
  const blockedKeys = new Set(blocked.map((item) => normalize(item)));
  return items
    .map((item, index) => ({ item, index, score: hash(`${seed}:${index}:${item}`) }))
    .sort((left, right) => left.score - right.score || left.index - right.index)
    .map((entry) => entry.item)
    .filter((item) => {
      const key = normalize(item);
      if (!key || blockedKeys.has(key)) return false;
      if ([...blockedKeys].some((blockedKey) => overlaps(key, blockedKey))) return false;
      blockedKeys.add(key);
      return true;
    })
    .slice(0, count);
}

function foreignSnippets(item, pool) {
  return pool
    .filter((other) => other.number !== item.number)
    .flatMap((other) => other.snippets)
    .filter((snippet) => !item.snippets.some((own) => overlaps(own, snippet)));
}

function choiceOptions(correct, pool, seed, count = 3) {
  const correctText = clip(correct, 300);
  const distractors = pickStable(pool, count, seed, [correctText]);
  if (distractors.length < count) return null;
  const options = uniqueTexts([correctText, ...distractors.map((item) => clip(item, 300))]);
  if (options.length < count + 1) return null;
  if (options.some((option, index) => options.findIndex((item) => normalize(item) === normalize(option)) !== index)) {
    return null;
  }
  return options;
}

function baseQuestion(item, rankId, beltId, lessonId, type, variant) {
  return {
    id: `exam-${rankId}-${type}-c${String(item.number).padStart(2, '0')}-${variant}`,
    lessonId,
    rankId,
    beltId,
    number: item.number,
    type,
    sourceQuestion: item.question,
    topic: lessonId,
    explanation: item.explanation,
  };
}

function singleQuestion(item, pool, rankId, beltId, lessonId, variant, stem, correct) {
  const options = choiceOptions(correct, pool, `${rankId}:${item.number}:${variant}`, 3);
  if (!options) return null;
  return {
    ...baseQuestion(item, rankId, beltId, lessonId, 'single', variant),
    question: stem,
    options,
    correctIndex: 0,
  };
}

function generateCandidates(theory, rankId, beltId, lessonId) {
  const candidates = [];

  for (const item of theory) {
    const pool = foreignSnippets(item, theory);
    const topic = shortTopic(item.question);
    const primary = [...item.statements, ...item.snippets].find(isSolidSnippet);

    if (primary && pool.length >= 3) {
    const direct = singleQuestion(
      item,
      pool,
      rankId,
      beltId,
      lessonId,
      'direct',
      item.question.endsWith('?') ? item.question : `${item.question}?`,
      primary
    );
    if (direct) candidates.push(direct);

    const focused = singleQuestion(
      item,
      pool,
      rankId,
      beltId,
      lessonId,
      'focus',
      `Theo nội dung bài, ý nào đúng về «${topic}»?`,
      primary
    );
    if (focused) candidates.push(focused);

    const secondary = item.statements.filter(isSolidSnippet)[1];
    if (secondary) {
      const detail = singleQuestion(
        item,
        pool,
        rankId,
        beltId,
        lessonId,
        'detail',
        `Theo bài học, ý nào còn đúng về «${topic}»?`,
        secondary
      );
      if (detail) candidates.push(detail);
    }

    const outsider = pickStable(pool, 1, `${rankId}:${item.number}:outsider`, item.snippets)[0];
    const trueOptions = pickStable(item.snippets, 3, `${rankId}:${item.number}:truth`, [outsider ?? '']);
    if (outsider && trueOptions.length >= 3) {
      candidates.push({
        ...baseQuestion(item, rankId, beltId, lessonId, 'single', 'exclude'),
        question: `Ý nào sau đây không thuộc nội dung «${topic}»?`,
        options: [clip(outsider, 300), ...trueOptions.map((text) => clip(text, 300))],
        correctIndex: 0,
      });
    }

    if (/phải làm|làm gì|thái độ|đối xử|ứng xử|cần làm|nên làm|thực hiện|ra sao|như thế nào/i.test(item.question) && primary) {
      const scenario = singleQuestion(
        item,
        pool,
        rankId,
        beltId,
        lessonId,
        'case',
        `Tình huống: Một võ sinh chưa làm đúng yêu cầu «${topic}». Theo bài học, võ sinh cần hiểu và thực hiện điều nào?`,
        primary
      );
      if (scenario) {
        candidates.push({ ...scenario, type: 'scenario', id: scenario.id.replace('-single-', '-scenario-') });
      }
    }
    }

    for (const [index, statement] of item.statements.filter(isSolidSnippet).slice(0, 3).entries()) {
      candidates.push({
        ...baseQuestion(item, rankId, beltId, lessonId, 'truefalse', `true${index + 1}`),
        question: `Nhận định sau đúng hay sai? ${clip(statement, 220)}`,
        options: ['Đúng', 'Sai'],
        correctIndex: 0,
      });
    }

    const misplaced = pool.length
      ? pickStable(pool, 2, `${rankId}:${item.number}:false`, item.snippets)
      : [];
    misplaced.forEach((statement, index) => {
      candidates.push({
        ...baseQuestion(item, rankId, beltId, lessonId, 'truefalse', index === 0 ? 'false' : 'false2'),
        question: `Nhận định sau đúng hay sai? Về «${topic}», bài học nêu: ${clip(statement, 240)}`,
        options: ['Đúng', 'Sai'],
        correctIndex: 1,
      });
    });

    if (
      item.years.length === 1 &&
      /năm|khi nào|thời|ngày|thành lập|gia nhập/i.test(`${item.question} ${item.statements[0] ?? ''}`)
    ) {
      const year = item.years[0];
      const otherYears = uniqueTexts(
        [
          ...theory.flatMap((entry) => entry.years).filter((entry) => entry !== year),
          String(Number(year) - 3),
          String(Number(year) + 5),
          String(Number(year) - 8),
        ],
        4
      ).filter((entry) => entry !== year);
      const options = uniqueTexts([year, ...otherYears], 4).slice(0, 4);
      if (options.length >= 3 && options.includes(year)) {
        candidates.push({
          ...baseQuestion(item, rankId, beltId, lessonId, 'fill', 'year'),
          question: `${item.question.replace(/\?+$/g, '')}. Điền năm đúng: ______.`,
          options,
          blanks: [year],
        });
      }
    }

    const list = uniqueTexts([
      ...item.ordered,
      ...item.bullets,
      ...item.pairs.map((pair) => `${pair.label}: ${pair.value}`),
    ]).filter((entry) => entry.length >= 16);
    const listDistractors = pickStable(pool, 2, `${rankId}:${item.number}:multi`, list);
    if (list.length >= 2 && listDistractors.length >= 2) {
      const correct = list.slice(0, Math.min(3, list.length));
      candidates.push({
        ...baseQuestion(item, rankId, beltId, lessonId, 'multiple', 'list'),
        question: `Những ý nào đúng với nội dung «${topic}»? Chọn tất cả đáp án đúng.`,
        options: [...correct.map((entry) => clip(entry, 180)), ...listDistractors.map((entry) => clip(entry, 180))],
        correctIndices: correct.map((_, index) => index),
      });
    }

    if (item.ordered.length >= 3 && item.ordered.length <= 6) {
      candidates.push({
        ...baseQuestion(item, rankId, beltId, lessonId, 'ordering', 'steps'),
        question: `Sắp xếp đúng thứ tự được nêu trong bài về «${topic}».`,
        options: [],
        items: item.ordered.map((entry) => clip(entry, 160)),
        correctOrder: item.ordered.map((_, index) => index),
      });
    }

    if (item.pairs.length >= 3 && item.pairs.length <= 5) {
      candidates.push({
        ...baseQuestion(item, rankId, beltId, lessonId, 'matching', 'pairs'),
        question: `Ghép mỗi mục với nội dung đúng về «${topic}».`,
        options: [],
        leftItems: item.pairs.map((pair) => pair.label),
        rightItems: item.pairs.map((pair) => pair.value),
        correctPairs: item.pairs.map((_, index) => [index, index]),
      });
    }
  }

  return candidates.filter((question) => question && isUsableQuestion(question));
}

function isUsableQuestion(question) {
  if (!question.question || normalize(question.question).length < 12) return false;
  const type = question.type;

  if (type === 'single' || type === 'scenario' || type === 'truefalse') {
    if (!Array.isArray(question.options) || question.options.length < 2) return false;
    if (new Set(question.options.map((option) => normalize(option))).size !== question.options.length) return false;
    return typeof question.correctIndex === 'number'
      && question.correctIndex >= 0
      && question.correctIndex < question.options.length;
  }

  if (type === 'multiple') {
    if (!question.correctIndices || question.correctIndices.length < 2) return false;
    if (new Set(question.options.map((option) => normalize(option))).size !== question.options.length) return false;
    return question.correctIndices.every((index) => index >= 0 && index < question.options.length);
  }

  if (type === 'fill') {
    if (!question.blanks?.length) return false;
    return question.blanks.every((blank) =>
      question.options.some((option) => normalize(option) === normalize(blank))
    );
  }

  if (type === 'matching') {
    const left = question.leftItems ?? [];
    const right = question.rightItems ?? [];
    if (left.length < 3 || right.length !== left.length) return false;
    if (new Set(left.map(normalize)).size !== left.length) return false;
    if (new Set(right.map(normalize)).size !== right.length) return false;
    return (question.correctPairs ?? []).every(
      ([leftIndex, rightIndex]) =>
        leftIndex >= 0 && leftIndex < left.length && rightIndex >= 0 && rightIndex < right.length
    );
  }

  if (type === 'ordering') {
    const items = question.items ?? [];
    const order = question.correctOrder ?? [];
    if (items.length < 3 || order.length !== items.length) return false;
    if (new Set(items.map(normalize)).size !== items.length) return false;
    return new Set(order).size === items.length && order.every((index) => index >= 0 && index < items.length);
  }

  return false;
}

function spreadBySource(questions) {
  const groups = new Map();
  for (const question of questions) {
    const key = question.sourceQuestion ?? question.id;
    const group = groups.get(key) ?? [];
    group.push(question);
    groups.set(key, group);
  }

  const queues = [...groups.values()];
  const spread = [];
  let pending = true;
  while (pending) {
    pending = false;
    for (const queue of queues) {
      const next = queue.shift();
      if (!next) continue;
      spread.push(next);
      pending = true;
    }
  }
  return spread;
}

function stemKey(question) {
  return normalize(question.question);
}

function selectQuestions(seeded, generated) {
  const selected = [];
  const stems = new Set();

  for (const question of seeded) {
    selected.push(question);
    stems.add(stemKey(question));
  }

  for (const question of generated) {
    if (stems.has(stemKey(question))) continue;
    stems.add(stemKey(question));
    selected.push(question);
  }

  return selected;
}

function renumber(questions) {
  return questions.map((question, index) => ({ ...question, number: index + 1 }));
}

export function buildRankBank({ rankId, beltId, lessonId, mdx, quiz, todo }) {
  const seeded = (quiz.questions ?? []).map((question) => ({
    ...question,
    lessonId,
    rankId,
    beltId,
  }));

  if (todo) {
    return {
      rankId,
      beltId,
      lessonId,
      todo,
      questions: renumber(seeded),
    };
  }

  const theory = prepareTheory(mdx);
  const generated = generateCandidates(theory, rankId, beltId, lessonId);
  const questions = selectQuestions(seeded, generated);

  return {
    rankId,
    beltId,
    lessonId,
    questions: renumber(questions),
  };
}
