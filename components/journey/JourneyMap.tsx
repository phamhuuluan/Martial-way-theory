'use client';

import { BELT_WORLDS } from '@/lib/constants';
import {
  getCurrentBelt,
  isBeltCompleted,
  isBeltUnlocked,
} from '@/lib/progress';
import { JourneyNode } from '@/components/journey/JourneyNode';
import {
  JourneyPathConnector,
  JourneyStageMarker,
} from '@/components/journey/JourneyPathConnector';
import { useProgressStore } from '@/store/progress-store';

export function JourneyMap() {
  const progress = useProgressStore((s) => s.progress);
  const currentBelt = getCurrentBelt(progress);

  return (
    <section className="journey-map" aria-label="Bản đồ hành trình võ đạo">
      <div className="journey-map__canvas relative">
        <JourneyPathConnector progress={progress} currentBeltId={currentBelt} />

        <ol className="journey-map__stages">
          {BELT_WORLDS.map((belt) => {
            const isCurrent = currentBelt === belt.id;
            const completed = isBeltCompleted(belt.id, progress);
            const unlocked = isBeltUnlocked(belt.id, progress);

            return (
              <li key={belt.id} className="journey-map__stage list-none">
                <JourneyStageMarker
                  completed={completed}
                  isCurrent={isCurrent}
                  unlocked={unlocked}
                  accent={belt.colors.accent}
                />
                <JourneyNode beltId={belt.id} isCurrent={isCurrent} />
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
