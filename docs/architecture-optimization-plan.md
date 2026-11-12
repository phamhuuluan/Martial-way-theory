# Kế hoạch tối ưu kiến trúc và hiệu năng

Phạm vi: phân tích và lập kế hoạch. Tài liệu này không thay đổi source code.

**Không xóa dữ liệu.** Mọi phase giữ nguyên bài học MDX, quiz JSON, `content/practice-bank`, `content/official-bank`, `content/documents.json`, file Word trong `assets/doc` và `public/assets/doc`, ảnh nguồn, tiến độ trong `localStorage`, và bản ghi kết quả trên Google Sheet. Việc “xóa” trong plan chỉ gồm file patch đã được áp vào code, selector CSS không còn gắn vào giao diện, và package build MDX không còn được gọi. Ảnh world nếu được nén thì tạo bản nhỏ hơn và giữ file gốc. `out/` và `.next/` là thư mục build, xóa để đo lại thì lệnh build tạo lại.

Ngày khảo sát: 12 tháng 11 năm 2026.  
Stack đang chạy: Next.js 15.3.8, React 19, App Router, `output: 'export'`, Tailwind CSS 4, Zustand, MDX qua `next-mdx-remote`.

Số liệu bundle và asset bên dưới lấy từ thư mục `out/` đã build lúc **2026-10-05 22:58**. Source đã tiếp tục thay đổi sau mốc đó (ngân hàng thi, trang quản trị). Coi các số này là baseline cũ, phải build lại trước khi so sánh trước/sau.

## 1. Executive Summary

Ứng dụng đã có ranh giới đúng hướng: trang server đọc nội dung bằng `fs` lúc build, state người dùng nằm trong Zustand và `localStorage`, PDF/DOCX được `dynamic()` nên không nằm trong JS ban đầu của trang tài liệu. Phần cần xử lý tập trung ở bốn chỗ.

1. **Ảnh world và logo đang chiếm băng thông lớn hơn JavaScript.** Sáu file PNG world trong `public/assets/worlds` cộng lại **14,4 MB** (khoảng 2,2–2,6 MB mỗi file). `JourneyMap` render cả 6 đai, nên trang hành trình có thể tải toàn bộ. `public/logo.png` là **706 KB**. `images.unoptimized: true` là hệ quả của static export: `next/image` không tự resize.
2. **Shell dùng chung kéo thư viện nặng vào mọi route.** `AppShell` import thẳng `BeltCeremony` và `OnboardingModal`. Cả hai đi qua Framer Motion. Chunk motion **120 KB** (chưa nén) có mặt trên trang chủ, hành trình, tài liệu, kỳ thi và bài học trong bản export tháng 10. Trang hồ sơ còn kéo thêm chunk **194 KB** và **322 KB** chứa `html2canvas` / `jsPDF` vì `ProfilePageClient` import tĩnh `lib/certificates.ts`.
3. **CSS là một file toàn cục.** `styles/globals.css` có **5.665 dòng**, khoảng **139** chỗ ghi đè `theme-light`. Mọi route tải stylesheet này vì chỉ `app/layout.tsx` import nó. Tách file sẽ giúp bảo trì; muốn giảm CSS từng trang thì phải import phần CSS theo từng màn, không chỉ cắt file cho dễ đọc.
4. **Hai luồng câu hỏi đang vẽ trùng nhau.** `ExamQuestion` (196 dòng) đã render đủ loại câu cho kỳ thi. `QuizEngine` (784 dòng) tự render lại `QuizOption`, `QuizFillBlank`, `QuizMatching`, `QuizOrdering`. `PracticeAttemptView` và `OfficialAttemptView` lặp nhãn trạng thái, format và phần xem lại bài.

Không đề xuất đổi sang một kiến trúc mới. Giữ App Router, nhóm component theo miền, `lib/` cho logic thuần, Zustand cho tiến độ. Việc dời file chỉ làm khi đổi được chủ sở hữu thật (tài liệu đang nằm trong `components/profile` trong khi route là `/documents`).

Ưu tiên thực hiện: nén ảnh world và logo, tách import chứng chỉ và overlay ceremony, cô lập đồng hồ bài thi, rồi mới gộp UI câu hỏi và tách CSS.

## 2. Tổng quan kiến trúc hiện tại

### 2.1 Cấu trúc đang có

```
app/                  25 route (App Router, static export)
components/           88 file, nhóm theo miền: exam, quiz, lesson, world,
                      journey, profile, achievement, belt-showcase, landing,
                      layout, admin, providers, ui
lib/                  60 file phẳng, logic thuần + test cạnh module
hooks/                12 hook
store/                progress-store, admin-store (Zustand)
types/                index.ts, exam.ts, gtag.d.ts
styles/globals.css    5.665 dòng, một entry
content/              MDX bài học, quiz JSON, practice-bank, official-bank
scripts/              convert docx, sync asset, sinh ngân hàng thi
assets/               nguồn ảnh, docx, illustration (sync sang public/)
public/               asset phát cho static hosting
```

Quy ước hiện tại đáng giữ:

- Route mỏng trong `app/`, UI tương tác trong `*PageClient` hoặc session component.
- Nội dung đọc lúc build trong `lib/content.ts` và `lib/exam-bank.ts` (`fs`, không vào client bundle).
- Widget câu hỏi dùng chung trong `components/quiz/`.
- Kỳ thi dùng `useExamSession` + `lib/exam-paper.ts` + `lib/quiz-engine.ts`.
- PDF và DOCX đã tách chunk bằng `next/dynamic` trong `DocumentViewer`.

### 2.2 Luồng chính

