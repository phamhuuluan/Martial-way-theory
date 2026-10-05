import { Suspense } from 'react';
import type { Metadata } from 'next';
import { OfficialAttemptView } from '@/components/exam/OfficialAttemptView';

export const metadata: Metadata = {
  title: 'Kết quả thi',
};

export default function OfficialAttemptPage() {
  return (
    <Suspense
      fallback={
        <div className="profile-page px-4 py-16 text-center text-sm text-text-secondary">
          Đang mở bài làm…
        </div>
      }
    >
      <OfficialAttemptView />
    </Suspense>
  );
}
