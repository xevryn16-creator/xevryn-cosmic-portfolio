---
name: structure-cosmic-app
description: SOP arsitektur aplikasi, bootstrap repositori, konfigurasi bundler Vite, static prerendering, dan integritas data konten untuk XEVRYN Cosmic Portfolio. Gunakan saat menginisialisasi proyek, mengatur rute, atau memodifikasi dependensi.
---

# Skill: structure-cosmic-app (SKL-03)

## 1. Gambaran Umum & Pemicu (Trigger)
Gunakan skill ini saat:
- Menjalankan bootstrap proyek awal menggunakan Vite + React + TypeScript.
- Mengonfigurasi plugin static prerendering (SSG) untuk rute Beranda, Studi Kasus, dan 404.
- Mengatur skema tipe data TypeScript dan batas tanggung jawab direktori kode sumber.

## 2. Dokumen Masukan Wajib (Inputs)
- [`docs/05-architecture.md`](file:///c:/Dev/Portofolio/docs/05-architecture.md) — Arsitektur teknis, render loop, dan kontrak integrasi.
- [`docs/06-project-structure.md`](file:///c:/Dev/Portofolio/docs/06-project-structure.md) — Peta direktori target dan konvensi penamaan berkas.
- [`docs/19-decisions.md`](file:///c:/Dev/Portofolio/docs/19-decisions.md) — Catatan keputusan arsitektur (ADR-001 s/d ADR-008).

## 3. Langkah Kerja Terstruktur
1. **Pemeriksaan Repositori Eksisting:** Periksa berkas `package.json` dan struktur folder saat ini. Jangan menimpa berkas dokumentasi atau pekerjaan pengguna.
2. **Kesesuaian Dependensi Inti:** Pasang hanya library yang telah disetujui dalam ADR: `react`, `react-dom`, `three`, `@react-three/fiber`, `@types/three`, `gsap`. Hindari menginstal Tailwind, Lenis, atau runtime styling lain.
3. **Konfigurasi Build & SSG:** Pastikan `vite.config.ts` dikonfigurasi untuk memecah chunk besar (*code-splitting*) dan mengisolasi kanvas 3D dari proses rendering HTML statis awal.
4. **Validasi Kompilasi:** Jalankan pemeriksaan tipe statis secara berkala menggunakan `npm run typecheck` dan `npm run build`.

## 4. Batas Tanggung Jawab (Boundaries)
- **Dilarang Menambahkan Framework Lain:** Keputusan telah mengunci React 19 + TypeScript + Vanilla CSS. Dilarang mengganti bundler ke Webpack atau menambahkan framework styling eksternal tanpa ADR baru.
- **Dilarang Hardcode Nilai Browser Global:** Dalam komponen yang diprerender (SSG), lindungi akses ke objek `window`, `document`, atau `localStorage` menggunakan pengecekan `typeof window !== 'undefined'`.

## 5. Validasi & Kriteria Selesai
- Perintah `npm run build` sukses menghasilkan file HTML mandiri untuk `/`, `/work/:slug`, dan `/404`.
- Tidak ada error kompilasi TypeScript (`tsc --noEmit` keluar dengan exit code 0).
