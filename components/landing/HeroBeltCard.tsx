import { BELT_RANKS } from '@/lib/belt-ranks';
import { beltThemeStyle } from '@/lib/belt-theme';
import { BeltRankImage } from '@/components/belt-showcase/BeltRankImage';

const HERO_RANK = BELT_RANKS[27];

const INFO_FIELDS = [
  { key: 'fullName', label: 'Trình độ' },
  { key: 'trainingTime', label: 'Thời gian tập luyện' },
  { key: 'danhXung', label: 'Danh xưng' },
  { key: 'capBac', label: 'Cấp bậc' },
] as const;

export function HeroBeltCard() {
  const beltStyle = beltThemeStyle(HERO_RANK.beltWorldId);

  return (
    <div className="landing-hero__belt-stage" style={beltStyle}>
      <div className="landing-hero__belt-glow" aria-hidden />
      <div className="landing-hero__belt-glow landing-hero__belt-glow--secondary" aria-hidden />

      <div className="landing-hero__belt-card belt-card belt-surface">
        <div className="landing-hero__belt-glass" aria-hidden />
        <div className="landing-hero__belt-shine" aria-hidden />
        <div
          className="landing-hero__belt-kanji absolute inset-0 flex items-center justify-center font-serif font-bold text-[var(--belt-title)]"
          style={{ textShadow: 'var(--belt-title-shadow)' }}
          aria-hidden
        >
          武
        </div>
        <div className="landing-hero__belt-info belt-card__content">
          <dl className="landing-hero__belt-info-grid">
            {INFO_FIELDS.map((field) => (
              <div key={field.key} className="landing-hero__belt-info-row">
                <dt className="landing-hero__belt-info-label">{field.label}</dt>
                <dd
                  className="landing-hero__belt-info-value"
                  style={field.key === 'fullName' ? { color: 'var(--belt-title)' } : undefined}
                >
                  {HERO_RANK[field.key]}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="landing-hero__belt-edge landing-hero__belt-edge--top" aria-hidden />
        <div className="landing-hero__belt-edge landing-hero__belt-edge--bottom" aria-hidden />
      </div>

      <div className="landing-hero__belt-floor-shadow" aria-hidden />
    </div>
  );
}
