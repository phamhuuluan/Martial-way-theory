const QUESTION_HEADING = /^##\s+Câu\s+(\d+)\.\s*(.+)$/;

function stripMdxComponents(text) {
  return text
    .replace(/<[^>]+>/g, '')
    .replace(/\\{/g, '{')
    .replace(/&lt;/g, '<')
    .trim();
}

export function parseQuestionsFromMdx(mdxContent) {
  const questions = [];
  const lines = mdxContent.split('\n');
  let i = 0;

  while (i < lines.length) {
    const match = lines[i].trim().match(QUESTION_HEADING);
    if (!match) {
      i += 1;
      continue;
    }

    const number = Number.parseInt(match[1], 10);
    const question = stripMdxComponents(match[2]);
    i += 1;

    const answerLines = [];
    while (i < lines.length) {
      const line = lines[i];
      if (QUESTION_HEADING.test(line.trim())) break;
      if (line.trim().startsWith('---')) break;
      answerLines.push(line);
      i += 1;
    }

    const answer = stripMdxComponents(answerLines.join('\n').trim());
    if (question.length > 3 && answer.length > 3) {
      questions.push({ number, question, answer });
    }
  }

  return questions;
}
