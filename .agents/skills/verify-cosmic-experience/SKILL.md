---
name: verify-cosmic-experience
description: SOP penjaminan mutu (QA), eksekusi skenario uji QA-01 s/d QA-24, verifikasi lintas peramban, dan pelaporan defect untuk XEVRYN Cosmic Portfolio. Gunakan saat menguji fitur sebelum menandai task selesai atau mengevaluasi milestone gate.
---

# Skill: verify-cosmic-experience (SKL-10)

## 1. Gambaran Umum & Pemicu (Trigger)
Gunakan skill ini saat:
- Melakukan verifikasi penerimaan (*acceptance testing*) sebelum menandai task berstatus `done`.
- Mengevaluasi apakah suatu milestone gate (Gate 1 s/d Gate 5) siap dilalui.
- Menguji skenario regresi, direct route, ketahanan terhadap kegagalan hardware, dan kompatibilitas peramban.

## 2. Dokumen Masukan Wajib (Inputs)
- [`docs/17-test-plan.md`](file:///c:/Dev/Portofolio/docs/17-test-plan.md) — Matriks 24 skenario pengujian (QA-01 s/d QA-24) dan definisi tingkat keparahan (P0–P3).
- [`docs/22-traceability.md`](file:///c:/Dev/Portofolio/docs/22-traceability.md) — Matriks pemetaan requirement ke task dan skenario uji.

## 3. Langkah Kerja Terstruktur
1. **Pilih Skenario Terkait:** Cocokkan task aktif dengan nomor skenario QA pada `docs/22-traceability.md`.
2. **Eksekusi Pengujian Sesuai Prosedur:**
   - Jalankan prosedur langkah demi langkah yang tercantum di `docs/17-test-plan.md`.
   - Periksa kondisi batas: koneksi lambat, resize jendela di tengah animasi, direct URL reload, dan tombol Back peramban.
3. **Klasifikasikan Masalah (Severity Triaging):**
   - **P0 (Blocker):** Halaman crash, scroll terkunci, kebocoran data rahasia → Hentikan pekerjaan lain dan prioritaskan perbaikan segera.
   - **P1 (Critical):** Fitur karya/kontak gagal, fallback rusak → Wajib diperbaiki sebelum milestone gate ditutup.
4. **Simpan Bukti Verifikasi:** Catat hasil pengujian, command yang dijalankan, dan tangkapan layar/rekaman di direktori `evidence/`.
5. **Perbarui Status Task:** Hanya ubah status task menjadi `done` jika seluruh kriteria acceptance skenario QA terkait terbukti lulus.

## 4. Batas Tanggung Jawab (Boundaries)
- **Dilarang Menyamakan Build Pass dengan Visual Pass:** Jangan menandai pengujian visual atau animasi lulus hanya karena perintah `npm run build` sukses.
- **Dilarang Menyembunyikan Defect:** Seluruh kekurangan atau masalah yang belum terselesaikan wajib dilaporkan secara jujur di catatan sesi.

## 5. Validasi & Kriteria Selesai
- Seluruh skenario pengujian terkait task memiliki bukti konkret.
- Tidak ada defect berkategori P0 atau P1 yang tertinggal saat mengajukan milestone gate.
