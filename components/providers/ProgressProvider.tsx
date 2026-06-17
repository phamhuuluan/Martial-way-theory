'use client';

import { useEffect } from 'react';
import { useProgressStore } from '@/store/progress-store';

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const hydrate = useProgressStore((s) => s.hydrate);
  const hydrated = useProgressStore((s) => s.hydrated);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-primary">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-pulse rounded-full bg-gold/30" />
          <p className="text-text-secondary">Đang tải hành trình...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
