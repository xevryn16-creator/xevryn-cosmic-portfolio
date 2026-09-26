# 12 — Anggaran Performa, Pemuatan Bertahap & Profiling (Performance)

Versi: 1.0 · Tanggal: 21 September 2026 · Status: Disetujui (Anggaran Target)

---

## 1. Prinsip Performa: Kecepatan Konten di Atas Segala Efek

Kesan premium sebuah website tidak hanya ditentukan oleh keindahan grafisnya, melainkan juga oleh responsivitasnya saat berinteraksi. Pengunjung tidak boleh dipaksa menunggu unduhan aset 3D yang lambat hanya untuk membaca nama pemilik atau mencari kontak.

*Catatan Penting: Seluruh angka dalam dokumen ini merupakan **Anggaran Desain Awal (Performance Budgets)** yang menjadi batasan rekayasa. Hasil pengukuran nyata akan dicatat pada fase profiling aplikasi (TSK-027 dan TSK-048).*

---

## 2. Tabel Anggaran Performa (Performance Budgets)

| Kategori Metrik | Target Anggaran Awal | Kondisi Pengujian / Pengukuran |
|---|---|---|
| **Bundel Non-3D Awal (HTML/CSS/JS)** | ≤ 250 KB (Compressed / Gzip/Brotli) | Build produksi tanpa modul WebGL/Three.js |
| **Transfer Total Awal Mobile** | ≤ 900 KB | Cold cache, jaringan 4G throttled, mencakup poster dan font |
| **Chunk 3D + Tekstur Awal** | ≤ 1.5 MB tambahan | Dimuat secara *lazy* setelah first interactive |
| **Total Transfer Halaman Home Lengkap** | ≤ 5.0 MB | 3 proyek pilihan, seluruh gambar galeri detail tidak di-load |
| **Largest Contentful Paint (LCP)** | ≤ 2.5 detik | Diukur pada elemen teks judul Hero / Poster kosmik |
| **Cumulative Layout Shift (CLS)** | ≤ 0.1 (Idealnya < 0.05) | Transisi dari poster ke canvas tidak menggeser DOM |
| **Interaction to Next Paint (INP)** | ≤ 200 ms | Latensi klik menu, tombol CTA, dan pembukaan studi kasus |
| **Desktop Frame Rate (Full Mode)** | 60 FPS stabil (median frame ≤ 16.7ms) | Laptop baseline dengan GPU terintegrasi pada scene terberat |
| **Mobile Frame Rate (Lite Mode)** | ≥ 30 FPS stabil tanpa stutter | Ponsel pintar kelas menengah (mid-range device) |
| **Device Pixel Ratio (DPR) Cap** | Maksimal 1.5 (Full) / 1.0 (Lite/Mobile) | Mencegah overheating pada layar resolusi tinggi (Retina/4K) |
| **Draw Calls WebGL** | ≤ 60 draw calls (Full) / ≤ 30 (Lite) | Scene terberat (kombinasi planet, bintang, dan nebula) |
| **Geometri Terlihat (Triangles)** | ≤ 120.000 poligon (Full) / ≤ 40.000 (Lite) | Geometri bola planet dan partikel instanced |
| **Penggunaan VRAM Tekstur GPU** | ≤ 64 MB (Full) / ≤ 24 MB (Lite) | Dihitung dari memori decoded GPU, bukan ukuran file unduhan |

---

## 3. Pipeline Pemuatan 7 Tahap (7-Stage Loading Pipeline)

```text
[ Tahap 1: Prerendered HTML & CSS ] ──► Pengunjung melihat teks Hero & Poster instan
                   │
[ Tahap 2: Swap Font Utama ]       ──► Tipografi tajam tanpa layout shift liar
                   │
[ Tahap 3: Hydration React DOM ]   ──► Tombol CTA, navigasi, & kontrol gerak aktif
                   │
[ Tahap 4: Lazy Load Modul 3D ]    ──► Unduh Three.js di latar belakang saat CPU idle
                   │
[ Tahap 5: Kompilasi Shader 3D ]   ──► Scene 3D disiapkan di balik poster
                   │
[ Tahap 6: Crossfade Frame 1 ]     ──► Poster memudar keluar (Canvas mengambil alih)
                   │
[ Tahap 7: Lazy Load Galeri ]      ──► Aset proyek di bawah layar dimuat saat mendekat
```

