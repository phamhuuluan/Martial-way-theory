# Testing Checklist — PQQ Theory Journey

## Pre-deploy

- [ ] `npm run build` completes without errors
- [ ] All 54 static routes generated
- [ ] Logo loads at `/logo.png`
- [ ] Environment variables set on Vercel

## Landing & Navigation

- [ ] Landing page renders on mobile (375px) and desktop (1280px)
- [ ] "Bắt đầu hành trình" navigates to `/journey`
- [ ] Bottom tab bar visible on mobile (4 tabs)
- [ ] Side rail visible on desktop (≥1024px)
- [ ] Onboarding modal appears on first visit, accepts name

## Journey & Worlds

- [ ] Journey map shows 6 worlds (bottom to top: Nâu → Trắng)
- [ ] Brown world unlocked by default
- [ ] Locked worlds show lock icon, not clickable
- [ ] Tapping unlocked world opens belt world page
- [ ] Belt world shows lesson list with locked/active/completed states

## Lessons

- [ ] Brown lesson-01 loads MDX content
- [ ] Scroll progress bar updates while reading
- [ ] "Làm bài kiểm tra" shows warning if <80% read
- [ ] Can proceed to quiz anyway after warning
- [ ] Breadcrumb navigation works

## Quiz

- [ ] Quiz intro shows question count and pass threshold
- [ ] Questions display one at a time with A/B/C/D options
- [ ] Correct answer: green feedback
- [ ] Wrong answer: red + reveal correct (gentle shake)
- [ ] Pass (≥70%): unlock next lesson, show results
- [ ] Fail (<70%): show wrong answers expandable, retry available
- [ ] Direct quiz URL when locked redirects

## Progress & Persistence

- [ ] Complete quiz → close browser → reopen → progress retained
- [ ] Export JSON from profile downloads valid file
- [ ] Import JSON restores progress
- [ ] Reset progress requires double confirmation

## Achievements & Ceremony

- [ ] Completing brown lesson triggers "Bước Chân Đầu Tiên" badge
- [ ] Completing belt world triggers ceremony overlay
- [ ] Ceremony dismissible, links to next world
- [ ] Achievements page shows earned vs locked badges

## Profile

- [ ] Name editable and persisted
- [ ] Overall progress percentage accurate
- [ ] Per-belt mini progress bars correct
- [ ] Font size toggle (Normal/Large) works
- [ ] Reduced motion preference stored
- [ ] Certificate PNG/PDF download works for completed belts

## Accessibility

- [ ] Touch targets ≥44px on mobile
- [ ] `prefers-reduced-motion`: animations minimized
- [ ] Manual reduced motion toggle in profile works
- [ ] Body font 18px+ on mobile lesson pages

## SEO

- [ ] `/sitemap.xml` accessible
- [ ] `/robots.txt` accessible
- [ ] Page titles unique per route
- [ ] Open Graph metadata on landing

## Cross-browser

- [ ] Chrome (desktop + mobile)
- [ ] Safari iOS
- [ ] Firefox
- [ ] Safari private mode shows storage warning

## Content

- [ ] All 19 lessons have MDX content
- [ ] All 19 quizzes have questions
- [ ] Quiz questions match lesson topics (spot check 3 belts)
- [ ] HLV review of auto-generated distractors (manual)
