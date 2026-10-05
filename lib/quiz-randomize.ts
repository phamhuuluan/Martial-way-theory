import type { QuizData, QuizQuestion } from '@/types';
import { getQuestionType, TRUE_FALSE_OPTIONS } from '@/lib/quiz-engine';

export type RandomFn = () => number;

function shuffleIndices(length: number, random: RandomFn): number[] {
  const indices = Array.from({ length }, (_, index) => index);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
}

export function randomizeQuestionPresentation(
  question: QuizQuestion,
  random: RandomFn = Math.random
): QuizQuestion {
  const type = getQuestionType(question);

  if (type === 'fill') {
    return { ...question, optionsOrder: shuffleIndices(question.options.length, random) };
  }

  if (type === 'matching') {
    return { ...question, rightItemsOrder: shuffleIndices(question.rightItems?.length ?? 0, random) };
  }

  if (type === 'ordering') {
    return { ...question, itemsOrder: shuffleIndices(question.items?.length ?? 0, random) };
  }

  if (type === 'single' || type === 'multiple' || type === 'scenario') {
    return { ...question, optionsOrder: shuffleIndices(question.options.length, random) };
  }

  if (type === 'truefalse') {
    return {
      ...question,
      options: [...TRUE_FALSE_OPTIONS],
      optionsOrder: shuffleIndices(TRUE_FALSE_OPTIONS.length, random),
    };
  }

  if (type === 'definition') {
    return { ...question, options: [] };
  }

  return { ...question };
}

export function randomizeQuizSession(
  quiz: QuizData,
  random: RandomFn = Math.random
): QuizData {
  const questionOrder = shuffleIndices(quiz.questions.length, random);

  return {
    ...quiz,
    questions: questionOrder.map((index) =>
      randomizeQuestionPresentation(quiz.questions[index], random)
    ),
  };
}
