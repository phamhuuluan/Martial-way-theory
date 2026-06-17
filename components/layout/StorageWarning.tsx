'use client';

import { useProgressStore } from '@/store/progress-store';
import { isUsingMemoryFallback } from '@/lib/storage';
import { useEffect, useState } from 'react';

export function StorageWarning() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(isUsingMemoryFallback());
  }, []);

  if (!show) return null;

  return (
    <div className="bg-warning/20 border-b border-warning/30 px-4 py-2 text-center text-sm text-warning">
      Trình duyệt không lưu được tiến độ. Tiến độ chỉ tồn tại trong phiên này — hãy sao lưu thường xuyên.
    </div>
  );
}
