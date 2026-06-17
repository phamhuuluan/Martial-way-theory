'use client';

import { useId } from 'react';
import { cn } from '@/lib/utils';
import { getAchievementCharacter } from '@/lib/achievement-characters';
import { AchievementBadgeFrameShell } from '@/components/achievement/AchievementBadgeFrame';

interface AchievementBadgeProps {
  id: string;
  earned: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const WRAP_SIZES = {
  sm: 'flex items-center justify-center p-1',
  md: 'flex items-center justify-center p-1.5',
  lg: 'achievement-card__art flex items-center justify-center px-3 py-5 sm:px-4 sm:py-5',
  xl: 'flex items-center justify-center',
};

const BADGE_SIZES = {
  sm: 'h-[4.25rem] w-[4.25rem]',
  md: 'h-[4.75rem] w-[4.75rem]',
  lg: 'h-[5.25rem] w-[5.25rem] lg:h-[6.75rem] lg:w-[6.75rem]',
  xl: 'h-[6.5rem] w-[6.5rem] sm:h-[7rem] sm:w-[7rem]',
};

const CHAR_SIZES = {
  sm: 'text-[2rem]',
  md: 'text-[2.25rem]',
  lg: 'text-[2.75rem] sm:text-[3.25rem] lg:text-[3.5rem] xl:text-[4.25rem]',
  xl: 'text-[3.25rem] sm:text-[3.5rem] lg:text-[4.25rem]',
};

export function AchievementBadge({
  id,
  earned,
  size = 'md',
  className,
}: AchievementBadgeProps) {
  const { character, tier } = getAchievementCharacter(id);
  const uid = useId();
  const gradientId = `ach-badge-grad-${uid.replace(/:/g, '')}`;

  return (
    <div className={cn('achievement-badge-wrap shrink-0', WRAP_SIZES[size], className)}>
      <AchievementBadgeFrameShell
        tier={tier}
        earned={earned}
        gradientId={gradientId}
        badgeSizeClass={BADGE_SIZES[size]}
        charSizeClass={CHAR_SIZES[size]}
        character={character}
      />
    </div>
  );
}