1. **Tahap 1 (First Paint):** Peramban menerima HTML prerender dan CSS inti. Teks `XEVRYN`, peran profesional, dan poster kosmik berdimensi tetap langsung tampil di layar.
2. **Tahap 2 (Font Ready):** Font WOFF2 dimuat dengan strategi `font-display: swap` terkalibrasi agar tidak terjadi loncatan dimensi teks (FOUT/FOIT).
3. **Tahap 3 (Interactivity):** React melakukan hydration antarmuka. Seluruh navigasi pintas keyboard dan tombol salin email siap menerima input.
4. **Tahap 4 (Code Splitting):** Modul berat Three.js dan shader diunduh secara asinkron (`import('./scene/CosmicCanvas')`) saat jaringan dan CPU dalam keadaan idle.
5. **Tahap 5 (Pre-warming):** Scene 3D merender frame pertama secara tersembunyi di belakang poster untuk mengompilasi shader GPU tanpa menyebabkan *frame drop* visual.
6. **Tahap 6 (Handshake):** Setelah frame pertama berhasil dirender tanpa error, canvas melakukan crossfade lembut dengan poster selama 450ms (ANM-001). Jika kompilasi memakan waktu > 4 detik, poster dipertahankan permanen.
7. **Tahap 7 (Lazy Images):** Gambar sampul karya di section Work dan gambar galeri di halaman studi kasus hanya diunduh saat elemen mendekati batas 200px dari viewport.

---

## 4. Tangga Penurunan Kualitas Grafis (Degradation Ladder)

Jika perangkat pengguna terdeteksi mengalami penurunan frame rate secara berkelanjutan (rata-rata < 25 FPS selama 3 detik berturut-turut), sistem adaptif akan menurunkan beban grafis secara bertahap:

```text
[ Level 0: Full Visuals ]
  │ (FPS drop terdeteksi)
  ▼
[ Level 1: Matikan Efek Post-Processing ] ──► Nonaktifkan bloom & depth of field
  │ (Masih < 25 FPS)
  ▼
[ Level 2: Pangkas Partikel Bintang ]    ──► Turunkan jumlah partikel sebesar 50%
  │ (Masih < 25 FPS)
  ▼
[ Level 3: Turunkan DPR & Tekstur ]      ──► Batasi DPR ke 1.0 & gunakan tekstur 1K
  │ (Masih < 25 FPS)
  ▼
[ Level 4: Shader Prosedural Sederhana ] ──► Ganti shader atmosfer ke material dasar
  │ (Masih < 25 FPS)
  ▼
[ Level 5: Fallback Poster Statis ]      ──► Hentikan WebGL sepenuhnya, pakai CSS
```

*Prinsip Mutlak: Seluruh teks, link karya, tombol kontak, dan hierarki informasi tetap utuh 100% pada semua level penurunan.*

---

## 5. Kondisi Profiling & Perangkat Baseline Uji

Pengujian performa nyata akan dijalankan pada matriks perangkat standar berikut:

1. **Desktop Baseline:** Laptop Windows dengan GPU terintegrasi (Intel Iris Xe / AMD Radeon Vega), RAM 8GB, Chrome & Edge versi terbaru.
2. **Mobile iOS Baseline:** Apple iPhone kelas menengah (iPhone 11 / 13) menjalankan Safari iOS.
3. **Mobile Android Baseline:** Perangkat Android kelas menengah (Snapdragon seri 7 / MediaTek Dimensity) menjalankan Chrome Mobile.
4. **Kondisi Jaringan Profiling:** Chrome DevTools Fast 4G (1.5 Mbps down, 750 Kbps up, 40ms RTT) dengan CPU 4x slowdown simulation.
