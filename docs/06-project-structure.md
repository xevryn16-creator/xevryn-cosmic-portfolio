# 06 — Struktur Proyek & Batas Tanggung Jawab Modul

Versi: 1.0 · Tanggal: 21 September 2026 · Status: Disetujui

---

## 1. Peta Direktori Target Repositori

Struktur kode sumber dirancang rapi dengan pemisahan domain yang jelas antara rendering UI DOM, logika adegan 3D WebGL, konfigurasi animasi, dan data konten:

```text
xevryn-cosmic/
├── README.md                           # Dokumentasi umum & panduan awal
├── AGENTS.md                           # Aturan agen AI & panduan operasional
├── package.json                        # Definisi paket, skrip, dan dependensi
├── tsconfig.json                       # Konfigurasi kompilator TypeScript
├── vite.config.ts                      # Konfigurasi bundler Vite & plugin prerender
├── index.html                          # Kerangka HTML utama (Entry point)
├── docs/                               # Dokumentasi lengkap (00-index s/d 22-traceability)
├── .agents/                            # Sistem kustomisasi & skill agen workspace
│   └── skills/                         # Skill proyek SKL-01 s/d SKL-12
├── public/                             # Aset statis publik
│   ├── fonts/                          # Berkas font mandiri (WOFF2)
│   ├── images/                         # Poster hero fallback & thumbnail
│   ├── textures/                       # Tekstur terkompresi planet & debu
│   ├── social/                         # Gambar OpenGraph (1200x630) & favicon
│   └── robots.txt                      # Aturan perayapan mesin pencari
├── src/                                # Kode sumber aplikasi
│   ├── app/                            # Titik masuk aplikasi & routing
│   │   ├── App.tsx                     # Komponen induk dengan Shell UI
│   │   ├── routes.tsx                  # Peta rute aplikasi (Home, Detail, 404)
│   │   └── providers/                  # Context provider aplikasi
│   │       ├── MotionProvider.tsx      # Pengelola preferensi gerak (Full/Lite/Reduced)
│   │       └── SceneProvider.tsx       # Pengelola state koordinat target 3D WebGL
│   ├── pages/                          # Komponen tingkat halaman
│   │   ├── HomePage.tsx                # Halaman utama dengan 6 scene bersambung
│   │   ├── ProjectPage.tsx             # Halaman artikel studi kasus detail
│   │   └── NotFoundPage.tsx            # Halaman 404 (Lost in deep space)
│   ├── sections/                       # Komponen section narasi utama
│   │   ├── Hero.tsx                    # Scene 01: Orbit & Hero Brand
│   │   ├── About.tsx                   # Scene 02: Perkenalan & Bio
│   │   ├── Work.tsx                    # Scene 04: Destinasi Karya (Showcase)
│   │   ├── Skills.tsx                  # Scene 05: Konstelasi Keahlian
│   │   └── Contact.tsx                 # Scene 06: Horizon Planet & Kontak
│   ├── components/                     # Komponen UI modular
│   │   ├── layout/                     # Komponen kerangka tata letak
│   │   │   ├── Header.tsx              # Navigasi atas persisten
│   │   │   ├── MobileMenu.tsx          # Menu layar sentuh dengan focus-trap
│   │   │   ├── Footer.tsx              # Penutup halaman & hak cipta
│   │   │   └── SkipLink.tsx            # Tombol lewati ke konten utama
│   │   ├── ui/                         # Komponen UI atomik & interaktif
│   │   │   ├── Button.tsx              # Tombol serbaguna dengan interaksi halus
│   │   │   ├── MotionControl.tsx       # Tombol pengalih mode animasi
│   │   │   ├── CopyEmail.tsx           # Tombol salin email dengan toast feedback
│   │   │   └── ImageWithFallback.tsx   # Gambar adaptif dengan penanganan gagal muat
│   │   ├── motion/                     # Komponen pembungkus animasi
│   │   │   ├── AnimatedHeading.tsx     # Judul dengan efek reveal per huruf
│   │   │   ├── AnimatedLines.tsx       # Paragraf dengan efek reveal per baris
│   │   │   └── RevealGroup.tsx         # Pembungkus kemunculan grup elemen
│   │   └── projects/                   # Komponen khusus etalase karya
│   │       ├── ProjectCard.tsx         # Kartu proyek dengan preview & tilt mikro
│   │       ├── ProjectTrack.tsx        # Jalur horizontal scroll pinning
│   │       └── ProjectGallery.tsx      # Galeri gambar studi kasus terkunci CLS
│   ├── scene/                          # Logika grafis 3D Three.js / R3F
│   │   ├── CosmicCanvas.tsx            # Komponen kanvas WebGL latar belakang
│   │   ├── SceneErrorBoundary.tsx      # Penangkap error grafis & pemicu poster
│   │   ├── CameraRig.tsx               # Pengendali posisi, FOV, dan orientasi kamera
│   │   ├── Planet.tsx                  # Model 3D planet, material, dan rim light
│   │   ├── Starfield.tsx               # Partikel bintang multi-layer latar belakang
│   │   ├── Nebula.tsx                  # Shader gas kosmik & cahaya lembut
│   │   ├── Warp.tsx                    # Efek peregangan bintang kecepatan cahaya
│   │   ├── Horizon.tsx                 # Busur fajar horizon planet penutup
│   │   └── shaders/                    # Berkas shader GLSL kustom
│   │       ├── atmosphere.vert         # Vertex shader hamburan atmosfer
│   │       ├── atmosphere.frag         # Fragment shader hamburan atmosfer
│   │       ├── stars.vert              # Vertex shader partikel bintang
│   │       └── stars.frag              # Fragment shader partikel bintang
│   ├── animation/                      # Konfigurasi & timeline GSAP
│   │   ├── register.ts                 # Metadata 64 animasi terdaftar (ANM-001–064)
│   │   ├── tokens.ts                   # Nilai durasi, easing, dan stagger
│   │   ├── hero.timeline.ts            # Timeline GSAP untuk Hero & transisi Orbit
│   │   ├── about.timeline.ts           # Timeline GSAP untuk About & ketenangan baca
│   │   ├── warp.timeline.ts            # Timeline GSAP untuk akselerasi Warp
│   │   ├── work.timeline.ts            # Timeline GSAP untuk jalur horizontal karya
│   │   ├── skills.timeline.ts          # Timeline GSAP untuk koneksi konstelasi
│   │   └── contact.timeline.ts         # Timeline GSAP untuk kemunculan horizon
│   ├── hooks/                          # Custom React Hooks
│   │   ├── useMotionPreferences.ts     # Membaca & menyimpan mode gerak (Full/Lite/Reduced)
│   │   ├── useSceneProgress.ts         # Menjembatani progress scroll ke WebGL Ref
│   │   ├── usePageVisibility.ts        # Mendeteksi tab aktif/tersembunyi untuk jeda GPU
│   │   ├── useCapabilityTier.ts        # Menilai kemampuan grafis perangkat pengguna
│   │   └── useScrollRestoration.ts     # Memulihkan posisi scroll saat navigasi kembali
│   ├── content/                        # Data konten lokal bertipe statis
│   │   ├── profile.ts                  # Data profil XEVRYN & status CONTENT_PENDING
│   │   ├── projects.ts                 # Data karya unggulan (1–6 karya, default 3)
│   │   ├── skills.ts                   # Data keahlian & relasi ID ke proyek
│   │   └── links.ts                    # Tautan navigasi & media sosial
│   ├── types/                          # Definisi tipe data TypeScript
│   │   ├── content.ts                  # Tipe data entitas profil, proyek, keahlian
│   │   └── motion.ts                   # Tipe data konfigurasi animasi & preferensi
│   └── styles/                         # Berkas stylesheet Vanilla CSS
│       ├── tokens.css                  # Variabel CSS warna, spasi, tipe, z-index
│       ├── global.css                  # Reset CSS & aturan tata letak dasar
│       ├── typography.css              # Aturan heading, body, dan font fluida
│       └── components.css              # Gaya untuk kartu, tombol, dan kontrol
```

