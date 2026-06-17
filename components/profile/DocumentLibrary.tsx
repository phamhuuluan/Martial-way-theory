'use client';

import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import { DocumentCard } from '@/components/profile/DocumentCard';
import { downloadLearningDocument, type DownloadStatus } from '@/lib/document-download';
import { LEARNING_DOCUMENTS, type LearningDocument } from '@/lib/documents';

const DocumentViewer = dynamic(
  () => import('@/components/profile/DocumentViewer').then((m) => m.DocumentViewer),
  { ssr: false }
);

function preloadViewer() {
  void import('@/components/profile/DocumentViewer');
}

interface DocumentLibraryProps {
  variant?: 'card' | 'page';
}

export function DocumentLibrary({ variant = 'card' }: DocumentLibraryProps) {
  const { ref, inView } = useInView({
    rootMargin: '200px 0px',
    triggerOnce: true,
  });

  const [viewingDoc, setViewingDoc] = useState<LearningDocument | null>(null);
  const [downloadStates, setDownloadStates] = useState<Record<string, DownloadStatus>>({});

  const handleView = useCallback((doc: LearningDocument) => {
    preloadViewer();
    setViewingDoc(doc);
  }, []);

  const handleDownload = useCallback(async (doc: LearningDocument) => {
    setDownloadStates((prev) => ({ ...prev, [doc.id]: 'loading' }));
    try {
      await downloadLearningDocument(doc);
      setDownloadStates((prev) => ({ ...prev, [doc.id]: 'idle' }));
    } catch {
      setDownloadStates((prev) => ({ ...prev, [doc.id]: 'error' }));
    }
  }, []);

  const handleCloseViewer = useCallback(() => {
    setViewingDoc(null);
  }, []);

  const grid = inView ? (
    <div className="profile-doc-grid">
      {LEARNING_DOCUMENTS.map((doc) => (
        <DocumentCard
          key={doc.id}
          document={doc}
          downloadStatus={downloadStates[doc.id] ?? 'idle'}
          onView={handleView}
          onDownload={handleDownload}
          onWarmup={preloadViewer}
        />
      ))}
    </div>
  ) : (
    <div className="profile-doc-grid profile-doc-grid--placeholder" aria-hidden>
      {LEARNING_DOCUMENTS.map((doc) => (
        <div key={doc.id} className="profile-doc-card profile-doc-card--skeleton" />
      ))}
    </div>
  );

  if (variant === 'page') {
    return (
      <div ref={ref} className="documents-page__library">
        {grid}
        {viewingDoc && <DocumentViewer document={viewingDoc} onClose={handleCloseViewer} />}
      </div>
    );
  }

  return (
    <section ref={ref} className="profile-card profile-doc-library">
      <h2 className="profile-card__title">Tổng hợp tài liệu</h2>
      <p className="profile-doc-library__intro">
        {LEARNING_DOCUMENTS.length} tài liệu lý thuyết võ đạo — bấm Xem để đọc ngay trong ứng dụng.
      </p>

      {grid}

      {viewingDoc && <DocumentViewer document={viewingDoc} onClose={handleCloseViewer} />}
    </section>
  );
}
