/**
 * Quiz builder — one question per learning objective with diverse question types.
 *
 * Distribution targets (approximate):
 *   direct knowledge 70% | scenario 20% | truefalse inference 10%
 *
 * Compound source questions (multiple ? in one prompt) are split before building.
 */
import { splitCompoundSourceQuestions } from './compound-questions.mjs';

const ORDINAL_LINE =
  /^(Một|Hai|Ba|Bốn|Năm|Sáu|Bảy|Tám|Chín|Mười)[,，\.:\s]+/i;
const BULLET_LINE = /^[•\u2022\uF0B7\u2013-]\s*(.+)$/;
const NUMBERED_LINE = /^(\d+)[.)]\s*(.+)$/;
const LABELED_LINE = /^([^:：]{3,40})[:：]\s*(.+)$/;

const COUNT_QUESTION =
  /có mấy|mấy điều|mấy điểm|mấy bước|mấy phần|mấy phẩm|mấy thời kỳ|mấy trường hợp|mấy loại|mấy nguyên tắc|mấy phương châm|bao nhiêu điều|bao nhiêu phần/i;

const LIST_QUESTION =
  /gồm những|bao gồm những|bao gồm|chi phần nào|những gì|những điều gì|nêu các|kể ra các|liệt kê|cần ghi nhớ/i;

const BROAD_QUESTION =
  /những gì|những điều gì|nêu các|kể ra|các bài|liệt kê|gồm những|bao gồm những|bao gồm|chi phần nào|các nguyên tắc|nguyên tắc nào|phẩm chất|nghĩa vụ|trường hợp nào|các trường hợp|điều kiện|mấy điều|mấy phần|mấy bước|mấy phẩm|mấy nguyên tắc|cần ghi nhớ|phải làm gì|phải thực hiện|phải có những|phải biết những|cần được|cần làm gì|những vấn đề nào/i;

const MUST_DO_QUESTION = /phải làm gì|phải thực hiện|cần làm gì|phải có những|phải biết/i;

const WHY_QUESTION = /^tại sao|^vì sao|^do đâu/i;

const RHETORICAL_YES_NO =
  /có .+ không\s*\?$/i;

const CASE_QUESTION = /trường hợp nào|khi nào có thể/i;

const SKIP_CORRECT_PREFIX =
  /^(tuy nhiên|ví dụ|đồng thời|bên cạnh|ngoài ra|như vậy|theo tinh thần|đáp|không\.)/i;

const MAX_MULTIPLE_OPTIONS = 12;
const GENERIC_DISTRACTOR_PATTERN =
  /(không thuộc nội dung bài học|không có trong bài học|thông tin không chính xác theo tài liệu|ý kiến cá nhân|quy định không có trong bài học)/i;

const OATH_QUESTION = /lời thế|6 câu/i;

const IDEA_ORIGIN_QUESTION = /ý tưởng.*từ đâu/i;

const MARTIAL_USE_QUESTION =
  /được phép dụng võ|chỉ dụng võ trong|dụng võ trong các trường hợp/i;

const NATION_DUTY_QUESTION =
  /nghĩa vụ.*đối với dân tộc|đối với dân tộc.*như thế nào/i;

const CONCEPT_LIST_QUESTION =
  /tập võ để làm gì|quan niệm thông thường|quan niệm dụng võ/i;

const COMPARISON_QUESTION = /khác nhau như thế nào|phân biệt.*và/i;

const CONDUCT_QUESTION = /đối xử nhau ra sao|đối xử với nhau/i;

const SCENARIO_QUESTION =
  /làm thế nào|khi nào|nếu|vi phạm|không đúng|sai|cần làm gì|xử lý|thực hiện tốt|thực hiện như thế nào/i;

const TERM_QUESTION =
  /là gì|nghĩa là|ý nghĩa|định nghĩa|cho biết|tên gọi|khái niệm/i;

const COUNT_UNITS = [
  'điều',
  'điểm',
  'phần',
  'bước',
  'phẩm chất',
  'phẩm',
  'thời kỳ',
  'trường hợp',
  'loại',
  'nguyên tắc',
  'phương châm',
];

const TYPE_WEIGHTS = {
  // Target ratio by lesson: 70% direct knowledge, 20% scenario, 10% true/false inference.
  single: 0.25,
  multiple: 0.2,
  fill: 0.1,
  matching: 0.08,
  ordering: 0.07,
  scenario: 0.2,
  truefalse: 0.1,
};

const TYPE_PRIORITY = [
  'single',
  'multiple',
  'fill',
  'matching',
  'ordering',
  'scenario',
  'truefalse',
];

function truncateOption(text, max = 120) {
  const cleaned = String(text).replace(/\s+/g, ' ').trim();
  if (cleaned.length <= max) return cleaned;
  const slice = cleaned.slice(0, max);
  const lastSpace = slice.lastIndexOf(' ');
  return `${(lastSpace > 40 ? slice.slice(0, lastSpace) : slice).trim()}…`;
}

function normalizeComparable(text) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isAnswerIntroHeading(text) {
  const cleaned = text.replace(/\s+/g, ' ').trim();
  if (!cleaned) return true;

  const withoutEllipsis = cleaned.replace(/…+$/, '').trim();

  if (/[:：]\s*$/.test(withoutEllipsis)) return true;

  if (/^muốn .+ (phải|cần)( làm gì)?[:：]?\s*$/i.test(withoutEllipsis)) return true;
  if (/^.+, (môn sinh|võ sinh)[^.]{0,80} phải[:：]?\s*$/i.test(withoutEllipsis)) return true;
  if (/^có \d+ (điều|trường hợp|phần|bước|phẩm|loại|nguyên tắc)/i.test(withoutEllipsis)) {
    return true;
  }
  if (/^thực hành .+ (trong|hằng ngày)[:：]?\s*$/i.test(withoutEllipsis)) return true;
  if (/^(nguồn gốc|vì sao|đáp|quan niệm|chỉ dụng)[:：]?\s*$/i.test(withoutEllipsis)) {
    return true;
  }
  if (/^đối với .+[:：]\s*$/i.test(withoutEllipsis)) return true;

  return false;
}

function optionRepeatsQuestionStem(option, context = {}) {
  const optComparable = normalizeComparable(option);
  if (optComparable.length < 10) return false;

  const stems = [
    context.question,
    context.sourceQuestion,
    context.question ? normalizeQuestionText(context.question) : '',
    context.sourceQuestion ? normalizeQuestionText(context.sourceQuestion) : '',
  ]
    .filter(Boolean)
    .map((stem) => normalizeComparable(stem));

  for (const stem of stems) {
    if (stem.length < 10) continue;
    if (optComparable === stem) return true;

    const stemPrefix = stem.slice(0, Math.min(28, stem.length));
    const optPrefix = optComparable.slice(0, Math.min(28, optComparable.length));
    if (
      stemPrefix.length >= 16 &&
      optPrefix.length >= 16 &&
      (stem.startsWith(optPrefix) || optComparable.startsWith(stemPrefix))
    ) {
      return true;
    }

    const stemTokens = tokenizeForOverlap(stem);
    if (stemTokens.size >= 4) {
      const optTokens = tokenizeForOverlap(option);
      let shared = 0;
      for (const token of optTokens) {
        if (stemTokens.has(token)) shared++;
      }
      if (shared / stemTokens.size >= 0.65 && option.length <= stem.length + 15) {
        return true;
      }
    }
  }

  return false;
}

export function isQualityAnswerOption(option, context = {}) {
  if (!option) return false;

  const cleaned = option.replace(/\s+/g, ' ').trim();
  if (cleaned.length < 10) return false;
  if (GENERIC_DISTRACTOR_PATTERN.test(cleaned)) return false;
  if (isAnswerIntroHeading(cleaned)) return false;
  if (isSectionHeader(cleaned)) return false;
  if (!context.allowStemOverlap && optionRepeatsQuestionStem(cleaned, context)) return false;

  const colonMatch = cleaned.match(/^(.+?)[:：]\s*(.*)$/);
  if (colonMatch) {
    const afterColon = colonMatch[2].replace(/…+$/, '').trim();
    if (afterColon.length < 8) return false;
  }

  return true;
}

function buildOptionContext(sourceQ) {
  if (!sourceQ) return {};
  return {
    question: sourceQ.question,
    sourceQuestion: sourceQ.question,
  };
}

function stripListPrefix(text) {
  return text
    .replace(ORDINAL_LINE, '')
    .replace(NUMBERED_LINE, (_, __, rest) => rest.trim())
    .replace(BULLET_LINE, (_, rest) => rest.trim())
    .trim();
}

function shuffleWithSeed(arr, seed) {
  const a = [...arr];
  let s = seed + 1;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function isSectionHeader(line) {
  if (
    /^(có \d+|quan niệm|chỉ dụng|trong đại|vì sao|nguồn gốc|đáp|phật quang quyền có \d+)/i.test(
      line
    )
  ) {
    return true;
  }

  if (/^môn sinh/i.test(line)) {
    if (/\blà (những |người |ai |một )/i.test(line)) return false;
    return (
      line.length < 90 &&
      !/\b(phải|đồng thời|bên cạnh|cần|không ngừng)\b/i.test(line)
    );
  }

  return false;
}

function isStructuralSectionTitle(line) {
  const text = line.trim().replace(/\.$/, '');
  if (text.length < 3 || text.length > 45) return false;
  if (/[:：]/.test(text)) return false;
  if (/^[a-z]\.\s/i.test(text)) return false;
  if (/^bi$|^trí$|^dũng$/i.test(text)) return false;
  if (/\blà\b.*\b(để|nhằm|giúp|trở thành)\b/i.test(text)) return false;
  if (/^sống với|^không lấy|^đây là nhiệm vụ/i.test(text)) return false;
  return text.split(/\s+/).length <= 6;
}

function extractStructuralSectionTitles(answer) {
  const lines = answer.split('\n').map((line) => line.trim()).filter(Boolean);
  return lines
    .filter((line) => !isSectionHeader(line) && isStructuralSectionTitle(line))
    .map((line) => line.replace(/\.$/, '').trim());
}

function extractThesisParagraph(answer) {
  const paragraphs = answer
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
  if (paragraphs.length > 0) return paragraphs[0];

  const line = answer
    .split('\n')
    .map((entry) => entry.trim())
    .find(Boolean);
  return line ?? '';
}

function extractLabeledAnswerLines(answer) {
  return answer
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => /^[a-z]\.\s/i.test(line));
}

