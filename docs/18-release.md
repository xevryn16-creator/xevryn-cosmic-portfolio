# 18 — Prosedur Rilis, Deployment & Rollback (Release Runbook)

Versi: 1.0 · Tanggal: 21 September 2026 · Status: Disetujui

---

## 1. Ikhtisar Panduan Rilis

Dokumen ini adalah prosedur standar operasional (SOP) untuk memublikasikan **XEVRYN Cosmic Portfolio** ke lingkungan hosting produksi. Rilis hanya boleh dilakukan setelah seluruh kriteria pada Gerbang Calon Rilis (Gate 4) terpenuhi tanpa adanya isu berkategori P0 atau P1.

*Peringatan Keamanan: Tahap perancangan dan dokumentasi ini tidak melakukan publikasi atau deployment apa pun ke server online. Panduan ini disiapkan sebagai petunjuk operasional saat implementasi kode telah selesai dan disetujui.*

---

## 2. Alur Kerja Rilis 8 Langkah (Release Workflow)

```text
[ 1. Audit Pra-Rilis ] ──► Periksa diff kode, zero-secrets, lisensi aset
           │
[ 2. Build Produksi ]   ──► npm run build & typecheck bersih tanpa warning
           │
[ 3. Inspeksi Bundel ]  ──► Validasi ukuran file terhadap anggaran performa
           │
[ 4. Deploy Staging ]   ──► Unggah ke URL pratinjau tertutup (Preview URL)
           │
[ 5. Smoke Testing ]    ──► Uji rute utama, kontak, & fallback di staging
           │
[ 6. Rilis Produksi ]   ──► Promosikan artefak staging ke domain resmi
           │
[ 7. Verifikasi Live ]  ──► Periksa HTTPS, metadata OG, canonical, sitemap
           │
[ 8. Siaga Rollback ]   ──► Catat versi cadangan yang siap dipulihkan jika darurat
```

---

## 3. Rincian Langkah Operasional Rilis

### Langkah 1: Audit Pra-Rilis & Integritas Repositori
1. Pastikan branch kerja bersih dan seluruh dependensi terkunci dalam `package-lock.json`.
2. Jalankan pemindaian otomatis untuk memastikan tidak ada file konfigurasi lokal (`.env`), token API, atau informasi rahasia yang terunggah.
3. Pastikan seluruh berkas aset di `public/` memiliki lisensi terbuka yang sah dan tercatat di `docs/08-assets.md`.

### Langkah 2: Eksekusi Build Bersih
Jalankan rangkaian perintah kompilasi produksi secara berurutan:
```bash
npm run typecheck
npm run lint
npm run build
```
Seluruh perintah wajib keluar dengan exit code `0` tanpa pesan error.

### Langkah 3: Inspeksi Artefak Bundel Produksi
Periksa direktori keluaran `dist/`:
1. Pastikan berkas `index.html` statis terbentuk untuk rute utama `/`, seluruh rute proyek `/work/:slug/index.html`, dan `/404.html`.
2. Verifikasi ukuran bundel non-3D terkompresi tidak melebihi **250 KB**.
3. Pastikan tidak ada berkas peta sumber (*source map*) yang mengekspos struktur privat jika tidak dikehendaki.

### Langkah 4: Deployment ke Lingkungan Staging Preview
Unggah hasil build ke penyedia hosting statis (Vercel / Netlify / Cloudflare Pages / GitHub Pages) untuk menghasilkan URL pratinjau unik (*Preview URL*). Pastikan flag `noindex` aktif pada staging agar tidak terindeks prematur oleh mesin pencari.

### Langkah 5: Smoke Testing pada URL Preview
Lakukan pengujian cepat (*smoke test*) pada URL staging:
- [ ] Buka halaman utama: Teks nama brand dan poster tampil instan; transisi canvas 3D mulus.
- [ ] Buka langsung URL studi kasus `/work/cosmic-engine`: Konten artikel terbaca lengkap.
- [ ] Tekan tombol salin email: Toast konfirmasi muncul dan alamat email tersalin ke clipboard.
- [ ] Uji mode Reduced Motion: Seluruh gerakan dekoratif berhenti seketika.
- [ ] Buka rute acak `/halaman-ngawur`: Halaman 404 tampil dengan tombol navigasi kembali.

### Langkah 6: Promosi ke Domain Produksi
Setelah seluruh checklist staging lolos, promosikan artefak build tersebut ke domain produksi utama portofolio.

### Langkah 7: Verifikasi Pasca Rilis di URL Final
Periksa situs langsung di domain publik:
1. **Sertifikat SSL/HTTPS:** Gembok hijau aktif tanpa peringatan konten campuran (*mixed content*).
2. **Uji Metadata Sosial:** Uji URL pada Facebook Sharing Debugger dan Twitter Card Validator untuk memastikan kartu preview 1200×630px tampil memukau.
3. **Peta Situs:** Akses `/sitemap.xml` dan `/robots.txt` untuk memastikan rute terdaftar dengan benar.

---

## 4. Protokol Rollback Darurat (Rollback Protocol)

Jika terjadi masalah kritis P0/P1 yang tidak terdeteksi sebelumnya saat situs sudah live di produksi:

1. **Prinsip Cepat & Terkendali:** Jangan mencoba melakukan debugging langsung di branch produksi. Lakukan pemulihan versi (*rollback*) ke deployment stabil terakhir melalui antarmuka platform hosting dalam waktu < 2 menit.
2. **Prosedur Hosting Rollback:**
   - Pada Vercel/Netlify: Pilih deployment stabil sebelumnya pada daftar riwayat deploy, lalu klik **"Rollback to this deployment"**.
   - Pada Git/CI: Jalankan `git revert` pada commit rilis bermasalah, lalu picu build otomatis baru.
3. **Pencatatan Insiden:** Catat penyebab masalah, dampak pada pengguna, dan perbaikan yang diperlukan dalam `docs/20-progress.md` sebelum memulai rilis ulang.
