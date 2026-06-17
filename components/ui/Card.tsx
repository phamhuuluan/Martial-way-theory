import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'lesson' | 'world' | 'achievement';
  beltAccent?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function Card({
  children,
  className,
  variant = 'default',
  beltAccent,
  style,
  onClick,
}: CardProps) {
  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      onClick={onClick}
      className={cn(
        'rounded-[var(--radius-lg)] border border-border/50 bg-bg-secondary shadow-card',
        variant === 'default' && 'p-5',
        variant === 'lesson' && 'border-l-[3px] text-left w-full',
        variant === 'world' && 'overflow-hidden',
        variant === 'achievement' && 'p-5 text-center',
        onClick && 'cursor-pointer transition-all duration-200 hover:shadow-elevated hover:border-border',
        className
      )}
      style={{
        ...(variant === 'lesson' && beltAccent
          ? { borderLeftColor: beltAccent }
          : undefined),
        ...style,
      }}
    >
      {children}
    </Component>
  );
}
