'use client';

import { memo } from 'react';
import { Page } from 'react-pdf';
import { useInView } from 'react-intersection-observer';

interface LazyPdfPageProps {
  pageNumber: number;
  scale: number;
  width?: number;
}

const A4_RATIO = 1.414;

export const LazyPdfPage = memo(function LazyPdfPage({
  pageNumber,
  scale,
  width,
}: LazyPdfPageProps) {
  const { ref, inView } = useInView({
    rootMargin: '600px 0px',
    triggerOnce: true,
  });

  const placeholderHeight = width ? Math.round(width * scale * A4_RATIO) : 840;

  return (
    <div
      ref={ref}
      id={`page-${pageNumber}`}
      className="pdf-viewer__page-wrap"
      data-page={pageNumber}
    >
      {inView ? (
        <Page
          pageNumber={pageNumber}
          scale={scale}
          width={width}
          renderTextLayer
          renderAnnotationLayer
          className="pdf-viewer__page"
        />
      ) : (
        <div
          className="pdf-viewer__page-placeholder"
          style={{ height: placeholderHeight }}
          aria-hidden
        />
      )}
    </div>
  );
});