| Luồng | Điểm vào | Dữ liệu | UI |
| --- | --- | --- | --- |
| Hành trình / bài học | `app/journey`, `app/world/[belt]/[lesson]` | MDX + `content/quizzes` | `LessonReader`, `QuizEngine` |
| Ôn luyện | `app/exam/practice/[rankId]` | `content/practice-bank` nhúng vào props | `PracticeSession` |
| Thi chính thức | `app/exam/official/[rankId]` | `content/official-bank` nhúng vào props | `OfficialExamWrapper` → gate → session |
| Tài liệu | `app/documents` | `content/documents.json` | viewer PDF/DOCX |
| Hồ sơ | `app/profile` | Zustand + `localStorage` | form, lịch sử, chứng chỉ |
| Quản trị | `app/pqq-management` | Google Apps Script qua JSONP | `AdminResultsList` |

`output: 'export'` cố định mô hình này: không có server runtime, chấm điểm chạy trên client, ngân hàng câu hỏi phải có mặt trong HTML/JS của trang đề. Đó là ràng buộc sản phẩm, không phải lỗi import.

### 2.3 Phụ thuộc giữa các lớp

`app/layout.tsx` bọc mọi trang bằng `ThemeProvider`, `AdminProvider`, `ProgressProvider`, `AppShell`. `AppShell` luôn gắn `OfficialExamGuard`, navigation, `OnboardingModal`, `BeltCeremony`. Vì vậy chi phí JS của shell là chi phí của mọi route.

`lib/documents.ts` import `content/documents.json` và được client component dùng. File này không đụng `fs`, nên an toàn. `lib/content.ts` và `lib/exam-bank.ts` dùng `fs`; hiện chưa có client component import chúng (chỉ import `import type`). Chưa có `import 'server-only'` để khóa nhầm lẫn sau này.

Hai pipeline MDX cùng tồn tại. Runtime thật là `next-mdx-remote` (`lib/mdx.ts`, `LessonReader`). `next.config.ts` vẫn bọc `withMDX` từ `@next/mdx`, trong khi `app/` không có file `.mdx`.

### 2.4 Những gì đang đặt đúng chỗ

- `components/exam` tách gate, session, attempt, guard.
- `hooks/use-exam-pointer-guard.ts` gỡ `mousemove` / `mouseout` trong cleanup.
- `PdfViewerContent` disconnect `ResizeObserver` và `IntersectionObserver`.
- `BeltShowcase` gỡ `wheel` và touch listener.
- `PracticeHistory` gỡ listener `storage`.
- Admin đã gửi khoảng thời gian (`examResultRange`) khi tải kết quả, có `useDeferredValue` cho ô tìm kiếm, và bỏ response cũ bằng `requestRef`.
- Ngân hàng practice và official **không** trùng byte (19/19 file khác nhau). Comment cũ trong `exam-bank.ts` nói kỳ thi đang dùng chung thư mục với ôn luyện; comment đó đã lệch so với code.

## 3. Danh sách vấn đề phát hiện

### Critical

| ID | Vấn đề | Bằng chứng |
| --- | --- | --- |
| C1 | Ảnh world quá nặng và trang hành trình dựng cả 6 ảnh | `public/assets/worlds/*.png` = 15.074.892 byte. `JourneyMap` map `BELT_WORLDS` → `JourneyNode` → `WorldArtwork`. |
| C2 | Logo 706 KB được dùng như icon và trong form hồ sơ | `public/logo.png` = 722.853 byte. `app/layout.tsx` đặt làm favicon và apple icon. |

### High

| ID | Vấn đề | Bằng chứng |
| --- | --- | --- |
| H1 | Framer Motion vào mọi trang đã đo | Chunk `6788-d1a4271e11ca20d0.js` (120 KB, có `MotionValue`) nằm trong HTML của `/`, `/journey`, `/documents`, `/exam`, `/profile`, bài học, trang thi. Nguồn chắc chắn trên shell: `BeltCeremony`, `OnboardingModal` → `Modal`. |
| H2 | Trang hồ sơ tải sẵn bộ xuất ảnh/PDF | `out/profile.html` tham chiếu chunk 194 KB (`html2canvas`) và chunk 322 KB (`html2canvas` / `jsPDF`). `ProfilePageClient` import tĩnh `downloadCertificatePNG` / `downloadCertificatePDF`. |
| H3 | Đồng hồ thi chính thức render cả session 4 lần mỗi giây | `OfficialExamSession` `setInterval` 250 ms gọi `setNow`. Câu hỏi hiện tại nằm cùng component. |
| H4 | `QuizEngine` và `ExamQuestion` cùng vẽ 4 loại câu | `QuizEngine.tsx` dòng 578–643 gọi trực tiếp các widget; `ExamQuestion.tsx` đã có nhánh tương ứng kèm trạng thái đúng/sai. |
| H5 | CSS toàn cục 5.665 dòng, gồm block riêng của từng màn | World 1.419 dòng, landing 932, document viewer 916, profile 708. Chỉ layout import file này. |
| H6 | Sau khi nộp bài, client tải lại toàn bộ kết quả để xác nhận một id | `postExamResult` gọi `fetchExamResults()` không có query. Đã có `fetchExamAttemptData(id)`. |

### Medium

