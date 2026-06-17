'use client';

import { FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  DOCUMENT_TYPE_LABELS,
  formatDocumentDate,
  canViewDocument,
  type LearningDocument,
} from '@/lib/documents';
import type { DownloadStatus } from '@/lib/document-download';

interface DocumentCardProps {
  document: LearningDocument;
  downloadStatus: DownloadStatus;
  onView: (document: LearningDocument) => void;
  onDownload: (document: LearningDocument) => void;
  onWarmup?: () => void;
}

export function DocumentCard({
  document,
  downloadStatus,
  onView,
  onDownload,
  onWarmup,
}: DocumentCardProps) {
  const canPreview = canViewDocument(document);
  const isDownloading = downloadStatus === 'loading';
  const hasError = downloadStatus === 'error';

  return (
    <article
      className="profile-doc-card"
      onPointerEnter={onWarmup}
      onTouchStart={onWarmup}
    >
      <div className="profile-doc-card__header">
        <div className="profile-doc-card__icon" aria-hidden>
          <FileText className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <div className="profile-doc-card__meta">
          <h3 className="profile-doc-card__title">{document.title}</h3>
          {document.description && (
            <p className="profile-doc-card__desc">{document.description}</p>
          )}
        </div>
      </div>

      <div className="profile-doc-card__info">
        <span className="profile-doc-card__type">
          {DOCUMENT_TYPE_LABELS[document.type]} • {document.size}
        </span>
        <span className="profile-doc-card__date">
          Cập nhật {formatDocumentDate(document.updatedAt)}
        </span>
      </div>

      {hasError && (
        <p className="profile-doc-card__error" role="alert">
          Không thể tải tài liệu. Vui lòng thử lại sau.
        </p>
      )}

      <div className="profile-doc-card__actions">
        {canPreview && (
          <Button
            variant="primary"
            size="sm"
            className="profile-doc-card__btn"
            onClick={() => onView(document)}
          >
            Xem
          </Button>
        )}
        <Button
          variant="secondary"
          size="sm"
          className="profile-doc-card__btn"
          disabled={isDownloading}
          onClick={() => onDownload(document)}
        >
          {isDownloading ? (
            <>
              <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
              Đang tải…
            </>
          ) : (
            'Tải xuống'
          )}
        </Button>
      </div>
    </article>
  );
}
