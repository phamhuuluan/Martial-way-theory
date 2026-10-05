import type { Metadata } from 'next';
import { ProfilePageClient } from '@/components/profile/ProfilePageClient';
import { ProfileSection } from '@/components/profile/ProfileSection';

export const metadata: Metadata = {
  title: 'Hồ Sơ Võ Đạo',
  description: 'Hồ sơ thí sinh, luyện đề trắc nghiệm, tiến độ và cài đặt hành trình lý thuyết',
};

export default function ProfilePage() {
  return (
    <ProfileSection tab="profile">
      <ProfilePageClient />
    </ProfileSection>
  );
}