function expandInlineNumberedList(line) {
  if (!/\d+[.)]\s*.+\d+[.)]\s*/.test(line)) return null;

  const parts = line
    .split(/\d+[.)]\s*/)
    .map((part) => part.replace(/[,.;]\s*$/, '').trim())
    .filter((part) => part.length >= 3 && part.length <= 80);

  return parts.length >= 2 ? parts : null;
}

export function extractListItems(answer) {
  const lines = answer.split('\n').map((l) => l.trim()).filter(Boolean);
  const items = [];

  for (const line of lines) {
    if (isSectionHeader(line)) continue;
    if (isAnswerIntroHeading(line)) continue;
    if (isAnswerIntroHeading(line)) continue;

    const inlineParts = expandInlineNumberedList(line);
    if (inlineParts) {
      for (const text of inlineParts) items.push({ text });
      continue;
    }

    if (ORDINAL_LINE.test(line)) {
      items.push({ text: stripListPrefix(line) || line });
      continue;
    }

    const bullet = line.match(BULLET_LINE);
    if (bullet) {
      items.push({ text: bullet[1].trim() });
      continue;
    }

    const numbered = line.match(NUMBERED_LINE);
    if (numbered) {
      items.push({ text: numbered[2].trim() });
      continue;
    }

    const labeled = line.match(LABELED_LINE);
    if (labeled) {
      const label = labeled[1].trim();
      const value = labeled[2].trim();
      if (
        /^(đáp|nguồn|vì sao|học cho|hỏi cho|nghĩ cẩn|luận cho|bi|trí|dũng|sinh|giúp người)/i.test(label) ||
        /đế$|đạo$|chánh$/i.test(label) ||
        label.length <= 24
      ) {
        items.push({ text: `${label}: ${value}` });
      }
      continue;
    }

    if (line.length >= 4 && line.length <= 220) {
      if (line.length < 8 && !/^Chánh\s|^Tránh\s|^Sinh|^Lão|^Bệnh|^Tử/i.test(line)) {
        continue;
      }
      items.push({ text: line });
    }
  }

  if (items.length === 0) {
    const includeMatch = answer.match(
      /(?:bao gồm|gồm)\s*[:：]?\s*(.+?)(?:\.|\n|$)/i
    );
    if (includeMatch) {
      for (const part of includeMatch[1].split(/[,，;；]\s*|\s+và\s+/i)) {
        const text = part.trim();
        if (text.length >= 2 && text.length <= 80) {
          items.push({ text });
        }
      }
    }
  }

  const seen = new Set();
  return items.filter((item) => {
    const key = item.text.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return item.text.length >= 6 && !isAnswerIntroHeading(item.text);
  });
}

export function extractIdeaPurposeItems(answer) {
  const lines = answer.split('\n').map((line) => line.trim()).filter(Boolean);

  return lines
    .filter(
      (line) =>
        !isSectionHeader(line) &&
        !/^nguồn gốc ý tưởng:?$/i.test(line) &&
        /^(Mong muốn|Giúp|Xây dựng|Phục dựng|Nhằm)/i.test(line) &&
        line.length >= 12 &&
        line.length <= 120
    )
    .map((text) => ({ text }));
}

export function extractIdeaOriginNarrative(answer) {
  const condensed = answer.replace(/\s+/g, ' ').trim();
  const coreMatch = condensed.match(
    /(?:được\s+)?tham học nhiều bậc tiền bối[^.]*võ thuật[^.]*đúc kết[^.]*tinh hoa[^.]*/i
  );
  if (!coreMatch) return null;

  let text = coreMatch[0].trim();
  if (!/^được/i.test(text)) {
    text = `Được ${text.charAt(0).toLowerCase()}${text.slice(1)}`;
  } else {
    text = text.charAt(0).toUpperCase() + text.slice(1);
  }

  return text.endsWith('.') ? text : `${text}.`;
}

export function extractIdeaOriginItems(answer) {
  const origin = extractIdeaOriginNarrative(answer);
  if (!origin) return [];

  return [
    { text: origin },
    ...extractIdeaPurposeItems(answer),
  ];
}

export function extractMartialUseCaseItems(answer) {
  const sectionMatch = answer.match(
    /chỉ dụng võ trong \d+ trường hợp:?\s*([\s\S]*?)(?=\n\s*Vì sao|\n\s*vì sao|$)/i
  );
  if (!sectionMatch) return [];

  return sectionMatch[1]
    .split('\n')
    .map((line) => line.trim())
    .filter(
      (line) =>
        line.length >= 8 &&
        line.length <= 80 &&
        !line.endsWith('?') &&
        !isSectionHeader(line) &&
        !isAnswerIntroHeading(line)
    )
    .map((text) => ({ text }));
}

function extractCaseConditionItems(answer) {
  const line =
    answer
      .split('\n')
      .map((entry) => entry.trim())
      .find((entry) => /có thể tha thứ|có thể .* khi /i.test(entry)) ?? '';

  if (!line) return [];

  const tail = line.match(/tha thứ cho kẻ thù\s+(.+)$/i)?.[1];
  if (!tail) return [{ text: line }];

  const parts = tail
    .split(/,\s*(?=(?:hoặc\s+)?khi\s)|\s+hoặc\s+(?=khi\s)/i)
    .map((part) => part.trim().replace(/^hoặc\s+/i, ''))
    .filter((part) => /^khi\s/i.test(part) && part.length >= 12);

  if (parts.length >= 2) {
    return parts.map((text) => ({ text }));
  }

  return [{ text: line }];
}

export function resolveListItems(sourceQ) {
  if (MARTIAL_USE_QUESTION.test(sourceQ.question)) {
    const useCaseItems = extractMartialUseCaseItems(sourceQ.answer);
    if (useCaseItems.length >= 2) return useCaseItems;
  }

  if (CASE_QUESTION.test(sourceQ.question)) {
    const caseItems = extractCaseConditionItems(sourceQ.answer);
    if (caseItems.length >= 2) return caseItems;
  }

  return filterQuizListItems(sourceQ, extractListItems(sourceQ.answer));
}

function filterQuizListItems(sourceQ, items) {
  const question = sourceQ.question ?? '';
  const answer = sourceQ.answer ?? '';

  if (/kể tên|liệt kê|những bài/i.test(question) && items.length >= 8) {
    const named = items.filter((item) => {
      const text = item.text.trim();
      return (
        text.length <= 42 &&
        !/tượng trưng|nhắc người|đức tính|bậc |đai nâu|danh xưng|thời gian/i.test(text)
      );
    });
    if (named.length >= 2) return named;
  }

  if (
    /xuất xứ|ý nghĩa/i.test(question) &&
    !/lời thiệu|đọc bài thiệu|và đọc/i.test(question)
  ) {
    const marker = answer.search(/\n\s*lời thiệu\s*:?/i);
    if (marker >= 0) {
      return extractListItems(answer.slice(0, marker));
    }
  }

  if (/6 màu|phân cấp gồm/i.test(question)) {
    const beltNames = items.filter((item) =>
      /^(Nâu|Xanh Lam|Xanh Lục|Đỏ|Ðỏ|Vàng|Trắng)\b/i.test(item.text.trim())
    );
    if (beltNames.length >= 4) return beltNames;
  }

  if (/hệ thống cấp đai/i.test(question)) {
    const tiers = items.filter((item) => {
      const label = item.text.trim().split(':')[0].trim();
      return /^Bậc (Tự vệ|Sơ đẳng|Trung đẳng|Cao đẳng|Thượng đẳng)/i.test(label);
    });
    if (tiers.length >= 3) return tiers;
  }

  if (/liệt kê bát chánh đạo|bát chánh đạo bao gồm/i.test(question)) {
    const chánhItems = items.filter((item) => /^Chánh\s/i.test(item.text.trim()));
    if (chánhItems.length >= 6) return chánhItems;
  }

  if (/mấy phần|bao nhiêu phần/i.test(question)) {
    const sections = extractStructuralSectionTitles(answer);
    if (sections.length >= 2) {
      return sections.map((text) => ({ text }));
    }
  }

  if (/thế nào là/i.test(question)) {
    const labeled = extractLabeledAnswerLines(answer);
    if (labeled.length >= 2) {
      return labeled.map((text) => ({ text }));
    }
  }

  return items;
}

export function getCoverageItems(sourceQ) {
  const context = {};
  const question = sourceQ.question ?? '';

  if (
    CONCEPT_LIST_QUESTION.test(question) &&
    resolveListItems(sourceQ).length >= 2
  ) {
    return resolveListItems(sourceQ)
      .map((item) => item.text)
      .filter((text) => isQualityAnswerOption(text, context));
  }

  if (IDEA_ORIGIN_QUESTION.test(question)) {
    return extractIdeaOriginItems(sourceQ.answer ?? '').map((item) => item.text);
  }

  if (CONDUCT_QUESTION.test(question) && resolveListItems(sourceQ).length >= 2) {
    return resolveListItems(sourceQ)
      .map((item) => item.text)
      .filter((text) => isQualityAnswerOption(text, context));
  }

  if (
    COMPARISON_QUESTION.test(question) &&
    resolveListItems(sourceQ).length >= 2
  ) {
    return resolveListItems(sourceQ)
      .map((item) => item.text)
      .filter((text) => isQualityAnswerOption(text, context));
  }

  if (WHY_QUESTION.test(question.trim())) {
    const thesis = extractThesisParagraph(sourceQ.answer ?? '');
    return thesis && isQualityAnswerOption(thesis, context) ? [thesis] : [];
  }

  if (RHETORICAL_YES_NO.test(question.trim()) && !LIST_QUESTION.test(question)) {
    const thesis = extractThesisParagraph(sourceQ.answer ?? '');
    return thesis ? [thesis] : [];
  }

  if (COUNT_QUESTION.test(question) && /có\s+\d+\s+phần/i.test(sourceQ.answer ?? '')) {
    const sections = extractStructuralSectionTitles(sourceQ.answer ?? '');
    if (sections.length >= 2) {
      return sections;
    }
  }

  return resolveListItems(sourceQ)
    .map((item) => item.text)
    .filter((text) => isQualityAnswerOption(text, context));
}

