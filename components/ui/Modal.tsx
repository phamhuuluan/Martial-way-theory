'use client';

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
}

export function Modal({
  open,
  onClose,
  title,
  children,
  className,
  size = 'md',
}: ModalProps) {
  const reduced = useReducedMotion();

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    full: 'max-w-4xl',
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={cn(
              'relative z-10 w-full rounded-[var(--radius-lg)] bg-bg-elevated p-6 shadow-lg',
              sizes[size],
              className
            )}
            initial={reduced ? {} : { opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? {} : { opacity: 0, scale: 0.95, y: 10 }}
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
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
