'use client';

import { useState } from 'react';
import { composeBirthDate, splitBirthDate } from '@/lib/candidate-profile';

const fieldClass =
  'min-h-12 w-full rounded-[var(--radius-sm)] border border-border bg-bg-primary px-2 text-center text-base text-text-primary placeholder:text-text-muted focus:border-unlock focus:outline-none focus:ring-1 focus:ring-unlock/50';

interface BirthDateFieldProps {
  id: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}

function digits(value: string, max: number) {
  return value.replace(/\D/g, '').slice(0, max);
}

function revealField(target: HTMLElement) {
  window.setTimeout(() => {
    target.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, 300);
}

export function BirthDateField({ id, value, error, onChange, onBlur }: BirthDateFieldProps) {
  const initial = splitBirthDate(value);
  const [day, setDay] = useState(initial.day);
  const [month, setMonth] = useState(initial.month);
  const [year, setYear] = useState(initial.year);
  const errorId = `${id}-error`;

  const update = (nextDay: string, nextMonth: string, nextYear: string) => {
    setDay(nextDay);
    setMonth(nextMonth);
    setYear(nextYear);
    onChange(composeBirthDate(nextDay, nextMonth, nextYear));
  };

  return (
    <fieldset
      className="scroll-mb-28 text-left"
      onBlur={(event) => {
        const next = event.relatedTarget;
        if (next instanceof Node && event.currentTarget.contains(next)) return;
        onBlur();
      }}
    >
      <legend className="mb-2 text-sm font-medium">Ngày tháng năm sinh</legend>
      <div className="grid grid-cols-3 gap-3">
        <label className="block" htmlFor={`${id}-day`}>
          <span className="mb-1 block text-xs font-medium text-text-secondary">Ngày</span>
          <input
            id={`${id}-day`}
            name="birthDay"
            inputMode="numeric"
            autoComplete="bday-day"
            enterKeyHint="next"
            maxLength={2}
            placeholder="DD"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            className={fieldClass}
            value={day}
            onChange={(event) => update(digits(event.target.value, 2), month, year)}
            onFocus={(event) => revealField(event.currentTarget)}
          />
        </label>
        <label className="block" htmlFor={`${id}-month`}>
          <span className="mb-1 block text-xs font-medium text-text-secondary">Tháng</span>
          <input
            id={`${id}-month`}
            name="birthMonth"
            inputMode="numeric"
            autoComplete="bday-month"
            enterKeyHint="next"
            maxLength={2}
            placeholder="MM"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            className={fieldClass}
            value={month}
            onChange={(event) => update(day, digits(event.target.value, 2), year)}
            onFocus={(event) => revealField(event.currentTarget)}
          />
        </label>
        <label className="block" htmlFor={`${id}-year`}>
          <span className="mb-1 block text-xs font-medium text-text-secondary">Năm</span>
          <input
            id={`${id}-year`}
            name="birthYear"
            inputMode="numeric"
            autoComplete="bday-year"
            enterKeyHint="next"
            maxLength={4}
            placeholder="YYYY"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            className={fieldClass}
            value={year}
            onChange={(event) => update(day, month, digits(event.target.value, 4))}
            onFocus={(event) => revealField(event.currentTarget)}
          />
        </label>
      </div>
      <input type="hidden" name="dateOfBirth" value={value} />
      {error && (
        <p id={errorId} className="mt-1 text-sm text-error" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}
