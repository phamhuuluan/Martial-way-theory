'use client';

import { useEffect, useRef, useState } from 'react';
import { formatClock } from '@/lib/exam-paper';
import { cn } from '@/lib/utils';

export function ExamTimer({
  startedAt,
  timeLimitMs,
  onExpire,
}: {
  startedAt: string;
  timeLimitMs: number;
  onExpire: () => void;
}) {
  const [now, setNow] = useState(() => Date.now());
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    const expireAt = new Date(startedAt).getTime() + timeLimitMs;
    const timer = window.setInterval(() => {
      const current = Date.now();
      setNow(current);
      if (current >= expireAt) onExpireRef.current();
    }, 1000);
    return () => window.clearInterval(timer);
  }, [startedAt, timeLimitMs]);

  const remainingMs = Math.max(0, new Date(startedAt).getTime() + timeLimitMs - now);

  return (
    <p
      className={cn(
        'font-display text-lg tabular-nums',
        remainingMs <= 60_000 ? 'text-error' : 'text-text-primary'
      )}
      aria-live="polite"
    >
      {formatClock(remainingMs)}
    </p>
  );
}
