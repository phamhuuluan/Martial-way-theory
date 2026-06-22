import Link from 'next/link';
import { CloudLayer, FogOverlay } from '@/components/animation/CloudLayer';
import { BeltShowcase } from '@/components/belt-showcase/BeltShowcase';
import { HeroAtmosphere } from '@/components/landing/HeroAtmosphere';
import { HeroBeltCard } from '@/components/landing/HeroBeltCard';
import { Button } from '@/components/ui/Button';
import { MartialJourneySlogan } from '@/components/ui/MartialJourneySlogan';
import { SITE } from '@/lib/constants';

function HeroActions() {
  return (
    <>
      <Link href="/journey" className="w-full sm:w-auto lg:w-auto">
        <Button variant="hero" size="lg" className="landing-hero__cta w-full sm:w-auto">
          Bắt đầu hành trình
        </Button>
      </Link>
      <Link href="/world/brown" className="w-full sm:w-auto lg:w-auto">
        <Button variant="secondary" size="lg" className="landing-hero__cta w-full sm:w-auto">
          Xem trước Nâu Đai
        </Button>
      </Link>
    </>
  );
}

export default function LandingPage() {
  return (
    <div className="landing-page relative min-h-screen overflow-x-hidden">
      <CloudLayer />
      <FogOverlay />

      <main className="relative">
        <section className="landing-hero" aria-labelledby="landing-hero-title">
          <HeroAtmosphere />

          <div className="landing-container">
            <div className="landing-hero__grid">
              <div className="landing-hero__copy">
                <div className="landing-hero__logo-wrap">
                  <div className="landing-hero__logo-glow" aria-hidden />
                  <img
                    src="/logo.png"
                    alt={SITE.name}
                    className="landing-hero__logo"
                  />
                </div>

                <p className="page-section-label landing-hero__label">Phật Quang Quyền</p>
                <h1
                  id="landing-hero-title"
                  className="landing-hero__title font-display font-bold text-balance"
                >
                  Hành Trình Lý Thuyết Võ Đạo
                </h1>
                <MartialJourneySlogan className="landing-hero__slogan" />
                <div className="landing-hero__actions landing-hero__actions--desktop">
                  <HeroActions />
                </div>
              </div>

              <div className="landing-hero__belt hidden lg:block">
                <HeroBeltCard />
              </div>

              <div className="landing-hero__actions landing-hero__actions--mobile">
                <HeroActions />
              </div>
            </div>
          </div>
        </section>

        <section
          className="landing-journey"
          aria-labelledby="landing-journey-title"
        >
          <div className="landing-container">
            <header className="landing-journey__header">
              <h2 id="landing-journey-title" className="landing-journey__title landing-journey__title--system font-display">
                HỆ THỐNG ĐẲNG CẤP MÔN PHÁI PHẬT QUANG QUYỀN
              </h2>
            </header>
            <div className="landing-journey__showcase">
              <BeltShowcase />
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
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
