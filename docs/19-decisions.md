# 19 — Catatan Keputusan Arsitektur (Architectural Decision Records)

Versi: 1.0 · Tanggal: 21 September 2026 · Status: Disetujui

---

## 1. Indeks Catatan Keputusan (ADR-001 s/d ADR-008)

| ADR ID | Judul Keputusan | Status | Tanggal |
|---|---|---|---|
| **ADR-001** | Pemilihan Core Framework: React 19 + TypeScript + Vite + SSG Prerender | Disetujui | 21 Sept 2026 |
| **ADR-002** | Arsitektur Grafis 3D: Kanvas Latar Belakang Tunggal Three.js / R3F | Disetujui | 21 Sept 2026 |
| **ADR-003** | Kontrak Kepemilikan Animasi: GSAP ScrollTrigger via Mutable Ref Bridge | Disetujui | 21 Sept 2026 |
| **ADR-004** | Metodologi Styling: Vanilla CSS & CSS Tokens Terpusat | Disetujui | 21 Sept 2026 |
| **ADR-005** | Mekanisme Scroll: Native Scroll Murni Tanpa Library Scroll-Jacking | Disetujui | 21 Sept 2026 |
| **ADR-006** | Kebijakan Integritas Konten & Standar `CONTENT_PENDING` | Disetujui | 21 Sept 2026 |
| **ADR-007** | Sistem Profil Gerak Adaptif Tiga Tingkat (Full / Lite / Reduced) | Disetujui | 21 Sept 2026 |
| **ADR-008** | Strategi Degradasi Anggun WebGL: Poster CSS & Shader Prosedural | Disetujui | 21 Sept 2026 |

---

## 2. Rincian Dokumen Keputusan

### ADR-001: Pemilihan Core Framework: React 19 + TypeScript + Vite + SSG Prerender
- **Konteks:** Diperlukan fondasi web modern yang mampu menangani pohon komponen kompleks, type-safety ketat pada data konten dan animasi, serta kompilasi kilat. Selain itu, konten harus dapat diindeks oleh mesin pencari dan terbaca tanpa JavaScript.
- **Keputusan:** Mengadopsi **React 19 + TypeScript + Vite** dengan integrasi static prerendering (SSG) untuk menghasilkan file HTML statis saat build.
- **Alternatif yang Dipertimbangkan:**
  - *Next.js (App Router):* Fitur lengkap namun membawa overhead runtime server dan dependensi build yang lebih berat untuk portofolio statis.
  - *Vanilla JS Murni:* Terlalu rapuh untuk pengelolaan state adegan 3D dan komponen rute dinamis.
- **Konsekuensi:** Mengharuskan spike build awal (TSK-006) untuk memastikan proses prerender Node.js tidak mengalami error saat membaca objek browser global seperti `window` atau `document`.

---

### ADR-002: Arsitektur Grafis 3D: Kanvas Latar Belakang Tunggal Three.js / R3F
- **Konteks:** Pengalaman kosmik memerlukan planet 3D, lapisan bintang, nebula, dan warp tunnel yang terasa menyatu sepanjang perjalanan halaman utama.
- **Keputusan:** Menggunakan **satu kanvas WebGL tunggal persisten (`CosmicCanvas`)** yang diletakkan di latar belakang tetap (`position: fixed; inset: 0`). Seluruh section DOM meluncur di atas kanvas ini.
- **Alternatif yang Dipertimbangkan:**
  - *Satu kanvas terpisah per section:* Memboroskan context WebGL (browser membatasi maksimal 8–16 context aktif) dan menyebabkan crash memori GPU.
  - *Gambar GIF / Video Background:* Berat dalam ukuran transfer dan tidak dapat merespons pergerakan scroll pengguna secara interaktif.
- **Konsekuensi:** Koordinat kamera 3D harus dikoreografikan secara cermat mengikuti progress scroll pengguna di DOM.

---

### ADR-003: Kontrak Kepemilikan Animasi: GSAP ScrollTrigger via Mutable Ref Bridge
- **Konteks:** Terjadinya benturan (*race condition*) dan perebutan nilai properti transform jika dua library animasi (misal GSAP dan Three.js render loop) mencoba memodifikasi objek yang sama secara bersamaan.
- **Keputusan:** Menerapkan **pemisahan kepemilikan mutlak**:
  - **GSAP ScrollTrigger:** Mengelola pinning DOM, scrub scroll, dan menulis koordinat target kamera ke dalam objek memori mutable (`SceneStateRef`).
  - **Three.js `useFrame`:** Membaca nilai dari `SceneStateRef` setiap frame dan melakukan interpolasi halus (`lerp`) ke objek 3D.
- **Alternatif yang Dipertimbangkan:**
  - *GSAP langsung menganimasikan property Three.js via plugin:* Berisiko memicu desinkronisasi saat framerate berfluktuasi.
- **Konsekuensi:** Arsitektur kode sangat bersih dan mudah di-debug karena aliran data satu arah (*one-way state flow*).

---

