import { describe, expect, it } from 'vitest';
import { isCandidateProfileComplete, isValidBirthDate } from '@/lib/candidate-profile';
import { getExamConfig, getPracticeRanks } from '@/lib/exam-config';
import {
  buildExamAttempt,
  examElapsedMs,
  gradeExam,
  selectExamQuestions,
  selectPracticeQuestions,
} from '@/lib/exam-paper';
import { parseImportedExamAttempts, sanitizeExamAttempts } from '@/lib/exam-attempts';
import type { ExamBankQuestion } from '@/types/exam';

function question(partial: Partial<ExamBankQuestion> & Pick<ExamBankQuestion, 'id'>): ExamBankQuestion {
  return {
    rankId: 'lam-1',
    beltId: 'blue',
    lessonId: 'blue-lesson-01',
    number: 1,
    question: partial.id,
    options: ['A', 'B', 'C', 'D'],
    type: 'single',
    correctIndex: 0,
    ...partial,
  };
}

describe('candidate profile', () => {
  it('accepts a complete dossier and rejects a future birth date', () => {
    expect(isValidBirthDate('2010-05-02', new Date('2026-01-01'))).toBe(true);
    expect(isValidBirthDate('2099-01-01', new Date('2026-01-01'))).toBe(false);
    expect(
      isCandidateProfileComplete({
        name: 'Nguyễn Văn An',
        dateOfBirth: '2010-05-02',
        club: 'CLB Phật Quang',
        dojo: 'Võ đường Phật Quang',
        coach: 'Nguyễn Văn HLV',
      })
    ).toBe(true);
    expect(
      isCandidateProfileComplete({
        name: 'Nguyễn Văn An',
        dateOfBirth: '2010-05-02',
        club: 'CLB Phật Quang',
        dojo: 'Võ đường Phật Quang',
      })
    ).toBe(false);
    expect(
      isCandidateProfileComplete({
        name: 'Nguyễn Văn An',
        club: 'CLB Phật Quang',
      })
    ).toBe(false);
  });
});

describe('exam config', () => {
  it('assigns question count and time by belt color', () => {
    expect(getPracticeRanks()).toHaveLength(19);
    expect(getExamConfig('blue')).toMatchObject({ questionCount: 10, durationMinutes: 20, beltId: 'blue' });
    expect(getExamConfig('lam-1')).toMatchObject({ questionCount: 10, durationMinutes: 20, beltId: 'blue' });
    expect(getExamConfig('green')).toMatchObject({ questionCount: 15, durationMinutes: 20 });
    expect(getExamConfig('red')).toMatchObject({ questionCount: 20, durationMinutes: 30 });
    expect(getExamConfig('yellow')).toMatchObject({ questionCount: 20, durationMinutes: 30 });
    expect(getExamConfig('white')).toMatchObject({ questionCount: 20, durationMinutes: 30 });
    expect(getExamConfig('chuan-hong')).toBeNull();
  });
});

