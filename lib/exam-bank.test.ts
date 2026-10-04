import fs from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { BELT_RANKS } from '@/lib/belt-ranks';
import { getExamBank, listPracticeCatalog } from '@/lib/exam-bank';
import { getExamConfig, getPracticeRanks } from '@/lib/exam-config';
import { selectPracticeQuestions } from '@/lib/exam-paper';
import type { ExamBankQuestion } from '@/types/exam';

function assertAnswerable(question: ExamBankQuestion) {
  const type = question.type ?? 'single';

  if (type === 'single' || type === 'scenario' || type === 'truefalse') {
    expect(question.options.length).toBeGreaterThanOrEqual(2);
    expect(question.correctIndex).toBeGreaterThanOrEqual(0);
    expect(question.correctIndex).toBeLessThan(question.options.length);
    expect(new Set(question.options).size).toBe(question.options.length);
  }

  if (type === 'multiple') {
    expect(question.correctIndices?.length).toBeGreaterThanOrEqual(2);
    for (const index of question.correctIndices ?? []) {
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(question.options.length);
    }
  }

  if (type === 'fill') {
    expect(question.blanks?.length).toBeGreaterThan(0);
    for (const blank of question.blanks ?? []) {
      expect(
        question.options.some((option) => option.trim().toLowerCase() === blank.trim().toLowerCase())
      ).toBe(true);
    }
  }

  if (type === 'matching') {
    expect(question.leftItems?.length).toBeGreaterThanOrEqual(2);
    expect(question.rightItems?.length).toBe(question.leftItems?.length);
    for (const [leftIndex, rightIndex] of question.correctPairs ?? []) {
      expect(leftIndex).toBeGreaterThanOrEqual(0);
      expect(rightIndex).toBeGreaterThanOrEqual(0);
      expect(leftIndex).toBeLessThan(question.leftItems?.length ?? 0);
      expect(rightIndex).toBeLessThan(question.rightItems?.length ?? 0);
    }
  }

  if (type === 'ordering') {
    const count = question.items?.length ?? 0;
    expect(count).toBeGreaterThanOrEqual(2);
    expect(question.correctOrder).toHaveLength(count);
    expect(new Set(question.correctOrder).size).toBe(count);
  }

  if (type === 'definition') {
    expect(question.sampleAnswer?.trim().length).toBeGreaterThan(0);
    expect(question.options).toEqual([]);
    expect(question.matchThreshold ?? 0.65).toBeGreaterThanOrEqual(0.65);
  }
}

describe('exam banks', () => {
  const ranks = getPracticeRanks();

  it('stores one bank file per lesson rank and no color-wide bank', () => {
    const files = fs
      .readdirSync(path.join(process.cwd(), 'content', 'exam-bank'))
      .filter((file) => file.endsWith('.json'))
      .sort();
    expect(files).toEqual(ranks.map((rank) => `${rank.id}.json`).sort());
    expect(files).not.toContain('blue.json');
  });

  it('maps each lesson rank to its own bank and keeps questions inside that lesson', () => {
    const seenIds = new Set<string>();

    for (const rank of ranks) {
      const bank = getExamBank(rank.id);
      const config = getExamConfig(rank.id);
      expect(bank?.rankId).toBe(rank.id);
      expect(bank?.beltId).toBe(rank.beltWorldId);
      expect(bank?.lessonId).toBe(rank.promotionLessonId);
      expect(config?.questionCount).toBeLessThanOrEqual(bank?.questions.length ?? 0);

      for (const question of bank?.questions ?? []) {
        expect(seenIds.has(question.id)).toBe(false);
        seenIds.add(question.id);
        expect(question.rankId).toBe(rank.id);
        expect(question.lessonId).toBe(rank.promotionLessonId);
        expect(question.beltId).toBe(rank.beltWorldId);
        assertAnswerable(question);
      }
    }
  });

  it('draws a practice paper from the selected rank without a fixed count', () => {
    const lam1 = getExamBank('lam-1')?.questions ?? [];
    const lam2Ids = new Set((getExamBank('lam-2')?.questions ?? []).map((question) => question.id));
    const paper = selectPracticeQuestions(lam1, () => 0.42);

    expect(paper).toHaveLength(lam1.length);
    expect(paper.every((question) => question.rankId === 'lam-1' && question.lessonId === 'blue-lesson-01')).toBe(true);
    expect(paper.some((question) => lam2Ids.has(question.id))).toBe(false);
    expect(new Set(paper.map((question) => question.id)).size).toBe(paper.length);

    const lam4 = getExamBank('lam-4')?.questions ?? [];
    const lam4Paper = selectPracticeQuestions(lam4, () => 0.42);
    const lam4Intros = lam4Paper.filter((question) =>
      question.question.toLowerCase().includes('lời thiệu')
    );
    expect(lam4Intros).toHaveLength(1);
    expect(lam4Paper.length).toBe(
      lam4.filter((question) => !question.question.toLowerCase().includes('lời thiệu')).length + 1
    );
    expect(lam4Paper.length).toBeGreaterThan(10);
  });

  it('lists every lesson rank in the practice catalog', () => {
    const catalog = listPracticeCatalog();
    expect(catalog.map((entry) => entry.rankId)).toEqual(ranks.map((rank) => rank.id));
    const brown = catalog.find((entry) => entry.rankId === 'nau');
    const brownBank = getExamBank('nau');
    expect(brown).toMatchObject({
      questionCount: 10,
      durationMinutes: 20,
      bankCount: brownBank?.questions.length,
    });
    expect(brown?.note).toBeUndefined();
    expect(catalog.find((entry) => entry.rankId === 'lam-1')).toMatchObject({
      questionCount: 10,
      durationMinutes: 20,
      bankCount: getExamBank('lam-1')?.questions.length,
    });
    expect(catalog.find((entry) => entry.rankId === 'luc-1')).toMatchObject({
      questionCount: 15,
      durationMinutes: 20,
    });
    expect(catalog.find((entry) => entry.rankId === 'hong-1')).toMatchObject({
      questionCount: 20,
      durationMinutes: 30,
    });
    expect(getExamBank('blue')).toBeNull();
    expect(brownBank?.questions.length).toBeGreaterThan(0);
    expect(getExamBank('chuan-hong')).toBeNull();
    expect(BELT_RANKS.find((rank) => rank.id === 'chuan-hong')?.promotionLessonId).toBeUndefined();
  });
});
