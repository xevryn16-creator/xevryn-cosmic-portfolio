# 03 — Storyboard & Alur Narasi Scene (S01 s/d S06)

Versi: 1.0 · Tanggal: 21 September 2026 · Status: Disetujui

---

## 1. Ikhtisar Perjalanan Kosmik

Alur interaksi halaman utama (`/`) dirancang sebagai sebuah perjalanan kamera luar angkasa tanpa putus (*continuous camera flight*). Setiap scene memiliki tiga fase keadaan: **Masuk (Enter)**, **Tahan & Baca (Hold/Read State)**, dan **Keluar (Exit)**.

Pengukuran panjang scroll desktop menggunakan satuan *scroll viewport height* (`svh`) untuk menghitung jarak pin secara proporsional. Pada versi mobile, sistem mengalir secara alami (*natural document flow*) tanpa pemaksaan pin yang memperlambat scrolling layar sentuh.

---

## 2. Rincian Scene S01 s/d S06

### 2.1 Scene 01 — S01: Orbit (Hero)
- **Tujuan:** Menanamkan kesan pertama yang megah, memperkenalkan identitas brand **XEVRYN**, peran profesional, dan menyediakan tombol aksi langsung.
- **Komposisi Desktop:**
  - Kiri Atas/Tengah: Tipografi nama besar `XEVRYN` (`clamp(64px, 13vw, 192px)`), sub-heading peran, dan grup tombol CTA ("Lihat Karya" & "Hubungi").
  - Kanan Bawah: Planet 3D bertekstur batuan gelap dengan atmosfer kebiruan menempati ~45% bidang pandang kamera.
  - Latar: Lapisan debu bintang statis dan nebula lembut.
- **Komposisi Mobile:**
  - Satu kolom terpusat. Teks `XEVRYN` berukuran `clamp(48px, 15vw, 88px)` aman dari *safe area notch*.
  - Planet 3D diposisikan di latar belakang bagian tengah-bawah dengan skala yang disesuaikan agar tidak menutupi tombol CTA.
- **Kamera 3D:** Posisi awal `x: 0, y: 0, z: 5.5`, target pandang `x: 0.5, y: -0.2, z: 0`.
- **Fase Transisi:**
  - *Enter (0–1.4s):* Teks nama terungkap per huruf dengan blur 6px→0px. Rim light planet memudar naik dari intensitas 0.3 ke 1.0. Tombol CTA siap diklik tanpa harus menunggu seluruh animasi selesai.
  - *Hold (Progress p: 0.00 – 0.18):* Teks dan planet dalam posisi stabil. Indikator isyarat scroll (*scroll cue*) mengapung lembut di bagian bawah.
  - *Exit (Progress p: 0.18 – 1.00):* Kamera mendekati planet (*dolly-in*, framing 1.0→1.3). Teks nama terdorong ke atas dan memudar keluar (`opacity 1→0, y: -18vh`).

---

### 2.2 Scene 02 — S02: Perkenalan (About)
- **Tujuan:** Menyampaikan filosofi kerja, latar belakang profesional, dan pendekatan teknis dalam narasi yang intim dan nyaman dibaca.
- **Komposisi Desktop:**
  - Kiri: Planet bergerak perlahan ke luar batas bingkai kiri, menyisakan lengkungan atmosfer tipis di tepi layar.
  - Kanan: Blok tipografi perkenalan dengan lebar baris terukur (55–68 karakter), diikuti foto potret resmi (opsional) atau panel spesialisasi kerja.
- **Komposisi Mobile:**
  - Tata letak satu kolom vertikal. Planet bergeser ke luar atas, digantikan oleh bidang baca gelap yang tenang dan kontras.
