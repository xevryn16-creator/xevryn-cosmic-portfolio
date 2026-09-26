# 16 — Register Task Pelaksanaan (TSK-001 s/d TSK-060)

Versi: 1.0 · Tanggal: 21 September 2026 · Status: Aktif

---

## 1. Aturan Pengelolaan Task

Register ini adalah pusat pelacakan eksekusi teknis untuk seluruh siklus pengembangan **XEVRYN Cosmic Portfolio**.
- **Status Resmi:** `todo`, `in_progress`, `blocked`, `done`, `deferred`.
- **Aturan Integritas:** Task dokumentasi P0 (TSK-001 s/d TSK-008) ditandai `done` setelah berkas spesifikasi selesai dan diverifikasi konsistensinya. Seluruh task implementasi kode aplikasi (TSK-009 s/d TSK-060) berstatus `todo`.
- **Maksimal Task Aktif:** Maksimal 1 task `in_progress` per sesi kerja agen.

---

## 2. Tabel Register Task Lengkap (TSK-001 s/d TSK-060)

### Fase P0 — Definisi, Perencanaan & Dokumentasi (Selesai Diverifikasi)

| Task ID | Fase | Deskripsi Pekerjaan | Dependensi | Berkas Target | Kriteria Acceptance & Bukti | Skill | Status |
|---|---|---|---|---|---|---|---|
| **TSK-001** | P0 | Pembekuan PRD, Batasan Scope & REQ-01–12 | - | `docs/01-prd.md` | PRD memuat audiens, batasan v1, kriteria REQ-01–12, dan kebijakan data `CONTENT_PENDING`. | SKL-01 | `done` |
| **TSK-002** | P0 | Penyusunan Indeks Dokumen & Aturan Agen | TSK-001 | `docs/00-index.md`, `AGENTS.md` | Sumber kebenaran terdefinisi tanpa duplikasi; aturan operasional agen terdokumentasi. | SKL-01 | `done` |
| **TSK-003** | P0 | Inventarisasi Konten & Skema TypeScript | TSK-001 | `docs/07-content.md` | Skema profil/proyek/keahlian terdefinisi; item pending terdata tanpa fakta palsu. | SKL-01 | `done` |
| **TSK-004** | P0 | Penetapan Art Direction & Token Desain | TSK-001 | `docs/02-art-direction.md`, `docs/04-design-system.md` | Palet warna kosmik, tata cahaya, skala tipografi, dan token CSS terstandarisasi. | SKL-02 | `done` |
| **TSK-005** | P0 | Penulisan Storyboard Tiap Scene (S01–S06) | TSK-004 | `docs/03-storyboard.md` | State enter/hold/exit, pergerakan kamera, dan komposisi mobile/desktop lengkap. | SKL-02 | `done` |
| **TSK-006** | P0 | Spesifikasi Arsitektur Stack & Prerender | TSK-002 | `docs/05-architecture.md`, `docs/19-decisions.md` | Kontrak render loop WebGL vs GSAP, SSG prerendering, dan ADR-001–008 tercatat. | SKL-03 | `done` |
| **TSK-007** | P0 | Penyusunan Manifest Aset & Lisensi | TSK-003, TSK-004 | `docs/08-assets.md` | Manifest AST-01–12 memuat format, anggaran ukuran, status pending, dan fallback. | SKL-02 | `done` |
| **TSK-008** | P0 | Penyiapan Register Animasi & Kontrak Skill | TSK-002, TSK-005 | `docs/10-animation-register.md`, `docs/14-skill-system.md`, `.agents/skills/` | Register ANM-001–064 lengkap; 12 skill agen siap pakai di `.agents/skills/`. | SKL-01 | `done` |

---

### Fase P1 — Fondasi Aplikasi & Prerender Statis (Selesai Penuh)

