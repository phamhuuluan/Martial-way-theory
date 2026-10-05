'use client';

import Link from 'next/link';
import { clearOfficialExamExitRedirect } from '@/lib/official-exam';

export function ExamRankLink({
  href,
  className,
  clearExitRedirect,
  children,
}: {
  href: string;
  className: string;
  clearExitRedirect?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        if (clearExitRedirect) clearOfficialExamExitRedirect();
      }}
    >
      {children}
    </Link>
  );
}
