'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { OfficialExamGuard } from '@/components/exam/OfficialExamGuard';
import { BottomTabBar, SideRail } from '@/components/layout/Navigation';
import { StorageWarning } from '@/components/layout/StorageWarning';

const OnboardingModal = dynamic(
  () => import('@/components/onboarding/OnboardingModal').then((m) => m.OnboardingModal),
  { ssr: false }
);

const BeltCeremony = dynamic(
  () => import('@/components/achievement/BeltCeremony').then((m) => m.BeltCeremony),
  { ssr: false }
);

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === '/';

  return (
    <>
      <OfficialExamGuard />
      <SideRail />
      <div className={cn('app-shell relative lg:pl-60', !isLanding && 'app-shell--content')}>
        <StorageWarning />
        <main
          className={
            isLanding
              ? 'relative min-h-screen'
              : 'relative min-h-screen pb-20 lg:pb-8'
          }
        >
          {children}
        </main>
      </div>
      {!isLanding && <BottomTabBar />}
      <OnboardingModal />
      <BeltCeremony />
    </>
  );
}