describe('selectExamQuestions', () => {
  const bank = [
    question({ id: 'a', type: 'truefalse', options: ['Đúng', 'Sai'], correctIndex: 0 }),
    question({ id: 'b', type: 'truefalse', options: ['Đúng', 'Sai'], correctIndex: 1 }),
    question({ id: 'c', type: 'truefalse', options: ['Đúng', 'Sai'], correctIndex: 0 }),
  ];

  it('refuses to mix questions from more than one rank', () => {
    expect(() =>
      selectExamQuestions(
        [question({ id: 'a', rankId: 'lam-1' }), question({ id: 'b', rankId: 'lam-2' })],
        2,
        () => 0
      )
    ).toThrow(/Không trộn câu hỏi/);
  });

  it('draws a shuffled subset without duplicates', () => {
    const randomValues = [0.9, 0];
    let call = 0;
    const paper = selectExamQuestions(bank, 3, () => randomValues[call++] ?? 0);
    expect(paper).toHaveLength(3);
    expect(new Set(paper.map((item) => item.id))).toEqual(new Set(['a', 'b', 'c']));
  });

  it('uses the whole bank when it is smaller than the configured count', () => {
    const paper = selectExamQuestions(bank, 10, () => 0);
    expect(paper).toHaveLength(3);
    expect(new Set(paper.map((item) => item.id))).toEqual(new Set(['a', 'b', 'c']));
  });

  it('shuffles true/false options and keeps the correct statement', () => {
    const source = question({
      id: 'tf',
      type: 'truefalse',
      options: ['Đúng', 'Sai'],
      correctIndex: 0,
    });
    const [paper] = selectExamQuestions([source], 1, () => 0);
    expect(paper.options[paper.correctIndex ?? -1]).toBe('Đúng');
    expect(paper.options).toEqual(['Sai', 'Đúng']);
  });

  it('keeps the correct option after shuffling choices', () => {
    const source = question({
      id: 'choice',
      options: ['W', 'X', 'Y', 'Z'],
      correctIndex: 0,
    });
    const [paper] = selectExamQuestions([source], 1, () => 0);
    expect(paper.options[paper.correctIndex ?? -1]).toBe('W');
  });

  it('keeps every non-intro question and one random intro per form', () => {
    const theory = [1, 2, 3].map((index) =>
      question({
        id: `theory-${index}`,
        sourceQuestion: 'Câu 2. Võ nghệ là gì:',
        question: `Võ nghệ biến thể ${index}`,
      })
    );
    const intros = Array.from({ length: 11 }, (_, index) =>
      question({
        id: `intro-${index + 1}`,
        type: 'fill',
        sourceQuestion: 'Câu 13. Nêu xuất xứ và ý nghĩa bài quyền Bạch Hạc Sơn Quyền?',
        question: 'Điền vào chỗ trống lời thiệu bài quyền Bạch Hạc Sơn Quyền:\n\n______[1]',
        options: ['Đầu tiên bái tổ, kính sư'],
        blanks: ['Đầu tiên bái tổ, kính sư'],
      })
    );
    const otherForm = question({
      id: 'song-tuyet',
      type: 'fill',
      sourceQuestion: 'Câu 14. Nêu xuất xứ bài Song Tuyết Kiếm.',
      question: 'Điền vào chỗ trống lời thiệu bài Song Tuyết Kiếm:\n\n______[1]',
      options: ['Bái tổ'],
      blanks: ['Bái tổ'],
    });
    const duplicate = question({ id: 'theory-1', question: 'Trùng id' });

    const paper = selectPracticeQuestions([...theory, ...intros, otherForm, duplicate], () => 0.2);

    expect(paper.filter((item) => item.id.startsWith('theory-'))).toHaveLength(3);
    expect(paper.filter((item) => item.question.toLowerCase().includes('lời thiệu'))).toHaveLength(2);
    expect(new Set(paper.map((item) => item.id)).size).toBe(paper.length);
    expect(paper).toHaveLength(5);
  });

  it('can fill a paper from topic slots before the remaining questions', () => {
    const topical = [
      question({ id: 'h1', topic: 'lich-su', type: 'truefalse', options: ['Đúng', 'Sai'], correctIndex: 0 }),
      question({ id: 'k1', topic: 'ky-thuat', type: 'truefalse', options: ['Đúng', 'Sai'], correctIndex: 0 }),
      question({ id: 'k2', topic: 'ky-thuat', type: 'truefalse', options: ['Đúng', 'Sai'], correctIndex: 1 }),
    ];
    const paper = selectExamQuestions(topical, 2, () => 0, [{ topic: 'lich-su', count: 1 }]);
    const topics = paper.map((item) => item.topic);
    expect(paper).toHaveLength(2);
    expect(topics.filter((topic) => topic === 'lich-su')).toHaveLength(1);
    expect(new Set(paper.map((item) => item.id)).size).toBe(2);
  });
});

describe('gradeExam', () => {
  const single = question({ id: 'single', correctIndex: 0 });
  const multiple = question({
    id: 'multi',
    type: 'multiple',
    correctIndices: [0, 1],
  });

  it('counts correct, incorrect, and unanswered without partial credit', () => {
    const grade = gradeExam([single, multiple, question({ id: 'blank' })], {
      single: { questionId: 'single', selectedIndex: 0 },
      multi: { questionId: 'multi', selectedIndices: [0] },
    });

    expect(grade.correctCount).toBe(1);
    expect(grade.incorrectCount).toBe(1);
    expect(grade.unansweredCount).toBe(1);
    expect(grade.score).toBe(3.3);
    expect(grade.questions.map((item) => item.status)).toEqual([
      'correct',
      'incorrect',
      'unanswered',
    ]);
  });

  it('caps the recorded duration at the time limit', () => {
    const attempt = buildExamAttempt({
      id: 'attempt-1',
      mode: 'practice',
      candidate: {
        fullName: 'Nguyễn Văn An',
        dateOfBirth: '2010-05-02',
        club: 'CLB Phật Quang',
        dojo: 'Võ đường Phật Quang',
      },
      rankId: 'lam-1',
      beltId: 'blue',
      startedAt: '2026-01-01T00:00:00.000Z',
      submittedAt: '2026-01-01T00:30:00.000Z',
      timeLimitMs: 20 * 60 * 1000,
      autoSubmitted: true,
      questions: [single],
      answers: { single: { questionId: 'single', selectedIndex: 0 } },
    });

    expect(attempt.durationMs).toBe(20 * 60 * 1000);
    expect(attempt.score).toBe(10);
    expect(attempt.questions[0].question.options).toEqual(single.options);
    expect(examElapsedMs(attempt.startedAt, attempt.startedAt, attempt.timeLimitMs)).toBe(0);
  });
});

describe('exam attempt import', () => {
  it('ignores backups that have no exam history and drops malformed rows', () => {
    expect(parseImportedExamAttempts({ profile: {} })).toBeNull();

    const valid = {
      id: 'a1',
      mode: 'practice',
      candidate: { fullName: 'An', dateOfBirth: '2010-01-01', club: 'CLB', dojo: 'Võ đường' },
      rankId: 'nau',
      beltId: 'brown',
      startedAt: '2026-01-01T00:00:00.000Z',
      submittedAt: '2026-01-01T00:10:00.000Z',
      durationMs: 600000,
      timeLimitMs: 1200000,
      autoSubmitted: false,
      totalQuestions: 1,
      correctCount: 1,
      incorrectCount: 0,
      unansweredCount: 0,
      score: 10,
      questions: [],
    };

    expect(sanitizeExamAttempts([valid, { id: 'bad' }])).toEqual([valid]);
  });
});
