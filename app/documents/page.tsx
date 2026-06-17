import type { Metadata } from 'next';
import { DocumentsPageClient } from '@/components/profile/DocumentsPageClient';

export const metadata: Metadata = {
  title: 'Tổng Hợp Tài Liệu',
  description: 'Truy cập toàn bộ tài liệu lý thuyết thi thăng cấp Phật Quang Quyền',
};

export default function DocumentsPage() {
  return <DocumentsPageClient />;
}
