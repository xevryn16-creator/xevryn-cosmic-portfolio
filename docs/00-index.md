# 00 — Indeks Dokumentasi & Sumber Kebenaran

Versi: 1.0 · Tanggal: 21 September 2026 · Penulis: Tim Arsitektur & Agen Antigravity

---

## 1. Peta Dokumen & Hierarki Kebenaran

Dokumentasi repositori **XEVRYN Cosmic Portfolio** disusun secara modular dengan pembagian tanggung jawab yang jelas. Untuk menghindari konflik dan duplikasi informasi, setiap topik memiliki satu dokumen sebagai **Sumber Kebenaran Primer (Single Source of Truth)**.

| Dokumen | Judul / Topik | Status | Sumber Kebenaran Utama Untuk |
|---|---|---|---|
| [`00-index.md`](file:///c:/Dev/Portofolio/docs/00-index.md) | Indeks & Hierarki | **Aktif** | Struktur dokumentasi, konvensi penamaan, dan hierarki kebenaran |
| [`01-prd.md`](file:///c:/Dev/Portofolio/docs/01-prd.md) | Product Requirements | **Aktif** | Sasaran produk, batasan scope, audiens, dan requirement REQ-01–12 |
| [`02-art-direction.md`](file:///c:/Dev/Portofolio/docs/02-art-direction.md) | Arah Seni & Visual | **Aktif** | Konsep kosmik, pencahayaan, atmosfer, palet warna, dan anti-pattern |
| [`03-storyboard.md`](file:///c:/Dev/Portofolio/docs/03-storyboard.md) | Storyboard Scene | **Aktif** | Alur naratif S01–S06, komposisi desktop/mobile, state enter/hold/exit |
| [`04-design-system.md`](file:///c:/Dev/Portofolio/docs/04-design-system.md) | Sistem Desain | **Aktif** | Token CSS, tipografi responsif, sistem spasi, z-index, dan state tombol |
| [`05-architecture.md`](file:///c:/Dev/Portofolio/docs/05-architecture.md) | Arsitektur Teknis | **Aktif** | Stack teknologi, render loop, pemisahan ownership animasi, SSG/fallback |
| [`06-project-structure.md`](file:///c:/Dev/Portofolio/docs/06-project-structure.md) | Struktur Proyek | **Aktif** | Peta direktori kode sumber, modul aplikasi, dan tanggung jawab file |
| [`07-content.md`](file:///c:/Dev/Portofolio/docs/07-content.md) | Model Konten & Copy | **Aktif** | Struktur data profil/project/skill, status `CONTENT_PENDING`, copy statis |
| [`08-assets.md`](file:///c:/Dev/Portofolio/docs/08-assets.md) | Manifest Aset | **Aktif** | Inventaris aset AST-01–12, ukuran anggaran, lisensi, atribusi, fallback |
| [`09-motion-system.md`](file:///c:/Dev/Portofolio/docs/09-motion-system.md) | Sistem Gerak | **Aktif** | Token durasi/easing, pemetaan progress scroll, batch refresh, mode gerak |
| [`10-animation-register.md`](file:///c:/Dev/Portofolio/docs/10-animation-register.md) | Register Animasi | **Aktif** | Spesifikasi lengkap efek ANM-001–064, triggers, property, dan testing |
| [`11-responsive-accessibility.md`](file:///c:/Dev/Portofolio/docs/11-responsive-accessibility.md) | Responsif & Aksesibilitas | **Aktif** | Matriks viewport/pointer, navigasi keyboard, screen reader, WCAG 2.1 AA |
| [`12-performance.md`](file:///c:/Dev/Portofolio/docs/12-performance.md) | Anggaran Performa | **Aktif** | Target transfer, LCP/CLS/INP, GPU draw calls, batas memori VRAM, profiling |
| [`13-seo-contact-security.md`](file:///c:/Dev/Portofolio/docs/13-seo-contact-security.md) | SEO, Kontak & Keamanan | **Aktif** | Metadata OpenGraph, JSON-LD, sitemap, keamanan clipboard, kebijakan privasi |
| [`14-skill-system.md`](file:///c:/Dev/Portofolio/docs/14-skill-system.md) | Sistem Skill Agen | **Aktif** | Kontrak 21 skill (SKL-01–12 + 9 eksternal), arsitektur skill agen |
| [`skills-manifest.md`](file:///c:/Dev/Portofolio/docs/skills-manifest.md) | Manifest Lengkap Skill | **Aktif** | Inventaris 21 skill, repositori sumber, commit, lisensi, atribusi, status verifikasi |
| [`skill-routing.md`](file:///c:/Dev/Portofolio/docs/skill-routing.md) | Perutean Skill & Resolusi Konflik | **Aktif** | Matriks tanggung jawab skill, trigger mapping, resolusi estetika kosmik |
| [`skill-validation.md`](file:///c:/Dev/Portofolio/docs/skill-validation.md) | Laporan Validasi Skill | **Aktif** | Verifikasi frontmatter, discovery Antigravity, bukti uji terbatas berbasis dokumen |
| [`15-plan.md`](file:///c:/Dev/Portofolio/docs/15-plan.md) | Rencana Kerja & Fase | **Aktif** | Fase P0–P5, milestone gates, jalur kritis, dan rencana kontinjensi |
| [`16-tasks.md`](file:///c:/Dev/Portofolio/docs/16-tasks.md) | Register Task | **Aktif** | Pelacakan status TSK-001–060, dependensi, kriteria selesai, dan evidence |
| [`17-test-plan.md`](file:///c:/Dev/Portofolio/docs/17-test-plan.md) | Rencana Pengujian | **Aktif** | Skenario QA-01–24, pengujian browser/device matrix, severity defect |
| [`18-release.md`](file:///c:/Dev/Portofolio/docs/18-release.md) | Prosedur Rilis | **Aktif** | Release runbook, staging build, smoke testing rilis, dan protokol rollback |
| [`19-decisions.md`](file:///c:/Dev/Portofolio/docs/19-decisions.md) | Catatan Keputusan (ADR) | **Aktif** | Keputusan arsitektur ADR-001–008 beserta konteks, alternatif, dan konsekuensi |
| [`20-progress.md`](file:///c:/Dev/Portofolio/docs/20-progress.md) | Laporan Progres | **Aktif** | Catatan penyelesaian fase kerja, ringkasan sesi, dan blocker aktif |
| [`21-handoff.md`](file:///c:/Dev/Portofolio/docs/21-handoff.md) | Dokumen Handoff | **Aktif** | Serah terima sesi: status kerja, task berikutnya, verifikasi lingkungan |
| [`22-traceability.md`](file:///c:/Dev/Portofolio/docs/22-traceability.md) | Matriks Keterlacakan | **Aktif** | Matriks keterlacakan REQ → Scene → ANM → TSK → QA |

Dokumen historis master plan awal tersimpan di:
- [`XEVRYN-COSMIC-MASTER-PLAN.md`](file:///c:/Dev/Portofolio/XEVRYN-COSMIC-MASTER-PLAN.md) *(Blueprint awal sebelum modularisasi).*

---

## 2. Aturan Resolusi Konflik Informasi

Jika ditemukan perbedaan antara dokumen:
1. **Aturan Kebenaran Tertinggi:** Dokumen fungsional spesifik mengungguli dokumen umum (misal: jika ada perbedaan nilai easing, angka dalam `docs/09-motion-system.md` dan `docs/10-animation-register.md` menjadi rujukan mutlak, bukan ringkasan di PRD).
2. **Keputusan Arsitektur:** Setiap perubahan stack atau framework wajib melalui pencatatan di [`docs/19-decisions.md`](file:///c:/Dev/Portofolio/docs/19-decisions.md).
3. **Data Konten:** Data faktual pemilik wajib merujuk pada [`docs/07-content.md`](file:///c:/Dev/Portofolio/docs/07-content.md). Jangan pernah menyimpulkan fakta dari teks mock-up.
4. **Task & Progres:** Status pengerjaan resmi hanya dicatat di [`docs/16-tasks.md`](file:///c:/Dev/Portofolio/docs/16-tasks.md) dan [`docs/20-progress.md`](file:///c:/Dev/Portofolio/docs/20-progress.md).
