---
name: plan-cosmic-portfolio
description: SOP perencanaan scope, audit dependensi, evaluasi milestone gate, dan pembaruan task untuk proyek XEVRYN Cosmic Portfolio. Gunakan saat pengguna meminta peninjauan rencana, perubahan fitur, atau audit keterlacakan requirement.
---

# Skill: plan-cosmic-portfolio (SKL-01)

## 1. Gambaran Umum & Pemicu (Trigger)
Gunakan skill ini saat:
- Mengevaluasi apakah fitur baru berada dalam batas scope v1.
- Meninjau kriteria milestone gate sebelum beralih fase (Gate 0 s/d Gate 5).
- Memeriksa konsistensi task register, dependensi melingkar, dan matriks keterlacakan.

## 2. Dokumen Masukan Wajib (Inputs)
Sebelum mengambil keputusan perencanaan, baca berkas berikut:
- [`docs/01-prd.md`](file:///c:/Dev/Portofolio/docs/01-prd.md) — Batasan scope v1 dan definisi kebutuhan REQ-01–12.
- [`docs/15-plan.md`](file:///c:/Dev/Portofolio/docs/15-plan.md) — Rencana fase P0–P5 dan kriteria gerbang.
- [`docs/16-tasks.md`](file:///c:/Dev/Portofolio/docs/16-tasks.md) — Register task dan status dependensi.
- [`docs/22-traceability.md`](file:///c:/Dev/Portofolio/docs/22-traceability.md) — Matriks pemetaan REQ ke ANM dan QA.

## 3. Langkah Kerja Terstruktur
1. **Verifikasi Scope:** Bandingkan permintaan perubahan dengan Batasan Scope v1 pada `docs/01-prd.md`. Tolak penambahan audio autoplay, backend kustom, atau fitur di luar v1 tanpa persetujuan eksplisit.
2. **Audit Dependensi:** Jika menambahkan task baru, berikan ID stabil baru (misal `TSK-061+`), tentukan dependensi task induknya, dan pastikan tidak ada dependensi melingkar (*circular dependencies*).
3. **Pemberian Status Data:** Jika ada informasi personal atau proyek baru yang belum lengkap, tandai sebagai `CONTENT_PENDING` pada `docs/07-content.md`.
4. **Pembaruan Dokumen Terkait:** Perbarui berkas `docs/16-tasks.md`, `docs/20-progress.md`, dan `docs/22-traceability.md`.

## 4. Batas Tanggung Jawab (Boundaries)
- **Dilarang Menulis Kode Langsung:** Skill ini bertugas menjaga konsistensi rencana dan arsitektur, bukan mengimplementasikan kode scene atau styling.
- **Dilarang Menghapus Requirement Inti:** REQ-01 s/d REQ-12 adalah janji kualitas produk yang tidak boleh dihapus sepihak.

## 5. Validasi & Kriteria Selesai
- Setiap task baru memiliki ID unik, deskripsi pekerjaan, kriteria acceptance, dan terpetakan ke nomor QA.
- Tidak ada ID duplikat atau dependensi yang merujuk pada task fiktif.