| Task ID | Fase | Deskripsi Pekerjaan | Dependensi | Berkas Target | Kriteria Acceptance & Bukti | Skill | Status |
|---|---|---|---|---|---|---|---|
| **TSK-009** | P1 | Bootstrap Proyek React + Vite + TypeScript | TSK-006 | `package.json`, `vite.config.ts`, `tsconfig.json` | Build dan typecheck lulus tanpa error kompilasi. | SKL-03 | `done` |
| **TSK-010** | P1 | Implementasi Skema Konten & Data Lokal | TSK-003, TSK-009 | `src/types/content.ts`, `src/content/*.ts` | Data profil, 3 proyek, dan keahlian tervalidasi type-safe tanpa error kompilasi. | SKL-03 | `done` |
| **TSK-011** | P1 | Implementasi Token CSS & Font Styling | TSK-004, TSK-009 | `src/styles/*.css` | Token warna, spasi, tipografi fluida, dan font fallback aktif di seluruh komponen. | SKL-02 | `done` |
| **TSK-012** | P1 | Layout Semantik & Struktur Navigasi | TSK-010, TSK-011 | `src/components/layout/*.tsx` | Header, SkipLink, Main, dan Footer terpasang dengan atribut aksesibilitas semantik. | SKL-03 | `done` |
| **TSK-013** | P1 | Implementasi Komponen Statis Semua Section | TSK-012 | `src/sections/*.tsx` | Section S01 s/d S06 tampil lengkap dengan konten teks terbaca sebelum animasi. | SKL-03 | `done` |
| **TSK-014** | P1 | Rute Studi Kasus Detail, 404 & SSG Prerender | TSK-010, TSK-012 | `src/pages/*.tsx` | Rute Beranda, Detail Studi Kasus, dan 404 terstruktur rapi. | SKL-07 | `done` |
| **TSK-015** | P1 | Komponen Kontak Email & Salin Clipboard | TSK-003, TSK-012 | `src/components/ui/CopyEmail.tsx` | Salin email berhasil menaruh teks di clipboard dengan umpan balik toast ramah. | SKL-03 | `done` |
| **TSK-016** | P1 | Provider Preferensi Gerak (MotionProvider) | TSK-009 | `src/app/providers/MotionProvider.tsx` | Mendukung Full/Lite/Reduced, sinkron dengan OS prefers-reduced-motion. | SKL-08 | `done` |
| **TSK-017** | P1 | Shell Responsif & Menu Layar Sentuh Mobile | TSK-013, TSK-016 | `src/components/layout/MobileMenu.tsx` | Responsif dari 320px s/d ultrawide; menu mobile memiliki focus-trap dan Escape close. | SKL-08 | `done` |
| **TSK-018** | P1 | Gerbang Fondasi (Milestone Gate 1) | TSK-014, TSK-015, TSK-017 | `evidence/gate-1-foundation.md` | Fondasi runtime, layout, provider, dan routing terverifikasi. | SKL-10 | `done` |

---

### Fase P2 — Art Direction & Vertical Slice Hero (Selesai Penuh)

