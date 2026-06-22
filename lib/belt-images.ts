/** Kích thước chuẩn bộ nhận diện mới (assets/image) */
export const BELT_IMAGE_STANDARD = {
  width: 1260,
  height: 352,
} as const;

export const BELT_IMAGE_ASPECT_RATIO =
  `${BELT_IMAGE_STANDARD.width} / ${BELT_IMAGE_STANDARD.height}` as const;

/** Ảnh dự phòng khi tải thất bại — đai nâu (cấp thấp nhất) */
export const BELT_IMAGE_FALLBACK_URL = '/assets/belts/nau.png';

/** Nguồn gốc assets/image → id cấp đai (bộ nhận diện mới) */
export const BELT_IMAGE_SOURCE_MAP: Record<string, string> = {
  nau: 'Nau dai dai.png',
  'lam-1': 'Lam dai nhat cap.png',
  'lam-2': 'Lam dai nhi cap.png',
  'lam-3': 'Lam dai nhi tam.png',
  'lam-4': 'Lam dai nhi tu.png',
  'luc-1': 'Luc dai nhat cap.png',
  'luc-2': 'Luc dai nhi cap.png',
  'luc-3': 'Luc dai tam cap.png',
  'luc-4': 'Luc dai tu cap.png',
  'chuan-hong': 'Hong dai thieu nien.png',
  'hong-1': 'Hong dai nhat cap.png',
  'hong-2': 'Hong dai nhi cap.png',
  'hong-3': 'Hong dai tam cap.png',
  'hong-4': 'Hong dai tu cap.png',
  'chuan-hoang': 'Hoang dai thieu nien.png',
  'hoang-1': 'Hoang dai nhat dai.png',
  'hoang-2': 'Hoang dai nhi dai.png',
  'hoang-3': 'Hoang dai tam dai.png',
  'hoang-4': 'Hoang dai tu dai.png',
  'chuan-bach': 'Chuan bach dai.png',
};

export interface BeltImageMeta {
  width: number;
  height: number;
  aspectRatio: number;
}

const standardMeta: BeltImageMeta = {
  width: BELT_IMAGE_STANDARD.width,
  height: BELT_IMAGE_STANDARD.height,
  aspectRatio: BELT_IMAGE_STANDARD.width / BELT_IMAGE_STANDARD.height,
};

/** URL công khai cho ảnh cấp đai — luôn dùng id chuẩn hóa */
export function getBeltImageUrl(rankId: string): string {
  if (rankId === 'ngu-sac-cao-nhat') {
    return '/assets/belts/ngu-sac.png';
  }
  return `/assets/belts/${rankId}.png`;
}

/** Meta hiển thị — kích thước chuẩn thống nhất trên Dashboard */
export function getBeltImageMeta(rankId: string): BeltImageMeta {
  void rankId;
  return standardMeta;
}
