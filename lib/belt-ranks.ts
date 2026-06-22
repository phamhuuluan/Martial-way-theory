import type { BeltId } from "@/types";
import { ALL_LESSON_IDS } from "@/lib/constants";
import { getBeltImageUrl } from "@/lib/belt-images";

export type BeltRankStatus =
  | "locked"
  | "in_progress"
  | "completed"
  | "ceremonial";
export type BeltTierId = "so-dang" | "trung-dang" | "cao-dang" | "thuong-dang";

export interface BeltTier {
  id: BeltTierId;
  label: string;
  capBacLabel: string;
  headerColor: string;
  headerTextColor: string;
}

export interface BeltRank {
  id: string;
  order: number;
  tierId: BeltTierId;
  beltWorldId: BeltId;
  /** Trình độ */
  fullName: string;
  /** Thời gian tập luyện — đúng theo bảng môn phái */
  trainingTime: string;
  /** Danh xưng */
  danhXung: string;
  /** Cấp bậc (Bậc Sơ / Trung / Cao / Thượng Đẳng) */
  capBac: string;
  image?: string;
  textColor?: string;
  minTrainingMonths?: number;
  promotionRequirement?: string;
  promotionLessonId?: string;
}

export const BELT_TIERS: BeltTier[] = [
  {
    id: "so-dang",
    label: "SƠ ĐẲNG",
    capBacLabel: "Bậc Sơ Đẳng",
    headerColor: "#1a4a8c",
    headerTextColor: "#ffffff",
  },
  {
    id: "trung-dang",
    label: "TRUNG ĐẲNG",
    capBacLabel: "Bậc Trung Đẳng",
    headerColor: "#b91c1c",
    headerTextColor: "#ffffff",
  },
  {
    id: "cao-dang",
    label: "CAO ĐẲNG",
    capBacLabel: "Bậc Cao Đẳng",
    headerColor: "#b8860b",
    headerTextColor: "#1a1814",
  },
  {
    id: "thuong-dang",
    label: "THƯỢNG ĐẲNG",
    capBacLabel: "Bậc Thượng Đẳng",
    headerColor: "#6b21a8",
    headerTextColor: "#ffffff",
  },
];

function tierCapBac(tierId: BeltTierId): string {
  return BELT_TIERS.find((t) => t.id === tierId)?.capBacLabel ?? "";
}

function getRankByOrder(order: number): BeltRank | undefined {
  return BELT_RANKS[order];
}

function getPreviousRank(rank: BeltRank): BeltRank | undefined {
  return BELT_RANKS[rank.order + 1];
}

