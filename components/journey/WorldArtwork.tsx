'use client';

import Image from 'next/image';
import type { BeltId } from '@/types';
import { WORLD_ARTWORK } from '@/lib/constants';
import { cn } from '@/lib/utils';

export type WorldArtworkVariant = 'card' | 'banner' | 'hero';

export interface WorldArtworkProps {
  beltId: BeltId;
  dimmed?: boolean;
  className?: string;
  priority?: boolean;
  variant?: WorldArtworkVariant;
}

/**
 * Premium cinematic environment artwork for journey cards and world heroes.
 * PNG concept art with layered overlays for UI legibility.
 */
export function WorldArtwork({
  beltId,
  dimmed = false,
  className,
  priority = false,
  variant = 'card',
}: WorldArtworkProps) {
  const src = WORLD_ARTWORK[beltId];

  return (
    <div
      className={cn(
        'world-artwork relative h-full w-full overflow-hidden',
        dimmed && 'world-artwork--dimmed',
        variant === 'card' && 'world-artwork--card',
        variant === 'banner' && 'world-artwork--banner',
        variant === 'hero' && 'world-artwork--hero',
        className
      )}
    >
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        sizes={
          variant === 'hero'
            ? '100vw'
            : variant === 'banner'
              ? '(max-width: 768px) 100vw, 896px'
              : '(max-width: 640px) 100vw, 352px'
        }
        className={cn(
          'world-artwork__image object-cover object-center transition-transform duration-700 ease-out',
          !dimmed && 'group-hover:scale-[1.04]'
        )}
        draggable={false}
      />

      {/* Atmospheric depth — edge vignette */}
      <div className="world-artwork__vignette pointer-events-none absolute inset-0" aria-hidden />

      {/* Variant-specific light grading */}
      <div
        className={cn(
          'world-artwork__grade pointer-events-none absolute inset-0',
          variant === 'card' && 'world-artwork__grade--card',
          variant === 'banner' && 'world-artwork__grade--banner',
          variant === 'hero' && 'world-artwork__grade--hero'
        )}
        aria-hidden
      />

      {/* Film grain texture */}
      <div className="world-artwork__grain pointer-events-none absolute inset-0 opacity-[0.035]" aria-hidden />
    </div>
  );
}

/** @deprecated alias — use WorldArtwork */
export const WorldIllustration = WorldArtwork;
