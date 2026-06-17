const QUESTION_START =
  /^(?:(\d+)\/\.\s*|Câu\s+(\d+)\.\s*(?:Hỏi\s*:?\s*)?)(.*)$/i;

const ANSWER_INLINE = /^(?:Đáp|Trả lời)\s*:\s*(.*)$/i;
const ANSWER_MARKER = /^(?:Đáp|Trả lời)\s*:?\s*$/i;
const INLINE_QUESTION = /^(.+\?)\s*$/;

export function cleanQuestionText(text) {
  return text.replace(/^\.\s*/, '').replace(/\s+/g, ' ').trim();
}

function readAnswerBlock(paragraphs, startIndex) {
  const answerLines = [];
  let i = startIndex;

  while (i < paragraphs.length && !paragraphs[i].trim()) i++;

  if (i < paragraphs.length) {
    const inline = paragraphs[i].trim().match(ANSWER_INLINE);
    if (inline) {
      if (inline[1]?.trim()) answerLines.push(inline[1].trim());
      i++;
    } else if (ANSWER_MARKER.test(paragraphs[i].trim())) {
      i++;
    }
  }

  while (i < paragraphs.length) {
    const next = paragraphs[i].trim();
    if (!next) {
      i++;
      continue;
    }
    if (QUESTION_START.test(next)) break;
    if (INLINE_QUESTION.test(next) && i + 1 < paragraphs.length) {
      const maybeAnswer = paragraphs[i + 1]?.trim();
      if (maybeAnswer && ANSWER_INLINE.test(maybeAnswer)) break;
    }
    answerLines.push(next);
    i++;
  }

  return { answer: answerLines.join('\n').trim(), nextIndex: i };
}

function pushQuestion(questions, number, questionText, answer) {
  const question = cleanQuestionText(questionText);
  if (question.length <= 3 || !answer.trim()) return;
  questions.push({ number, question, answer: answer.trim() });
}

export function parseQuestionsFromParagraphs(paragraphs) {
  const questions = [];
  let i = 0;
  let autoNumber = 1;

  while (i < paragraphs.length) {
    const line = paragraphs[i].trim();
    if (QUESTION_START.test(line)) break;
    i++;
  }

  while (i < paragraphs.length) {
    const line = paragraphs[i].trim();
    const match = line.match(QUESTION_START);

    if (match) {
      const num = parseInt(match[1] || match[2], 10);
      let questionText = match[3]?.trim() || '';
      i++;

      if (!questionText || /^hỏi\s*:?\s*$/i.test(questionText)) {
        while (i < paragraphs.length && !paragraphs[i].trim()) i++;
        if (i < paragraphs.length && !QUESTION_START.test(paragraphs[i].trim())) {
          questionText = paragraphs[i].trim();
          i++;
        }
      }

      const { answer, nextIndex } = readAnswerBlock(paragraphs, i);
      pushQuestion(questions, num, questionText, answer);
      i = nextIndex;
      autoNumber = num + 1;
      continue;
    }

    const inlineQuestion = line.match(INLINE_QUESTION);
    if (inlineQuestion && i + 1 < paragraphs.length) {
      const next = paragraphs[i + 1].trim();
      const inlineAnswer = next.match(ANSWER_INLINE);
      if (inlineAnswer) {
        pushQuestion(
          questions,
          autoNumber,
          inlineQuestion[1],
          inlineAnswer[1] || next.replace(/^(?:Đáp|Trả lời)\s*:\s*/i, '')
        );
        autoNumber++;
        i += 2;
        continue;
      }
    }

    i++;
  }

  return questions;
}