function getQualityItemTexts(sourceQ, items) {
  const context = {
    ...buildOptionContext(sourceQ),
    allowStemOverlap:
      MUST_DO_QUESTION.test(sourceQ.question) ||
      COMPARISON_QUESTION.test(sourceQ.question),
  };
  let texts = items
    .map((item) => truncateOption(item.text, 80))
    .filter((text) => isQualityAnswerOption(text, context));

  if (
    CASE_QUESTION.test(sourceQ.question) &&
    !MARTIAL_USE_QUESTION.test(sourceQ.question)
  ) {
    texts = texts.filter(
      (text) =>
        /có thể|khi họ|khi ta/i.test(text) && !/^kẻ thù là/i.test(text)
    );
  }

  return texts;
}

function requiresFullListCoverage(sourceQ, items) {
  const qualityItems = getQualityItemTexts(sourceQ, items);
  if (qualityItems.length < 2) return false;

  if (WHY_QUESTION.test(sourceQ.question.trim())) return false;

  if (
    RHETORICAL_YES_NO.test(sourceQ.question.trim()) &&
    !LIST_QUESTION.test(sourceQ.question)
  ) {
    return false;
  }

  if (COUNT_QUESTION.test(sourceQ.question)) {
    const countInfo = extractCountInfo(sourceQ.answer ?? '', items);
    if (countInfo?.unit === 'phần' || /có\s+\d+\s+phần/i.test(sourceQ.answer ?? '')) {
      return false;
    }
  }

  if (
    CONCEPT_LIST_QUESTION.test(sourceQ.question) &&
    qualityItems.length >= 2
  ) {
    return true;
  }

  if (
    COMPARISON_QUESTION.test(sourceQ.question) &&
    qualityItems.length >= 2
  ) {
    return true;
  }

  if (
    CONDUCT_QUESTION.test(sourceQ.question) &&
    qualityItems.length >= 2
  ) {
    return true;
  }

  if (
    CASE_QUESTION.test(sourceQ.question) &&
    !MARTIAL_USE_QUESTION.test(sourceQ.question) &&
    qualityItems.length >= 2
  ) {
    return true;
  }

  const narrativeParagraphs = items.filter((item) => {
    const text = item.text.trim();
    if (text.length <= 72) return false;
    if (/^Chánh\s/i.test(text)) return false;
    const colonIndex = text.indexOf(':');
    if (colonIndex > 0 && colonIndex <= 24) return false;
    return true;
  });
  if (
    narrativeParagraphs.length >= 2 &&
    !LIST_QUESTION.test(sourceQ.question) &&
    !/liệt kê|kể tên|kể ra|bao gồm/i.test(sourceQ.question) &&
    !MUST_DO_QUESTION.test(sourceQ.question)
  ) {
    return false;
  }

  return (
    BROAD_QUESTION.test(sourceQ.question) ||
    (MUST_DO_QUESTION.test(sourceQ.question) && qualityItems.length >= 2)
  );
}

function pickPrimaryCorrectAnswer(sourceQ, lines, items) {
  const context = buildOptionContext(sourceQ);
  const qualityLines = lines
    .map((line) => truncateOption(line, 100))
    .filter((line) => isQualityAnswerOption(line, context));
  const qualityItems = items
    .map((item) => truncateOption(item.text, 100))
    .filter((text) => isQualityAnswerOption(text, context));

  const prefer = (candidates) =>
    candidates.find((text) => text && !SKIP_CORRECT_PREFIX.test(text)) ?? null;

  if (WHY_QUESTION.test(sourceQ.question.trim())) {
    const thesis = truncateOption(extractThesisParagraph(sourceQ.answer ?? ''), 100);
    if (thesis && isQualityAnswerOption(thesis, context)) return thesis;
  }

  if (
    RHETORICAL_YES_NO.test(sourceQ.question.trim()) &&
    !LIST_QUESTION.test(sourceQ.question)
  ) {
    const thesis = truncateOption(extractThesisParagraph(sourceQ.answer ?? ''), 100);
    if (thesis && isQualityAnswerOption(thesis, context)) return thesis;
  }

  if (CASE_QUESTION.test(sourceQ.question)) {
    const caseAnswer = prefer(
      qualityLines.filter(
        (line) =>
          /có thể tha thứ|có thể|khi họ|khi ta|khi được/i.test(line) &&
          !/^kẻ thù là/i.test(line)
      )
    );
    if (caseAnswer) return caseAnswer;

    const caseItems = prefer(
      qualityItems.filter(
        (text) =>
          /có thể tha thứ|có thể|khi họ|khi ta/i.test(text) &&
          !/^kẻ thù là/i.test(text)
      )
    );
    if (caseItems) return caseItems;
  }

  if (TERM_QUESTION.test(sourceQ.question)) {
    const definition = prefer(
      qualityLines.filter((line) => /\blà\b/i.test(line) && line.length >= 20)
    );
    if (definition) return definition;
  }

  return (
    prefer(qualityLines) ||
    prefer(qualityItems) ||
    qualityLines[0] ||
    qualityItems[0] ||
    null
  );
}

function extractCountInfo(answer, items) {
  for (const unit of COUNT_UNITS) {
    const match = answer.match(new RegExp(`có\\s+(\\d+)\\s+${unit}`, 'i'));
    if (match) {
      return { count: parseInt(match[1], 10), unit };
    }
  }

  if (items.length >= 2) {
    return { count: items.length, unit: 'điều' };
  }

  return null;
}

function buildCountOptions(correctCount, unit, seed) {
  const values = new Set([correctCount]);
  for (let delta = 1; values.size < 4 && delta <= 4; delta++) {
    if (correctCount - delta >= 2) values.add(correctCount - delta);
    if (correctCount + delta <= 12) values.add(correctCount + delta);
  }

  while (values.size < 4) {
    values.add(Math.max(2, correctCount + values.size));
  }

  const options = [...values].slice(0, 4).map((n) => `${n} ${unit}`);
  const shuffled = shuffleWithSeed(options, seed);
  const correct = `${correctCount} ${unit}`;

  return {
    options: shuffled,
    correctIndex: shuffled.indexOf(correct),
  };
}

function isConfusableOption(option, reference) {
  const a = normalizeComparable(option).replace(/…+/g, '').trim();
  const b = normalizeComparable(reference).replace(/…+/g, '').trim();
  if (!a || !b) return false;
  if (a === b) return true;

  const shorter = a.length <= b.length ? a : b;
  const longer = a.length <= b.length ? b : a;
  if (shorter.length >= 16 && longer.startsWith(shorter)) return true;
  if (shorter.length >= 20 && longer.includes(shorter)) return true;

  const coreA = option.match(/thể hiện\s+(.+)/i)?.[1]?.replace(/…+$/, '').trim();
  const coreB = reference.match(/thể hiện\s+(.+)/i)?.[1]?.replace(/…+$/, '').trim();
  if (coreA && coreB) {
    const coreShorter = coreA.length <= coreB.length ? coreA : coreB;
    const coreLonger = coreA.length <= coreB.length ? coreB : coreA;
    if (
      coreShorter.length >= 12 &&
      coreLonger.toLowerCase().includes(coreShorter.toLowerCase().slice(0, 20))
    ) {
      return true;
    }
  }

  const tokensA = tokenizeForOverlap(option);
  const tokensB = tokenizeForOverlap(reference);
  let shared = 0;
  for (const token of tokensA) {
    if (tokensB.has(token)) shared++;
  }
  const minSize = Math.min(tokensA.size, tokensB.size);
  return minSize >= 4 && shared / minSize >= 0.72;
}

function distillSingleCorrectAnswer(sourceQ, answer) {
  const question = sourceQ.question ?? '';
  const text = answer.replace(/\s+/g, ' ').trim();

  if (/tôn giả nào|thái tổ sư/i.test(question)) {
    const match = text.match(/tôn giả\s+([A-Za-zÀ-ỹ]+(?:\s*\([^)]+\))?)/i);
    if (match) return `Tôn giả ${match[1].trim()}`;
  }

  if (/chưởng môn.*\bai\b/i.test(question)) {
    const match = text.match(/(?:là|là Võ sư|là Đại Đức)\s+([^\n.]+)/i);
    if (match) return truncateOption(match[1].trim(), 80);
  }

  if (/ý nghĩa/i.test(question)) {
    const meaning = text.match(/Thể hiện\s+(.+?)(?:\.|$)/i);
    if (meaning) {
      const essence = meaning[1]
        .split(/\s+và\s+/i)[0]
        .trim()
        .replace(/[,;]$/, '');
      return truncateOption(`Thể hiện ${essence}`, 100);
    }
  }

  if (/danh tính|sáng tổ/i.test(question)) {
    const match = text.match(/^(Võ sư[^.]{10,120}\.)/i);
    if (match) return truncateOption(match[1], 100);
  }

  return null;
}

function buildSingleOptions(correct, distractors, seed, context = {}) {
  if (!isQualityAnswerOption(correct, context)) return null;

  const unique = [correct];
  for (const d of distractors) {
    const option = truncateOption(d);
    if (
      option &&
      option !== correct &&
      !unique.includes(option) &&
      !unique.some((existing) => isConfusableOption(option, existing)) &&
      !isConfusableOption(option, correct) &&
      isQualityAnswerOption(option, context)
    ) {
      unique.push(option);
    }
  }

  if (unique.length < 4) return null;

  const options = shuffleWithSeed(unique.slice(0, 4), seed);
  return {
    options,
    correctIndex: options.indexOf(correct),
  };
}

