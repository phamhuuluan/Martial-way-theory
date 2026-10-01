'use client';

import { useRef, useState } from 'react';
import { X } from 'lucide-react';
import { BirthDateField } from '@/components/profile/BirthDateField';
import { SearchTextField } from '@/components/profile/SearchTextField';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import {
  candidateFieldError,
  candidateFieldErrors,
  candidateProfileSchema,
  type CandidateProfileInput,
} from '@/lib/candidate-profile';
import { useProgressStore } from '@/store/progress-store';

const nameFieldClass =
  'min-h-12 w-full rounded-[var(--radius-sm)] border border-border bg-bg-primary px-4 text-base text-text-primary placeholder:text-text-muted focus:border-unlock focus:outline-none focus:ring-1 focus:ring-unlock/50';

const STORAGE_ERROR =
  'Trình duyệt không lưu được hồ sơ. Hãy tắt chế độ riêng tư hoặc cho phép trang lưu dữ liệu, rồi thử lại.';

type ProfileField = keyof CandidateProfileInput;

interface CandidateProfileFormProps {
  mode: 'onboarding' | 'edit';
  onSaved?: () => void;
  onCancel?: () => void;
  onPersistFailed?: () => void;
}

function revealField(target: HTMLElement) {
  window.setTimeout(() => {
    target.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, 300);
}

export function CandidateProfileForm({
  mode,
  onSaved,
  onCancel,
  onPersistFailed,
}: CandidateProfileFormProps) {
  const profile = useProgressStore((s) => s.progress.profile);
  const setCandidateProfile = useProgressStore((s) => s.setCandidateProfile);
  const saveCandidateDraft = useProgressStore((s) => s.saveCandidateDraft);
  const [values, setValues] = useState<CandidateProfileInput>({
    name: profile.name ?? '',
    dateOfBirth: profile.dateOfBirth ?? '',
    club: profile.club ?? '',
    dojo: profile.dojo ?? '',
    coach: profile.coach ?? '',
  });
  const valuesRef = useRef(values);
  const [errors, setErrors] = useState<Partial<Record<ProfileField, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [saveError, setSaveError] = useState('');

  const prefix = mode === 'onboarding' ? 'onboarding' : 'edit';

  const change = (patch: Partial<CandidateProfileInput>) => {
    const next = { ...valuesRef.current, ...patch };
    valuesRef.current = next;
    setValues(next);
    if (mode === 'onboarding') saveCandidateDraft(next);
    setErrors((current) => {
      const touched = Object.keys(patch) as ProfileField[];
      const nextErrors = { ...current };
      for (const field of touched) {
        if (!submitted && !current[field]) continue;
        nextErrors[field] = candidateFieldError(field, next[field]);
      }
      return nextErrors;
    });
  };

  const blur = (field: ProfileField) => {
    setErrors((current) => ({
      ...current,
      [field]: candidateFieldError(field, valuesRef.current[field]),
    }));
  };

  return (
    <form
      className="flex max-h-full min-h-0 flex-col overflow-hidden"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
        const parsed = candidateProfileSchema.safeParse(valuesRef.current);
        if (!parsed.success) {
          setSaveError('');
          setErrors(candidateFieldErrors(parsed.error));
          return;
        }
        setErrors({});
        const persisted = setCandidateProfile(parsed.data);
        if (!persisted) {
          onPersistFailed?.();
          setSaveError(
            mode === 'onboarding' ? STORAGE_ERROR : 'Không lưu được hồ sơ trên trình duyệt này.'
          );
          return;
        }
        setSaveError('');
        onSaved?.();
      }}
    >
      <div className="min-h-0 overflow-y-auto overscroll-contain px-5 pb-4 pt-5">
        {mode === 'onboarding' ? (
          <>
            <div className="mb-6 flex justify-center">
              <img src="/logo.png" alt="PQQ" className="h-20 w-20 rounded-full shadow-glow" />
            </div>
            <h2 className="mb-6 text-center font-display text-2xl font-bold">
              Chào mừng đến Hành Trình Võ Đạo
            </h2>
          </>
        ) : (
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="font-display text-xl font-semibold">Sửa thông tin thí sinh</h2>
            <button
              type="button"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-text-muted active:bg-white/5"
              aria-label="Đóng"
              onClick={onCancel}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <label className="block scroll-mb-28 text-left" htmlFor={`${prefix}-name`}>
            <span className="mb-2 block text-sm font-medium">Họ và tên</span>
            <input
              id={`${prefix}-name`}
              name="name"
              value={values.name}
              placeholder="Họ và tên"
              autoComplete="name"
              autoFocus={mode === 'onboarding'}
              enterKeyHint="next"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${prefix}-name-error` : undefined}
              className={nameFieldClass}
              onChange={(event) => change({ name: event.target.value })}
              onBlur={() => blur('name')}
              onFocus={(event) => revealField(event.currentTarget)}
            />
            {errors.name && (
              <p id={`${prefix}-name-error`} className="mt-1 text-sm text-error" role="alert">
                {errors.name}
              </p>
            )}
          </label>

          <BirthDateField
            id={`${prefix}-dob`}
            value={values.dateOfBirth}
            error={errors.dateOfBirth}
            onChange={(dateOfBirth) => change({ dateOfBirth })}
            onBlur={() => blur('dateOfBirth')}
          />

          <SearchTextField
            id={`${prefix}-club`}
            name="club"
            label="CLB đang theo tập"
            value={values.club}
            placeholder="Tìm hoặc nhập tên câu lạc bộ"
            error={errors.club}
            onChange={(club) => change({ club })}
            onBlur={() => blur('club')}
          />

          <SearchTextField
            id={`${prefix}-dojo`}
            name="dojo"
            label="Võ đường"
            value={values.dojo}
            placeholder="Tìm hoặc nhập tên võ đường"
            error={errors.dojo}
            onChange={(dojo) => change({ dojo })}
            onBlur={() => blur('dojo')}
          />

          <SearchTextField
            id={`${prefix}-coach`}
            name="coach"
            label="HLV hướng dẫn"
            value={values.coach}
            placeholder="Tìm hoặc nhập tên HLV"
            error={errors.coach}
            onChange={(coach) => change({ coach })}
            onBlur={() => blur('coach')}
          />

          {saveError && (
            <p className="text-sm text-error" role="alert">
              {saveError}
            </p>
          )}
        </div>
      </div>

      <div className="shrink-0 border-t border-border bg-bg-elevated px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        {mode === 'onboarding' ? (
          <Button type="submit" variant="hero" size="lg" className="min-h-12 w-full">
            Bắt đầu hành trình
          </Button>
        ) : (
          <div className="flex gap-3">
            <Button type="button" variant="secondary" className="min-h-12 flex-1" onClick={onCancel}>
              Hủy
            </Button>
            <Button type="submit" variant="primary" className="min-h-12 flex-1">
              Lưu
            </Button>
          </div>
        )}
      </div>
    </form>
  );
}

interface CandidateProfileDialogProps {
  open: boolean;
  onClose: () => void;
}

export function CandidateProfileDialog({ open, onClose }: CandidateProfileDialogProps) {
  return (
    <Modal open={open} onClose={onClose} sheet>
      {open && <CandidateProfileForm mode="edit" onSaved={onClose} onCancel={onClose} />}
    </Modal>
  );
}
