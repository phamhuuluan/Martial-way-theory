import type { Metadata } from 'next';
import { ProfilePageClient } from '@/components/profile/ProfilePageClient';

export const metadata: Metadata = {
  title: 'Hồ Sơ Võ Đạo',
  description: 'Theo dõi tiến độ, chứng nhận và cài đặt hành trình lý thuyết',
};

export default function ProfilePage() {
  return <ProfilePageClient />;
}
