export type BeltId = 'brown' | 'blue' | 'green' | 'red' | 'yellow' | 'white';

export interface BeltWorld {
  id: BeltId;
  name: string;
  nameShort: string;
  theme: string;
  scene: string;
  virtues: string[];
  colors: {
    primary: string;
    accent: string;
    surface: string;
  };
  lessons: string[];
  totalLessons: number;
  lightMode?: boolean;
}

export interface LessonMeta {
  id: string;
  belt: BeltId;
  level: number;
  title: string;
  subtitle: string;
  virtues: string[];
  estimatedMinutes: number;
  /** Số câu lý thuyết — đếm từ các heading ## Câu N trong MDX */
  questionsCount: number;
  /** Số câu hỏi trong bài kiểm tra trắc nghiệm */
  quizQuestionsCount: number;
  passThreshold: number;
  prerequisites: string[];
  sourceDoc: string;
  order: number;
  lessonSlug: string;
}

export type QuizQuestionType =
  | 'single'
  | 'multiple'
  | 'fill'
  | 'matching'
  | 'ordering'
  | 'scenario';

export interface QuizQuestion {
  id: string;
  lessonId: string;
  number: number;
  question: string;
  type?: QuizQuestionType;
  options: string[];
  correctIndex?: number;
  correctIndices?: number[];
  /** Fill-in-the-blank: accepted answers in order */
  blanks?: string[];
  /** Matching: prompts on the left */
  leftItems?: string[];
  /** Matching: shuffled choices on the right */
  rightItems?: string[];
  /** Matching: [leftIndex, rightIndex] pairs */
  correctPairs?: [number, number][];
  /** Ordering: shuffled items to reorder */
  items?: string[];
  /** Ordering: indices into `items` in correct sequence */
  correctOrder?: number[];
  explanation?: string;
  sourceQuestion?: string;
}

export interface QuizData {
  lessonId: string;
  title: string;
  passThreshold: number;
  questions: QuizQuestion[];
}

export interface LessonProgress {
  completed: boolean;
  readProgress: number;
  completedSections?: string[];
  completedAt?: string;
  lastReadAt?: string;
}

export interface QuizProgress {
  score: number;
  passed: boolean;
  attempts: number;
  lastAttempt: string;
  lastScore: number;
  wrongQuestions?: string[];
}

export interface BeltProgress {
  unlocked: boolean;
  completedAt?: string;
  lessonsCompleted: number;
  totalLessons: number;
}

export interface UserPreferences {
  reducedMotion: boolean;
  fontSize: 'normal' | 'large';
  colorScheme: ColorScheme;
  onboardingComplete: boolean;
}

export type ColorScheme = 'dark' | 'light';

export interface UserProfile {
  name?: string;
  startedAt: string;
  lastActiveAt: string;
}

export interface UserProgress {
  version: 1;
  profile: UserProfile;
  lessons: Record<string, LessonProgress>;
  quizzes: Record<string, QuizProgress>;
  belts: Record<string, BeltProgress>;
  achievements: string[];
  preferences: UserPreferences;
  pendingCeremony?: BeltId | null;
}

export type AchievementTier = 'gold' | 'learning' | 'powerful';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  virtue: string;
  /** Hán Nôm character representing the virtue (Hán-Việt) */
  character: string;
  tier: AchievementTier;
  icon: string;
}

export type LessonState = 'locked' | 'active' | 'completed';

export interface LessonWithState extends LessonMeta {
  state: LessonState;
  readProgress: number;
  quizScore?: number;
  quizPassed?: boolean;
}
