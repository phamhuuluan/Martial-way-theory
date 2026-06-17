import Link from 'next/link';
import { CloudLayer, FogOverlay } from '@/components/animation/CloudLayer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { MartialJourneySlogan } from '@/components/ui/MartialJourneySlogan';
import { BELT_SYSTEM_LABEL, BELT_WORLDS, SITE } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <CloudLayer />
      <FogOverlay />

      <section className="relative flex min-h-[85vh] flex-col items-center justify-center px-4 py-16 text-center lg:flex-row lg:justify-between lg:px-16 lg:text-left">
        <div className="max-w-xl">
          <img
            src="/logo.jpg"
            alt={SITE.name}
            className="mx-auto mb-6 h-24 w-24 rounded-full shadow-glow ring-2 ring-unlock/20 lg:mx-0"
          />
          <p className="page-section-label mb-3 lg:text-left">Phật Quang Quyền</p>
          <h1 className="font-display text-3xl font-bold leading-tight text-balance sm:text-4xl lg:text-5xl">
            Hành Trình Lý Thuyết Võ Đạo
          </h1>
          <MartialJourneySlogan className="mt-4 text-base lg:text-lg" />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link href="/journey">
              <Button variant="hero" size="lg" className="w-full sm:w-auto">
                Bắt đầu hành trình
              </Button>
            </Link>
            <Link href="/world/brown">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Xem trước Nâu Đai
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-12 hidden lg:block lg:mt-0">
          <div className="relative h-80 w-96 overflow-hidden rounded-[var(--radius-xl)] belt-gradient-brown shadow-elevated">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div
                    className="
                      absolute inset-0 
                      flex items-center justify-center
                      font-serif text-[110px]
                      font-bold
                      text-amber-200/40
                      drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]
                      [text-shadow:0_0_20px_rgba(251,191,36,0.35)]
                    "
                  >
                武
              </div>
            <div className="absolute inset-x-0 bottom-0 p-6 text-left">
              <p className="font-display text-xl font-semibold text-white">
                Nâu Đai
              </p>
              <p className="mt-1 text-sm text-white/75">
                Giản dị – Bền bỉ – Khiêm cung
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-16 lg:px-16">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            {BELT_SYSTEM_LABEL}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-text-secondary">
          Học lý thuyết qua hệ thống 6 màu đai — từng bài, từng cấp, từng đức tính trên con đường võ đạo.
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-6xl gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible">
          {BELT_WORLDS.map((belt) => (
            <Link
              key={belt.id}
              href={`/world/${belt.id}`}
              className="group shrink-0 w-52 lg:w-auto"
            >
              <Card
                variant="world"
                className={cn(
                  'belt-card h-full min-h-[168px] p-0 transition-transform duration-300 group-hover:-translate-y-1',
                  belt.lightMode && 'belt-card--light',
                  `belt-gradient-${belt.id}`
                )}
              >
                <div className="belt-card__content flex h-full min-h-[168px] flex-col justify-end p-5">
                  <h3 className="belt-card__title font-display text-lg font-bold">
                    {belt.name}
                  </h3>
                  <p className="belt-card__meta mt-1 text-sm leading-snug">
                    {belt.scene}
                  </p>
                  <p className="belt-card__muted mt-3 text-xs">
                    {belt.totalLessons} bài học
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <footer className="relative border-t border-border px-4 py-10 text-center text-sm text-text-muted">
        <p>
          {SITE.name} © {new Date().getFullYear()} ·{' '}
          <Link href="/about" className="text-text-secondary transition-colors hover:text-unlock">
            Giới thiệu
          </Link>
        </p>
      </footer>
    </div>
  );
}
