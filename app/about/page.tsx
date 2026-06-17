import type { Metadata } from 'next';
import Link from 'next/link';
import { MartialJourneySlogan } from '@/components/ui/MartialJourneySlogan';
import { BELT_SYSTEM_LABEL, SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Giới thiệu',
  description: 'Giới thiệu môn phái Phật Quang Quyền và hành trình lý thuyết võ đạo',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen px-4 py-12 lg:px-8">
      <article className="mx-auto max-w-2xl prose-lesson">
        <img
          src="/logo.png"
          alt={SITE.name}
          className="mx-auto mb-8 h-24 w-24 rounded-full shadow-glow"
        />
        <h1 className="font-display text-3xl font-bold text-center mb-6">
          Về Phật Quang Quyền
        </h1>
        <p>
          <strong>Phật Quang Quyền (PQQ)</strong> là môn võ thuật Phật giáo do Võ sư Thượng tọa
          Thượng Chân hạ Quang, Viện chủ chùa Phật Quang sáng lập năm 1992. Môn phái kết hợp tinh
          thần tu tập Phật giáo với võ thuật cổ truyền Việt Nam.
        </p>
        <h2 className="font-display text-xl font-semibold mt-8 mb-4">Hành Trình Võ Đạo</h2>
        <MartialJourneySlogan className="mb-4" />
        <p>
          Nền tảng ôn lý thuyết theo {BELT_SYSTEM_LABEL} — 19 bài học và trắc nghiệm kiểm tra.
          Tiến độ được lưu trên thiết bị, không cần đăng ký tài khoản.
        </p>
        <h2 className="font-display text-xl font-semibold mt-8 mb-4">Hệ thống đai</h2>
        <ul>
          <li>Nâu Đai — Giản dị, Bền bỉ, Khiêm cung</li>
          <li>Lam Đai — Đệ Nhất Cấp → Đệ Tứ Cấp</li>
          <li>Lục Đai — Đệ Nhất Cấp → Đệ Tứ Cấp</li>
          <li>Hồng Đai — Đệ Nhất Cấp → Đệ Tứ Cấp</li>
          <li>Hoàng Đai — Đệ Nhất Cấp → Đệ Tứ Cấp</li>
          <li>Bạch Đai — Chuẩn Bạch Đai → Bạch Đai Đệ Nhất Cấp</li>
        </ul>
        <div className="mt-12 text-center">
          <Link
            href="/journey"
            className="inline-flex min-h-[44px] items-center rounded-[var(--radius-sm)] bg-unlock px-8 py-3 font-semibold text-bg-primary hover:brightness-110"
          >
            Bắt đầu hành trình
          </Link>
        </div>
      </article>
    </div>
  );
}
