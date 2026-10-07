import fs from 'fs';
import path from 'path';
import { getBeltById } from '@/lib/constants';
import { BELT_RANKS } from '@/lib/belt-ranks';
import { getExamConfig, getPracticeRanks } from '@/lib/exam-config';
import { selectExamQuestions, selectPracticeQuestions } from '@/lib/exam-paper';
import type { BeltId } from '@/types';
import type { ExamBankFile } from '@/types/exam';

export type ExamBankPurpose = 'practice' | 'official';

const PRACTICE_BANK_DIR = path.join(process.cwd(), 'content', 'practice-bank');

/**
 * Kỳ thi đang dùng chung thư mục với ôn luyện.
 * Khi có ngân hàng thi riêng, chỉ cần đổi đường dẫn này.
 */
const OFFICIAL_BANK_DIR = path.join(process.cwd(), 'content', 'official-bank');

function bankDirectory(purpose: ExamBankPurpose): string {
  return purpose === 'official' ? OFFICIAL_BANK_DIR : PRACTICE_BANK_DIR;
}

export interface PracticeCatalogEntry {
  rankId: string;
  fullName: string;
  beltId: BeltId;
  accent: string;
  questionCount: number;
  bankCount: number;
  drawCount: number;
  durationMinutes: number;
  note?: string;
}

export function getExamBank(
  rankId: string,
  purpose: ExamBankPurpose = 'practice'
): ExamBankFile | null {
  const rank = BELT_RANKS.find((item) => item.id === rankId);
  if (!rank?.promotionLessonId) return null;

  const filePath = path.join(bankDirectory(purpose), `${rankId}.json`);
  if (!fs.existsSync(filePath)) return null;

  const parsed = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as ExamBankFile;
  if (!parsed || parsed.rankId !== rankId || !Array.isArray(parsed.questions)) return null;

  const questions = parsed.questions.filter((question) => {
    if (question.rankId !== rankId || question.beltId !== rank.beltWorldId) return false;
    if (purpose === 'practice') return question.lessonId === rank.promotionLessonId;
    return true;
  });
  if (purpose === 'practice' && questions.length !== parsed.questions.length) return null;

  return {
    rankId,
    beltId: rank.beltWorldId,
    lessonId: rank.promotionLessonId,
    ...(parsed.todo ? { todo: parsed.todo } : {}),
    questions,
  };
}

function catalogEntry(
  rankId: string,
  purpose: ExamBankPurpose,
  drawCount: number
): PracticeCatalogEntry[] {
  const rank = getPracticeRanks().find((item) => item.id === rankId);
  const config = getExamConfig(rankId);
  const bank = getExamBank(rankId, purpose);
  if (!rank || !config || !bank || bank.questions.length === 0 || drawCount <= 0) return [];

  const world = getBeltById(rank.beltWorldId);
  return [
    {
      rankId: rank.id,
      fullName: rank.fullName,
      beltId: rank.beltWorldId,
      accent: world.colors.accent,
      questionCount: config.questionCount,
      bankCount: bank.questions.length,
      drawCount,
      durationMinutes: config.durationMinutes,
      ...(bank.todo ? { note: bank.todo } : {}),
    },
  ];
}

export function listPracticeCatalog(): PracticeCatalogEntry[] {
  return getPracticeRanks().flatMap((rank) => {
    const bank = getExamBank(rank.id, 'practice');
    if (!bank) return [];
    return catalogEntry(
      rank.id,
      'practice',
      selectPracticeQuestions(bank.questions, () => 0).length
    );
  });
}

/** Cùng các cấp đai với ôn luyện cho đến khi kỳ thi có danh sách riêng. */
export function listOfficialCatalog(): PracticeCatalogEntry[] {
  return getPracticeRanks().flatMap((rank) => {
    const config = getExamConfig(rank.id);
    const bank = getExamBank(rank.id, 'official');
    if (!config || !bank) return [];
    return catalogEntry(
      rank.id,
      'official',
      selectExamQuestions(bank.questions, config.questionCount, () => 0).length
    );
  });
}

