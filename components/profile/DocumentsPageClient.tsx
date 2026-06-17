'use client';

import { DocumentLibrary } from '@/components/profile/DocumentLibrary';
import { LEARNING_DOCUMENTS } from '@/lib/documents';

export function DocumentsPageClient() {
  return (
    <div className="documents-page profile-page relative min-h-screen px-4 py-8 lg:px-10 lg:py-10">
      <div className="relative mx-auto max-w-4xl">
        <header className="documents-page__header mb-8">
          <h1 className="documents-page__title font-display text-[1.75rem] font-bold uppercase sm:text-[2.125rem]">
            Tổng Hợp Tài Liệu
          </h1>
          <p className="documents-page__intro">
            {LEARNING_DOCUMENTS.length} tài liệu lý thuyết võ đạo — bấm Xem để đọc ngay trong ứng dụng.
          </p>
        </header>

        <DocumentLibrary variant="page" />
      </div>
    </div>
  );
}
