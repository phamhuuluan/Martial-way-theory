import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Không tìm thấy trang',
};

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-4xl font-bold mb-4">404</h1>
      <p className="text-text-secondary mb-6">Trang không tồn tại trên hành trình này.</p>
      <Link href="/" className="text-unlock hover:underline">
        ← Về trang chủ
      </Link>
    </div>
  );
}