| ID | Vấn đề | Bằng chứng |
| --- | --- | --- |
| M1 | Hai màn xem bài làm lặp markup | `PracticeAttemptView` và `OfficialAttemptView` cùng `STATUS_LABEL`, `statusClass`, formatter từ `exam-paper`. |
| M2 | UI tài liệu nằm trong thư mục hồ sơ | Route `/documents` render `components/profile/DocumentsPageClient` và cả cụm viewer. |
| M3 | 11 font được preload trên mọi trang đã đo | `next/font`: Be Vietnam Pro 4 weight, Noto Serif 3 weight, Noto Serif TC 2 weight. Bản export có 128 file `.woff2` (6,0 MB trên đĩa); trình duyệt preload 11 file mỗi HTML. |
| M4 | `@next/mdx` được cấu hình nhưng không có trang MDX | `next.config.ts` dùng `createMDX`. Không có `.mdx` trong `app/`. |
| M5 | Ảnh nguồn và bản public trùng một phần | `assets/illustrations` sync sang `public/assets` (`scripts/sync-assets.mjs`). 30 file trùng byte, khoảng 0,6 MB ngoài 6 ảnh world nằm ở path khác (`assets/illustrations/*-world.png` → `public/assets/worlds`). Repo đang giữ cả nguồn và bản phát. |
| M6 | `OfficialExamWrapper` nhận `props: any` | Mất kiểm tra type giữa gate và session. |
| M7 | Effect bài thi tắt `exhaustive-deps` | `OfficialExamSession` effect popstate/click/visibility phụ thuộc `finishLeftExam` nhưng dependency chỉ có `draft`. |
| M8 | README lệch so với code | README ghi React Hook Form và “no static export needed”. `package.json` không có `react-hook-form`. `next.config.ts` đặt `output: 'export'`. |
| M9 | Comment ngân hàng thi đã cũ | `lib/exam-bank.ts` dòng 15–16. |

### Low

| ID | Vấn đề | Bằng chứng |
| --- | --- | --- |
| L1 | File patch đã được áp vào source | `lib/exam-results-view.ts.patch` vẫn mô tả `lastMonth` / `thisYear`. File `.ts` hiện dùng `selectMonth`. |
| L2 | Script chẩn đoán không có npm script | `scripts/diagnose-max-scroll.mjs`, `diagnose-reading-progress.mjs`, `capture-reading-console.mjs`. Dùng Playwright. Giữ lại, không xóa chỉ vì không được import. |
| L3 | Virtualenv nằm trong workspace và chưa có trong `.gitignore` | `.venv-image`, `.venv-tts`. `.idea/` cũng không bị ignore. |
| L4 | `lib/` phẳng khoảng 40 module runtime | Prefix `exam-*`, `lesson-*`, `belt-*` đã đủ để tìm. Dời thư mục chỉ để nhóm tên thì lợi ích thấp. |
| L5 | Lớp mây dùng `blur-3xl` và animation dài | `CloudLayer` trên landing, journey, world. Đã có nhiều `@media (prefers-reduced-motion)` trong CSS; blur vẫn tốn GPU khi animation bị tắt. |

### Những gì đã kiểm tra và không xếp vào việc phải sửa

- Listener đã đọc (`use-exam-pointer-guard`, `PdfViewerContent`, `BeltShowcase`, `PracticeHistory`, `DocumentViewer`, `OfficialExamSession`) đều có cleanup. Không có leak rõ từ các đoạn này.
- `playwright` và `linkedom` đang được dùng (`scripts/verify-certificate-export.mjs`, `lib/format-docx-html.test.ts`). Giữ trong devDependencies.
- Route chuyển hướng `/achievements`, `/profile/practice`, `/profile/practice/[rankId]`, `/profile/practice/attempt` là route tương thích, gọi `ClientReplace`. Với static export đây là cách giữ URL cũ. Không xóa.
- Class CSS ghép động phải giữ: `achievement-badge--${tier}`, `achievement-card--tier-${tier}`, `achievement-character--${tier}`, `world-lesson-card--${state}`, `belt-wheel-item__fallback--${rankId}`.
- `types/index.ts` được import qua `@/types`. Không phải file mồ côi.
- Chấm điểm trên client và việc đáp án nằm trong HTML trang đề là hệ quả của static export. Tách ngân hàng ra file JSON riêng không giấu được đáp án với người mở DevTools. Không đưa việc này vào kế hoạch tối ưu trừ khi có chủ trương thêm backend.

## 4. File, code và dependency có thể loại bỏ

Chỉ liệt kê mục đã đối chiếu reference. Mục “cần xác nhận bằng mắt” chưa được coi là an toàn để xóa.

### An toàn để xóa sau khi xác nhận diff đã nằm trong source

| Mục | Lý do | Cách xác nhận |
| --- | --- | --- |
| `lib/exam-results-view.ts.patch` | Bản `.ts` đã có `selectMonth`, không còn `lastMonth`. | Mở patch, đối chiếu `lib/exam-results-view.ts`. |

### Dependency ứng viên, chỉ gỡ sau một lần build

| Package | Vì sao là ứng viên | Việc cần làm trước khi gỡ |
| --- | --- | --- |
| `@next/mdx` | Chỉ xuất hiện trong `next.config.ts`. | Bỏ `withMDX`, giữ `next-mdx-remote`, chạy `npm run build`. |
| `@mdx-js/loader`, `@mdx-js/react` | Không có import trong `app/`, `components/`, `lib/`. Có thể là peer của `@next/mdx`. | Sau khi bỏ `@next/mdx`, chạy build và `npm ls` để xem `next-mdx-remote` còn cần chúng không. |

### Không xóa

| Mục | Lý do giữ |
| --- | --- |
| `playwright`, `linkedom` | Script xác nhận chứng chỉ và test HTML. |
| `mammoth`, `react-pdf`, `html2canvas`, `jspdf` | Đang dùng. Việc cần làm là tải trễ, không gỡ package. |
| `framer-motion`, `lucide-react`, `zustand`, `zod`, `clsx`, `tailwind-merge`, `js-yaml` | Đang dùng. `js-yaml` chỉ ở `lib/frontmatter.ts` (build/server). |
| Route `ClientReplace` | URL cũ còn sống. |
| `scripts/diagnose-*.mjs`, `capture-reading-console.mjs` | Script vận hành thủ công, không nằm trên graph import của app. |
| Bản copy `public/assets` do `sync-assets` tạo | `npm run dev` không gọi sync. Xóa bản public sẽ làm mất ảnh lúc dev cho đến khi đổi script dev. |

### CSS có vẻ không còn class trong TSX

Đã tìm trong `*.ts` / `*.tsx`. Không thấy chuỗi tĩnh cũng không thấy template ghép các selector sau. Vẫn phải mở đúng màn hình trước khi xóa vì class có thể nằm trong MDX hoặc được ghép từ nhiều chuỗi nhỏ.

