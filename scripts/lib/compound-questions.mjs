const BUILDER_SUFFIX =
  /\?\s*(?:\(Chọn tất cả[^)]*\)|Ghép mỗi mục[^?]*|Điền (?:vào chỗ trống|năm|thuật ngữ|cụm từ|tên)[^?]*|Sắp xếp[^?]*)\.?$/i;

const CONNECTOR_PREFIX = /^(?:Và|VS\.?)\s+/i;

const RHETORICAL_YES_NO = /có .+ không\s*\?$/i;

function stripBuilderSuffix(text) {
  return text.replace(BUILDER_SUFFIX, '?').trim();
}

function ensureQuestionMark(clause) {
  const trimmed = clause.trim();
  if (!trimmed) return '';
  return trimmed.endsWith('?') ? trimmed : `${trimmed}?`;
}

export function splitQuestionClauses(questionText) {
  const text = stripBuilderSuffix(
    questionText.replace(/^Hỏi:\s*/i, '').trim()
  );

  const clauses = [];
  let remaining = text;

  while (remaining) {
    const qIndex = remaining.indexOf('?');
    if (qIndex === -1) {
      const tail = remaining.trim();
      if (tail.length > 8) clauses.push(ensureQuestionMark(tail));
      break;
    }

    clauses.push(remaining.slice(0, qIndex + 1).trim());
    remaining = remaining.slice(qIndex + 1).trim().replace(CONNECTOR_PREFIX, '').trim();
  }

  return clauses.filter((clause) => clause.replace(/\?/g, '').trim().length >= 5);
}

function normalizeForMatch(text) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function lineMatchesClause(line, clause) {
  const lineNorm = normalizeForMatch(line);
  const clauseNorm = normalizeForMatch(clause.replace(/\?/g, ''));

  if (!lineNorm || !clauseNorm) return false;
  if (lineNorm === clauseNorm) return true;

  const clauseTokens = clauseNorm.split(' ').filter((token) => token.length > 3);
  if (clauseTokens.length === 0) return false;

  const shared = clauseTokens.filter((token) => lineNorm.includes(token)).length;
  return shared / clauseTokens.length >= 0.5;
}

export function splitAnswerForClauses(answer, clauses) {
  if (clauses.length <= 1) return [answer];

  const lines = answer.split('\n');
  const parts = [];
  let current = [];
  let clauseIndex = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    const nextClause = clauses[clauseIndex + 1];

    if (
      clauseIndex < clauses.length - 1 &&
      trimmed.endsWith('?') &&
      lineMatchesClause(trimmed, nextClause)
    ) {
      parts.push(current.join('\n').trim());
      current = [line];
      clauseIndex += 1;
      continue;
    }

    current.push(line);
  }

  parts.push(current.join('\n').trim());

  if (parts.length === clauses.length) return parts;

  const labeledSplit = splitAnswerByLabeledSections(answer);
  if (labeledSplit && clauses.length === 2) {
    if (/^tại sao|^vì sao/i.test(clauses[0])) {
      return [labeledSplit.intro, labeledSplit.labeled];
    }
    if (/thế nào là/i.test(clauses[1])) {
      return [labeledSplit.intro, labeledSplit.labeled];
    }
  }

  const narrativeSplit = splitNarrativeEssayAnswer(answer, clauses);
  if (narrativeSplit) return narrativeSplit;

  if (parts.length === 1) {
    const markerIndex = lines.findIndex((line, index) => {
      if (index === 0) return false;
      const trimmed = line.trim();
      return (
        trimmed.endsWith('?') &&
        clauses.slice(1).some((clause) => lineMatchesClause(trimmed, clause))
      );
    });

    if (markerIndex > 0) {
      return [
        lines.slice(0, markerIndex).join('\n').trim(),
        lines.slice(markerIndex).join('\n').trim(),
      ];
    }

    const structuralSplit = splitAnswerByStructuralMarkers(answer);
    if (structuralSplit.length === clauses.length) {
      return structuralSplit;
    }
    if (structuralSplit.length > 1 && clauses.length === 2) {
      return [structuralSplit[0], structuralSplit.slice(1).join('\n\n').trim()];
    }
  }

  return clauses.map((_, index) => parts[index] ?? answer);
}

