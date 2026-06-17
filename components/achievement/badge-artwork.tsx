'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { getAchievementArtworkSrc } from '@/lib/achievement-artwork';

export type { BadgeArtworkId } from '@/lib/achievement-artwork';
export { isBadgeArtworkId } from '@/lib/achievement-artwork';

export type AchievementArtworkVariant = 'card' | 'reveal';

interface BadgeArtworkProps {
  id: string;
  className?: string;
  priority?: boolean;
  locked?: boolean;
  showLockHint?: boolean;
  variant?: AchievementArtworkVariant;
}

function LockedIllustration() {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="achievement-artwork__lock-icon h-[3.5rem] w-[3.5rem] sm:h-[4rem] sm:w-[4rem]"
      aria-hidden
    >
      <rect
        x="34"
        y="44"
        width="28"
        height="24"
        rx="4"
        stroke="currentColor"
        strokeWidth="2.25"
      />
      <path
        d="M42 44V36C42 29.3726 47.3726 24 54 24C60.6274 24 66 29.3726 66 36V44"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <circle cx="48" cy="56" r="3" fill="currentColor" />
      <path
        d="M68 58L78 48"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path
        d="M72 54L78 48L72 42"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BadgeArtwork({
  id,
  className,
  priority = false,
  locked = false,
  showLockHint = false,
  variant = 'card',
}: BadgeArtworkProps) {
  const src = getAchievementArtworkSrc(id);

  if (locked && showLockHint) {
    return (
      <div
        className={cn(
          'achievement-artwork achievement-artwork--locked-panel relative flex h-full w-full items-center justify-center',
          className
        )}
        aria-hidden
      >
        <LockedIllustration />
      </div>
    );
  }

  if (!src) {
    return (
      <div
        className={cn(
          'achievement-artwork achievement-artwork--fallback relative h-full w-full overflow-hidden',
          locked && 'achievement-artwork--locked-panel',
          className
        )}
        aria-hidden
      />
    );
  }

  return (
    <div
      className={cn(
        'achievement-artwork relative h-full w-full overflow-hidden',
        variant === 'card' && 'achievement-artwork--card',
        variant === 'reveal' && 'achievement-artwork--reveal',
        locked && 'achievement-artwork--locked-panel',
        className
      )}
    >
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        unoptimized
        sizes={
          variant === 'reveal'
            ? '(max-width: 640px) 160px, 192px'
            : '(max-width: 640px) 108px, 152px'
        }
        className="achievement-artwork__image object-cover object-center"
        draggable={false}
      />
    </div>
  );
}