- Khối hồ sơ cũ: `profile-identity__form`, `profile-identity__label`, `profile-identity__name-display`, `profile-identity__name-input`, `profile-identity__edit-icon`
- Khối tài liệu cũ: `profile-doc-entry` và các phần tử con, `documents-page__back`
- Hành trình: `journey-header__step`, `journey-path-line`
- Landing: `landing-hero__belt-image`, `landing-hero__belt-image-reflection`, `landing-hero__belt-image-wrap`, `landing-journey__hint`, `landing-journey__label`
- Viewer: `pdf-viewer__retry`
- Belt card cũ: `belt-card--light`, `belt-card__badge`, `belt-card__badge-dot`, `belt-card__title`, `belt-card__meta`, `belt-card__muted`, `belt-gradient-brown|blue|green|red|yellow|white`
- Achievement: `achievement-watermark`, `achievement-watermark--1|2|3`, `achievement-watermarks`, `achievement-character-wrap`

`profile-identity__name`, `profile-identity__inner`, `achievement-character--${tier}` vẫn đang được render. Chỉ xóa selector thực sự không gắn vào DOM.

## 5. Code trùng cần hợp nhất

| Cụm | Hiện trạng | Hướng hợp nhất | Không làm |
| --- | --- | --- | --- |
| Câu hỏi quiz và câu hỏi thi | `QuizEngine` giữ phase intro/question/result, điểm, thành tích, và tự vẽ từng loại câu. `ExamQuestion` đã vẽ cùng các widget với `revealed` / `disabled`. | `QuizEngine` gọi `ExamQuestion` cho phần thân câu. Giữ state phiên quiz trong `QuizEngine`. | Không gộp quiz bài học và phiên thi thành một component. |
| Xem lại bài làm | Hai view lặp nhãn Đúng/Sai/Chưa trả lời và danh sách câu. Official thêm nhánh admin (`fetchExamAttemptData`) và xóa redirect thoát đề. | Tách phần trình bày bài làm (header điểm, danh sách câu) dùng chung. Giữ nguồn dữ liệu riêng: localStorage với thí sinh, JSONP với admin. | Không dùng một page cho cả học viên và admin. |
| Khung làm bài | `PracticeSession` và `OfficialExamSession` cùng `useExamSession`, `ExamQuestion`, modal nộp, overlay loading. Official thêm đồng hồ, pointer guard, chặn link, `visibilitychange`. | Tách thanh điều hướng câu và modal xác nhận nếu phần JSX giống nhau sau khi đọc hết hai file. | Không trộn luật “rời trang là nộp/thoát” vào bài luyện. |
| Catalog đề | `app/exam/page.tsx`, `app/exam/official/page.tsx`, `PracticeRankPicker` đã chia catalog. | Giữ. Chỉ rút helper hiển thị nếu còn lặp sau khi đụng vào các file này. | Không gộp practice và official bank. |

`components/quiz/QuizFillBlank.tsx`, `QuizMatching.tsx`, `QuizOrdering.tsx`, `QuizOption.tsx` đã là điểm dùng chung. Việc hợp nhất dừng ở tầng `ExamQuestion`, không viết thêm một bộ widget thứ ba.

## 6. Đề xuất cấu trúc thư mục

Chỉ những mục có lợi ích vận hành. Phần còn lại giữ nguyên.

### 6.1 Đưa UI tài liệu ra khỏi hồ sơ

Hiện tại: `app/documents/page.tsx` import `components/profile/DocumentsPageClient`, `DocumentLibrary`, `DocumentViewer`, `PdfViewerContent`, `DocxViewerContent`, `LazyPdfPage`, `ViewerToolbar`, `DocumentCard`.

Vấn đề: người sửa trang hồ sơ phải đi qua viewer PDF. Ngược lại, sửa viewer phải mở thư mục profile.

Đề xuất:

```
components/documents/
  DocumentsPageClient.tsx
  DocumentLibrary.tsx
  DocumentCard.tsx
  DocumentViewer.tsx
  PdfViewerContent.tsx
  DocxViewerContent.tsx
  LazyPdfPage.tsx
  ViewerToolbar.tsx
```

`lib/documents.ts`, `lib/document-cache.ts`, `lib/document-download.ts`, `lib/format-docx-html.ts` giữ ở `lib/` vì không chứa JSX và đang có test.

Lợi ích: đúng route `/documents`, diff hồ sơ không còn lẫn viewer.  
File bị ảnh hưởng: các file trên, cộng `app/documents/page.tsx` và mọi import tương đối trong cụm viewer.  
Rủi ro: thấp, đổi đường import.

### 6.2 Tách CSS theo màn, vẫn một hệ token

Hiện tại: `styles/globals.css` chứa token, base, và toàn bộ block đã đánh dấu bằng comment (`Journey`, `World`, `Profile`, `Document library`, `Document viewer`, `Belt Showcase`, `Landing`).

Vấn đề: sửa landing phải mở file 5.665 dòng. Mọi trang tải CSS của viewer và showcase.

Đề xuất, giữ `@import 'tailwindcss'` và `@theme` trong `styles/globals.css`:

```
styles/globals.css          token, base, utility dùng nhiều màn
styles/journey.css
styles/world.css
styles/profile.css
styles/documents.css
styles/belt-showcase.css
styles/landing.css
```

`globals.css` tiếp tục được layout import. Các file màn được import từ component của màn đó (`DocumentsPageClient`, `BeltShowcase`, landing `app/page.tsx`, …) để Next tách CSS chunk theo route.

Lợi ích: sửa một màn trong một file; route không dùng viewer không cần tải block viewer.  
File bị ảnh hưởng: `styles/globals.css`, `app/layout.tsx` (vẫn chỉ import globals), các page/client tương ứng.  
Rủi ro: trung bình. Thứ tự cascade và selector `html.theme-light` phải được giữ nguyên khi tách. Đo lại CSS của `/` và `/documents` sau khi tách.

