'use client';

import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';

interface ViewerToolbarProps {
  title: string;
  scale: number;
  zoomIndex: number;
  maxZoomIndex: number;
  onClose: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
  showPageNav?: boolean;
  pageNumber?: number;
  numPages?: number;
  pageInput?: string;
  onPageInputChange?: (value: string) => void;
  onPageInputCommit?: () => void;
  onPrevPage?: () => void;
  onNextPage?: () => void;
  pageNavDisabled?: boolean;
}

export function ViewerToolbar({
  title,
  scale,
  zoomIndex,
  maxZoomIndex,
  onClose,
  onZoomIn,
  onZoomOut,
  onToggleFullscreen,
  isFullscreen,
  showPageNav = false,
  pageNumber = 1,
  numPages = 0,
  pageInput = '1',
  onPageInputChange,
  onPageInputCommit,
  onPrevPage,
  onNextPage,
  pageNavDisabled = false,
}: ViewerToolbarProps) {
  return (
    <header className="pdf-viewer__toolbar">
      <div className="pdf-viewer__toolbar-start">
        <button
          type="button"
          className="pdf-viewer__icon-btn"
          onClick={onClose}
          aria-label="Đóng trình đọc"
        >
          <X className="h-5 w-5" />
        </button>
        <p className="pdf-viewer__title">{title}</p>
      </div>

      <div className="pdf-viewer__toolbar-center">
        <button
          type="button"
          className="pdf-viewer__icon-btn"
          onClick={onZoomOut}
          disabled={zoomIndex === 0}
          aria-label="Thu nhỏ"
        >
          <ZoomOut className="h-4 w-4" />
        </button>
        <span className="pdf-viewer__zoom-label">{Math.round(scale * 100)}%</span>
        <button
          type="button"
          className="pdf-viewer__icon-btn"
          onClick={onZoomIn}
          disabled={zoomIndex >= maxZoomIndex}
          aria-label="Phóng to"
        >
          <ZoomIn className="h-4 w-4" />
        </button>

        {showPageNav && (
          <>
            <div className="pdf-viewer__divider" aria-hidden />

            <button
              type="button"
              className="pdf-viewer__icon-btn"
              onClick={onPrevPage}
              disabled={pageNumber <= 1 || pageNavDisabled}
              aria-label="Trang trước"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="pdf-viewer__page-nav">
              <input
                type="text"
                inputMode="numeric"
                className="pdf-viewer__page-input"
                value={pageInput}
                onChange={(e) => onPageInputChange?.(e.target.value)}
                onBlur={onPageInputCommit}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onPageInputCommit?.();
                }}
                aria-label="Số trang"
              />
              <span className="pdf-viewer__page-total">/ {numPages || '—'}</span>
            </div>
            <button
              type="button"
              className="pdf-viewer__icon-btn"
              onClick={onNextPage}
              disabled={pageNumber >= numPages || pageNavDisabled}
              aria-label="Trang sau"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      <div className="pdf-viewer__toolbar-end">
        <button
          type="button"
          className="pdf-viewer__icon-btn"
          onClick={onToggleFullscreen}
          aria-label={isFullscreen ? 'Thoát toàn màn hình' : 'Toàn màn hình'}
        >
          {isFullscreen ? (
            <Minimize className="h-4 w-4" />
          ) : (
            <Maximize className="h-4 w-4" />
          )}
        </button>
      </div>
    </header>
  );
}
