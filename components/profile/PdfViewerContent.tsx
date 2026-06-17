'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Document, pdfjs } from 'react-pdf';
import { Loader2 } from 'lucide-react';
import { LazyPdfPage } from '@/components/profile/LazyPdfPage';
import {
  createBlobUrl,
  fetchDocumentBlob,
  getCachedBlob,
  revokeBlobUrl,
} from '@/lib/document-cache';
import { getDocumentViewUrl, type LearningDocument } from '@/lib/documents';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

interface PdfViewerContentProps {
  document: LearningDocument;
  scale: number;
  pageNumber: number;
  onNumPages: (total: number) => void;
  onVisiblePageChange: (page: number) => void;
}

export function PdfViewerContent({
  document: doc,
  scale,
  pageNumber,
  onNumPages,
  onVisiblePageChange,
}: PdfViewerContentProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [fileSource, setFileSource] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoadingFile, setIsLoadingFile] = useState(true);
  const [numPages, setNumPages] = useState(0);
  const [pageWidth, setPageWidth] = useState<number | undefined>(undefined);
  const jumpRef = useRef(false);

  const viewUrl = getDocumentViewUrl(doc);

  useEffect(() => {
    let objectUrl: string | null = null;
    let cancelled = false;

    async function loadPdf() {
      setIsLoadingFile(true);
      setLoadError(null);

      try {
        const cached = getCachedBlob(viewUrl);
        const blob = cached ?? (await fetchDocumentBlob(viewUrl));
        if (cancelled) return;

        objectUrl = createBlobUrl(blob);
        setFileSource(objectUrl);
      } catch {
        if (!cancelled) {
          setLoadError('Không thể mở tài liệu. Link file có thể đã hỏng.');
        }
      } finally {
        if (!cancelled) setIsLoadingFile(false);
      }
    }

    void loadPdf();

    return () => {
      cancelled = true;
      if (objectUrl) revokeBlobUrl(objectUrl);
    };
  }, [viewUrl]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateWidth = () => {
      const padding = 32;
      const max = Math.min(el.clientWidth - padding, 720);
      setPageWidth(Math.max(280, max));
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!numPages) return;

    const root = scrollRef.current;
    if (!root) return;

    const pages = root.querySelectorAll<HTMLElement>('[data-page]');
    if (!pages.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (jumpRef.current) return;

        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target instanceof HTMLElement) {
          const page = Number.parseInt(visible.target.dataset.page ?? '1', 10);
          if (!Number.isNaN(page)) onVisiblePageChange(page);
        }
      },
      { root, threshold: [0.35, 0.55, 0.75] }
    );

    pages.forEach((page) => observer.observe(page));
    return () => observer.disconnect();
  }, [numPages, onVisiblePageChange]);

  useEffect(() => {
    const target = scrollRef.current?.querySelector(`#page-${pageNumber}`);
    if (!target) return;

    jumpRef.current = true;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const timer = window.setTimeout(() => {
      jumpRef.current = false;
    }, 450);

    return () => window.clearTimeout(timer);
  }, [pageNumber]);

  const handleLoadSuccess = useCallback(
    ({ numPages: total }: { numPages: number }) => {
      setNumPages(total);
      onNumPages(total);
    },
    [onNumPages]
  );

  if (isLoadingFile) {
    return (
      <div className="pdf-viewer__state">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p>Đang tải tài liệu…</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="pdf-viewer__state pdf-viewer__state--error" role="alert">
        <p>{loadError}</p>
      </div>
    );
  }

  if (!fileSource) return null;

  return (
    <div ref={scrollRef} className="pdf-viewer__scroll pdf-viewer__scroll--content pdf-viewer__scroll--pages">
      <div className="doc-viewer__canvas doc-viewer__canvas--pdf">
        <Document
          file={fileSource}
          loading={
            <div className="pdf-viewer__state">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          }
          onLoadSuccess={handleLoadSuccess}
          onLoadError={() => setLoadError('Không thể đọc file PDF.')}
        >
          {Array.from({ length: numPages }, (_, index) => (
            <LazyPdfPage
              key={index + 1}
              pageNumber={index + 1}
              scale={scale}
              width={pageWidth}
            />
          ))}
        </Document>
      </div>
    </div>
  );
}