export const BELT_RANKS: BeltRank[] = [
  // ── Bậc Thượng Đẳng ──
  {
    id: "ngu-sac-cao-nhat",
    order: 0,
    tierId: "thuong-dang",
    beltWorldId: "white",
    fullName: "Bạch đai ngũ sắc",
    trainingTime: "Vô định",
    danhXung: "Chưởng môn",
    capBac: tierCapBac("thuong-dang"),
    image: getBeltImageUrl("ngu-sac-cao-nhat"),
    textColor: "#c084fc",
  },
  {
    id: "ngu-sac",
    order: 1,
    tierId: "thuong-dang",
    beltWorldId: "white",
    fullName: "Bạch đai ngũ sắc",
    trainingTime: "Vô định",
    danhXung: "Phó Chưởng môn",
    capBac: tierCapBac("thuong-dang"),
    image: getBeltImageUrl("ngu-sac"),
    textColor: "#c084fc",
  },
  {
    id: "bach-de-5",
    order: 2,
    tierId: "thuong-dang",
    beltWorldId: "white",
    fullName: "Bạch đai đệ ngũ cấp",
    trainingTime: "Vô định",
    danhXung: "Võ sư Niên trưởng",
    capBac: tierCapBac("thuong-dang"),
    image: getBeltImageUrl("bach-de-5"),
    textColor: "#f5f3ef",
  },
  // ── Bậc Cao Đẳng ──
  {
    id: "bach-de-4",
    order: 3,
    tierId: "cao-dang",
    beltWorldId: "white",
    fullName: "Bạch đai đệ tứ cấp",
    trainingTime: "5 năm — Thăng cấp theo quy trình cống hiến",
    danhXung: "Võ sư Cao đẳng",
    capBac: tierCapBac("cao-dang"),
    image: getBeltImageUrl("bach-de-4"),
    textColor: "#f5f3ef",
    minTrainingMonths: 60,
  },
  {
    id: "bach-de-3",
    order: 4,
    tierId: "cao-dang",
    beltWorldId: "white",
    fullName: "Bạch đai đệ tam cấp",
    trainingTime: "5 năm — Thăng cấp theo quy trình cống hiến",
    danhXung: "Võ sư Cao đẳng",
    capBac: tierCapBac("cao-dang"),
    image: getBeltImageUrl("bach-de-3"),
    textColor: "#f5f3ef",
    minTrainingMonths: 60,
  },
  {
    id: "bach-de-2",
    order: 5,
    tierId: "cao-dang",
    beltWorldId: "white",
    fullName: "Bạch đai đệ nhị cấp",
    trainingTime: "5 năm — Thăng cấp theo quy trình cống hiến",
    danhXung: "Võ sư Cao đẳng",
    capBac: tierCapBac("cao-dang"),
    image: getBeltImageUrl("bach-de-2"),
    textColor: "#f5f3ef",
    minTrainingMonths: 60,
  },
  {
    id: "bach-de-1",
    order: 6,
    tierId: "cao-dang",
    beltWorldId: "white",
    fullName: "Bạch đai đệ nhất cấp",
    trainingTime: "5 năm — Thăng cấp theo quy trình cống hiến",
    danhXung: "Võ sư Chuẩn Cao đẳng",
    capBac: tierCapBac("cao-dang"),
    image: getBeltImageUrl("bach-de-1"),
    textColor: "#f5f3ef",
    minTrainingMonths: 60,
  },
  {
    id: "bach",
    order: 7,
    tierId: "cao-dang",
    beltWorldId: "white",
    fullName: "Bạch đai",
    trainingTime: "5 năm — Nộp luận điển võ đạo",
    danhXung: "Võ sư",
    capBac: tierCapBac("cao-dang"),
    image: getBeltImageUrl("bach"),
    textColor: "#f5f3ef",
    minTrainingMonths: 60,
    promotionLessonId: "white-lesson-02",
  },
  {
    id: "chuan-bach",
    order: 8,
    tierId: "cao-dang",
    beltWorldId: "white",
    fullName: "Chuẩn Bạch đai",
    trainingTime: "4 năm — Nộp luận điển võ đạo và 10 thế đối luyện",
    danhXung: "Chuẩn Võ sư",
    capBac: tierCapBac("cao-dang"),
    image: getBeltImageUrl("chuan-bach"),
    textColor: "#f5f3ef",
    minTrainingMonths: 48,
    promotionLessonId: "white-lesson-01",
  },
  // ── Bậc Trung Đẳng ──
  {
    id: "hoang-4",
    order: 9,
    tierId: "trung-dang",
    beltWorldId: "yellow",
    fullName: "Hoàng đai đệ tứ cấp",
    trainingTime: "3 năm — Đệ trình lên 5 thế đối luyện mới",
    danhXung: "Huấn luyện viên cao cấp",
    capBac: tierCapBac("trung-dang"),
    image: getBeltImageUrl("hoang-4"),
    textColor: "#d4af37",
    minTrainingMonths: 36,
    promotionLessonId: "yellow-lesson-04",
  },
  {
    id: "hoang-3",
    order: 10,
    tierId: "trung-dang",
    beltWorldId: "yellow",
    fullName: "Hoàng đai đệ tam cấp",
    trainingTime: "2 năm — Đệ trình lên 2 thế đối luyện mới",
    danhXung: "Huấn luyện viên trung cấp",
    capBac: tierCapBac("trung-dang"),
    image: getBeltImageUrl("hoang-3"),
    textColor: "#d4af37",
    minTrainingMonths: 24,
    promotionLessonId: "yellow-lesson-03",
  },
  {
    id: "hoang-2",
    order: 11,
    tierId: "trung-dang",
    beltWorldId: "yellow",
    fullName: "Hoàng đai đệ nhị cấp",
    trainingTime: "2 năm — Đệ trình lên 2 thế đối luyện mới",
    danhXung: "Huấn luyện viên sơ cấp",
    capBac: tierCapBac("trung-dang"),
    image: getBeltImageUrl("hoang-2"),
    textColor: "#d4af37",
    minTrainingMonths: 24,
    promotionLessonId: "yellow-lesson-02",
  },
  {
    id: "hoang-1",
    order: 12,
    tierId: "trung-dang",
    beltWorldId: "yellow",
    fullName: "Hoàng đai đệ nhất cấp",
    trainingTime: "2 năm — Đệ trình lên 2 thế đối luyện mới",
    danhXung: "Môn sinh, Huấn Luyện Viên Tập Sự",
    capBac: tierCapBac("trung-dang"),
    image: getBeltImageUrl("hoang-1"),
    textColor: "#d4af37",
    minTrainingMonths: 24,
    promotionLessonId: "yellow-lesson-01",
  },
  {
    id: "chuan-hoang",
    order: 13,
    tierId: "trung-dang",
    beltWorldId: "yellow",
    fullName: "Chuẩn Hoàng đai (Hoàng đai thiếu niên dưới 18 tuổi)",
    trainingTime: "2 năm",
    danhXung: "Huấn luyện viên tập sự",
    capBac: tierCapBac("trung-dang"),
    image: getBeltImageUrl("chuan-hoang"),
    textColor: "#d4af37",
    minTrainingMonths: 24,
  },
  {
    id: "hong-4",
    order: 14,
    tierId: "trung-dang",
    beltWorldId: "red",
    fullName: "Hồng đai đệ tứ cấp",
    trainingTime: "1 năm",
    danhXung: "Huấn luyện viên tập sự",
    capBac: tierCapBac("trung-dang"),
    image: getBeltImageUrl("hong-4"),
    textColor: "#dc2626",
    minTrainingMonths: 12,
    promotionLessonId: "red-lesson-04",
  },
  {
    id: "hong-3",
    order: 15,
    tierId: "trung-dang",
    beltWorldId: "red",
    fullName: "Hồng đai đệ tam cấp",
    trainingTime: "1 năm",
    danhXung: "Hướng dẫn viên",
    capBac: tierCapBac("trung-dang"),
    image: getBeltImageUrl("hong-3"),
    textColor: "#dc2626",
    minTrainingMonths: 12,
    promotionLessonId: "red-lesson-03",
  },
  {
    id: "hong-2",
    order: 16,
    tierId: "trung-dang",
    beltWorldId: "red",
    fullName: "Hồng đai đệ nhị cấp",
    trainingTime: "6 tháng",
    danhXung: "Hướng dẫn viên phụ tá",
    capBac: tierCapBac("trung-dang"),
    image: getBeltImageUrl("hong-2"),
    textColor: "#dc2626",
    minTrainingMonths: 6,
    promotionLessonId: "red-lesson-02",
  },
  {
    id: "hong-1",
    order: 17,
    tierId: "trung-dang",
    beltWorldId: "red",
    fullName: "Hồng đai đệ nhất cấp",
    trainingTime: "6 tháng",
    danhXung: "Hướng dẫn viên tập sự",
    capBac: tierCapBac("trung-dang"),
    image: getBeltImageUrl("hong-1"),
    textColor: "#dc2626",
    minTrainingMonths: 6,
    promotionLessonId: "red-lesson-01",
  },
  {
    id: "chuan-hong",
    order: 18,
    tierId: "trung-dang",
    beltWorldId: "red",
    fullName: "Chuẩn Hồng đai (Hồng đai thiếu niên dưới 15 tuổi)",
    trainingTime: "6 tháng",
    danhXung: "Võ sinh",
    capBac: tierCapBac("trung-dang"),
    image: getBeltImageUrl("chuan-hong"),
    textColor: "#dc2626",
    minTrainingMonths: 6,
  },
  // ── Bậc Sơ Đẳng ──
  {
    id: "luc-4",
    order: 19,
    tierId: "so-dang",
    beltWorldId: "green",
    fullName: "Tự Vệ - Lục đai đệ tứ cấp",
    trainingTime: "3 tháng",
    danhXung: "Võ sinh",
    capBac: tierCapBac("so-dang"),
    image: getBeltImageUrl("luc-4"),
    textColor: "#228b4c",
    minTrainingMonths: 3,
    promotionLessonId: "green-lesson-04",
  },
  {
    id: "luc-3",
    order: 20,
    tierId: "so-dang",
    beltWorldId: "green",
    fullName: "Tự Vệ - Lục đai đệ tam cấp",
    trainingTime: "3 tháng",
    danhXung: "Võ sinh",
    capBac: tierCapBac("so-dang"),
    image: getBeltImageUrl("luc-3"),
    textColor: "#228b4c",
    minTrainingMonths: 3,
    promotionLessonId: "green-lesson-03",
  },
  {
    id: "luc-2",
    order: 21,
    tierId: "so-dang",
    beltWorldId: "green",
    fullName: "Tự Vệ - Lục đai đệ nhị cấp",
    trainingTime: "3 tháng",
    danhXung: "Võ sinh",
    capBac: tierCapBac("so-dang"),
    image: getBeltImageUrl("luc-2"),
    textColor: "#228b4c",
    minTrainingMonths: 3,
    promotionLessonId: "green-lesson-02",
  },
  {
    id: "luc-1",
    order: 22,
    tierId: "so-dang",
    beltWorldId: "green",
    fullName: "Tự Vệ - Lục đai đệ nhất cấp",
    trainingTime: "3 tháng",
    danhXung: "Võ sinh",
    capBac: tierCapBac("so-dang"),
    image: getBeltImageUrl("luc-1"),
    textColor: "#228b4c",
    minTrainingMonths: 3,
    promotionLessonId: "green-lesson-01",
  },
  {
    id: "lam-4",
    order: 23,
    tierId: "so-dang",
    beltWorldId: "blue",
    fullName: "Tự Vệ - Lam đai đệ tứ cấp",
    trainingTime: "3 tháng",
    danhXung: "Võ sinh",
    capBac: tierCapBac("so-dang"),
    image: getBeltImageUrl("lam-4"),
    textColor: "#1d6fb8",
    minTrainingMonths: 3,
    promotionLessonId: "blue-lesson-04",
  },
  {
    id: "lam-3",
    order: 24,
    tierId: "so-dang",
    beltWorldId: "blue",
    fullName: "Tự Vệ - Lam đai đệ tam cấp",
    trainingTime: "3 tháng",
    danhXung: "Võ sinh",
    capBac: tierCapBac("so-dang"),
    image: getBeltImageUrl("lam-3"),
    textColor: "#1d6fb8",
    minTrainingMonths: 3,
    promotionLessonId: "blue-lesson-03",
  },
  {
    id: "lam-2",
    order: 25,
    tierId: "so-dang",
    beltWorldId: "blue",
    fullName: "Tự Vệ - Lam đai đệ nhị cấp",
    trainingTime: "3 tháng",
    danhXung: "Võ sinh",
    capBac: tierCapBac("so-dang"),
    image: getBeltImageUrl("lam-2"),
    textColor: "#1d6fb8",
    minTrainingMonths: 3,
    promotionLessonId: "blue-lesson-02",
  },
  {
    id: "lam-1",
    order: 26,
    tierId: "so-dang",
    beltWorldId: "blue",
    fullName: "Tự Vệ - Lam đai đệ nhất cấp",
    trainingTime: "3 tháng",
    danhXung: "Võ sinh",
    capBac: tierCapBac("so-dang"),
    image: getBeltImageUrl("lam-1"),
    textColor: "#1d6fb8",
    minTrainingMonths: 3,
    promotionLessonId: "blue-lesson-01",
  },
  {
    id: "nau",
    order: 27,
    tierId: "so-dang",
    beltWorldId: "brown",
    fullName: "Tự vệ đai nâu",
    trainingTime: "3 tháng",
    danhXung: "Võ sinh",
    capBac: tierCapBac("so-dang"),
    image: getBeltImageUrl("nau"),
    textColor: "#d4a574",
    minTrainingMonths: 3,
    promotionRequirement:
      "Hoàn thành bài lý thuyết thi thăng cấp Lam Đai Đệ Nhất Cấp.",
    promotionLessonId: "brown-lesson-01",
  },
];

