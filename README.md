# Phật Quang Quyền — Hành Trình Lý Thuyết Võ Đạo

Website học lý thuyết Phật Quang Quyền (PQQ Theory Journey): hành trình võ đạo qua hệ thống 6 màu đai, 19 bài học và trắc nghiệm ôn lý thuyết.

## Tech Stack

- **Next.js 15** (App Router, SSG)
- **TypeScript**
- **Tailwind CSS 4**
- **MDX** (`next-mdx-remote`)
- **Framer Motion**
- **Zustand** (progress state)
- **React Hook Form + Zod** (onboarding, profile)
- **localStorage** (MVP persistence)

## Quick Start

```bash
# Install dependencies
npm install

# Convert docx → MDX + quiz JSON (requires Python 3)
npm run convert-content

# Development
npm run dev

# Production build
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Production URL (SEO, sitemap) |
| `NEXT_PUBLIC_SITE_NAME` | Site display name |

## Project Structure

```
app/                    # Next.js App Router pages
components/             # UI, layout, quiz, lesson, journey
content/                # Generated MDX lessons + quiz JSON
  brown-belt/
  blue-belt/
  ...
  quizzes/
lib/                    # Storage, progress, quiz engine, achievements
store/                  # Zustand store
scripts/                # docx → MDX conversion
assets/doc/             # Source Word documents (19 files)
public/                 # Static assets (logo)
docs/                   # TDD, testing checklist
```

## Content Pipeline

Source documents in `assets/doc/` are converted at build time:

```bash
npm run convert-content
```

Output:
- `content/{belt}-belt/lesson-XX.mdx` — lesson content with frontmatter
- `content/quizzes/{lesson-id}.json` — quiz questions

**Assumption:** Quiz distractors are auto-generated from cross-answers with fallback options. HLV should review quiz JSON for accuracy before production use.

## Deploy to Vercel

1. Push repository to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Framework preset: **Next.js**
4. Build command: `npm run build`
5. Output: default (Next.js — no static export needed)
6. Set environment variables from `.env.example`
7. Deploy

Vercel auto-detects Next.js 15. All 54 routes are pre-rendered via `generateStaticParams`.

### Manual deploy

```bash
npm run build
npx vercel --prod
```

## Features

- Landing page with 6 belt world preview
- Journey map with unlock states
- Belt world pages with lesson timeline
- MDX lesson reader with scroll progress (80% threshold)
- Quiz engine: pass ≥70%, unlimited retry, wrong answer review
- Achievement system (15 badges)
- Belt promotion ceremony overlay
- Profile: progress, export/import JSON, certificates (PNG/PDF)
- Mobile-first responsive + desktop side rail
- SEO: metadata, sitemap, robots.txt

## Local Storage

Key: `pqq-theory-progress-v1`

Progress persists in browser localStorage. Users can export/import JSON from Profile page.

## License

Private — Phật Quang Quyền © 2026
