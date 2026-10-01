'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { CandidateProfileForm } from '@/components/profile/CandidateProfileForm';
import { Modal } from '@/components/ui/Modal';
import { isCandidateProfileComplete } from '@/lib/candidate-profile';
import { useAdminStore } from '@/store/admin-store';
import { useProgressStore } from '@/store/progress-store';

export function OnboardingModal() {
  const pathname = usePathname();
  const progress = useProgressStore((s) => s.progress);
  const adminHydrated = useAdminStore((s) => s.hydrated);
  const isAdmin = useAdminStore((s) => s.isAdmin);
  const [storageBlocked, setStorageBlocked] = useState(false);
  const open =
    adminHydrated &&
    !isAdmin &&
    !pathname.startsWith('/pqq-management') &&
    (storageBlocked || !isCandidateProfileComplete(progress.profile));

  return (
    <Modal open={open} onClose={() => {}} sheet>
      {open && (
        <CandidateProfileForm
          mode="onboarding"
          onSaved={() => setStorageBlocked(false)}
          onPersistFailed={() => setStorageBlocked(true)}
        />
      )}
    </Modal>
  );
}
