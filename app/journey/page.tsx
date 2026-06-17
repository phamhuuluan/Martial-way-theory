import type { Metadata } from 'next';
import { JourneyMap } from '@/components/journey/JourneyMap';
import { JourneySummaryStrip } from '@/components/journey/JourneySummaryStrip';
import { CloudLayer } from '@/components/animation/CloudLayer';
import { BELT_SYSTEM_LABEL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Hành Trình Võ Đạo',
  description: `Bản đồ ${BELT_SYSTEM_LABEL} — hành trình lý thuyết Phật Quang Quyền`,
};

export default function JourneyPage() {
  return (
    <div className="relative min-h-screen px-4 py-8 lg:px-10">
      <CloudLayer />
      <div className="relative mx-auto max-w-4xl">
        <header className="journey-page-header mb-6 text-left">
          <h1 className="font-display text-2xl font-bold tracking-[0.18em] text-unlock sm:text-3xl">
            HÀNH TRÌNH
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-secondary">
            Rèn luyện võ đạo – Tu dưỡng tâm tính – Hoàn thiện bản thân
          </p>
        </header>

        <JourneySummaryStrip />
        <JourneyMap />
      </div>
    </div>
  );
}
