import type { QuizData, QuizQuestion, QuizQuestionType } from '@/types';

export interface QuizAnswer {
  questionId: string;
  selectedIndex?: number;
  selectedIndices?: number[];
  /** Fill-in-the-blank: selected word-bank indices per blank */
  fillAnswers?: number[];
  /** Matching: selected right index per left row */
  matchingAnswers?: number[];
  /** Ordering: current item indices in display order */
  orderAnswers?: number[];
}

export type MultipleChoiceResultLevel = 'correct' | 'partial' | 'incorrect';

export interface MultipleChoiceEvaluation {
  level: MultipleChoiceResultLevel;
  correctSelected: number;
  totalCorrect: number;
  incorrectSelected: number;
  accuracy: number;
  missedIndices: number[];
  incorrectIndices: number[];
  hasExcessiveIncorrect: boolean;
}

export interface QuestionEvaluation {
  questionId: string;
  level: MultipleChoiceResultLevel | 'correct' | 'incorrect';
  points: number;
}

export interface QuizResult {
  score: number;
  passed: boolean;
  correctCount: number;
  partialCount: number;
  totalQuestions: number;
  wrongQuestions: string[];
  partialQuestions: string[];
  answers: QuizAnswer[];
  questionEvaluations: QuestionEvaluation[];
}

export function getQuestionType(question: QuizQuestion): QuizQuestionType {
  return question.type ?? 'single';
}

export function isMultipleChoice(question: QuizQuestion): boolean {
  return getQuestionType(question) === 'multiple';
}

export function isFillQuestion(question: QuizQuestion): boolean {
  return getQuestionType(question) === 'fill';
}

export function isMatchingQuestion(question: QuizQuestion): boolean {
  return getQuestionType(question) === 'matching';
}

export function isOrderingQuestion(question: QuizQuestion): boolean {
  return getQuestionType(question) === 'ordering';
}

export function isScenarioQuestion(question: QuizQuestion): boolean {
  return getQuestionType(question) === 'scenario';
}

export function isSingleChoiceQuestion(question: QuizQuestion): boolean {
  const type = getQuestionType(question);
  return type === 'single' || type === 'scenario';
}

export function getCorrectIndices(question: QuizQuestion): number[] {
  if (isMultipleChoice(question)) {
    return [...(question.correctIndices ?? [])].sort((a, b) => a - b);
  }
  if (typeof question.correctIndex === 'number') {
    return [question.correctIndex];
  }
  return [];
}

function normalizeText(value: string): string {
  return value.trim().toLowerCase();
}

export function hasExcessiveIncorrectSelections(
  correctSelected: number,
  incorrectSelected: number
): boolean {
  return incorrectSelected > 0 && incorrectSelected >= correctSelected;
}

export function evaluateMultipleChoice(
  question: QuizQuestion,
  answer: Pick<QuizAnswer, 'selectedIndices'>
): MultipleChoiceEvaluation {
  const expected = getCorrectIndices(question);
  const selected = [...(answer.selectedIndices ?? [])].sort((a, b) => a - b);
  const expectedSet = new Set(expected);

  const correctSelected = selected.filter((index) => expectedSet.has(index)).length;
  const incorrectIndices = selected.filter((index) => !expectedSet.has(index));
  const incorrectSelected = incorrectIndices.length;
  const missedIndices = expected.filter((index) => !selected.includes(index));
  const totalCorrect = expected.length;
  const accuracy = totalCorrect > 0 ? correctSelected / totalCorrect : 0;
  const hasExcessiveIncorrect = hasExcessiveIncorrectSelections(
    correctSelected,
    incorrectSelected
  );

  let level: MultipleChoiceResultLevel;
  if (accuracy >= 1 && incorrectSelected === 0) {
    level = 'correct';
  } else if (accuracy > 0.5 && !hasExcessiveIncorrect) {
    level = 'partial';
  } else {
    level = 'incorrect';
  }

  return {
    level,
    correctSelected,
    totalCorrect,
    incorrectSelected,
    accuracy,
    missedIndices,
    incorrectIndices,
    hasExcessiveIncorrect,
  };
}

export function evaluateQuestion(
  question: QuizQuestion,
  answer: QuizAnswer | undefined
): QuestionEvaluation {
  if (!answer) {
    return { questionId: question.id, level: 'incorrect', points: 0 };
  }

  if (isMultipleChoice(question)) {
    const evaluation = evaluateMultipleChoice(question, answer);
    const points =
      evaluation.level === 'correct'
        ? 1
        : evaluation.level === 'partial'
          ? 0.5
          : 0;

    return {
      questionId: question.id,
      level: evaluation.level,
      points,
    };
  }

  const correct = isAnswerCorrect(question, answer);
  return {
    questionId: question.id,
    level: correct ? 'correct' : 'incorrect',
    points: correct ? 1 : 0,
  };
}

