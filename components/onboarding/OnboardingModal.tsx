'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useProgressStore } from '@/store/progress-store';

const schema = z.object({
  name: z
    .string()
    .min(2, 'Tên phải có ít nhất 2 ký tự')
    .max(50, 'Tên tối đa 50 ký tự'),
});

type FormData = z.infer<typeof schema>;

export function OnboardingModal() {
  const progress = useProgressStore((s) => s.progress);
  const setName = useProgressStore((s) => s.setName);
  const open = !progress.preferences.onboardingComplete;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: progress.profile.name ?? '' },
  });

  const onSubmit = (data: FormData) => {
    setName(data.name);
  };

  return (
    <Modal open={open} onClose={() => {}} size="md" className="text-center">
      <div className="mb-6 flex justify-center">
        <img src="/logo.jpg" alt="PQQ" className="h-20 w-20 rounded-full shadow-glow" />
      </div>
      <h2 className="font-display text-2xl font-bold mb-2">
        Chào mừng đến Hành Trình Võ Đạo
      </h2>
      <p className="text-text-secondary mb-6 text-sm leading-relaxed">
        Bước đầu trên hành trình võ đạo — hãy cho chúng tôi biết tên của bạn.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register('name')}
            placeholder="Tên môn sinh"
            className="w-full rounded-[var(--radius-sm)] border border-border bg-bg-primary px-4 py-3 text-lg focus:border-unlock focus:outline-none focus:ring-1 focus:ring-unlock/50"
            autoFocus
          />
          {errors.name && (
            <p className="mt-1 text-sm text-error">{errors.name.message}</p>
          )}
        </div>
        <Button type="submit" variant="hero" size="lg" className="w-full">
          Bắt đầu hành trình
        </Button>
      </form>
    </Modal>
  );
}
