'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import dynamic from 'next/dynamic';
import { ViewerToolbar } from '@/components/profile/ViewerToolbar';
import { useBodyScrollLock } from '@/hooks/use-body-scroll-lock';
import { getViewerType, type LearningDocument } from '@/lib/documents';
import { cn } from '@/lib/utils';

const PdfViewerContent = dynamic(
  () => import('@/components/profile/PdfViewerContent').then((m) => m.PdfViewerContent),
  { ssr: false, loading: () => <ViewerLoading /> }
);

const DocxViewerContent = dynamic(
  () => import('@/components/profile/DocxViewerContent').then((m) => m.DocxViewerContent),
  { ssr: false, loading: () => <ViewerLoading /> }
);

const ZOOM_LEVELS = [0.75, 1, 1.25, 1.5, 2] as const;
const DEFAULT_ZOOM_INDEX = 1;

function ViewerLoading() {
  return (
    <div className="pdf-viewer__state">
      <div className="pdf-viewer__spinner" aria-hidden />
      <p>Đang mở trình xem…</p>
    </div>
  );
}

interface DocumentViewerProps {
  document: LearningDocument;
  onClose: () => void;
}

export function DocumentViewer({ document: doc, onClose }: DocumentViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [zoomIndex, setZoomIndex] = useState(DEFAULT_ZOOM_INDEX);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [pageInput, setPageInput] = useState('1');

  const viewerType = getViewerType(doc);
  const scale = ZOOM_LEVELS[zoomIndex];
  const showPageNav = viewerType === 'pdf';

  useBodyScrollLock(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(window.document.fullscreenElement));
    };
    window.document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () =>
      window.document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    setPageInput(String(pageNumber));
  }, [pageNumber]);

  const goToPage = useCallback(
    (next: number) => {
      if (!numPages) return;
      const clamped = Math.min(Math.max(1, next), numPages);
      setPageNumber(clamped);
    },
    [numPages]
  );

  const handlePageInputCommit = () => {
    const parsed = Number.parseInt(pageInput, 10);
    if (Number.isNaN(parsed)) {
      setPageInput(String(pageNumber));
      return;
    }
    goToPage(parsed);
  };

  const toggleFullscreen = async () => {
    const el = containerRef.current;
    if (!el) return;

    if (!window.document.fullscreenElement) {
      await el.requestFullscreen?.();
    } else {
      await window.document.exitFullscreen?.();
    }
  };

  const handleVisiblePageChange = useCallback((page: number) => {
    setPageNumber(page);
  }, []);

  const viewer = (
    <div
      ref={containerRef}
      className={cn('pdf-viewer', isFullscreen && 'pdf-viewer--fullscreen')}
      role="dialog"
      aria-modal="true"
      aria-label={`Xem tài liệu: ${doc.title}`}
    >
      <ViewerToolbar
        title={doc.title}
        scale={scale}
        zoomIndex={zoomIndex}
        maxZoomIndex={ZOOM_LEVELS.length - 1}
        onClose={onClose}
        onZoomIn={() => setZoomIndex((i) => Math.min(ZOOM_LEVELS.length - 1, i + 1))}
        onZoomOut={() => setZoomIndex((i) => Math.max(0, i - 1))}
        onToggleFullscreen={() => void toggleFullscreen()}
        isFullscreen={isFullscreen}
        showPageNav={showPageNav}
        pageNumber={pageNumber}
        numPages={numPages}
        pageInput={pageInput}
        onPageInputChange={setPageInput}
        onPageInputCommit={handlePageInputCommit}
        onPrevPage={() => goToPage(pageNumber - 1)}
        onNextPage={() => goToPage(pageNumber + 1)}
        pageNavDisabled={numPages === 0}
      />

      <div className="pdf-viewer__body">
        {viewerType === 'pdf' ? (
          <PdfViewerContent
            document={doc}
            scale={scale}
            pageNumber={pageNumber}
            onNumPages={setNumPages}
            onVisiblePageChange={handleVisiblePageChange}
          />
        ) : (
          <DocxViewerContent document={doc} scale={scale} />
        )}
      </div>
    </div>
  );

  if (!mounted) return null;
  return createPortal(viewer, window.document.body);
}
