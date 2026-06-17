'use client';

export function CloudLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
      <div
        className="cloud-layer absolute top-[10%] h-24 w-[200%] rounded-full bg-white/10 blur-3xl"
        style={{ animationDelay: '0s' }}
      />
      <div
        className="cloud-layer absolute top-[30%] h-16 w-[180%] rounded-full bg-white/5 blur-2xl"
        style={{ animationDelay: '-25s', animationDuration: '90s' }}
      />
      <div
        className="cloud-layer absolute top-[60%] h-20 w-[160%] rounded-full bg-unlock/5 blur-3xl"
        style={{ animationDelay: '-50s', animationDuration: '100s' }}
      />
    </div>
  );
}

export function FogOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 fog-layer bg-gradient-to-b from-transparent via-unlock/5 to-transparent" />
  );
}
