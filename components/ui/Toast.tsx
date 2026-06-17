'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  open: boolean;
  message: string;
  onClose: () => void;
  duration?: number;
}

export function Toast({ open, message, onClose, duration = 3500 }: ToastProps) {
  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [open, duration, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="status"
          aria-live="polite"
          className="fixed bottom-36 left-1/2 z-50 flex max-w-sm -translate-x-1/2 items-center gap-2 rounded-[var(--radius-md)] border border-success/30 bg-bg-elevated px-4 py-3 text-sm text-text-primary shadow-lg lg:bottom-24"
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.25 }}
        >
          <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
