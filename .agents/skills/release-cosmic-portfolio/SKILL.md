---
name: release-cosmic-portfolio
description: SOP prosedur rilis produksi, staging preview smoke test, konfigurasi metadata SEO, dan protokol rollback darurat untuk XEVRYN Cosmic Portfolio. Gunakan saat mempersiapkan atau mengeksekusi publikasi rilis.
---

# Skill: release-cosmic-portfolio (SKL-11)

## 1. Gambaran Umum & Pemicu (Trigger)
Gunakan skill ini saat:
- Mempersiapkan rilis produksi dan melakukan audit keamanan pra-rilis.
- Mengonfigurasi metadata OpenGraph, favicon, sitemap XML, dan file robots.txt.
- Menjalankan smoke test pada lingkungan staging preview dan menyiapkan prosedur rollback darurat.

## 2. Dokumen Masukan Wajib (Inputs)
- [`docs/13-seo-contact-security.md`](file:///c:/Dev/Portofolio/docs/13-seo-contact-security.md) — Metadata SEO, integritas kontak, dan header keamanan.
- [`docs/18-release.md`](file:///c:/Dev/Portofolio/docs/18-release.md) — Release runbook 8 langkah dan protokol rollback.

## 3. Langkah Kerja Terstruktur
1. **Audit Keamanan Pra-Rilis:**
   - Pastikan tidak ada API key, token rahasia, atau kredensial yang tersimpan di repositori.
   - Pastikan seluruh tautan eksternal menggunakan `rel="noopener noreferrer"`.
2. **Kompilasi Bersih & Validasi Artefak:**
   - Jalankan `npm run build`. Pastikan file HTML untuk Beranda, Studi Kasus, dan 404 terbentuk di `dist/`.
3. **Deploy Staging Preview & Smoke Test:**
   - Unggah bundel ke URL staging tertutup.
   - Jalankan checklist smoke test: direct rute studi kasus, tombol salin email, fallback Reduced Motion, dan halaman 404.
4. **Promosi Produksi & Verifikasi Live:**
   - Promosikan artefak staging ke domain resmi portofolio.
   - Periksa sertifikat SSL/HTTPS, pratinjau kartu media sosial (1200×630px), dan sitemap XML.
5. **Siapkan Titik Rollback:** Catat ID commit atau versi deployment stabil sebelumnya yang siap dipulihkan jika terjadi keadaan darurat.

## 4. Batas Tanggung Jawab (Boundaries)
- **Dilarang Rilis Jika Masih Ada Isu P0/P1:** Rilis wajib ditahan jika ada masalah pada fungsi utama kontak, pembukaan studi kasus, atau layout shift besar.
- **Dilarang Publikasi Tanpa Mandat:** Rilis produksi hanya dijalankan jika ada perintah eksplisit dari pengguna.

## 5. Validasi & Kriteria Selesai
- Seluruh checklist smoke test pada URL preview lolos 100%.
- Titik pemulihan (*rollback target*) tercatat dan siap diaktifkan dalam waktu < 2 menit.
