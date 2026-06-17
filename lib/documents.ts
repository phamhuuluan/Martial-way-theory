import type { BeltId } from '@/types';
import documentsData from '@/content/documents.json';

export type DocumentFileType = 'pdf' | 'docx' | 'pptx' | 'xlsx' | 'other';

export interface LearningDocument {
  id: string;
  title: string;
  description?: string;
  type: DocumentFileType;
  size: string;
  /** Download URL — file gốc (DOCX/PDF) */
  url: string;
  /** In-app view URL — ưu tiên PDF nếu có */
  viewUrl?: string;
  updatedAt: string;
  /** Original filename used when downloading */
  fileName: string;
  /** Optional filters for future grouping */
  beltId?: BeltId;
  courseId?: string;
  lessonId?: string;
  order?: number;
}

export const DOCUMENT_TYPE_LABELS: Record<DocumentFileType, string> = {
  pdf: 'PDF',
  docx: 'DOCX',
  pptx: 'PPTX',
  xlsx: 'XLSX',
  other: 'Khác',
};

/** Tài liệu nguồn từ assets/doc — sinh bởi scripts/sync-assets.mjs */
export const LEARNING_DOCUMENTS: LearningDocument[] = documentsData as LearningDocument[];

export function formatDocumentDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  if (!year || !month || !day) return isoDate;
  return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
}

export function getDocumentsByBelt(beltId: BeltId): LearningDocument[] {
  return LEARNING_DOCUMENTS.filter((doc) => doc.beltId === beltId);
}

export function getDocumentsByLesson(lessonId: string): LearningDocument[] {
  return LEARNING_DOCUMENTS.filter((doc) => doc.lessonId === lessonId);
}

export function getDocumentsByCourse(courseId: string): LearningDocument[] {
  return LEARNING_DOCUMENTS.filter((doc) => doc.courseId === courseId);
}

export function isPdfDocument(doc: LearningDocument): boolean {
  return doc.type === 'pdf';
}

export type DocumentViewerType = 'pdf' | 'docx';

export function getViewerType(doc: LearningDocument): DocumentViewerType {
  if (doc.viewUrl || doc.type === 'pdf') return 'pdf';
  return 'docx';
}

export function getDocumentViewUrl(doc: LearningDocument): string {
  return doc.viewUrl ?? doc.url;
}

export function canViewDocument(doc: LearningDocument): boolean {
  return getViewerType(doc) === 'pdf' || doc.type === 'docx';
}