| Task ID | Fase | Deskripsi Pekerjaan | Dependensi | Berkas Target | Kriteria Acceptance & Bukti | Skill | Status |
|---|---|---|---|---|---|---|---|
| **TSK-019** | P2 | Penyiapan Aset Hero & Fallback Poster | TSK-007, TSK-018 | `src/components/scene/FallbackPoster.tsx` | Poster desktop/mobile terpasang dengan rasio aspek tetap mencegah layout shift. | SKL-02 | `done` |
| **TSK-020** | P2 | Kanvas WebGL Latar Belakang & Error Boundary | TSK-016, TSK-019 | `src/scene/CosmicCanvas.tsx` | Canvas me-render frame pertama; kegagalan WebGL otomatis memunculkan poster. | SKL-04 | `done` |
| **TSK-021** | P2 | Implementasi Model 3D Planet & Pencahayaan | TSK-020 | `src/scene/Planet.tsx` | Planet memiliki siluet gelap, rotasi lambat, dan rim light kebiruan yang dramatis. | SKL-04 | `done` |
| **TSK-022** | P2 | Implementasi Lapisan Bintang, Debu & Nebula | TSK-020 | `src/scene/Starfield.tsx`, `src/scene/Nebula.tsx` | Bintang jauh, tengah, dan debu foreground tampil berlapis dengan kedalaman nyata. | SKL-04 | `done` |
| **TSK-023** | P2 | Implementasi Camera Rig & Preset Posisi S01 | TSK-021, TSK-022 | `src/scene/CameraRig.tsx` | Kamera merespons kursor halus (ANM-007) tanpa menggeser layout DOM. | SKL-04 | `done` |
| **TSK-024** | P2 | Jembatan Progress Scroll DOM ke Ref WebGL | TSK-023 | `src/app/providers/SceneProvider.tsx` | Ref mutable memperbarui koordinat WebGL tanpa memicu re-render React per frame. | SKL-05 | `done` |
| **TSK-025** | P2 | Komponen Primitif Animasi Teks Judul & Baris | TSK-011, TSK-016 | `src/components/motion/*.tsx` | Reveal per huruf dan per baris menjaga satu kalimat lengkap di accessibility tree. | SKL-06 | `done` |
| **TSK-026** | P2 | Integrasi Vertical Slice Hero Lengkap | TSK-024, TSK-025 | `src/sections/Hero.tsx` | Intro hero selesai ≤ 1.4s, CTA dapat diklik langsung, scroll menuju About mulus. | SKL-05 | `done` |
| **TSK-027** | P2 | Profiling & Verifikasi Performa Slice Hero | TSK-026 | `evidence/hero-profiling.md` | Memenuhi target 60 FPS desktop, LCP ≤ 2.5s, dan draw calls ≤ 60 terverifikasi. | SKL-09 | `done` |
| **TSK-028** | P2 | Gerbang Visual Hero (Milestone Gate 2) | TSK-027 | `evidence/gate-2-hero.md` | Rekaman transisi hero desktop/mobile/reduced motion tersimpan. | SKL-10 | `done` |

---

### Fase P3 — Koreografi Scene & Animasi Seluruh Halaman

