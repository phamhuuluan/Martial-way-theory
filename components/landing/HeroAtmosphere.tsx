'use client';

export function HeroAtmosphere() {
  return (
    <div className="landing-hero__atmosphere" aria-hidden>
      <div className="landing-hero__atmosphere-base" />
      <div className="landing-hero__atmosphere-radial landing-hero__atmosphere-radial--center" />
      <div className="landing-hero__atmosphere-radial landing-hero__atmosphere-radial--left" />
      <div className="landing-hero__atmosphere-radial landing-hero__atmosphere-radial--right" />
      <div className="landing-hero__atmosphere-gold" />
      <div className="landing-hero__atmosphere-warm" />
      <div className="landing-hero__atmosphere-paper" />
      <div className="landing-hero__atmosphere-fog" />
      <div className="landing-hero__atmosphere-vignette" />
      <div className="landing-hero__atmosphere-rays" />
    </div>
  );
}
