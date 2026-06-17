import fs from 'fs';
import os from 'os';
import path from 'path';
import { afterEach, describe, expect, it } from 'vitest';
import {
  findDuplicateQuestionIds,
  validateUniqueQuestionIds,
} from '@/lib/validate-question-ids';

const tempDirs: string[] = [];

function createTempQuizDir(files: Record<string, unknown>): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'quiz-validate-'));
  tempDirs.push(dir);

  for (const [filename, data] of Object.entries(files)) {
    fs.writeFileSync(
      path.join(dir, filename),
      `${JSON.stringify(data, null, 2)}\n`,
      'utf-8'
    );
  }

  return dir;
}

afterEach(() => {
  while (tempDirs.length > 0) {
    fs.rmSync(tempDirs.pop()!, { recursive: true, force: true });
  }
});

describe('validateUniqueQuestionIds', () => {
  it('should allow unique question ids', () => {
    const quizDir = createTempQuizDir({
      'lesson-a.json': {
        lessonId: 'lesson-a',
        title: 'Lesson A',
        passThreshold: 70,
        questions: [
          {
            id: 'lesson-a-q01',
            lessonId: 'lesson-a',
            number: 1,
            question: 'Question 1',
            options: ['A', 'B', 'C', 'D'],
            correctIndex: 0,
          },
          {
            id: 'lesson-a-q02',
            lessonId: 'lesson-a',
            number: 2,
            question: 'Question 2',
            options: ['A', 'B', 'C', 'D'],
            correctIndex: 1,
          },
        ],
      },
      'lesson-b.json': {
        lessonId: 'lesson-b',
        title: 'Lesson B',
        passThreshold: 70,
        questions: [
          {
            id: 'lesson-b-q01',
            lessonId: 'lesson-b',
            number: 1,
            question: 'Question 1',
            options: ['A', 'B', 'C', 'D'],
            correctIndex: 2,
          },
        ],
      },
    });

    expect(findDuplicateQuestionIds(quizDir)).toEqual([]);
    expect(() => validateUniqueQuestionIds(quizDir)).not.toThrow();
  });

  it('should detect duplicate question ids', () => {
    const quizDir = createTempQuizDir({
      'brownLesson01.json': {
        lessonId: 'brown-lesson-01',
        title: 'Brown Lesson 01',
        passThreshold: 70,
        questions: [
          {
            id: 'brown-lesson-01-q04',
            lessonId: 'brown-lesson-01',
            number: 4,
            question: 'Question 4',
            options: ['A', 'B', 'C', 'D'],
            correctIndex: 0,
          },
          {
            id: 'brown-lesson-01-q04',
            lessonId: 'brown-lesson-01',
            number: 4,
            question: 'Duplicate question 4',
            options: ['A', 'B', 'C', 'D'],
            correctIndex: 1,
          },
        ],
      },
      'brownLesson01Extra.json': {
        lessonId: 'brown-lesson-01-extra',
        title: 'Brown Lesson 01 Extra',
        passThreshold: 70,
        questions: [
          {
            id: 'brown-lesson-01-q04',
            lessonId: 'brown-lesson-01-extra',
            number: 1,
            question: 'Cross-file duplicate',
            options: ['A', 'B', 'C', 'D'],
            correctIndex: 2,
          },
        ],
      },
    });

    const duplicates = findDuplicateQuestionIds(quizDir);

    expect(duplicates).toHaveLength(1);
    expect(duplicates[0].id).toBe('brown-lesson-01-q04');
    expect(duplicates[0].total).toBe(3);
    expect(duplicates[0].sources).toEqual([
      { file: 'brownLesson01.json', count: 2 },
      { file: 'brownLesson01Extra.json', count: 1 },
    ]);
  });

  it('should fail validation when duplicate ids exist', () => {
    const quizDir = createTempQuizDir({
      'brownLesson01.json': {
        lessonId: 'brown-lesson-01',
        title: 'Brown Lesson 01',
        passThreshold: 70,
        questions: [
          {
            id: 'brown-lesson-01-q04',
            lessonId: 'brown-lesson-01',
            number: 4,
            question: 'Question 4',
            options: ['A', 'B', 'C', 'D'],
            correctIndex: 0,
          },
          {
            id: 'brown-lesson-01-q04',
            lessonId: 'brown-lesson-01',
            number: 5,
            question: 'Duplicate question 4',
            options: ['A', 'B', 'C', 'D'],
            correctIndex: 1,
          },
        ],
      },
      'brownLesson01Extra.json': {
        lessonId: 'brown-lesson-01-extra',
        title: 'Brown Lesson 01 Extra',
        passThreshold: 70,
        questions: [
          {
            id: 'brown-lesson-01-q04',
            lessonId: 'brown-lesson-01-extra',
            number: 1,
            question: 'Cross-file duplicate',
            options: ['A', 'B', 'C', 'D'],
            correctIndex: 2,
          },
        ],
      },
    });

    expect(() => validateUniqueQuestionIds(quizDir)).toThrow(
      /Duplicate question ID detected:\nbrown-lesson-01-q04[\s\S]*brownLesson01\.json[\s\S]*brownLesson01Extra\.json/
    );
  });

  it('should pass validation for the real quiz bank', () => {
    expect(() => validateUniqueQuestionIds()).not.toThrow();
  });
});
