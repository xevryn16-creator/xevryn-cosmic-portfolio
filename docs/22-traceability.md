# 22 — Matriks Keterlacakan Penuh (Traceability Matrix)

Versi: 1.0 · Tanggal: 21 September 2026 · Status: Disetujui

---

## 1. Ikhtisar Keterlacakan End-to-End

Matriks ini menghubungkan seluruh siklus rekayasa perangkat lunak:
```text
Kebutuhan (REQ) ──► Scene Narasi (S01–S06) ──► Animasi (ANM) ──► Task Pelaksanaan (TSK) ──► Skenario Uji (QA)
```
Dengan pemetaan ini, tidak ada satu pun kebutuhan fungsional yang terlewat, dan setiap baris kode animasi memiliki penanggung jawab task serta skenario pengujian acceptance yang konkret.

---

## 2. Tabel Pemetaan Keterlacakan (REQ → Scene → ANM → TSK → QA)

| ID Kebutuhan | Deskripsi Kebutuhan | Scene Terkait | Register Animasi (ANM) | Task Terkait (TSK) | Skenario Uji (QA) |
|---|---|---|---|---|---|
| **REQ-01** | Identitas & CTA Segera Tampil | S01 (Orbit / Hero) | ANM-001, ANM-008, ANM-013, ANM-015, ANM-016 | TSK-013, TSK-019, TSK-026, TSK-032 | QA-01, QA-09, QA-18 |
| **REQ-02** | Tema Kosmik Sinematik Konsisten | Seluruh Scene (S01–S06) | ANM-002, ANM-003, ANM-005, ANM-006, ANM-017 | TSK-004, TSK-021, TSK-022, TSK-051 | QA-02, QA-23, QA-24 |
| **REQ-03** | Parallax & Kedalaman Berlapis | Global, S01, S02, S04 | ANM-002, ANM-003, ANM-004, ANM-007, ANM-027 | TSK-022, TSK-023, TSK-031, TSK-033 | QA-02, QA-03, QA-20 |
| **REQ-04** | Perjalanan Kamera & Transisi Halus | S01, S02, S03, S06 | ANM-021, ANM-022, ANM-029, ANM-032, ANM-053 | TSK-023, TSK-024, TSK-034, TSK-039 | QA-02, QA-03, QA-08 |
| **REQ-05** | Tipografi Ekspresif & Aksesibel | S01, S02, S04, S05, S06 | ANM-013, ANM-014, ANM-023, ANM-024, ANM-035, ANM-054 | TSK-011, TSK-025, TSK-032, TSK-033 | QA-05, QA-10, QA-17 |
| **REQ-06** | Showcase Karya yang Jelas & Terbuka | S04 (Destinasi Karya), Detail | ANM-035, ANM-036, ANM-037, ANM-038, ANM-040, ANM-041, ANM-042, ANM-044, ANM-061, ANM-062 | TSK-014, TSK-030, TSK-035, TSK-038 | QA-04, QA-06, QA-07, QA-08, QA-16 |
| **REQ-07** | Konstelasi Keahlian Berbasis Bukti | S05 (Konstelasi Keahlian) | ANM-045, ANM-046, ANM-047, ANM-048, ANM-049, ANM-050, ANM-051 | TSK-030, TSK-036 | QA-09, QA-10, QA-15 |
| **REQ-08** | Kontak Andal & Salin Email Satu-Klik | S06 (Horizon Planet & Kontak) | ANM-054, ANM-055, ANM-056, ANM-057, ANM-058, ANM-060 | TSK-015, TSK-037, TSK-055 | QA-06, QA-09, QA-15, QA-22 |
| **REQ-09** | Pengalaman Mobile yang Dirancang Khusus | Seluruh Scene (Tata Letak Mobile) | ANM-011, ANM-036 (mode stack vertikal), ANM-046 (mode accordion) | TSK-017, TSK-044 | QA-01, QA-05, QA-18, QA-19 |
| **REQ-10** | Kepatuhan Reduced Motion & Fallback | Global & Seluruh Scene | ANM-001 (poster fallback), ANM-063, ANM-064 | TSK-016, TSK-020, TSK-040, TSK-046, TSK-047 | QA-11, QA-12, QA-13, QA-14 |
| **REQ-11** | Performa Tinggi & Anggaran Terukur | Pipeline Rendering & Aset | Seluruh ANM (pengendalian FPS, throttling tab tersembunyi ANM-005/006) | TSK-027, TSK-043, TSK-048, TSK-049 | QA-01, QA-18, QA-20, QA-21, QA-23 |
| **REQ-12** | Keterlacakan & Handoff Siap Eksekusi | Sistem Dokumentasi & Skill | Dokumentasi Terpusat, SOP Skill SKL-01–12 | TSK-001–008, TSK-018, TSK-028, TSK-041, TSK-053, TSK-060 | QA-24, Audit Konsistensi Docs |

