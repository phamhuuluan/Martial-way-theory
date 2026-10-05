import Link from 'next/link';
import { cn } from '@/lib/utils';

export function ExamSection({
  tab,
  children,
}: {
  tab: 'practice' | 'official';
  children: React.ReactNode;
}) {
  const practice = tab === 'practice';

  return (
    <div className="profile-page relative min-h-screen overflow-hidden px-4 py-8 lg:px-10 lg:py-10">
      <div className="relative mx-auto max-w-4xl">
        <header className="profile-header mb-6">
          <h1 className="profile-header__title font-display text-[1.75rem] font-bold uppercase sm:text-[2.125rem]">
            Kỳ thi
          </h1>
        </header>

        <nav className="mb-8 flex gap-2" aria-label="Kỳ thi">
          <Link
            href="/exam"
            aria-current={practice ? 'page' : undefined}
            className={cn(
              'inline-flex min-h-[44px] items-center rounded-[var(--radius-md)] px-4 py-2 text-sm font-semibold',
              practice
                ? 'bg-unlock/15 text-text-primary'
                : 'text-text-secondary hover:bg-bg-secondary/80 hover:text-text-primary'
            )}
          >
            Ôn luyện
          </Link>
          <Link
            href="/exam/official"
            aria-current={practice ? undefined : 'page'}
            className={cn(
              'inline-flex min-h-[44px] items-center rounded-[var(--radius-md)] px-4 py-2 text-sm font-semibold',
              practice
                ? 'text-text-secondary hover:bg-bg-secondary/80 hover:text-text-primary'
                : 'bg-unlock/15 text-text-primary'
            )}
          >
            Thi
          </Link>
        </nav>

        <section>
          <h2 className="profile-card__title">Lý thuyết võ đạo</h2>
          {!practice && (
            <p className="mb-6 text-sm text-text-secondary">
              Cảnh báo nếu rời khỏi màn hình phần thi sẽ kết thúc.
            </p>
          )}
          {children}
        </section>
      </div>
    </div>
  );
}
