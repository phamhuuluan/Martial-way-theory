'use client';

import type { CSSProperties } from 'react';
import type { BeltWorld, LessonMeta } from '@/types';
import { isBeltCompleted, isBeltUnlocked } from '@/lib/progress';
import { getFirstIncompleteLessonInBelt } from '@/lib/world-helpers';
import { CloudLayer } from '@/components/animation/CloudLayer';
import { WorldAcademyHeader } from '@/components/world/WorldAcademyHeader';
import { WorldCompletionBanner } from '@/components/world/WorldCompletionBanner';
import { WorldFeaturedLesson } from '@/components/world/WorldFeaturedLesson';
import { WorldLessonCatalog } from '@/components/world/WorldLessonCatalog';
import { WorldLockedView } from '@/components/world/WorldLockedView';
import { useProgressStore } from '@/store/progress-store';
import { cn } from '@/lib/utils';

interface BeltWorldClientProps {
  world: BeltWorld;
  lessons: LessonMeta[];
}

export function BeltWorldClient({ world, lessons }: BeltWorldClientProps) {
  const progress = useProgressStore((s) => s.progress);
  const unlocked = isBeltUnlocked(world.id, progress);

  if (!unlocked) {
    return <WorldLockedView world={world} />;
  }

  const beltCompleted = isBeltCompleted(world.id, progress);
  const featuredLesson = beltCompleted ? null : getFirstIncompleteLessonInBelt(lessons, progress);
  const featuredIndex = featuredLesson
    ? lessons.findIndex((l) => l.id === featuredLesson.id)
    : -1;

  return (
    <div
      className={cn(
        'world-page relative min-h-screen overflow-hidden px-4 py-8 lg:px-10 lg:py-10',
        world.lightMode && 'world-page--light-surface'
      )}
      style={
        world.lightMode
          ? ({ ['--world-surface' as string]: world.colors.surface } as CSSProperties)
          : undefined
      }
    >
      <div className="world-page__ambient" aria-hidden />
      <CloudLayer />

      <div className="relative mx-auto max-w-4xl">
        <WorldAcademyHeader world={world} lessons={lessons} />

        {beltCompleted ? (
          <WorldCompletionBanner world={world} />
        ) : (
          featuredLesson &&
          featuredIndex >= 0 && (
            <WorldFeaturedLesson
              lesson={featuredLesson}
              world={world}
              lessonIndex={featuredIndex}
            />
          )
        )}

        <WorldLessonCatalog
          world={world}
          lessons={lessons}
          excludeLessonId={featuredLesson?.id}
        />
      </div>
    </div>
  );
}
