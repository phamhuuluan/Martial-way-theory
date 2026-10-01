import type { Metadata } from 'next';
import { AdminManagementPage } from '@/components/admin/AdminManagementPage';

export const metadata: Metadata = {
  title: 'Quản trị',
};

export default function PqqManagementPage() {
  return <AdminManagementPage />;
}