const CEREMONIAL_RANK_IDS = new Set([
  "chuan-hong",
  "chuan-hoang",
  "bach-de-1",
  "bach-de-2",
  "bach-de-3",
  "bach-de-4",
  "bach-de-5",
  "ngu-sac",
  "ngu-sac-cao-nhat",
]);

export function getRanksByTier(tierId: BeltTierId): BeltRank[] {
  return BELT_RANKS.filter((rank) => rank.tierId === tierId);
}

export interface BeltRankProgress {
  status: BeltRankStatus;
  statusLabel: string;
  learningProgress: number;
  lessonsCompleted: number;
  lessonsTotal: number;
  examsCompleted: number;
  examsTotal: number;
}

function isLessonPassed(
  lessonId: string,
  progress: { quizzes: Record<string, { passed?: boolean }> },
): boolean {
  return progress.quizzes[lessonId]?.passed === true;
}

function isRankReached(
  rank: BeltRank,
  progress: { quizzes: Record<string, { passed?: boolean }> },
): boolean {
  if (rank.id === "nau") return true;
  if (CEREMONIAL_RANK_IDS.has(rank.id)) {
    const prev = getPreviousRank(rank);
    return prev ? isRankReached(prev, progress) : false;
  }
  if (!rank.promotionLessonId) return false;
  return isLessonPassed(rank.promotionLessonId, progress);
}

