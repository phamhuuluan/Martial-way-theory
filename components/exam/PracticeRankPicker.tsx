import Link from 'next/link';
import { BELT_WORLDS } from '@/lib/constants';
import type { PracticeCatalogEntry } from '@/lib/exam-bank';

interface PracticeRankPickerProps {
  catalog: PracticeCatalogEntry[];
}

export function PracticeRankPicker({ catalog }: PracticeRankPickerProps) {
  const groups = BELT_WORLDS.map((world) => ({
    world,
    ranks: catalog.filter((entry) => entry.beltId === world.id),
  })).filter((group) => group.ranks.length > 0);

  return (
    <div className="profile-page relative min-h-screen overflow-hidden px-4 py-8 lg:px-10 lg:py-10">
      <div className="relative mx-auto max-w-4xl">
        <header className="profile-header mb-8">
          <p className="mb-2 text-sm text-text-muted">
            <Link href="/profile" className="hover:text-text-primary">
              Hồ sơ
            </Link>
          </p>
          <h1 className="profile-header__title font-display text-[1.75rem] font-bold uppercase sm:text-[2.125rem]">
            Luyện đề trắc nghiệm
          </h1>
        </header>

        <div className="flex flex-col gap-8">
          {groups.map(({ world, ranks }) => (
            <section key={world.id}>
              <h2 className="profile-card__title">{world.name}</h2>
              <ul className="flex flex-col gap-3">
                {ranks.map((rank) => (
                  <li key={rank.rankId}>
                    <Link
                      href={`/profile/practice/${rank.rankId}`}
                      className="flex items-center justify-between gap-4 rounded-[var(--radius-md)] border border-border bg-bg-secondary/40 px-4 py-3 transition-colors hover:border-unlock/40"
                    >
                      <span>
                        <span className="block font-medium">{rank.fullName}</span>
                        <span className="mt-1 block text-sm text-text-secondary">
                          {rank.drawCount} câu · {rank.durationMinutes} phút
                          {rank.bankCount < rank.questionCount
                            ? ` · ngân hàng ${rank.bankCount} câu`
                            : ''}
                        </span>
                        {rank.note ? (
                          <span className="mt-1 block text-sm text-text-secondary">{rank.note}</span>
                        ) : null}
                      </span>
                      <span className="shrink-0 text-sm font-semibold text-unlock">Bắt đầu</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