- **Kamera 3D:** Posisi bergerak ke `x: -2.0, y: 0.2, z: 4.2`, orientasi sedikit memutar ke kanan.
- **Fase Transisi:**
  - *Enter (Progress p: 0.00 – 0.25):* Judul bagian terungkap per kata. Paragraf bio terungkap per baris (*stagger* 100ms) dengan perpindahan vertikal 18px→0px.
  - *Hold (Progress p: 0.25 – 0.75):* **Zona Ketenangan Penuh.** Partikel bintang melambat, tidak ada pergerakan kamera cepat. Pengunjung dapat membaca teks dan menyalin teks dengan stabil.
  - *Exit (Progress p: 0.75 – 1.00):* Teks memudar naik, nebula di latar belakang meredup sebagai persiapan memasuki babak kecepatan tinggi (Warp).

---

### 2.3 Scene 03 — S03: Warp Bridge (Jembatan Kecepatan Cahaya)
- **Tujuan:** Menjadi puncak klimaks (*climax*) visual yang memisahkan perkenalan diri dengan etalase karya, memberi sensasi lompatan ruang angkasa antargalaksi.
- **Komposisi Desktop & Mobile:**
  - Tidak memuat teks bacaan wajib (murni jembatan visual terukur sepanjang maksimum 50–70svh pada desktop).
  - Titik-titik bintang di latar belakang meregang secara radial dari titik tengah layar menjadi garis-garis berkilau (*light streaks*).
  - Warna bergeser dari biru gelap ke semburat violet kosmik. **Dilarang ada kilatan putih layar penuh (strobe-free).**
- **Kamera 3D:** Akselerasi maju cepat (*dolly forward*) dari `z: 4.2` menuju `z: 1.2`, field-of-view (FOV) melebar sesaat dari 50° ke 68° untuk efek distorsi kecepatan.
- **Fase Transisi:**
  - *Enter (Progress p: 0.00 – 0.25):* Bintang mulai memanjang, akselerasi kamera dimulai.
  - *Peak (Progress p: 0.25 – 0.65):* Panjang garis bintang mencapai titik maksimum (faktor peregangan 8x).
  - *Exit (Progress p: 0.65 – 1.00):* Deselerasi halus. Garis bintang memendek kembali ke bentuk titik normal saat memasuki zona ruang angkasa baru (S04).
- **Adaptasi Mobile & Reduced Motion:**
  - *Mobile:* Panjang streak dipangkas 50% untuk menjaga kestabilan GPU.
  - *Reduced Motion:* Seluruh efek warp ditiadakan. Transisi antar-section digantikan oleh crossfade gradien kosmik halus selama 250ms tanpa perubahan posisi kamera.

---

### 2.4 Scene 04 — S04: Destinasi Karya (Work Showcase)
- **Tujuan:** Mempersembahkan karya-karya unggulan pilihan (1–6 proyek, default perancangan 3) secara besar, jelas, dan mengundang eksplorasi detail.
- **Komposisi Desktop:**
  - Judul bagian "Karya Terpilih" tersemat di sudut kiri atas.
  - Jalur karya horizontal (*horizontal track*) yang dikontrol oleh scroll vertikal pengguna. Setiap kartu proyek memiliki rasio aspek megah (16:10), menampilkan sampul karya beresolusi tinggi, tag teknologi, peran, dan tautan eksplorasi.
  - Kartu yang berada di tengah viewport mendapatkan skala 1.0, sementara kartu di tepian mendapatkan skala 0.96 dan opacity 0.7.
- **Komposisi Mobile:**
  - Jalur kartu bertumpuk secara vertikal alami. Pengguna menelusuri karya cukup dengan scroll ke bawah biasa tanpa horizontal locking.
- **Kamera 3D:** Mengambang stabil di koordinat `x: 0, y: -0.5, z: 4.8`, debu kosmik mengapung sangat lambat di kedalaman.
- **Fase Transisi:**
  - *Enter:* Kartu pertama meluncur masuk dengan efek fade-in dan zoom mikro (1.03→1.0).
  - *Interaction:* Hover mouse pada kartu menghasilkan efek tilt 3D mikro (maksimal 3°) yang mengikuti arah kursor.
  - *Exit:* Setelah kartu terakhir dilintasi, pin scroll dilepaskan secara mulus menuju bagian keahlian tanpa kekosongan ruang putih.

---