function extractFactualLines(answer) {
  return answer
    .split('\n')
    .map((line) => line.trim())
    .filter(
      (line) =>
        line.length >= 12 &&
        line.length <= 200 &&
        !isSectionHeader(line) &&
        !isAnswerIntroHeading(line) &&
        !COUNT_QUESTION.test(line) &&
        !/^nguồn gốc ý tưởng:?$/i.test(line)
    );
}

function pickDistractors(correct, sameList, lessonPool, count = 3, context = {}) {
  const distractors = [];
  const blocked = new Set([correct.toLowerCase()]);

  for (const item of sameList) {
    const text = truncateOption(typeof item === 'string' ? item : item.text);
    if (
      !blocked.has(text.toLowerCase()) &&
      !isConfusableOption(text, correct) &&
      isQualityAnswerOption(text, context)
    ) {
      distractors.push(text);
      blocked.add(text.toLowerCase());
    }
    if (distractors.length >= count) return distractors;
  }

  for (const text of lessonPool) {
    const option = truncateOption(text);
    if (
      !blocked.has(option.toLowerCase()) &&
      !isConfusableOption(option, correct) &&
      isQualityAnswerOption(option, context)
    ) {
      distractors.push(option);
      blocked.add(option.toLowerCase());
    }
    if (distractors.length >= count) break;
  }

  return distractors;
}

function buildLessonPool(sourceQuestions) {
  const pool = [];
  for (const q of sourceQuestions) {
    const context = buildOptionContext(q);
    for (const item of extractListItems(q.answer)) {
      const text = truncateOption(item.text);
      if (isQualityAnswerOption(text, context)) pool.push(text);
    }
    for (const line of extractFactualLines(q.answer)) {
      const text = truncateOption(line);
      if (isQualityAnswerOption(text, context)) pool.push(text);
    }
  }
  return [...new Set(pool.filter((text) => text && text.length > 8))];
}

function normalizeQuestionText(sourceQuestion) {
  return sourceQuestion
    .replace(/^Hỏi:\s*/i, '')
    .replace(/\?$/, '')
    .trim();
}

function extractLabeledPairs(items) {
  return items
    .map((item) => {
      const match = item.text.match(LABELED_LINE);
      if (!match) return null;
      const left = match[1].trim();
      const right = match[2].trim();
      if (left.length < 2 || right.length < 4) return null;
      return { left: truncateOption(left, 48), right: truncateOption(right, 80) };
    })
    .filter(Boolean);
}

function hasOrderedSteps(answer, items) {
  const lines = answer.split('\n').map((l) => l.trim()).filter(Boolean);
  const ordinalCount = lines.filter((line) => ORDINAL_LINE.test(line)).length;
  const numberedCount = lines.filter((line) => NUMBERED_LINE.test(line)).length;
  if (ordinalCount >= 3 || numberedCount >= 3) return true;
  if (items.length >= 3 && items.some((item) => ORDINAL_LINE.test(item.text))) {
    return true;
  }
  return /bước|thứ tự|trình tự|quy trình/i.test(answer);
}

function extractOrderedItems(answer, items) {
  const lines = answer.split('\n').map((l) => l.trim()).filter(Boolean);
  const ordered = [];

  for (const line of lines) {
    if (ORDINAL_LINE.test(line) || NUMBERED_LINE.test(line)) {
      const text = stripListPrefix(line);
      if (text.length >= 6) ordered.push(truncateOption(text, 90));
    }
  }

  if (ordered.length >= 3) return ordered;

  if (items.length >= 3) {
    return items.map((item) => truncateOption(stripListPrefix(item.text) || item.text, 90));
  }

  return [];
}

function isPlausibleFillBlank(blank) {
  const text = blank.trim();
  if (text.length < 2) return false;
  if (/^nhiều|với vai trò|nhưng do|tuy nhiên|được rèn luyện/i.test(text)) return false;
  if (/^\d{4}$/.test(text)) return true;
  if (/^(Võ sư|Đại Đức|Thượng|tôn giả|Thích)/i.test(text)) return true;
  if (/tháng\s+\d+\s+năm\s+\d{4}/i.test(text)) return true;
  if (/tinh thần|đoàn kết|nhắc nhở|tu dưỡng/i.test(text) && text.length <= 70) return true;
  return text.length <= 45 && !/\b(là một|vì|nên|nhưng)\b/i.test(text);
}

function extractFillBlanks(sourceQ, answer) {
  const andMatch = answer.match(
    /(?:là|để|nhằm)\s+([^.\n]{4,40}?)\s+và\s+([^.\n]{4,40}?)(?:[.\n]|$)/i
  );
  if (andMatch) {
    const blank1 = andMatch[1].trim().replace(/[,;]$/, '');
    const blank2 = andMatch[2].trim().replace(/[,;]$/, '');
    if (blank1.length >= 3 && blank2.length >= 3) {
      const stem = normalizeQuestionText(sourceQ.question);
      return {
        question: `${stem}? Điền vào chỗ trống: ______ và ______.`,
        blanks: [blank1, blank2],
      };
    }
  }

  const defMatch = answer.match(
    /(?:^|\n)([^:\n]{8,80}?)\s+là\s+([^.\n]{4,50})(?:[.\n]|$)/i
  );
  if (defMatch && TERM_QUESTION.test(sourceQ.question)) {
    const term = defMatch[2].trim().replace(/[,;]$/, '');
    if (term.length >= 3 && term.length <= 40) {
      const stem = normalizeQuestionText(sourceQ.question);
      return {
        question: `${stem}? Điền thuật ngữ chính xác: ______.`,
        blanks: [term],
      };
    }
  }

  const yearMatch = answer.match(/năm\s+(\d{4})/i);
  if (yearMatch && /năm nào|khi nào|ngày tháng năm|thành lập/i.test(sourceQ.question)) {
    if (!/do ai|ý tưởng|sáng lập.*ai/i.test(sourceQ.question)) {
      return {
        question: `${normalizeQuestionText(sourceQ.question)}? Điền năm: ______.`,
        blanks: [yearMatch[1]],
      };
    }
  }

  const founderLineMatch = answer.match(/Môn phái[^\n:]*do\s*:\s*([^\n.]+)/i);
  if (
    founderLineMatch &&
    /ai sáng lập|do ai|sáng lập nên/i.test(sourceQ.question) &&
    !/ý tưởng từ đâu/i.test(sourceQ.question)
  ) {
    const name = founderLineMatch[1]
      .trim()
      .replace(/\s+sáng lập.*$/i, '')
      .replace(/[,;]$/, '')
      .split(',')[0]
      .trim();
    if (isPlausibleFillBlank(name)) {
      return {
        question: `${normalizeQuestionText(sourceQ.question)}? Điền tên hoặc danh tính: ______.`,
        blanks: [truncateOption(name, 40)],
      };
    }
  }

  const dateMatch = answer.match(/sinh ngày\s+(\d{1,2}\s+tháng\s+\d{1,2}\s+năm\s+\d{4})/i);
  if (dateMatch && /ngày sinh|sinh ngày|danh tính/i.test(sourceQ.question)) {
    return {
      question: `${normalizeQuestionText(sourceQ.question)}? Điền ngày sinh: ______.`,
      blanks: [dateMatch[1]],
    };
  }

  const personMatch = answer.match(
    /(?:là|do)\s*:\s*((?:Võ sư|Đại Đức|Thượng|Viện chủ|Thích|tôn giả)[^\n.]{4,80})/i
  );
  if (personMatch && /ai|danh tính|chưởng môn|sáng lập|viện chủ/i.test(sourceQ.question)) {
    const name = personMatch[1].trim().replace(/[,;]$/, '').split(',')[0].trim();
    if (isPlausibleFillBlank(name)) {
      return {
        question: `${normalizeQuestionText(sourceQ.question)}? Điền tên hoặc danh tính: ______.`,
        blanks: [truncateOption(name, 40)],
      };
    }
  }

  const honorificMatch = answer.match(
    /tôn giả\s+([A-Za-zÀ-ỹ]+(?:\s*\([^)]+\))?)/i
  );
  if (honorificMatch && /tôn giả nào|thái tổ/i.test(sourceQ.question)) {
    return {
      question: `${normalizeQuestionText(sourceQ.question)}? Điền tên tôn giả: ______.`,
      blanks: [truncateOption(honorificMatch[1].trim(), 40)],
    };
  }

  if (/ý nghĩa/i.test(sourceQ.question)) {
    const meaning = answer.match(/Thể hiện\s+([^.\n]+)/i);
    if (meaning) {
      const blank = meaning[1]
        .split(/\s+và\s+/i)[0]
        .trim()
        .replace(/[,;]$/, '');
      if (blank.length >= 8 && blank.length <= 70 && isPlausibleFillBlank(blank)) {
        return {
          question: `${normalizeQuestionText(sourceQ.question)}? Điền ý nghĩa chính: ______.`,
          blanks: [truncateOption(blank, 60)],
        };
      }
    }
  }

  const firstClause = answer
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line.length >= 8 && line.length <= 80);
  if (firstClause && TERM_QUESTION.test(sourceQ.question)) {
    const keyword = firstClause.split(/[,;]/)[0].trim();
    if (keyword.length >= 4 && keyword.length <= 35) {
      return {
        question: `${normalizeQuestionText(sourceQ.question)}? Điền cụm từ chính: ______.`,
        blanks: [keyword],
      };
    }
  }

  return null;
}

function extractOathMatchingPairs(answer) {
  const pairs = [];
  for (const line of answer.split('\n').map((l) => l.trim()).filter(Boolean)) {
    const match = line.match(/^(Một|Hai|Ba|Bốn|Năm|Sáu)[,，\.:\s]+(.+)$/i);
    if (match) {
      pairs.push({
        left: match[1],
        right: truncateOption(match[2], 80),
      });
    }
  }
  return pairs;
}

const SCENARIO_ACTION_VERBS =
  /\b(đi|tập|chào|vắng|bỏ|tự ý|dùng|cư xử|hứa|lan|thách|đăng ký|thay đổi|sử dụng|từ chối|nghỉ|trễ|gây|thượng|kiểm|giải quyết|phân|ủy quyền|tuân thủ|thực hiện|hỗ trợ|giúp|tôn trọng)\b/i;

