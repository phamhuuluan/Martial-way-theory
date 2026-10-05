import { describe, expect, it } from 'vitest';
import {
  calculateScore,
  definitionWordMatch,
  evaluateMultipleChoice,
  hasExcessiveIncorrectSelections,
  isAnswerCorrect,
  isDefinitionAnswerCorrect,
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

  it('marks incomplete correct answers as incorrect', () => {
    const result = evaluateMultipleChoice(multipleQuestion, {
      selectedIndices: [0, 1],
    });

    expect(result.level).toBe('incorrect');
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

describe('true/false questions', () => {
  const trueFalseQuestion: QuizQuestion = {
    id: 'q-tf',
    lessonId: 'lesson',
    number: 1,
    type: 'truefalse',
    question: 'Môn võ chỉ được luyện tập khi có huấn luyện viên hướng dẫn.',
    options: ['Đúng', 'Sai'],
    correctIndex: 0,
  };

  it('marks correct true/false answers', () => {
    expect(
      isAnswerCorrect(trueFalseQuestion, { trueFalseIndex: 0 })
    ).toBe(true);
    expect(
      isAnswerCorrect(trueFalseQuestion, { trueFalseIndex: 1 })
    ).toBe(false);
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

  it('awards NO credit for partially correct multi-select answers', () => {
    const result = calculateScore(quiz, [
      { questionId: 'q-multi', selectedIndices: [0, 1] },
      { questionId: 'q-single', selectedIndex: 0 },
    ]);

    expect(result.correctCount).toBe(1);
    expect(result.partialCount).toBe(0);
    expect(result.score).toBe(50);
    expect(result.partialQuestions).toEqual([]);
    expect(result.wrongQuestions).toEqual(['q-multi']);
  });

  it('scores a written definition by word overlap of at least 65 percent', () => {
    const sample = 'Chưởng môn hiện nay là Võ sư Đại Đức Thích Nghiêm Giám.';
    expect(definitionWordMatch(sample, sample)).toBe(1);
    expect(
      isDefinitionAnswerCorrect(sample, 'võ sư đại đức thích nghiêm giám là chưởng môn hiện nay')
    ).toBe(true);
    expect(isDefinitionAnswerCorrect(sample, 'Thích Nghiêm Giám là chưởng môn')).toBe(false);

    const question: QuizQuestion = {
      id: 'q-def',
      lessonId: 'lesson',
      number: 3,
      type: 'definition',
      question: 'Chưởng môn hiện nay là ai?',
      options: [],
      sampleAnswer: sample,
      matchThreshold: 0.65,
    };
    expect(isAnswerCorrect(question, { textAnswer: 'CHƯỞNG MÔN hiện nay là võ sư Đại Đức Thích Nghiêm Giám!' })).toBe(
      true
    );
    expect(isAnswerCorrect(question, { textAnswer: 'một người khác' })).toBe(false);
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
