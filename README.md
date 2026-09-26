# XEVRYN Cosmic Portfolio

> Portofolio personal sinematik bertema alam semesta untuk **XEVRYN**, memadukan narasi visual 3D kosmik dengan arsitektur web modern, aksesibilitas tinggi, performa terkalibrasi, dan integritas konten yang jujur.

---

## Ringkasan Proyek

XEVRYN Cosmic Portfolio dirancang sebagai pengalaman web berkarakter luar angkasa mendalam (*deep space journey*):
- **Perjalanan Naratif:** Dimulai dari orbit planet berbatu dan fajar matahari kosmik (Hero), melintasi stasiun kosmik astronaut dan dunia samudera (About), meninjau stasiun kerja orbit satelit & pengalaman nyata (Experience), menjelajahi sabuk asteroid dan etalase karya terverifikasi (Work Showcase), menelusuri keahlian teknis (Skills), dan mendarat pada lengkung horizon planet saat fajar kosmik (Contact).
- **Fondasi Visual:** 3D WebGL (Three.js via React Three Fiber) sebagai kanvas latar tunggal terpadu dengan shader prosedural, tekstur resolusi tinggi yang di-generate tanpa ketergantungan eksternal, dan penataan kedalaman cermat.
- **Koreografi Halus & Aman:** GSAP ScrollTrigger mengelola sinkronisasi scroll DOM ke ref target numerik WebGL. Lintasan roket kosmik dihitung menggunakan spline 3D bebas tabrakan dari permukaan planet berbatu hingga melintasi fajar horizon.
- **Aksesibilitas & Keterbacaan:** Mengutamakan keterbacaan teks dan bukti karya nyata. Menyediakan mode **Full**, **Lite**, dan **Reduced Motion** penuh, degradasi anggun tanpa WebGL (Fallback Poster kosmik CSS), dan navigasi keyboard komprehensif.
- **Integritas Konten:** Seluruh karya (Marketra / Marketra Mitta, RetailLab, Xevryn Assets Library, Ucapan-Buat-Kamu, Xevryn Forge) dan riwayat Barista ditampilkan sesuai bukti riil tanpa angka fiktif, metrik palsu, atau tautan kosong.

---

## Status Proyek

- **Status Saat Ini:** **Release Candidate (Lokal / Siap Review)**.
- **Status Kompilasi:** TypeScript typecheck lulus tanpa error (`npm run typecheck`).
- **Status Build:** Bundel produksi berhasil dibangun (`dist/`) tanpa error (`npm run build`).
- **Penyajian Lokal:** Server pengembangan berjalan pada `http://localhost:5173/` dan siap diuji melalui browser lokal.

---

## Panduan Menjalankan & Menguji Proyek

### 1. Menjalankan Server Pengembangan Lokal
```bash
npm run dev
```
Akses aplikasi melalui browser pada `http://localhost:5173/`.

### 2. Memeriksa Integritas Tipe & Linting
```bash
# Typecheck TypeScript tanpa kompilasi file
npm run typecheck

# Linting kode
npm run lint
```

### 3. Membangun Bundel Produksi (Production Build)
```bash
npm run build
```
File hasil kompilasi yang teroptimasi akan dihasilkan di folder `dist/`.

### 4. Pratinjau Bundel Produksi Secara Lokal
```bash
npm run preview
```
Menjalankan server pratinjau lokal dari bundel `dist/` untuk memastikan perilaku routing dan aset sebelum rilis.

---

## Struktur Folder & Kode

