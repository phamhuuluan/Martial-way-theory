import type { QuizData, QuizQuestion } from '@/types';
import { getQuestionType } from '@/lib/quiz-engine';

export type RandomFn = () => number;

function shuffleIndices(length: number, random: RandomFn): number[] {
  const indices = Array.from({ length }, (_, index) => index);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
}

function remapIndices(
  permutation: number[],
  originalIndices: number[]
): number[] {
  const inverse = new Map<number, number>();
  permutation.forEach((originalIndex, newIndex) => {
    inverse.set(originalIndex, newIndex);
  });
  return originalIndices.map((index) => inverse.get(index)!);
}

function shuffleStringList(items: string[], random: RandomFn): {
  items: string[];
  permutation: number[];
} {
  const permutation = shuffleIndices(items.length, random);
  return {
    items: permutation.map((index) => items[index]),
    permutation,
  };
}

function shuffleChoiceOptions(
  question: QuizQuestion,
  random: RandomFn
): Pick<QuizQuestion, 'options' | 'correctIndex' | 'correctIndices'> {
  const { items: options, permutation } = shuffleStringList(question.options, random);

  if (question.type === 'multiple') {
    const correctIndices = remapIndices(
      permutation,
      question.correctIndices ?? []
    );
    return { options, correctIndices };
  }

  if (typeof question.correctIndex === 'number') {
    const [correctIndex] = remapIndices(permutation, [question.correctIndex]);
    return { options, correctIndex };
  }

  return { options };
}

function shuffleMatchingQuestion(
  question: QuizQuestion,
  random: RandomFn
): Pick<QuizQuestion, 'rightItems' | 'correctPairs'> {
  const rightItems = question.rightItems ?? [];
  const { items: shuffledRightItems, permutation } = shuffleStringList(
    rightItems,
    random
  );
  const correctPairs = (question.correctPairs ?? []).map(
    ([leftIndex, rightIndex]) =>
      [leftIndex, remapIndices(permutation, [rightIndex])[0]] as [number, number]
  );

  return {
    rightItems: shuffledRightItems,
    correctPairs,
  };
}

function shuffleOrderingQuestion(
  question: QuizQuestion,
  random: RandomFn
): Pick<QuizQuestion, 'items' | 'correctOrder'> {
  const items = question.items ?? [];
  const { items: shuffledItems, permutation } = shuffleStringList(items, random);
  const correctOrder = remapIndices(permutation, question.correctOrder ?? []);

  return {
    items: shuffledItems,
    correctOrder,
  };
}

function shuffleFillQuestion(
  question: QuizQuestion,
  random: RandomFn
): Pick<QuizQuestion, 'options'> {
  const { items: options } = shuffleStringList(question.options, random);
  return { options };
}

export function randomizeQuestionPresentation(
  question: QuizQuestion,
  random: RandomFn = Math.random
): QuizQuestion {
  const type = getQuestionType(question);

  if (type === 'fill') {
    return { ...question, ...shuffleFillQuestion(question, random) };
  }

  if (type === 'matching') {
    return { ...question, ...shuffleMatchingQuestion(question, random) };
  }

  if (type === 'ordering') {
    return { ...question, ...shuffleOrderingQuestion(question, random) };
  }

  if (type === 'single' || type === 'multiple' || type === 'scenario') {
    return { ...question, ...shuffleChoiceOptions(question, random) };
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
