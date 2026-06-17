import { describe, expect, it } from 'vitest';
import {
  randomizeQuestionPresentation,
  randomizeQuizSession,
} from '@/lib/quiz-randomize';
import { isAnswerCorrect } from '@/lib/quiz-engine';
import type { QuizData, QuizQuestion } from '@/types';

function createSeededRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
}

const baseQuiz: QuizData = {
  lessonId: 'lesson-1',
  title: 'Test Quiz',
  passThreshold: 70,
  questions: [
    {
      id: 'q-single',
      lessonId: 'lesson-1',
      number: 1,
      type: 'single',
      question: 'Single question',
      options: ['A', 'B', 'C', 'D'],
      correctIndex: 1,
    },
    {
      id: 'q-multiple',
      lessonId: 'lesson-1',
      number: 2,
      type: 'multiple',
      question: 'Multiple question',
      options: ['A', 'B', 'C', 'D', 'E'],
      correctIndices: [0, 2, 4],
    },
    {
      id: 'q-fill',
      lessonId: 'lesson-1',
      number: 3,
      type: 'fill',
      question: 'Fill question',
      options: ['alpha', 'beta', 'gamma', 'delta'],
      blanks: ['beta', 'gamma'],
    },
    {
      id: 'q-matching',
      lessonId: 'lesson-1',
      number: 4,
      type: 'matching',
      question: 'Matching question',
      options: [],
      leftItems: ['Left 1', 'Left 2'],
      rightItems: ['Right A', 'Right B', 'Right C'],
      correctPairs: [
        [0, 1],
        [1, 2],
      ],
    },
    {
      id: 'q-ordering',
      lessonId: 'lesson-1',
      number: 5,
      type: 'ordering',
      question: 'Ordering question',
      options: [],
      items: ['Step 1', 'Step 2', 'Step 3'],
      correctOrder: [0, 1, 2],
    },
  ],
};

function getCorrectAnswer(question: QuizQuestion) {
  const type = question.type ?? 'single';

  if (type === 'multiple') {
    return { selectedIndices: question.correctIndices ?? [] };
  }

  if (type === 'single' || type === 'scenario') {
    return { selectedIndex: question.correctIndex ?? 0 };
  }

  if (type === 'fill') {
    const blanks = question.blanks ?? [];
    return {
      fillAnswers: blanks.map((blank) =>
        question.options.findIndex(
          (option) => option.trim().toLowerCase() === blank.trim().toLowerCase()
        )
      ),
    };
  }

  if (type === 'matching') {
    const selected = (question.leftItems ?? []).map(() => -1);
    for (const [leftIndex, rightIndex] of question.correctPairs ?? []) {
      selected[leftIndex] = rightIndex;
    }
    return { matchingAnswers: selected };
  }

  if (type === 'ordering') {
    return { orderAnswers: [...(question.correctOrder ?? [])] };
  }

  return {};
}

describe('randomizeQuestionPresentation', () => {
  it('shuffles single-choice options while preserving the correct answer', () => {
    const original = baseQuiz.questions[0];
    let sawDifferentOrder = false;

    for (let seed = 0; seed < 50; seed++) {
      const randomized = randomizeQuestionPresentation(
        original,
        createSeededRandom(seed)
      );

      expect(
        isAnswerCorrect(randomized, getCorrectAnswer(randomized))
      ).toBe(true);
      expect(randomized.question).toBe(original.question);

      if (JSON.stringify(randomized.options) !== JSON.stringify(original.options)) {
        sawDifferentOrder = true;
      }
    }

    expect(sawDifferentOrder).toBe(true);
  });

  it('shuffles multi-select options while preserving the correct answer', () => {
    const random = createSeededRandom(7);
    const original = baseQuiz.questions[1];
    const randomized = randomizeQuestionPresentation(original, random);

    expect(randomized.options).not.toEqual(original.options);
    expect(
      isAnswerCorrect(randomized, getCorrectAnswer(randomized))
    ).toBe(true);
  });

  it('shuffles fill word bank without changing accepted blank answers', () => {
    const random = createSeededRandom(11);
    const original = baseQuiz.questions[2];
    const randomized = randomizeQuestionPresentation(original, random);

    expect(randomized.options).not.toEqual(original.options);
    expect(randomized.blanks).toEqual(original.blanks);
    expect(
      isAnswerCorrect(randomized, getCorrectAnswer(randomized))
    ).toBe(true);
  });

  it('shuffles matching right-side options while preserving pair correctness', () => {
    const original = baseQuiz.questions[3];
    let sawDifferentOrder = false;

    for (let seed = 0; seed < 50; seed++) {
      const randomized = randomizeQuestionPresentation(
        original,
        createSeededRandom(seed)
      );

      expect(randomized.leftItems).toEqual(original.leftItems);
      expect(
        isAnswerCorrect(randomized, getCorrectAnswer(randomized))
      ).toBe(true);

      if (
        JSON.stringify(randomized.rightItems) !==
        JSON.stringify(original.rightItems)
      ) {
        sawDifferentOrder = true;
      }
    }

    expect(sawDifferentOrder).toBe(true);
  });

  it('shuffles ordering items while preserving the correct sequence', () => {
    const random = createSeededRandom(23);
    const original = baseQuiz.questions[4];
    const randomized = randomizeQuestionPresentation(original, random);

    expect(randomized.items).not.toEqual(original.items);
    expect(
      isAnswerCorrect(randomized, getCorrectAnswer(randomized))
    ).toBe(true);
  });
});

describe('randomizeQuizSession', () => {
  it('randomizes question order and presentation each session', () => {
    const random = createSeededRandom(99);
    const session = randomizeQuizSession(baseQuiz, random);

    expect(session.questions.map((question) => question.id)).not.toEqual(
      baseQuiz.questions.map((question) => question.id)
    );
    expect(session.questions).toHaveLength(baseQuiz.questions.length);
    expect(session.title).toBe(baseQuiz.title);
    expect(session.passThreshold).toBe(baseQuiz.passThreshold);

    for (const question of session.questions) {
      expect(
        isAnswerCorrect(question, getCorrectAnswer(question))
      ).toBe(true);
    }
  });

  it('produces different order on subsequent sessions', () => {
    const first = randomizeQuizSession(baseQuiz, createSeededRandom(1));
    const second = randomizeQuizSession(baseQuiz, createSeededRandom(2));

    expect(first.questions.map((question) => question.id)).not.toEqual(
      second.questions.map((question) => question.id)
    );
  });
});
