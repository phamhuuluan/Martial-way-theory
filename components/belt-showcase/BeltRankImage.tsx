'use client';

import { useState } from 'react';
import {
  BELT_IMAGE_FALLBACK_URL,
  getBeltImageMeta,
  getBeltImageUrl,
} from '@/lib/belt-images';
import { cn } from '@/lib/utils';

type LoadStage = 'primary' | 'fallback' | 'css';

interface BeltRankImageProps {
  rankId: string;
  alt?: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  fallbackClassName?: string;
}

export function BeltRankImage({
  rankId,
  alt = '',
  className,
  loading = 'lazy',
  fallbackClassName,
}: BeltRankImageProps) {
  const [stage, setStage] = useState<LoadStage>('primary');
  const meta = getBeltImageMeta(rankId);

  if (stage === 'css') {
    return (
      <div
        className={cn(
          'belt-wheel-item__fallback',
          `belt-wheel-item__fallback--${rankId}`,
          fallbackClassName
        )}
        aria-hidden
      />
    );
  }

  const src =
    stage === 'fallback' ? BELT_IMAGE_FALLBACK_URL : getBeltImageUrl(rankId);

  return (
    <img
      src={src}
      alt={alt}
      width={meta.width}
      height={meta.height}
      className={className}
      draggable={false}
      decoding="async"
      loading={loading}
      onError={() => {
        setStage((current) => {
          if (current === 'primary') return 'fallback';
          return 'css';
        });
      }}
    />
  );
}
