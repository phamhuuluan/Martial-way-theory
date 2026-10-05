'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function RedirectAttempt() {
  const router = useRouter();
  const id = useSearchParams().get('id');

  useEffect(() => {
    router.replace(id ? `/exam/practice/attempt?id=${encodeURIComponent(id)}` : '/exam');
  }, [id, router]);

  return (
    <div className="profile-page px-4 py-16 text-center text-sm text-text-secondary">
      Đang chuyển…
    </div>
  );
}

export default function PracticeAttemptRedirectPage() {
  return (
    <Suspense
      fallback={
        <div className="profile-page px-4 py-16 text-center text-sm text-text-secondary">
          Đang chuyển…
        </div>
      }
    >
      <RedirectAttempt />
    </Suspense>
  );
}
