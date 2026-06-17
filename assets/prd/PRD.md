# Product Requirement Document (PRD)

## Website Học Lý Thuyết Võ Đạo — Môn Phái Phật Quang Quyền

| Thuộc tính | Giá trị |
|------------|---------|
| **Phiên bản** | 1.0 |
| **Ngày tạo** | 16/06/2026 |
| **Trạng thái** | Draft — Sẵn sàng triển khai MVP |
| **Deliverable** | Frontend-only Static Site |
| **Tài liệu nguồn** | [`assets/doc/`](../doc/) (19 file lý thuyết thi thăng cấp) |
| **Logo** | [`assets/image/logo.jpg`](../image/logo.jpg) |

---

## Mục lục

1. [Product Vision](#1-product-vision)
2. [User Personas](#2-user-personas)
3. [User Journey](#3-user-journey)
4. [Information Architecture](#4-information-architecture)
5. [UX/UI Concept](#5-uxui-concept)
6. [Animation & Motion Design System](#6-animation--motion-design-system)
7. [Gamification Strategy](#7-gamification-strategy)
8. [Lesson Experience](#8-lesson-experience)
9. [Quiz Experience](#9-quiz-experience)
10. [Local Storage Strategy](#10-local-storage-strategy)
11. [Frontend Architecture](#11-frontend-architecture)
12. [Content Structure](#12-content-structure)
13. [Design System](#13-design-system)
14. [MVP Scope](#14-mvp-scope)
15. [Wireframes](#15-wireframes)
16. [Future Roadmap](#16-future-roadmap)
- [Phụ lục A: Risk Assessment](#phụ-lục-a-risk-assessment)
- [Phụ lục B: Trade-off Analysis](#phụ-lục-b-trade-off-analysis)
- [Phụ lục C: Success Metrics](#phụ-lục-c-success-metrics)
- [Phụ lục D: Glossary](#phụ-lục-d-glossary)

---

## 1. Product Vision

### 1.1 Tầm nhìn

> **"Hành trình võ đạo trong túi áo."**

Website học lý thuyết Võ Đạo Phật Quang Quyền (PQQ) không phải là một nền tảng e-learning thông thường. Đây là một **hành trình võ đạo** — nơi môn sinh cảm nhận mình đang bước trên con đường võ đường, vượt qua từng thử thách, tích lũy kiến thức và trưởng thành qua từng cấp đai.

Người học **không** nên cảm thấy: *"Tôi đang đọc tài liệu PDF."*

Người học **phải** cảm thấy: *"Tôi đang bước trên hành trình võ đạo."*

### 1.2 Giá trị cốt lõi

| Giá trị | Định nghĩa | Biểu hiện trong sản phẩm |
|---------|------------|--------------------------|
| **Trang nghiêm** | Tôn vinh tinh thần và truyền thống PQQ | Thiết kế cinematic, không gamify thô tục; ngôn ngữ tôn kính |
| **Tiến bộ có ý nghĩa** | Mỗi bước = một bước trưởng thành thật | Journey map, nghi thức thăng cấp đai; không XP vô nghĩa |
| **Truy cập dễ** | Ai cũng học được, kể cả người không rành công nghệ | Mobile-first, không đăng ký, UI trực quan |
| **Tự chủ** | Người học làm chủ hành trình của mình | Dữ liệu trên thiết bị; không phụ thuộc server |
| **Tinh thông** | Mục tiêu là hiểu và nhớ, không phải hoàn thành cho xong | Quiz đánh giá kiến thức; feedback câu sai kèm đáp án |

### 1.3 Product Positioning

```
┌─────────────────────────────────────────────────────────────────┐
│                    THỊ TRƯỜNG HỌC TẬP SỐ                       │
├─────────────────────────────────────────────────────────────────┤
│  LMS Doanh nghiệp          │  E-learning thương mại            │
│  (Moodle, Canvas)          │  (Udemy, Coursera)                │
│  ─────────────────         │  ─────────────────                │
│  Dashboard, báo cáo,         │  Video, subscription,             │
│  quản lý lớp học             │  chứng chỉ thương mại             │
├─────────────────────────────────────────────────────────────────┤
│              ★ PQQ THEORY JOURNEY ★                             │
│              Journey-based Martial Arts Theory Companion        │
│              ─────────────────────────────────────              │
│              Storytelling · Virtue · Ceremony · Static · Free   │
└─────────────────────────────────────────────────────────────────┘
```

**Positioning statement:**

*Dành cho môn sinh Phật Quang Quyền ở mọi cấp đai, PQQ Theory Journey là website học lý thuyết dạng hành trình võ đạo giúp ôn tập và nắm vững kiến thức thi thăng cấp. Khác với LMS truyền thống hay e-learning thương mại, sản phẩm này biến việc học lý thuyết thành một cuộc hành trình có cảm xúc — qua hệ thống 6 màu đai, nghi thức thăng cấp và gamification đạo đức.*

### 1.4 Điểm khác biệt

| Tiêu chí | Website thông thường | PQQ Theory Journey |
|----------|---------------------|-------------------|
| Cảm giác sử dụng | Đọc tài liệu / xem video | Bước trên hành trình võ đạo |
| Cấu trúc nội dung | Chương / Module phẳng | hệ thống 6 màu đai có storytelling |
| Tiến độ | Progress bar % | Vị trí trên con đường + avatar |
| Phần thưởng | XP, streak, leaderboard | Huy hiệu đức tính, nghi thức thăng cấp |
| Dữ liệu | Tài khoản, cloud, backend | LocalStorage, static, offline-ready |
| Thẩm mỹ | Dashboard, card grid | Cinematic, võ đạo, thiền định |
| Mục tiêu | Hoàn thành khóa học | Tinh thông kiến thức + trưởng thành đạo đức |

### 1.5 Ràng buộc sản phẩm

| Có | Không |
|----|-------|
| Frontend Only | Backend |
| Static Site (SSG) | Database |
| Markdown / MDX | Authentication |
| Hình ảnh 2D minh họa | CMS |
| Trắc nghiệm | Video |
| LocalStorage / IndexedDB | API |
| Animation 2D | LMS truyền thống |
| Chứng nhận client-side | Dashboard doanh nghiệp |

---

## 2. User Personas

### 2.1 Persona 1 — Môn sinh mới

| | |
|---|---|
| **Tên** | Nguyễn Minh Tuấn |
| **Tuổi** | 12 |
| **Vai trò** | Võ sinh mới, đai nâu, lần đầu ôn lý thuyết thi thăng cấp |
| **Thiết bị** | iPhone của bố mẹ, WiFi nhà |
| **Kỹ năng công nghệ** | Thấp — quen TikTok, chưa từng dùng LMS |

**Goals:**
- Hiểu lý thuyết để thi lên Lam Đai Đệ Nhất Cấp
- Biết mình đã học đến đâu, còn thiếu gì
- Học trên điện thoại sau giờ tập võ

**Motivations:**
- Muốn được thăng cấp đai, được thầy khen
- Tò mò về lịch sử môn phái
- Thích hình ảnh đẹp, có cảm giác "phiêu lưu"

**Pain Points:**
- Tài liệu Word/PDF khó đọc trên điện thoại
- Không biết đã thuộc bao nhiêu câu hỏi
- Dễ chán khi đọc liền 12 câu dài
- Sợ thi không đậu

**Behaviors:**
- Học 10–15 phút/lần, thường buổi tối
- Cần nhắc nhở trực quan (tiến độ, huy hiệu)
- Hay bỏ dở giữa chừng nếu UI phức tạp

**Design Implications:**
- Font lớn (18px+), nút to, ít chữ trên màn hình
- Onboarding 3 bước: "Chọn tên → Xem hành trình → Bắt đầu bài 1"
- Chia bài học thành section ngắn (1 câu hỏi = 1 section)
- Animation khuyến khích, không gây áp lực thời gian

---

### 2.2 Persona 2 — Môn sinh lâu năm

| | |
|---|---|
| **Tên** | Trần Thị Lan |
| **Tuổi** | 28 |
| **Vai trò** | Môn sinh Lam Đai 3, chuẩn bị thi lên Lam Đai 4 |
| **Thiết bị** | Android + Laptop |
| **Kỹ năng công nghệ** | Trung bình |

**Goals:**
- Ôn nhanh toàn bộ lý thuyết từ đai nâu đến hiện tại
- Làm quiz lặp lại để ghi nhớ câu khó
- Theo dõi điểm yếu (câu hay sai)

**Motivations:**
- Thi thăng cấp trong 2 tuần tới
- Muốn đạt điểm cao, tự tin trước giám khảo
- Trân trọng giá trị môn phái

**Pain Points:**
- Phải lật nhiều file Word cũ để ôn
- Không có cách nào biết câu nào hay quên
- PDF không có quiz tự kiểm tra

**Behaviors:**
- Ôn tập tập trung 30–45 phút
- Làm quiz nhiều lần cho đến khi đạt 100%
- Dùng cả mobile lẫn desktop

**Design Implications:**
- Quiz retry không giới hạn, không phạt
- Hiển thị lịch sử điểm và câu hay sai
- Jump navigation: nhảy đến bất kỳ bài đã unlock
- Desktop layout tối ưu cho đọc lâu

---

### 2.3 Persona 3 — Huấn luyện viên

| | |
|---|---|
| **Tên** | Võ sư Minh |
| **Tuổi** | 45 |
| **Vai trò** | HLV phụ trách lớp thiếu niên, 20–30 môn sinh |
| **Thiết bị** | iPad + Laptop |
| **Kỹ năng công nghệ** | Trung bình — dùng Zalo, Facebook |

**Goals:**
- Giới thiệu công cụ học lý thuyết cho môn sinh
- Kiểm tra môn sinh đã ôn chưa (demo local)
- In chứng nhận hoàn thành lý thuyết

**Motivations:**
- Giảm tỷ lệ môn sinh thi trượt lý thuyết
- Chuẩn hóa nội dung ôn tập
- Tôn vinh hành trình học tập của môn sinh

**Pain Points:**
- Phải in tài liệu giấy, môn sinh hay mất
- Không biết ai đã ôn, ai chưa (không có backend)
- Lo ngại môn sinh nhỏ dùng điện thoại nhiều

**Behaviors:**
- Chia sẻ link website qua Zalo nhóm lớp
- Hướng dẫn môn sinh mở trên điện thoại
- Yêu cầu môn sinh chụp màn hình kết quả quiz

**Design Implications:**
- Landing page giải thích rõ cách dùng (HLV-friendly)
- Chứng nhận có thể tải/in (PDF hoặc PNG)
- Export progress JSON để môn sinh gửi HLV (Phase 1 Should Have)
- Không yêu cầu đăng nhập — phù hợp quy mô lớp

---

### 2.4 Persona 4 — Người yêu thích võ đạo

| | |
|---|---|
| **Tên** | Lê Hoàng Khách |
| **Tuổi** | 35 |
| **Vai trò** | Phật tử, quan tâm văn hóa võ thuật Phật giáo |
| **Thiết bị** | Desktop |
| **Kỹ năng công nghệ** | Cao |

**Goals:**
- Tìm hiểu triết lý và lịch sử Phật Quang Quyền
- Khám phá hệ thống đai và giá trị môn phái
- Chia sẻ với bạn bè

**Motivations:**
- Tò mò về môn phái kết hợp Phật giáo và võ thuật
- Thích trải nghiệm thiết kế đẹp
- Không có ý định thi thăng cấp

**Behaviors:**
- Duyệt landing và 1–2 cấp đai
- Đọc nội dung bài Nâu Đai (giới thiệu môn phái)
- Có thể không làm quiz

**Design Implications:**
- Landing page storytelling mạnh — giới thiệu PQQ
- Cho phép đọc bài Nâu Đai không cần unlock (free preview)
- Trang About môn phái (Nice To Have)
- SEO-friendly cho tìm kiếm "Phật Quang Quyền lý thuyết"

---

## 3. User Journey

### 3.1 Primary Flow — End to End

```
                              ┌──────────────┐
                              │  LANDING     │
                              │  Trang chủ   │
                              └──────┬───────┘
                                     │ Tap "Bắt đầu hành trình"
                                     ▼
                              ┌──────────────┐
                              │  JOURNEY     │
                              │  Bản đồ 6    │
                              │  thế giới    │
                              └──────┬───────┘
                                     │ Chọn cấp đai (unlocked)
                                     ▼
                              ┌──────────────┐
                              │  BELT WORLD  │
                              │  4 bài học   │
                              │  + đức tính  │
                              └──────┬───────┘
                                     │ Chọn bài học (unlocked)
                                     ▼
                              ┌──────────────┐
                              │  LESSON      │
                              │  Đọc MDX     │
                              │  + progress  │
                              └──────┬───────┘
                                     │ Scroll 80%+ → "Làm bài kiểm tra"
                                     ▼
                              ┌──────────────┐
                              │  QUIZ        │
                              │  Trắc nghiệm │
                              └──────┬───────┘
                                     │
                    ┌────────────────┴────────────────┐
                    │                                 │
                    ▼                                 ▼
             ┌─────────────┐                   ┌─────────────┐
             │  PASS ≥70%  │                   │  FAIL <70%  │
             │  ✓ Unlock   │                   │  ↻ Retry    │
             └──────┬──────┘                   └──────┬──────┘
                    │                                 │
                    │                                 └──► Quay lại Lesson
                    ▼
             ┌─────────────┐
             │ ACHIEVEMENT │
             │ + Badge     │
             └──────┬──────┘
                    │
          ┌─────────┴─────────┐
          │                   │
          ▼                   ▼
   ┌─────────────┐     ┌─────────────┐
   │ Bài tiếp    │     │ Hoàn thành  │
   │ theo unlock │     │ cả thế giới │
   └─────────────┘     └──────┬──────┘
                              │
                              ▼
                       ┌─────────────┐
                       │ Nghi thức   │
                       │ thăng cấp   │
                       │ đai + mở    │
                       │ thế giới mới│
                       └─────────────┘
```

### 3.2 Unlock Logic Flow

```
Bắt đầu
  │
  ▼
[Nâu Đai — Bài 01] ─── mặc định UNLOCKED
  │
  ├── Đọc ≥80% nội dung
  └── Quiz ≥70% ──► UNLOCK [Lam Đai Bài 01]
                        │
                        ├── Quiz ≥70% ──► UNLOCK [Lam Đai Bài 02]
                        │                      │
                        │                      ├── ... ──► [Lam Đai Bài 04]
                        │                      │
                        │                      └── Hoàn thành 4 bài
                        │                           ──► UNLOCK [Lục Đai World]
                        │                           ──► Achievement "Khiêm Hạ"
                        │
                        └── (lặp cho hệ thống 6 màu đai)
  │
  └── Hoàn thành tất cả 19 bài
       ──► Achievement "Bậc Thầy Lý Thuyết"
       ──► Certificate tổng kết
```

### 3.3 Emotional Journey Map

| Giai đoạn | Cảm xúc mong muốn | Touchpoint | Animation |
|-----------|-------------------|------------|-----------|
| Landing | Tò mò, cảm hứng | Hero illustration, CTA | Mây trôi, fade-in |
| Journey | Háo hức, định hướng | Path map, locked worlds | Path glow, parallax |
| Belt World | Ngưỡng mộ, trang nghiêm | World illustration, virtues | Header parallax |
| Lesson | Tập trung, th absorb | MDX content, progress | Scroll progress spring |
| Quiz | Hồi hộp nhẹ, tự tin | Questions, feedback | Slide transition |
| Pass | Vui mừng, tự hào | Results, badge | Badge reveal + light |
| Fail | Khích lệ, không nản | Wrong answers review | Gentle shake, warm message |
| Belt Complete | Trang nghiêm, tự hào | Ceremony overlay | Fullscreen ritual 3s |

### 3.4 Edge Cases

| Tình huống | Hành vi hệ thống |
|------------|------------------|
| Quay lại bài đã hoàn thành | Cho phép đọc lại + làm quiz lại (ghi đè điểm cao nhất) |
| Làm quiz khi chưa đọc 80% | Cảnh báo nhẹ: "Nên đọc kỹ bài học trước" — vẫn cho phép |
| Xóa dữ liệu trình duyệt | Mất toàn bộ tiến độ — hiển thị thông báo trên Profile |
| `prefers-reduced-motion` | Tắt parallax, Lottie; giữ fade cơ bản |
| Offline (Phase 1) | Không hỗ trợ — Phase 2 PWA |
| Mở link quiz trực tiếp | Redirect về lesson nếu chưa unlock |

---

## 4. Information Architecture

### 4.1 Sitemap

```
/  (Landing Page)
│
├── /journey ........................ Bản đồ hành trình hệ thống 6 màu đai
│
├── /world/[belt] ................... Belt World Page
│   │   belt = brown | blue | green | red | yellow | white
│   │
│   └── /world/[belt]/[lesson] ...... Lesson Page
│       │   lesson = lesson-01 | lesson-02 | lesson-03 | lesson-04
│       │
│       └── /world/[belt]/[lesson]/quiz ... Quiz Page
│
├── /achievements ................... Achievement Page
│
├── /profile ........................ Profile Page
│
└── /about .......................... About PQQ (Nice To Have)
```

### 4.2 URL Convention

| Trang | URL ví dụ |
|-------|-----------|
| Landing | `/` |
| Journey | `/journey` |
| Belt World — Nâu Đai | `/world/brown` |
| Belt World — Xanh Lam | `/world/blue` |
| Lesson — Lam Đai Đệ Nhất Cấp | `/world/blue/lesson-01` |
| Quiz — Lam Đai Đệ Nhất Cấp | `/world/blue/lesson-01/quiz` |
| Achievements | `/achievements` |
| Profile | `/profile` |

### 4.3 Navigation Structure

**Mobile — Bottom Tab Bar (4 items):**

```
┌────────┬────────┬────────┬────────┐
│ Hành   │  Học   │ Thành  │  Hồ    │
│ trình  │        │  tựu   │  sơ    │
│  🗺️    │  📖    │  🏅    │  👤    │
└────────┴────────┴────────┴────────┘
```

| Tab | Route | Mô tả |
|-----|-------|-------|
| Hành trình | `/journey` | Bản đồ hệ thống 6 màu đai |
| Học | `/world/[current-belt]` | Thế giới đai hiện tại |
| Thành tựu | `/achievements` | Huy hiệu & cột mốc |
| Hồ sơ | `/profile` | Tiến độ, chứng nhận, cài đặt |

**Desktop — Side Rail + Top Breadcrumb:**

```
┌──────────┬────────────────────────────────────────┐
│ Side     │  Breadcrumb: Hành trình > Xanh Lam >   │
│ Rail     │              Bài 1                   │
│          ├────────────────────────────────────────┤
│ 🗺️ Hành  │                                        │
│    trình │           Main Content                 │
│ 📖 Học   │                                        │
│ 🏅 Thành │                                        │
│    tựu   │                                        │
│ 👤 Hồ sơ │                                        │
└──────────┴────────────────────────────────────────┘
```

### 4.4 Page Inventory

| # | Trang | Mục đích | Priority |
|---|-------|----------|----------|
| 1 | Landing Page | Giới thiệu, CTA, preview worlds | Must Have |
| 2 | Journey Page | Bản đồ tổng thể, định hướng | Must Have |
| 3 | Belt World Page | Hub bài học theo đai | Must Have |
| 4 | Lesson Page | Đọc nội dung MDX | Must Have |
| 5 | Quiz Page | Kiểm tra kiến thức | Must Have |
| 6 | Achievement Page | Huy hiệu, cột mốc | Should Have |
| 7 | Profile Page | Tiến độ, chứng nhận, settings | Should Have |
| 8 | About Page | Giới thiệu môn phái | Nice To Have |

---

## 5. UX/UI Concept

### 5.1 Creative Direction

**Keywords:** Cinematic · Võ đạo · Thiền định · Hành trình võ đạo · Storytelling · Premium · Gamification nhẹ

**Anti-patterns (tránh):**
- Sidebar dashboard kiểu LMS
- Card grid với progress % everywhere
- Màu xanh dương corporate (#0066CC)
- Font sans-serif thuần túy không có serif display
- Icon generic (Font Awesome default)
- Leaderboard, XP counter, streak fire

### 5.2 Moodboard (Mô tả)

| Element | Mô tả |
|---------|-------|
| **Không khí** | Sương mù buổi sáng trên võ đường, ánh nắng xuyên mây |
| **Texture** | Giấy washi, mực tàu wash painting, grain nhẹ |
| **Hình ảnh** | Silhouette võ sĩ 2D, phong cảnh Việt Nam stylized |
| **Ánh sáng** | Hoàng hôn vàng ấm, rim light trên nhân vật |
| **Không gian** | Negative space rộng — thiền định, không chen chúc |
| **Reference** | Ghost of Tsushima UI mood · Journey game · Mực tàu Nhật-Việt fusion |

### 5.3 Color System

#### Neutral Palette (toàn site)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg-primary` | `#0F0E0C` | Background chính (dark cinematic) |
| `--color-bg-secondary` | `#1A1814` | Card, panel background |
| `--color-bg-elevated` | `#252219` | Modal, dropdown |
| `--color-text-primary` | `#F5F0E8` | Body text |
| `--color-text-secondary` | `#A89F8F` | Caption, metadata |
| `--color-text-muted` | `#6B6358` | Disabled, placeholder |
| `--color-border` | `#2E2A24` | Divider, border |

#### Belt World Palettes

| Thế giới | Primary | Accent | Surface | Mood |
|----------|---------|--------|---------|------|
| **Nâu Đai** | `#6B4423` | `#D4A574` | `#2A1F14` | Võ đường gỗ, đất |
| **Xanh Lam** | `#1E4D7B` | `#5BA4CF` | `#0F1A24` | Dòng nước, sương |
| **Xanh Lục** | `#2D5A3D` | `#7CB68E` | `#142018` | Rừng trúc, lá |
| **Hồng Đai** | `#8B2500` | `#E85D04` | `#1F1008` | Biển lửa, hoàng hôn |
| **Hoàng Đai** | `#B8860B` | `#FFD700` | `#1F1A08` | Núi vàng, ánh sáng |
| **Bạch Đai** | `#E8E0D0` | `#FFFFFF` | `#F5F0E8` | Hoa sen, thanh khiết |

> **Lưu ý Bạch Đai:** Cấp cuối dùng nền sáng (light mode) — tương phản với 5 cấp trước (dark). Tượng trưng cho thanh khiết, giác ngộ.

#### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-success` | `#4A9B6E` | Quiz pass, hoàn thành |
| `--color-warning` | `#C4922A` | Cảnh báo, chưa đọc xong |
| `--color-error` | `#B54A4A` | Quiz fail (dùng nhẹ, không đỏ chói) |
| `--color-unlock` | `#FFD700` | Glow unlock, achievement |

### 5.4 Typography

| Role | Font | Weight | Size (Mobile) | Size (Desktop) |
|------|------|--------|---------------|----------------|
| **Display** | Noto Serif Vietnamese | 700 | 28–36px | 40–56px |
| **Heading H1** | Noto Serif Vietnamese | 600 | 24px | 32px |
| **Heading H2** | Noto Serif Vietnamese | 600 | 20px | 24px |
| **Body** | Be Vietnam Pro | 400 | 16–18px | 18px |
| **Body Large** | Be Vietnam Pro | 400 | 18px | 20px |
| **Caption** | Be Vietnam Pro | 400 | 14px | 14px |
| **Label** | Be Vietnam Pro | 600 | 12px | 12px |
| **Mono** | JetBrains Mono | 400 | 14px | 14px |

**Line height:** Body 1.7 · Headings 1.3 · Caption 1.5

**Accessibility:** Toggle font size Normal / Large (+2px all) trên Profile.

### 5.5 Illustration Style

| Thuộc tính | Quy tắc |
|------------|---------|
| Kỹ thuật | Flat 2D + gradient wash, line art mực |
| Layers | 3–5 parallax layers mỗi cấp đai |
| Nhân vật | Silhouette, không chi tiết khuôn mặt — universal |
| Màu | Theo palette thế giới, gradient mềm |
| Format | SVG (preferred) hoặc WebP optimized |
| Kích thước | Hero: 1440×800, Thumbnail: 400×300 |
| **Cấm** | 3D render, ảnh stock, anime style, chibi |

#### Illustration per World

| Thế giới | Scene | Elements |
|----------|-------|----------|
| Nâu Đai | Khởi đầu | Sân gỗ, đối khung, mặt trời mọc, sương mù |
| Xanh Lam | Dòng nước | Suối, đá, bamboo, reflection, sương nước |
| Xanh Lục | Rừng trúc | Tre trúc, lá rơi, ánh sáng xuyên tán |
| Hồng Đai | Biển lửa | Hoàng hôn, sóng lửa stylized, núi phía xa |
| Hoàng Đai | Núi vàng | Đỉnh núi, mây vàng, ánh sáng divine |
| Bạch Đai | Hoa sen | Ao sen, hoa nở, ánh sáng trắng, chim |

### 5.6 Visual Language

| Element | Spec |
|---------|------|
| Border radius | 12px (card), 8px (button), 999px (pill/badge) |
| Shadow | `0 4px 24px rgba(0,0,0,0.3)` — subtle, warm |
| Border | 1px solid `--color-border`, opacity 0.5 |
| Overlay | `rgba(15,14,12,0.7)` trên illustration |
| Icon style | Line icon, 1.5px stroke, rounded cap |
| Spacing | 4px grid: 4, 8, 12, 16, 24, 32, 48, 64 |
| Max content width | 680px (lesson), 1200px (journey) |

### 5.7 Per-Page UX Specification

#### 5.7.1 Landing Page

| | Mobile | Desktop |
|---|--------|---------|
| **Layout** | Full-viewport hero stack | Hero 60vh + worlds preview below |
| **Hero** | Logo PQQ centered, tagline, CTA full-width | Logo left, tagline + CTA right, illustration bg |
| **CTA** | "Bắt đầu hành trình" — primary button | Same, larger |
| **Worlds preview** | Horizontal scroll 6 cards | Grid 3×2 |
| **Footer** | Logo + "Phật Quang Quyền © 2026" | Same + link About |

**Animation hooks:** Mây trôi background, fade-in hero text stagger 200ms, CTA pulse glow subtle.

#### 5.7.2 Journey Page

| | Mobile | Desktop |
|---|--------|---------|
| **Layout** | Vertical path scroll | Vertical path centered, wider |
| **Path** | Zigzag nodes connected by SVG path | Same, larger nodes |
| **Nodes** | 6 world nodes + avatar marker | Same |
| **States** | Locked (grey + 🔒), Active (glow), Completed (✓ + gold) | Same |
| **Interaction** | Tap unlocked node → Belt World | Click → Belt World |

**Animation hooks:** Path draw-on-scroll, avatar `layoutId` transition, parallax bg layers, unlock celebration.

#### 5.7.3 Belt World Page

| | Mobile | Desktop |
|---|--------|---------|
| **Layout** | Hero illustration top + lesson list below | Hero 40vh + 2-column (info + lessons) |
| **Header** | World name, virtue tags, progress ring | Same + larger illustration |
| **Lessons** | Vertical timeline 4 nodes | Vertical timeline with detail panel |
| **Progress** | Linear bar + "2/4 bài hoàn thành" | Circular progress + stats |

**Animation hooks:** Header parallax on scroll, lesson node stagger reveal, active lesson pulse.

#### 5.7.4 Lesson Page

| | Mobile | Desktop |
|---|--------|---------|
| **Layout** | Single column full-width | Content 680px + sticky TOC sidebar 240px |
| **Header** | Lesson title, belt badge, est. time | Same + breadcrumb |
| **Content** | MDX rendered, section headings | Same with TOC sidebar |
| **Progress** | Sticky top bar (scroll %) | Same |
| **Footer CTA** | Sticky bottom: "Làm bài kiểm tra" | Inline at content end |
| **Navigation** | ← Bài trước · Bài sau → | Same in sidebar |

**Animation hooks:** Scroll progress spring, section fade-in on scroll, page transition slide-up.

#### 5.7.5 Quiz Page

| | Mobile | Desktop |
|---|--------|---------|
| **Layout** | 1 question per screen | 1 question centered, max 600px |
| **Progress** | "Câu 3/12" top bar | Same |
| **Question** | Full-width text + 4 option buttons | Same, larger touch targets |
| **Feedback** | Immediate on select: green/red highlight | Same |
| **Results** | Score circle + pass/fail + detail | Same, wider layout |
| **Timer** | Không có — tránh áp lực | Không có |

**Animation hooks:** Question slide-left/right, option scale on select, results reveal scale.

#### 5.7.6 Profile Page

| | Mobile | Desktop |
|---|--------|---------|
| **Layout** | Stack sections | 2-column: stats left, certificates right |
| **Sections** | Avatar placeholder, name, current belt, overall % | Same |
| | Progress per world (6 mini bars) | Same |
| | Achievements grid (earned + locked) | Same, larger grid |
| | Certificates downloadable | Same |
| | Settings: font size, reduced motion, export/import, reset | Same |

**Animation hooks:** Progress bars animate on mount, achievement badges stagger.

---

## 6. Animation & Motion Design System

### 6.1 Triết lý Motion

> *"Chuyển động như hơi thở — có nhịp điệu, không vội vã, tôn trọng sự tĩnh lặng."*

Animation phục vụ storytelling và feedback, không phục vụ gây chú ý liên tục. Mọi animation phải:
- Có mục đích (orient, feedback, celebrate, transition)
- Tôn trọng `prefers-reduced-motion: reduce`
- Chạy trên GPU (`transform`, `opacity` — tránh `width`, `height`, `top`)
- Không block interaction

### 6.2 Motion Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-instant` | 100ms | Hover, focus |
| `--duration-fast` | 200ms | Button press, toggle |
| `--duration-normal` | 300ms | Page transition, slide |
| `--duration-slow` | 500ms | Modal open, reveal |
| `--duration-ceremony` | 800ms–3s | Belt promotion, achievement |
| `--ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | General |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bounce reveal |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Enter |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Exit |

### 6.3 Global Animations

| Animation | Kỹ thuật | Spec | Performance |
|-----------|----------|------|-------------|
| **Mây trôi** | CSS `@keyframes translateX` | 2–3 layer SVG mây, loop 60–90s, opacity 0.1–0.3 | GPU, passive |
| **Sương mờ** | CSS opacity pulse | `opacity: 0.05 → 0.15`, 4s ease-in-out infinite | GPU |
| **Ánh sáng** | CSS radial-gradient animation | Vị trí gradient shift chậm, 8s loop | GPU |
| **Hạt bụi** | CSS pseudo-elements hoặc max 20 DOM nodes | Float upward, random delay, opacity fade | Lightweight |
| **Parallax scroll** | `transform: translateY(calc(var(--scroll) * factor))` | 3–5 layers, factor 0.1–0.5 per layer | `will-change: transform` |

```css
/* Ví dụ: Mây trôi */
@keyframes cloudDrift {
  from { transform: translateX(-10%); }
  to   { transform: translateX(110%); }
}
.cloud-layer {
  animation: cloudDrift 75s linear infinite;
  will-change: transform;
}
```

### 6.4 Journey Animations

| Animation | Trigger | Kỹ thuật | Duration |
|-----------|---------|----------|----------|
| **Path glow** | Scroll path into view | SVG `stroke-dashoffset` animate 0→100% | 1.5s |
| **Node unlock** | Belt world unlocked | Scale 0.8→1.05→1 + opacity 0→1 + gold glow | 600ms |
| **Avatar move** | Complete lesson | Framer Motion `layoutId` between nodes | 800ms |
| **Path complete** | All lessons in world done | Path stroke color → gold, pulse glow | 1s |
| **World reveal** | First visit to world | Illustration fade-in + parallax layers stagger | 1.2s |

```typescript
// Ví dụ: Avatar transition (Framer Motion)
<motion.div
  layoutId="journey-avatar"
  transition={{ type: "spring", stiffness: 200, damping: 25 }}
/>
```

### 6.5 Lesson Animations

| Animation | Trigger | Spec |
|-----------|---------|------|
| **Page enter** | Navigate to lesson | Slide up 20px + fade in, 300ms |
| **Scroll progress** | Scroll content | Top bar width spring animate to scroll % |
| **Section reveal** | H2 enters viewport | Fade in + translateY 10px, stagger 100ms per section |
| **Complete button** | Scroll ≥80% | Button fade in from bottom, subtle pulse |
| **Reading checkmark** | Pass H2 heading | Small ✓ icon scale-in beside TOC item |

### 6.6 Achievement Animations

| Animation | Trigger | Kỹ thuật | Skippable |
|-----------|---------|----------|-----------|
| **Badge reveal** | Earn achievement | Scale 0→1.15→1 + rotate -10→0, 500ms spring | Yes |
| **Light burst** | Badge reveal | SVG radial lines expand + fade, 800ms | Yes |
| **Belt promotion** | Complete belt world | Fullscreen overlay: illustration + text + particles, 3s | Yes (tap skip) |
| **Certificate reveal** | Download cert | Paper unfold animation, 600ms | No |

**Belt Promotion Ceremony Sequence:**

```
0.0s ── Screen dim to 80% opacity
0.3s ── Belt illustration scale in (spring)
0.8s ── Text: "Chúc mừng! Bạn đã hoàn thành [Tên Đai]"
1.2s ── Virtue tags fade in
1.8s ── Gold particles (CSS, 15 particles)
2.5s ── CTA: "Tiếp tục hành trình" fade in
3.0s ── Auto-dismiss (or tap anywhere)
```

### 6.7 Technology Matrix

| Use Case | Framer Motion | CSS Animation | SVG Animation | Lottie |
|----------|:---:|:---:|:---:|:---:|
| Page transitions | ✓ | | | |
| Layout animations (avatar) | ✓ | | | |
| Ambient loops (cloud, fog) | | ✓ | ✓ | |
| Path draw-on-scroll | | | ✓ | |
| Badge reveal | ✓ | | | ✓ |
| Belt ceremony | ✓ | ✓ | | ✓ |
| Scroll parallax | | ✓ | | |
| Progress bars | ✓ | ✓ | | |

**Quy tắc chọn:**
- **Framer Motion:** Interactivity, layout, gesture, page transition
- **CSS:** Ambient loops, hover states, simple fades — zero JS cost
- **SVG:** Path drawing, icon morphing
- **Lottie:** Complex celebration (1–2 files max, lazy loaded)

### 6.8 Performance Budget

| Metric | Target |
|--------|--------|
| LCP (Largest Contentful Paint) | < 2.5s |
| FID (First Input Delay) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| Animation JS bundle (Framer Motion) | ~30KB gzipped |
| Lottie files total | < 100KB (lazy loaded) |
| Max concurrent CSS animations | 5 per viewport |
| `prefers-reduced-motion` | Disable all non-essential motion |

**Tránh tuyệt đối:** Three.js, WebGL, Canvas particle systems > 50 particles, video backgrounds.

---

## 7. Gamification Strategy

### 7.1 Triết lý

> **"Tu tập, không cày game."**

Gamification trong PQQ Theory Journey phản ánh hành trình võ đạo thực tế — không tạo vòng lặp gây nghiện. Mỗi cơ chế gắn với giá trị đạo đức của môn phái.

### 7.2 Cơ chế Gamification

#### 7.2.1 Journey Progress

| Thuộc tính | Chi tiết |
|------------|----------|
| **Hiển thị** | Avatar trên path + vị trí node hiện tại |
| **Không có** | XP bar, level number, streak counter |
| **Lý do** | Võ đạo là hành trình, không phải cấp độ game. Vị trí trên path trực quan hơn số ảo |

#### 7.2.2 Knowledge Mastery

| Metric | Cách tính | Hiển thị |
|--------|-----------|----------|
| Completion Rate | Bài hoàn thành / Tổng bài × 100% | Profile + Belt World |
| Quiz Average | Trung bình điểm tất cả quiz đã pass | Profile |
| Mastery Level | ≥90% avg = "Tinh thông", ≥70% = "Nắm vững", <70% = "Đang học" | Badge text trên Profile |

**Lý do:** Đo chất lượng hiểu biết, khuyến khích làm lại quiz để đạt điểm cao — không chỉ "pass cho xong".

#### 7.2.3 Achievement System

**15–20 huy hiệu virtue-based:**

| ID | Tên | Điều kiện | Đức tính |
|----|-----|-----------|----------|
| `first-step` | Bước Chân Đầu Tiên | Hoàn thành bài Nâu Đai | Giản Dị |
| `perseverance` | Bền Bỉ | Hoàn thành 5 bài liên tiếp | Bền Bỉ |
| `humility` | Khiêm Cung | Hoàn thành Nâu Đai | Khiêm Cung |
| `humility-deep` | Khiêm Hạ | Hoàn thành Lam Đai | Khiêm Hạ |
| `patience` | Nhẫn Nhục | Quiz retry ≥3 lần rồi pass | Nhẫn Nhục |
| `diligence` | Siêng Năng | Hoàn thành Lục Đai | Siêng Năng |
| `rising` | Vươn Lên | Hoàn thành Lục Đai | Vươn Lên |
| `courage` | Dũng Cảm | Hoàn thành Hồng Đai | Dũng Cảm |
| `precision` | Tinh Tấn | Đạt 100% một quiz | Tinh Tấn |
| `steadfast` | Vững Vàng | Hoàn thành Hoàng Đai | Vững Vàng |
| `tolerance` | Bao Dung | Hoàn thành Hoàng Đai | Bao Dung |
| `integrity` | Chính Trực | Hoàn thành Bạch Đai | Chính Trực |
| `purity` | Thanh Khiết | Hoàn thành toàn bộ hành trình | Thanh Khiết |
| `master` | Bậc Thầy Lý Thuyết | 100% tất cả bài + avg ≥90% | Tổng hợp |
| `perfect-quiz` | Tinh Thông Tuyệt Đối | 100% tất cả quiz | Tinh Tấn |

**Lý do:** Huy hiệu gắn đức tính võ đạo — mỗi achievement dạy một giá trị, không phải "collect them all" vô nghĩa.

#### 7.2.4 Belt Unlock System

| Điều kiện | Hành vi |
|-----------|---------|
| Nâu Đai Bài 01 | Mặc định unlocked (entry point) |
| Bài N unlock | Bài N-1: đọc ≥80% + quiz ≥70% |
| Thế giới N+1 unlock | Tất cả bài trong cấp N: quiz passed |
| Thăng cấp đai (ceremony) | Trigger khi hoàn thành bài cuối của cấp đai |

**Lý do:** Mirror quy trình thi thăng cấp thực tế — phải nắm kiến thức cấp hiện tại mới được lên cấp tiếp.

#### 7.2.5 Certificates

| Loại | Trigger | Format |
|------|---------|--------|
| Belt Certificate | Hoàn thành cấp đai | PNG + PDF (client-side) |
| Master Certificate | Hoàn thành toàn bộ 19 bài | PNG + PDF |

**Nội dung chứng nhận:**
- Tên môn sinh (nhập trên Profile)
- Cấp đai hoàn thành
- Ngày hoàn thành
- Logo PQQ
- Chữ ký stylized (static image)
- QR code link về website (optional)

**Kỹ thuật:** `html2canvas` + `jspdf` — render template HTML → export. Không cần backend.

**Lý do:** Chứng nhận tangible reward — môn sinh có thể in, chụp gửi HLV, treo tường. Tôn vinh thành tích.

### 7.3 Những gì KHÔNG có

| Cơ chế | Lý do loại bỏ |
|--------|---------------|
| XP points | Tạo cảm giác "cày" — trái tinh thần võ đạo |
| Daily streak | Gây áp lực, FOMO — không phù hợp võ đạo |
| Leaderboard | So kè môn sinh — trái đức Khiêm Cung |
| Loot box / Random reward | Gây nghiện, may rủi — không liên quan kiến thức |
| Push notifications | Không có backend; tránh spam |
| Energy/lives system | Giới hạn artificial — cản trở học tập |
| Timer trên quiz | Gây stress — thi thật không timer từng câu |

---

## 8. Lesson Experience

### 8.1 MDX Frontmatter Schema

```yaml
---
id: blue-lesson-01
belt: blue
level: 1
title: "Lam Đai Đệ Nhất Cấp"
subtitle: "Lý thuyết thi thăng cấp Lam Đai Đệ Nhị Cấp"
virtues: [khiem-ha, nhan-nhuc]
estimatedMinutes: 15
questionsCount: 12
passThreshold: 70
prerequisites: [brown-lesson-01]
sourceDoc: "2 - LAM ĐAI 1 THI LÊN LAM ĐAI 2 6.9.2026.pdf.docx"
order: 2
---
```

### 8.2 Bố cục bài học

```
┌─────────────────────────────────────────┐
│  Sticky Progress Bar          [====..]  │
├─────────────────────────────────────────┤
│  Breadcrumb: Xanh Lam > Bài 1           │
│                                         │
│  ┌─ Belt Badge ──────────────────────┐  │
│  │  LAM ĐAI NHẤT CẤP                 │  │
│  │  Thi thăng cấp Lam Đai Đệ Nhị Cấp     │  │
│  │  ⏱ 15 phút · 📝 12 câu hỏi        │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ## Câu 1. [Nội dung câu hỏi]          │
│  [Nội dung đáp án dạng prose]           │
│                                         │
│  <VirtueCallout virtue="khiem-ha" />    │
│                                         │
│  ## Câu 2. [Nội dung câu hỏi]          │
│  ...                                    │
│                                         │
│  <BeltDivider />                        │
│                                         │
│  ## Câu 12. ...                         │
│                                         │
├─────────────────────────────────────────┤
│  [← Bài trước]    [Làm bài kiểm tra →] │
└─────────────────────────────────────────┘
```

### 8.3 MDX Custom Components

| Component | Props | Mô tả |
|-----------|-------|-------|
| `<VirtueCallout>` | `virtue: string` | Highlight box gắn đức tính đai, icon + tên + mô tả ngắn |
| `<QuestionPreview>` | `number: number` | Card preview câu hỏi — dùng ở đầu bài liệt kê nội dung |
| `<Quote>` | `source?: string` | Trích dẫn lời thề, lời dạy — styled serif italic |
| `<BeltDivider>` | — | SVG divider themed theo belt color |
| `<Illustration>` | `src, alt, parallax?: boolean` | Hình minh họa responsive, optional parallax |
| `<KeyPoint>` | `title: string` | Box "Điểm cần nhớ" — highlight nội dung quan trọng |

### 8.4 Thanh tiến độ

| Loại | Vị trí | Cách tính |
|------|--------|-----------|
| **Reading progress** | Sticky top bar | `scrollTop / (scrollHeight - clientHeight) × 100` |
| **Section progress** | TOC sidebar (desktop) / drawer (mobile) | Mỗi H2 = 1 section; ✓ khi scroll qua |
| **Completion threshold** | 80% reading progress | Enable CTA "Làm bài kiểm tra" |

### 8.5 Điều hướng

| Action | Behavior |
|--------|----------|
| Bài trước | Navigate to previous lesson (if unlocked) |
| Bài sau | Navigate to next lesson (if unlocked) |
| Làm bài kiểm tra | Navigate to `/world/[belt]/[lesson]/quiz` |
| Back | Return to Belt World page |
| TOC tap | Smooth scroll to H2 section |

### 8.6 Mobile Experience

- Single column, padding 16px
- Font body 18px (accessibility)
- TOC: floating button bottom-right → drawer slide-up
- Sticky bottom CTA bar: "Làm bài kiểm tra"
- Touch targets ≥ 44px
- Swipe gesture: không implement (tránh conflict scroll)

### 8.7 Desktop Experience

- Content max-width 680px, centered
- TOC sidebar 240px sticky right
- Breadcrumb top
- Keyboard: `j/k` scroll sections (Nice To Have)
- Print stylesheet: ẩn nav, hiện full content (Nice To Have)

---

## 9. Quiz Experience

### 9.1 Data Model

```typescript
interface QuizQuestion {
  id: string;           // "blue-lesson-01-q03"
  lessonId: string;
  number: number;       // 1-12
  question: string;
  options: string[];    // 4 options
  correctIndex: number; // 0-3
  explanation?: string; // Optional giải thích thêm
}

interface QuizData {
  lessonId: string;
  title: string;
  passThreshold: number; // default 70
  questions: QuizQuestion[];
}
```

### 9.2 Quiz UI Flow

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  INTRO   │────►│ QUESTION │────►│ QUESTION │────►│  RESULT  │
│          │     │   1/12   │     │   N/12   │     │          │
│ Tên bài  │     │          │     │          │     │ Score    │
│ Số câu   │     │ Select   │     │ Select   │     │ Pass/Fail│
│ Ngưỡng   │     │ answer   │     │ answer   │     │ Review   │
│ [Bắt đầu]│     │ [Tiếp]   │     │ [Nộp]    │     │ [Action] │
└──────────┘     └──────────┘     └──────────┘     └──────────┘
```

### 9.3 Question Screen

```
┌─────────────────────────────────┐
│  Câu 3 / 12          [===...]  │
│                                 │
│  Phật Quang Quyền chính thức    │
│  gia nhập Liên đoàn Võ Cổ       │
│  Truyền Việt Nam khi nào?       │
│                                 │
│  ┌─────────────────────────┐    │
│  │  A. Năm 2005            │    │
│  └─────────────────────────┘    │
│  ┌─────────────────────────┐    │
│  │  B. Năm 2010            │    │
│  └─────────────────────────┘    │
│  ┌─────────────────────────┐    │
│  │  C. Năm 2015         ✓  │ ← selected + feedback
│  └─────────────────────────┘    │
│  ┌─────────────────────────┐    │
│  │  D. Năm 2020            │    │
│  └─────────────────────────┘    │
│                                 │
│         [ Tiếp theo → ]         │
└─────────────────────────────────┘
```

### 9.4 Feedback Behavior

| Event | UI Response | Animation |
|-------|-------------|-----------|
| Chọn đáp án đúng | Option border green + ✓ icon | Scale 1→1.02→1, 200ms |
| Chọn đáp án sai | Option border red + ✗; highlight đáp án đúng green | Gentle shake 300ms |
| Sau feedback | Button "Tiếp theo" enable | Fade in 200ms |
| Không chọn | Button disabled | — |

**Không hiển thị feedback ngay nếu:** chế độ "Thi thử" (Nice To Have) — feedback only at end.

### 9.5 Results Screen

#### Pass (≥70%)

```
┌─────────────────────────────────┐
│                                 │
│         ┌─────────┐             │
│         │  83%    │             │
│         │  ✓ ĐẠT  │             │
│         └─────────┘             │
│                                 │
│  "Kiên trì rèn luyện, con đường    │
│   võ đạo đang mở ra."           │
│                                 │
│  ✓ 10/12 câu đúng              │
│  ✗ 2 câu cần ôn lại (expand)   │
│                                 │
│  [ 🏅 Huy hiệu mới! ]          │
│                                 │
│  [ Tiếp tục bài sau → ]        │
│  [ Xem lại bài học ]           │
│  [ Làm lại quiz ]              │
└─────────────────────────────────┘
```

#### Fail (<70%)

```
┌─────────────────────────────────┐
│                                 │
│         ┌─────────┐             │
│         │  58%    │             │
│         │ CHƯA ĐẠT│             │
│         └─────────┘             │
│                                 │
│  "Hãy xem lại bài học và thử   │
│   lại. Mỗi lần thử là một bước  │
│   tiến trên con đường võ đạo."  │
│                                 │
│  ✗ 5 câu cần ôn lại (expand)   │
│    → Hiển thị câu hỏi + đáp án │
│      đúng cho từng câu sai      │
│                                 │
│  [ Xem lại bài học ]           │
│  [ Làm lại quiz ]              │
└─────────────────────────────────┘
```

### 9.6 Scoring Rules

| Rule | Value |
|------|-------|
| Pass threshold | ≥70% (configurable per lesson in frontmatter) |
| Scoring | `correctCount / totalQuestions × 100`, rounded |
| Retry | Unlimited, không penalty |
| Best score | Lưu điểm cao nhất |
| Attempts | Đếm số lần làm, hiển thị trên Profile |
| Unlock | Chỉ cần pass 1 lần (≥70%) |

### 9.7 Distractor Generation Strategy

Vì nội dung từ Q&A có đáp án duy nhất, distractors được tạo bằng:

1. **Manual (preferred):** HLV viết 3 đáp án sai hợp lý trong JSON quiz
2. **Semi-auto:** Lấy đáp án từ câu hỏi khác cùng bài (cross-answer)
3. **Fallback:** "Không có ý nghĩa trên" / "Tất cả các ý trên" / date variants

> MVP: Manual review bởi HLV cho mỗi bộ quiz — chất lượng quan trọng hơn tốc độ.

---

## 10. Local Storage Strategy

### 10.1 Tổng quan

Toàn bộ dữ liệu người dùng lưu trên trình duyệt. Không có backend, không sync server.

| Phase | Storage | Scope |
|-------|---------|-------|
| MVP (Phase 1) | `localStorage` | Progress, quiz, achievements, preferences |
| Phase 2 (PWA) | `IndexedDB` | + cached MDX content, illustrations |
| Phase 3 (Optional) | Cloud backup | Export/import JSON qua user action |

### 10.2 Schema

```typescript
interface UserProgress {
  version: 1;
  profile: {
    name?: string;
    startedAt: string;       // ISO date
    lastActiveAt: string;
  };
  lessons: Record<string, LessonProgress>;
  quizzes: Record<string, QuizProgress>;
  belts: Record<string, BeltProgress>;
  achievements: string[];    // achievement IDs earned
  preferences: UserPreferences;
}

interface LessonProgress {
  completed: boolean;
  readProgress: number;      // 0-100
  completedAt?: string;
  lastReadAt?: string;
}

interface QuizProgress {
  score: number;             // 0-100, best score
  passed: boolean;
  attempts: number;
  lastAttempt: string;
  lastScore: number;
  wrongQuestions?: string[]; // question IDs for review
}

interface BeltProgress {
  unlocked: boolean;
  completedAt?: string;
  lessonsCompleted: number;
  totalLessons: number;
}

interface UserPreferences {
  reducedMotion: boolean;
  fontSize: 'normal' | 'large';
  theme?: 'dark' | 'light';  // Nice To Have
}
```

### 10.3 Storage Key

```
pqq-theory-progress-v1
```

### 10.4 Data Size Estimate

| Data | Estimated Size |
|------|---------------|
| Profile | ~200 bytes |
| 19 lessons progress | ~2 KB |
| 19 quiz results | ~4 KB |
| 6 belts progress | ~500 bytes |
| 20 achievements | ~500 bytes |
| Preferences | ~100 bytes |
| **Total** | **~8 KB** (well within 5MB localStorage limit) |

### 10.5 Core Operations

```typescript
// lib/storage.ts — Core API

function getProgress(): UserProgress;
function saveProgress(data: UserProgress): void;
function updateLessonProgress(lessonId: string, update: Partial<LessonProgress>): void;
function updateQuizProgress(lessonId: string, result: QuizProgress): void;
function unlockBelt(beltId: string): void;
function earnAchievement(achievementId: string): void;
function resetProgress(): void;  // with confirmation
function exportProgress(): string;  // JSON string for download
function importProgress(json: string): boolean;  // validate + merge
```

### 10.6 Migration Strategy

```typescript
const CURRENT_VERSION = 1;

function migrateProgress(raw: unknown): UserProgress {
  const data = raw as Partial<UserProgress>;
  if (!data.version || data.version < CURRENT_VERSION) {
    // Merge with defaults for missing fields
    return { ...DEFAULT_PROGRESS, ...data, version: CURRENT_VERSION };
  }
  return data as UserProgress;
}
```

| Version | Changes |
|---------|---------|
| v1 | Initial schema |
| v2 (future) | Add `bookmarks: string[]`, `notes: Record<string, string>` |

### 10.7 Export / Import

**Export (Should Have):**
- Profile page → "Sao lưu tiến độ" → download `pqq-backup-YYYY-MM-DD.json`
- Môn sinh gửi file cho HLV qua Zalo

**Import:**
- Profile page → "Khôi phục tiến độ" → file picker → validate schema → confirm overwrite → save

**Validation rules:**
- Must be valid JSON
- Must have `version` field
- Must have `profile.startedAt`
- Reject if version > current (future-proof message)

### 10.8 Edge Cases

| Case | Handling |
|------|----------|
| localStorage full | Catch QuotaExceededError → alert user to export + clear |
| localStorage disabled (private mode) | Fallback to in-memory store + warning banner |
| Corrupt JSON | Reset to defaults + notify user |
| Multiple tabs | `storage` event listener to sync across tabs |
| Reset progress | Double confirm dialog: "Bạn chắc chắn? Hành trình sẽ bắt đầu lại." |

### 10.9 Trade-off: localStorage vs IndexedDB

| | localStorage | IndexedDB |
|---|:---:|:---:|
| API complexity | Simple sync | Async, complex |
| Size limit | ~5MB | ~50MB+ |
| Data type | Strings only | Structured |
| Tab sync | `storage` event | Manual |
| MVP fit | ✓ Perfect | Overkill |
| PWA offline cache | ✗ | ✓ Needed Phase 2 |

**Decision:** localStorage cho MVP. IndexedDB khi cần cache content offline (Phase 2).

---

## 11. Frontend Architecture

### 11.1 Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 14+ |
| Language | TypeScript | 5+ |
| Styling | Tailwind CSS | 3+ |
| Animation | Framer Motion | 11+ |
| Content | MDX (`@next/mdx` + `next-mdx-remote` hoặc Contentlayer) | — |
| Icons | Lucide React | — |
| Certificate | html2canvas + jspdf | — |
| Deploy | Static Export (`output: 'export'`) | — |

### 11.2 Tại sao chọn stack này

| Technology | Lý do phù hợp |
|-----------|---------------|
| **Next.js App Router** | SSG cho static site; file-based routing; MDX integration; SEO landing page |
| **TypeScript** | Type safety cho progress schema, quiz engine, content metadata |
| **Tailwind CSS** | Design tokens qua config; responsive nhanh; purge unused CSS |
| **Framer Motion** | Declarative animation; `layoutId` cho journey avatar; React-native feel |
| **MDX** | Interactive components trong bài học (VirtueCallout, Quote, etc.) |
| **Static Export** | Deploy free trên Vercel/Netlify/GitHub Pages; không cần server |

### 11.3 Project Structure

```
/
├── app/
│   ├── layout.tsx                 # Root layout, fonts, providers
│   ├── page.tsx                   # Landing Page
│   ├── journey/
│   │   └── page.tsx               # Journey Map
│   ├── world/
│   │   └── [belt]/
│   │       ├── page.tsx           # Belt World Page
│   │       └── [lesson]/
│   │           ├── page.tsx       # Lesson Page
│   │           └── quiz/
│   │               └── page.tsx   # Quiz Page
│   ├── achievements/
│   │   └── page.tsx
│   ├── profile/
│   │   └── page.tsx
│   └── about/
│       └── page.tsx               # Nice To Have
│
├── components/
│   ├── ui/                        # Design system primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── Badge.tsx
│   │   └── ...
│   ├── layout/
│   │   ├── BottomTabBar.tsx
│   │   ├── SideRail.tsx
│   │   ├── Breadcrumb.tsx
│   │   └── PageTransition.tsx
│   ├── journey/
│   │   ├── JourneyMap.tsx
│   │   ├── WorldNode.tsx
│   │   ├── AvatarMarker.tsx
│   │   └── PathLine.tsx
│   ├── lesson/
│   │   ├── LessonReader.tsx
│   │   ├── TableOfContents.tsx
│   │   ├── ReadingProgress.tsx
│   │   └── mdx/
│   │       ├── VirtueCallout.tsx
│   │       ├── Quote.tsx
│   │       ├── KeyPoint.tsx
│   │       └── BeltDivider.tsx
│   ├── quiz/
│   │   ├── QuizEngine.tsx
│   │   ├── QuestionCard.tsx
│   │   ├── ResultsScreen.tsx
│   │   └── AnswerOption.tsx
│   ├── achievement/
│   │   ├── AchievementGrid.tsx
│   │   ├── BadgeReveal.tsx
│   │   └── BeltCeremony.tsx
│   └── animation/
│       ├── CloudLayer.tsx
│       ├── ParallaxContainer.tsx
│       ├── FadeInOnScroll.tsx
│       └── ParticleField.tsx
│
├── content/
│   ├── brown-belt/
│   │   └── lesson-01.mdx
│   ├── blue-belt/
│   │   ├── lesson-01.mdx
│   │   ├── lesson-02.mdx
│   │   ├── lesson-03.mdx
│   │   └── lesson-04.mdx
│   ├── green-belt/ ... lesson-01..04
│   ├── red-belt/   ... lesson-01..04
│   ├── yellow-belt/... lesson-01..04
│   ├── white-belt/
│   │   ├── lesson-01.mdx
│   │   └── lesson-02.mdx
│   └── quizzes/
│       ├── brown-lesson-01.json
│       ├── blue-lesson-01.json
│       └── ...
│
├── lib/
│   ├── storage.ts                 # localStorage CRUD
│   ├── progress.ts                # Progress logic, unlock checks
│   ├── quiz-engine.ts             # Quiz scoring, flow
│   ├── achievements.ts            # Achievement definitions + checks
│   ├── certificates.ts              # PDF/PNG generation
│   ├── content.ts                 # Content metadata loader
│   └── constants.ts                 # Belt configs, routes
│
├── public/
│   ├── illustrations/
│   │   ├── brown-world.webp
│   │   ├── blue-world.webp
│   │   └── ...
│   ├── lottie/
│   │   ├── badge-reveal.json
│   │   └── belt-ceremony.json
│   ├── certificates/
│   │   └── template.html
│   └── logo.jpg
│
├── styles/
│   └── globals.css                # Tailwind + custom properties
│
├── tailwind.config.ts             # Design tokens
├── next.config.js                 # MDX + static export
├── tsconfig.json
└── package.json
```

### 11.4 Key Architectural Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Rendering | SSG (build-time) | Content static; no server needed |
| State management | React Context + localStorage | Simple; no Redux overhead |
| Content loading | Build-time MDX import | Zero runtime fetch; fast |
| Quiz data | JSON files co-located | Easy to edit; type-safe |
| Routing | File-based App Router | Convention over configuration |
| Client components | `'use client'` for interactive pages | Progress, quiz, animations |
| Server components | Layout, static content wrapper | Performance |

### 11.5 Data Flow

```
Build Time:
  MDX files + JSON quizzes → Next.js build → Static HTML/JS/CSS

Runtime:
  User opens page
    → Load static page
    → Read localStorage (UserProgress)
    → Render UI with progress state
    → User reads lesson → update readProgress in localStorage
    → User takes quiz → score → update quiz progress
    → Check unlock conditions → update belt/achievement
    → Trigger animations
```

### 11.6 Performance Strategy

| Strategy | Implementation |
|----------|---------------|
| Static generation | All pages pre-rendered at build |
| Code splitting | Route-level automatic via App Router |
| Image optimization | `next/image` with WebP, lazy load |
| Font loading | `next/font` with display: swap |
| Animation bundle | Framer Motion tree-shake; lazy Lottie |
| CSS | Tailwind purge → ~10KB CSS |
| Prefetch | Next.js Link prefetch for adjacent lessons |

### 11.7 Khả năng mở rộng

| Future need | Architecture support |
|-------------|---------------------|
| PWA offline | Static export compatible; add SW + IndexedDB |
| More belts/lessons | Add MDX + JSON → rebuild |
| i18n | Next.js i18n routing (Phase 3) |
| Cloud sync | Import/export JSON → optional Supabase (Phase 3) |
| Dark/light theme | CSS variables already structured |
| Analytics | Plausible/Umami script tag (external, no backend) |

---

## 12. Content Structure

### 12.1 Ánh xạ tài liệu nguồn → Content

| # | File nguồn (`assets/doc/`) | Belt World | Lesson ID | Title |
|---|---------------------------|------------|-----------|-------|
| 1 | `1-ĐAI NÂU THI LÊN LAM ĐAI 1...` | `brown` | `brown-lesson-01` | Nâu Đai — Thi thăng cấp Lam Đai Đệ Nhất Cấp |
| 2 | `2 - LAM ĐAI 1 THI LÊN LAM ĐAI 2...` | `blue` | `blue-lesson-01` | Lam Đai Đệ Nhất Cấp — Thi thăng cấp Lam Đai 2 |
| 3 | `3-LAM ĐAI 2 THI LÊN LAM ĐAI 3...` | `blue` | `blue-lesson-02` | Lam Đai 2 — Thi thăng cấp Lam Đai 3 |
| 4 | `4 - LAM ĐAI 3 THI LÊN LAM ĐAI 4...` | `blue` | `blue-lesson-03` | Lam Đai 3 — Thi thăng cấp Lam Đai 4 |
| 5 | `5 - LAM ĐAI 4 THI LÊN LỤC ĐAI 1...` | `blue` | `blue-lesson-04` | Lam Đai 4 — Thi thăng cấp Lục Đai 1 |
| 6 | `6- LỤC ĐAI 1 THI LÊN LỤC ĐAI 2...` | `green` | `green-lesson-01` | Lục Đai 1 — Thi thăng cấp Lục Đai 2 |
| 7 | `7- LỤC ĐAI 2 THI LÊN LỤC ĐAI 3...` | `green` | `green-lesson-02` | Lục Đai 2 — Thi thăng cấp Lục Đai 3 |
| 8 | `8- LỤC ĐAI 3 THI LÊN LỤC ĐAI 4...` | `green` | `green-lesson-03` | Lục Đai 3 — Thi thăng cấp Lục Đai 4 |
| 9 | `9- LỤC ĐAI 4 THI LÊN HỒNG ĐAI 1...` | `green` | `green-lesson-04` | Lục Đai 4 — Thi thăng cấp Hồng Đai 1 |
| 10 | `10- HỒNG ĐAI 1 THI LÊN HỒNG ĐAI 2...` | `red` | `red-lesson-01` | Hồng Đai 1 — Thi thăng cấp Hồng Đai 2 |
| 11 | `11- HỒNG ĐAI 2 THI LÊN HỒNG ĐAI 3...` | `red` | `red-lesson-02` | Hồng Đai 2 — Thi thăng cấp Hồng Đai 3 |
| 12 | `12- HỒNG ĐAI 3 THI LÊN HỒNG ĐAI 4...` | `red` | `red-lesson-03` | Hồng Đai 3 — Thi thăng cấp Hồng Đai 4 |
| 13 | `13- HỒNG ĐAI 4 LÊN HOÀNG ĐAI 1...` | `red` | `red-lesson-04` | Hồng Đai 4 — Thi thăng cấp Hoàng Đai 1 |
| 14 | `14- HOÀNG ĐAI 1 THI LÊN HOÀNG ĐAI 2...` | `yellow` | `yellow-lesson-01` | Hoàng Đai 1 — Thi thăng cấp Hoàng Đai 2 |
| 15 | `15-HOÀNG ĐAI 2 THI LÊN HOÀNG ĐAI 3...` | `yellow` | `yellow-lesson-02` | Hoàng Đai 2 — Thi thăng cấp Hoàng Đai 3 |
| 16 | `16-HOÀNG ĐAI 3 THI LÊN HOÀNG ĐAI 4...` | `yellow` | `yellow-lesson-03` | Hoàng Đai 3 — Thi thăng cấp Hoàng Đai 4 |
| 17 | `17-HOÀNG ĐAI 4 THI LÊN CHUẨN BẠCH ĐAI...` | `yellow` | `yellow-lesson-04` | Hoàng Đai 4 — Thi thăng cấp Chuẩn Bạch Đai |
| 18 | `18 - CHUẨN BẠCH ĐAI THI LÊN BẠCH ĐAI...` | `white` | `white-lesson-01` | Chuẩn Bạch Đai — Thi thăng cấp Bạch Đai |
| 19 | `19-BẠCH ĐAI THI LÊN BẠCH ĐAI 1...` | `white` | `white-lesson-02` | Bạch Đai — Thi thăng cấp Bạch Đai 1 |

**Tổng: 19 bài học · ~228 câu hỏi quiz (ước lượng ~12 câu/bài)**

### 12.2 Belt World Configuration

```typescript
// lib/constants.ts
export const BELT_WORLDS = [
  {
    id: 'brown',
    name: 'Nâu Đai',
    theme: 'Khởi đầu',
    virtues: ['giản-dị', 'bền-bỉ', 'khiêm-cung'],
    colors: { primary: '#6B4423', accent: '#D4A574' },
    lessons: ['brown-lesson-01'],
    totalLessons: 1,
  },
  {
    id: 'blue',
    name: 'Lam Đai',
    theme: 'Dòng nước',
    virtues: ['khiêm-hạ', 'nhẫn-nhục'],
    colors: { primary: '#1E4D7B', accent: '#5BA4CF' },
    lessons: ['blue-lesson-01', 'blue-lesson-02', 'blue-lesson-03', 'blue-lesson-04'],
    totalLessons: 4,
  },
  // ... green, red, yellow, white
] as const;
```

### 12.3 MDX Lesson Example

```mdx
---
id: brown-lesson-01
belt: brown
level: 0
title: "Nâu Đai"
subtitle: "Lý thuyết thi thăng cấp Lam Đai Đệ Nhất Cấp"
virtues: [giản-dị, bền-bỉ, khiêm-cung]
estimatedMinutes: 15
questionsCount: 12
passThreshold: 70
prerequisites: []
sourceDoc: "1-ĐAI NÂU THI LÊN LAM ĐAI 1 chỉnh tháng 6 năm 2026.docx"
order: 1
---

<QuestionPreview number={12} />

## Câu 1. Đọc thuộc 6 lời thề môn sinh Phật Quang Quyền

Một, tập võ để chiến thắng sự sợ hãi trong lòng mình và đạt được hạnh nhẫn nhục tận cùng.

Hai, tập võ để bênh vực kẻ vô tội bị ức hiếp.

Ba, tập võ để bảo vệ chánh pháp.

<BeltDivider />

## Câu 2. Phật Quang Quyền thành lập ngày tháng năm nào?

<VirtueCallout virtue="giản-dị" />

PQQ được thành lập năm **1992**, trong những ngày đầu hình thành chùa Phật Quang...
```

### 12.4 Quiz JSON Example

```json
{
  "lessonId": "brown-lesson-01",
  "title": "Nâu Đai — Kiểm tra",
  "passThreshold": 70,
  "questions": [
    {
      "id": "brown-lesson-01-q01",
      "lessonId": "brown-lesson-01",
      "number": 1,
      "question": "Phật Quang Quyền được thành lập năm nào?",
      "options": ["1985", "1990", "1992", "1995"],
      "correctIndex": 2,
      "explanation": "PQQ được thành lập năm 1992, trong những ngày đầu hình thành chùa Phật Quang."
    }
  ]
}
```

### 12.5 Content Migration Workflow

```
assets/doc/*.docx
       │
       ▼
  [Manual/Script Parse]
  Extract Q&A pairs
       │
       ├──► content/[belt]/lesson-XX.mdx
       │    (formatted with MDX components)
       │
       └──► content/quizzes/[lesson-id].json
            (questions + manual distractors)
       │
       ▼
  [HLV Review]
  Verify accuracy
       │
       ▼
  [Build & Deploy]
```

---

## 13. Design System

### 13.1 Design Tokens

#### Spacing (4px grid)

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight gap |
| `--space-2` | 8px | Icon gap, inline spacing |
| `--space-3` | 12px | Compact padding |
| `--space-4` | 16px | Default padding (mobile) |
| `--space-6` | 24px | Section gap |
| `--space-8` | 32px | Large section gap |
| `--space-12` | 48px | Page section margin |
| `--space-16` | 64px | Hero padding |

#### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 8px | Button, input |
| `--radius-md` | 12px | Card, panel |
| `--radius-lg` | 16px | Modal, large card |
| `--radius-full` | 999px | Badge, pill, avatar |

#### Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.2)` | Subtle elevation |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.25)` | Card hover |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.3)` | Modal, dropdown |
| `--shadow-glow` | `0 0 20px var(--belt-accent)` | Unlock, active node |

#### Z-Index Layers

| Layer | Value | Usage |
|-------|-------|-------|
| `--z-base` | 0 | Default content |
| `--z-sticky` | 10 | Progress bar, header |
| `--z-nav` | 20 | Bottom tab, side rail |
| `--z-overlay` | 30 | Drawer, TOC |
| `--z-modal` | 40 | Ceremony, dialog |
| `--z-toast` | 50 | Notifications |

### 13.2 Components

#### Button

| Variant | Style | Usage |
|---------|-------|-------|
| **Primary** | Solid `--belt-primary` bg, white text, `--radius-sm` | CTA chính: "Bắt đầu", "Làm bài kiểm tra" |
| **Secondary** | Outline 1px `--belt-accent`, transparent bg | "Xem lại bài học", "Làm lại quiz" |
| **Ghost** | No border, text only, hover bg subtle | Navigation links |
| **Hero CTA** | Primary + `--shadow-glow` + larger padding (16px 32px) | Landing page CTA |

```
States: default → hover (brightness 110%) → active (scale 0.98) → disabled (opacity 40%)
Min touch target: 44×44px
```

#### Card

| Variant | Style | Usage |
|---------|-------|-------|
| **LessonCard** | `--radius-md`, `--shadow-sm`, belt-color left border 3px | Danh sách bài trong Belt World |
| **WorldCard** | `--radius-md`, illustration top, gradient overlay | Journey map nodes, Landing preview |
| **AchievementCard** | `--radius-md`, icon center, earned=full color / locked=grayscale | Achievement page grid |

```
LessonCard states:
  ○ Locked    — grayscale, 🔒 icon, not clickable
  ● Active    — full color, pulse glow on border
  ✓ Completed — full color, ✓ badge top-right, clickable
```

#### Belt Badge

| Size | Dimensions | Usage |
|------|-----------|-------|
| `sm` | 24×24px | Inline text, breadcrumb |
| `md` | 40×40px | Lesson header, profile |
| `lg` | 64×64px | Belt ceremony, certificate |

```
6 SVG variants: brown, blue, green, red, yellow, white
Style: Simplified belt icon with knot, colored by belt
```

#### Progress Bars

| Type | Style | Usage |
|------|-------|-------|
| **Linear** | Height 4px, `--belt-accent` fill, `--color-border` track | Reading progress (sticky top) |
| **Linear Labeled** | Height 8px + percentage text | Belt world completion |
| **Circular** | SVG ring, `--belt-accent` stroke, 64px diameter | Profile belt completion |

#### Navigation

| Component | Spec |
|-----------|------|
| **BottomTabBar** | Fixed bottom, 4 items, icon 24px + label 10px, active = `--belt-accent` color |
| **SideRail** | Fixed left 240px, same 4 items vertical, desktop only (≥1024px) |
| **Breadcrumb** | Text links separated by `/`, `--color-text-secondary`, truncate on mobile |

#### Timeline (Journey / Belt World)

```
Node states:

  ○ Locked     ──  Grey circle, lock icon, dashed connector
  ● Active     ──  Belt-color circle, glow, solid connector
  ✓ Completed  ──  Gold circle, checkmark, solid gold connector
  ★ Current    ──  Belt-color + avatar overlay + pulse animation
```

### 13.3 Component Composition Example

```
BeltWorldPage
├── ParallaxContainer (world illustration)
├── WorldHeader (title, virtues, circular progress)
├── LessonTimeline
│   └── LessonCard × 4 (state: locked/active/completed)
└── BottomTabBar
```

---

## 14. MVP Scope

### 14.1 Timeline Overview

**1 Frontend Developer · 2–4 tuần · Full-time**

```
Tuần 1          Tuần 2          Tuần 3          Tuần 4
├───────────────┼───────────────┼───────────────┼───────────────┤
│ MUST HAVE     │ MUST HAVE     │ SHOULD HAVE   │ NICE TO HAVE  │
│ Scaffold      │ Quiz +        │ All worlds    │ Full parallax │
│ Landing       │ Progress      │ Achievements  │ Lottie anims  │
│ Journey map   │ 5 bài MDX     │ Profile       │ Export/Import │
│ Design system │ Mobile resp.  │ Certificates  │ PWA prep      │
│ 1 world full  │               │ 19 bài content│ Font toggle   │
└───────────────┴───────────────┴───────────────┴───────────────┘
```

### 14.2 Must Have (Tuần 1–2)

| # | Feature | Estimate | Notes |
|---|---------|----------|-------|
| 1 | Next.js scaffold + Tailwind + design tokens | 1 ngày | Config, fonts, colors |
| 2 | Design system primitives (Button, Card, Badge, Progress) | 2 ngày | ui/ components |
| 3 | Landing Page | 1 ngày | Hero + CTA + world preview |
| 4 | Journey Page (6 worlds, static layout) | 2 ngày | Path, nodes, locked/unlocked states |
| 5 | Belt World Page | 1 ngày | Lesson list, progress |
| 6 | Lesson Page (MDX reader) | 2 ngày | Reading progress, TOC, navigation |
| 7 | Quiz Engine + Quiz Page | 2 ngày | Scoring, pass/fail, feedback |
| 8 | localStorage progress system | 1 ngày | Schema, CRUD, unlock logic |
| 9 | 5 bài MDX mẫu (Brown + Blue 1–4) | 2 ngày | Content migration + quiz JSON |
| 10 | Mobile responsive (all pages) | 1 ngày | Bottom tab, touch targets |
| | **Subtotal** | **~15 ngày** | |

### 14.3 Should Have (Tuần 3)

| # | Feature | Estimate | Notes |
|---|---------|----------|-------|
| 11 | 6 Belt World pages (full UI themed) | 2 ngày | Illustrations, virtue tags |
| 12 | 19 bài MDX + 19 quiz JSON (full content) | 3 ngày | Content migration all docs |
| 13 | Achievement system (15 badges) | 1.5 ngày | Grid, earn logic, reveal animation |
| 14 | Profile Page | 1 ngày | Progress overview, settings |
| 15 | Belt unlock ceremony animation | 1 ngày | Fullscreen overlay |
| 16 | Certificate download (PNG) | 1 ngày | html2canvas template |
| 17 | Bottom tab + side rail navigation | 0.5 ngày | Responsive nav switch |
| | **Subtotal** | **~10 ngày** | |

### 14.4 Nice To Have (Tuần 4+)

| # | Feature | Estimate | Notes |
|---|---------|----------|-------|
| 18 | Full parallax illustrations (6 worlds) | 2 ngày | Needs illustration assets |
| 19 | Lottie achievement animations | 1 ngày | 2 Lottie files |
| 20 | Export/import progress JSON | 0.5 ngày | Backup feature |
| 21 | Font size accessibility toggle | 0.5 ngày | Profile setting |
| 22 | About Page | 0.5 ngày | Giới thiệu môn phái |
| 23 | Certificate PDF export | 0.5 ngày | jspdf |
| 24 | PWA manifest + basic SW | 1 ngày | Phase 2 prep |
| 25 | Cloud/ambient CSS animations (global) | 1 ngày | Cloud, fog, particles |
| | **Subtotal** | **~7 ngày** | |

### 14.5 MVP Definition of Done

- [ ] User có thể mở website trên mobile, thấy Landing Page
- [ ] User có thể navigate Journey → Belt World → Lesson → Quiz
- [ ] User có thể đọc bài học MDX với progress tracking
- [ ] User có thể làm quiz, nhận pass/fail, xem câu sai
- [ ] Quiz pass unlocks bài tiếp theo
- [ ] Tiến độ persist qua localStorage (close/reopen browser)
- [ ] Ít nhất 5 bài học hoàn chỉnh (Brown + Blue)
- [ ] Responsive trên mobile (375px) và desktop (1280px)
- [ ] Static deploy thành công (Vercel/Netlify/GitHub Pages)

### 14.6 Out of Scope (MVP)

| Feature | Phase |
|---------|-------|
| Backend / API | Never (optional Phase 3 sync only) |
| User authentication | Never |
| Video content | Never |
| CMS | Never |
| Offline PWA | Phase 2 |
| Cloud backup | Phase 3 |
| Multi-language | Phase 3 |
| HLV dashboard | Never (export JSON workaround) |
| In-app analytics | Never (external Plausible optional) |

---

## 15. Wireframes

### 15.1 Landing Page

#### Mobile (375px)

```
┌─────────────────────────────┐
│                             │
│     ┌─────────────┐         │
│     │  [LOGO PQQ] │         │
│     └─────────────┘         │
│                             │
│   Hành Trình Lý Thuyết      │
│      Võ Đạo                 │
│                             │
│  "Bước trên con đường       │
│   võ đạo, chinh phục         │
│   từng cấp đai"             │
│                             │
│  ┌─────────────────────┐    │
│  │  Bắt đầu hành trình │    │
│  └─────────────────────┘    │
│                             │
│  ── Hệ thống 6 màu đai ──           │
│                             │
│  ┌────┐ ┌────┐ ┌────┐      │
│  │ Nâu│ │ Lam│ │ Lục│ →scroll│
│  └────┘ └────┘ └────┘      │
│                             │
│  Phật Quang Quyền © 2026   │
└─────────────────────────────┘
```

#### Desktop (1280px)

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  ┌─────────────┐                    ┌──────────────────────┐  │
│  │  [LOGO PQQ] │                    │                      │  │
│  └─────────────┘                    │   [Hero Illustration │  │
│                                     │    Võ đường sương   │  │
│  Hành Trình Lý Thuyết Võ Đạo      │    mù buổi sáng]     │  │
│                                     │                      │  │
│  "VÕ THUẬT RÈN LUYỆN THÂN THỂ
VÕ ĐẠO SOI SÁNG TÂM HỒN,      └──────────────────────┘  │
│   chinh phục từng cấp đai"                                   │
│                                                              │
│  ┌──────────────────────┐                                    │
│  │  Bắt đầu hành trình  │                                    │
│  └──────────────────────┘                                    │
│                                                              │
│  ── Hệ thống 6 màu đai ──                                        │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────┐ ┌────┐│
│  │  Nâu   │ │  Lam   │ │  Lục   │ │  Đỏ   │ │Vàng│ │Trắng││
│  │ Võ đường│ │Dòng nước│ │Rừng trúc│ │Biển lửa│ │Núu │ │Sen ││
│  └────────┘ └────────┘ └────────┘ └────────┘ └────┘ └────┘│
│                                                              │
│  Phật Quang Quyền © 2026                                    │
└──────────────────────────────────────────────────────────────┘
```

### 15.2 Journey Page

#### Mobile (375px)

```
┌─────────────────────────────┐
│  Hành Trình Võ Đạo          │
│                             │
│         ┌───────┐           │
│         │ TRẮNG │ 🔒        │
│         └───┬───┘           │
│             │               │
│         ┌───┴───┐           │
│         │ VÀNG  │ 🔒        │
│         └───┬───┘           │
│             │               │
│         ┌───┴───┐           │
│         │  ĐỎ   │ 🔒        │
│         └───┬───┘           │
│             │               │
│         ┌───┴───┐           │
│         │  LỤC  │ 🔒        │
│         └───┬───┘           │
│             │               │
│         ┌───┴───┐           │
│         │  LAM  │ ● ← active│
│         └───┬───┘           │
│             │               │
│         ┌───┴───┐           │
│         │  NÂU  │ ✓         │
│         └───┬───┘           │
│             │               │
│          [👤] avatar        │
│                             │
├─────────────────────────────┤
│ 🗺️ Hành  │ 📖 │ 🏅 │ 👤  │
│  trình   │Học │TT  │Hồ sơ │
└─────────────────────────────┘
```

### 15.3 Belt World Page

#### Mobile (375px)

```
┌─────────────────────────────┐
│  ← Hành trình               │
│  ┌─────────────────────┐    │
│  │                     │    │
│  │  [Illustration:     │    │
│  │   Dòng nước]        │    │
│  │                     │    │
│  └─────────────────────┘    │
│                             │
│  ĐAI XANH LAM               │
│  Dòng nước                  │
│  Khiêm Hạ · Nhẫn Nhục      │
│                             │
│  Tiến độ: [████░░░░] 50%   │
│                             │
│  ── Bài học ──              │
│                             │
│  ┌─────────────────────┐    │
│  │ ✓ Bài 1             │    │
│  │   Lam Đai Đệ Nhất Cấp→2       │    │
│  │   Điểm: 92%         │    │
│  └─────────────────────┘    │
│  ┌─────────────────────┐    │
│  │ ● Bài 2  (đang học) │    │
│  │   Lam Đai 2→3       │    │
│  │   Đọc: 45%          │    │
│  └─────────────────────┘    │
│  ┌─────────────────────┐    │
│  │ 🔒 Bài 3            │    │
│  │   Lam Đai 3→4       │    │
│  └─────────────────────┘    │
│  ┌─────────────────────┐    │
│  │ 🔒 Bài 4            │    │
│  │   Lam Đai 4→Lục 1  │    │
│  └─────────────────────┘    │
│                             │
├─────────────────────────────┤
│ 🗺️ Hành  │ 📖 │ 🏅 │ 👤  │
└─────────────────────────────┘
```

### 15.4 Lesson Page

#### Mobile (375px)

```
┌─────────────────────────────┐
│  [████████████░░░░] 72%     │  ← sticky progress
│                             │
│  Xanh Lam > Bài 1           │
│                             │
│  ┌─ 🟦 LAM ĐAI 1 ─────────┐│
│  │ Thi thăng cấp Lam Đai 2 ││
│  │ ⏱ 15 phút · 📝 12 câu  ││
│  └─────────────────────────┘│
│                             │
│  ## Câu 1.                  │
│  Đọc thuộc 6 lời thề...     │
│                             │
│  Một, tập võ để chiến       │
│  thắng sự sợ hãi...         │
│                             │
│  ┌─ Đức tính ────────────┐ │
│  │ 🙏 Giản Dị             │ │
│  │ Sống đơn giản, không    │ │
│  │ phô trương              │ │
│  └─────────────────────────┘│
│                             │
│  ## Câu 2.                  │
│  Phật Quang Quyền thành     │
│  lập năm nào?               │
│  ...                        │
│                             │
│                    [≡ TOC]  │  ← floating TOC button
│                             │
├─────────────────────────────┤
│  ┌─────────────────────┐    │
│  │  Làm bài kiểm tra → │    │  ← sticky CTA
│  └─────────────────────┘    │
└─────────────────────────────┘
```

#### Desktop (1280px)

```
┌──────────┬──────────────────────────────┬──────────────┐
│ Side     │ [████████░░] 72%            │ Mục lục      │
│ Rail     ├──────────────────────────────┤              │
│          │ Xanh Lam > Bài 1             │ ✓ Câu 1     │
│ 🗺️      │                              │ ● Câu 2     │
│ 📖      │ LAM ĐAI NHẤT CẤP            │ ○ Câu 3     │
│ 🏅      │ Thi thăng cấp Lam Đai 2     │ ○ Câu 4     │
│ 👤      │                              │ ...         │
│          │ ## Câu 1.                   │ ○ Câu 12    │
│          │ [Nội dung bài học...]       │              │
│          │                              │              │
│          │ ## Câu 2.                   │              │
│          │ [Nội dung...]                │              │
│          │                              │              │
│          │ [← Bài trước] [Kiểm tra →]  │              │
└──────────┴──────────────────────────────┴──────────────┘
```

### 15.5 Quiz Page

#### Mobile (375px)

```
┌─────────────────────────────┐
│  ← Bài học                  │
│                             │
│  Kiểm tra: Lam Đai Đệ Nhất Cấp        │
│  Câu 3 / 12    [███░░] 25% │
│                             │
│  ┌─────────────────────┐    │
│  │                     │    │
│  │  Phật Quang Quyền   │    │
│  │  chính thức gia     │    │
│  │  nhập Liên đoàn     │    │
│  │  Võ Cổ Truyền VN    │    │
│  │  khi nào?           │    │
│  │                     │    │
│  └─────────────────────┘    │
│                             │
│  ┌─────────────────────┐    │
│  │  A. Năm 2005        │    │
│  └─────────────────────┘    │
│  ┌─────────────────────┐    │
│  │  B. Năm 2010        │    │
│  └─────────────────────┘    │
│  ┌─────────────────────┐    │
│  │  C. Năm 2015     ✓  │    │
│  └─────────────────────┘    │
│  ┌─────────────────────┐    │
│  │  D. Năm 2020        │    │
│  └─────────────────────┘    │
│                             │
│  ┌─────────────────────┐    │
│  │    Tiếp theo →      │    │
│  └─────────────────────┘    │
│                             │
└─────────────────────────────┘
```

#### Quiz Results

```
┌─────────────────────────────┐
│                             │
│         ┌─────────┐         │
│         │         │         │
│         │   83%   │         │
│         │         │         │
│         │ ✓ ĐẠT   │         │
│         └─────────┘         │
│                             │
│  "Kiên trì rèn luyện, con      │
│   đường võ đạo đang mở ra"  │
│                             │
│  ✓ 10/12 câu đúng          │
│                             │
│  ✗ Câu 5: [expand xem]     │
│  ✗ Câu 9: [expand xem]     │
│                             │
│  ┌─────────────────────┐    │
│  │  Tiếp tục bài sau → │    │
│  └─────────────────────┘    │
│  ┌─────────────────────┐    │
│  │  Xem lại bài học    │    │
│  └─────────────────────┘    │
│                             │
└─────────────────────────────┘
```

### 15.6 Profile Page

#### Mobile (375px)

```
┌─────────────────────────────┐
│  Hồ Sơ Võ Đạo               │
│                             │
│         ┌───────┐           │
│         │  👤   │           │
│         └───────┘           │
│       Nguyễn Minh Tuấn      │
│       Lam Đai · Đệ Nhất Cấp    │
│                             │
│  ── Tiến độ tổng ──         │
│  [████████░░░░░░] 42%       │
│  8/19 bài · Điểm TB: 85%   │
│                             │
│  ── Thế giới ──              │
│  Nâu  [██████████] 100% ✓  │
│  Lam  [█████░░░░░]  50%    │
│  Lục  [░░░░░░░░░░]   0% 🔒 │
│  Đỏ   [░░░░░░░░░░]   0% 🔒 │
│  Vàng [░░░░░░░░░░]   0% 🔒 │
│  Trắng[░░░░░░░░░░]   0% 🔒 │
│                             │
│  ── Huy hiệu (5/15) ──      │
│  🏅 🏅 🏅 🏅 🏅 · · · · ·  │
│                             │
│  ── Chứng nhận ──            │
│  📜 Nâu Đai — Tải về       │
│                             │
│  ── Cài đặt ──              │
│  Cỡ chữ:     [Normal ▾]     │
│  Giảm chuyển động: [  ○]   │
│  Sao lưu tiến độ             │
│  Đặt lại hành trình          │
│                             │
├─────────────────────────────┤
│ 🗺️ Hành  │ 📖 │ 🏅 │ 👤  │
└─────────────────────────────┘
```

---

## 16. Future Roadmap

### 16.1 Phase Overview

```
Phase 1                Phase 2                 Phase 3
Frontend Only          PWA Offline             Optional Sync
(0–4 tuần)            (1–2 tháng)             (khi cần)
     │                      │                       │
     ▼                      ▼                       ▼
 Static SSG             Service Worker          Cloud backup
 localStorage           IndexedDB cache         QR export
 19 bài MDX             Offline MDX read        Optional auth
 Quiz + Progress        Install prompt          Multi-device
 Achievements           Background sync          HLV view link
 Certificates           Full offline quiz
```

### 16.2 Phase 1 — Frontend Only (MVP)

| Item | Detail |
|------|--------|
| **Timeline** | 0–4 tuần |
| **Scope** | Toàn bộ MVP Must + Should Have |
| **Deploy** | Static site (Vercel / Netlify / GitHub Pages) |
| **Storage** | localStorage |
| **Content** | 19 bài MDX + 19 quiz JSON |
| **Done when** | Môn sinh có thể học + quiz + unlock end-to-end |

### 16.3 Phase 2 — PWA Offline

| Item | Detail |
|------|--------|
| **Timeline** | 1–2 tháng sau MVP |
| **Scope** | Service Worker, cache all static assets + MDX |
| **Storage** | Migrate progress to IndexedDB |
| **Features** | Install to home screen, offline lesson reading, offline quiz |
| **Trigger** | Môn sinh feedback cần học offline (võ đường không WiFi) |

### 16.4 Phase 3 — Optional Sync & Cloud Backup

| Item | Detail |
|------|--------|
| **Timeline** | Khi có nhu cầu (không bắt buộc) |
| **Scope** | Optional Supabase/Firebase cho backup progress |
| **Auth** | Optional, email-only hoặc anonymous |
| **Features** | Cross-device sync, HLV view student progress link |
| **Nguyên tắc** | Sản phẩm vẫn hoạt động 100% không có Phase 3 |

### 16.5 Roadmap Timeline

| Phase | Q3 2026 | Q4 2026 | Q1 2027 |
|-------|---------|---------|---------|
| Phase 1: MVP | ████████ | | |
| Phase 2: PWA | | ████████ | |
| Phase 3: Sync | | | █ (optional) |

---

## Phụ lục A: Risk Assessment

| # | Rủi ro | Mức độ | Xác suất | Impact | Mitigation |
|---|--------|--------|----------|--------|------------|
| R1 | Mất tiến độ khi xóa browser data | **Cao** | Trung bình | Cao | Export/import JSON; thông báo rõ trên Profile; hướng dẫn sao lưu |
| R2 | Content migration 19 docx → MDX tốn thời gian | **Cao** | Cao | Trung bình | Script parse Q&A; HLV review; MVP chỉ cần 5 bài trước |
| R3 | Animation lag trên mobile cũ | Trung bình | Trung bình | Trung bình | `prefers-reduced-motion`; CSS-first; lazy Lottie; performance budget |
| R4 | Quiz distractors chất lượng kém | Trung bình | Cao | Trung bình | Manual review bởi HLV; không auto-generate MVP |
| R5 | localStorage 5MB limit | Thấp | Thấp | Thấp | Chỉ JSON metadata (~8KB total) |
| R6 | Illustration assets chưa sẵn sàng | Trung bình | Cao | Trung bình | MVP dùng gradient placeholder; illustrations Phase Nice To Have |
| R7 | Môn sinh nhỏ tuổi khó dùng | Trung bình | Trung bình | Cao | Font lớn, onboarding, UX test với 2–3 môn sinh |
| R8 | Nội dung thay đổi (doc update) | Trung bình | Trung bình | Trung bình | MDX dễ edit; rebuild + redeploy; version trong frontmatter |
| R9 | Static export limitations (dynamic routes) | Thấp | Thấp | Trung bình | Pre-generate all routes at build; `generateStaticParams` |
| R10 | Cross-browser localStorage issues (Safari private) | Trung bình | Thấp | Trung bình | In-memory fallback + warning banner |

---

## Phụ lục B: Trade-off Analysis

### B.1 6 Worlds vs Granular Belt Levels

| | 6 Worlds (chọn) | 19 Separate Levels |
|---|:-:|:-:|
| UX simplicity | ✓ | ✗ |
| Match exam structure | Partial | ✓ |
| Visual storytelling | ✓ | ✗ |
| Scalable | ✓ | ✗ cluttered |

**Decision:** 6 worlds cho UX layer; 19 lessons map 1:1 với thi thăng cấp thật bên trong mỗi world.

### B.2 Framer Motion vs CSS-only

| | Framer Motion | CSS-only |
|---|:-:|:-:|
| Layout animation (avatar) | ✓ | ✗ |
| Bundle size | +30KB | 0 |
| Developer experience | ✓ | Manual keyframes |
| Ambient loops | Overkill | ✓ |

**Decision:** Hybrid — Framer Motion cho interactive; CSS cho ambient.

### B.3 MDX vs Plain Markdown

| | MDX | Markdown |
|---|:-:|:-:|
| Interactive components | ✓ | ✗ |
| VirtueCallout, Quote | ✓ | HTML fallback |
| Build complexity | Higher | Lower |
| Content author experience | Need dev for new components | Simpler |

**Decision:** MDX — interactive lesson components justify complexity.

### B.4 Quiz Pass Threshold: 70% vs 100%

| | 70% (chọn) | 100% |
|---|:-:|:-:|
| User frustration | Lower | Higher |
| Encourages retry | ✓ (for wrong ones) | Must retry all |
| Match real exam | Approximate | Strict |
| Completion rate | Higher | Lower |

**Decision:** 70% pass + show wrong answers for review. Encourage 100% via Mastery badge, not hard gate.

### B.5 localStorage vs IndexedDB (MVP)

| | localStorage | IndexedDB |
|---|:-:|:-:|
| Simplicity | ✓ | ✗ |
| Size | 5MB (enough) | 50MB+ |
| Sync API | ✓ | Async |
| Offline content cache | ✗ | ✓ |

**Decision:** localStorage MVP → IndexedDB Phase 2.

### B.6 Static Export vs SSR

| | Static Export (chọn) | SSR |
|---|:-:|:-:|
| Hosting cost | Free | Server needed |
| Performance | Fastest | Good |
| Backend needed | ✗ | ✓ |
| Content update | Rebuild | Dynamic |

**Decision:** Static export — content rarely changes; free deploy.

---

## Phụ lục C: Success Metrics

### C.1 Product Metrics (không cần backend analytics)

| Metric | Cách đo | Target (3 tháng) |
|--------|---------|-------------------|
| Lesson completion rate | localStorage aggregate (demo) | ≥60% start → finish lesson |
| Quiz first-pass rate | Quiz attempts = 1 + passed | ≥50% |
| Belt world completion | Belts completed / users started | ≥30% complete ≥1 world |
| Return usage | `lastActiveAt` - `startedAt` > 1 day | ≥40% return |
| Certificate downloads | Count on Profile (local) | ≥20% of completers |

### C.2 Qualitative Metrics

| Metric | Cách đo |
|--------|---------|
| User satisfaction | Google Form survey link trên Profile |
| HLV adoption | HLV chia sẻ link cho bao nhiêu lớp |
| UX feedback | Test với 5 môn sinh (2 mới, 2 lâu năm, 1 HLV) |
| Accessibility | Manual test font size, reduced motion |

### C.3 Technical Metrics

| Metric | Target |
|--------|--------|
| Lighthouse Performance | ≥90 |
| Lighthouse Accessibility | ≥95 |
| Lighthouse Best Practices | ≥95 |
| Lighthouse SEO | ≥90 |
| Build time | < 2 minutes |
| Total bundle size (first load) | < 200KB gzipped |

---

## Phụ lục D: Glossary

| Thuật ngữ | Định nghĩa |
|-----------|-----------|
| **PQQ** | Phật Quang Quyền — môn phái võ thuật Phật giáo |
| **Belt World** | Thế giới themed theo màu đai (6 worlds) |
| **Lesson** | Một bài học lý thuyết (1 file MDX) |
| **Quiz** | Bài kiểm tra trắc nghiệm sau lesson |
| **Virtue** | Đức tính gắn với cấp đai (Giản Dị, Khiêm Cung, etc.) |
| **Journey** | Hành trình tổng thể qua hệ thống 6 màu đai |
| **Achievement** | Huy hiệu earned khi đạt cột mốc |
| **Ceremony** | Nghi thức animation khi hoàn thành cấp đai |
| **Mastery** | Mức độ tinh thông kiến thức (quiz average) |
| **SSG** | Static Site Generation — build HTML tại build-time |
| **MDX** | Markdown + JSX components |
| **Distractor** | Đáp án sai trong câu trắc nghiệm |
| **Pass Threshold** | Ngưỡng điểm tối thiểu để pass quiz (70%) |
| **HLV** | Huấn luyện viên |
| **Môn sinh** | Học viên đã nhập môn |
| **Võ sinh** | Học viên mới, chưa nhập môn |

---

## Lịch sử thay đổi

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 16/06/2026 | Product Team | Initial PRD |

---

*Tài liệu này là cơ sở cho việc triển khai MVP website học lý thuyết Võ Đạo Phật Quang Quyền. Mọi thay đổi scope cần được review và cập nhật PRD tương ứng.*

