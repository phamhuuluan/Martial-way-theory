import type { BeltId, BeltWorld } from '@/types';

export const STORAGE_KEY = 'pqq-theory-progress-v1';
export const CURRENT_VERSION = 1;
export const READ_THRESHOLD = 95;
export const DEFAULT_PASS_THRESHOLD = 70;

export const SITE = {
  name: 'Phật Quang Quyền',
  title: 'Lý Thuyết Võ Đạo',
  description:
    'Website học lý thuyết võ đạo Phật Quang Quyền — hành trình võ đạo qua hệ thống 6 màu đai, 19 bài học và trắc nghiệm ôn lý thuyết.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pqq-theory.vercel.app',
};

export const MARTIAL_JOURNEY_SLOGAN = {
  line1: 'VÕ THUẬT RÈN LUYỆN THÂN THỂ',
  line2: 'VÕ ĐẠO SOI SÁNG TÂM HỒN',
} as const;

export const BELT_SYSTEM_LABEL = 'Hệ thống đẳng cấp môn phái Phật Quang Quyền';

/** Cinematic environment artwork — one per belt world */
export const WORLD_ARTWORK: Record<BeltId, string> = {
  brown: '/assets/worlds/brown-world.png',
  blue: '/assets/worlds/blue-world.png',
  green: '/assets/worlds/green-world.png',
  red: '/assets/worlds/red-world.png',
  yellow: '/assets/worlds/yellow-world.png',
  white: '/assets/worlds/white-world.png',
};

export const VIRTUES: Record<
  string,
  { name: string; description: string; icon: string }
> = {
  'giản-dị': {
    name: 'Giản Dị',
    description: 'Sống đơn giản, không phô trương.',
    icon: '🙏',
  },
  'bền-bỉ': {
    name: 'Bền Bỉ',
    description: 'Kiên trì rèn luyện, không nản lòng.',
    icon: '💪',
  },
  'khiêm-cung': {
    name: 'Khiêm Cung',
    description: 'Khiêm tốn, tôn trọng thầy và huynh đệ.',
    icon: '🌸',
  },
  'khiêm-hạ': {
    name: 'Khiêm Hạ',
    description: 'Hạ mình để học hỏi và tiến bộ.',
    icon: '🌊',
  },
  'nhẫn-nhục': {
    name: 'Nhẫn Nhục',
    description: 'Chịu đựng khó khăn trên con đường võ đạo.',
    icon: '🧘',
  },
  'siêng-năng': {
    name: 'Siêng Năng',
    description: 'Chăm chỉ luyện tập và học hỏi.',
    icon: '🌿',
  },
  'vươn-lên': {
    name: 'Vươn Lên',
    description: 'Không ngừng học hỏi và tiến bộ khiêm nhường.',
    icon: '🎋',
  },
  'dũng-cảm': {
    name: 'Dũng Cảm',
    description: 'Can đảm đối diện thử thách.',
    icon: '🔥',
  },
  'tinh-tấn': {
    name: 'Tinh Tấn',
    description: 'Tinh thần quyết tâm, kiên trì vươn lên.',
    icon: '⚡',
  },
  'vững-vàng': {
    name: 'Vững Vàng',
    description: 'Vững vàng trước mọi thử thách.',
    icon: '⛰️',
  },
  'bao-dung': {
    name: 'Bao Dung',
    description: 'Rộng lượng, tha thứ và yêu thương.',
    icon: '☀️',
  },
  'chính-trực': {
    name: 'Chính Trực',
    description: 'Ngay thẳng, trung thực trong lời nói và việc làm.',
    icon: '⚖️',
  },
  'thanh-khiết': {
    name: 'Thanh Khiết',
    description: 'Tâm hồn thanh tịnh, hướng thiện.',
    icon: '🪷',
  },
};

