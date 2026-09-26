---
name: design-cosmic-scenes
description: SOP penataan komposisi visual, token sistem desain, pencahayaan kosmik, dan keselarasan storyboard untuk XEVRYN Cosmic Portfolio. Gunakan saat merancang tata letak scene, palet warna, tipografi, atau material 3D.
---

# Skill: design-cosmic-scenes (SKL-02)

## 1. Gambaran Umum & Pemicu (Trigger)
Gunakan skill ini saat:
- Mengatur tata letak dan komposisi visual pada scene S01 s/d S06.
- Menambahkan atau menyesuaikan token warna, spasi, radius, atau tipografi.
- Menelaah kepatuhan terhadap arah seni sinematik kosmik dan zona ketenangan baca.

## 2. Dokumen Masukan Wajib (Inputs)
- [`docs/02-art-direction.md`](file:///c:/Dev/Portofolio/docs/02-art-direction.md) — Filosofi kosmik, model pencahayaan, dan daftar anti-pattern.
- [`docs/03-storyboard.md`](file:///c:/Dev/Portofolio/docs/03-storyboard.md) — Rincian komposisi desktop/mobile dan state enter/hold/exit tiap scene.
- [`docs/04-design-system.md`](file:///c:/Dev/Portofolio/docs/04-design-system.md) — Definisi CSS Custom Properties dan spesifikasi komponen.

## 3. Langkah Kerja Terstruktur
1. **Verifikasi Token Desain:** Gunakan token CSS yang sudah ada di `src/styles/tokens.css`. Hindari penulisan nilai warna heksadesimal acak di dalam komponen.
2. **Periksa Rasio Kontras:** Pastikan teks utama (`--color-text-main`) dan teks sekunder (`--color-text-muted`) memenuhi rasio kontras WCAG AA (> 4.5:1) terhadap latar belakang kosmik.
3. **Patuhi Model Pencahayaan:** Seluruh benda langit wajib mengikuti arah cahaya tunggal (*key light*) dari sudut kiri atas dengan rim lighting kebiruan halus.
4. **Jaga Zona Ketenangan Membaca:** Pastikan bidang belakang teks narasi (About) dan kartu karya (Work) bebas dari kilatan partikel bintang yang menyilaukan.
5. **Verifikasi Tata Letak Mobile:** Pastikan komposisi mobile dirancang secara terpisah (alur 1 kolom vertikal alami, padding aman dari notch).

## 4. Batas Tanggung Jawab (Boundaries)
- **Dilarang Warna Neon Acak:** Jangan memasukkan gradien pelangi atau aksen warna hijau/kuning neon yang merusak estetika *deep space*.
- **Dilarang Strobo Putih Layar Penuh:** Seluruh efek transisi Warp wajib bebas dari kedipan putih menyilaukan.
- **Dilarang Menghilangkan Kursor Standar:** Kursor mouse sistem operasi wajib dipertahankan.

## 5. Validasi & Kriteria Selesai
- Komposisi visual sesuai dengan spesifikasi storyboard pada `docs/03-storyboard.md`.
- Seluruh elemen teks terbaca tajam dan tidak mengalami layout shift saat gambar selesai dimuat.
