'use client';

import { create } from 'zustand';
import { isAdminPassword, persistAdminFlag, readAdminFlag } from '@/lib/admin-storage';

interface AdminStore {
  hydrated: boolean;
  isAdmin: boolean;
  hydrate: () => void;
  unlock: (password: string) => boolean;
}

export const useAdminStore = create<AdminStore>((set) => ({
  hydrated: false,
  isAdmin: false,

  hydrate: () => {
    if (typeof window === 'undefined') return;
    set({ isAdmin: readAdminFlag(), hydrated: true });
  },

  unlock: (password) => {
    if (!isAdminPassword(password)) return false;
    persistAdminFlag();
    set({ isAdmin: true, hydrated: true });
    return true;
  },
}));
