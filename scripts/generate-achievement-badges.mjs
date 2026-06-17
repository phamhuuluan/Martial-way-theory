#!/usr/bin/env node
/**
 * Generates cinematic martial-arts achievement badge SVGs.
 * Art direction: fantasy wuxia, premium collectible medallions, Journey palette.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { Resvg } from '@resvg/resvg-js';

const outDir = join(process.cwd(), 'assets', 'illustrations', 'achievements');
mkdirSync(outDir, { recursive: true });

const GOLD = '#c4a35a';
const GOLD_LIGHT = '#e8d4a0';
const GOLD_DEEP = '#8a7040';

function shell({ label, accent = GOLD, bgTop, bgBottom, scene }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" fill="none" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="bg" x1="100" y1="0" x2="100" y2="240" gradientUnits="userSpaceOnUse">
      <stop stop-color="${bgTop}"/>
      <stop offset="1" stop-color="${bgBottom}"/>
    </linearGradient>
    <radialGradient id="spot" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(100 108) rotate(90) scale(95 78)">
      <stop stop-color="${accent}" stop-opacity="0.14"/>
      <stop offset="0.55" stop-color="${accent}" stop-opacity="0.04"/>
      <stop offset="1" stop-color="${bgBottom}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="frame" x1="100" y1="36" x2="100" y2="196" gradientUnits="userSpaceOnUse">
      <stop stop-color="${GOLD_LIGHT}" stop-opacity="0.55"/>
      <stop offset="0.5" stop-color="${GOLD}" stop-opacity="0.35"/>
      <stop offset="1" stop-color="${GOLD_DEEP}" stop-opacity="0.45"/>
    </linearGradient>
    <linearGradient id="frameInner" x1="100" y1="48" x2="100" y2="184" gradientUnits="userSpaceOnUse">
      <stop stop-color="${bgTop}" stop-opacity="0.15"/>
      <stop offset="1" stop-color="${bgBottom}" stop-opacity="0.55"/>
    </linearGradient>
    <filter id="mist" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6"/>
    </filter>
    <filter id="soft" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="2.5"/>
    </filter>
    <clipPath id="medallion">
      <path d="M100 42 L148 62 L158 108 L148 154 L100 174 L52 154 L42 108 L52 62 Z"/>
    </clipPath>
  </defs>

  <rect width="200" height="240" fill="url(#bg)"/>
  <ellipse cx="100" cy="118" rx="92" ry="88" fill="url(#spot)"/>

  <!-- Ornate martial medallion frame -->
  <path d="M100 38 L152 60 L164 108 L152 156 L100 178 L48 156 L36 108 L48 60 Z" stroke="url(#frame)" stroke-width="2.25" stroke-linejoin="round"/>
  <path d="M100 44 L148 64 L158 108 L148 152 L100 172 L52 152 L42 108 L52 64 Z" stroke="${accent}" stroke-opacity="0.18" stroke-width="1"/>
  <path d="M100 48 L144 66 L152 108 L144 150 L100 168 L56 150 L48 108 L56 66 Z" fill="url(#frameInner)"/>

  <!-- Corner ornaments -->
  <g stroke="${GOLD}" stroke-opacity="0.35" stroke-width="1" fill="none">
    <path d="M100 44 L104 52 L96 52 Z"/>
    <path d="M148 64 L140 68 L140 60 Z"/>
    <path d="M152 108 L144 104 L144 112 Z"/>
    <path d="M100 168 L96 160 L104 160 Z"/>
    <path d="M52 152 L60 148 L60 156 Z"/>
    <path d="M48 108 L56 112 L56 104 Z"/>
    <path d="M52 64 L60 68 L60 60 Z"/>
  </g>

  <g clip-path="url(#medallion)">
    ${scene}
  </g>

  <!-- Atmospheric foreground mist -->
  <path d="M0 188 C34 172 66 182 100 176 C134 170 166 180 200 168 V240 H0 Z" fill="${bgBottom}" fill-opacity="0.85"/>
  <ellipse cx="100" cy="182" rx="78" ry="18" fill="${accent}" fill-opacity="0.08" filter="url(#mist)"/>
</svg>`;
}

const badges = {
  'first-step': shell({
    label: 'Bước chân đầu tiên',
    accent: '#c4a35a',
    bgTop: '#2a2318',
    bgBottom: '#12100c',
    scene: `
    <rect x="0" y="0" width="200" height="200" fill="#1e1810"/>
    <ellipse cx="100" cy="58" rx="62" ry="28" fill="#d4af37" fill-opacity="0.16"/>
    <circle cx="132" cy="46" r="16" fill="#f0d890" fill-opacity="0.22"/>
    <path d="M28 148 C48 132 72 138 100 128 C128 118 152 124 172 112" stroke="#5c4a36" stroke-width="7" stroke-linecap="round"/>
    <path d="M38 142 C56 128 78 134 100 126 C122 118 144 124 162 114" stroke="#8a7355" stroke-width="4" stroke-linecap="round"/>
    <path d="M54 136 C68 126 84 130 100 124 C116 118 132 122 146 114" stroke="#c4a35a" stroke-opacity="0.45" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M62 92 C72 78 88 72 100 76 C112 80 126 74 136 62" stroke="#7a6a55" stroke-opacity="0.55" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M78 88 L82 72 L86 88 Z" fill="#5a4838" fill-opacity="0.65"/>
    <path d="M114 84 L118 68 L122 84 Z" fill="#5a4838" fill-opacity="0.55"/>
    <ellipse cx="96" cy="132" rx="11" ry="6" fill="#c4a35a" fill-opacity="0.35"/>
    <path d="M90 132 C92 124 96 120 100 124 C104 128 102 134 98 136" stroke="#e8dcc8" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M88 124 L92 118 L96 124" stroke="#d4af37" stroke-opacity="0.5" stroke-width="1" stroke-linecap="round"/>`,
  }),

  perseverance: shell({
    label: 'Bền bỉ',
    accent: '#8a9aa8',
    bgTop: '#1e2428',
    bgBottom: '#0e1216',
    scene: `
    <rect x="0" y="0" width="200" height="200" fill="#141a1e"/>
    <path d="M16 156 L54 88 L88 118 L118 68 L154 112 L184 92 V156 H16 Z" fill="#3a4850" fill-opacity="0.85"/>
    <path d="M16 156 L54 88 L88 118 L118 68 L154 112 L184 92" stroke="#9aacb8" stroke-opacity="0.4" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M34 148 L58 108 L78 124 L98 98 L118 118 L142 96" stroke="#c4a35a" stroke-opacity="0.35" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="3 5"/>
    <path d="M88 118 L88 148" stroke="#d4af37" stroke-opacity="0.45" stroke-width="1.5" stroke-linecap="round"/>
    <ellipse cx="100" cy="148" rx="70" ry="16" fill="#8a9aa8" fill-opacity="0.18" filter="url(#mist)"/>
    <path d="M72 148 C78 138 84 134 90 136" stroke="#b8c8d0" stroke-opacity="0.35" stroke-width="1" stroke-linecap="round"/>
    <circle cx="118" cy="98" r="2" fill="#d4af37" fill-opacity="0.7"/>`,
  }),

  humility: shell({
    label: 'Khiêm cung',
    accent: '#c48a9a',
    bgTop: '#2a1e22',
    bgBottom: '#140f12',
    scene: `
    <rect x="0" y="0" width="200" height="200" fill="#1a1216"/>
    <ellipse cx="100" cy="108" rx="58" ry="52" fill="#d4869a" fill-opacity="0.12"/>
    <path d="M52 148 C62 132 78 124 100 128 C122 132 138 124 148 138" stroke="#5c4048" stroke-opacity="0.45" stroke-width="5" stroke-linecap="round"/>
    <g fill="#e8b8c4" fill-opacity="0.65">
      <ellipse cx="100" cy="72" rx="11" ry="20" transform="rotate(0 100 108)"/>
      <ellipse cx="100" cy="72" rx="11" ry="20" transform="rotate(72 100 108)"/>
      <ellipse cx="100" cy="72" rx="11" ry="20" transform="rotate(144 100 108)"/>
      <ellipse cx="100" cy="72" rx="11" ry="20" transform="rotate(216 100 108)"/>
      <ellipse cx="100" cy="72" rx="11" ry="20" transform="rotate(288 100 108)"/>
    </g>
    <circle cx="100" cy="108" r="9" fill="#f0c8d4" fill-opacity="0.6"/>
    <circle cx="100" cy="108" r="3.5" fill="#d4af37" fill-opacity="0.75"/>
    <path d="M68 88 C74 82 82 80 88 84" stroke="#f0d0d8" stroke-opacity="0.35" stroke-width="1" stroke-linecap="round"/>
    <path d="M132 92 C126 86 118 84 112 88" stroke="#f0d0d8" stroke-opacity="0.35" stroke-width="1" stroke-linecap="round"/>
    <circle cx="74" cy="74" r="2" fill="#f0c8d4" fill-opacity="0.55"/>
    <circle cx="128" cy="78" r="2" fill="#f0c8d4" fill-opacity="0.45"/>
    <circle cx="92" cy="62" r="1.5" fill="#f0c8d4" fill-opacity="0.4"/>`,
  }),

  'humility-deep': shell({
    label: 'Khiêm hạ',
    accent: '#6a98b0',
    bgTop: '#152028',
    bgBottom: '#0a1018',
    scene: `
    <rect x="0" y="0" width="200" height="200" fill="#0e1820"/>
    <path d="M0 118 C28 104 52 112 72 106 C92 100 108 92 128 98 C148 104 172 96 200 102 V200 H0 Z" fill="#1a3040" fill-opacity="0.55"/>
    <path d="M8 108 C32 98 54 104 74 100 C94 96 114 88 134 94 C154 100 176 94 192 96" stroke="#8ab8cc" stroke-opacity="0.55" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M4 124 C28 114 50 120 70 116 C90 112 110 104 130 110 C150 116 172 110 196 112" stroke="#6a98b0" stroke-opacity="0.4" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M0 138 C24 128 46 134 66 130 C86 126 106 118 126 124 C146 130 168 124 200 128" stroke="#5a8098" stroke-opacity="0.32" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M88 78 C94 68 106 68 112 78 C106 84 94 84 88 78" fill="#d4e8f0" fill-opacity="0.35"/>
    <ellipse cx="100" cy="82" rx="22" ry="14" fill="#c8dce8" fill-opacity="0.1"/>
    <path d="M96 92 C98 108 102 118 100 128" stroke="#a8d0e8" stroke-opacity="0.35" stroke-width="1.5" stroke-linecap="round" filter="url(#soft)"/>`,
  }),

  patience: shell({
    label: 'Nhẫn nhục',
    accent: '#9888b8',
    bgTop: '#1e1c24',
    bgBottom: '#0e0c12',
    scene: `
    <rect x="0" y="0" width="200" height="200" fill="#14121a"/>
    <ellipse cx="100" cy="118" rx="46" ry="40" fill="#9888b8" fill-opacity="0.14"/>
    <path d="M128 88 C128 112 116 138 100 152 C84 138 72 112 72 88" stroke="#c8b8e0" stroke-opacity="0.75" stroke-width="2" stroke-linecap="round"/>
    <path d="M100 68 V82" stroke="#c8b8e0" stroke-opacity="0.35" stroke-width="1" stroke-linecap="round"/>
    <path d="M88 72 C92 68 108 68 112 72" stroke="#9888b8" stroke-opacity="0.45" stroke-width="1" stroke-linecap="round"/>
    <circle cx="100" cy="152" r="3" fill="#d4af37" fill-opacity="0.75"/>
    <path d="M100 96 C96 104 96 114 100 122 C104 114 104 104 100 96" fill="#b8a8d0" fill-opacity="0.25"/>
    <path d="M92 108 C94 118 98 124 100 128 C102 124 106 118 108 108" stroke="#d8c8f0" stroke-opacity="0.35" stroke-width="1" stroke-linecap="round"/>
    <path d="M76 168 C84 176 116 176 124 168" stroke="#6a6080" stroke-opacity="0.45" stroke-width="1.5" stroke-linecap="round"/>
    <ellipse cx="100" cy="86" rx="18" ry="8" fill="#9888b8" fill-opacity="0.08" filter="url(#mist)"/>`,
  }),

  diligence: shell({
    label: 'Siêng năng',
    accent: '#7a9a70',
    bgTop: '#1a2418',
    bgBottom: '#0c100a',
    scene: `
    <rect x="0" y="0" width="200" height="200" fill="#101810"/>
    <ellipse cx="100" cy="52" rx="48" ry="22" fill="#d4af37" fill-opacity="0.1"/>
    <path d="M100 148 C88 148 78 138 74 122 C70 106 76 88 86 74 C92 66 100 62 108 66 C118 72 124 84 126 98 C128 112 124 128 114 140 C110 146 105 148 100 148" fill="#4a6848" fill-opacity="0.85"/>
    <path d="M100 148 C88 148 78 138 74 122 C70 106 76 88 86 74 C92 66 100 62 108 66 C118 72 124 84 126 98 C128 112 124 128 114 140" stroke="#a8c8a0" stroke-opacity="0.45" stroke-width="1.5"/>
    <path d="M100 74 V138" stroke="#c8dcc0" stroke-opacity="0.35" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M84 108 C92 102 108 102 116 108" stroke="#8ab080" stroke-opacity="0.45" stroke-width="1" stroke-linecap="round"/>
    <path d="M80 128 C90 122 110 122 120 128" stroke="#8ab080" stroke-opacity="0.35" stroke-width="1" stroke-linecap="round"/>
    <path d="M92 148 C96 158 104 158 108 148" stroke="#6a8860" stroke-opacity="0.55" stroke-width="2" stroke-linecap="round"/>
    <path d="M88 156 C94 162 106 162 112 156" stroke="#5a7850" stroke-opacity="0.45" stroke-width="1.5" stroke-linecap="round"/>`,
  }),

  rising: shell({
    label: 'Vươn lên',
    accent: '#8aa878',
    bgTop: '#1a2218',
    bgBottom: '#0a1008',
    scene: `
    <rect x="0" y="0" width="200" height="200" fill="#101810"/>
    <path d="M92 152 V58" stroke="#6a8860" stroke-width="8" stroke-linecap="round"/>
    <path d="M108 142 V68" stroke="#5a7850" stroke-width="6" stroke-linecap="round" stroke-opacity="0.85"/>
    <path d="M76 132 V78" stroke="#4a6848" stroke-width="5" stroke-linecap="round" stroke-opacity="0.7"/>
    <path d="M120 122 V88" stroke="#4a6848" stroke-width="4" stroke-linecap="round" stroke-opacity="0.55"/>
    <path d="M84 98 H100 M84 118 H100 M84 138 H100" stroke="#a8c098" stroke-opacity="0.45" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M108 88 H114 M108 108 H114" stroke="#98b088" stroke-opacity="0.35" stroke-width="1" stroke-linecap="round"/>
    <path d="M92 58 L100 42 L108 58" fill="#98b888" fill-opacity="0.6"/>
    <path d="M108 68 L114 56 L120 68" fill="#88a878" fill-opacity="0.5"/>
    <path d="M76 78 L80 68 L84 78" fill="#78a070" fill-opacity="0.4"/>
    <ellipse cx="100" cy="46" rx="38" ry="14" fill="#d4af37" fill-opacity="0.12"/>`,
  }),

  courage: shell({
    label: 'Dũng cảm',
    accent: '#b87858',
    bgTop: '#281814',
    bgBottom: '#120a08',
    scene: `
    <rect x="0" y="0" width="200" height="200" fill="#180e0c"/>
    <ellipse cx="100" cy="118" rx="38" ry="48" fill="#b85838" fill-opacity="0.12"/>
    <path d="M100 72 C84 88 78 108 82 128 C86 144 94 154 100 158 C106 154 114 144 118 128 C122 108 116 88 100 72" fill="#c86848" fill-opacity="0.55"/>
    <path d="M100 72 C84 88 78 108 82 128 C86 144 94 154 100 158 C106 154 114 144 118 128 C122 108 116 88 100 72" stroke="#e8a868" stroke-opacity="0.45" stroke-width="1.5"/>
    <path d="M100 88 C92 102 90 116 94 128 C96 136 98 142 100 146 C102 142 104 136 106 128 C110 116 108 102 100 88" fill="#f0c890" fill-opacity="0.35"/>
    <path d="M100 98 V138" stroke="#f0d0a0" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M88 108 C92 112 108 112 112 108" stroke="#e8a868" stroke-opacity="0.35" stroke-width="1" stroke-linecap="round"/>
    <circle cx="100" cy="82" r="6" fill="#f0d890" fill-opacity="0.4"/>
    <path d="M72 132 C78 124 88 120 100 122 C112 124 122 120 128 132" stroke="#8a5840" stroke-opacity="0.45" stroke-width="1.5" stroke-linecap="round"/>`,
  }),

  precision: shell({
    label: 'Tinh tấn',
    accent: '#c4a35a',
    bgTop: '#1e1c18',
    bgBottom: '#0e0c0a',
    scene: `
    <rect x="0" y="0" width="200" height="200" fill="#161410"/>
    <circle cx="100" cy="112" r="52" stroke="#6a6050" stroke-opacity="0.35" stroke-width="1.5"/>
    <circle cx="100" cy="112" r="34" stroke="#8a8070" stroke-opacity="0.4" stroke-width="1.5"/>
    <circle cx="100" cy="112" r="16" stroke="#c4a35a" stroke-opacity="0.55" stroke-width="1.5"/>
    <circle cx="100" cy="112" r="4" fill="#d4af37" fill-opacity="0.9"/>
    <path d="M100 52 V72 M100 152 V172 M48 112 H68 M132 112 H152" stroke="#c4a35a" stroke-opacity="0.45" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M62 78 L76 92 M124 132 L138 146 M138 78 L124 92 M76 132 L62 146" stroke="#8a8070" stroke-opacity="0.3" stroke-width="1" stroke-linecap="round"/>
    <path d="M100 112 L128 88" stroke="#e8dcc8" stroke-opacity="0.55" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M128 88 L124 92 L132 94 Z" fill="#d4af37" fill-opacity="0.65"/>
    <path d="M82 72 L88 68 L94 74" stroke="#5a5040" stroke-opacity="0.4" stroke-width="1" stroke-linecap="round"/>`,
  }),

  steadfast: shell({
    label: 'Vững vàng',
    accent: '#a89878',
    bgTop: '#222018',
    bgBottom: '#100e0a',
    scene: `
    <rect x="0" y="0" width="200" height="200" fill="#141210"/>
    <path d="M44 148 L100 62 L156 148 Z" fill="#5a5040" fill-opacity="0.88"/>
    <path d="M44 148 L100 62 L156 148" stroke="#c8bca8" stroke-opacity="0.4" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M100 62 V148" stroke="#d4af37" stroke-opacity="0.4" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M62 148 H138" stroke="#4a4030" stroke-opacity="0.65" stroke-width="7" stroke-linecap="round"/>
    <path d="M72 132 H128" stroke="#8a8070" stroke-opacity="0.28" stroke-width="1" stroke-linecap="round"/>
    <path d="M78 118 H122" stroke="#8a8070" stroke-opacity="0.22" stroke-width="1" stroke-linecap="round"/>
    <ellipse cx="100" cy="148" rx="56" ry="10" fill="#a89878" fill-opacity="0.12" filter="url(#mist)"/>`,
  }),

  tolerance: shell({
    label: 'Bao dung',
    accent: '#c4a35a',
    bgTop: '#2a2014',
    bgBottom: '#140e08',
    scene: `
    <rect x="0" y="0" width="200" height="200" fill="#181008"/>
    <circle cx="100" cy="108" r="46" fill="#e8c878" fill-opacity="0.08"/>
    <path d="M68 112 C68 96 80 84 100 84 C120 84 132 96 132 112 C132 126 122 136 108 142 L100 148 L92 142 C78 136 68 126 68 112" stroke="#e8c878" stroke-opacity="0.5" stroke-width="1.5"/>
    <path d="M76 112 C76 102 84 94 92 94 C98 94 102 98 104 104" stroke="#f0d890" stroke-opacity="0.55" stroke-width="2" stroke-linecap="round"/>
    <path d="M124 112 C124 102 116 94 108 94 C102 94 98 98 96 104" stroke="#f0d890" stroke-opacity="0.55" stroke-width="2" stroke-linecap="round"/>
    <path d="M88 118 C90 124 94 128 100 130 C106 128 110 124 112 118" stroke="#c4a35a" stroke-opacity="0.35" stroke-width="1" stroke-linecap="round"/>
    <path d="M58 108 C68 98 78 94 88 96" stroke="#c4a35a" stroke-opacity="0.3" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M142 108 C132 98 122 94 112 96" stroke="#c4a35a" stroke-opacity="0.3" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="100" cy="108" r="6" fill="#f0d890" fill-opacity="0.4"/>`,
  }),

  integrity: shell({
    label: 'Chính trực',
    accent: '#9898a8',
    bgTop: '#1e1e22',
    bgBottom: '#0c0c10',
    scene: `
    <rect x="0" y="0" width="200" height="200" fill="#12121a"/>
    <path d="M52 148 L100 72 L148 148 Z" fill="none" stroke="#6a6a78" stroke-opacity="0.35" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M68 148 H132" stroke="#c8c8d8" stroke-opacity="0.55" stroke-width="2" stroke-linecap="round"/>
    <path d="M100 72 V148" stroke="#c8c8d8" stroke-opacity="0.55" stroke-width="2" stroke-linecap="round"/>
    <path d="M72 148 H88" stroke="#a8a8b8" stroke-opacity="0.45" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M112 148 H128" stroke="#a8a8b8" stroke-opacity="0.45" stroke-width="1.5" stroke-linecap="round"/>
    <ellipse cx="80" cy="158" rx="14" ry="7" stroke="#d4af37" stroke-opacity="0.5" stroke-width="1.5"/>
    <ellipse cx="120" cy="158" rx="14" ry="7" stroke="#d4af37" stroke-opacity="0.5" stroke-width="1.5"/>
    <path d="M80 158 H120" stroke="#c8c8d8" stroke-opacity="0.35" stroke-width="1" stroke-linecap="round"/>
    <circle cx="100" cy="72" r="4" fill="#d4af37" fill-opacity="0.75"/>
    <path d="M58 118 L72 132 M142 118 L128 132" stroke="#9898a8" stroke-opacity="0.25" stroke-width="1" stroke-linecap="round"/>`,
  }),

  purity: shell({
    label: 'Thanh khiết',
    accent: '#b8c8d8',
    bgTop: '#1a1e22',
    bgBottom: '#080a0c',
    scene: `
    <rect x="0" y="0" width="200" height="200" fill="#0a1014"/>
    <ellipse cx="100" cy="128" rx="52" ry="14" fill="#688898" fill-opacity="0.25"/>
    <ellipse cx="100" cy="124" rx="42" ry="10" fill="#88a8b8" fill-opacity="0.18"/>
    <circle cx="100" cy="116" r="38" fill="#e8eef4" fill-opacity="0.08"/>
    <g fill="#d8e4ec" fill-opacity="0.58">
      <path d="M100 74 C94 88 94 100 100 114 C106 100 106 88 100 74"/>
      <path d="M100 74 C112 80 120 90 118 102 C110 94 104 84 100 74" transform="rotate(45 100 116)"/>
      <path d="M100 74 C112 80 120 90 118 102 C110 94 104 84 100 74" transform="rotate(90 100 116)"/>
      <path d="M100 74 C112 80 120 90 118 102 C110 94 104 84 100 74" transform="rotate(135 100 116)"/>
      <path d="M100 74 C112 80 120 90 118 102 C110 94 104 84 100 74" transform="rotate(180 100 116)"/>
      <path d="M100 74 C112 80 120 90 118 102 C110 94 104 84 100 74" transform="rotate(225 100 116)"/>
      <path d="M100 74 C112 80 120 90 118 102 C110 94 104 84 100 74" transform="rotate(270 100 116)"/>
      <path d="M100 74 C112 80 120 90 118 102 C110 94 104 84 100 74" transform="rotate(315 100 116)"/>
    </g>
    <circle cx="100" cy="108" r="6" fill="#f0f4f8" fill-opacity="0.78"/>
    <circle cx="100" cy="108" r="2.5" fill="#d4af37" fill-opacity="0.85"/>`,
  }),

  master: shell({
    label: 'Học đạo không ngừng',
    accent: '#c4a35a',
    bgTop: '#242018',
    bgBottom: '#100e0a',
    scene: `
    <rect x="0" y="0" width="200" height="200" fill="#141008"/>
    <path d="M58 76 H128 C136 76 142 82 142 90 V158 C142 166 136 172 128 172 H58 C50 172 44 166 44 158 V90 C44 82 50 76 58 76 Z" fill="#8a7858" fill-opacity="0.85"/>
    <path d="M58 76 H128 C136 76 142 82 142 90 V158 C142 166 136 172 128 172 H58 C50 172 44 166 44 158 V90 C44 82 50 76 58 76 Z" stroke="#e8dcc0" stroke-opacity="0.4" stroke-width="1.5"/>
    <path d="M142 90 C150 90 156 96 156 104 V148 C156 156 150 162 142 162" stroke="#a89878" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M58 92 H128 M58 108 H118 M58 124 H124 M58 140 H112 M58 156 H120" stroke="#5a4838" stroke-opacity="0.4" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M72 182 L88 166 L100 176 L112 162 L128 182" stroke="#7a6850" stroke-opacity="0.45" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="134" cy="82" r="2" fill="#d4af37" fill-opacity="0.6"/>`,
  }),

  'perfect-quiz': shell({
    label: 'Hành trình trọn vẹn',
    accent: '#c4a35a',
    bgTop: '#1e2018',
    bgBottom: '#0a0c08',
    scene: `
    <rect x="0" y="0" width="200" height="200" fill="#101008"/>
    <circle cx="100" cy="112" r="54" stroke="#6a6858" stroke-opacity="0.35" stroke-width="1.5" stroke-dasharray="5 7"/>
    <path d="M100 58 A54 54 0 0 1 154 112" stroke="#d4af37" stroke-opacity="0.8" stroke-width="4" stroke-linecap="round"/>
    <path d="M154 112 A54 54 0 0 1 100 166" stroke="#c4a35a" stroke-opacity="0.7" stroke-width="4" stroke-linecap="round"/>
    <path d="M100 166 A54 54 0 0 1 46 112" stroke="#a89868" stroke-opacity="0.6" stroke-width="4" stroke-linecap="round"/>
    <path d="M46 112 A54 54 0 0 1 100 58" stroke="#988858" stroke-opacity="0.5" stroke-width="4" stroke-linecap="round"/>
    <circle cx="100" cy="112" r="10" fill="#d4af37" fill-opacity="0.78"/>
    <path d="M94 112 L98 116 L106 106" stroke="#1e2018" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M68 78 L76 86 M132 78 L124 86 M68 146 L76 138 M132 146 L124 138" stroke="#c4a35a" stroke-opacity="0.25" stroke-width="1" stroke-linecap="round"/>`,
  }),
};

for (const [id, svg] of Object.entries(badges)) {
  const file = join(outDir, `${id}.svg`);
  writeFileSync(file, svg.trim() + '\n');
  console.log(`Wrote ${file}`);
}

// Export crisp PNG badges for Next.js Image (SVG blocked by default)
const PNG_WIDTH = 400;

for (const [id, svg] of Object.entries(badges)) {
  const resvg = new Resvg(svg.trim(), {
    fitTo: { mode: 'width', value: PNG_WIDTH },
    font: { loadSystemFonts: false },
  });
  const png = resvg.render().asPng();
  const pngFile = join(outDir, `${id}.png`);
  writeFileSync(pngFile, png);
  console.log(`Wrote ${pngFile} (${PNG_WIDTH}px)`);
}

console.log(`Generated ${Object.keys(badges).length} achievement badges (SVG + PNG).`);
