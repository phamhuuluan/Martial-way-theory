'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import {
  candidateFieldErrors,
  candidateProfileSchema,
  readCandidateForm,
  todayDateInputValue,
} from '@/lib/candidate-profile';
import { useProgressStore } from '@/store/progress-store';

interface CandidateProfileDialogProps {
  open: boolean;
  onClose: () => void;
}

export function CandidateProfileDialog({ open, onClose }: CandidateProfileDialogProps) {
  const profile = useProgressStore((s) => s.progress.profile);
  const setCandidateProfile = useProgressStore((s) => s.setCandidateProfile);
  const [errors, setErrors] = useState<Partial<Record<'name' | 'dateOfBirth' | 'club' | 'dojo', string>>>({});
  const [saveError, setSaveError] = useState('');

  return (
    <Modal open={open} onClose={onClose} title="Sửa thông tin thí sinh">
      <form
        className="flex flex-col gap-4"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          const parsed = candidateProfileSchema.safeParse(readCandidateForm(event.currentTarget));
          if (!parsed.success) {
            setSaveError('');
            setErrors(candidateFieldErrors(parsed.error));
            return;
          }
          setErrors({});
          const persisted = setCandidateProfile(parsed.data);
          if (!persisted) {
            setSaveError('Không lưu được hồ sơ trên trình duyệt này.');
            return;
          }
          setSaveError('');
          onClose();
        }}
      >
        <label className="flex flex-col gap-2" htmlFor="candidate-name">
          <span className="profile-setting-row__label">Họ và tên</span>
          <input
            id="candidate-name"
            name="name"
            className="profile-select w-full"
            autoComplete="name"
            placeholder="Họ và tên"
            defaultValue={profile.name ?? ''}
          />
          {errors.name && <span className="text-sm text-error">{errors.name}</span>}
        </label>

        <label className="flex flex-col gap-2" htmlFor="candidate-dob">
          <span className="profile-setting-row__label">Ngày tháng năm sinh</span>
          <input
            id="candidate-dob"
            name="dateOfBirth"
            type="date"
            className="profile-select w-full"
            min="1920-01-01"
            max={todayDateInputValue()}
            defaultValue={profile.dateOfBirth ?? ''}
          />
          {errors.dateOfBirth && (
            <span className="text-sm text-error">{errors.dateOfBirth}</span>
          )}
        </label>

        <label className="flex flex-col gap-2" htmlFor="candidate-club">
          <span className="profile-setting-row__label">CLB đang theo tập</span>
          <input
            id="candidate-club"
            name="club"
            className="profile-select w-full"
            placeholder="Tên câu lạc bộ"
            defaultValue={profile.club ?? ''}
          />
          {errors.club && <span className="text-sm text-error">{errors.club}</span>}
        </label>

        <label className="flex flex-col gap-2" htmlFor="candidate-dojo">
          <span className="profile-setting-row__label">Võ đường</span>
          <input
            id="candidate-dojo"
            name="dojo"
            className="profile-select w-full"
            placeholder="Tên võ đường"
            defaultValue={profile.dojo ?? ''}
          />
          {errors.dojo && <span className="text-sm text-error">{errors.dojo}</span>}
        </label>

        {saveError && <p className="text-sm text-error">{saveError}</p>}

        <div className="mt-2 flex gap-3">
          <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>
            Hủy
          </Button>
          <Button type="submit" variant="primary" className="flex-1">
            Lưu
          </Button>
        </div>
      </form>
    </Modal>
  );
}
