'use client';

import { useEffect, useState } from 'react';
import mammoth from 'mammoth';
import { Loader2 } from 'lucide-react';
import {
  fetchDocumentBlob,
  getCachedBlob,
} from '@/lib/document-cache';
import type { LearningDocument } from '@/lib/documents';
import { formatDocxHtml } from '@/lib/format-docx-html';

interface DocxViewerContentProps {
  document: LearningDocument;
  scale: number;
}

export function DocxViewerContent({ document: doc, scale }: DocxViewerContentProps) {
  const [html, setHtml] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadDocx() {
      setIsLoading(true);
      setLoadError(null);

      try {
        const cached = getCachedBlob(doc.url);
        const blob = cached ?? (await fetchDocumentBlob(doc.url));
        if (cancelled) return;

        const arrayBuffer = await blob.arrayBuffer();
        const result = await mammoth.convertToHtml(
          { arrayBuffer },
          { includeDefaultStyleMap: true }
        );

        if (!cancelled) {
          setHtml(formatDocxHtml(result.value));
        }
      } catch {
        if (!cancelled) {
          setLoadError('Không thể mở tài liệu. Vui lòng thử tải xuống.');
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void loadDocx();

    return () => {
      cancelled = true;
    };
  }, [doc.url]);

  if (isLoading) {
    return (
      <div className="pdf-viewer__state">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p>Đang mở tài liệu…</p>
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

  if (!html) return null;

  return (
    <div className="pdf-viewer__scroll pdf-viewer__scroll--content">
      <div
        className="doc-viewer__canvas"
        style={{
          width: `${Math.round(scale * 100)}%`,
          maxWidth: `${Math.round(48 * scale)}rem`,
        }}
      >
        <article
          className="doc-viewer__docx"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
