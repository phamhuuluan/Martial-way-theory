import type { Metadata } from 'next';
import { AchievementsPageClient } from '@/components/achievement/AchievementsPageClient';

export const metadata: Metadata = {
  title: 'Huy Hiệu Đức Tính',
  description: 'Huy hiệu đức tính và cột mốc trên hành trình lý thuyết PQQ',
};

export default function AchievementsPage() {
  return <AchievementsPageClient />;
}
