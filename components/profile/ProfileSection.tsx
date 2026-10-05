import Link from 'next/link';
import { cn } from '@/lib/utils';

export function ProfileSection({
  tab,
  children,
}: {
  tab: 'profile' | 'achievements';
  children: React.ReactNode;
}) {
  const profile = tab === 'profile';

  return (
    <div
      className={cn(
        'profile-page relative min-h-screen overflow-hidden px-4 py-8 lg:px-10 lg:py-10',
        !profile && 'achievements-page'
      )}
    >
      <div className={cn('relative mx-auto', profile ? 'max-w-4xl' : 'max-w-6xl')}>
        <header className="profile-header mb-6">
          <h1 className="profile-header__title font-display text-[1.75rem] font-bold uppercase sm:text-[2.125rem]">
            Hồ Sơ Võ Đạo
          </h1>
        </header>

        <nav className="mb-8 flex gap-2" aria-label="Hồ sơ">
          <Link
            href="/profile"
            aria-current={profile ? 'page' : undefined}
            className={cn(
              'inline-flex min-h-[44px] items-center rounded-[var(--radius-md)] px-4 py-2 text-sm font-semibold',
              profile
                ? 'bg-unlock/15 text-text-primary'
                : 'text-text-secondary hover:bg-bg-secondary/80 hover:text-text-primary'
            )}
          >
            Hồ sơ
          </Link>
          <Link
            href="/profile/achievements"
            aria-current={profile ? undefined : 'page'}
            className={cn(
              'inline-flex min-h-[44px] items-center rounded-[var(--radius-md)] px-4 py-2 text-sm font-semibold',
              profile
                ? 'text-text-secondary hover:bg-bg-secondary/80 hover:text-text-primary'
                : 'bg-unlock/15 text-text-primary'
            )}
          >
            Huy hiệu
          </Link>
        </nav>

        {children}
      </div>
    </div>
  );
}
