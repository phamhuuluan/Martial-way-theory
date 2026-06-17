const blobCache = new Map<string, Blob>();

export function getCachedBlob(url: string): Blob | undefined {
  return blobCache.get(url);
}

export function cacheBlob(url: string, blob: Blob): void {
  blobCache.set(url, blob);
}

export function hasCachedBlob(url: string): boolean {
  return blobCache.has(url);
}

export async function fetchDocumentBlob(url: string): Promise<Blob> {
  const cached = getCachedBlob(url);
  if (cached) return cached;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Không thể tải tài liệu (${response.status})`);
  }

  const blob = await response.blob();
  cacheBlob(url, blob);
  return blob;
}

export function createBlobUrl(blob: Blob): string {
  return URL.createObjectURL(blob);
}

export function revokeBlobUrl(url: string): void {
  URL.revokeObjectURL(url);
}
