import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ProfilePageClient } from '@/components/profile/ProfilePageClient';

export const metadata: Metadata = {
  title: 'Hồ Sơ Võ Đạo',
  description: 'Hồ sơ thí sinh, luyện đề trắc nghiệm, tiến độ và cài đặt hành trình lý thuyết',
};

export default function ProfilePage() {
  return <ProfilePageClient />;
}