---

## 3. Matriks Pemetaan Animasi ke Komponen & Task

| ID Animasi | Nama Efek Ringkas | Komponen Pemilik Utama | Task Terkait | Skenario Verifikasi |
|---|---|---|---|---|
| **ANM-001 s/d ANM-007** | Background Canvas, Parallax Bintang, Rotasi Planet, Pointer Rig | `src/scene/*.tsx` | TSK-020, TSK-021, TSK-022, TSK-031 | QA-01, QA-02, QA-12, QA-20 |
| **ANM-008 s/d ANM-012** | Header Enter, Scrolled Blur, Nav Underline, Mobile Drawer, Journey Bar | `src/components/layout/*.tsx` | TSK-012, TSK-017, TSK-031 | QA-02, QA-09, QA-11, QA-18 |
| **ANM-013 s/d ANM-022** | Reveal Huruf Hero, Role, CTA, Rim Light, Orbit SVG, Approach, Handoff S02 | `src/sections/Hero.tsx`, `AnimatedHeading.tsx` | TSK-025, TSK-026, TSK-032 | QA-01, QA-02, QA-09, QA-10 |
| **ANM-023 s/d ANM-030** | Reveal Judul About, Bio per Baris, Text Highlight, Portrait, Exit S03 | `src/sections/About.tsx`, `AnimatedLines.tsx` | TSK-025, TSK-033 | QA-02, QA-10, QA-17 |
| **ANM-031 s/d ANM-034** | Warp Streak Onset, Camera Forward, Peak Tunnel (8x), Recovery Reset | `src/scene/Warp.tsx` | TSK-034 | QA-02, QA-03, QA-11, QA-23 |
| **ANM-035 s/d ANM-044** | Work Heading, Horizontal Track, Card Scale, Card Tilt, Zoom, Pin Release | `src/sections/Work.tsx`, `ProjectTrack.tsx`, `ProjectCard.tsx` | TSK-030, TSK-035 | QA-02, QA-04, QA-06, QA-16 |
| **ANM-045 s/d ANM-052** | Skills Heading, Star Nodes Reveal, Lines SVG, Node Glow, Detail Panel, Exit | `src/sections/Skills.tsx` | TSK-030, TSK-036 | QA-02, QA-09, QA-10, QA-15 |
| **ANM-053 s/d ANM-060** | Horizon Rise, Contact Heading, CTA, Magnetic Button, Copy Toast, Back to Top | `src/sections/Contact.tsx`, `CopyEmail.tsx`, `Footer.tsx` | TSK-015, TSK-037 | QA-02, QA-06, QA-09, QA-15, QA-22 |
| **ANM-061 s/d ANM-062** | Case Study Enter, Gallery Reveal | `src/pages/ProjectPage.tsx`, `ProjectGallery.tsx` | TSK-014, TSK-038 | QA-07, QA-08, QA-13 |
| **ANM-063 s/d ANM-064** | Live Motion Switch, WebGL Context Loss Recovery | `MotionProvider.tsx`, `SceneErrorBoundary.tsx` | TSK-016, TSK-020, TSK-040 | QA-11, QA-12, QA-21 |