function splitAnswerByLabeledSections(answer) {
  const lines = answer.split('\n').map((line) => line.trim()).filter(Boolean);
  const intro = [];
  const labeled = [];

  for (const line of lines) {
    if (/^[a-z]\.\s/i.test(line)) {
      labeled.push(line);
      continue;
    }
    if (labeled.length === 0) {
      intro.push(line);
    }
  }

  if (labeled.length < 2) return null;

  return {
    intro: intro.join('\n').trim(),
    labeled: labeled.join('\n').trim(),
  };
}

function splitNarrativeEssayAnswer(answer, clauses) {
  const paragraphs = answer
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
  if (paragraphs.length < 2) return null;

  const exampleClauseIndex = clauses.findIndex((clause) =>
    /chứng minh|ví dụ|thí dụ/i.test(clause)
  );
  if (exampleClauseIndex >= 0) {
    const thesis = paragraphs[0];
    const evidence = paragraphs.slice(1).join('\n\n');
    return clauses.map((_, index) =>
      index === exampleClauseIndex ? evidence : thesis
    );
  }

  if (
    clauses.length >= 2 &&
    clauses.every(
      (clause) =>
        RHETORICAL_YES_NO.test(clause.trim()) || /^hay chỉ/i.test(clause.trim())
    )
  ) {
    return clauses.map(() => paragraphs[0]);
  }

  return null;
}

function splitAnswerByStructuralMarkers(answer) {
  const markerPatterns = [
    /^Môn phái[^\n]*do\s*:/i,
    /^Nguồn gốc ý tưởng\s*:/i,
  ];

  const lines = answer.split('\n');
  const sections = [];
  let current = [];

  for (const line of lines) {
    const trimmed = line.trim();
    const isMarker = markerPatterns.some((pattern) => pattern.test(trimmed));

    if (isMarker && current.length > 0) {
      sections.push(current.join('\n').trim());
      current = [line];
      continue;
    }

    current.push(line);
  }

  if (current.length > 0) {
    sections.push(current.join('\n').trim());
  }

  return sections.filter((section) => section.length > 0);
}

function splitMultiIntentClause(clause) {
  const text = clause.replace(/\?$/g, '').trim();

  if (/^do ai sáng lập,\s*ý tưởng từ đâu/i.test(text)) {
    return [
      'Do ai sáng lập môn võ Phật Quang Quyền?',
      'Ý tưởng lập ra môn võ này từ đâu?',
    ];
  }

  return [clause.endsWith('?') ? clause : `${clause}?`];
}

function expandClauses(clauses) {
  return clauses.flatMap((clause) => splitMultiIntentClause(clause));
}

export function isCompoundQuestion(questionText) {
  return splitQuestionClauses(questionText).length > 1;
}

function extractTopicForFollowUp(clause) {
  return clause
    .replace(/^Hỏi:\s*/i, '')
    .replace(/\?$/g, '')
    .replace(/\s+vào lúc nào,\s*ở đâu$/i, '')
    .replace(/\s+ra sao$/i, '')
    .replace(/^cho biết\s+/i, '')
    .trim();
}

function enrichShortClause(clause, previousClause) {
  const trimmed = clause.replace(/\?/g, '').trim();
  if (!/^(tại sao|vì sao|do đâu|khi nào)$/i.test(trimmed)) {
    return clause;
  }

  const topic = extractTopicForFollowUp(previousClause);
  if (topic.length < 12) return clause;

  const stem = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
  return `${stem} ${topic.charAt(0).toLowerCase()}${topic.slice(1)}?`;
}

export function splitCompoundSourceQuestion(sourceQ) {
  const clauses = expandClauses(splitQuestionClauses(sourceQ.question));
  if (clauses.length <= 1) return [sourceQ];

  const enrichedClauses = clauses.map((clause, index) =>
    index === 0 ? clause : enrichShortClause(clause, clauses[0])
  );
  const answers = splitAnswerForClauses(sourceQ.answer, enrichedClauses);

  return enrichedClauses.map((clause, index) => ({
    ...sourceQ,
    question: clause,
    answer: answers[index] || sourceQ.answer,
  }));
}

export function splitCompoundSourceQuestions(parsedQuestions) {
  return parsedQuestions.flatMap((sourceQ) => splitCompoundSourceQuestion(sourceQ));
}
