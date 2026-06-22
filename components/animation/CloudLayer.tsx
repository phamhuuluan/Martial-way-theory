'use client';

export function CloudLayer() {
  return (
    <div className="cloud-layer-wrap pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="cloud-layer cloud-layer--primary absolute top-[8%] h-28 w-[220%] rounded-full blur-3xl"
        style={{ animationDelay: '0s' }}
      />
      <div
        className="cloud-layer cloud-layer--secondary absolute top-[28%] h-20 w-[190%] rounded-full blur-2xl"
        style={{ animationDelay: '-25s', animationDuration: '90s' }}
      />
      <div
        className="cloud-layer cloud-layer--accent absolute top-[58%] h-24 w-[170%] rounded-full blur-3xl"
        style={{ animationDelay: '-50s', animationDuration: '100s' }}
      />
      <div className="cloud-layer-wrap__mist absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[rgb(20_14_8/0.35)] to-transparent" />
    </div>
  );
}

export function FogOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 fog-layer fog-overlay bg-gradient-to-b from-transparent via-[rgb(212_175_55/0.04)] to-transparent" />
  );
}
