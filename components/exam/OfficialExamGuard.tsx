'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  exitOfficialExam,
  isOfficialExamSessionPath,
  officialAttemptPath,
  takeLastExitedAttemptId,
} from '@/lib/official-exam';

export function OfficialExamGuard() {
  const pathname = usePathname();
  const router = useRouter();
  const previousPath = useRef(pathname);

  useEffect(() => {
    const onPageHide = () => {
      if (!isOfficialExamSessionPath(window.location.pathname)) return;
      exitOfficialExam({ beacon: true, rememberReload: true });
    };
    window.addEventListener('pagehide', onPageHide);
    return () => window.removeEventListener('pagehide', onPageHide);
  }, []);

  useEffect(() => {
    const previous = previousPath.current;
    previousPath.current = pathname;
    if (previous === pathname || !isOfficialExamSessionPath(previous)) return;
    if (pathname.startsWith('/exam/official/attempt')) return;

    const attempt = exitOfficialExam();
    const attemptId = attempt?.id ?? takeLastExitedAttemptId();
    if (attemptId) router.replace(officialAttemptPath(attemptId));
  }, [pathname, router]);

  return null;
}