function isPreviousRankReached(
  rank: BeltRank,
  progress: { quizzes: Record<string, { passed?: boolean }> },
): boolean {
  const prev = getPreviousRank(rank);
  if (!prev) return true;
  return isRankReached(prev, progress);
}

export function getBeltRankProgress(
  rank: BeltRank,
  progress: {
    quizzes: Record<string, { passed?: boolean }>;
    lessons: Record<string, { readProgress?: number }>;
  },
): BeltRankProgress {
  const reached = isRankReached(rank, progress);
  const prevReached = isPreviousRankReached(rank, progress);
  const ceremonial = CEREMONIAL_RANK_IDS.has(rank.id);

  if (ceremonial) {
    return {
      status: reached ? "ceremonial" : "locked",
      statusLabel: reached ? "Cấp võ đường" : "Chưa mở",
      learningProgress: reached ? 100 : 0,
      lessonsCompleted: 0,
      lessonsTotal: 0,
      examsCompleted: 0,
      examsTotal: 0,
    };
  }

  const lessonId = rank.promotionLessonId;
  if (!lessonId) {
    return {
      status: reached ? "completed" : "locked",
      statusLabel: reached ? "Đã đạt" : "Chưa mở",
      learningProgress: reached ? 100 : 0,
      lessonsCompleted: reached ? 1 : 0,
      lessonsTotal: 1,
      examsCompleted: reached ? 1 : 0,
      examsTotal: 1,
    };
  }

  const lessonPassed = isLessonPassed(lessonId, progress);
  const readProgress = progress.lessons[lessonId]?.readProgress ?? 0;

  if (lessonPassed) {
    return {
      status: "completed",
      statusLabel: "Đã đạt",
      learningProgress: 100,
      lessonsCompleted: 1,
      lessonsTotal: 1,
      examsCompleted: 1,
      examsTotal: 1,
    };
  }

  if (rank.id === "nau" || prevReached) {
    return {
      status: "in_progress",
      statusLabel: rank.id === "nau" ? "Đang luyện tập" : "Đang thi đấu cấp",
      learningProgress: Math.round(readProgress),
      lessonsCompleted: 0,
      lessonsTotal: 1,
      examsCompleted: 0,
      examsTotal: 1,
    };
  }

  return {
    status: "locked",
    statusLabel: "Chưa mở",
    learningProgress: 0,
    lessonsCompleted: 0,
    lessonsTotal: 1,
    examsCompleted: 0,
    examsTotal: 1,
  };
}

export function getCurrentRankIndex(progress: {
  quizzes: Record<string, { passed?: boolean }>;
}): number {
  let current = BELT_RANKS.length - 1;
  for (const rank of BELT_RANKS) {
    if (isRankReached(rank, progress)) {
      current = Math.min(current, rank.order);
    }
  }
  return current;
}

export function formatTrainingDuration(months: number): string {
  if (months < 12) return `${months} tháng`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (rem === 0) return `${years} năm`;
  return `${years} năm ${rem} tháng`;
}

export function getGradeCategory(order: number): string {
  return getRankByOrder(order)?.capBac ?? "";
}

export function getDanhXung(order: number): string {
  return getRankByOrder(order)?.danhXung ?? "";
}

export function getRankLessonHref(rank: BeltRank): string | null {
  if (!rank.promotionLessonId) return null;
  const idx = ALL_LESSON_IDS.indexOf(rank.promotionLessonId);
  if (idx === -1) return null;
  const lessonId = rank.promotionLessonId;
  const belt = lessonId.split("-")[0];
  const parts = lessonId.split("-");
  const slug = `${parts[parts.length - 2]}-${parts[parts.length - 1]}`;
  return `/world/${belt}/${slug}`;
}
