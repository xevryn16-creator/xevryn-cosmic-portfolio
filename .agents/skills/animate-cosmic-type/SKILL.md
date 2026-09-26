---
name: animate-cosmic-type
description: SOP animasi tipografi teks per huruf, per baris, isolasi pembaca layar, dan penanganan reflow font untuk XEVRYN Cosmic Portfolio. Gunakan saat mengimplementasikan teks pembuka Hero, bio per baris, atau judul section.
---

# Skill: animate-cosmic-type (SKL-06)

## 1. Gambaran Umum & Pemicu (Trigger)
Gunakan skill ini saat:
- Mengembangkan atau memperbaiki komponen teks animasi (`AnimatedHeading.tsx`, `AnimatedLines.tsx`).
- Mengatur efek kemunculan huruf pada nama brand Hero (ANM-013/014) atau bio per baris (ANM-024).
- Menangani masalah pemisahan teks (*SplitText*) yang berantakan saat font selesai dimuat atau saat jendela di-resize.

## 2. Dokumen Masukan Wajib (Inputs)
- [`docs/04-design-system.md`](file:///c:/Dev/Portofolio/docs/04-design-system.md) — Skala ukuran font responsif dan aturan hierarki heading tunggal `<h1>`.
- [`docs/09-motion-system.md`](file:///c:/Dev/Portofolio/docs/09-motion-system.md) — Nilai durasi stagger per huruf (28ms) dan per baris (100ms).
- [`docs/11-responsive-accessibility.md`](file:///c:/Dev/Portofolio/docs/11-responsive-accessibility.md) — Pola isolasi semantik untuk pembaca layar (Screen Reader).

## 3. Langkah Kerja Terstruktur
1. **Sinkronisasi Kesiapan Font:** Jangan pernah memecah teks sebelum `document.fonts.ready` tuntas. Menjalankan split text sebelum font siap akan menyebabkan salah perhitungan dimensi dan layout shift.
2. **Terapkan Isolasi Semantik Screen Reader:**
   - Elemen induk wajib menyediakan teks utuh melalui atribut semantik atau `aria-label`.
   - Seluruh elemen `<span>` pembungkus huruf/baris animasi dekoratif wajib diberi atribut `aria-hidden="true"`.
3. **Patuhi Batas Waktu Intro Hero:** Seluruh rangkaian intro teks nama XEVRYN wajib selesai dalam waktu maksimal 1.4 detik. Jika pengguna langsung melakukan scroll, intro langsung meloncat ke status akhir.
4. **Tangani Reflow Jendela:** Daftarkan listener resize yang mengembalikan teks ke bentuk aslinya (*revert*), menghitung ulang pemotongan baris baru, lalu menerapkan kembali efek animasi.

## 4. Batas Tanggung Jawab (Boundaries)
- **Dilarang Memecah Seluruh Paragraf per Huruf:** Hanya judul utama yang diizinkan dipecah per huruf. Paragraf deskripsi hanya boleh dipecah per baris demi performa DOM.
- **Dilarang Menghilangkan Tautan di Dalam Paragraf:** Jika di dalam paragraf terdapat tautan, tautan tersebut wajib tetap dapat menerima fokus keyboard normal.

## 5. Validasi & Kriteria Selesai
- Pengujian VoiceOver / NVDA membuktikan judul dibaca sebagai satu kata/kalimat utuh normal tanpa mengeja huruf satu per satu.
- Mengubah ukuran jendela peramban tidak memicu penumpukan kata ganda atau huruf terpotong.