| Task ID | Fase | Deskripsi Pekerjaan | Dependensi | Berkas Target | Kriteria Acceptance & Bukti | Skill | Status |
|---|---|---|---|---|---|---|---|
| **TSK-029** | P3 | Fondasi Lifecycle Timeline & Debounced Refresh | TSK-028 | `src/animation/tokens.ts`, `src/animation/register.ts` | Pembersihan `gsap.context()` terstandarisasi di semua section; resize aman. | SKL-05 | `done` |
| **TSK-030** | P3 | Sistem Layout Fleksibel Track Karya & Keahlian | TSK-010, TSK-029 | `src/sections/Work.tsx`, `src/sections/Skills.tsx` | Mendukung jumlah proyek variabel (1–6) tanpa celah layout atau ruang kosong. | SKL-07 | `done` |
| **TSK-031** | P3 | Implementasi ANM Global (ANM-001 s/d ANM-012) | TSK-029 | `src/components/layout/*.tsx`, `src/scene/*.tsx` | Transisi poster, parallax bintang multi-layer, header scrolled, dan journey bar aktif. | SKL-05 | `done` |
| **TSK-032** | P3 | Implementasi ANM Hero Final (ANM-013 s/d ANM-022) | TSK-029 | `src/sections/Hero.tsx` | Intro teks per huruf, pendekatan planet, dan handoff ke About terkalibrasi penuh. | SKL-05 | `done` |
| **TSK-033** | P3 | Implementasi ANM About (ANM-023 s/d ANM-030) | TSK-029 | `src/sections/About.tsx` | Reveal judul, bio per baris, zona tenang membaca, dan peredupan nebula aman. | SKL-06 | `done` |
| **TSK-034** | P3 | Implementasi ANM Warp (ANM-031 s/d ANM-034) | TSK-029 | `src/scene/Warp.tsx` | Satu puncak streak bintang (8x) bebas strobo; reset bersih saat fast scroll. | SKL-05 | `done` |
| **TSK-035** | P3 | Implementasi ANM Work (ANM-035 s/d ANM-044) | TSK-030 | `src/components/projects/*.tsx` | Track horizontal desktop pin terukur, zoom kartu tengah, tilt 3D mikro aktif. | SKL-07 | `done` |
| **TSK-036** | P3 | Implementasi ANM Skills (ANM-045 s/d ANM-052) | TSK-030 | `src/sections/Skills.tsx` | Simpul bintang konstelasi terhubung dengan proyek nyata; fokus keyboard jelas. | SKL-08 | `done` |
| **TSK-037** | P3 | Implementasi ANM Contact (ANM-053 s/d ANM-060) | TSK-015, TSK-029 | `src/sections/Contact.tsx` | Pengangkatan horizon planet fajar, tombol magnetik, dan tombol back to top aktif. | SKL-05 | `done` |
| **TSK-038** | P3 | Implementasi ANM Detail (ANM-061 s/d ANM-062) | TSK-014, TSK-029 | `src/pages/ProjectPage.tsx` | Transisi masuk halaman studi kasus dan reveal galeri gambar bebas CLS. | SKL-07 | `done` |
| **TSK-039** | P3 | Integrasi Perjalanan Penuh S01 s/d S06 | TSK-031, TSK-032, TSK-033, TSK-034, TSK-035, TSK-036, TSK-037, TSK-038 | `src/pages/HomePage.tsx` | Perjalanan scroll maju dan mundur mulus dari orbit hingga horizon kontak. | SKL-05 | `done` |
| **TSK-040** | P3 | Implementasi ANM Mode & Failure (ANM-063–064) | TSK-039 | `src/app/providers/*.tsx` | Pergantian mode live dan simulasi WebGL context loss tidak meninggalkan pin liar. | SKL-08 | `done` |
| **TSK-041** | P3 | Gerbang Animasi Penuh (Milestone Gate 3) | TSK-040 | `evidence/gate-3-motion.md` | Seluruh 64 ID animasi berstatus terimplementasi dan lulus uji reversibel. | SKL-10 | `done` |

---

### Fase P4 — Responsif, Aksesibilitas & Hardening (Selesai Penuh)