function hasApplicableScenarioContent(items, answer, sourceQuestion) {
  if (items.some((item) => isRuleItemText(item.text))) {
    return true;
  }

  if (
    /kỷ luật|quy tắc|nguyên tắc|dụng võ|đối xử|vi phạm|thống nhất chỉ huy|quản trị|thượng đài|thử võ/i.test(
      `${sourceQuestion}\n${answer}`
    )
  ) {
    return true;
  }

  return /phải|không|nên|cần|chỉ được|chỉ dụng|quy định|kỷ luật|giới luật/i.test(
    `${sourceQuestion}\n${answer}`
  );
}

function isVagueScenarioBehavior(behavior) {
  if (!behavior || behavior.length < 24) return true;
  if (!SCENARIO_ACTION_VERBS.test(behavior)) return true;
  return false;
}

function invertMustRule(text) {
  const mustMatch = text.match(/phải\s+(.+?)(?:[.;]|$)/i);
  if (!mustMatch) return null;

  const action = mustMatch[1].trim().replace(/[,;]$/, '');
  if (action.length < 8 || action.length > 90) return null;

  return `không ${action.charAt(0).toLowerCase()}${action.slice(1)}`;
}

function invertMustNotRule(text) {
  const mustNotMatch = text.match(/(?:^|[,;]\s*)không\s+(.+?)(?:[,;]|$)/i);
  if (!mustNotMatch) return null;

  const forbidden = mustNotMatch[1].trim().replace(/[,;]$/, '');
  if (forbidden.length < 8 || forbidden.length > 90) return null;

  const first = forbidden.charAt(0).toLowerCase() + forbidden.slice(1);
  return first;
}

function findRuleViolationForText(text) {
  return invertMustRule(text) || invertMustNotRule(text);
}

function planScenario(sourceQ, items, answer) {
  if (!hasApplicableScenarioContent(items, answer, sourceQ.question)) {
    return null;
  }

  for (const item of items) {
    if (!isRuleItemText(item.text)) continue;

    const behavior = findRuleViolationForText(item.text);
    if (!behavior || isVagueScenarioBehavior(behavior)) continue;

    return {
      behavior,
      correctText: truncateOption(item.text, 100),
    };
  }

  return null;
}

const RULE_ITEM_PATTERN = /phải|không|cần|nên|tuyệt đối|chỉ dụng|chỉ dùng|chỉ được|nghỉ tập|vắng|xin phép/i;

function isRuleItemText(text) {
  return RULE_ITEM_PATTERN.test(text);
}

function behaviorMatchesCorrectAnswer(behavior, correctText) {
  if (isRuleItemText(correctText)) return true;

  const behaviorTokens = tokenizeForOverlap(behavior);
  const correctTokens = tokenizeForOverlap(correctText);
  let shared = 0;

  for (const token of behaviorTokens) {
    if (correctTokens.has(token)) shared++;
  }

  return shared >= 2;
}

function tokenizeForOverlap(text) {
  return new Set(
    text
      .toLowerCase()
      .split(/[^\p{L}\p{N}]+/u)
      .filter((token) => token.length >= 4)
  );
}

function optionsAreTooAmbiguous(options, correctIndex, behavior) {
  const correct = options[correctIndex];
  if (!correct) return true;

  const behaviorTokens = tokenizeForOverlap(behavior);
  const correctTokens = tokenizeForOverlap(correct);

  let plausibleAlternatives = 0;
  for (let index = 0; index < options.length; index++) {
    if (index === correctIndex) continue;

    const optionTokens = tokenizeForOverlap(options[index]);
    let sharedWithCorrect = 0;
    let sharedWithBehavior = 0;

    for (const token of optionTokens) {
      if (correctTokens.has(token)) sharedWithCorrect++;
      if (behaviorTokens.has(token)) sharedWithBehavior++;
    }

    if (sharedWithCorrect >= 2 || sharedWithBehavior >= 2) {
      plausibleAlternatives++;
    }
  }

  return plausibleAlternatives >= 2;
}

function validateScenarioQuestion({ behavior, options, correctIndex }) {
  if (isVagueScenarioBehavior(behavior)) return false;
  if (!options[correctIndex]) return false;
  if (options.length < 4) return false;
  if (!behaviorMatchesCorrectAnswer(behavior, options[correctIndex])) return false;
  if (optionsAreTooAmbiguous(options, correctIndex, behavior)) return false;
  return true;
}

function buildScenarioOptions(plan, items, lessonPool, sequence, sourceQ) {
  const context = buildOptionContext(sourceQ);
  const sameObjective = items
    .map((item) => truncateOption(item.text, 100))
    .filter(
      (text) =>
        text &&
        text !== plan.correctText &&
        isRuleItemText(text) &&
        isQualityAnswerOption(text, context)
    );

  const distractors = [];
  const blocked = new Set([plan.correctText.toLowerCase()]);

  for (const text of sameObjective) {
    if (!blocked.has(text.toLowerCase())) {
      distractors.push(text);
      blocked.add(text.toLowerCase());
    }
    if (distractors.length >= 3) break;
  }

  for (const text of lessonPool) {
    const option = truncateOption(text, 100);
    if (
      !blocked.has(option.toLowerCase()) &&
      isQualityAnswerOption(option, context)
    ) {
      distractors.push(option);
      blocked.add(option.toLowerCase());
    }
    if (distractors.length >= 3) break;
  }

  return buildSingleOptions(plan.correctText, distractors, sequence + 13, context);
}

function scoreDistractorRelevance(text, sourceQ, correctItems) {
  const optionTokens = tokenizeForOverlap(text);
  if (optionTokens.size === 0) return 0;

  const questionTokens = tokenizeForOverlap(sourceQ.question ?? '');
  const answerTokens = tokenizeForOverlap(sourceQ.answer ?? '');
  let questionOverlap = 0;
  let answerOverlap = 0;
  for (const token of optionTokens) {
    if (questionTokens.has(token)) questionOverlap++;
    if (answerTokens.has(token)) answerOverlap++;
  }

  let bestCorrectOverlap = 0;
  for (const correct of correctItems) {
    const correctTokens = tokenizeForOverlap(correct);
    let shared = 0;
    for (const token of optionTokens) {
      if (correctTokens.has(token)) shared++;
    }
    if (shared > bestCorrectOverlap) bestCorrectOverlap = shared;
  }

  // Keep distractors in lesson context; accept overlap with question, answer body, or correct concepts.
  if (questionOverlap === 0 && answerOverlap === 0 && bestCorrectOverlap === 0) return 0;
  return (
    questionOverlap * 3 +
    answerOverlap * 1.8 +
    bestCorrectOverlap * 2 +
    Math.min(optionTokens.size, 8) * 0.1
  );
}

