'use client';

import { useSearchParams } from 'next/navigation';
import { isCandidateProfileComplete } from '@/lib/candidate-profile';
import { useProgressStore } from '@/store/progress-store';

export function PracticeProfileNotice() {
  const searchParams = useSearchParams();
  const profile = useProgressStore((s) => s.progress.profile);

  if (searchParams.get('notice') !== 'practice' || isCandidateProfileComplete(profile)) {
    return null;
  }

  return (
    <p className="rounded-[var(--radius-md)] border border-unlock/30 bg-unlock/5 px-4 py-3 text-sm text-text-secondary">
      Bổ sung họ và tên, ngày sinh, CLB và võ đường trước khi bắt đầu luyện đề.
    </p>
  );
}
