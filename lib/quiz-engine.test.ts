import { describe, expect, it } from 'vitest';
import {
  calculateScore,
  evaluateMultipleChoice,
  hasExcessiveIncorrectSelections,
  isAnswerCorrect,
} from '@/lib/quiz-engine';
import type { QuizData, QuizQuestion } from '@/types';

const multipleQuestion: QuizQuestion = {
  id: 'q-multi',
  lessonId: 'lesson',
  number: 1,
  type: 'multiple',
  question: 'Chọn tất cả đáp án đúng',
  options: ['A', 'B', 'C', 'D', 'E'],
  correctIndices: [0, 1, 2],
};

describe('evaluateMultipleChoice', () => {
  it('marks fully correct selections as correct', () => {
    const result = evaluateMultipleChoice(multipleQuestion, {
      selectedIndices: [0, 1, 2],
    });

    expect(result.level).toBe('correct');
    expect(result.accuracy).toBe(1);
    expect(result.incorrectSelected).toBe(0);
  });

  it('marks >50% correct without excessive wrong answers as partial', () => {
    const result = evaluateMultipleChoice(multipleQuestion, {
      selectedIndices: [0, 1],
    });

    expect(result.level).toBe('partial');
    expect(result.accuracy).toBeCloseTo(2 / 3);
    expect(result.missedIndices).toEqual([2]);
  });

  it('marks <=50% correct as incorrect', () => {
    const result = evaluateMultipleChoice(multipleQuestion, {
      selectedIndices: [0],
    });

    expect(result.level).toBe('incorrect');
    expect(result.accuracy).toBeCloseTo(1 / 3);
  });

  it('downgrades to incorrect when too many wrong answers are selected', () => {
    const result = evaluateMultipleChoice(multipleQuestion, {
      selectedIndices: [0, 1, 3, 4],
    });

    expect(result.hasExcessiveIncorrect).toBe(true);
    expect(result.level).toBe('incorrect');
  });

  it('downgrades all-correct plus wrong picks to partial or incorrect', () => {
    const result = evaluateMultipleChoice(multipleQuestion, {
      selectedIndices: [0, 1, 2, 3],
    });

    expect(result.accuracy).toBe(1);
    expect(result.incorrectSelected).toBe(1);
    expect(result.level).not.toBe('correct');
  });
});

describe('hasExcessiveIncorrectSelections', () => {
  it('treats equal wrong and right selections as excessive', () => {
    expect(hasExcessiveIncorrectSelections(2, 2)).toBe(true);
    expect(hasExcessiveIncorrectSelections(3, 2)).toBe(false);
  });
});

describe('calculateScore with partial multi-select credit', () => {
  const quiz: QuizData = {
    lessonId: 'lesson',
    title: 'Quiz',
    passThreshold: 70,
    questions: [
      multipleQuestion,
      {
        id: 'q-single',
        lessonId: 'lesson',
        number: 2,
        type: 'single',
        question: 'Single',
        options: ['A', 'B', 'C', 'D'],
        correctIndex: 0,
      },
    ],
  };

  it('awards half credit for partially correct multi-select answers', () => {
    const result = calculateScore(quiz, [
      { questionId: 'q-multi', selectedIndices: [0, 1] },
      { questionId: 'q-single', selectedIndex: 0 },
    ]);

    expect(result.correctCount).toBe(1);
    expect(result.partialCount).toBe(1);
    expect(result.score).toBe(75);
    expect(result.partialQuestions).toEqual(['q-multi']);
    expect(result.wrongQuestions).toEqual([]);
  });

  it('keeps strict correctness for multi-select', () => {
    expect(
      isAnswerCorrect(multipleQuestion, { selectedIndices: [0, 1] })
    ).toBe(false);
    expect(
      isAnswerCorrect(multipleQuestion, { selectedIndices: [0, 1, 2] })
    ).toBe(true);
  });
});