Không chuyển sang CSS module hàng loạt trong cùng đợt. Class hiện là chuỗi toàn cục (`documents-page__title`). Đổi sang module sẽ đụng hàng trăm class mà không giảm byte nếu file vẫn được import global.

### 6.3 Những việc cố ý không làm

- Không tạo `lib/exam/`, `lib/lesson/`, `lib/belt/` trong đợt này. Prefix tên file đã phân nhóm. Dời hàng chục import không đổi hành vi.
- Không đổi `components/journey/WorldArtwork.tsx`. Component được journey và world dùng; đổi chỗ không giảm coupling.
- Không thêm lớp `services/` hay `models/`. API kết quả thi đã nằm trong `lib/exam-results.ts`. Type nằm trong `types/`.
- Không đổi `app/` ngoài việc giữ các route tương thích.

## 7. Hiệu năng và cách xử lý

Baseline từ `out/` lúc 2026-10-05. JS tính trên các thẻ script duy nhất của từng HTML. Gzip là gzip level 9 đo trên file local, chưa phải số từ CDN.

| Hạng mục | Số đo được | Ghi chú |
| --- | --- | --- |
| JS trang chủ, chưa nén | 792 KB (17 file) | Có chunk motion 120 KB và polyfills 110 KB |
| JS trang chủ, gzip-9 | 245 KB | |
| CSS toàn bộ `_next`, chưa nén / gzip-9 | 410 KB / 104 KB | 4 file; file lớn nhất 206 KB |
| HTML đề lớn nhất | 95 KB | `out/exam/official/hoang-1.html` và bản practice cùng cỡ |
| Ảnh world | 14,4 MB | 6 PNG |
| Logo | 706 KB | |
| Font preload mỗi HTML đã xem | 11 file | |
| Chunk PDF/mammoth trên `/documents` lúc mở trang | Không có trong HTML | `dynamic()` đang có tác dụng |
| Chunk html2canvas/jspdf trên `/profile` | Có trong HTML | Import tĩnh |

Chưa đo trong đợt này: thời gian `npm run build`, Lighthouse, LCP, INP, CLS, kích thước gzip trên mạng thật. Cách lấy nằm ở mục 8, Phase 4, và mục đo lường phía dưới.

### 7.1 Rendering

**Đồng hồ bài thi.** Tách ô đếm giờ thành component con giữ `now`, interval 1 giây vì `formatClock` hiển thị tới giây. Session chỉ re-render khi đổi câu, đổi đáp án, hoặc nộp bài.

**QuizEngine.** Sau khi thân câu chuyển sang `ExamQuestion`, `QuizEngine` còn phase, feedback và kết quả. Không thêm `memo` hàng loạt. Chỉ bọc widget nếu một profiler chỉ ra câu matching/ordering re-render cả đề.

**Admin list.** `useDeferredValue` và `useMemo` đã có. Giữ. Có thể nhớ kết quả theo `preset` trong bộ nhớ của trang để đổi tab thời gian rồi quay lại không JSONP lại. Làm sau khi đo thời gian `fetchExamResults`.

### 7.2 Bundle và mạng

**Chứng chỉ.** Đổi `lib/certificates.ts` thành hàm được gọi lúc bấm tải. `import('html2canvas')` và `import('jspdf')` nằm trong hai hàm download. Trang hồ sơ không còn hai chunk đó trong HTML ban đầu.

**Overlay shell.** `BeltCeremony` và `OnboardingModal` chuyển sang `next/dynamic`. Trang kỳ thi và tài liệu, vốn không import Framer Motion trực tiếp, có cơ hội bỏ chunk 120 KB. Trang chủ, hành trình, world, quiz, hồ sơ vẫn import motion ở component riêng; các trang đó không giảm phần này.

**Xác nhận nộp bài.** `postExamResult` nên xác nhận bằng `fetchExamAttemptData(record.id)` (endpoint `getAttemptData` đã có) thay vì `fetchExamResults()` không lọc. Form POST hiện resolve sau 2,5 giây dù server chưa trả kết quả. Giữ bước xác nhận; chỉ đổi độ lớn của request xác nhận. Nếu `getAttemptData` chưa trả bản ghi ngay sau POST, giữ fallback một lần fetch có lọc theo id hoặc khoảng thời gian hẹp, rồi mới báo lỗi.

**MDX config.** Bỏ `withMDX` sau khi build xanh. Đây là dependency và thời gian compile, không phải byte của trang chủ.

### 7.3 Asset

**World.** Sinh bản WebP (và giữ PNG làm fallback nếu cần) với bề rộng tối đa theo chỗ dùng: card khoảng 800 px, banner/hero khoảng 1.600 px. `WORLD_ARTWORK` trỏ tới bản đã resize. Làm trong `scripts/sync-assets.mjs` hoặc một bước build cạnh nó, vì `next/image` không tối ưu khi `output: 'export'`.

**Logo.** Xuất bản 32, 180 (apple) và bản hiển thị trong form (khoảng 160 px). Favicon không dùng file 706 KB.

**Lazy.** `WorldArtwork` đã đặt `loading="lazy"` khi không `priority`. Trên desktop, 6 node hành trình thường cùng nằm trong viewport, nên lazy không cứu băng thông. Nén ảnh mới là việc chính.

**Bản trùng repo.** Sau khi `dev` cũng chạy sync asset (hoặc một script `predev`), có thể ngừng commit sản phẩm generate. Không xóa `public/assets` trong đợt đầu.

### 7.4 CSS, font, animation

Tách CSS theo mục 6.2. Xóa selector đã xác nhận không có trên DOM (mục 4) trong cùng đợt để đo CSS giảm thật.

