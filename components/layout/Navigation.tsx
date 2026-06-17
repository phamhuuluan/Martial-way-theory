'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Medal, NotebookPen, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getCurrentBelt } from '@/lib/progress';
import { useProgressStore } from '@/store/progress-store';

const ICONS = {
  journey: BookOpen,
  learn: NotebookPen,
  badge: Medal,
  profile: User,
} as const;

const ITEMS = [
  { href: '/journey', label: 'Hành trình', icon: 'journey' as const },
  { href: '/world', label: 'Học', icon: 'learn' as const, dynamic: true },
  { href: '/achievements', label: 'Huy hiệu', icon: 'badge' as const },
  { href: '/profile', label: 'Hồ sơ', icon: 'profile' as const },
];

function NavIcon({
  icon,
  active,
  className,
}: {
  icon: keyof typeof ICONS;
  active: boolean;
  className?: string;
}) {
  const Icon = ICONS[icon];

  return (
    <Icon
      className={cn('h-[1.125rem] w-[1.125rem] shrink-0', className)}
      strokeWidth={active ? 2.25 : 1.75}
      fill={active ? 'currentColor' : 'none'}
      fillOpacity={active ? 0.12 : 0}
    />
  );
}

export function BottomTabBar() {
  const pathname = usePathname();
  const progress = useProgressStore((s) => s.progress);
  const currentBelt = getCurrentBelt(progress);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-border/80 bg-bg-secondary/95 shadow-[0_-4px_24px_rgba(0,0,0,0.15)] backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-lg">
        {ITEMS.map((item) => {
          const href = item.dynamic ? `/world/${currentBelt}` : item.href;
          const active =
            pathname === href ||
            (item.href === '/journey' && pathname.startsWith('/journey')) ||
            (item.dynamic === true && pathname.startsWith('/world'));

          return (
            <Link
              key={item.label}
              href={href}
              className={cn(
                'flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors min-h-[56px] justify-center',
                active ? 'text-unlock' : 'text-text-muted hover:text-text-secondary'
              )}
            >
              <span
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full transition-colors',
                  active && 'bg-unlock/12'
                )}
              >
                <NavIcon icon={item.icon} active={active} />
              </span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function SideRail() {
  const pathname = usePathname();
  const progress = useProgressStore((s) => s.progress);
  const currentBelt = getCurrentBelt(progress);

  return (
    <aside className="side-rail fixed left-0 top-0 z-20 hidden h-full w-60 flex-col lg:flex">
      <Link href="/" className="side-rail__brand mb-10 flex items-center gap-3 px-5 pt-6">
        <img
          src="/logo.png"
          alt="PQQ"
          className="h-10 w-10 rounded-full ring-1 ring-[#c5a059]/40"
        />
        <span className="font-display text-[0.9375rem] font-bold leading-tight text-[#4a3728]">
          Phật Quang Quyền
        </span>
      </Link>
      <nav className="flex flex-col gap-2 px-4">
        {ITEMS.map((item) => {
          const href = item.dynamic ? `/world/${currentBelt}` : item.href;
          const active =
            pathname === href ||
            (item.href === '/journey' && pathname.startsWith('/journey')) ||
            (item.dynamic === true && pathname.startsWith('/world'));

          return (
            <Link
              key={item.label}
              href={href}
              className={cn(
                'side-rail__item flex items-center gap-3 rounded-[var(--radius-md)] px-4 py-3 text-sm font-medium transition-all duration-200',
                active ? 'side-rail__item--active' : 'side-rail__item--idle'
              )}
            >
              <NavIcon icon={item.icon} active={active} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
