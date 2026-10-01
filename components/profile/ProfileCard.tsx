'use client';

import { useState } from 'react';
import { Pencil, User } from 'lucide-react';
import { CandidateProfileDialog } from '@/components/profile/CandidateProfileForm';
import { useProgressStore } from '@/store/progress-store';
import { cn } from '@/lib/utils';

function formatBirthDate(value?: string): string {
  if (!value) return '';
  const [year, month, day] = value.split('-');
  if (!year || !month || !day) return value;
  return `${day}/${month}/${year}`;
}

export function ProfileCard({ className }: { className?: string }) {
  const profile = useProgressStore((s) => s.progress.profile);
  const [open, setOpen] = useState(false);
  const displayName = profile.name?.trim() ?? '';
  const initial = displayName.charAt(0).toUpperCase();
  const birthDate = formatBirthDate(profile.dateOfBirth);
  const details = [
    birthDate ? { label: 'Ngày sinh', value: birthDate } : null,
    profile.club ? { label: 'CLB', value: profile.club } : null,
    profile.dojo ? { label: 'Võ đường', value: profile.dojo } : null,
    profile.coach ? { label: 'HLV hướng dẫn', value: profile.coach } : null,
  ].filter((item): item is { label: string; value: string } => item !== null);

  return (
    <>
      <article className={cn('profile-identity', className)}>
        <button
          type="button"
          className="absolute right-3 top-3 z-[2] flex h-11 w-11 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-bg-elevated hover:text-text-primary"
          aria-label="Sửa thông tin"
          onClick={() => setOpen(true)}
        >
          <Pencil className="h-4 w-4" />
        </button>

        <div className="profile-identity__inner">
          <div className="profile-identity__avatar-wrap">
            <div className="profile-identity__avatar-glow" aria-hidden />
            <div className="profile-identity__avatar">
              {initial ? (
                <span className="profile-identity__initial font-display">{initial}</span>
              ) : (
                <User className="profile-identity__avatar-icon" strokeWidth={1.5} />
              )}
            </div>
          </div>

          <div className="profile-identity__details">
            <h2 className={cn('profile-identity__name font-display', !displayName && 'profile-identity__name--placeholder')}>
              {displayName || 'Thí sinh'}
            </h2>
            {details.length > 0 && (
              <dl className="mt-4 flex flex-wrap items-start justify-center gap-x-8 gap-y-3">
                {details.map((item) => (
                  <div key={item.label} className="min-w-0">
                    <dt className="profile-stat-label">{item.label}</dt>
                    <dd className="text-sm font-medium text-text-primary">{item.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </article>

      <CandidateProfileDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
