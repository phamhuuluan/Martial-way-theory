/**
 * Ceremonial backdrop — identical geometry in light and dark themes.
 * Color comes from CSS custom properties on `.belt-showcase__stage`.
 */
export function BeltShowcaseBackdrop() {
  return (
    <div className="belt-showcase__backdrop" aria-hidden>
      <svg
        className="belt-showcase__ornament"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="belt-showcase-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="var(--showcase-ornament-stroke)"
              strokeWidth="0.35"
              opacity="0.45"
            />
          </pattern>
        </defs>

        {/* Parchment grid — sacred geometry base */}
        <rect width="800" height="600" fill="url(#belt-showcase-grid)" opacity="0.55" />

        {/* Mandala concentric rings */}
        {[220, 185, 150, 115, 82].map((r) => (
          <circle
            key={r}
            cx="400"
            cy="300"
            r={r}
            fill="none"
            stroke="var(--showcase-ornament-stroke)"
            strokeWidth={r > 180 ? 0.6 : 0.45}
            opacity={r > 180 ? 0.7 : 0.55}
          />
        ))}

        {/* Dashed inner rings — mandala rhythm */}
        <circle
          cx="400"
          cy="300"
          r="132"
          fill="none"
          stroke="var(--showcase-ornament-stroke)"
          strokeWidth="0.4"
          strokeDasharray="3 7"
          opacity="0.5"
        />
        <circle
          cx="400"
          cy="300"
          r="98"
          fill="none"
          stroke="var(--showcase-ornament-stroke)"
          strokeWidth="0.35"
          strokeDasharray="2 6"
          opacity="0.45"
        />

        {/* Eight-fold radial line work */}
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i * Math.PI) / 4;
          const x2 = 400 + Math.cos(angle) * 228;
          const y2 = 300 + Math.sin(angle) * 228;
          return (
            <line
              key={i}
              x1="400"
              y1="300"
              x2={x2}
              y2={y2}
              stroke="var(--showcase-ornament-stroke)"
              strokeWidth="0.35"
              opacity="0.42"
            />
          );
        })}

        {/* Martial seal — rotated square with corner guards */}
        <g transform="translate(400 300) rotate(45)">
          <rect
            x="-62"
            y="-62"
            width="124"
            height="124"
            fill="none"
            stroke="var(--showcase-ornament-stroke)"
            strokeWidth="0.55"
            opacity="0.65"
          />
          <rect
            x="-44"
            y="-44"
            width="88"
            height="88"
            fill="none"
            stroke="var(--showcase-ornament-stroke)"
            strokeWidth="0.4"
            opacity="0.5"
          />
          {[
            [-62, -62],
            [62, -62],
            [62, 62],
            [-62, 62],
          ].map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r="4"
              fill="none"
              stroke="var(--showcase-ornament-stroke)"
              strokeWidth="0.45"
              opacity="0.55"
            />
          ))}
        </g>

        {/* Corner scroll flourishes — certificate frame */}
        {[
          { x: 52, y: 44, sx: 1, sy: 1 },
          { x: 748, y: 44, sx: -1, sy: 1 },
          { x: 52, y: 556, sx: 1, sy: -1 },
          { x: 748, y: 556, sx: -1, sy: -1 },
        ].map(({ x, y, sx, sy }, i) => (
          <g
            key={i}
            transform={`translate(${x} ${y}) scale(${sx} ${sy})`}
            fill="none"
            stroke="var(--showcase-ornament-stroke)"
            strokeWidth="0.55"
            opacity="0.62"
          >
            <path d="M 0 0 L 0 52 M 0 0 L 52 0" />
            <path d="M 8 0 Q 0 0 0 8" strokeWidth="0.4" opacity="0.7" />
            <path d="M 14 0 L 14 14 L 0 14" strokeWidth="0.35" opacity="0.5" />
            <circle cx="22" cy="22" r="2.5" strokeWidth="0.35" opacity="0.45" />
          </g>
        ))}

        {/* Inner frame border — heritage scroll */}
        <rect
          x="36"
          y="28"
          width="728"
          height="544"
          fill="none"
          stroke="var(--showcase-ornament-stroke)"
          strokeWidth="0.65"
          opacity="0.48"
        />
        <rect
          x="44"
          y="36"
          width="712"
          height="528"
          fill="none"
          stroke="var(--showcase-ornament-stroke)"
          strokeWidth="0.35"
          strokeDasharray="6 10"
          opacity="0.38"
        />
      </svg>
    </div>
  );
}