function pickThematicWrongOptions(sourceQ, correctItems, lessonPool, needed, seed) {
  if (needed <= 0) return [];

  const blocked = new Set(correctItems.map((text) => text.toLowerCase()));
  const candidates = lessonPool
    .map((text) => truncateOption(text, 100))
    .filter(
      (text) =>
        text &&
        !blocked.has(text.toLowerCase()) &&
        isQualityAnswerOption(text, buildOptionContext(sourceQ))
    )
    .map((text) => ({
      text,
      score: scoreDistractorRelevance(text, sourceQ, correctItems),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.text.length - b.text.length);

  const picked = [];
  for (const entry of shuffleWithSeed(candidates, seed)) {
    if (
      picked.some((text) => text.toLowerCase() === entry.text.toLowerCase()) ||
      blocked.has(entry.text.toLowerCase())
    ) {
      continue;
    }
    picked.push(entry.text);
    blocked.add(entry.text.toLowerCase());
    if (picked.length >= needed) break;
  }

  if (picked.length < needed) {
    const nearMisses = buildNearMissDistractors(correctItems);
    for (const text of nearMisses) {
      if (
        blocked.has(text.toLowerCase()) ||
        !isQualityAnswerOption(text, buildOptionContext(sourceQ))
      ) {
        continue;
      }
      picked.push(text);
      blocked.add(text.toLowerCase());
      if (picked.length >= needed) break;
    }
  }

  return picked;
}

function buildNearMissDistractors(correctItems) {
  const swaps = [
    { from: /\bkhông\s+/i, to: '' },
    { from: /\bchỉ\s+/i, to: 'Có thể ' },
    { from: /\bphải\s+/i, to: 'không cần ' },
    { from: /\bđúng giờ\b/i, to: 'tuỳ ý thời gian' },
    { from: /\bchăm chỉ\b/i, to: 'qua loa' },
    { from: /\btự vệ\b/i, to: 'thể hiện bản thân' },
    { from: /\bbảo vệ\b/i, to: 'đánh bại' },
    { from: /\bđoàn kết\b/i, to: 'ganh đua' },
    { from: /\bphụng sự\b/i, to: 'mưu cầu lợi ích riêng' },
  ];

  const variants = [];
  for (const correct of correctItems) {
    const normalized = correct.replace(/\s+/g, ' ').trim();
    for (const swap of swaps) {
      if (!swap.from.test(normalized)) continue;
      const candidate = normalized.replace(swap.from, swap.to).replace(/\s+/g, ' ').trim();
      if (candidate.length >= 10 && candidate.toLowerCase() !== normalized.toLowerCase()) {
        variants.push(candidate.charAt(0).toUpperCase() + candidate.slice(1));
      }
    }
  }

  return [...new Set(variants)];
}

function getPreferredTypes(sourceQ, items, answer) {
  return getViableTypes(sourceQ, items, answer, []);
}

function canBuildMultiple(sourceQ, items, lessonPool) {
  if (IDEA_ORIGIN_QUESTION.test(sourceQ.question)) {
    return extractIdeaOriginItems(sourceQ.answer ?? '').length >= 2;
  }
  if (WHY_QUESTION.test(sourceQ.question.trim())) return false;
  if (/chứng minh|ví dụ|thí dụ/i.test(sourceQ.question)) return false;
  if (
    RHETORICAL_YES_NO.test(sourceQ.question.trim()) &&
    !LIST_QUESTION.test(sourceQ.question)
  ) {
    return false;
  }

  const context = buildOptionContext(sourceQ);
  const qualityItems = getQualityItemTexts(sourceQ, items);

  if (qualityItems.length < 2) return false;
  if (requiresFullListCoverage(sourceQ, items)) return true;
  if (OATH_QUESTION.test(sourceQ.question) && qualityItems.length >= 4) return true;
  if (LIST_QUESTION.test(sourceQ.question) && qualityItems.length >= 3) return true;
  if (COUNT_QUESTION.test(sourceQ.question) && qualityItems.length >= 3) return true;
  if (qualityItems.length >= 3) return true;

  const wrongCandidates = lessonPool.filter(
    (text) =>
      isQualityAnswerOption(text, context) &&
      !qualityItems.some((correct) => correct.toLowerCase() === text.toLowerCase())
  );
  return qualityItems.length >= 2 && qualityItems.length + wrongCandidates.length >= 4;
}

function canBuildFill(sourceQ, answer, lessonPool) {
  if (WHY_QUESTION.test(sourceQ.question.trim())) return false;

  const items = resolveListItems(sourceQ);
  if (COUNT_QUESTION.test(sourceQ.question) && extractCountInfo(answer, items)) {
    return false;
  }

  if (requiresFullListCoverage(sourceQ, items)) return false;
  if (LIST_QUESTION.test(sourceQ.question) && resolveListItems(sourceQ).length >= 2) {
    return false;
  }

  const fill = extractFillBlanks(sourceQ, answer);
  if (!fill) return false;
  if (!fill.blanks.every(isPlausibleFillBlank)) return false;
  return buildWordBank(fill.blanks, lessonPool, 1).length >= fill.blanks.length + 2;
}

function canBuildMatching(sourceQ, items, answer) {
  if (requiresFullListCoverage(sourceQ, items)) return false;

  const pairs = extractLabeledPairs(items);
  if (pairs.length >= 3) return true;
  if (OATH_QUESTION.test(sourceQ.question)) {
    return extractOathMatchingPairs(answer).length >= 4;
  }
  return false;
}

function canBuildOrdering(sourceQ, answer, items) {
  if (MARTIAL_USE_QUESTION.test(sourceQ.question)) return false;
  return extractOrderedItems(answer, items).length >= 3;
}

function canBuildScenario(sourceQ, items, lessonPool) {
  if (requiresFullListCoverage(sourceQ, items)) return false;
  if (CONCEPT_LIST_QUESTION.test(sourceQ.question) && items.length >= 2) return false;
  if (COMPARISON_QUESTION.test(sourceQ.question) && items.length >= 2) return false;

  if (LIST_QUESTION.test(sourceQ.question) && items.length >= 3) {
    const isPositivePurposeList = items.every(
      (item) => !/phải|không|cần|nên|tuyệt đối|chỉ dụng|chỉ được/i.test(item.text)
    );
    if (isPositivePurposeList) return false;
  }

  if (COUNT_QUESTION.test(sourceQ.question) && items.length >= 2) return false;
  if (OATH_QUESTION.test(sourceQ.question)) return false;
  if (MARTIAL_USE_QUESTION.test(sourceQ.question)) return false;
  if (/không được phép thượng đài|không được thượng đài/i.test(sourceQ.question)) {
    return false;
  }
  if (TERM_QUESTION.test(sourceQ.question) && !hasApplicableScenarioContent(items, sourceQ.answer, sourceQ.question)) {
    return false;
  }
  if (/năm nào|ngày sinh|sinh ngày|thành lập năm|ai sáng lập/i.test(sourceQ.question)) {
    return false;
  }

  const plan = planScenario(sourceQ, items, sourceQ.answer);
  if (!plan) return false;
  if (!isQualityAnswerOption(plan.correctText, buildOptionContext(sourceQ))) return false;

  const built = buildScenarioOptions(plan, items, lessonPool, 1, sourceQ);
  if (!built) return false;

  return validateScenarioQuestion({
    behavior: plan.behavior,
    options: built.options,
    correctIndex: built.correctIndex,
  });
}

function canBuildSingle(sourceQ, items, lessonPool) {
  if (
    IDEA_ORIGIN_QUESTION.test(sourceQ.question) &&
    extractIdeaOriginItems(sourceQ.answer ?? '').length >= 2
  ) {
    return false;
  }
  if (NATION_DUTY_QUESTION.test(sourceQ.question) && items.length >= 2) {
    return false;
  }
  if (requiresFullListCoverage(sourceQ, items)) return false;

  const context = buildOptionContext(sourceQ);
  const lines = extractFactualLines(sourceQ.answer ?? '');
  const countInfo = COUNT_QUESTION.test(sourceQ.question)
    ? extractCountInfo(sourceQ.answer ?? '', items)
    : null;
  if (countInfo) return true;

  const correct = pickPrimaryCorrectAnswer(sourceQ, lines, items);
  if (!correct) return false;

  const qualityLines = lines
    .map((line) => truncateOption(line, 100))
    .filter((line) => isQualityAnswerOption(line, context));
  const qualityItems = items
    .map((item) => truncateOption(item.text, 100))
    .filter((text) => isQualityAnswerOption(text, context));

  return (
    pickDistractors(
      correct,
      [
        ...qualityLines.filter((text) => text !== correct).map((text) => ({ text })),
        ...qualityItems.filter((text) => text !== correct).map((text) => ({ text })),
      ],
      lessonPool,
      3,
      context
    ).length >= 3
  );
}

function getViableTypes(sourceQ, items, answer, lessonPool) {
  const viable = [];

  if (canBuildMultiple(sourceQ, items, lessonPool)) viable.push('multiple');
  if (canBuildFill(sourceQ, answer, lessonPool)) viable.push('fill');
  if (canBuildMatching(sourceQ, items, answer)) viable.push('matching');
  if (canBuildOrdering(sourceQ, answer, items)) viable.push('ordering');
  if (canBuildScenario(sourceQ, items, lessonPool)) viable.push('scenario');
  if (canBuildTrueFalse(sourceQ, items, answer)) viable.push('truefalse');
  if (canBuildSingle(sourceQ, items, lessonPool)) viable.push('single');

  if (
    IDEA_ORIGIN_QUESTION.test(sourceQ.question) &&
    extractIdeaOriginItems(answer).length >= 2 &&
    viable.includes('multiple')
  ) {
    return [
      'multiple',
      ...viable.filter((type) => type !== 'multiple' && type !== 'single'),
    ];
  }

  if (
    (CONCEPT_LIST_QUESTION.test(sourceQ.question) ||
      COMPARISON_QUESTION.test(sourceQ.question) ||
      CONDUCT_QUESTION.test(sourceQ.question)) &&
    items.length >= 2 &&
    viable.includes('multiple')
  ) {
    return [
      'multiple',
      ...viable.filter((type) => type !== 'multiple' && type !== 'single'),
    ];
  }

  if (
    MARTIAL_USE_QUESTION.test(sourceQ.question) &&
    extractMartialUseCaseItems(answer).length >= 2 &&
    viable.includes('multiple')
  ) {
    return [
      'multiple',
      ...viable.filter((type) => type !== 'multiple' && type !== 'single'),
    ];
  }

  if (
    NATION_DUTY_QUESTION.test(sourceQ.question) &&
    items.length >= 2 &&
    viable.includes('multiple')
  ) {
    return [
      'multiple',
      ...viable.filter((type) => type !== 'multiple' && type !== 'single'),
    ];
  }

  if (requiresFullListCoverage(sourceQ, items) && viable.includes('multiple')) {
    return [
      'multiple',
      ...viable.filter((type) => type !== 'multiple' && type !== 'single'),
    ];
  }

  if (
    (WHY_QUESTION.test(sourceQ.question.trim()) ||
      /chứng minh|ví dụ|thí dụ/i.test(sourceQ.question) ||
      (RHETORICAL_YES_NO.test(sourceQ.question.trim()) &&
        !LIST_QUESTION.test(sourceQ.question)) ||
      (COUNT_QUESTION.test(sourceQ.question) &&
        /có\s+\d+\s+phần/i.test(answer))) &&
    viable.includes('single')
  ) {
    return [
      'single',
      ...viable.filter((type) => type !== 'single' && type !== 'multiple'),
    ];
  }

  if (
    /không được phép thượng đài|không được thượng đài/i.test(sourceQ.question) &&
    canBuildTrueFalse(sourceQ, items, answer)
  ) {
    return [
      'truefalse',
      ...viable.filter((type) => type !== 'truefalse' && type !== 'multiple' && type !== 'single'),
    ];
  }

  if (
    (/tôn giả nào|thái tổ sư/i.test(sourceQ.question) ||
      (/ý nghĩa/i.test(sourceQ.question) && canBuildFill(sourceQ, answer, lessonPool))) &&
    viable.includes('fill')
  ) {
    return ['fill', ...viable.filter((type) => type !== 'fill' && type !== 'single')];
  }

  return viable.length > 0 ? viable : ['single'];
}

function allocateTypeTargets(total) {
  const raw = TYPE_PRIORITY.map((type) => ({
    type,
    exact: total * TYPE_WEIGHTS[type],
    count: Math.floor(total * TYPE_WEIGHTS[type]),
  }));

  let assigned = raw.reduce((sum, entry) => sum + entry.count, 0);
  const remainders = [...raw].sort((a, b) => b.exact - a.exact - (a.exact - a.count));

  for (const entry of remainders) {
    if (assigned >= total) break;
    entry.count += 1;
    assigned += 1;
  }

  return Object.fromEntries(raw.map((entry) => [entry.type, entry.count]));
}

const RARE_TYPE_ORDER = [
  'ordering',
  'matching',
  'truefalse',
  'fill',
  'scenario',
  'multiple',
  'single',
];

function pickBestObjectiveForType(type, candidates) {
  if (type === 'multiple') {
    return [...candidates].sort((a, b) => {
      const score = (objective) => {
        let value = objective.items.length;
        if (LIST_QUESTION.test(objective.sourceQ.question)) value += 10;
        if (requiresFullListCoverage(objective.sourceQ, objective.items)) value += 14;
        if (COUNT_QUESTION.test(objective.sourceQ.question)) value += 5;
        if (MARTIAL_USE_QUESTION.test(objective.sourceQ.question)) value += 12;
        if (NATION_DUTY_QUESTION.test(objective.sourceQ.question)) value += 12;
        if (IDEA_ORIGIN_QUESTION.test(objective.sourceQ.question)) value += 12;
        if (CONCEPT_LIST_QUESTION.test(objective.sourceQ.question)) value += 12;
        if (COMPARISON_QUESTION.test(objective.sourceQ.question)) value += 10;
        if (CONDUCT_QUESTION.test(objective.sourceQ.question)) value += 10;
        return value;
      };
      return score(b) - score(a);
    })[0];
  }

  if (type === 'ordering') {
    return [...candidates].sort(
      (a, b) =>
        extractOrderedItems(b.answer, b.items).length -
        extractOrderedItems(a.answer, a.items).length
    )[0];
  }

  if (type === 'fill') {
    return (
      candidates.find(
        (objective) =>
          /năm nào|ngày sinh|sinh ngày|danh tính|ai/i.test(objective.sourceQ.question) ||
          TERM_QUESTION.test(objective.sourceQ.question)
      ) || candidates[0]
    );
  }

  if (type === 'matching') {
    return (
      candidates.find((objective) => OATH_QUESTION.test(objective.sourceQ.question)) ||
      candidates[0]
    );
  }

  if (type === 'scenario') {
    return (
      candidates.find((objective) => canBuildScenario(objective.sourceQ, objective.items, [])) ||
      candidates[0]
    );
  }

  if (type === 'truefalse') {
    return (
      candidates.find((objective) =>
        objective.items.some((item) =>
          /^(không|phải|tuyệt đối|chỉ được|chỉ dụng)\s+/i.test(item.text)
        )
      ) || candidates[0]
    );
  }

  return candidates[0];
}

function assignTypesToObjectives(objectives, targets) {
  if (objectives.length <= 4) {
    for (const objective of objectives) {
      objective.assignedType = objective.viableTypes[0] || 'single';
    }
    return objectives;
  }

  const remaining = { ...targets };
  const unassigned = () => objectives.filter((objective) => !objective.assignedType);

  for (const type of RARE_TYPE_ORDER) {
    while ((remaining[type] ?? 0) > 0 && unassigned().length > 0) {
      const candidates = unassigned().filter((objective) =>
        objective.viableTypes.includes(type)
      );
      if (candidates.length === 0) break;

      const chosen = pickBestObjectiveForType(type, candidates);
      chosen.assignedType = type;
      remaining[type] -= 1;
    }
  }

  for (const objective of objectives) {
    if (objective.assignedType) continue;

    const fallback = objective.viableTypes.find((type) => (remaining[type] ?? 0) > 0);
    objective.assignedType = fallback || objective.viableTypes[0] || 'single';
    remaining[objective.assignedType] = Math.max(
      0,
      (remaining[objective.assignedType] ?? 0) - 1
    );
  }

  return objectives;
}

function reorderByTypeDiversity(questions) {
  const result = [...questions];

  for (let pass = 0; pass < result.length; pass++) {
    let changed = false;

    for (let i = 0; i <= result.length - 3; i++) {
      const slice = result.slice(i, i + 3).map((q) => q.type);
      if (new Set(slice).size > 1) continue;

      for (let j = i + 3; j < result.length; j++) {
        if (result[j].type !== slice[0]) {
          [result[i + 2], result[j]] = [result[j], result[i + 2]];
          changed = true;
          break;
        }
      }
    }

    if (!changed) break;
  }

  return result;
}

function buildWordBank(blanks, lessonPool, seed) {
  const bank = [...blanks];
  for (const text of shuffleWithSeed(lessonPool, seed)) {
    const option = truncateOption(text, 40);
    if (
      option &&
      isQualityAnswerOption(option) &&
      !bank.some((b) => b.toLowerCase() === option.toLowerCase()) &&
      option.length >= 3 &&
      option.length <= 40
    ) {
      bank.push(option);
    }
    if (bank.length >= Math.max(6, blanks.length + 4)) break;
  }

  while (bank.length < blanks.length + 3) {
    bank.push(`Lựa chọn ${bank.length + 1}`);
  }

  return shuffleWithSeed(bank.slice(0, Math.min(8, bank.length)), seed + 11);
}

function makeQuestion(meta, sequence, payload) {
  return {
    id: `${meta.id}-q${String(sequence).padStart(2, '0')}`,
    lessonId: meta.id,
    number: sequence,
    ...payload,
  };
}

function buildIdeaOriginQuestionText(sourceQ) {
  const stem = sourceQ.question
    .replace(/\?$/g, '')
    .replace(/môn võ này/i, 'môn võ Phật Quang Quyền')
    .trim();
  return stem.endsWith('?') ? stem : `${stem}?`;
}

function buildSingleQuestion(sourceQ, items, lessonPool, meta, sequence) {
  const context = buildOptionContext(sourceQ);

  const lines = extractFactualLines(sourceQ.answer);
  const countInfo = COUNT_QUESTION.test(sourceQ.question)
    ? extractCountInfo(sourceQ.answer, items)
    : null;

  if (countInfo) {
    const question = `${normalizeQuestionText(sourceQ.question)}?`;
    const { options, correctIndex } = buildCountOptions(
      countInfo.count,
      countInfo.unit,
      sequence
    );
    return makeQuestion(meta, sequence, {
      type: 'single',
      question,
      options,
      correctIndex,
      explanation: sourceQ.answer,
      sourceQuestion: sourceQ.question,
    });
  }

  const qualityLines = lines
    .map((line) => truncateOption(line))
    .filter((line) => isQualityAnswerOption(line, context));

  const qualityItems = items
    .map((item) => truncateOption(item.text))
    .filter((text) => isQualityAnswerOption(text, context));

  if (requiresFullListCoverage(sourceQ, items)) return null;

  const rawCorrect = pickPrimaryCorrectAnswer(sourceQ, lines, items);
  if (!rawCorrect) return null;

  const correct = distillSingleCorrectAnswer(sourceQ, sourceQ.answer ?? '') ?? rawCorrect;

  const built = buildSingleOptions(
    correct,
    pickDistractors(
      correct,
      [
        ...qualityLines.filter((text) => text !== correct).map((text) => ({ text })),
        ...qualityItems.filter((text) => text !== correct).map((text) => ({ text })),
      ],
      lessonPool,
      3,
      context
    ),
    sequence,
    context
  );

  if (!built) return null;

  const question = sourceQ.question.endsWith('?')
    ? sourceQ.question
    : `${sourceQ.question}?`;

  return makeQuestion(meta, sequence, {
    type: 'single',
    question,
    options: built.options,
    correctIndex: built.correctIndex,
    explanation: sourceQ.answer,
    sourceQuestion: sourceQ.question,
  });
}

function buildMultipleQuestion(sourceQ, items, lessonPool, meta, sequence) {
  const context = buildOptionContext(sourceQ);

  if (IDEA_ORIGIN_QUESTION.test(sourceQ.question)) {
    const correctItems = extractIdeaOriginItems(sourceQ.answer ?? '').map((item) =>
      truncateOption(item.text, 100)
    );
    if (correctItems.length < 2) return null;
    const neededWrong = Math.max(1, Math.min(4, MAX_MULTIPLE_OPTIONS - correctItems.length));
    const wrongItems = pickThematicWrongOptions(
      sourceQ,
      correctItems,
      lessonPool,
      neededWrong,
      sequence + 31
    );
    if (wrongItems.length === 0) return null;

    const options = shuffleWithSeed([...correctItems, ...wrongItems], sequence + 7);
    const correctIndices = correctItems
      .map((text) => options.indexOf(text))
      .filter((index) => index >= 0)
      .sort((a, b) => a - b);

    if (correctIndices.length < 2) return null;

    return makeQuestion(meta, sequence, {
      type: 'multiple',
      question: `${buildIdeaOriginQuestionText(sourceQ)} (Chọn tất cả đáp án đúng)`,
      options,
      correctIndices,
      explanation: sourceQ.answer,
      sourceQuestion: sourceQ.question,
    });
  }

  const correctItems = getQualityItemTexts(sourceQ, items);
  if (correctItems.length < 2) return null;

  const wrongCandidates = requiresFullListCoverage(sourceQ, items)
    ? []
    : lessonPool.filter(
        (text) =>
          isQualityAnswerOption(text, context) &&
          !correctItems.some((correct) => correct.toLowerCase() === text.toLowerCase())
      );

  const neededWrong = Math.max(1, Math.min(4, MAX_MULTIPLE_OPTIONS - correctItems.length));
  const wrongItems = pickThematicWrongOptions(
    sourceQ,
    correctItems,
    wrongCandidates,
    neededWrong,
    sequence
  );
  if (wrongItems.length === 0) return null;

  const combined = [...correctItems];
  for (const wrong of wrongItems) {
    if (combined.length >= MAX_MULTIPLE_OPTIONS) break;
    if (!combined.some((text) => text.toLowerCase() === wrong.toLowerCase())) {
      combined.push(wrong);
    }
  }

  const options = shuffleWithSeed(combined, sequence + 7);

  const correctIndices = correctItems
    .map((text) => options.indexOf(text))
    .filter((index) => index >= 0)
    .sort((a, b) => a - b);

  if (correctIndices.length < 2) return null;

  const question = OATH_QUESTION.test(sourceQ.question)
    ? 'Câu nào sau đây thuộc 6 lời thế môn sinh Phật Quang Quyền? (Chọn tất cả đáp án đúng)'
    : MARTIAL_USE_QUESTION.test(sourceQ.question)
        ? 'Võ sinh Phật Quang Quyền được phép dụng võ trong các trường hợp nào? (Chọn tất cả đáp án đúng)'
        : NATION_DUTY_QUESTION.test(sourceQ.question)
          ? `${normalizeQuestionText(sourceQ.question)}? (Chọn tất cả phẩm chất đúng)`
          : `${normalizeQuestionText(sourceQ.question)}? (Chọn tất cả đáp án đúng)`;

  return makeQuestion(meta, sequence, {
    type: 'multiple',
    question,
    options,
    correctIndices,
    explanation: sourceQ.answer,
    sourceQuestion: sourceQ.question,
  });
}

function buildFillQuestion(sourceQ, answer, lessonPool, meta, sequence) {
  const fill = extractFillBlanks(sourceQ, answer);
  if (!fill) return null;

  const wordBank = buildWordBank(fill.blanks, lessonPool, sequence);

  return makeQuestion(meta, sequence, {
    type: 'fill',
    question: fill.question,
    options: wordBank,
    blanks: fill.blanks,
    explanation: sourceQ.answer,
    sourceQuestion: sourceQ.question,
  });
}

function buildMatchingQuestion(sourceQ, items, lessonPool, meta, sequence) {
  const labeledPairs = extractLabeledPairs(items);
  const oathPairs = OATH_QUESTION.test(sourceQ.question)
    ? extractOathMatchingPairs(sourceQ.answer)
    : [];
  const pairs =
    labeledPairs.length >= 3
      ? labeledPairs
      : oathPairs.length >= 4
        ? oathPairs
        : [];

  if (pairs.length < 3) return null;

  const maxPairs = OATH_QUESTION.test(sourceQ.question) ? 6 : 5;
  const selected = pairs.slice(0, Math.min(maxPairs, pairs.length));
  const leftItems = selected.map((pair) => pair.left);
  const rightValues = selected.map((pair) => pair.right);
  const rightItems = shuffleWithSeed(rightValues, sequence + 3);
  const correctPairs = selected.map((pair, leftIndex) => [
    leftIndex,
    rightItems.indexOf(pair.right),
  ]);

  return makeQuestion(meta, sequence, {
    type: 'matching',
    question: OATH_QUESTION.test(sourceQ.question)
      ? 'Ghép số thứ tự với đúng lời thế môn sinh Phật Quang Quyền.'
      : `${normalizeQuestionText(sourceQ.question)}? Ghép mỗi mục bên trái với nội dung đúng bên phải.`,
    options: [],
    leftItems,
    rightItems,
    correctPairs,
    explanation: sourceQ.answer,
    sourceQuestion: sourceQ.question,
  });
}

function buildOrderingQuestion(sourceQ, answer, items, meta, sequence) {
  const orderedItems = extractOrderedItems(answer, items);
  if (orderedItems.length < 3) return null;

  const itemsShuffled = shuffleWithSeed(orderedItems, sequence + 5);
  const correctOrder = orderedItems.map((item) => itemsShuffled.indexOf(item));

  return makeQuestion(meta, sequence, {
    type: 'ordering',
    question: `${normalizeQuestionText(sourceQ.question)}? Sắp xếp các bước theo đúng thứ tự.`,
    options: [],
    items: itemsShuffled,
    correctOrder,
    explanation: sourceQ.answer,
    sourceQuestion: sourceQ.question,
  });
}

function canBuildTrueFalse(sourceQ, items, answer) {
  if (CONCEPT_LIST_QUESTION.test(sourceQ.question) && items.length >= 2) return false;
  if (COMPARISON_QUESTION.test(sourceQ.question) && items.length >= 2) return false;
  if (LIST_QUESTION.test(sourceQ.question) && items.length >= 3) return false;
  if (COUNT_QUESTION.test(sourceQ.question)) return false;
  if (OATH_QUESTION.test(sourceQ.question)) return false;
  if (MARTIAL_USE_QUESTION.test(sourceQ.question)) return false;
  if (/không được phép thượng đài|không được thượng đài/i.test(sourceQ.question)) {
    return true;
  }
  if (/năm nào|ngày sinh|sinh ngày|thành lập năm|ai sáng lập/i.test(sourceQ.question)) {
    return false;
  }

  const statement = planTrueFalseStatement(sourceQ, items, answer);
  return Boolean(statement);
}

function planTrueFalseStatement(sourceQ, items, answer) {
  if (/không được phép thượng đài|không được thượng đài/i.test(sourceQ.question)) {
    return {
      question: 'Võ sinh Phật Quang Quyền được phép thượng đài.',
      correctIndex: 1,
    };
  }

  const ruleItems = items
    .map((item) => item.text.replace(/\s+/g, ' ').trim())
    .filter((text) => text.length >= 12 && text.length <= 140);

  for (const text of ruleItems) {
    if (/^không\s+/i.test(text)) {
      const positive = text.replace(/^không\s+/i, '').replace(/[.;]$/, '');
      if (positive.length >= 10) {
        return {
          question: `Võ sinh Phật Quang Quyền ${positive.charAt(0).toLowerCase()}${positive.slice(1)}.`,
          correctIndex: 1,
        };
      }
    }

    if (/^(phải|tuyệt đối|chỉ được|chỉ dụng)\s+/i.test(text)) {
      const statement = text.replace(/[.;]$/, '');
      return {
        question: `Theo quy định môn phái, môn sinh ${statement.charAt(0).toLowerCase()}${statement.slice(1)}.`,
        correctIndex: 0,
      };
    }
  }

  const lines = answer
    .split('\n')
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter((line) => line.length >= 16 && line.length <= 140);

  for (const line of lines) {
    if (/^không\s+/i.test(line)) {
      const positive = line.replace(/^không\s+/i, '').replace(/[.;]$/, '');
      if (positive.length >= 10) {
        return {
          question: `Môn sinh Phật Quang Quyền ${positive.charAt(0).toLowerCase()}${positive.slice(1)}.`,
          correctIndex: 1,
        };
      }
    }
  }

  return null;
}

function buildTrueFalseQuestion(sourceQ, items, meta, sequence, answer) {
  const plan = planTrueFalseStatement(sourceQ, items, answer);
  if (!plan) return null;

  return makeQuestion(meta, sequence, {
    type: 'truefalse',
    question: plan.question,
    options: ['Đúng', 'Sai'],
    correctIndex: plan.correctIndex,
    explanation: sourceQ.answer,
    sourceQuestion: sourceQ.question,
  });
}

function buildScenarioQuestion(sourceQ, items, lessonPool, meta, sequence) {
  const plan = planScenario(sourceQ, items, sourceQ.answer);
  if (!plan) return null;

  const built = buildScenarioOptions(plan, items, lessonPool, sequence, sourceQ);
  if (!built) return null;

  if (
    !validateScenarioQuestion({
      behavior: plan.behavior,
      options: built.options,
      correctIndex: built.correctIndex,
    })
  ) {
    return null;
  }

  const normalizedBehavior = plan.behavior
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/[.;,:]+$/, '');
  if (!normalizedBehavior) return null;

  const question = `Tình huống: Theo bài học, một môn sinh ${normalizedBehavior}.\n\nTheo nội dung bài học, lựa chọn nào phù hợp nhất?`;

  return makeQuestion(meta, sequence, {
    type: 'scenario',
    question,
    options: built.options,
    correctIndex: built.correctIndex,
    explanation: sourceQ.answer,
    sourceQuestion: sourceQ.question,
  });
}

function buildQuestionForType(type, sourceQ, items, answer, lessonPool, meta, sequence) {
  switch (type) {
    case 'multiple':
      return (
        buildMultipleQuestion(sourceQ, items, lessonPool, meta, sequence) ||
        buildSingleQuestion(sourceQ, items, lessonPool, meta, sequence)
      );
    case 'fill':
      return (
        buildFillQuestion(sourceQ, answer, lessonPool, meta, sequence) ||
        buildSingleQuestion(sourceQ, items, lessonPool, meta, sequence)
      );
    case 'matching':
      return (
        buildMatchingQuestion(sourceQ, items, lessonPool, meta, sequence) ||
        buildSingleQuestion(sourceQ, items, lessonPool, meta, sequence)
      );
    case 'ordering':
      return (
        buildOrderingQuestion(sourceQ, answer, items, meta, sequence) ||
        buildSingleQuestion(sourceQ, items, lessonPool, meta, sequence)
      );
    case 'scenario':
      return (
        buildScenarioQuestion(sourceQ, items, lessonPool, meta, sequence) ||
        buildSingleQuestion(sourceQ, items, lessonPool, meta, sequence)
      );
    case 'truefalse':
      return (
        buildTrueFalseQuestion(sourceQ, items, meta, sequence, answer) ||
        buildSingleQuestion(sourceQ, items, lessonPool, meta, sequence)
      );
    case 'single':
    default:
      return buildSingleQuestion(sourceQ, items, lessonPool, meta, sequence);
  }
}

export function buildQuizQuestions(meta, parsedQuestions) {
  const expandedQuestions = splitCompoundSourceQuestions(parsedQuestions);
  const lessonPool = buildLessonPool(expandedQuestions);

  const objectives = expandedQuestions.map((sourceQ) => {
    const items = resolveListItems(sourceQ);
    return {
      sourceQ,
      items,
      answer: sourceQ.answer,
      sourceQuestion: sourceQ.question,
      viableTypes: getViableTypes(sourceQ, items, sourceQ.answer, lessonPool),
      assignedType: null,
    };
  });

  const targets = allocateTypeTargets(objectives.length);
  assignTypesToObjectives(objectives, targets);

  const questions = [];

  for (const objective of objectives) {
    const typesToTry = [
      objective.assignedType,
      ...objective.viableTypes.filter((type) => type !== objective.assignedType),
      'single',
    ];

    let built = null;
    for (const type of typesToTry) {
      built = buildQuestionForType(
        type,
        objective.sourceQ,
        objective.items,
        objective.answer,
        lessonPool,
        meta,
        questions.length + 1
      );
      if (built) break;
    }

    if (built) questions.push(built);
  }

  const diversified = reorderByTypeDiversity(questions);

  return diversified.map((question, index) => ({
    ...question,
    number: index + 1,
    id: `${meta.id}-q${String(index + 1).padStart(2, '0')}`,
  }));
}

export function buildQuiz(meta, parsedQuestions) {
  return {
    lessonId: meta.id,
    title: `${meta.title} — Kiểm tra`,
    passThreshold: 70,
    questions: buildQuizQuestions(meta, parsedQuestions),
  };
}
