import { BELT_WORLDS } from '@/lib/constants';
import type { BeltId } from '@/types';
import { BELT_RANKS, type BeltRank } from '@/lib/belt-ranks';

export interface ExamPaperConfig {
  rankId: string;
  beltId: BeltId;
  questionCount: number;
  durationMinutes: number;
}

const COLOR_EXAM_RULES: Record<BeltId, { questionCount: number; durationMinutes: number }> = {
  brown: { questionCount: 15, durationMinutes: 20 },
  blue: { questionCount: 15, durationMinutes: 20 },
  green: { questionCount: 20, durationMinutes: 20 },
  red: { questionCount: 25, durationMinutes: 30 },
  yellow: { questionCount: 25, durationMinutes: 30 },
  white: { questionCount: 25, durationMinutes: 30 },
};

const RANK_EXAM_QUESTION_COUNTS: Partial<Record<string, number>> = {
  'luc-1': 15,
  'luc-2': 15,
};

const RANK_EXAM_DURATIONS: Partial<Record<string, number>> = {
  'luc-3': 25,
  'luc-4': 25,
};

const BELT_IDS = new Set<string>(BELT_WORLDS.map((world) => world.id));

export function getPracticeRanks(): BeltRank[] {
  return BELT_RANKS
    .filter((rank) => Boolean(rank.promotionLessonId))
    .sort((a, b) => b.order - a.order);
}

export function resolveExamBeltId(id: string): BeltId | null {
  if (BELT_IDS.has(id)) return id as BeltId;
  return BELT_RANKS.find((rank) => rank.id === id)?.beltWorldId ?? null;
}

export function getExamLevelName(id: string): string {
  return (
    BELT_WORLDS.find((world) => world.id === id)?.name ??
    BELT_RANKS.find((rank) => rank.id === id)?.fullName ??
    id
  );
}

export function getExamConfig(id: string): ExamPaperConfig | null {
  const beltId = resolveExamBeltId(id);
  if (!beltId) return null;

  const rank = BELT_RANKS.find((item) => item.id === id);
  if (rank && !rank.promotionLessonId && !BELT_IDS.has(id)) return null;

  const rule = COLOR_EXAM_RULES[beltId];
  return {
    rankId: id,
    beltId,
    questionCount: RANK_EXAM_QUESTION_COUNTS[id] ?? rule.questionCount,
    durationMinutes: RANK_EXAM_DURATIONS[id] ?? rule.durationMinutes,
  };
}

export function examDrawCount(questionCount: number, bankCount: number): number {
  return Math.max(0, Math.min(questionCount, bankCount));
}
