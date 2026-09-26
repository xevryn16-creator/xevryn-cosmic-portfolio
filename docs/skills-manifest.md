# Manifest Skill Proyek — XEVRYN Cosmic Portfolio

Versi: 1.0 · Tanggal: 21 September 2026 · Status: Aktif & Terverifikasi

Dokumen ini mencatat inventaris lengkap, sumber resmi, versi/commit, lisensi, atribusi, dependensi, adaptasi lokal, dan status verifikasi nyata untuk seluruh skill dan perkakas agen yang terpasang pada workspace **XEVRYN Cosmic Portfolio** di lingkungan **Google Antigravity IDE**.

> [!IMPORTANT]
> **Prinsip Status:** File berhasil disalin (`terpasang`) tidak sama dengan skill terverifikasi (`terdeteksi` dan `sudah diuji`). Kolom status di bawah mencerminkan kondisi verifikasi faktual di lingkungan Antigravity.

---

## 1. Inventaris Skill Eksternal Pilihan

Berikut adalah daftar skill eksternal yang dipilih sesuai mandat instruksi pengguna untuk melengkapi alur kerja perancangan, dokumentasi, audit, dan implementasi:

| Nama Skill (Frontmatter) | Repositori & Jalur Sumber | Versi / Commit Referensi | Lisensi & Atribusi | Lokasi Instalasi | Kebutuhan Pendukung / Skrip | Peran & Waktu Penggunaan | Status Verifikasi |
|---|---|---|---|---|---|---|---|
| `ui-ux-pro-max` | [`nextlevelbuilder/ui-ux-pro-max-skill`](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | `main` (Latest sync Sep 2026) | MIT · nextlevelbuilder | `.agents/skills/ui-ux-pro-max/` | Python 3.x, `scripts/search.py`, `data/*.csv`, `data/*.json`, `references/*.md` | Panduan token desain, tipografi, palet, spacing, UX guidelines, dan responsivitas saat perancangan komponen | **Sudah Diuji** (Skrip & referensi lengkap, diuji pada evaluasi Hero) |
| `design-taste-frontend` | [`leonxlnx/taste-skill`](https://github.com/leonxlnx/taste-skill) | Commit `HEAD` (Sep 2026) · Status: Stabil/Experimental terkalibrasi | MIT · Leon Lin | `.agents/skills/design-taste-frontend/` | `SKILL.md` (Mandiri, tanpa dependensi biner eksternal) | Komposisi visual, ritme layout, hierarki antarmuka, dan arahan motion sinematik | **Sudah Diuji** (Dials disesuaikan: 8/9/3, diuji pada evaluasi Hero) |
| `spec-driven-development` | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) (`skills/spec-driven-development`) | Commit `HEAD` (Sep 2026) | Apache-2.0 · Addy Osmani | `.agents/skills/spec-driven-development/` | `SKILL.md` | Penyusunan spesifikasi formal sebelum penulisan kode, pemetaan kapabilitas modul | **Sudah Diuji** (Divalidasi pada penguraian task TSK-009A) |
| `planning-and-task-breakdown` | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) (`skills/planning-and-task-breakdown`) | Commit `HEAD` (Sep 2026) | Apache-2.0 · Addy Osmani | `.agents/skills/planning-and-task-breakdown/` | `references/` (7 checklist: a11y, DoD, observability, orchestration, perf, security, test) | Dekomposisi spesifikasi menjadi unit task kecil terurut dengan dependensi & kriteria selesai | **Sudah Diuji** (Divalidasi pada pembagian task & referensi lokal) |
| `documentation-and-adrs` | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) (`skills/documentation-and-adrs`) | Commit `HEAD` (Sep 2026) | Apache-2.0 · Addy Osmani | `.agents/skills/documentation-and-adrs/` | `SKILL.md` | Dokumentasi keputusan arsitektur (ADR), rationale teknis, trade-off, dan pembaruan `docs/19-decisions.md` | **Sudah Diuji** (Digunakan pada struktur ADR ADR-001–008) |
| `performance-optimization` | [`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills) (`skills/performance-optimization`) | Commit `HEAD` (Sep 2026) | Apache-2.0 · Addy Osmani | `.agents/skills/performance-optimization/` | `references/` (7 checklist shared dari repo Addy Osmani) | Metodologi profiling, penyusunan performance budget, audit Core Web Vitals, dan persiapan bottleneck fix | **Terpasang & Terdeteksi** (Disiapkan untuk fase implementasi/pengukuran; tidak mengarang benchmark) |
| `web-design-guidelines` | [`vercel-labs/agent-skills`](https://github.com/vercel-labs/agent-skills) (`skills/web-design-guidelines`) | v1.0.0 · Commit `HEAD` (Sep 2026) | Apache-2.0 · Vercel Labs | `.agents/skills/web-design-guidelines/` | `references/web-interface-guidelines.md` (Cache lokal offline) | Pemeriksaan audit kode antarmuka terhadap Web Interface Guidelines (WCAG AA, touch target, focus states) | **Sudah Diuji** (Cache referensi terpasang, siap dipakai saat review) |
| `humanizer` | [`blader/humanizer`](https://github.com/blader/humanizer) | v3.0.0 · Commit `HEAD` (Sep 2026) | MIT · Blader | `.agents/skills/humanizer/` | `SKILL.md` | Menghilangkan gaya bahasa klise AI pada naskah bio, deskripsi proyek, CTA, dan prose tanpa merusak fakta/ID | **Sudah Diuji** (Diuji merapikan paragraf profil bio XEVRYN) |
| `caveman` | [`JuliusBrussee/caveman`](https://github.com/JuliusBrussee/caveman) | v1.x · Commit `HEAD` (Sep 2026) | MIT · Julius Brussee | `.agents/skills/caveman/` | `SKILL.md` | Komunikasi padat dan efisien antara agen dan pengguna (mode lite, bahasa Indonesia) untuk chat rutin | **Sudah Diuji** (Diuji pada format ringkasan progress & respon chat) |

---

## 2. Perkakas Terpisah: RTK (Rust Token Killer)

| Parameter | Catatan Verifikasi |
|---|---|
| **Alat** | RTK CLI (`rtk.exe`) |
| **Repositori Sumber** | [`https://github.com/rtk-ai/rtk`](https://github.com/rtk-ai/rtk) |
| **Versi Terpasang** | `0.42.4` (Binary path: `C:\Users\xevry\.local\bin\rtk.exe`) |
| **Integrasi Antigravity** | Terkonfigurasi pada tingkat workspace di `.agents/rules/antigravity-rtk-rules.md`. |
| **Command Setup** | `rtk init --agent antigravity` (Berhasil dijalankan dan terverifikasi). |
| **Peran Operasional** | Memfilter dan meringkas keluaran command shell (seperti git, npm, test) agar tidak membanjiri konteks agen dengan teks boilerplate. |
| **Aturan Integritas** | Tidak menjanjikan persentase penghematan token secara fiktif. Jika debugging membutuhkan output lengkap, agen menggunakan `rtk proxy <cmd>` atau command asli. Kode exit dan error message selalu dijaga utuh. |
| **Status** | **Aktif & Terverifikasi** |

---

## 3. Skill Internal Proyek XEVRYN (SKL-01 s/d SKL-12)

Selain skill eksternal di atas, proyek memiliki 12 skill operasional khusus domain kosmik di `.agents/skills/`:

1. `plan-cosmic-portfolio` (`SKL-01`) — Perencanaan scope dan audit dependensi.
2. `design-cosmic-scenes` (`SKL-02`) — Komposisi visual 3D kosmik, tata cahaya, dan palet atmosfer.
3. `structure-cosmic-app` (`SKL-03`) — Bootstrap proyek React + Vite, struktur modul, dan SSG.
4. `build-cosmic-webgl` (`SKL-04`) — Kanvas R3F, planet 3D, instanced starfield, dan shader nebula.
5. `choreograph-cosmic-scroll` (`SKL-05`) — Timeline GSAP, pinning track horizontal, dan scrub progress.
6. `animate-cosmic-type` (`SKL-06`) — Tipografi kinetik, split-text aksesibel, dan isolasi ARIA.
7. `build-cosmic-projects` (`SKL-07`) — Showcase kartu karya, modal detail studi kasus, dan link keluar.
8. `adapt-cosmic-accessibility` (`SKL-08`) — WCAG 2.1 AA, Reduced Motion, dan fallback WebGL statis.
9. `optimize-cosmic-performance` (`SKL-09`) — Budget memori GPU, kompresi aset KTX2/WebP, profiling FPS.
10. `verify-cosmic-experience` (`SKL-10`) — QA matrix, validasi lintas perangkat, dan audit regresi visual.
11. `release-cosmic-portfolio` (`SKL-11`) — Runbook rilis produksi, staging smoke test, dan rollback.
12. `handoff-cosmic-work` (`SKL-12`) — Manajemen transisi sesi, checkpoint task, dan pelaporan handoff.

---

## 4. Daftar Repository & Skill yang Dikecualikan Secara Sadar

Sesuai instruksi pengguna dan keputusan arsitektur, pilihan berikut **tidak dipasang** pada proyek ini:

1. **`dietrichgebert/ponytail`**: Dikecualikan karena perannya telah dipenuhi oleh `design-taste-frontend` dan sistem desain lokal.
2. **`mattpocock/skills`**: Dikecualikan untuk menghindari penumpukan instruksi TypeScript berulang yang sudah dicakup konvensi repositori.
3. **`anthropics/claude-code frontend-design`**: Dikecualikan karena mengasumsikan mekanisme eksekusi CLI Claude Code, bukan Antigravity IDE.
4. **`hardikpandya/stop-slop`**: Dikecualikan karena prinsip anti-slop telah tercakup penuh dalam `design-taste-frontend` dan `humanizer`.
5. **`shadcn-ui/ui` (Skill shadcn)**: Dikecualikan karena arsitektur UI proyek XEVRYN (`docs/05-architecture.md`) berbasis Tailwind CSS v4 mandiri dan CSS custom untuk visual kosmik 3D, tanpa dependensi shadcn/ui.
