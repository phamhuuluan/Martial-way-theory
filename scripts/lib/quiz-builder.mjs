/**
 * Quiz builder — one question per learning objective with diverse question types.
 *
 * Distribution targets (approximate):
 *   single 40% | multiple 20% | fill 15% | matching 10% | ordering 5% | scenario 10%
 *
 * Anti-patterns avoided:
 *   - No splitting one concept into multiple questions
 *   - No one-question-per-bullet-point
 *   - No rephrasing the same objective
 *   - No filler questions
 */

const ORDINAL_LINE =
  /^(Một|Hai|Ba|Bốn|Năm|Sáu|Bảy|Tám|Chín|Mười)[,，\.:\s]+/i;
const BULLET_LINE = /^[•\u2022\uF0B7\u2013-]\s*(.+)$/;
const NUMBERED_LINE = /^(\d+)[.)]\s*(.+)$/;
const LABELED_LINE = /^([^:：]{3,40})[:：]\s*(.+)$/;

const COUNT_QUESTION =
  /có mấy|mấy điều|mấy điểm|mấy bước|mấy phần|mấy phẩm|mấy thời kỳ|mấy trường hợp|mấy loại|mấy nguyên tắc|mấy phương châm|bao nhiêu điều|bao nhiêu phần/i;

const LIST_QUESTION =
  /gồm những|bao gồm những|bao gồm|chi phần nào|những gì|những điều gì|nêu các|kể ra các|liệt kê|cần ghi nhớ/i;

const OATH_QUESTION = /lời thế|6 câu/i;

const SCENARIO_QUESTION =
  /làm thế nào|khi nào|nếu|vi phạm|không đúng|sai|cần làm gì|xử lý|thực hiện tốt|thực hiện như thế nào|để làm gì|ra sao/i;

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
  single: 0.4,
  multiple: 0.2,
  fill: 0.15,
  matching: 0.1,
  ordering: 0.05,
  scenario: 0.1,
};

const TYPE_PRIORITY = ['single', 'multiple', 'fill', 'matching', 'ordering', 'scenario'];

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
  if (isAnswerIntroHeading(cleaned)) return false;
  if (isSectionHeader(cleaned)) return false;
  if (optionRepeatsQuestionStem(cleaned, context)) return false;

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
  return /^(có \d+|môn sinh|quan niệm|chỉ dụng|trong đại|vì sao|nguồn gốc|đáp|phật quang quyền có \d+)/i.test(
    line
  );
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

