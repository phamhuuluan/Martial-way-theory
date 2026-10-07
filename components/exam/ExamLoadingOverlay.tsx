interface ExamLoadingOverlayProps {
  message: string;
}

export function ExamLoadingOverlay({ message }: ExamLoadingOverlayProps) {
  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-6 backdrop-blur-[2px]"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex w-full max-w-xs flex-col items-center gap-4 rounded-2xl border border-border/50 bg-bg-primary px-8 py-7 text-center shadow-sm">
        <span
          className="h-9 w-9 rounded-full border-2 border-[color-mix(in_srgb,var(--color-unlock)_28%,transparent)] border-t-[var(--color-unlock)] motion-safe:animate-spin"
          aria-hidden
        />
        <p className="text-sm font-medium text-text-primary">{message}</p>
      </div>
    </div>
  );
}
