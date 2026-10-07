import { BELT_WORLDS } from '@/lib/constants';
import type { PracticeCatalogEntry } from '@/lib/exam-bank';
import { ExamRankLink } from '@/components/exam/ExamRankLink';

interface PracticeRankPickerProps {
  catalog: PracticeCatalogEntry[];
  hrefBase: string;
  showQuestionCount?: boolean;
  showDuration?: boolean;
  clearExitRedirect?: boolean;
}

export function PracticeRankPicker({
  catalog,
  hrefBase,
  showQuestionCount = true,
  showDuration = false,
  clearExitRedirect = false,
}: PracticeRankPickerProps) {
  const groups = BELT_WORLDS.map((world) => ({
    world,
    ranks: catalog.filter((entry) => entry.beltId === world.id),
  })).filter((group) => group.ranks.length > 0);

  return (
    <div className="flex flex-col gap-8">
      {groups.map(({ world, ranks }) => (
        <section key={world.id}>
          <h3 className="mb-3 font-display text-lg font-semibold">{world.name}</h3>
          <ul className="flex flex-col gap-3">
            {ranks.map((rank) => (
              <li key={rank.rankId}>
                <ExamRankLink
                  href={`${hrefBase}/${rank.rankId}`}
                  clearExitRedirect={clearExitRedirect}
                  className="flex items-center justify-between gap-4 rounded-[var(--radius-md)] border border-border bg-bg-secondary/40 px-4 py-3 transition-colors hover:border-unlock/40"
                >
                  <span>
                    <span className="block font-medium">{rank.fullName}</span>
                    {(showQuestionCount || showDuration) && (
                      <span className="mt-1 block text-sm text-text-secondary">
                        {showQuestionCount ? `${rank.drawCount} câu` : ''}
                        {showQuestionCount && showDuration ? ' · ' : ''}
                        {showDuration ? `${rank.durationMinutes} phút` : ''}
                        {showQuestionCount && rank.bankCount < rank.questionCount
                          ? ` · ngân hàng ${rank.bankCount} câu`
                          : ''}
                      </span>
                    )}
                    {rank.note ? (
                      <span className="mt-1 block text-sm text-text-secondary">{rank.note}</span>
                    ) : null}
                  </span>
                  <span className="shrink-0 text-sm font-semibold text-unlock">Bắt đầu</span>
                </ExamRankLink>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
