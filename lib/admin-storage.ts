export const ADMIN_STORAGE_KEY = 'pqq-admin-v1';

const ADMIN_PASSWORD = 'CM';

let memoryAdmin = false;

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

function storageOrNull(): Storage | null {
  if (!isBrowser()) return null;
  try {
    const test = '__pqq_admin_test__';
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
    return window.localStorage;
  } catch {
    return null;
  }
}

export function isAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function parseAdminFlag(raw: string | null): boolean {
  if (!raw) return false;
  try {
    const data = JSON.parse(raw) as { version?: unknown; admin?: unknown };
    return data.version === 1 && data.admin === true;
  } catch {
    return false;
  }
}

export function serializeAdminFlag(): string {
  return JSON.stringify({ version: 1, admin: true });
}

export function readAdminFlag(): boolean {
  const storage = storageOrNull();
  if (!storage) return memoryAdmin;

  try {
    const admin = parseAdminFlag(storage.getItem(ADMIN_STORAGE_KEY));
    if (admin) memoryAdmin = true;
    return admin;
  } catch {
    return memoryAdmin;
  }
}

export function persistAdminFlag(): void {
  memoryAdmin = true;
  const storage = storageOrNull();
  if (!storage) return;

  try {
    storage.setItem(ADMIN_STORAGE_KEY, serializeAdminFlag());
  } catch {
    // Giữ bản trong bộ nhớ khi trình duyệt chặn localStorage.
  }
}
