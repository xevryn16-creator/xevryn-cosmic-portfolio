---
name: build-cosmic-projects
description: SOP pengembangan etalase karya proyek, track horizontal responsif, halaman studi kasus detail, dan integritas data karya untuk XEVRYN Cosmic Portfolio. Gunakan saat memodifikasi section Work, kartu proyek, atau halaman studi kasus.
---

# Skill: build-cosmic-projects (SKL-07)

## 1. Gambaran Umum & Pemicu (Trigger)
Gunakan skill ini saat:
- Membangun komponen jalur horizontal karya (`ProjectTrack.tsx`) atau kartu proyek (`ProjectCard.tsx`).
- Mengembangkan atau memperbarui halaman studi kasus detail (`src/pages/ProjectPage.tsx`).
- Menyesuaikan data proyek di `src/content/projects.ts` (mendukung 1 sampai 6 proyek secara dinamis).

## 2. Dokumen Masukan Wajib (Inputs)
- [`docs/07-content.md`](file:///c:/Dev/Portofolio/docs/07-content.md) — Skema data `ProjectContent`, penanganan tautan opsional, dan status `CONTENT_PENDING`.
- [`docs/10-animation-register.md`](file:///c:/Dev/Portofolio/docs/10-animation-register.md) — Kontrak animasi S04 (ANM-035 s/d ANM-044) dan Detail (ANM-061 s/d ANM-062).
- [`docs/13-seo-contact-security.md`](file:///c:/Dev/Portofolio/docs/13-seo-contact-security.md) — Metadata OpenGraph per proyek dan keamanan tautan eksternal.

## 3. Langkah Kerja Terstruktur
1. **Dukung Jumlah Proyek Dinamis (1–6 Karya):** Ukur total lebar overflow secara programatis (`scrollWidth - clientWidth`). Jika tidak ada overflow (misal hanya 1 proyek di layar lebar), jangan aktifkan pinning horizontal.
2. **Kunci Aspek Rasio Gambar:** Wadah gambar sampul dan galeri wajib memiliki aspek rasio terkunci (16:10) untuk mencegah layout shift (CLS).
3. **Sediakan Image Fallback:** Gunakan `ImageWithFallback.tsx` sehingga jika gambar tangkapan layar belum ada, kartu tetap menampilkan panel judul kosmik yang rapi.
4. **Dukung Direct Load Studi Kasus:** Pastikan URL `/work/:slug` dapat dibuka langsung melalui address bar dengan metadata lengkap dan tombol kembali yang berfungsi (`← Kembali ke Orbit Karya`).
5. **Pertahankan Posisi Scroll (Scroll Restoration):** Navigasi kembali dari studi kasus ke Beranda wajib mengembalikan posisi scroll ke kartu yang baru saja dibuka tanpa memutar ulang intro Hero.

## 4. Batas Tanggung Jawab (Boundaries)
- **Dilarang Mengarang Hasil Faktual:** Dilarang mencantumkan angka peningkatan bisnis fiktif (misal: "menaikkan conversion 300%") jika tidak ada bukti nyata dari pemilik.
- **Dilarang Tombol Tautan Kosong:** Jika properti tautan live/repositori tidak tersedia dalam data, tombol tautan tersebut disembunyikan secara bersih.

## 5. Validasi & Kriteria Selesai
- Semua kartu proyek dapat dibuka melalui klik mouse, ketukan layar sentuh, dan tombol Enter pada keyboard.
- Rute studi kasus dan tombol navigasi kembali bekerja mulus tanpa error peramban.
