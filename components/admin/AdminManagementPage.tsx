'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { AdminResultsList } from '@/components/admin/AdminResultsList';
import { useAdminStore } from '@/store/admin-store';

const fieldClass =
  'w-full rounded-[var(--radius-sm)] border border-border bg-bg-primary px-4 py-3 text-base focus:border-unlock focus:outline-none focus:ring-1 focus:ring-unlock/50';

export function AdminManagementPage() {
  const hydrated = useAdminStore((s) => s.hydrated);
  const isAdmin = useAdminStore((s) => s.isAdmin);
  const unlock = useAdminStore((s) => s.unlock);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!hydrated) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-12 w-12 animate-pulse rounded-full bg-gold/30" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <>
        <div className="min-h-screen" />
        <Modal open onClose={() => {}} size="sm">
          <h2 className="mb-2 text-center font-display text-2xl font-bold">Quản trị</h2>
          <p className="mb-6 text-center text-sm text-text-secondary">
            Nhập mật khẩu để mở quyền Admin trên trình duyệt này.
          </p>
          <form
            className="space-y-4"
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              if (unlock(password)) return;
              setError('Mật khẩu không đúng.');
            }}
          >
            <label className="block text-left">
              <span className="mb-2 block text-sm font-medium">Mật khẩu</span>
              <input
                name="password"
                type="password"
                value={password}
                autoComplete="current-password"
                autoFocus
                className={fieldClass}
                onChange={(event) => {
                  setPassword(event.target.value);
                  if (error) setError('');
                }}
              />
              {error && <p className="mt-1 text-sm text-error">{error}</p>}
            </label>
            <Button type="submit" className="w-full">
              Xác nhận
            </Button>
          </form>
        </Modal>
      </>
    );
  }

  return (
    <div className="profile-page relative min-h-screen px-4 py-8 lg:px-10 lg:py-10">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <header>
          <h1 className="profile-header__title font-display text-[1.75rem] font-bold uppercase sm:text-[2.125rem]">
            Quản lý
          </h1>
        </header>
        <AdminResultsList />
      </div>
    </div>
  );
}
