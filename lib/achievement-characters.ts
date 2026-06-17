import type { AchievementTier } from '@/types';

export interface AchievementCharacterMeta {
  character: string;
  tier: AchievementTier;
  /** Hán-Việt reading for reference */
  hanViet: string;
}

/** Hán Nôm / Hán-Việt characters verified against virtue meanings (HVDic reference). */
export const ACHIEVEMENT_CHARACTERS: Record<string, AchievementCharacterMeta> = {
  'first-step': { character: '簡', tier: 'learning', hanViet: 'Giản' },
  perseverance: { character: '毅', tier: 'powerful', hanViet: 'Ngại' },
  humility: { character: '謙', tier: 'gold', hanViet: 'Khiêm' },
  'humility-deep': { character: '卑', tier: 'gold', hanViet: 'Bi' },
  patience: { character: '忍', tier: 'learning', hanViet: 'Nhẫn' },
  diligence: { character: '勤', tier: 'gold', hanViet: 'Cần' },
  rising: { character: '升', tier: 'powerful', hanViet: 'Thăng' },
  courage: { character: '勇', tier: 'powerful', hanViet: 'Dũng' },
  precision: { character: '精', tier: 'learning', hanViet: 'Tinh' },
  steadfast: { character: '穩', tier: 'powerful', hanViet: 'Ổn' },
  tolerance: { character: '容', tier: 'powerful', hanViet: 'Dung' },
  integrity: { character: '直', tier: 'gold', hanViet: 'Trực' },
  purity: { character: '潔', tier: 'gold', hanViet: 'Khiết' },
  master: { character: '道', tier: 'gold', hanViet: 'Đạo' },
  'perfect-quiz': { character: '全', tier: 'gold', hanViet: 'Toàn' },
};

export function getAchievementCharacter(id: string): AchievementCharacterMeta {
  return (
    ACHIEVEMENT_CHARACTERS[id] ?? {
      character: '德',
      tier: 'gold',
      hanViet: 'Đức',
    }
  );
}
