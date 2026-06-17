'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'hero';
  size?: 'sm' | 'md' | 'lg';
  beltColor?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      beltColor,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const base =
      'inline-flex items-center justify-center font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-unlock/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98] min-h-[44px]';

    const sizes = {
      sm: 'px-3.5 py-2 text-sm rounded-[var(--radius-sm)]',
      md: 'px-5 py-2.5 text-base rounded-[var(--radius-md)]',
      lg: 'px-8 py-3.5 text-lg rounded-[var(--radius-md)]',
    };

    const variants = {
      primary: cn(
        'text-bg-primary shadow-subtle',
        beltColor ? '' : 'bg-gold hover:brightness-110'
      ),
      secondary:
        'border border-border bg-bg-secondary/60 text-text-primary shadow-subtle hover:border-border hover:bg-bg-elevated/80',
      ghost: 'bg-transparent text-text-secondary hover:bg-white/5 hover:text-text-primary',
      hero: cn(
        'font-display shadow-glow text-bg-primary font-bold tracking-wide',
        beltColor ? '' : 'bg-unlock hover:brightness-105',
        disabled && 'cursor-not-allowed opacity-45 saturate-50 shadow-none'
      ),
    };

    const style =
      beltColor && (variant === 'primary' || variant === 'hero')
        ? { backgroundColor: beltColor }
        : undefined;

    return (
      <button
        ref={ref}
        className={cn(base, sizes[size], variants[variant], className)}
        style={style}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
