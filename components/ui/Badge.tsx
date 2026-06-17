import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'virtue' | 'belt' | 'success' | 'locked';
  className?: string;
  color?: string;
}

export function Badge({
  children,
  variant = 'default',
  className,
  color,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
        variant === 'default' && 'bg-bg-elevated text-text-secondary',
        variant === 'virtue' &&
          'border border-border/60 bg-bg-elevated/80 text-text-primary',
        variant === 'belt' && 'text-bg-primary shadow-subtle',
        variant === 'success' && 'bg-success/15 text-success border border-success/20',
        variant === 'locked' && 'bg-bg-elevated text-text-muted border border-border/40',
        className
      )}
      style={color && variant === 'belt' ? { backgroundColor: color } : undefined}
    >
      {children}
    </span>
  );
}
