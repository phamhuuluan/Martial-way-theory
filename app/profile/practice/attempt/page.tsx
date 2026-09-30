import { Suspense } from 'react';
import type { Metadata } from 'next';
import { PracticeAttemptView } from '@/components/exam/PracticeAttemptView';

export const metadata: Metadata = {
  title: 'Kết quả luyện đề',
};

export default function PracticeAttemptPage() {
  return (
    <Suspense
      fallback={
        <div className="profile-page px-4 py-16 text-center text-sm text-text-secondary">
          Đang mở bài làm…
        </div>
      }
    >
      <PracticeAttemptView />
    </Suspense>
  );
}
