'use client';

import { useEffect } from 'react';
import { ADMIN_STORAGE_KEY } from '@/lib/admin-storage';
import { useAdminStore } from '@/store/admin-store';

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const hydrate = useAdminStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();

    const onStorage = (event: StorageEvent) => {
      if (event.key !== ADMIN_STORAGE_KEY && event.key !== null) return;
      hydrate();
    };
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) hydrate();
    };

    window.addEventListener('storage', onStorage);
    window.addEventListener('pageshow', onPageShow);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('pageshow', onPageShow);
    };
  }, [hydrate]);

  return <>{children}</>;
}