Font: liệt kê weight thực sự xuất hiện trong class (`font-medium`, `font-semibold`, `font-bold`). Bỏ weight không dùng khỏi `next/font`. Noto Serif TC đang `subsets: ['latin']`; chữ Hán trong bài sẽ rơi xuống fallback hệ thống. Việc thêm subset `chinese-traditional` làm font nặng hơn. Quyết định này là sản phẩm (độ đúng chữ Hán) trước khi tăng preload.

Animation mây: khi `prefers-reduced-motion` hoặc `use-app-reduced-motion`, bỏ luôn lớp `blur-3xl`, không chỉ dừng keyframe. Kiểm tra landing và journey trên máy yếu sau khi sửa.

### 7.5 Runtime

Không lập task “sửa memory leak” chung. Các listener đã đọc có cleanup. Việc runtime đáng làm là đồng hồ 250 ms và việc `postExamResult` kéo cả sheet.

`OfficialExamSession` effect chặn điều hướng cần đưa `finishLeftExam` vào dependency hoặc giữ trong ref, rồi bật lại rule `exhaustive-deps` cho effect đó. Đây là rủi ro bug khi sửa bài thi, đồng thời tránh closure cũ.

## 8. Implementation Plan

Mỗi phase xong phải build được và các test hiện có vẫn xanh. Không trộn phase 1 với việc nén ảnh.

### Phase 1 — Cleanup

#### 1.1 Xóa patch đã áp dụng

- Mục tiêu: bỏ file không còn vai trò.
- File: `lib/exam-results-view.ts.patch`.
- Bước: đối chiếu patch với `lib/exam-results-view.ts`; xóa file patch; chạy `lib/exam-results-view.test.ts`.
- Ưu tiên: Low. Rủi ro: Low.
- Nghiệm thu: không còn file `.patch`; test view kết quả xanh.

#### 1.2 Gỡ pipeline MDX không dùng

- Mục tiêu: một đường biên dịch MDX.
- File: `next.config.ts`, `package.json`, `package-lock.json`.
- Bước: bỏ `createMDX` / `withMDX`; giữ `pageExtensions` cần cho TS; build; nếu xanh thì gỡ `@next/mdx` và các package `@mdx-js/*` mà `npm ls` cho thấy không còn được `next-mdx-remote` cần.
- Ưu tiên: Medium. Rủi ro: Medium (build content).
- Nghiệm thu: `npm run build` xanh; một bài học MDX vẫn render; `next-mdx-remote` còn trong dependencies.

#### 1.3 Xóa CSS không còn gắn DOM

- Mục tiêu: giảm CSS chết đã liệt kê ở mục 4.
- File: `styles/globals.css`.
- Bước: với từng selector, tìm trong repo kể cả `content/**/*.mdx`; mở landing, journey, profile, documents, achievement, belt showcase; xóa block không xuất hiện; chụp hoặc so sánh các màn đó.
- Ưu tiên: Medium. Rủi ro: Medium (hồi quy giao diện).
- Nghiệm thu: selector đã xóa không còn trong file; các màn trên không mất style đang thấy trước khi xóa. Class ghép bằng template string còn nguyên.

#### 1.4 Sửa tài liệu lệch

- Mục tiêu: README mô tả đúng static export và form hiện tại.
- File: `README.md`. Comment trong `lib/exam-bank.ts`.
- Bước: bỏ React Hook Form; ghi `output: 'export'`; sửa comment thư mục ngân hàng thi.
- Ưu tiên: Low. Rủi ro: Low.
- Nghiệm thu: README không còn package không có trong `package.json`.

#### 1.5 Ignore công cụ local

- Mục tiêu: virtualenv và metadata IDE không lọt vào git status.
- File: `.gitignore`.
- Bước: thêm `.venv-image/`, `.venv-tts/`, `.idea/` nếu chúng chưa được track. Không xóa thư mục local.
- Ưu tiên: Low. Rủi ro: Low.
- Nghiệm thu: `git status` không liệt kê hai venv.

Script `diagnose-*` và `capture-reading-console.mjs` giữ nguyên trong phase này.

### Phase 2 — Architecture

#### 2.1 Thân câu quiz dùng ExamQuestion

- Mục tiêu: một chỗ render loại câu trắc nghiệm, điền, nối, sắp xếp.
- File: `components/quiz/QuizEngine.tsx`, `components/exam/ExamQuestion.tsx`, test `lib/quiz-engine.test.ts` nếu đổi contract đáp án.
- Bước: map state hiện tại của quiz (`selectedIndex`, fill, matching, order, true/false) sang `QuizAnswer` mà `ExamQuestion` nhận; giữ intro, feedback, kết quả, thành tích trong `QuizEngine`; so sánh hành vi nộp bài và xem đáp án với quiz hiện tại.
- Ưu tiên: High. Rủi ro: High (quiz là luồng học chính).
- Nghiệm thu: làm một bài có đủ loại câu đang có trong ngân hàng; điểm và thông báo đúng/sai giữ nguyên; `QuizEngine` không còn JSX lặp của bốn widget.

#### 2.2 Phần xem bài làm dùng chung

- Mục tiêu: một layout kết quả cho luyện và thi.
- File: `components/exam/PracticeAttemptView.tsx`, `components/exam/OfficialAttemptView.tsx`, page `app/exam/practice/attempt`, `app/exam/official/attempt`, `app/pqq-management/attempt`.
- Bước: tách phần hiển thị; official/admin giữ cách lấy attempt; admin vẫn gọi `fetchExamAttemptData`.
- Ưu tiên: High. Rủi ro: Medium.
- Nghiệm thu: học viên xem được bài local; admin xem được bài từ sheet; hai page không nhân đôi `STATUS_LABEL`.

#### 2.3 Khung điều hướng câu, nếu phần JSX còn trùng sau 2.1

