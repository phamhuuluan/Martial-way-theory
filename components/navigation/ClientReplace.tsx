'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function ClientReplace({ href }: { href: string }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(href);
  }, [href, router]);

  return (
    <div className="profile-page px-4 py-16 text-center text-sm text-text-secondary">
      Đang chuyển…
    </div>
  );
}