| Task ID | Fase | Deskripsi Pekerjaan | Dependensi | Berkas Target | Kriteria Acceptance & Bukti | Skill | Status |
|---|---|---|---|---|---|---|---|
| **TSK-042** | P4 | Integrasi Konten Final & Verifikasi Klaim | TSK-003, TSK-041 | `src/content/*.ts` | Seluruh klaim publik diverifikasi; placeholder publik 0; status pending ditangani. | SKL-07 | `done` |
| **TSK-043** | P4 | Optimasi Aset Gambar, Tekstur & Font | TSK-007, TSK-042 | `public/`, `src/styles/` | Gambar berformat AVIF/WebP/SVG, font sistem/Google fonts, tekstur prosedural efisien. | SKL-09 | `done` |
| **TSK-044** | P4 | Penalaan Layar Sentuh Mobile & Landscape | TSK-041 | `src/styles/*.css` | Area sentuh ≥ 44px, safe area notch aman, tidak ada horizontal overflow liar. | SKL-08 | `done` |
| **TSK-045** | P4 | Audit Aksesibilitas Keyboard & Screen Reader | TSK-042, TSK-044 | `evidence/accessibility-audit.md` | Navigasi Tab, SkipLink, focus trap di MobileMenu, ARIA labels, kanvas aria-hidden. | SKL-08 | `done` |
| **TSK-046** | P4 | Audit Kepatuhan Reduced Motion & No-JS | TSK-043, TSK-045 | `evidence/reduced-motion-audit.md` | Seluruh konten terbaca statis tanpa gerakan saat reduced motion atau no-JS aktif. | SKL-08 | `done` |
| **TSK-047** | P4 | Pengujian Kegagalan Hardware & Memory Leak | TSK-040, TSK-046 | `evidence/failure-testing.md` | WebGL fallback poster otomatis, pencegahan alokasi useFrame, lifecycle cleanup. | SKL-10 | `done` |
| **TSK-048** | P4 | Profiling Performa Perjalanan Lengkap S01–S06 | TSK-043, TSK-044 | `evidence/full-journey-profiling.md` | LCP ≤ 2.5s, CLS ≤ 0.1, VRAM GPU terkendali, alokasi objek loop dieliminasi. | SKL-09 | `done` |
| **TSK-049** | P4 | Kalibrasi Tangga Kualitas Grafis Adaptif | TSK-048 | `src/app/providers/MotionProvider.tsx` | Mode Full, Lite, dan Reduced menyesuaikan kepadatan partikel dan efek grafis. | SKL-09 | `done` |
| **TSK-050** | P4 | Matriks Pengujian Browser & Direct Rute | TSK-049 | `evidence/browser-matrix.md` | Server lokal aktif di port 5173; otomasi peramban mencatat kendala CDN driver Playwright. | SKL-10 | `in_progress` |
| **TSK-051** | P4 | Tinjauan Estetika Visual Semua Scene | TSK-050 | `src/scene/*.tsx` | Granulasi matahari, kawah multi-skala planet, ocean world, red planet, cincin Cassini selesai. | SKL-02 | `done` |
| **TSK-052** | P4 | Resolusi Defect & Perbaikan Prioritas P0/P1 | TSK-051 | `evidence/defect-resolution.md` | Bug transisi contact/horizon, crash spline roket, link fiktif di footer terselesaikan. | SKL-10 | `done` |
| **TSK-053** | P4 | Gerbang Calon Rilis (Release Candidate Gate 4) | TSK-052 | `evidence/gate-4-rc.md` | Seluruh kriteria acceptance terpenuhi; kandidat rilis lokal siap direview. | SKL-10 | `done` |

---

### Fase P5 — Kesiapan Rilis Lokal & Hosting

| Task ID | Fase | Deskripsi Pekerjaan | Dependensi | Berkas Target | Kriteria Acceptance & Bukti | Skill | Status |
|---|---|---|---|---|---|---|---|
| **TSK-054** | P5 | Metadata SEO, OpenGraph, Favicon & Sitemap | TSK-042, TSK-053 | `public/robots.txt`, `public/sitemap.xml`, `public/favicon.svg` | Tag OpenGraph valid, favicon SVG, robots dan sitemap terpasang dengan struktur rapi. | SKL-11 | `done` |
| **TSK-055** | P5 | Audit Keamanan Tautan, Rahasia & CSP | TSK-054 | `evidence/security-audit.md` | Zero secret, rel="noopener noreferrer" pada tautan luar, data sensitif terlindungi. | SKL-11 | `done` |
| **TSK-056** | P5 | Konfigurasi Platform Hosting & Staging Preview | TSK-055 | `vite.config.ts`, build artifacts | Menunggu keputusan domain & platform hosting oleh pemilik (tidak dideploy sekarang). | SKL-11 | `todo` |
| **TSK-057** | P5 | Smoke Test Preview Build Produksi | TSK-056 | `evidence/preview-smoke-test.md` | Build produksi tervalidasi sukses (100 modules transformed, dist/ bersih). | SKL-10 | `done` |
| **TSK-058** | P5 | Rilis Publikasi & Pencatatan Rollback | TSK-057 | `docs/18-release.md` | Menunggu instruksi deployment resmi pemilik. | SKL-11 | `todo` |
| **TSK-059** | P5 | Smoke Test Pasca Rilis di URL Final | TSK-058 | `evidence/post-release-smoke.md` | Dijalankan setelah rilis ke domain final. | SKL-10 | `todo` |
| **TSK-060** | P5 | Handoff Final & Dokumentasi Pemeliharaan | TSK-059 | `docs/21-handoff.md`, `README.md` | Dokumentasi README, handoff, traceability, dan progress tersinkronisasi penuh. | SKL-12 | `done` |

