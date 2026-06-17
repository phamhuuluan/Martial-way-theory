export const ACHIEVEMENT_BADGE_IDS = [
  'first-step',
  'perseverance',
  'humility',
  'humility-deep',
  'patience',
  'diligence',
  'rising',
  'courage',
  'precision',
  'steadfast',
  'tolerance',
  'integrity',
  'purity',
  'master',
  'perfect-quiz',
] as const;

export type BadgeArtworkId = (typeof ACHIEVEMENT_BADGE_IDS)[number];

/** Served from public/assets/illustrations/achievements/ (source: assets/illustrations/achievements/) */
export const ACHIEVEMENT_ARTWORK: Record<BadgeArtworkId, string> = {
  'first-step': '/assets/illustrations/achievements/first-step.png',
  perseverance: '/assets/illustrations/achievements/perseverance.png',
  humility: '/assets/illustrations/achievements/humility.png',
  'humility-deep': '/assets/illustrations/achievements/humility-deep.png',
  patience: '/assets/illustrations/achievements/patience.png',
  diligence: '/assets/illustrations/achievements/diligence.png',
  rising: '/assets/illustrations/achievements/rising.png',
  courage: '/assets/illustrations/achievements/courage.png',
  precision: '/assets/illustrations/achievements/precision.png',
  steadfast: '/assets/illustrations/achievements/steadfast.png',
  tolerance: '/assets/illustrations/achievements/tolerance.png',
  integrity: '/assets/illustrations/achievements/integrity.png',
  purity: '/assets/illustrations/achievements/purity.png',
  master: '/assets/illustrations/achievements/master.png',
  'perfect-quiz': '/assets/illustrations/achievements/perfect-quiz.png',
};

export function getAchievementArtworkSrc(id: string): string | undefined {
  return ACHIEVEMENT_ARTWORK[id as BadgeArtworkId];
}

export function isBadgeArtworkId(id: string): id is BadgeArtworkId {
  return ACHIEVEMENT_BADGE_IDS.includes(id as BadgeArtworkId);
}
