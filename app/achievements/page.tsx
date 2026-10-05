import type { Metadata } from 'next';
import { ClientReplace } from '@/components/navigation/ClientReplace';

export const metadata: Metadata = {
  title: 'Huy Hiệu Đức Tính',
  description: 'Huy hiệu đức tính và cột mốc trên hành trình lý thuyết PQQ',
};

export default function AchievementsPage() {
  return <ClientReplace href="/profile/achievements" />;
}
