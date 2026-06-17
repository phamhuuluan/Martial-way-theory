'use client';

import type { BeltWorld, LessonMeta } from '@/types';
import { groupLessonsByDisplayState } from '@/lib/world-helpers';
import { WorldLessonCard } from '@/components/world/WorldLessonCard';
import { useProgressStore } from '@/store/progress-store';

interface WorldLessonCatalogProps {
  world: BeltWorld;
  lessons: LessonMeta[];
  excludeLessonId?: string;
}

interface CatalogSectionProps {
  title: string;
  description?: string;
  lessons: LessonMeta[];
  world: BeltWorld;
  allLessons: LessonMeta[];
}

function CatalogSection({
  title,
  description,
  lessons,
  world,
  allLessons,
}: CatalogSectionProps) {
  if (lessons.length === 0) return null;

  return (
    <section className="world-catalog__section" aria-label={title}>
      <header className="world-catalog__section-header">
        <h2 className="world-catalog__section-title font-display">{title}</h2>
        {description && (
          <p className="world-catalog__section-desc">{description}</p>
        )}
      </header>
      <ul className="world-catalog__grid list-none">
        {lessons.map((lesson) => {
          const index = allLessons.findIndex((l) => l.id === lesson.id);
          return (
            <li key={lesson.id}>
              <WorldLessonCard lesson={lesson} world={world} index={index} variant="grid" />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function WorldLessonCatalog({
  world,
  lessons,
  excludeLessonId,
}: WorldLessonCatalogProps) {
  const progress = useProgressStore((s) => s.progress);
  const groups = groupLessonsByDisplayState(lessons, progress, excludeLessonId);

  const hasAny =
    groups.inProgress.length > 0 ||
    groups.available.length > 0 ||
    groups.completed.length > 0 ||
    groups.locked.length > 0;

  if (!hasAny) return null;

  return (
    <div className="world-catalog">
      <CatalogSection
        title="Tiếp tục học"
        description="Các bài bạn đang đọc dở"
        lessons={groups.inProgress}
        world={world}
        allLessons={lessons}
      />
      <CatalogSection
        title="Bài học sẵn sàng"
        description="Mở khóa và sẵn sàng bắt đầu"
        lessons={groups.available}
        world={world}
        allLessons={lessons}
      />
      <CatalogSection
        title="Đã hoàn thành"
        description="Cuộn bài giảng đã nghiên cứu xong"
        lessons={groups.completed}
        world={world}
        allLessons={lessons}
      />
      <CatalogSection
        title="Chưa mở khóa"
        description="Hoàn thành bài trước để mở"
        lessons={groups.locked}
        world={world}
        allLessons={lessons}
      />
    </div>
  );
}
