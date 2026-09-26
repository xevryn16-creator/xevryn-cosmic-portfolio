# 15 — Rencana Kerja, Fase & Milestone Gates (Plan)

Versi: 1.0 · Tanggal: 21 September 2026 · Status: Disetujui

---

## 1. Peta Jalan Pelaksanaan (Roadmap P0 s/d P5)

Pengembangan **XEVRYN Cosmic Portfolio** dibagi menjadi 6 fase terukur. Setiap fase memiliki kriteria gerbang (*milestone gate*) yang ketat sebelum fase berikutnya diizinkan dimulai:

```text
[ P0: Definisi & Dokumen ] ──► Gate 0: Seluruh dokumen & skill lengkap & konsisten
            │
[ P1: Fondasi & Prerender ] ──► Gate 1: Build sukses, rute statis & no-JS terbukti
            │
[ P2: Hero Vertical Slice ] ──► Gate 2: Hero 3D + fallback lulus uji visual & performa
            │
[ P3: Koreografi Penuh ]    ──► Gate 3: Seluruh 64 ANM terpasang, scroll bolak-balik aman
            │
[ P4: Hardening & QA ]      ──► Gate 4: Zero bug P0/P1, lulus audit aksesibilitas & mobile
            │
[ P5: Rilis & Publikasi ]   ──► Gate 5: Smoke test URL produksi lulus, rollback siap
```

---

## 2. Rincian Fase & Kriteria Gerbang (Milestone Gates)

### 2.1 Fase P0 — Definisi, Perencanaan & Dokumentasi (Fase Aktif)
- **Tujuan:** Menuntaskan seluruh cetak biru, token desain, kontrak arsitektur, spesifikasi animasi ANM-001–064, matriks pengujian, dan skill proyek.
- **Hasil:** Berkas `README.md`, `AGENTS.md`, 23 modul dokumen di `docs/`, dan 12 berkas skill di `.agents/skills/`.
- **Kriteria Gerbang (Gate 0):** Seluruh dokumen lengkap tanpa kalimat penampung "akan diisi nanti", register animasi 100% terpetakan, dan audit konsistensi selesai.

### 2.2 Fase P1 — Fondasi Aplikasi & Prerender Statis
- **Tujuan:** Membangun kerangka aplikasi React + Vite + TypeScript yang kokoh dengan dukungan static prerendering (SSG), sistem rute, skema konten typed, dan token CSS.
- **Task Terkait:** TSK-009 sampai TSK-018.
- **Kriteria Gerbang (Gate 1):** Perintah `npm run build` sukses menghasilkan HTML statis untuk `/`, `/work/:slug`, dan `/404`. Membuka situs tanpa JavaScript menampilkan konten utama secara utuh.

### 2.3 Fase P2 — Art Direction & Vertical Slice Hero
- **Tujuan:** Membangun satu potongan vertikal (*vertical slice*) lengkap pada Scene 01 (Hero) yang mengintegrasikan kanvas 3D WebGL, planet, pencahayaan rim light, partikel bintang, animasi teks per huruf, dan transisi kamera menuju About.
- **Task Terkait:** TSK-019 sampai TSK-028.
- **Kriteria Gerbang (Gate 2):** Hero beroperasi mulus pada desktop (60 FPS) dan mobile (30 FPS), transisi poster-ke-canvas bekerja tanpa flickering, dan scroll menuju About terbukti halus.

### 2.4 Fase P3 — Koreografi Scene & Animasi Seluruh Halaman
- **Tujuan:** Menerapkan seluruh scene (S01–S06) dan mengimplementasikan seluruh 64 efek dalam Register Animasi (ANM-001 s/d ANM-064), termasuk jalur horizontal karya dan konstelasi keahlian.
- **Task Terkait:** TSK-029 sampai TSK-041.
- **Kriteria Gerbang (Gate 3):** Pengujian scroll maju-mundur, fast-scroll ke footer, resize jendela, dan pengalihan mode gerak (Full/Lite/Reduced) tidak meninggalkan glitch atau scroll terkunci.

### 2.5 Fase P4 — Responsif, Aksesibilitas & Hardening
- **Tujuan:** Memasukkan materi konten final, penyesuaian tata letak layar sentuh mobile, audit pembaca layar, pengujian degradasi WebGL context loss, dan profiling performa perangkat baseline.
- **Task Terkait:** TSK-042 sampai TSK-053.
- **Kriteria Gerbang (Gate 4):** Bebas cacat berkategori P0 dan P1. Seluruh anggaran performa (LCP ≤ 2.5s, CLS ≤ 0.1, VRAM ≤ 64MB) terpenuhi dengan bukti rekaman/trace nyata.

### 2.6 Fase P5 — Rilis, Hosting & Publikasi
- **Tujuan:** Penyusunan metadata OpenGraph, sitemap XML, audit keamanan tautan, deployment ke lingkungan staging/preview, pengujian smoke test rilis, dan dokumentasi pemeliharaan.
- **Task Terkait:** TSK-054 sampai TSK-060.
- **Kriteria Gerbang (Gate 5):** Seluruh tautan terverifikasi, canonical URL aktif, smoke test produksi lulus, dan prosedur rollback terdokumentasi rapi.

---

## 3. Jalur Kritis & Manajemen Risiko (Critical Path & Risks)

### Jalur Kritis (Critical Path)
```text
Spike Prerender (TSK-006) ──► Bootstrap (TSK-009) ──► Layout Semantic (TSK-012)
                             │
                             ▼
Kanvas WebGL (TSK-020) ──► Vertical Slice Hero (TSK-026) ──► Progress Bridge (TSK-024)
                             │
                             ▼
Horizontal Track (TSK-035) ──► Integrasi Full Journey (TSK-039) ──► Profiling & QA (TSK-048)
```

### Mitigasi Risiko Utama
1. **Risiko Konten Tertunda:** Jika pemilik belum memberikan foto atau teks bio lengkap, proyek tetap melaju menggunakan data `CONTENT_PENDING` dengan komponen adaptif yang menyembunyikan elemen kosong.
2. **Risiko Kompatibilitas Prerender:** Jika plugin SSG mengalami benturan dengan dependensi Three.js pada Node.js, isolasi modul WebGL via dynamic import (`React.lazy`) akan memastikan kompilasi HTML statis tetap berjalan lancar.
3. **Risiko Keterbatasan GPU Mobile:** Mode Lite otomatis mematikan partikel berat dan efek warp, memastikan situs tetap dingin dan nyaman digunakan di ponsel pintar.
