'use client';

import { Search } from 'lucide-react';

const fieldClass =
  'min-h-12 w-full rounded-[var(--radius-sm)] border border-border bg-bg-primary py-3 pl-11 pr-4 text-base text-text-primary placeholder:text-text-muted focus:border-unlock focus:outline-none focus:ring-1 focus:ring-unlock/50';

interface SearchTextFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  placeholder: string;
  error?: string;
  autoFocus?: boolean;
  autoComplete?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}

function revealField(target: HTMLElement) {
  window.setTimeout(() => {
    target.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, 300);
}

export function SearchTextField({
  id,
  name,
  label,
  value,
  placeholder,
  error,
  autoFocus,
  autoComplete = 'off',
  onChange,
  onBlur,
}: SearchTextFieldProps) {
  const errorId = `${id}-error`;

  return (
    <label className="block scroll-mb-28 text-left" htmlFor={id}>
      <span className="mb-2 block text-sm font-medium">{label}</span>
      <span className="relative block">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted"
          aria-hidden
        />
        <input
          id={id}
          name={name}
          type="text"
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          enterKeyHint="next"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={fieldClass}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          onFocus={(event) => revealField(event.currentTarget)}
        />
      </span>
      {error && (
        <p id={errorId} className="mt-1 text-sm text-error" role="alert">
          {error}
        </p>
      )}
    </label>
  );
}
