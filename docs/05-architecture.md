# 05 — Arsitektur Teknis & Pola Desain Aplikasi

Versi: 1.0 · Tanggal: 21 September 2026 · Status: Disetujui

---

## 1. Tumpukan Teknologi (Tech Stack) & Keputusan Kunci

Arsitektur aplikasi **XEVRYN Cosmic Portfolio** dirancang dengan prinsip efisiensi, ketahanan tanpa ketergantungan rapuh, dan pemisahan tanggung jawab yang ketat.

| Lapisan | Pilihan Teknologi | Peran & Batas Tanggung Jawab |
|---|---|---|
| **Core Framework** | React 19 + TypeScript | UI deklaratif berbasis komponen, type-safety statis penuh pada konten dan event. |
| **Bundler & Build** | Vite 6 | Tooling kompilasi modern, pemisahan chunk pintar (*code splitting*), Hot Module Replacement (HMR). |
| **Styling** | Vanilla CSS + CSS Tokens | Styling berperforma native tanpa runtime JS overhead, kompatibel penuh dengan token desain kosmik. |
| **Orkestrator Scroll & DOM** | GSAP 3 (Core + ScrollTrigger) | Mengelola timeline animasi DOM, scroll pinning, scrubbing, dan kalkulasi progress lokal. |
| **Grafis 3D / WebGL** | Three.js + React Three Fiber | Merender kanvas 3D tunggal di latar belakang: planet, atmosfer, partikel bintang, dan transisi kamera. |
| **Routing & Prerender** | Static Site Generation (SSG) / Prerender | Menghasilkan HTML statis untuk semua rute (`/`, `/work/:slug`, `/404`) agar konten dapat dibaca tanpa eksekusi JS. |

---

## 2. Kontrak Kepemilikan Animasi (Motion Ownership Contract)

Salah satu kegagalan umum dalam website 3D sinematik adalah konflik antara library animasi DOM dan render loop WebGL. Kami menerapkan pemisahan kepemilikan mutlak:

```text
┌─────────────────────────────────────────────────────────────┐
│                       NATIVE SCROLL                         │
└──────────────────────────────┬──────────────────────────────┘
                               │ Posisi scroll pengguna
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 GSAP SCROLLTRIGGER (DOM)                    │
│  - Menghitung progress scene lokal (0.0 s/d 1.0)            │
│  - Mengelola pinning section DOM (Work horizontal track)    │
│  - Menganimasikan transform teks & elemen HTML              │
│  - MENULIS nilai target kamera ke dalam MUTABLE REF         │
└──────────────────────────────┬──────────────────────────────┘
                               │ Menulis target numerik ke Ref
                               ▼
┌─────────────────────────────────────────────────────────────┐
│              SCENE STATE REF (Memory Object)                │
│  cameraTarget: { x, y, z, fov, warpIntensity, ... }         │
└──────────────────────────────┬──────────────────────────────┘
                               │ Dibaca setiap frame oleh WebGL
                               ▼
┌─────────────────────────────────────────────────────────────┐
│              R3F / THREE.JS RENDER LOOP                     │
│  - useFrame() membaca Scene State Ref                       │
│  - Melakukan interpolasi halus (lerp) posisi & rotasi       │
│  - TIdak ada dua library yang memodifikasi scene graph      │
└─────────────────────────────────────────────────────────────┘
```

### Aturan Wajib
1. **GSAP Dilarang Memanipulasi Objek Three.js Langsung:** GSAP hanya menulis angka ke dalam objek mutable ref (misal: `sceneRef.current.targetZ = 2.5`).
2. **Loop `useFrame` Melakukan Interpolasi:** Fungsi `useFrame` di dalam komponen kanvas membaca nilai ref tersebut dan menerapkan `lerp` ke posisi kamera Three.js.
3. **Scroll Native Murni:** Tidak menggunakan library smooth-scroll eksternal (seperti Lenis atau Locomotive) pada v1. Scroll bawaan peramban memastikan akurasi sentuhan di perangkat mobile dan mencegah *scroll-jacking*.

