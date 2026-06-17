import type { AchievementTier } from '@/types';
import { cn } from '@/lib/utils';

interface AchievementBadgeFrameProps {
  tier: AchievementTier;
  gradientId: string;
  className?: string;
}

function starPoints(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  points = 8
): string {
  const coords: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (Math.PI / points) * i - Math.PI / 2;
    coords.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
  }
  return coords.join(' ');
}

const GRADIENT_STOPS: Record<
  AchievementTier,
  { light: string; mid: string; dark: string }
> = {
  gold: { light: '#9a8468', mid: '#7a6348', dark: '#4a3828' },
  learning: { light: '#6a7a9a', mid: '#4a5888', dark: '#2a3058' },
  powerful: { light: '#9a6860', mid: '#804840', dark: '#502820' },
};

function FrameGradient({
  id,
  tier,
}: {
  id: string;
  tier: AchievementTier;
}) {
  const stops = GRADIENT_STOPS[tier];
  return (
    <linearGradient id={id} x1="8%" y1="6%" x2="92%" y2="94%">
      <stop offset="0%" stopColor={stops.light} />
      <stop offset="48%" stopColor={stops.mid} />
      <stop offset="100%" stopColor={stops.dark} />
    </linearGradient>
  );
}

/** Traditional seal ring — gold / mastery tier */
function SealFrame({ gradientId, className }: { gradientId: string; className?: string }) {
  const stroke = `url(#${gradientId})`;

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <FrameGradient id={gradientId} tier="gold" />
      </defs>
      <circle cx="50" cy="50" r="44" fill="none" stroke={stroke} strokeWidth="2" opacity="0.72" />
      <circle cx="50" cy="50" r="40" fill="none" stroke={stroke} strokeWidth="0.9" opacity="0.35" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((rot) => (
        <g key={rot} transform={`rotate(${rot} 50 50)`}>
          <line
            x1="50"
            y1="4"
            x2="50"
            y2="9.5"
            stroke={stroke}
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.4"
          />
        </g>
      ))}
      {[0, 90, 180, 270].map((rot) => (
        <g key={`d-${rot}`} transform={`rotate(${rot} 50 50)`}>
          <rect
            x="48.25"
            y="1.5"
            width="3.5"
            height="3.5"
            rx="0.4"
            fill={stroke}
            opacity="0.28"
          />
        </g>
      ))}
    </svg>
  );
}

/** Hexagon martial emblem — learning tier */
function HexagonFrame({ gradientId, className }: { gradientId: string; className?: string }) {
  const stroke = `url(#${gradientId})`;

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <FrameGradient id={gradientId} tier="learning" />
      </defs>
      <polygon
        points="50,4 92,26 92,74 50,96 8,74 8,26"
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeLinejoin="round"
        opacity="0.72"
      />
      <polygon
        points="50,10 86,30 86,70 50,90 14,70 14,30"
        fill="none"
        stroke={stroke}
        strokeWidth="0.9"
        strokeLinejoin="round"
        opacity="0.32"
      />
      {[0, 60, 120, 180, 240, 300].map((rot) => (
        <g key={rot} transform={`rotate(${rot} 50 50)`}>
          <line
            x1="50"
            y1="10"
            x2="50"
            y2="14"
            stroke={stroke}
            strokeWidth="1.1"
            strokeLinecap="round"
            opacity="0.35"
          />
        </g>
      ))}
    </svg>
  );
}

/** Eight-point star badge — powerful tier */
function StarFrame({ gradientId, className }: { gradientId: string; className?: string }) {
  const stroke = `url(#${gradientId})`;

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <FrameGradient id={gradientId} tier="powerful" />
      </defs>
      <polygon
        points={starPoints(50, 50, 44, 31)}
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeLinejoin="round"
        opacity="0.72"
      />
    </svg>
  );
}

export function AchievementBadgeFrame({
  tier,
  gradientId,
  className,
}: AchievementBadgeFrameProps) {
  if (tier === 'learning') {
    return <HexagonFrame gradientId={gradientId} className={className} />;
  }
  if (tier === 'powerful') {
    return <StarFrame gradientId={gradientId} className={className} />;
  }
  return <SealFrame gradientId={gradientId} className={className} />;
}

export function AchievementBadgeFrameShell({
  tier,
  earned,
  gradientId,
  badgeSizeClass,
  charSizeClass,
  character,
  className,
}: {
  tier: AchievementTier;
  earned: boolean;
  gradientId: string;
  badgeSizeClass: string;
  charSizeClass: string;
  character: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'achievement-badge relative flex shrink-0 items-center justify-center overflow-hidden',
        badgeSizeClass,
        `achievement-badge--${tier}`,
        earned ? 'achievement-badge--earned' : 'achievement-badge--locked',
        className
      )}
    >
      <div className="achievement-badge__decor pointer-events-none absolute inset-0 z-0" aria-hidden>
        <AchievementBadgeFrame
          tier={tier}
          gradientId={gradientId}
          className="achievement-badge__frame absolute inset-0 h-full w-full"
        />
        <div className="achievement-badge__emboss absolute inset-[8%] rounded-full" />
        <div className="achievement-badge__glow absolute inset-[6%] rounded-full" />
      </div>

      {earned && (
        <div className="achievement-badge__shine pointer-events-none absolute inset-0 z-[1]" aria-hidden />
      )}

      <span
        className={cn(
          'achievement-character relative z-[2] inline-block font-serif font-bold leading-none',
          charSizeClass,
          `achievement-character--${tier}`,
          !earned && 'achievement-character--locked'
        )}
        aria-hidden
      >
        <span className="achievement-character__outline" aria-hidden>
          {character}
        </span>
        <span className="achievement-character__fill">{character}</span>
      </span>
    </div>
  );
}
