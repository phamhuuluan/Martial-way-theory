'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { Modal } from '@/components/ui/Modal';
import { getBeltById, VIRTUES } from '@/lib/constants';
import { useProgressStore } from '@/store/progress-store';
import { cn } from '@/lib/utils';

const BELT_ORDER = ['brown', 'blue', 'green', 'red', 'yellow', 'white'] as const;

export function BeltCeremony() {
  const progress = useProgressStore((s) => s.progress);
  const clearCeremony = useProgressStore((s) => s.clearCeremony);
  const beltId = progress.pendingCeremony;
  const reduced = useReducedMotion();

  if (!beltId) return null;

  const belt = getBeltById(beltId);
  const beltIndex = BELT_ORDER.indexOf(beltId);
  const nextBelt = BELT_ORDER[beltIndex + 1];

  return (
    <Modal open={!!beltId} onClose={clearCeremony} size="full">
      <div className="flex flex-col items-center py-8 text-center">
        <motion.div
          className={cn(
            'mb-8 flex h-32 w-32 items-center justify-center rounded-full text-4xl shadow-glow',
            `belt-gradient-${beltId}`
          )}
          initial={reduced ? {} : { scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          🥋
        </motion.div>

        <motion.h2
          className="mb-4 font-display text-3xl font-bold"
          initial={reduced ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Một bước trên hành trình võ đạo
        </motion.h2>

        <motion.p
          className="mb-6 max-w-md text-lg text-text-secondary"
          initial={reduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Bạn đã hoàn thành{' '}
          <strong className="text-unlock">{belt.name}</strong>
        </motion.p>

        <motion.div
          className="mb-8 flex flex-wrap justify-center gap-2"
          initial={reduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {belt.virtues.map((v) => (
            <span
              key={v}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm"
            >
              {VIRTUES[v]?.icon} {VIRTUES[v]?.name}
            </span>
          ))}
        </motion.div>

        <Link
          href={nextBelt ? `/world/${nextBelt}` : '/journey'}
          onClick={clearCeremony}
          className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-sm)] bg-unlock px-8 py-4 text-lg font-bold text-bg-primary shadow-glow transition-all hover:brightness-110"
        >
          Tiếp tục hành trình
        </Link>
      </div>
    </Modal>
  );
}
