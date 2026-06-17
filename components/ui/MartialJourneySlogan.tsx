import { MARTIAL_JOURNEY_SLOGAN } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface MartialJourneySloganProps {
  className?: string;
}

export function MartialJourneySlogan({ className }: MartialJourneySloganProps) {
  return (
    <p
      className={cn(
        'font-display text-sm uppercase tracking-[0.18em] leading-relaxed text-text-secondary',
        className
      )}
    >
      {MARTIAL_JOURNEY_SLOGAN.line1}
      <br />
      {MARTIAL_JOURNEY_SLOGAN.line2}
    </p>
  );
}
