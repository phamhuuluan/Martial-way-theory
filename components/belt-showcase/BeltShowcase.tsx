'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BELT_RANKS } from '@/lib/belt-ranks';
import { getBeltShowcaseAccent } from '@/lib/belt-showcase-accent';
import { useAppReducedMotion } from '@/hooks/use-app-reduced-motion';
import { useIsLightTheme } from '@/hooks/use-is-light-theme';
import { useFinePointer } from '@/hooks/use-coarse-pointer';
import { BeltShowcaseBackdrop } from './BeltShowcaseBackdrop';
import { BeltWheelItem } from './BeltWheelItem';
import { BeltInfoPanel } from './BeltInfoPanel';
import { BeltShowcaseNavContext } from './BeltShowcaseContext';

const VISIBLE_RANGE = 4;
const TOUCH_SWIPE_THRESHOLD_PX = 52;

const showcaseRanks = BELT_RANKS;
const lastIndex = showcaseRanks.length - 1;

function clampIndex(index: number): number {
  return Math.min(lastIndex, Math.max(0, index));
}

export function BeltShowcase() {
  const reducedMotion = useAppReducedMotion();
  const isLightTheme = useIsLightTheme();
  const isFinePointer = useFinePointer();
  const stageRef = useRef<HTMLDivElement>(null);
  const isPointerOverStageRef = useRef(false);
  const isFinePointerRef = useRef(isFinePointer);

  const [focusIndex, setFocusIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const focusIndexRef = useRef(focusIndex);
  const isAnimatingRef = useRef(isAnimating);
  const reducedMotionRef = useRef(reducedMotion);

  useEffect(() => {
    focusIndexRef.current = focusIndex;
  }, [focusIndex]);

  useEffect(() => {
    isAnimatingRef.current = isAnimating;
  }, [isAnimating]);

  useEffect(() => {
    reducedMotionRef.current = reducedMotion;
  }, [reducedMotion]);

  useEffect(() => {
    isFinePointerRef.current = isFinePointer;
  }, [isFinePointer]);

  const focusedRank = showcaseRanks[focusIndex];
  const accentColor = focusedRank
    ? getBeltShowcaseAccent(focusedRank, isLightTheme)
    : '#d4af37';

  const handleAnimationStart = useCallback(() => {
    setIsAnimating(true);
  }, []);

  const handleAnimationComplete = useCallback(() => {
    setIsAnimating(false);
  }, []);

  const navContextValue = useMemo(
    () => ({
      onAnimationStart: handleAnimationStart,
      onAnimationComplete: handleAnimationComplete,
    }),
    [handleAnimationStart, handleAnimationComplete]
  );

  const navigateByStep = useCallback(
    (direction: 1 | -1) => {
      if (!reducedMotionRef.current && isAnimatingRef.current) return;

      const current = focusIndexRef.current;
      const next = clampIndex(current + direction);
      if (next === current) return;

      if (!reducedMotionRef.current) {
        isAnimatingRef.current = true;
        setIsAnimating(true);
      }
      focusIndexRef.current = next;
      setFocusIndex(next);
    },
    []
  );

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const onWheel = (event: WheelEvent) => {
      if (!isFinePointerRef.current || !isPointerOverStageRef.current) return;

      event.preventDefault();
      event.stopPropagation();

      if (!reducedMotionRef.current && isAnimatingRef.current) return;

      if (event.deltaY > 0) {
        navigateByStep(1);
      } else if (event.deltaY < 0) {
        navigateByStep(-1);
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [navigateByStep]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    let touchStartY = 0;
    let touchStartX = 0;

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      touchStartY = event.touches[0].clientY;
      touchStartX = event.touches[0].clientX;
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (isFinePointerRef.current) return;
      if (event.changedTouches.length !== 1) return;

      const touch = event.changedTouches[0];
      const deltaY = touch.clientY - touchStartY;
      const deltaX = touch.clientX - touchStartX;

      if (Math.abs(deltaY) < TOUCH_SWIPE_THRESHOLD_PX) return;
      if (Math.abs(deltaY) < Math.abs(deltaX) * 1.25) return;
      if (!reducedMotionRef.current && isAnimatingRef.current) return;

      navigateByStep(deltaY < 0 ? 1 : -1);
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [navigateByStep]);

  const handlePointerEnter = useCallback(() => {
    isPointerOverStageRef.current = true;
  }, []);

  const handlePointerLeave = useCallback(() => {
    isPointerOverStageRef.current = false;
  }, []);

  const handleStagePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      event.currentTarget.focus({ preventScroll: true });
    },
    []
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        navigateByStep(1);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        navigateByStep(-1);
      }
    },
    [navigateByStep]
  );

  return (
    <section className="belt-showcase" aria-label="Hệ thống đẳng cấp môn phái Phật Quang Quyền">
      <div
        className="belt-showcase__frame"
        style={{ ['--showcase-accent' as string]: accentColor }}
      >
        <BeltShowcaseNavContext.Provider value={navContextValue}>
          <div
            ref={stageRef}
            className="belt-showcase__stage"
            style={{
              perspectiveOrigin: '50% 50%',
            }}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            onPointerDown={handleStagePointerDown}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="listbox"
            aria-label="Cuộn hoặc vuốt dọc để xem các cấp đai"
            aria-activedescendant={
              focusedRank ? `belt-rank-${focusedRank.id}` : undefined
            }
          >
            <BeltShowcaseBackdrop />
            <div className="belt-showcase__focus-pedestal" aria-hidden />

            <div className="belt-showcase__wheel-3d" aria-hidden>
              <div className="belt-showcase__wheel-ring">
                {showcaseRanks.map((rank, index) => {
                  const offset = index - focusIndex;
                  if (Math.abs(offset) > VISIBLE_RANGE) return null;

                  return (
                    <BeltWheelItem
                      key={rank.id}
                      rank={rank}
                      offset={offset}
                      isFocused={offset === 0}
                    />
                  );
                })}
              </div>
            </div>

            <div className="belt-showcase__depth belt-showcase__depth--top" aria-hidden />
            <div className="belt-showcase__depth belt-showcase__depth--bottom" aria-hidden />

            <div className="belt-showcase__stage-nav">
              <button
                type="button"
                className="belt-showcase__stage-nav-btn"
                aria-label="Cấp đai trước"
                disabled={focusIndex === 0}
                onClick={() => navigateByStep(-1)}
              >
                <svg viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path
                    d="M5 12.5 10 7.5l5 5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="belt-showcase__stage-nav-btn"
                aria-label="Cấp đai tiếp theo"
                disabled={focusIndex === lastIndex}
                onClick={() => navigateByStep(1)}
              >
                <svg viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path
                    d="m5 7.5 5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </BeltShowcaseNavContext.Provider>

        {focusedRank && (
          <BeltInfoPanel
            rank={focusedRank}
            reducedMotion={reducedMotion}
            isLightTheme={isLightTheme}
          />
        )}
      </div>
    </section>
  );
}
