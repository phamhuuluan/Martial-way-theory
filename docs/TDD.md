# Technical Design Document — PQQ Theory Journey

## 1. PRD Analysis Summary

### Business Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| BR-01 | Journey-based martial arts theory learning | Must |
| BR-02 | 6 belt worlds, 19 lessons mapped to exam docs | Must |
| BR-03 | No backend/auth for MVP | Must |
| BR-04 | localStorage progress persistence | Must |
| BR-05 | Gamification aligned with virtue (not XP/streak) | Must |
| BR-06 | Mobile-first, accessible to young students | Must |
| BR-07 | Export progress for HLV review | Should |
| BR-08 | Client-side certificates | Should |

### Functional Requirements

| ID | Feature | Implementation |
|----|---------|----------------|
| FR-01 | Landing + CTA | `app/page.tsx` |
| FR-02 | Journey map 6 worlds | `app/journey/page.tsx` + `JourneyMap` |
| FR-03 | Belt world hub | `app/world/[belt]/page.tsx` |
| FR-04 | MDX lesson reader | `LessonReader` + `next-mdx-remote` |
| FR-05 | Quiz with pass/fail | `QuizEngine` + `lib/quiz-engine.ts` |
| FR-06 | Unlock chain | `lib/progress.ts` |
| FR-07 | Achievements | `lib/achievements.ts` |
| FR-08 | Profile + settings | `app/profile/page.tsx` |
| FR-09 | Belt ceremony | `BeltCeremony` overlay |

### Non-Functional Requirements

| NFR | Target | Approach |
|-----|--------|----------|
| Performance | LCP < 2.5s | SSG, code splitting, CSS animations |
| SEO | Indexable | Metadata, sitemap, semantic HTML |
| Accessibility | WCAG-oriented | 44px touch targets, font toggle, reduced motion |
| Extensibility | Backend later | Typed schemas, import/export JSON |
| Offline | Phase 2 | Architecture compatible with PWA |

### User Flows

1. Landing → Onboarding (name) → Journey → Belt World → Lesson → Quiz → Unlock next
2. Profile → Export JSON → Share with HLV via Zalo
3. Guest preview → Brown belt readable without full progress

### Edge Cases

| Case | Handling |
|------|----------|
| Quiz before 80% read | Warning modal, allow proceed |
| Direct quiz URL when locked | Redirect to lesson/world |
| localStorage cleared | Warning on profile, restart from brown |
| Safari private mode | In-memory fallback + banner |
| Multi-tab | `storage` event sync |

### Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Lost progress | Export/import JSON |
| Auto-generated quiz distractors | HLV review workflow documented |
| Content updates | Re-run `convert-content`, rebuild |

---

## 2. System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    BUILD TIME                            │
│  assets/doc/*.docx → scripts/convert-content.mjs        │
│       → content/*.mdx + content/quizzes/*.json          │
│       → next build → Static HTML/JS (54 routes)         │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    RUNTIME (Browser)                     │
│  Zustand Store ←→ localStorage (pqq-theory-progress-v1) │
│  Pages (RSC) + Client Components (quiz, progress, anim) │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Routing Structure

| Route | Page |
|-------|------|
| `/` | Landing |
| `/journey` | Journey map |
| `/world/[belt]` | Belt world |
| `/world/[belt]/[lesson]` | Lesson MDX |
| `/world/[belt]/[lesson]/quiz` | Quiz |
| `/achievements` | Badges |
| `/profile` | Profile + settings |
| `/about` | About PQQ |

---

## 4. Data Models

See `types/index.ts` for full TypeScript definitions:

- `UserProgress` — version, profile, lessons, quizzes, belts, achievements, preferences
- `LessonMeta` — MDX frontmatter schema
- `QuizData` / `QuizQuestion` — quiz JSON schema
- `Achievement` — badge definitions
- `BeltWorld` — world configuration

---

## 5. State Management

- **Zustand** (`store/progress-store.ts`) — client UI state synced with localStorage
- **lib/storage.ts** — CRUD, migration, export/import
- **lib/progress.ts** — unlock logic, belt completion, quiz completion side effects

---

## 6. Unlock Logic

```
brown-lesson-01: DEFAULT UNLOCKED
Lesson N unlock: Lesson N-1 quiz passed (≥70%)
Belt N+1 unlock: All lessons in Belt N quiz passed
Ceremony: Trigger on completing last lesson in belt
```

---

## 7. Achievement Engine

15 badges checked in `checkAchievements()` after quiz completion:
- Per-belt completion badges
- Streak (5 consecutive lessons)
- Patience (3+ attempts then pass)
- Precision (100% single quiz)
- Master (all complete + avg ≥90%)

---

## 8. Assumptions

1. Quiz distractors auto-generated; HLV review recommended before exam use
2. Vercel deployment uses standard Next.js (not `output: 'export'`) for optimal DX
3. Illustrations use CSS gradients (placeholder per PRD R6)
4. White belt world uses light surface styling

---

## 9. Implementation Phases

### Phase 1 (Complete)
Scaffold, design system, core pages, 5+ lessons, localStorage, mobile nav

### Phase 2 (Complete in this delivery)
All 19 lessons, achievements, profile, certificates, export/import

### Phase 3 (Future)
PWA offline, IndexedDB cache

### Phase 4 (Future)
Optional cloud sync (Supabase)
