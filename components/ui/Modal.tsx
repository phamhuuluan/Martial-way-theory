'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
  /** Bottom sheet on small screens. Other dialogs keep the centered layout. */
  sheet?: boolean;
}

function useKeyboardInset(enabled: boolean) {
  const [inset, setInset] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    const viewport = window.visualViewport;
    if (!viewport) return;

    const update = () => {
      const covered = Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop);
      setInset(Math.round(covered));
    };

    update();
    viewport.addEventListener('resize', update);
    viewport.addEventListener('scroll', update);
    return () => {
      viewport.removeEventListener('resize', update);
      viewport.removeEventListener('scroll', update);
    };
  }, [enabled]);

  return enabled ? inset : 0;
}

export function Modal({
  open,
  onClose,
  title,
  children,
  className,
  size = 'md',
  sheet = false,
}: ModalProps) {
  const reduced = useReducedMotion();
  const keyboardInset = useKeyboardInset(open && sheet);

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    full: 'max-w-4xl',
  };

  return (
    <AnimatePresence>
      {open && (
        <div
          className={cn(
            'fixed inset-0 z-50 flex justify-center',
            sheet ? 'items-end sm:items-center sm:p-4' : 'items-center p-4'
          )}
        >
          <motion.div
            className="absolute inset-0 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={cn(
              'relative z-10 w-full bg-bg-elevated shadow-lg',
              sheet
                ? 'flex max-h-[100dvh] min-h-0 flex-col overflow-hidden rounded-t-[var(--radius-lg)] p-0 sm:max-h-[min(90dvh,40rem)] sm:rounded-[var(--radius-lg)]'
                : 'rounded-[var(--radius-lg)] p-6',
              sizes[size],
              className
            )}
            style={
              sheet && keyboardInset > 0
                ? { marginBottom: keyboardInset, maxHeight: `calc(100dvh - ${keyboardInset}px)` }
                : undefined
            }
            initial={reduced ? {} : sheet ? { opacity: 0, y: 24 } : { opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? {} : sheet ? { opacity: 0, y: 24 } : { opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            {title && (
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold">{title}</h2>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 hover:bg-white/5"
                  aria-label="Đóng"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
            {sheet ? (
              <div className="flex max-h-full min-h-0 flex-col overflow-hidden">{children}</div>
            ) : (
              children
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