---

## 2. Batas Tanggung Jawab & Konvensi Penamaan

1. **Komponen UI (`components/` & `sections/`):**
   - Format penamaan PascalCase (contoh: `ProjectCard.tsx`, `Hero.tsx`).
   - Bertanggung jawab penuh atas struktur HTML semantik, aksesibilitas ARIA, dan rendering DOM.
   - Tidak boleh memanggil API WebGL secara langsung.
2. **Komponen Grafis (`scene/`):**
   - Format penamaan PascalCase untuk komponen R3F (contoh: `Planet.tsx`, `Starfield.tsx`).
   - Berada di bawah wrapper `CosmicCanvas.tsx` dan terisolasi oleh `SceneErrorBoundary.tsx`.
   - Menggunakan referensi mutable untuk koordinat pergerakan, tidak memicu re-render React pada setiap frame.
3. **Timeline Animasi (`animation/`):**
   - Format penamaan kebab-case dengan akhiran `.timeline.ts` (contoh: `hero.timeline.ts`).
   - Mengembalikan fungsi *cleanup* (`context.revert()`) yang wajib dipanggil saat unmount.
4. **Data Konten (`content/`):**
   - Format penamaan camelCase (contoh: `projects.ts`).
   - Berisi data statis bertipe kuat. Semua nilai yang belum tersedia wajib memakai flag status `CONTENT_PENDING`.
