import fs from 'fs';
import path from 'path';
import { getBeltById } from '@/lib/constants';
import { BELT_RANKS } from '@/lib/belt-ranks';
import { examDrawCount, getExamConfig, getPracticeRanks } from '@/lib/exam-config';
import type { BeltId } from '@/types';
import type { ExamBankFile } from '@/types/exam';

const EXAM_BANK_DIR = path.join(process.cwd(), 'content', 'exam-bank');

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

export function getExamBank(rankId: string): ExamBankFile | null {
  const rank = BELT_RANKS.find((item) => item.id === rankId);
  if (!rank?.promotionLessonId) return null;

  const filePath = path.join(EXAM_BANK_DIR, `${rankId}.json`);
  if (!fs.existsSync(filePath)) return null;

  const parsed = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as ExamBankFile;
  if (!parsed || parsed.rankId !== rankId || !Array.isArray(parsed.questions)) return null;

  const questions = parsed.questions.filter(
    (question) =>
      question.rankId === rankId &&
      question.lessonId === rank.promotionLessonId &&
      question.beltId === rank.beltWorldId
  );
  if (questions.length !== parsed.questions.length) return null;

  return {
    rankId,
    beltId: rank.beltWorldId,
    lessonId: rank.promotionLessonId,
    ...(parsed.todo ? { todo: parsed.todo } : {}),
    questions,
  };
}

export function listPracticeCatalog(): PracticeCatalogEntry[] {
  return getPracticeRanks().flatMap((rank) => {
    const config = getExamConfig(rank.id);
    const bank = getExamBank(rank.id);
    if (!config || !bank || bank.questions.length === 0) return [];

    const world = getBeltById(rank.beltWorldId);
    return [
      {
        rankId: rank.id,
        fullName: rank.fullName,
        beltId: rank.beltWorldId,
        accent: world.colors.accent,
        questionCount: config.questionCount,
        bankCount: bank.questions.length,
        drawCount: examDrawCount(config.questionCount, bank.questions.length),
        durationMinutes: config.durationMinutes,
        ...(bank.todo ? { note: bank.todo } : {}),
      },
    ];
  });
}

