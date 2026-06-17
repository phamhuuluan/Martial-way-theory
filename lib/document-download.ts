import { fetchDocumentBlob, createBlobUrl, revokeBlobUrl } from '@/lib/document-cache';
import type { LearningDocument } from '@/lib/documents';

export type DownloadStatus = 'idle' | 'loading' | 'error';

export async function downloadLearningDocument(doc: LearningDocument): Promise<void> {
  const blob = await fetchDocumentBlob(doc.url);
  const objectUrl = createBlobUrl(blob);
  const anchor = document.createElement('a');
  anchor.href = objectUrl;
  anchor.download = doc.fileName;
  anchor.rel = 'noopener';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  revokeBlobUrl(objectUrl);
}
