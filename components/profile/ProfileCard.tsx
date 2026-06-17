'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Pencil, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const nameSchema = z.object({
  name: z.string().min(2).max(50),
});

export interface ProfileCardProps {
  name: string;
  onNameSubmit: (name: string) => void;
  className?: string;
}

export function ProfileCard({
  name,
  onNameSubmit,
  className,
}: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const displayName = name?.trim();
  const initial = displayName?.charAt(0).toUpperCase();

  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(nameSchema),
    defaultValues: { name: name ?? '' },
  });

  useEffect(() => {
    reset({ name: name ?? '' });
  }, [name, reset]);

  useEffect(() => {
    if (!isEditing) return;
    inputRef.current?.focus();
    inputRef.current?.select();
  }, [isEditing]);

  const { ref: registerRef, ...nameField } = register('name');

  const submitName = handleSubmit((data) => {
    onNameSubmit(data.name);
    setIsEditing(false);
  });

  const startEditing = () => {
    reset({ name: name ?? '' });
    setIsEditing(true);
  };

  const cancelEditing = () => {
    reset({ name: name ?? '' });
    setIsEditing(false);
  };

  return (
    <article className={cn('profile-identity', className)}>
      <div className="profile-identity__inner">
        <div className="profile-identity__avatar-wrap">
          <div className="profile-identity__avatar-glow" aria-hidden />
          <div className="profile-identity__avatar">
            {initial ? (
              <span className="profile-identity__initial font-display">{initial}</span>
            ) : (
              <User className="profile-identity__avatar-icon" strokeWidth={1.5} />
            )}
          </div>
        </div>

        <div className="profile-identity__details">
          {isEditing ? (
            <form onSubmit={submitName} className="profile-identity__form">
              <input
                id="profile-name"
                {...nameField}
                ref={(el) => {
                  registerRef(el);
                  inputRef.current = el;
                }}
                onBlur={() => {
                  void submitName();
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    e.preventDefault();
                    cancelEditing();
                  }
                }}
                className="profile-identity__name-input font-display"
                placeholder="Tên võ sinh/môn sinh"
                aria-label="Tên võ sinh/môn sinh"
              />
            </form>
          ) : (
            <button
              type="button"
              className="profile-identity__name-display"
              onClick={startEditing}
              aria-label="Chỉnh sửa võ sinh/môn sinh"
            >
              <span
                className={cn(
                  'profile-identity__name font-display',
                  !displayName && 'profile-identity__name--placeholder'
                )}
              >
                {displayName || ''}
              </span>
              <Pencil className="profile-identity__edit-icon" aria-hidden />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
