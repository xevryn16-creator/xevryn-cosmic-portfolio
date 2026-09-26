---
name: optimize-cosmic-performance
description: SOP profiling performa, optimasi draw calls WebGL, kompresi aset gambar/font, dan kalibrasi tangga kualitas grafis untuk XEVRYN Cosmic Portfolio. Gunakan saat mengukur frame rate, menganalisis bundel, atau mengoptimasi aset.
---

# Skill: optimize-cosmic-performance (SKL-09)

## 1. Gambaran Umum & Pemicu (Trigger)
Gunakan skill ini saat:
- Mengukur metrik performa build produksi (ukuran chunk JS/CSS, laporan Lighthouse/DevTools).
- Menemukan stutter atau penurunan frame rate pada perangkat mobile baseline.
- Mengompresi aset tekstur atau gambar sampul karya agar memenuhi anggaran transfer.

## 2. Dokumen Masukan Wajib (Inputs)
- [`docs/08-assets.md`](file:///c:/Dev/Portofolio/docs/08-assets.md) — Anggaran ukuran per aset dan format kompresi (AVIF/WebP).
- [`docs/12-performance.md`](file:///c:/Dev/Portofolio/docs/12-performance.md) — Anggaran transfer, Core Web Vitals, batas draw calls, dan tangga penurunan kualitas.

## 3. Langkah Kerja Terstruktur
1. **Analisis Ukuran Bundel:** Jalankan `npm run build` dan periksa ukuran chunk. Pastikan bundel non-3D awal tetap berada di bawah batas **250 KB** terkompresi.
2. **Profiling Frame Rate WebGL:**
   - Rekam trace performa menggunakan Chrome DevTools Performance panel pada scene terberat.
   - Periksa draw calls WebGL; jika > 60 calls, gabungkan material atau terapkan instancing.
3. **Batasi Resolusi Layar (DPR Capping):** Pastikan nilai Device Pixel Ratio dibatasi maksimal **1.5** untuk desktop dan **1.0** untuk mobile guna mencegah beban fill-rate GPU berlebih.
4. **Terapkan Tangga Penurunan Kualitas (Degradation Ladder):** Jika frame rate turun < 25 FPS selama 3 detik, kurangi densitas partikel bintang dan nonaktifkan efek post-processing berat.
5. **Kunci Aspek Rasio (CLS Prevention):** Pastikan seluruh elemen gambar memiliki wadah berdimensi stabil untuk menjaga CLS ≤ 0.1.

## 4. Batas Tanggung Jawab (Boundaries)
- **Dilarang Mengklaim Skor Tanpa Pengukuran Nyata:** Jangan mengklaim performa lulus 100 FPS tanpa menyertakan spesifikasi perangkat dan rekaman trace DevTools yang sebenarnya.
- **Dilarang Menghilangkan Identitas Visual Demi Skor:** Optimasi harus dilakukan secara terarah pada shader dan kompresi, bukan dengan menghapus seluruh tema kosmik.

## 5. Validasi & Kriteria Selesai
- Bundel produksi memenuhi anggaran ukuran yang disepakati.
- Frame rate stabil pada target 60 FPS desktop / 30 FPS mobile pada perangkat baseline.