### 2.5 Scene 05 — S05: Konstelasi Keahlian (Skills)
- **Tujuan:** Menunjukkan penguasaan alat, bahasa pemrograman, dan metodologi arsitektur secara elegan melalui visualisasi konstelasi bintang yang terikat pada bukti nyata.
- **Komposisi Desktop:**
  - Kiri: Daftar kategori keahlian semantik (Arsitektur Web, Grafis 3D & Animasi, Rekayasa Sistem).
  - Kanan / Tengah: Graf konstelasi bintang dengan simpul-simpul keahlian yang terhubung oleh garis kosmik tipis.
  - Saat salah satu keahlian dipilih, garis yang menghubungkannya dengan proyek yang menggunakannya akan menyala terang (`#6B9FFF`).
- **Komposisi Mobile:**
  - Daftar kartu akordeon terstruktur rapi yang ramah sentuhan, tetap menampilkan relasi ke proyek tanpa memaksakan simulasi graf yang rumit pada layar sempit.
- **Fase Transisi:**
  - *Enter (Progress p: 0.00 – 0.35):* Simpul bintang muncul bertahap (*stagger* 70ms), garis koneksi terlukis dengan animasi stroke-dash.
  - *Hold (Progress p: 0.35 – 1.00):* Konstelasi melakukan rotasi ambient mikro (maksimal 1° setiap 18 detik). Target klik memiliki ukuran minimum 44×44px.
  - *Exit:* Cahaya konstelasi meredup lembut seiring kemunculan lengkungan horizon planet di bawah.

---

### 2.6 Scene 06 — S06: Horizon Planet & Kontak (Contact & Footer)
- **Tujuan:** Menutup perjalanan secara emosional dengan pemandangan horizon planet raksasa di fajar kosmik, mendorong pengunjung melakukan kontak bisnis atau kolaborasi.
- **Komposisi Desktop & Mobile:**
  - Bawah Layar: Busur kelengkungan planet masif naik dari bawah, disinari oleh rim lighting kebiruan atmosfer fajar.
  - Tengah Atas: Teks ajakan kolaborasi yang berani ("Mari Bangun Sesuatu yang Melampaui Batas").
  - Tengah Bawah: Tombol salin email satu-klik berukuran besar dengan interaksi magnetik mikro (desktop), tautan media sosial (GitHub, LinkedIn, dll.), serta footer legalitas hak cipta.
- **Kamera 3D:** Menatap lurus ke horizon planet pada koordinat `x: 0, y: -1.8, z: 3.5`.
- **Fase Transisi:**
  - *Enter (Progress p: 0.00 – 0.35):* Horizon planet terangkat dari bawah (`y: 40px→0px`).
  - *Hold:* Latar belakang sangat tenang. Form dan link kontak dapat diakses dengan mudah oleh mouse maupun navigasi keyboard (termasuk tombol pintas `End` pada keyboard).

---

## 3. Halaman Tambahan

### 3.1 Halaman Detail Studi Kasus (`/work/:slug`)
- **Latar Belakang:** Menggunakan kanvas kosmik statis atau poster bertingkat rendah (*calmed space*) agar CPU/GPU fokus merender galeri gambar dan teks analisis teknis.
- **Struktur Halaman:**
  1. Tombol kembali ke Beranda (`← Kembali ke Orbit Karya`).
  2. Judul proyek, ringkasan eksekutif, peran, tahun, dan tautan live/repositori.
  3. Bagian Tantangan & Kebutuhan Desain.
  4. Bagian Keputusan Arsitektur & Rekayasa Teknis.
  5. Galeri visual responsif dengan rasio aspek terkunci untuk mencegah layout shift (CLS).
  6. Hasil nyata yang terukur (hanya jika data terverifikasi tersedia; jika tidak, difokuskan pada pembelajaran teknis).

### 3.2 Halaman 404 (`/404`)
- **Konsep:** "Hilang di Ruang Hampa (Lost in the Void)".
- **Tampilan:** Bintang-bintang redup yang berputar pelan tanpa planet, teks kode status "404", dan tombol navigasi tunggal: "Kembali ke Koordinat Utama".