export function isAnswerCorrect(
  question: QuizQuestion,
  answer: Pick<
    QuizAnswer,
    | 'selectedIndex'
    | 'selectedIndices'
    | 'fillAnswers'
    | 'matchingAnswers'
    | 'orderAnswers'
  >
): boolean {
  if (isMultipleChoice(question)) {
    return evaluateMultipleChoice(question, answer).level === 'correct';
  }

  const type = getQuestionType(question);

  if (type === 'fill') {
    const blanks = question.blanks ?? [];
    const selected = answer.fillAnswers ?? [];
    if (selected.length !== blanks.length) return false;

    return blanks.every((blank, index) => {
      const option = question.options[selected[index]];
      return option && normalizeText(option) === normalizeText(blank);
    });
  }

  if (type === 'matching') {
    const expected = question.correctPairs ?? [];
    const selected = answer.matchingAnswers ?? [];
    if (selected.length !== expected.length) return false;

    return expected.every(([leftIndex, rightIndex]) => {
      return selected[leftIndex] === rightIndex;
    });
  }

  if (type === 'ordering') {
    const expected = question.correctOrder ?? [];
    const selected = answer.orderAnswers ?? [];
    if (selected.length !== expected.length) return false;

    return expected.every((value, index) => selected[index] === value);
  }

  return answer.selectedIndex === getCorrectIndices(question)[0];
}

export function calculateScore(
  quiz: QuizData,
  answers: QuizAnswer[]
): QuizResult {
  const totalQuestions = quiz.questions.length;
  const questionEvaluations = quiz.questions.map((question) =>
    evaluateQuestion(
      question,
      answers.find((answer) => answer.questionId === question.id)
    )
  );

  const points = questionEvaluations.reduce((sum, evaluation) => sum + evaluation.points, 0);
  const correctCount = questionEvaluations.filter(
    (evaluation) => evaluation.level === 'correct'
  ).length;
  const partialCount = questionEvaluations.filter(
    (evaluation) => evaluation.level === 'partial'
  ).length;
  const wrongQuestions = questionEvaluations
    .filter((evaluation) => evaluation.level === 'incorrect')
    .map((evaluation) => evaluation.questionId);
  const partialQuestions = questionEvaluations
    .filter((evaluation) => evaluation.level === 'partial')
    .map((evaluation) => evaluation.questionId);

  const score =
    totalQuestions > 0 ? Math.round((points / totalQuestions) * 100) : 0;

  return {
    score,
    passed: score >= quiz.passThreshold,
    correctCount,
    partialCount,
    totalQuestions,
    wrongQuestions,
    partialQuestions,
    answers,
    questionEvaluations,
  };
}

export function getQuestionById(
  quiz: QuizData,
  questionId: string
): QuizQuestion | undefined {
  return quiz.questions.find((q) => q.id === questionId);
}

export function formatCorrectAnswer(question: QuizQuestion): string {
  const type = getQuestionType(question);

  if (type === 'multiple' || type === 'single' || type === 'scenario') {
    return getCorrectIndices(question)
      .map((index) => question.options[index])
      .join('; ');
  }

  if (type === 'fill') {
    return (question.blanks ?? []).join('; ');
  }

  if (type === 'matching') {
    const leftItems = question.leftItems ?? [];
    const rightItems = question.rightItems ?? [];
    return (question.correctPairs ?? [])
      .map(([leftIndex, rightIndex]) => {
        return `${leftItems[leftIndex]} → ${rightItems[rightIndex]}`;
      })
      .join('; ');
  }

  if (type === 'ordering') {
    const items = question.items ?? [];
    return (question.correctOrder ?? [])
      .map((index) => items[index])
      .join(' → ');
  }

  return '';
}

export function formatMissedMultipleChoiceAnswers(question: QuizQuestion, missedIndices: number[]): string {
  return missedIndices.map((index) => question.options[index]).join('; ');
}

export const PARTIAL_CORRECT_MESSAGE =
  'Bạn đã hiểu phần lớn nội dung này, nhưng còn thiếu một số ý quan trọng. Hãy xem các mục được đánh dấu bên dưới.';

export const PARTIAL_REVIEW_MESSAGE =
  'Hãy xem lại bài học để nắm vững các ý còn thiếu.';

export const PASS_MESSAGES = [
  'Kiên trì rèn luyện, con đường võ đạo đang mở ra.',
  'Mỗi bước tiến là một bước trưởng thành trên hành trình võ đạo.',
  'Mỗi lần ôn tập giúp bạn hiểu sâu hơn.',
];

export const FAIL_MESSAGES = [
  'Hãy xem lại bài học và thử lại. Mỗi lần thử là một bước trên hành trình võ đạo.',
  'Kiến thức cần thời gian để thấm. Hãy ôn lại và thử lại.',
  'Đừng nản lòng — võ đạo là hành trình bền bỉ.',
];

export function getResultMessage(passed: boolean): string {
  const messages = passed ? PASS_MESSAGES : FAIL_MESSAGES;
  return messages[Math.floor(Math.random() * messages.length)];
}