function buildSingleOptions(correct, distractors, seed, context = {}) {
  if (!isQualityAnswerOption(correct, context)) return null;

  const unique = [correct];
  for (const d of distractors) {
    const option = truncateOption(d);
    if (
      option &&
      option !== correct &&
      !unique.includes(option) &&
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
    return {
      question: `${normalizeQuestionText(sourceQ.question)}? Điền năm: ______.`,
      blanks: [yearMatch[1]],
    };
  }

  const dateMatch = answer.match(/sinh ngày\s+(\d{1,2}\s+tháng\s+\d{1,2}\s+năm\s+\d{4})/i);
  if (dateMatch && /ngày sinh|sinh ngày|danh tính/i.test(sourceQ.question)) {
    return {
      question: `${normalizeQuestionText(sourceQ.question)}? Điền ngày sinh: ______.`,
      blanks: [dateMatch[1]],
    };
  }

  const personMatch = answer.match(
    /(?:là|do)\s+([A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][^\n.]{4,60})/i
  );
  if (personMatch && /ai|danh tính|chưởng môn|sáng lập|viện chủ/i.test(sourceQ.question)) {
    const name = personMatch[1].trim().replace(/[,;]$/, '');
    return {
      question: `${normalizeQuestionText(sourceQ.question)}? Điền tên hoặc danh tính: ______.`,
      blanks: [truncateOption(name, 40)],
    };
  }

  const honorificMatch = answer.match(
    /(tôn giả\s+[A-Za-zÀ-ỹ()]+(?:\s+[A-Za-zÀ-ỹ()]+)*)/i
  );
  if (honorificMatch && /tôn giả|thái tổ/i.test(sourceQ.question)) {
    return {
      question: `${normalizeQuestionText(sourceQ.question)}? Điền tên tôn giả: ______.`,
      blanks: [truncateOption(honorificMatch[1], 40)],
    };
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

const VAGUE_SCENARIO_PATTERNS = [
  /áp dụng kiến thức chưa đúng/i,
  /thực hiện sai/i,
  /vi phạm bài học/i,
  /không làm theo quy định/i,
  /không tuân thủ quy định/i,
  /nguyên lý hoặc quy định nào bị vi phạm hoặc cần áp dụng/i,
];

const SCENARIO_ACTION_VERBS =
  /\b(đi|tập|chào|vắng|bỏ|tự ý|dùng|cư xử|hứa|lan|thách|đăng ký|thay đổi|sử dụng|từ chối|nghỉ|trễ|gây|thượng|kiểm|giải quyết|phân|ủy quyền)\b/i;

const RULE_VIOLATION_MAP = [
  {
    rule: /phải chào|chào tôn ảnh|chào theo lối chào|chào trước khi ra về/i,
    violation:
      'thường xuyên bỏ qua nghi thức chào trước và sau khi tập luyện',
  },
  {
    rule: /xin phép/i,
    violation: 'vắng mặt buổi tập mà không xin phép huấn luyện viên',
  },
  {
    rule: /không làm việc riêng/i,
    violation:
      'sử dụng giờ tập để làm việc riêng thay vì tập trung luyện tập',
  },
  {
    rule: /đi tập đều đặn|đúng giờ/i,
    violation: 'thường xuyên đi trễ hoặc bỏ buổi tập mà không báo trước',
  },
  {
    rule: /không thượng đài|thượng đài/i,
    violation: 'chủ động đăng ký thi đấu trên võ đài để khẳng định bản thân',
  },
  {
    rule: /không gây hấn|thử võ/i,
    violation: 'chủ động thách đấu võ sĩ môn phái khác để so tài',
  },
  {
    rule: /tham vọng/i,
    violation: 'cư xử ganh đua, tranh giành danh hiệu với đồng môn',
  },
  {
    rule: /cha mẹ|hiếu thảo|phụ huynh/i,
    violation:
      'cư xử thiếu tôn trọng với cha mẹ dù vẫn chăm chỉ tập võ',
  },
  {
    rule: /thống nhất chỉ huy/i,
    violation:
      'tự ý ra quyết định quan trọng mà không thông qua cơ quan chỉ huy',
  },
  {
    rule: /trình tự kỹ thuật|kỹ thuật được hướng dẫn/i,
    violation: 'tự ý thay đổi trình tự kỹ thuật được huấn luyện viên hướng dẫn',
  },
  {
    rule: /võ lực.*gia đình|bất hòa trong gia đình/i,
    violation: 'dùng võ thuật để giải quyết mâu thuẫn trong gia đình',
  },
  {
    rule: /kiểm chứng|chưa kiểm chứng/i,
    violation: 'lan truyền thông tin chưa kiểm chứng trong võ đường',
  },
  {
    rule: /giúp đỡ[^\n]{0,24}đồng môn|đồng môn[^\n]{0,24}giúp đỡ/i,
    violation: 'từ chối hỗ trợ đồng môn khi được nhờ trong giờ tập',
  },
  {
    rule: /giữ lời|hứa hẹn|không nên hứa/i,
    violation: 'hứa hẹn với đồng môn rồi không thực hiện đúng cam kết',
  },
  {
    rule: /phân nhiệm rõ ràng/i,
    violation: 'tự ý đảm nhận công việc không thuộc phạm vi được phân công',
  },
  {
    rule: /ủy quyền/i,
    violation: 'tự quyết mọi việc dù bài học yêu cầu phải ủy quyền cho người phụ trách',
  },
];

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

  return RULE_VIOLATION_MAP.some(({ rule }) => rule.test(`${sourceQuestion}\n${answer}`));
}

function isVagueScenarioBehavior(behavior) {
  if (!behavior || behavior.length < 24) return true;
  if (VAGUE_SCENARIO_PATTERNS.some((pattern) => pattern.test(behavior))) return true;
  if (!SCENARIO_ACTION_VERBS.test(behavior)) return true;
  return false;
}

function invertMustRule(text) {
  const mustMatch = text.match(/phải\s+(.+?)(?:[.;]|$)/i);
  if (!mustMatch) return null;

  const action = mustMatch[1].trim().replace(/[,;]$/, '');
  if (action.length < 8 || action.length > 90) return null;

  if (/chào/i.test(action)) {
    return 'thường xuyên bỏ qua nghi thức chào trước và sau khi tập luyện';
  }

  return `không ${action.charAt(0).toLowerCase()}${action.slice(1)}`;
}

function invertMustNotRule(text) {
  const mustNotMatch = text.match(/(?:^|[,;]\s*)không\s+(.+?)(?:[,;]|$)/i);
  if (!mustNotMatch) return null;

  const forbidden = mustNotMatch[1].trim().replace(/[,;]$/, '');
  if (forbidden.length < 8 || forbidden.length > 90) return null;

  if (/thượng đài/i.test(forbidden)) {
    return 'chủ động đăng ký thi đấu trên võ đài để khẳng định bản thân';
  }

  if (/gây hấn|thử võ/i.test(forbidden)) {
    return 'chủ động thách đấu võ sĩ môn phái khác để so tài';
  }

  const first = forbidden.charAt(0).toLowerCase() + forbidden.slice(1);
  return first.startsWith('sử dụng') || first.startsWith('dùng')
    ? first
    : `thường xuyên ${first}`;
}

function findRuleViolationForText(text) {
  for (const { rule, violation } of RULE_VIOLATION_MAP) {
    if (rule.test(text)) return violation;
  }
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

  for (const { rule, violation } of RULE_VIOLATION_MAP) {
    if (!rule.test(`${sourceQ.question}\n${answer}`)) continue;

    const matchedItem = items.find(
      (item) => isRuleItemText(item.text) && rule.test(item.text)
    );
    if (!matchedItem || isVagueScenarioBehavior(violation)) continue;

    return {
      behavior: violation,
      correctText: truncateOption(matchedItem.text, 100),
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

  const genericWrong = [
    'Không thuộc nội dung bài học',
    'Thông tin không chính xác theo tài liệu',
    'Quy định không có trong bài học này',
  ];

  for (const text of genericWrong) {
    if (distractors.length >= 3) break;
    if (!blocked.has(text.toLowerCase())) {
      distractors.push(text);
      blocked.add(text.toLowerCase());
    }
  }

  return buildSingleOptions(plan.correctText, distractors, sequence + 13, context);
}

function getPreferredTypes(sourceQ, items, answer) {
  return getViableTypes(sourceQ, items, answer, []);
}

function canBuildMultiple(sourceQ, items, lessonPool) {
  const context = buildOptionContext(sourceQ);
  const qualityItems = items
    .map((item) => truncateOption(item.text, 80))
    .filter((text) => isQualityAnswerOption(text, context));

  if (qualityItems.length < 2) return false;
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
  const fill = extractFillBlanks(sourceQ, answer);
  if (!fill) return false;
  return buildWordBank(fill.blanks, lessonPool, 1).length >= fill.blanks.length + 2;
}

function canBuildMatching(sourceQ, items, answer) {
  const pairs = extractLabeledPairs(items);
  if (pairs.length >= 3) return true;
  if (OATH_QUESTION.test(sourceQ.question)) {
    return extractOathMatchingPairs(answer).length >= 4;
  }
  return false;
}

function canBuildOrdering(sourceQ, answer, items) {
  return extractOrderedItems(answer, items).length >= 3;
}

function canBuildScenario(sourceQ, items, lessonPool) {
  if (LIST_QUESTION.test(sourceQ.question) && items.length >= 3) {
    const isPositivePurposeList = items.every(
      (item) => !/phải|không|cần|nên|tuyệt đối|chỉ dụng|chỉ được/i.test(item.text)
    );
    if (isPositivePurposeList) return false;
  }

  if (COUNT_QUESTION.test(sourceQ.question) && items.length >= 2) return false;
  if (OATH_QUESTION.test(sourceQ.question)) return false;
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
  const context = buildOptionContext(sourceQ);
  const lines = extractFactualLines(sourceQ.answer ?? '');
  const countInfo = COUNT_QUESTION.test(sourceQ.question)
    ? extractCountInfo(sourceQ.answer ?? '', items)
    : null;
  if (countInfo) return true;

  const qualityLines = lines
    .map((line) => truncateOption(line, 100))
    .filter((line) => isQualityAnswerOption(line, context));
  const qualityItems = items
    .map((item) => truncateOption(item.text, 100))
    .filter((text) => isQualityAnswerOption(text, context));

  const correct = qualityLines[0] || qualityItems[0];
  if (!correct) return false;

  return (
    pickDistractors(
      correct,
      [
        ...qualityLines.slice(1).map((text) => ({ text })),
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
  if (canBuildSingle(sourceQ, items, lessonPool)) viable.push('single');

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

const RARE_TYPE_ORDER = ['ordering', 'matching', 'fill', 'scenario', 'multiple', 'single'];

function pickBestObjectiveForType(type, candidates) {
  if (type === 'multiple') {
    return [...candidates].sort((a, b) => {
      const score = (objective) => {
        let value = objective.items.length;
        if (LIST_QUESTION.test(objective.sourceQ.question)) value += 10;
        if (COUNT_QUESTION.test(objective.sourceQ.question)) value += 5;
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

  const correct = qualityLines[0] || qualityItems[0] || null;
  if (!correct) return null;

  const built = buildSingleOptions(
    correct,
    pickDistractors(
      correct,
      [
        ...qualityLines.slice(1).map((text) => ({ text })),
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
  const correctItems = items
    .map((item) => truncateOption(item.text, 80))
    .filter((text) => isQualityAnswerOption(text, context));
  if (correctItems.length < 2) return null;

  const wrongCandidates = lessonPool.filter(
    (text) =>
      isQualityAnswerOption(text, context) &&
      !correctItems.some((correct) => correct.toLowerCase() === text.toLowerCase())
  );

  const neededWrong = Math.max(1, 4 - correctItems.length);
  const genericWrong = [
    'Không thuộc nội dung bài học',
    'Thông tin không chính xác theo tài liệu',
    'Ý kiến cá nhân, không có trong bài học',
  ];
  const wrongItems = shuffleWithSeed(
    [...wrongCandidates, ...genericWrong],
    sequence
  ).slice(0, neededWrong);

  const options = shuffleWithSeed(
    [...correctItems, ...wrongItems].slice(0, 6),
    sequence + 7
  );

  const correctIndices = correctItems
    .map((text) => options.indexOf(text))
    .filter((index) => index >= 0)
    .sort((a, b) => a - b);

  if (correctIndices.length < 2) return null;

  const question = OATH_QUESTION.test(sourceQ.question)
    ? 'Câu nào sau đây thuộc 6 lời thế môn sinh Phật Quang Quyền? (Chọn tất cả đáp án đúng)'
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

  const question = `Tình huống: Một môn sinh ${plan.behavior}.\n\nTheo bài học, quy định hoặc nguyên lý nào bị vi phạm?`;

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
    case 'single':
    default:
      return buildSingleQuestion(sourceQ, items, lessonPool, meta, sequence);
  }
}

export function buildQuizQuestions(meta, parsedQuestions) {
  const lessonPool = buildLessonPool(parsedQuestions);

  const objectives = parsedQuestions.map((sourceQ) => {
    const items = extractListItems(sourceQ.answer);
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