```
Portofolio/
├── public/                  # Aset statis publik (favicon.svg, robots.txt, sitemap.xml)
├── src/
│   ├── app/                 # Fondasi aplikasi & providers (App.tsx, MotionProvider, SceneProvider)
│   ├── components/          # Komponen UI modular
│   │   ├── common/          # Komponen umum (Button, Badge, Modal)
│   │   ├── layout/          # Tata letak global (Header, Footer, MobileMenu, SkipLink)
│   │   ├── project/         # Kartu proyek dan modal/halaman detail
│   │   └── scene/           # Poster fallback CSS
│   ├── content/             # Sumber kebenaran data profil, proyek, dan keahlian
│   │   ├── profile.ts       # Biodata terverifikasi, pengalaman Barista, kontak
│   │   ├── projects.ts      # 5 studi kasus proyek nyata XEVRYN
│   │   └── skills.ts        # Kategori keahlian teknis & desain terbukti
│   ├── pages/               # Halaman tampilan
│   │   ├── HomePage.tsx     # Halaman utama (perjalanan kontinu Hero → Contact)
│   │   ├── ProjectPage.tsx  # Halaman studi kasus mandiri (/work/:slug)
│   │   └── NotFoundPage.tsx # Halaman penanganan 404 orbit hilang
│   ├── scene/               # Modul grafis 3D WebGL (Three.js / React Three Fiber)
│   │   ├── CosmicCanvas.tsx # Kanvas WebGL tunggal di latar belakang
│   │   ├── CameraRig.tsx    # Pengontrol posisi & rotasi kamera dengan batas aman
│   │   ├── SunSource.tsx    # Sumber cahaya matahari dengan granulasi fotoster & korona
│   │   ├── Planet.tsx       # Planet berbatu utama & bulan dengan kawah multi-skala
│   │   ├── CelestialBodies.tsx # Ocean World, Red Planet, Gas Giant, & Ringed Planet
│   │   ├── AsteroidBelt.tsx # Sabuk asteroid mineral 3D instanced
│   │   ├── Spacecraft.tsx   # Model roket 3D dan lintasan spline 3D bebas tabrakan
│   │   ├── Astronaut.tsx    # Astronaut 3D mengambang dengan visor reflektif
│   │   ├── Satellite.tsx    # Satelit telekomunikasi orbital dengan panel surya
│   │   ├── Starfield.tsx    # Lapisan bintang 3 lapis kedalaman dengan shimmer
│   │   ├── Nebula.tsx       # Gas antariksa volumetrik lembut
│   │   ├── Horizon.tsx      # Lengkung planet fajar kosmik di section Contact
│   │   └── WarpStreak.tsx   # Efek garis warp partikel saat transisi
│   ├── sections/            # Seksi-seksi naratif DOM
│   │   ├── Hero.tsx         # Orbit pembuka & pengenalan
│   │   ├── About.tsx        # Cerita personal & identitas pembuat
│   │   ├── Experience.tsx   # Riwayat kerja nyata (Barista & pengembangan mandiri)
│   │   ├── Work.tsx         # Showcase karya interaktif
│   │   ├── Skills.tsx       # Konstelasi keahlian teruji
│   │   └── Contact.tsx      # Terminal komunikasi & fajar kosmik
│   └── styles/              # Desain sistem & CSS murni
│       ├── tokens.css       # Token warna kosmik, tipografi, jarak, elevasi
│       ├── global.css       # Aturan dasar, font, layout, dan reset
│       ├── components.css   # Styling komponen UI
│       └── utilities.css    # Utilitas layout, visibilitas, dan aksesibilitas
├── docs/                    # Dokumentasi lengkap sistem arsitektur (docs/00–22)
└── README.md                # Panduan utama proyek ini
```

---

## Panduan Mengubah Konten & Data

Seluruh konten tekstual diatur secara terpusat dan terpisah dari komponen visual di dalam direktori `src/content/`:

1. **Memperbarui Data Profil & Riwayat Kerja:**
   - Buka `src/content/profile.ts`.
   - Perbarui bio, fokus kerja, atau data kontak.
   - Status verifikasi kontak dikelola dengan flag `status: 'CONFIRMED' | 'CONTENT_PENDING'`. Sistem secara otomatis hanya akan menampilkan tautan yang berstatus `'CONFIRMED'` untuk mencegah tautan mati/palsu.
2. **Menambah atau Memperbarui Proyek:**
   - Buka `src/content/projects.ts`.
   - Setiap proyek memiliki data `slug`, `title`, `category`, `summary`, `description`, `highlights`, `technologies`, `links`, dan `status`.
   - Proyek baru akan langsung muncul di galeri `Work` dan mendapatkan rute detail `#work/:slug` secara otomatis.
3. **Mengatur Daftar Keahlian:**
   - Buka `src/content/skills.ts`.
   - Tambahkan keahlian baru ke dalam kategori yang relevan beserta level kemahiran dan deskripsi ringkasnya.

---

## Pengaturan Rilis & Domain Produksi

- **Favicon:** Berkas ikon vektor kosmik tersedia di `public/favicon.svg`.
- **SEO & Robots:**
  - `public/robots.txt` disiapkan dengan aturan perayapan standar.
  - `public/sitemap.xml` memuat entri rute utama dan seluruh slug proyek aktif.
  - *Catatan:* Konfigurasi domain produksi belum ditentukan oleh pemilik. Nilai domain saat ini menggunakan placeholder terstandar `https://xevryn.example.com` pada robots dan sitemap, dan dapat langsung diperbarui begitu domain resmi telah diputuskan sebelum deployment.
- **Penanganan Rute / 404:**
  - Navigasi berbasis hash (`#work`, `#work/:slug`) dan pathname `/work/:slug` didukung penuh.
  - Jika pengunjung mengakses rute slug yang tidak valid, antarmuka akan menampilkan `NotFoundPage` (*Orbit Hilang*) yang elegan dengan tombol kembali ke orbit utama.

---

## Daftar Kebutuhan Data Pemilik yang Masih Tertunda (Pending)

Sesuai prinsip integritas konten pada [`AGENTS.md`](file:///c:/Dev/Portofolio/AGENTS.md), data berikut belum disediakan dan sengaja tidak dikarang:
1. **Dokumen CV / Resume Resmi:** Belum dibuat oleh pemilik; tombol unduh CV disembunyikan sementara tanpa file placeholder atau file PDF kosong.
2. **Periode Kerja Barista & Kasir di 11/12 coffe street:** Belum diserahkan oleh pemilik; tidak dikarang tanggal atau durasinya.
3. **Domain Produksi Definitif:** URL hosting final untuk sitemap.xml dan metadata OpenGraph production URL saat siap dipublikasikan.

---

## Lisensi & Hak Cipta

Seluruh hak cipta visual, karya desain, dan identitas brand dimiliki oleh **XEVRYN**.
Dilisensikan untuk penggunaan portofolio personal.
