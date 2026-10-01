import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  ADMIN_STORAGE_KEY,
  isAdminPassword,
  parseAdminFlag,
  persistAdminFlag,
  readAdminFlag,
  serializeAdminFlag,
} from '@/lib/admin-storage';

function installStorage(storage: Storage) {
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: { localStorage: storage },
  });
}

function memoryStorage(): Storage {
  const map = new Map<string, string>();
  return {
    get length() {
      return map.size;
    },
    clear() {
      map.clear();
    },
    getItem(key) {
      return map.get(key) ?? null;
    },
    key(index) {
      return [...map.keys()][index] ?? null;
    },
    removeItem(key) {
      map.delete(key);
    },
    setItem(key, value) {
      map.set(key, value);
    },
  };
}

afterEach(() => {
  Reflect.deleteProperty(globalThis, 'window');
});

describe('admin storage', () => {
  it('accepts only the exact admin password', () => {
    expect(isAdminPassword('CM')).toBe(true);
    expect(isAdminPassword('cm')).toBe(false);
    expect(isAdminPassword(' CM')).toBe(false);
    expect(isAdminPassword('')).toBe(false);
  });

  it('reads a versioned admin flag', () => {
    expect(parseAdminFlag(null)).toBe(false);
    expect(parseAdminFlag('not-json')).toBe(false);
    expect(parseAdminFlag(JSON.stringify({ version: 1, admin: false }))).toBe(false);
    expect(parseAdminFlag(JSON.stringify({ version: 2, admin: true }))).toBe(false);
    expect(parseAdminFlag(serializeAdminFlag())).toBe(true);
  });

  it('persists the admin flag in localStorage', () => {
    const storage = memoryStorage();
    installStorage(storage);

    expect(readAdminFlag()).toBe(false);
    persistAdminFlag();
    expect(storage.getItem(ADMIN_STORAGE_KEY)).toBe(serializeAdminFlag());
    expect(readAdminFlag()).toBe(true);
  });

  it('keeps the admin flag in memory when localStorage is blocked', async () => {
    vi.resetModules();
    installStorage({
      get length() {
        return 0;
      },
      clear() {},
      getItem() {
        throw new Error('blocked');
      },
      key() {
        return null;
      },
      removeItem() {
        throw new Error('blocked');
      },
      setItem() {
        throw new Error('blocked');
      },
    });

    const blocked = await import('@/lib/admin-storage');
    expect(blocked.readAdminFlag()).toBe(false);
    blocked.persistAdminFlag();
    expect(blocked.readAdminFlag()).toBe(true);
  });
});
