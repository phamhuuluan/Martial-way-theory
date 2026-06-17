'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { BottomTabBar, SideRail } from '@/components/layout/Navigation';
import { BeltCeremony } from '@/components/achievement/BeltCeremony';
import { OnboardingModal } from '@/components/onboarding/OnboardingModal';
import { StorageWarning } from '@/components/layout/StorageWarning';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === '/';

  return (
    <>
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
