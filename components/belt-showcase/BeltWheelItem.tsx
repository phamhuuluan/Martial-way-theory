'use client';

import { motion } from 'framer-motion';
import { useContext } from 'react';
import type { BeltRank } from '@/lib/belt-ranks';
import { BELT_IMAGE_ASPECT_RATIO } from '@/lib/belt-images';
import { BeltRankImage } from './BeltRankImage';
import { getBeltShowcaseAccent } from '@/lib/belt-showcase-accent';
import { useAppReducedMotion } from '@/hooks/use-app-reduced-motion';
import { useIsLightTheme } from '@/hooks/use-is-light-theme';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { BeltShowcaseNavContext } from './BeltShowcaseContext';

const WHEEL_RADIUS = 440;
const ITEM_ANGLE = 20;

const WHEEL_TRANSITION = {
  duration: 0.42,
  ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
};

interface BeltWheelItemProps {
  rank: BeltRank;
  offset: number;
  isFocused: boolean;
}

function computeWheelMotion(offset: number, reduceEffects: boolean) {
  const angleDeg = offset * ITEM_ANGLE;
  const angleRad = (angleDeg * Math.PI) / 180;
  const dist = Math.abs(offset);

  const translateY = Math.sin(angleRad) * WHEEL_RADIUS;
  const translateZ = Math.cos(angleRad) * WHEEL_RADIUS - WHEEL_RADIUS;
  const rotateX = -angleDeg;
  const scale =
    dist === 0 ? 1.08 : Math.max(0.32, 0.92 - dist * 0.16);
  const opacity = dist === 0 ? 1 : Math.max(0.18, 0.72 - dist * 0.12);
  const blur = dist > 0 ? Math.min(6, dist * 2.5) : 0;
  const brightness = dist === 0 ? 1.02 : Math.max(0.55, 0.88 - dist * 0.1);
  const saturation = dist === 0 ? 1 : Math.max(0.65, 1 - dist * 0.12);

  return {
    translateY,
    translateZ,
    rotateX,
    scale,
    opacity,
    blur: reduceEffects ? Math.min(blur, 2.5) : blur,
    brightness,
    saturation,
    zIndex: Math.round(1000 - dist * 30),
  };
}

export function BeltWheelItem({ rank, offset, isFocused }: BeltWheelItemProps) {
  const nav = useContext(BeltShowcaseNavContext);
  const reducedMotion = useAppReducedMotion();
  const isLightTheme = useIsLightTheme();
  const reduceEffects = useMediaQuery('(max-width: 639px)');
  const accentColor = getBeltShowcaseAccent(rank, isLightTheme);

  const aspectRatio = BELT_IMAGE_ASPECT_RATIO;

  const motionTarget = computeWheelMotion(offset, reduceEffects);

  const filter =
    motionTarget.blur > 0
      ? `blur(${motionTarget.blur}px) brightness(${motionTarget.brightness}) saturate(${motionTarget.saturation})`
      : `brightness(${motionTarget.brightness}) saturate(${motionTarget.saturation})`;

  const content = (
    <div
      className="belt-wheel-item__inner"
      style={{ ['--belt-glow' as string]: accentColor }}
    >
      <div className="belt-wheel-item__stage" style={{ aspectRatio }}>
        <BeltRankImage
          rankId={rank.id}
          alt=""
          className={
            isFocused
              ? 'belt-wheel-item__image belt-wheel-item__image--focused'
              : 'belt-wheel-item__image'
          }
          loading={isFocused ? 'eager' : 'lazy'}
        />
      </div>

      {isFocused && <div className="belt-wheel-item__shadow" aria-hidden />}
    </div>
  );

  if (reducedMotion) {
    return (
      <div
        id={isFocused ? `belt-rank-${rank.id}` : undefined}
        className={cn('belt-wheel-item', isFocused && 'belt-wheel-item--focused')}
        style={{
          zIndex: motionTarget.zIndex,
          opacity: motionTarget.opacity,
          filter,
          transform: `translate3d(-50%, calc(-50% + ${motionTarget.translateY}px), ${motionTarget.translateZ}px) rotateX(${motionTarget.rotateX}deg) scale(${motionTarget.scale})`,
          transformStyle: 'preserve-3d',
        }}
        aria-hidden={!isFocused}
      >
        {content}
      </div>
    );
  }

  return (
    <motion.div
      id={isFocused ? `belt-rank-${rank.id}` : undefined}
      className={cn('belt-wheel-item', isFocused && 'belt-wheel-item--focused')}
      style={{
        zIndex: motionTarget.zIndex,
        filter,
        transformStyle: 'preserve-3d',
      }}
      initial={false}
      animate={{
        x: '-50%',
        y: `calc(-50% + ${motionTarget.translateY}px)`,
        translateZ: motionTarget.translateZ,
        rotateX: motionTarget.rotateX,
        scale: motionTarget.scale,
        opacity: motionTarget.opacity,
      }}
      transition={WHEEL_TRANSITION}
      onAnimationStart={
        isFocused ? () => nav?.onAnimationStart() : undefined
      }
      onAnimationComplete={
        isFocused ? () => nav?.onAnimationComplete() : undefined
      }
      aria-hidden={!isFocused}
    >
      {content}
    </motion.div>
  );
}