### ADR-004: Metodologi Styling: Vanilla CSS & CSS Tokens Terpusat
- **Konteks:** Portofolio membutuhkan estetika visual gelap kosmik yang presisi, performa tinggi, dan kontrol penuh atas tipografi fluida serta animasi mikro.
- **Keputusan:** Menggunakan **Vanilla CSS murni dengan CSS Custom Properties (Tokens)** yang diorganisir modular (`tokens.css`, `typography.css`, `components.css`).
- **Alternatif yang Dipertimbangkan:**
  - *Tailwind CSS:* Menambah dependensi bundler dan menghasilkan class utilitas yang terlalu panjang untuk manipulasi animasi kustom.
  - *CSS-in-JS (Styled Components / Emotion):* Membawa overhead eksekusi JavaScript pada saat runtime yang memperlambat INP dan FCP.
- **Konsekuensi:** Membutuhkan kedisiplinan penamaan class CSS semantik oleh tim dan agen pengembang.

---

### ADR-005: Mekanisme Scroll: Native Scroll Murni Tanpa Library Scroll-Jacking
- **Konteks:** Banyak situs portofolio mewah memasang library *smooth-scroll* (seperti Lenis atau Locomotive) yang membajak (*hijack*) event roda mouse dan sentuhan layar, sering kali menyebabkan lag parah pada ponsel pintar dan merusak navigasi keyboard.
- **Keputusan:** Menggunakan **Scroll Bawaan Peramban (Native Scroll)** sepenuhnya untuk v1. Efek kehalusan transisi dicapai melalui kurva *scrub smoothing* ringan di dalam konfigurasi GSAP ScrollTrigger, bukan dengan membajak container scroll.
- **Alternatif yang Dipertimbangkan:**
  - *Lenis / Locomotive Scroll:* Menghasilkan animasi terasa mewah di desktop bertenaga tinggi, namun sangat bermasalah pada trackpad Mac, layar sentuh Android, dan navigasi pembaca layar.
- **Konsekuensi:** Navigasi terasa alami, responsif, ramah aksesibilitas, dan tidak merusak kebiasaan gestur pengguna.

---

### ADR-006: Kebijakan Integritas Konten & Standar `CONTENT_PENDING`
- **Konteks:** Pemilik portofolio belum menyerahkan seluruh data faktual (nama lengkap, teks bio final, tangkapan layar karya asli, alamat email resmi, file CV). Muncul godaan untuk membuat data fiktif atau klaim palsu.
- **Keputusan:** Menetapkan standar ketat: **dilarang membuat data fiktif**. Seluruh field yang belum lengkap diberi flag `CONTENT_PENDING`. Komponen antarmuka dirancang secara adaptif untuk menyembunyikan elemen opsional yang belum memiliki data.
- **Alternatif yang Dipertimbangkan:**
  - *Memasang data tiruan (Lorem Ipsum / Fake Stats):* Merusak reputasi profesional dan membingungkan calon klien saat ditinjau.
- **Konsekuensi:** Desain antarmuka tetap elegan dan siap pakai, sementara kebenaran informasi publik terjamin 100%.

---

### ADR-007: Sistem Profil Gerak Adaptif Tiga Tingkat (Full / Lite / Reduced)
- **Konteks:** Spektrum perangkat pengguna sangat luas, mulai dari desktop bertenaga GPU diskret, laptop hemat daya, ponsel pintar berdaya baterai terbatas, hingga pengguna dengan gangguan vestibular yang sensitif terhadap gerakan.
- **Keputusan:** Menerapkan sistem tiga tingkat mode gerak (**Full**, **Lite**, dan **Reduced**) yang dapat mendeteksi pengaturan sistem operasi secara otomatis serta menyediakan kontrol tombol manual di header antarmuka.
- **Alternatif yang Dipertimbangkan:**
  - *Hanya mendukung On/Off biner:* Mengabaikan pengguna mobile yang tetap ingin melihat sedikit dinamika visual namun tanpa mengorbankan baterai.
- **Konsekuensi:** Memerlukan pengujian menyeluruh (QA-11) untuk memastikan pembersihan timeline saat pergantian mode berlangsung live.

---

### ADR-008: Strategi Degradasi Anggun WebGL: Poster CSS & Shader Prosedural
- **Konteks:** Hardware grafis WebGL dapat mengalami kegagalan inisialisasi, penolakan driver, atau kehabisan memori (*context loss*) sewaktu-waktu.
- **Keputusan:** Menyediakan **Poster Kosmik CSS** beresolusi tinggi yang selalu berada di belakang kanvas 3D. Jika WebGL crash atau timeout > 4 detik, kanvas dilepaskan dan poster diaktifkan, memastikan konten DOM tetap 100% fungsional. Tekstur planet menggunakan shader prosedural sebagai cadangan jika file gambar tekstur gagal diunduh.
- **Alternatif yang Dipertimbangkan:**
  - *Menampilkan pesan error "WebGL Not Supported":* Membuat pengguna frustrasi dan memblokir akses ke portofolio.
- **Konsekuensi:** Memberikan pengalaman tanpa celah (*zero-downtime visual experience*) bagi seluruh pengunjung.
