'use client';

import { forwardRef } from 'react';
import { formatDate } from '@/lib/utils';

interface CertificateTemplateProps {
  studentName: string;
  beltName: string;
  completedAt: string;
  type: 'belt' | 'master';
}

export const CertificateTemplate = forwardRef<HTMLDivElement, CertificateTemplateProps>(
  function CertificateTemplate({ studentName, beltName, completedAt, type }, ref) {
    return (
      <div
        ref={ref}
        className="relative mx-auto aspect-[800/560] w-full max-w-2xl overflow-hidden rounded-lg border-4 border-unlock/50 bg-bg-secondary p-8 text-center"
        style={{ width: 800, height: 560 }}
      >
        <div className="absolute inset-4 border border-unlock/20 rounded" />
        <img
          src="/logo.png"
          alt="PQQ"
          className="mx-auto mb-4 h-16 w-16 rounded-full"
          crossOrigin="anonymous"
        />
        <h2 className="font-display text-2xl font-bold text-unlock mb-2">
          CHỨNG NHẬN ÔN TẬP LÝ THUYẾT
        </h2>
        <p className="text-sm text-text-secondary mb-6">
          Phật Quang Quyền — Hành Trình Lý Thuyết Võ Đạo
        </p>
        <p className="text-text-secondary mb-2">Chứng nhận rằng</p>
        <p className="font-display text-3xl font-bold text-text-primary mb-4">
          {studentName || 'Môn sinh'}
        </p>
        <p className="text-text-secondary mb-2">
          {type === 'master'
            ? 'đã ôn tập trọn bộ lý thuyết theo hệ thống 6 màu đai'
            : 'đã ôn tập lý thuyết cấp'}
        </p>
        <p className="font-display text-xl font-semibold text-unlock mb-6">
          {beltName}
        </p>
        <p className="text-sm text-text-muted">
          Ngày ghi nhận: {formatDate(completedAt)}
        </p>
        <div className="absolute bottom-8 left-0 right-0 flex justify-around px-16">
          <div className="text-center">
            <div className="mb-2 h-px w-32 bg-text-muted" />
            <p className="text-xs text-text-muted">HLV/Võ Sư Phụ Trách</p>
          </div>
          <div className="text-center">
            <div className="mb-2 h-px w-32 bg-text-muted" />
            <p className="text-xs text-text-muted">Trưởng Ban Võ Đạo</p>
          </div>
        </div>
      </div>
    );
  }
);