export const BELT_WORLDS: BeltWorld[] = [
  {
    id: 'brown',
    name: 'Nâu Đai',
    nameShort: 'Nâu',
    theme: 'Nâu Đai',
    scene: 'Giản dị – Bền bỉ – Khiêm cung',
    virtues: ['giản-dị', 'bền-bỉ', 'khiêm-cung'],
    colors: { primary: '#6B4423', accent: '#D4A574', surface: '#2A1F14' },
    lessons: ['brown-lesson-01'],
    totalLessons: 1,
  },
  {
    id: 'blue',
    name: 'Lam Đai',
    nameShort: 'Lam',
    theme: 'Lam Đai',
    scene: 'Khiêm hạ – Nhẫn nhục',
    virtues: ['khiêm-hạ', 'nhẫn-nhục'],
    colors: { primary: '#1E4D7B', accent: '#5BA4CF', surface: '#0F1A24' },
    lessons: ['blue-lesson-01', 'blue-lesson-02', 'blue-lesson-03', 'blue-lesson-04'],
    totalLessons: 4,
  },
  {
    id: 'green',
    name: 'Lục Đai',
    nameShort: 'Lục',
    theme: 'Lục Đai',
    scene: 'Siêng năng – Vươn lên',
    virtues: ['siêng-năng', 'vươn-lên'],
    colors: { primary: '#2D5A3D', accent: '#7CB68E', surface: '#142018' },
    lessons: ['green-lesson-01', 'green-lesson-02', 'green-lesson-03', 'green-lesson-04'],
    totalLessons: 4,
  },
  {
    id: 'red',
    name: 'Hồng Đai',
    nameShort: 'Hồng',
    theme: 'Hồng Đai',
    scene: 'Dũng cảm – Tinh tấn',
    virtues: ['dũng-cảm', 'tinh-tấn'],
    colors: { primary: '#8B1818', accent: '#E83030', surface: '#1F0808' },
    lessons: ['red-lesson-01', 'red-lesson-02', 'red-lesson-03', 'red-lesson-04'],
    totalLessons: 4,
  },
  {
    id: 'yellow',
    name: 'Hoàng Đai',
    nameShort: 'Hoàng',
    theme: 'Hoàng Đai',
    scene: 'Vững vàng – Bao dung',
    virtues: ['vững-vàng', 'bao-dung'],
    colors: { primary: '#B8860B', accent: '#FFD700', surface: '#1F1A08' },
    lessons: ['yellow-lesson-01', 'yellow-lesson-02', 'yellow-lesson-03', 'yellow-lesson-04'],
    totalLessons: 4,
  },
  {
    id: 'white',
    name: 'Bạch Đai',
    nameShort: 'Bạch',
    theme: 'Bạch Đai',
    scene: 'Chính trực – Thanh khiết',
    virtues: ['chính-trực', 'thanh-khiết'],
    colors: { primary: '#E8E0D0', accent: '#FFFFFF', surface: '#F5F0E8' },
    lessons: ['white-lesson-01', 'white-lesson-02'],
    totalLessons: 2,
    lightMode: true,
  },
];

export const ALL_LESSON_IDS = BELT_WORLDS.flatMap((w) => w.lessons);

export function getBeltById(id: BeltId): BeltWorld {
  const belt = BELT_WORLDS.find((b) => b.id === id);
  if (!belt) throw new Error(`Unknown belt: ${id}`);
  return belt;
}

export function getLessonSlugFromId(lessonId: string): string {
  const parts = lessonId.split('-');
  return `${parts[parts.length - 2]}-${parts[parts.length - 1]}`;
}

export function getBeltFromLessonId(lessonId: string): BeltId {
  return lessonId.split('-')[0] as BeltId;
}

export function getLessonHref(lessonId: string): string {
  return `/world/${getBeltFromLessonId(lessonId)}/${getLessonSlugFromId(lessonId)}`;
}

export function getNextLessonId(lessonId: string): string | null {
  const idx = ALL_LESSON_IDS.indexOf(lessonId);
  if (idx === -1 || idx >= ALL_LESSON_IDS.length - 1) return null;
  return ALL_LESSON_IDS[idx + 1];
}

export function getPrevLessonId(lessonId: string): string | null {
  const idx = ALL_LESSON_IDS.indexOf(lessonId);
  if (idx <= 0) return null;
  return ALL_LESSON_IDS[idx - 1];
}

export const NAV_ITEMS = [
  { href: '/journey', label: 'Hành trình', icon: 'map' as const },
  { href: '/world/brown', label: 'Học', icon: 'book' as const },
  { href: '/documents', label: 'Tài liệu', icon: 'dashboard' as const },
  { href: '/achievements', label: 'Huy hiệu', icon: 'award' as const },
  { href: '/profile', label: 'Hồ sơ', icon: 'user' as const },
];