---

## 3. Arsitektur Kanvas Tunggal & Siklus Hidup Rendering

### 3.1 Kanvas Latar Belakang Persisten (`CosmicCanvas`)
- Kanvas WebGL diletakkan pada posisi tetap (`position: fixed; inset: 0; pointer-events: none; z-index: var(--z-canvas);`).
- Kanvas hanya dimuat satu kali untuk seluruh halaman utama. Section-section konten meluncur di atas kanvas dengan `z-index: var(--z-content)`.
- Menggunakan `pointer-events: none` pada elemen canvas sehingga seluruh klik, seleksi teks, dan interaksi mouse langsung mengenai elemen DOM di atasnya.

### 3.2 Optimasi Render Loop
- **Jeda Saat Tab Tersembunyi:** Melalui listener `visibilitychange`, render loop Three.js langsung dihentikan saat tab diminimalkan atau tidak aktif (`document.hidden === true`) untuk menghemat konsumsi daya dan baterai laptop/ponsel.
- **DPR Capping:** Resolusi rendering dibatasi pada Device Pixel Ratio (DPR) maksimal `1.5` untuk desktop dan `1.0` untuk perangkat mobile atau mode hemat daya (*Lite mode*).

---

## 4. Penanganan Kegagalan WebGL & Error Recovery

Aplikasi harus tahan banting terhadap kegagalan hardware grafis:

```text
┌─────────────────────────────────────────────────────────────┐
│                     CosmicCanvas Mount                      │
└──────────────────────────────┬──────────────────────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
   [ WebGL Didukung ]                    [ WebGL Tidak Ada / ]
            │                            [ Inisialisasi Gagal]
            ▼                                     │
   Render Frame Pertama                           ▼
            │                            Tampilkan Poster CSS
    Sukses? │                            (Latar Belakang Statis)
   ┌────────┴────────┐                            │
   ▼                 ▼                            ▼
[ Sukses ]     [ Timeout > 4s ]          Konten DOM 100% Utuh
   │                 │                   Semua CTA Berfungsi
   ▼                 ▼
Fade-out       Fallback ke
Poster         Poster CSS
```

### Mekanisme Pemulihan
1. **Poster Kosmik Statis:** Sebelum kanvas 3D siap merender frame pertamanya, latar belakang diisi oleh poster kosmik CSS beresolusi tinggi dengan warna yang identik dengan scene awal.
2. **Penanganan Context Loss:** Komponen mendengarkan event `webglcontextlost` pada elemen canvas. Saat context hilang, scene otomatis menyembunyikan canvas dan memunculkan poster fallback tanpa memicu crash aplikasi React.
3. **Timeout Pengaman (4 Detik):** Jika WebGL belum menyelesaikan kompilasi shader dalam 4 detik (misal pada koneksi terputus atau GPU lambat), poster dipertahankan dan pengguna tetap dapat membaca konten tanpa terhalang layar loading.

---

## 5. Strategi Prerender (SSG) & SEO

1. **Static HTML Output:** Setiap halaman (`/`, `/work/alpha-project`, `/work/beta-system`, `/work/gamma-platform`, `/404`) menghasilkan file `index.html` lengkap yang memuat teks judul, paragraf bio, kartu karya, dan link navigasi.
2. **Aksesibilitas Tanpa JavaScript (No-JS Mode):** Pengunjung yang menonaktifkan JavaScript tetap dapat membaca profil XEVRYN, melihat daftar karya, membuka tautan studi kasus, dan membaca alamat email.
3. **Hydration Bersih:** Saat JavaScript aktif, React melakukan hydration pada antarmuka DOM, menyambungkan event listener, lalu memuat modul WebGL secara lazy (*code splitting*).
