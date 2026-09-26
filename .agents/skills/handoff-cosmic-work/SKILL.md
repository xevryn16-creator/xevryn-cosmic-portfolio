---
name: handoff-cosmic-work
description: SOP serah terima sesi kerja, dokumentasi kondisi repositori terkini, pelaporan task aktif, dan persiapan task berikutnya untuk XEVRYN Cosmic Portfolio. Gunakan saat mengakhiri sesi pengerjaan atau saat kuota token mendekati batas.
---

# Skill: handoff-cosmic-work (SKL-12)

## 1. Gambaran Umum & Pemicu (Trigger)
Gunakan skill ini saat:
- Mengakhiri sebuah sesi kerja sebelum memberikan laporan akhir ke pengguna.
- Kuota konteks/token percakapan mendekati batas aman (> 80% terpakai).
- Terjadi pergantian agen atau peralihan fokus pekerjaan antar-fase.

## 2. Dokumen Masukan Wajib (Inputs)
- [`docs/16-tasks.md`](file:///c:/Dev/Portofolio/docs/16-tasks.md) — Status terkini seluruh task TSK-001 s/d TSK-060.
- [`docs/19-decisions.md`](file:///c:/Dev/Portofolio/docs/19-decisions.md) — Keputusan arsitektur baru yang disepakati selama sesi.
- [`docs/20-progress.md`](file:///c:/Dev/Portofolio/docs/20-progress.md) — Log progres sesi dan pencapaian milestone.
- [`docs/21-handoff.md`](file:///c:/Dev/Portofolio/docs/21-handoff.md) — Dokumen serah terima utama.

## 3. Langkah Kerja Terstruktur
1. **Audit Perubahan Lokal:**
   - Periksa daftar berkas yang baru dibuat atau diubah selama sesi.
   - Pastikan tidak ada file sementara (*scratch scripts*) yang tertinggal di folder kerja utama.
2. **Perbarui Status Task:**
   - Ubah task yang telah diverifikasi menjadi `done` dan cantumkan bukti konkretnya.
   - Jika task aktif belum selesai, catat progress persisnya dan tandai sebagai `in_progress`.
3. **Perbarui Catatan Sesi:** Tambahkan ringkasan sesi kerja di `docs/20-progress.md`.
4. **Tulis Dokumen Handoff Terperinci:**
   - Perbarui `docs/21-handoff.md` dengan status repo aktual, task berikutnya yang siap dieksekusi, dan perintah verifikasi yang valid.
5. **Formulasikan Prompt Kelanjutan:** Sediakan prompt instruksi singkat yang dapat disalin agen berikutnya untuk melanjutkan pekerjaan tanpa kehilangan konteks.

## 4. Batas Tanggung Jawab (Boundaries)
- **Dilarang Menandai Task Selesai Berdasarkan Rencana:** Task hanya boleh ditandai `done` jika kodenya telah diverifikasi bekerja.
- **Dilarang Menyertakan Data Rahasia:** Pastikan tidak ada API key atau data privat yang terbawa ke dalam dokumen handoff.

## 5. Validasi & Kriteria Selesai
- Dokumen `docs/20-progress.md` dan `docs/21-handoff.md` mencerminkan kondisi riil repositori.
- Agen berikutnya dapat langsung memulai task aktif berikutnya tanpa perlu menebak langkah kerja.
