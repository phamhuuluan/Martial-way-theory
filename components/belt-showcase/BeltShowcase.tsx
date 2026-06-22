'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BELT_RANKS } from '@/lib/belt-ranks';
import { getBeltShowcaseAccent } from '@/lib/belt-showcase-accent';
import { useAppReducedMotion } from '@/hooks/use-app-reduced-motion';
import { useIsLightTheme } from '@/hooks/use-is-light-theme';
import { BeltShowcaseBackdrop } from './BeltShowcaseBackdrop';
import { BeltWheelItem } from './BeltWheelItem';
import { BeltInfoPanel } from './BeltInfoPanel';
import { BeltShowcaseNavContext } from './BeltShowcaseContext';

const VISIBLE_RANGE = 4;

const showcaseRanks = BELT_RANKS;
const lastIndex = showcaseRanks.length - 1;

function clampIndex(index: number): number {
  return Math.min(lastIndex, Math.max(0, index));
}

export function BeltShowcase() {
  const reducedMotion = useAppReducedMotion();
  const isLightTheme = useIsLightTheme();
  const stageRef = useRef<HTMLDivElement>(null);

  const [focusIndex, setFocusIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPointerInside, setIsPointerInside] = useState(false);

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
      event.preventDefault();
      event.stopPropagation();

      if (!reducedMotionRef.current && isAnimatingRef.current) return;

      if (event.deltaY > 0) {
        navigateByStep(1);
      } else if (event.deltaY < 0) {
        navigateByStep(-1);
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false, capture: true });
    return () => el.removeEventListener('wheel', onWheel, { capture: true });
  }, [navigateByStep]);

  useEffect(() => {
    const root = document.documentElement;
    if (isPointerInside) {
      root.classList.add('belt-showcase-active');
    } else {
      root.classList.remove('belt-showcase-active');
    }
    return () => root.classList.remove('belt-showcase-active');
  }, [isPointerInside]);

  const handlePointerEnter = useCallback(() => {
    setIsPointerInside(true);
  }, []);

  const handlePointerLeave = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget;

    if (!(nextTarget instanceof Node)) {
      setIsPointerInside(false);
      return;
    }

    if (!event.currentTarget.contains(nextTarget)) {
      setIsPointerInside(false);
    }
  }, []);

  const handleMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    // Prevent focus-on-click from triggering browser scroll-into-view.
    event.preventDefault();
  }, []);

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
              perspective: reducedMotion ? undefined : '1200px',
              perspectiveOrigin: '50% 50%',
            }}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            onMouseDown={handleMouseDown}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="listbox"
            aria-label="Cuộn để xem các cấp đai"
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