- Mục tiêu: practice và official dùng chung thanh câu và modal xác nhận.
- File: `PracticeSession.tsx`, `OfficialExamSession.tsx`, có thể thêm `components/exam/ExamPager.tsx`.
- Bước: đọc hai file đến hết; chỉ rút phần giống hệt; giữ timer, pointer guard, popstate trong official.
- Ưu tiên: Medium. Rủi ro: Medium.
- Nghiệm thu: luyện đề không bị thoát khi đổi tab; thi chính thức vẫn thoát theo luật hiện tại.

#### 2.4 Chuyển UI tài liệu sang `components/documents`

- Mục tiêu: đúng mục 6.1.
- File: cụm document trong `components/profile`, `app/documents/page.tsx`.
- Bước: di chuyển, sửa import, không đổi props.
- Ưu tiên: Medium. Rủi ro: Low.
- Nghiệm thu: `/documents` mở PDF và DOCX như trước; `/profile` không import viewer.

#### 2.5 Siết type và dependency của phiên thi

- Mục tiêu: bỏ `props: any`; hết cảnh báo deps ở effect chặn điều hướng.
- File: `OfficialExamWrapper.tsx`, `OfficialExamSession.tsx`.
- Bước: khai báo props từ các field mà page official đang truyền; đưa callback thoát đề vào ref.
- Ưu tiên: Medium. Rủi ro: Low.
- Nghiệm thu: `tsc` không lỗi mới; rời trang khi đang thi vẫn kết thúc bài.

#### 2.6 Tách CSS theo màn

- Mục tiêu: đúng mục 6.2.
- File: `styles/globals.css` và các file css mới; component import tương ứng.
- Bước: cắt theo comment section hiện có; import file màn từ component màn; build; so kích thước CSS của `/` và `/documents`.
- Ưu tiên: High. Rủi ro: Medium.
- Nghiệm thu: token màu và `theme-light` còn hoạt động trên landing và một trang trong; CSS viewer không nằm trong stylesheet tải đầu của `/` nếu import đã tách đúng.

`server-only` cho `lib/content.ts` và `lib/exam-bank.ts` làm cùng phase này, ưu tiên Medium, rủi ro Low. Nghiệm thu: client component import nhầm hai file thì build fail.

### Phase 3 — Performance

#### 3.1 Ảnh world và logo

- Mục tiêu: giảm byte ảnh trên hành trình và favicon.
- File: `public/assets/worlds/*`, `assets/illustrations/*-world.png`, `public/logo.png`, `lib/constants.ts` (`WORLD_ARTWORK`), `scripts/sync-assets.mjs`, `app/layout.tsx`, `CandidateProfileForm.tsx`.
- Bước: xuất WebP đúng kích thước hiển thị; cập nhật src; favicon và apple icon dùng file nhỏ; đo tổng byte 6 ảnh và logo.
- Ưu tiên: Critical. Rủi ro: Medium (độ nét ảnh).
- Nghiệm thu: tổng 6 ảnh world nhỏ hơn rõ so với 14,4 MB (ghi số mới vào mục đo); journey và landing vẫn hiện đủ đai; favicon không còn file 706 KB.

#### 3.2 Tải trễ html2canvas và jsPDF

- Mục tiêu: `/profile` không tải hai chunk export trong HTML đầu.
- File: `lib/certificates.ts`, `components/profile/ProfilePageClient.tsx`.
- Bước: dynamic import bên trong hàm download; giữ UI nút tải.
- Ưu tiên: High. Rủi ro: Low.
- Nghiệm thu: HTML profile sau build không chứa chunk đã xác định là html2canvas/jspdf; bấm tải PNG và PDF vẫn ra file.

#### 3.3 Tải trễ ceremony và onboarding

- Mục tiêu: route không dùng motion trực tiếp bỏ chunk motion của shell.
- File: `components/layout/AppShell.tsx`.
- Bước: `next/dynamic` cho `BeltCeremony` và `OnboardingModal`; so script của `/documents` và `/exam` với `/`.
- Ưu tiên: High. Rủi ro: Medium (ceremony và modal phải hiện đúng lúc).
- Nghiệm thu: hoàn thành bài vẫn mở ceremony; onboarding lần đầu vẫn hiện; trang tài liệu không còn chunk motion nếu không còn import tĩnh nào khác.

#### 3.4 Đồng hồ thi

- Mục tiêu: hết `setState` cả session mỗi 250 ms.
- File: `OfficialExamSession.tsx`, có thể `components/exam/ExamTimer.tsx`.
- Bước: chuyển interval vào component đồng hồ; chu kỳ 1 giây; khi hết giờ vẫn gọi `submitDraft`.
- Ưu tiên: High. Rủi ro: Medium.
- Nghiệm thu: đồng hồ đếm từng giây; hết giờ vẫn nộp; React Profiler không còn update cả danh sách câu mỗi 250 ms.

#### 3.5 Xác nhận nộp bài theo id

- Mục tiêu: hết lần tải full sheet chỉ để tìm một id.
- File: `lib/exam-results.ts`, `scripts/google-apps-script/exam-results.gs` nếu endpoint id chưa trả dữ liệu ngay sau POST.
- Bước: xác nhận bằng `fetchExamAttemptData`; giữ một đường báo lỗi nếu bản ghi chưa xuất hiện.
- Ưu tiên: High. Rủi ro: Medium (mất kết quả nếu tin POST quá sớm).
- Nghiệm thu: nộp một bài thử, sheet có dòng mới; request xác nhận không phải bản không lọc của `fetchExamResults`.

#### 3.6 Font và mây

- Mục tiêu: ít file font preload hơn; giảm blur khi người dùng tắt chuyển động.
- File: `app/layout.tsx`, `components/animation/CloudLayer.tsx`, `styles/globals.css`.
- Bước: đếm weight đang dùng; bỏ weight thừa; với reduced motion, không render lớp blur.
- Ưu tiên: Medium. Rủi ro: Low với font nếu chỉ bỏ weight không xuất hiện trong class; Medium nếu đổi subset chữ Hán.
- Nghiệm thu: số link `rel=preload` as=font trên trang chủ giảm so với 11, hoặc ghi rõ weight nào phải giữ; bật reduced motion thì không còn animation mây.

