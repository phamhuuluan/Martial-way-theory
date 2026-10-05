'use client';

import { useEffect, useRef } from 'react';
import { applyPointerLeave } from '@/lib/official-exam';

function pointerInside(zone: HTMLElement, x: number, y: number): boolean {
  const rect = zone.getBoundingClientRect();
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

/**
 * Đếm số lần chuột rời vùng an toàn. Tạm dừng khi cảnh báo đang mở
 * để thao tác trên hộp thoại không bị tính thêm một lần rời.
 */
export function useExamPointerGuard(
  zone: HTMLElement | null,
  enabled: boolean,
  onWarn: (strike: number) => void,
  onExit: () => void
): void {
  const strikesRef = useRef(0);
  const insideRef = useRef(false);
  const onWarnRef = useRef(onWarn);
  const onExitRef = useRef(onExit);
  onWarnRef.current = onWarn;
  onExitRef.current = onExit;

  useEffect(() => {
    if (!enabled || !zone) return;

    insideRef.current = false;
    let closed = false;

    const registerLeave = () => {
      if (!insideRef.current || closed) return;
      insideRef.current = false;
      const next = applyPointerLeave(strikesRef.current);
      strikesRef.current = next.strikes;
      if (next.action === 'exit') {
        closed = true;
        onExitRef.current();
        return;
      }
      onWarnRef.current(next.strikes);
    };

    const onMouseMove = (event: MouseEvent) => {
      const nowInside = pointerInside(zone, event.clientX, event.clientY);
      if (insideRef.current && !nowInside) {
        registerLeave();
        return;
      }
      insideRef.current = nowInside;
    };

    const onMouseOut = (event: MouseEvent) => {
      if (event.relatedTarget !== null) return;
      registerLeave();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseout', onMouseOut);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, [enabled, zone]);
}
