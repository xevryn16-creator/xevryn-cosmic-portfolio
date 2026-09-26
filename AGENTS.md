# Panduan Agen Coding — XEVRYN Cosmic Portfolio

Dokumen ini adalah pedoman operasional wajib bagi setiap agen AI yang bekerja di repositori **XEVRYN Cosmic Portfolio**. Aturan dalam berkas ini melengkapi aturan global dan tidak boleh dilanggar.

---

## 1. Urutan Membaca Saat Memulai Sesi

Sebelum mengeksekusi perintah atau memodifikasi berkas apa pun, agen **wajib** membaca berkas dengan urutan berikut:

1. [`AGENTS.md`](file:///c:/Dev/Portofolio/AGENTS.md) *(berkas ini)* — Pahami batasan kerja, konvensi, dan aturan integritas.
2. [`docs/21-handoff.md`](file:///c:/Dev/Portofolio/docs/21-handoff.md) — Ketahui kondisi terakhir repositori, task aktif, dan catatan sesi sebelumnya.
3. [`docs/16-tasks.md`](file:///c:/Dev/Portofolio/docs/16-tasks.md) — Periksa status task, dependensi, dan kriteria acceptance untuk task yang akan dikerjakan.
4. [`docs/19-decisions.md`](file:///c:/Dev/Portofolio/docs/19-decisions.md) — Pahami keputusan arsitektur (ADR) agar tidak mengusulkan penggantian stack sembarangan.
5. Dokumen spesifik yang relevan dengan task aktif:
   - Jika mengerjakan WebGL/Scene: [`docs/05-architecture.md`](file:///c:/Dev/Portofolio/docs/05-architecture.md) & [`docs/08-assets.md`](file:///c:/Dev/Portofolio/docs/08-assets.md).
   - Jika mengerjakan Animasi/Scroll: [`docs/09-motion-system.md`](file:///c:/Dev/Portofolio/docs/09-motion-system.md) & [`docs/10-animation-register.md`](file:///c:/Dev/Portofolio/docs/10-animation-register.md).
   - Jika mengerjakan Tampilan/Komponen: [`docs/02-art-direction.md`](file:///c:/Dev/Portofolio/docs/02-art-direction.md) & [`docs/04-design-system.md`](file:///c:/Dev/Portofolio/docs/04-design-system.md).
   - Jika mengerjakan Konten/Studi Kasus: [`docs/07-content.md`](file:///c:/Dev/Portofolio/docs/07-content.md).
   - Jika mempersiapkan Verifikasi/Testing: [`docs/17-test-plan.md`](file:///c:/Dev/Portofolio/docs/17-test-plan.md).

---

## 2. Batasan Scope & Integritas Konten

1. **Dilarang Mengarang Konten:**
   - Dilarang membuat angka pengalaman fiktif ("10+ tahun pengalaman", "99% kepuasan klien").
   - Dilarang mengarang testimoni, penghargaan, studi kasus klien palsu, tautan media sosial yang tidak ada, atau alamat email palsu.
   - Jika informasi belum disediakan pemilik, gunakan nilai berstatus `CONTENT_PENDING` pada model data lokal (`docs/07-content.md`) dan tampilkan fallback yang elegan.
2. **Tidak Ada Dependency Tanpa Rencana:**
   - Jangan memasang library tambahan (seperti Tailwind, Framer Motion, Lenis, dll.) di luar arsitektur yang sudah diputuskan dalam [`docs/05-architecture.md`](file:///c:/Dev/Portofolio/docs/05-architecture.md) dan [`docs/19-decisions.md`](file:///c:/Dev/Portofolio/docs/19-decisions.md) tanpa membuat catatan ADR baru.
3. **Pemisahan Kepemilikan Animasi (Ownership Contract):**
   - **GSAP:** Mengelola timeline DOM, scroll pinning, progress scrub, dan pembaruan ref target numerik.
   - **React Three Fiber (R3F):** Mengelola render loop WebGL canvas tunggal di latar belakang. R3F hanya membaca ref target dari GSAP di dalam loop `useFrame`, tidak ada dua library yang memodifikasi property objek Three.js secara bersamaan.
   - **Native Scroll:** Tidak menggunakan library smooth-scroll eksternal yang memanipulasi event roda mouse secara agresif (scroll-jacking).
4. **Keterbacaan dan Ketenangan Konten (Calm Zones):**
   - Efek visual kosmik (bintang, nebula, kamera bergerak) adalah elemen pengiring, bukan pemeran utama.
   - Saat pengguna membaca bio (About), meneliti karya (Work), atau memilih keahlian (Skills), gerakan visual harus mereda (*calm state*) sehingga teks dan gambar terbaca jernih.

---

## 3. Aksesibilitas & Penanganan Kegagalan (Non-Negotiable)

Setiap implementasi wajib memenuhi kriteria berikut:
1. **Mode Reduced Motion:**
   - Jika pengguna menyalakan preferensi sistem `prefers-reduced-motion: reduce`, atau memilih mode "Reduced" pada kontrol UI, situs harus langsung mematikan parallax, warp streak, pergerakan kamera, dan rotasi terus-menerus. Konten tetap tampil utuh dan dapat diakses.
2. **Degradasi Anggun WebGL (Fallback):**
   - Jika WebGL tidak didukung, terjadi *context loss*, atau scene gagal dimuat dalam waktu 4 detik, antarmuka harus langsung beralih ke poster kosmik CSS/gambar statis. Seluruh teks DOM, tombol navigasi, dan link kontak harus 100% tetap berfungsi.
3. **Navigasi Keyboard & Screen Reader:**
   - Seluruh elemen interaktif harus memiliki outline fokus yang kontras di latar belakang gelap.
   - Elemen kanvas 3D dan partikel dekoratif wajib diberi atribut `aria-hidden="true"`.
   - Judul yang dianimasikan per huruf atau per baris harus mempertahankan teks semantik utuh di accessibility tree (hindari screen reader mengeja kata huruf demi huruf).

---

## 4. Aturan Pembaruan Task & Pelaporan Progres

1. **Status Task Resmi:**
   - `todo`: Belum dikerjakan.
   - `in_progress`: Sedang aktif dikerjakan (maksimal 1 task per agen pada satu waktu).
   - `blocked`: Tidak dapat dilanjutkan karena menunggu dependensi atau data dari pemilik.
   - `done`: Selesai diverifikasi terhadap kriteria acceptance dengan bukti konkret.
   - `deferred`: Ditunda secara sadar dengan alasan dan dampak yang terdokumentasi.
2. **Kriteria Menandai `done`:**
   - Task hanya boleh ditandai `done` jika kode telah ditulis, diuji (typecheck/lint/build/visual), dan bukti verifikasinya dicatat. Jangan menandai `done` hanya karena rencana telah ditulis!
3. **Pembaruan Handoff:**
   - Sebelum sesi berakhir atau saat kapasitas token menipis, agen wajib memperbarui [`docs/20-progress.md`](file:///c:/Dev/Portofolio/docs/20-progress.md) dan [`docs/21-handoff.md`](file:///c:/Dev/Portofolio/docs/21-handoff.md) dengan status faktual.

---

## 5. Konvensi Perintah Terminal

- Sistem Operasi: **Windows** (PowerShell).
- Dilarang menjalankan perintah `cd`. Gunakan opsi `Cwd` pada pemanggilan tool.
- Jangan hardcode API key, kredensial, atau path privat.
- Gunakan perintah verifikasi seperti `npm run typecheck` atau `npm run build` setelah setiap perubahan substansial.