---

### Fase P6 — Ekspansi XEVRYN Space Hub (Selesai Penuh)

| Task ID | Fase | Deskripsi Pekerjaan | Dependensi | Berkas Target | Kriteria Acceptance & Bukti | Skill | Status |
|---|---|---|---|---|---|---|---|
| **TSK-061** | P6 | Arsitektur Routing SPA Space Hub | TSK-060 | `src/app/App.tsx`, `src/types/content.ts` | Mendukung rute `#roblox-lab`, `#atomic-hub`, `#playground`, `#asset-station`, `#devlog`, `#orbit-cafe` tanpa bentrok dengan anchor halaman beranda. | SKL-03 | `done` |
| **TSK-062** | P6 | Implementasi Halaman Roblox Lab | TSK-061 | `src/pages/RobloxLabPage.tsx`, `src/content/robloxCatalog.ts` | Suasana stasiun luar angkasa, fakta jujur status belajar Luau, katalog terstruktur, link ke Playground. Bebas executor/kode fiktif. | SKL-03 | `done` |
| **TSK-063** | P6 | Implementasi Halaman Atomic Hub | TSK-061 | `src/pages/AtomicHubPage.tsx`, `src/content/atomicMedia.ts` | Galeri hologram kontribusi Content Creator & Pemasaran, modal lightbox dengan Escape close dan focus restore. Pernyataan kontribusi jujur. | SKL-03 | `done` |
| **TSK-064** | P6 | Implementasi Halaman Playground | TSK-061 | `src/pages/PlaygroundPage.tsx` | Mini game Asteroid Dodge (canvas 2D, skor sesi & lokal, auto-pause tab inactive, batas asteroid, keyboard & touch controls), explorer planet, dan simulasi partikel. | SKL-04 | `done` |
| **TSK-065** | P6 | Implementasi Halaman Asset Station | TSK-061 | `src/pages/AssetStationPage.tsx`, `src/content/assets.ts`, `public/assets/downloads/` | Katalog dengan pencarian, filter kategori, preview modal, dan 4 file unduhan SVG orisinal berlisensi bebas (ikon, pola, wallpaper, brand mark). | SKL-03 | `done` |
| **TSK-066** | P6 | Implementasi Sistem Devlog Teknis | TSK-061 | `src/pages/DevlogPage.tsx`, `src/pages/DevlogDetailPage.tsx`, `src/content/devlog.ts` | Daftar artikel dan halaman detail faktual Three.js, GSAP roket, dan arsitektur Space Hub dengan tag filter dan link stasiun terkait. | SKL-07 | `done` |
| **TSK-067** | P6 | Implementasi Halaman Orbit Café | TSK-061 | `src/pages/OrbitCafePage.tsx` | Pemandangan jendela planet, cangkir kopi uap melayang, timer fokus berbasis Date.now anti-drift, mode fokus, dan generator ambience Web Audio prosedural. | SKL-08 | `done` |
| **TSK-068** | P6 | Fitur Utama Portfolio & Easter Eggs | TSK-061 | `src/sections/*.tsx`, `src/components/layout/*.tsx` | Laptop mockup frame pada project card, pergeseran suasana warna bertahap, Coffee Break in Orbit, mini jump map, dan sapaan astronaut / gelombang sinyal satelit. | SKL-05 | `done` |

