'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import {
  candidateFieldErrors,
  candidateProfileSchema,
  isCandidateProfileComplete,
  readCandidateForm,
  todayDateInputValue,
} from '@/lib/candidate-profile';
import { useProgressStore } from '@/store/progress-store';

const fieldClass =
  'w-full rounded-[var(--radius-sm)] border border-border bg-bg-primary px-4 py-3 text-base focus:border-unlock focus:outline-none focus:ring-1 focus:ring-unlock/50';

const STORAGE_ERROR =
  'Trình duyệt không lưu được hồ sơ. Hãy tắt chế độ riêng tư hoặc cho phép trang lưu dữ liệu, rồi thử lại.';

export function OnboardingModal() {
  const progress = useProgressStore((s) => s.progress);
  const setCandidateProfile = useProgressStore((s) => s.setCandidateProfile);
  const saveCandidateDraft = useProgressStore((s) => s.saveCandidateDraft);
  const [errors, setErrors] = useState<Partial<Record<'name' | 'dateOfBirth' | 'club' | 'dojo', string>>>({});
  const [storageBlocked, setStorageBlocked] = useState(false);
  const open = storageBlocked || !isCandidateProfileComplete(progress.profile);

  const persist = (form: HTMLFormElement, showErrors: boolean) => {
    const raw = readCandidateForm(form);
    const parsed = candidateProfileSchema.safeParse(raw);
    if (!parsed.success) {
      saveCandidateDraft(raw);
      if (showErrors) setErrors(candidateFieldErrors(parsed.error));
      return;
    }

    setErrors({});
    const persisted = setCandidateProfile(parsed.data);
    if (!persisted) setStorageBlocked(true);
  };

  return (
    <Modal open={open} onClose={() => {}} size="md" className="max-h-[90vh] overflow-y-auto text-left">
      <div className="mb-6 flex justify-center">
        <img src="/logo.png" alt="PQQ" className="h-20 w-20 rounded-full shadow-glow" />
      </div>
      <h2 className="mb-6 text-center font-display text-2xl font-bold">
        Chào mừng đến Hành Trình Võ Đạo
      </h2>
      <form
        className="space-y-4"
        noValidate
        onInput={(event) => persist(event.currentTarget, false)}
        onChange={(event) => persist(event.currentTarget, false)}
        onSubmit={(event) => {
          event.preventDefault();
          persist(event.currentTarget, true);
        }}
      >
        <label className="block text-left">
          <span className="mb-2 block text-sm font-medium">Họ và tên</span>
          <input
            name="name"
            defaultValue={progress.profile.name ?? ''}
            placeholder="Họ và tên"
            autoComplete="name"
            className={fieldClass}
            autoFocus
          />
          {errors.name && <p className="mt-1 text-sm text-error">{errors.name}</p>}
        </label>

        <label className="block text-left">
          <span className="mb-2 block text-sm font-medium">Ngày tháng năm sinh</span>
          <input
            name="dateOfBirth"
            type="date"
            defaultValue={progress.profile.dateOfBirth ?? ''}
            autoComplete="bday"
            min="1920-01-01"
            max={todayDateInputValue()}
            className={fieldClass}
          />
          {errors.dateOfBirth && (
            <p className="mt-1 text-sm text-error">{errors.dateOfBirth}</p>
          )}
        </label>

        <label className="block text-left">
          <span className="mb-2 block text-sm font-medium">CLB đang theo tập</span>
          <input
            name="club"
            defaultValue={progress.profile.club ?? ''}
            placeholder="Tên câu lạc bộ"
            className={fieldClass}
          />
          {errors.club && <p className="mt-1 text-sm text-error">{errors.club}</p>}
        </label>

        <label className="block text-left">
          <span className="mb-2 block text-sm font-medium">Võ đường</span>
          <input
            name="dojo"
            defaultValue={progress.profile.dojo ?? ''}
            placeholder="Tên võ đường"
            className={fieldClass}
          />
          {errors.dojo && <p className="mt-1 text-sm text-error">{errors.dojo}</p>}
        </label>

        {storageBlocked && <p className="text-sm text-error">{STORAGE_ERROR}</p>}

        <Button type="submit" variant="hero" size="lg" className="w-full">
          Bắt đầu hành trình
        </Button>
      </form>
    </Modal>
  );
}