### Phase 4 — Validation

Làm trên cùng máy, cùng lệnh, sau khi source sạch và đã cài dependency.

1. Xóa `out/` và `.next/`, chạy `npm run build`, ghi thời gian wall clock.
2. Chạy `npm run lint` và `npx tsc --noEmit`.
3. Chạy `npm test`.
4. Với `out/` mới, lặp lại phép đo ở mục dưới: JS từng route, CSS, HTML đề lớn nhất, tổng ảnh world, số font preload, sự có mặt của chunk html2canvas trên `/profile` và chunk motion trên `/documents`.
5. Đi các luồng: landing, journey (6 đai), một bài học + quiz, luyện một rank, thi official đến lúc nộp hoặc thoát, mở một PDF và một DOCX, tải chứng chỉ PNG/PDF, trang quản trị nếu đã cấu hình `NEXT_PUBLIC_EXAM_RESULTS_URL`.
6. Lighthouse trên bản static serve (`npx serve out`) cho `/`, `/journey`, `/documents`, `/profile`, một trang bài học. Ghi LCP, INP, CLS. Bản `out/` tháng 10 không dùng làm số “sau”.

Ưu tiên: Critical cho bước đo, vì không có baseline mới thì các phase trên không chốt được. Rủi ro: Low.

Nghiệm thu: build, lint, typecheck, test xanh; bảng số trước/sau được điền bằng lệnh vừa chạy; các luồng trên thao tác được.

## Đo lường hiệu quả

Số đã có, từ `out/` ngày 2026-10-05, ghi lại để khỏi đo nhầm thành hiện trạng tháng 11:

| Chỉ số | Baseline cũ | Cách đo lại |
| --- | --- | --- |
| Build time | Chưa đo | `time npm run build` sau khi xóa `.next` và `out` |
| JS trang chủ | 792 KB thô, 245 KB gzip-9, 17 file | Cộng các script `/_next/static/...js` trong `out/index.html`, rồi gzip |
| JS `/profile` thêm | chunk 194 KB + 322 KB có trong HTML | Tìm hash chunk chứa `html2canvas` / `jspdf` |
| JS motion | chunk 120 KB trên mọi HTML đã xem | Tìm chunk chứa `MotionValue` |
| CSS | 410 KB thô, 104 KB gzip-9, 4 file | `out/_next/static/css` hoặc đường dẫn tương đương của bản build mới |
| HTML đề | tới 95 KB (`hoang-1`) | `out/exam/**/*.html` |
| Ảnh world | 14,4 MB | tổng `public/assets/worlds/*.png` (hoặc WebP thay thế) |
| Logo | 706 KB | `public/logo.png` và icon mới |
| Font preload | 11 link mỗi trang đã xem | đếm `as="font"` trong HTML |
| Lighthouse / LCP / INP / CLS | Chưa đo | Lighthouse mobile và desktop trên `serve out` |
| Dòng CSS | 5.665 trong `styles/globals.css` | `wc -l` sau khi tách và xóa selector chết |
| File chết | 1 patch đã xác nhận | không còn `.patch` |
| Dependency không dùng | `@next/mdx` là ứng viên; chưa gỡ | `npm ls` sau phase 1.2 |
| Code trùng | QuizEngine 784 dòng so với ExamQuestion 196 dòng | sau 2.1, QuizEngine không còn bốn khối render widget |

Không đặt mục tiêu phần trăm trước khi có bản build mới. Sau Phase 3, điền cột “sau” bằng cùng công thức với cột baseline mới của Phase 4 bước 1, không so với số tháng 10 như thể đó là hiện trạng ngay trước khi sửa.

## Kết quả đo sau khi áp dụng

Đo trên `out/` xuất ngày 2026-11-12, sau `rm -rf out .next` rồi `npm run build`. Thời gian wall clock của lần build sạch đó: **30,79 giây**. Lint và `tsc --noEmit` xanh. `npm test`: 129 pass, 7 fail trong `lib/exam-bank.test.ts` và `lib/quiz-builder.test.ts` vì ngân hàng và quiz đang sinh ra không khớp assertion cũ. Các file kiến trúc không đổi nội dung câu hỏi. `styles/globals.css` còn 1.477 dòng. Không còn file `.patch`. `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react` đã gỡ. `server-only` đã thêm.

| Chỉ số | Bản export này |
| --- | --- |
| JS trang chủ | 775 KB thô, 239 KB gzip-9, 15 script |
| JS `/documents` | 654 KB thô, 199 KB gzip-9, 15 script. Không có chunk motion, không có chunk trang chủ |
| JS `/journey` | 661 KB thô, 203 KB gzip-9, 15 script |
| JS `/exam` | 646 KB thô, 198 KB gzip-9, 15 script |
| JS `/profile` | 794 KB thô, 246 KB gzip-9, 17 script. HTML không chứa `html2canvas` hay `jspdf` |
| CSS trang chủ | 341 KB thô, 94 KB gzip-9, 5 file. File lớn nhất 206 KB |
| HTML đề lớn nhất | 103 KB (`exam/official/hoang-1.html`) |
| Ảnh world | PNG gốc 15.074.892 byte vẫn giữ. WebP 1600px: 887.360 byte, 6 file |
| Logo | `logo.png` 722.853 byte giữ. `logo-32.png` 3.337, `logo-180.png` 87.364, `logo-320.png` 269.491 |
| Font preload | 10 link `as="font"` mỗi trang đã xem. Noto Serif TC không preload |
| Lighthouse | Chưa chạy trong lượt này |

Bài học MDX (19), `content/practice-bank` (19) và `content/official-bank` (19) còn nguyên. `public/logo.png` và PNG world còn trên đĩa.
