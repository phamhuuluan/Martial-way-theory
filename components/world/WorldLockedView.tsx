'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, Lock, ScrollText } from 'lucide-react';
import { CloudLayer } from '@/components/animation/CloudLayer';
import type { BeltWorld } from '@/types';
import { VIRTUES } from '@/lib/constants';
import { getPreviousBelt } from '@/lib/world-helpers';
import { WorldArtwork } from '@/components/journey/WorldArtwork';
import { cn } from '@/lib/utils';

interface WorldLockedViewProps {
  world: BeltWorld;
}

export function WorldLockedView({ world }: WorldLockedViewProps) {
  const prevBelt = getPreviousBelt(world.id);
  const reduced = useReducedMotion();

  return (
    <div
      className={cn(
        'world-page world-page--locked relative min-h-screen overflow-hidden px-4 py-8 lg:px-10',
        world.lightMode && 'world-page--light-surface'
      )}
    >
      <div className="world-page__ambient" aria-hidden />
      <CloudLayer />

      <div className="relative mx-auto max-w-4xl">
        <motion.div
          className="world-locked"
          initial={reduced ? {} : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="world-locked__preview">
            <WorldArtwork
              beltId={world.id}
              variant="card"
              dimmed
              priority
              className="h-full w-full brightness-[0.6] saturate-[0.7]"
            />
            <div className="world-locked__preview-overlay" />
            <div className="world-locked__preview-content">
              <div className="world-locked__icon-wrap">
                <Lock className="h-6 w-6 text-text-muted" strokeWidth={1.75} />
              </div>
              <p className="world-academy-header__eyebrow justify-center">
                <ScrollText className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
                Kệ sách chưa mở
              </p>
              <h1 className="font-display text-2xl font-bold sm:text-3xl">{world.name}</h1>
              <p className="mt-2 max-w-md text-sm text-text-secondary">{world.scene}</p>
            </div>
          </div>

          <div className="world-locked__body">
            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {world.virtues.map((v) => (
                <span key={v} className="world-academy-header__virtue">
                  {VIRTUES[v]?.icon} {VIRTUES[v]?.name}
                </span>
              ))}
            </div>

            <p className="mx-auto mb-8 max-w-lg text-center text-sm leading-relaxed text-text-secondary">
              {prevBelt ? (
                <>
                  Hoàn thành chương trình <strong className="text-text-primary">{prevBelt.name}</strong>{' '}
                  để mở thư viện bài giảng này.
                </>
              ) : (
                <>Thư viện bài giảng này chưa được mở khóa.</>
              )}
            </p>

            <div className="flex justify-center">
              <Link href="/journey" className="world-cta-primary">
                <ArrowLeft className="h-4 w-4" strokeWidth={2} />
                Quay lại Hành trình
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
