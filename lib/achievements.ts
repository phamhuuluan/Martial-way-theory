import type { Achievement, UserProgress } from '@/types';
import { ALL_LESSON_IDS, BELT_WORLDS } from '@/lib/constants';
import { isBeltCompleted, isLessonCompleted, getOverallProgress } from '@/lib/progress';
import { earnAchievement, getProgress } from '@/lib/storage';
import { ACHIEVEMENT_CHARACTERS } from '@/lib/achievement-characters';

function ach(
  id: keyof typeof ACHIEVEMENT_CHARACTERS,
  data: Omit<Achievement, 'id' | 'character' | 'tier'>
): Achievement {
  const meta = ACHIEVEMENT_CHARACTERS[id];
  return { id, character: meta.character, tier: meta.tier, ...data };
}

export const ACHIEVEMENTS: Achievement[] = [
  ach('first-step', {
    name: 'Bước Chân Đầu Tiên',
    description: 'Ghi nhận bước chân đầu tiên — bài Nâu Đai',
    virtue: 'Giản Dị',
    icon: '🌱',
  }),
  ach('perseverance', {
    name: 'Bền Bỉ',
    description: 'Đi qua 5 bài liên tiếp không ngừng',
    virtue: 'Bền Bỉ',
    icon: '🏔️',
  }),
  ach('humility', {
    name: 'Khiêm Cung',
    description: 'Hoàn thành Nâu Đai',
    virtue: 'Khiêm Cung',
    icon: '🌸',
  }),
  ach('humility-deep', {
    name: 'Khiêm Hạ',
    description: 'Hoàn thành Lam Đai',
    virtue: 'Khiêm Hạ',
    icon: '🌊',
  }),
  ach('patience', {
    name: 'Nhẫn Nhục',
    description: 'Ôn tập ≥3 lần rồi vượt qua bài kiểm tra',
    virtue: 'Nhẫn Nhục',
    icon: '🧘',
  }),
  ach('diligence', {
    name: 'Siêng Năng',
    description: 'Hoàn thành Lục Đai',
    virtue: 'Siêng Năng',
    icon: '🌿',
  }),
  ach('rising', {
    name: 'Vươn Lên',
    description: 'Hoàn thành Lục Đai',
    virtue: 'Vươn Lên',
    icon: '🎋',
  }),
  ach('courage', {
    name: 'Dũng Cảm',
    description: 'Hoàn thành Hồng Đai',
    virtue: 'Dũng Cảm',
    icon: '🔥',
  }),
  ach('precision', {
    name: 'Tinh Tấn',
    description: 'Làm bài kiểm tra cẩn thận, không bỏ sót câu',
    virtue: 'Tinh Tấn',
    icon: '🎯',
  }),
  ach('steadfast', {
    name: 'Vững Vàng',
    description: 'Hoàn thành Hoàng Đai',
    virtue: 'Vững Vàng',
    icon: '⛰️',
  }),
  ach('tolerance', {
    name: 'Bao Dung',
    description: 'Hoàn thành Hoàng Đai',
    virtue: 'Bao Dung',
    icon: '☀️',
  }),
  ach('integrity', {
    name: 'Chính Trực',
    description: 'Hoàn thành Bạch Đai',
    virtue: 'Chính Trực',
    icon: '⚖️',
  }),
  ach('purity', {
    name: 'Thanh Khiết',
    description: 'Hoàn thành trọn hệ thống 6 màu đai',
    virtue: 'Thanh Khiết',
    icon: '🪷',
  }),
  ach('master', {
    name: 'Học Đạo Không Ngừng',
    description: 'Hoàn thành 19 bài và ôn tập đều đặn (điểm TB ≥90%)',
    virtue: 'Trọn Hành Trình',
    icon: '📜',
  }),
  ach('perfect-quiz', {
    name: 'Hành Trình Trọn Vẹn',
    description: 'Trả lời đúng tất cả câu hỏi trong mọi bài kiểm tra',
    virtue: 'Tinh Tấn',
    icon: '✨',
  }),
];

export function getAchievementById(id: string): Achievement | undefined {
  return ACHIEVEMENTS.find((a) => a.id === id);
}

function hasConsecutiveLessons(progress: UserProgress, count: number): boolean {
  let streak = 0;
  for (const id of ALL_LESSON_IDS) {
    if (isLessonCompleted(id, progress)) {
      streak++;
      if (streak >= count) return true;
    } else {
      streak = 0;
    }
  }
  return false;
}

export function checkAchievements(progress?: UserProgress): UserProgress {
  let p = progress ?? getProgress();
  const toEarn: string[] = [];

  if (isLessonCompleted('brown-lesson-01', p)) toEarn.push('first-step');
  if (isBeltCompleted('brown', p)) toEarn.push('humility');
  if (isBeltCompleted('blue', p)) toEarn.push('humility-deep');
  if (isBeltCompleted('green', p)) {
    toEarn.push('diligence', 'rising');
  }
  if (isBeltCompleted('red', p)) toEarn.push('courage');
  if (isBeltCompleted('yellow', p)) {
    toEarn.push('steadfast', 'tolerance');
  }
  if (isBeltCompleted('white', p)) {
    toEarn.push('integrity', 'purity');
  }

  if (hasConsecutiveLessons(p, 5)) toEarn.push('perseverance');

  const hasPatience = Object.values(p.quizzes).some(
    (q) => q.attempts >= 3 && q.passed
  );
  if (hasPatience) toEarn.push('patience');

  const hasPerfect = Object.values(p.quizzes).some((q) => q.score === 100);
  if (hasPerfect) toEarn.push('precision');

  const allPerfect = ALL_LESSON_IDS.every(
    (id) => p.quizzes[id]?.score === 100
  );
  if (allPerfect && ALL_LESSON_IDS.length > 0) toEarn.push('perfect-quiz');

  const overall = getOverallProgress(p);
  if (
    overall.completedLessons === overall.totalLessons &&
    overall.averageScore >= 90
  ) {
    toEarn.push('master');
  }

  for (const id of toEarn) {
    if (!p.achievements.includes(id)) {
      p = earnAchievement(id);
    }
  }

  return p;
}

export function getNewAchievements(
  before: UserProgress,
  after: UserProgress
): Achievement[] {
  const newIds = after.achievements.filter(
    (id) => !before.achievements.includes(id)
  );
  return newIds
    .map((id) => getAchievementById(id))
    .filter((a): a is Achievement => !!a);
}
