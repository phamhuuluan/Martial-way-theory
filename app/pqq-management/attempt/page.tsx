import { Suspense } from 'react';
import type { Metadata } from 'next';
import { OfficialAttemptView } from '@/components/exam/OfficialAttemptView';

export const metadata: Metadata = {
  title: 'Chi tiết bài thi - Quản trị',
};

export default function AdminAttemptPage() {
  return (
    <Suspense
      fallback={
        <div className="profile-page px-4 py-16 text-center text-sm text-text-secondary">
          Đang tải dữ liệu...
        </div>
      }
    >
      <OfficialAttemptView />
    </Suspense>
  );
}
