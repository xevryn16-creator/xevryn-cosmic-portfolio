# 01 — Product Requirements Document (PRD)

Versi: 1.0 · Tanggal: 21 September 2026 · Status: Disetujui

---

## 1. Visi Produk & Ringkasan Eksekutif

**XEVRYN Cosmic Portfolio** adalah website portofolio personal premium dengan atmosfer sinematik bertema alam semesta (*cosmic/deep space*). Website ini dirancang untuk menampilkan keunggulan keahlian teknis dan estetika desain **XEVRYN** secara nyata, membuktikan kapabilitas rekayasa web kelas dunia melalui integrasi grafis 3D WebGL, koreografi scroll yang halus, dan arsitektur aksesibel performa tinggi.

### Sasaran Utama
1. **Dampak Visual Pertama (First Impression):** Menghadirkan pengalaman kosmik yang memukau sejak detik pertama tanpa mengorbankan waktu muat awal (*fast initial paint*).
2. **Keterbacaan & Pembuktian Karya:** Memastikan karya nyata dan studi kasus proyek dapat diakses, dibaca, dan dipelajari dengan mudah tanpa halangan animasi berlebihan.
3. **Konversi Interaksi:** Menyediakan alur kontak yang cepat, jelas, dan dapat diandalkan bagi calon klien, perekrut, atau kolaborator.
4. **Ketahanan Teknis & Aksesibilitas:** Memastikan situs tetap fungsional di semua tingkatan perangkat, termasuk koneksi lambat, layar sentuh mobile, kondisi tanpa JavaScript, kegagalan WebGL, serta kepatuhan penuh terhadap preferensi *Reduced Motion*.

---

## 2. Audiens & Personas

| Persona | Profil & Kebutuhan | Aksi Utama yang Diharapkan |
|---|---|---|
| **Tech Recruiter / Talent Lead** | Waktu terbatas (30–60 detik). Memerlukan kepastian identitas, ringkasan keahlian, peran dalam proyek, tautan live karya, dan tombol kontak langsung. | Membuka navigasi pintas ke `#work`, meninjau kartu proyek, membuka link studi kasus, dan menyalin email kontak. |
| **Calon Klien / Founder** | Mencari keahlian desain & engineering berstandar tinggi. Ingin melihat rasa estetika (*taste*), perhatian terhadap detail visual, dan kemampuan menyelesaikan masalah kompleks. | Mengalami perjalanan visual penuh (S01–S06), membaca studi kasus proyek, dan mengirim pesan kerja sama. |
| **Peer Developer / Designer** | Menilai kualitas implementasi teknis, kehalusan animasi, performa frame-rate, keteraturan kode, dan kepatuhan aksesibilitas. | Menguji responsivitas, navigasi keyboard, mode animasi, dan memeriksa source code. |

---

## 3. Batasan Scope v1

### 3.1 Dalam Scope (In-Scope v1)
- **Halaman Utama Tunggal (`/`):** Alur naratif 6 scene berkelanjutan:
  1. *S01 Orbit* (Hero: Nama Brand, Peran, CTA Utama, Planet 3D).
  2. *S02 Perkenalan* (About: Filosofi kerja, bio ringkas, foto profil opsional).
  3. *S03 Warp Bridge* (Transisi kecepatan cahaya sebagai jembatan kosmik dramatis).
  4. *S04 Destinasi Karya* (Work Showcase: Horizontal track pada desktop jika overflow, vertikal pada mobile; mendukung 1–6 proyek, default 3).
  5. *S05 Konstelasi Keahlian* (Skills: Kluster keahlian visual yang terhubung dengan proyek nyata).
  6. *S06 Horizon Kontak* (Contact & Footer: Horizon planet saat fajar, copy email satu-klik, link jejaring sosial).
- **Halaman Detail Studi Kasus (`/work/:slug`):** Halaman artikel studi kasus lengkap dengan latar kosmik tenang, penjelasan tantangan, solusi arsitektur, galeri responsif, dan tombol kembali.
- **Halaman 404 (`/404`):** Penanganan rute tidak dikenal dengan visual kosmik yang hilang di ruang hampa (*lost in space*) dan navigasi kembali ke Beranda.
- **Sistem Gerak Adaptif:** Mode animasi *Full* (semua efek), *Lite* (efek ringan untuk mobile/hemat daya), dan *Reduced* (tanpa gerakan dekoratif untuk aksesibilitas).
- **Fallback WebGL:** Transisi mulus ke poster kosmik CSS beresolusi tinggi jika WebGL gagal diinisialisasi atau mengalami *context loss*.
- **Static Prerendering (SSG):** Konten HTML lengkap tersedia sebelum eksekusi JavaScript untuk SEO dan keterbacaan tanpa-JS.

### 3.2 Di Luar Scope v1 (Out of Scope / Deferred)
- Autoplay musik latar atau efek suara (sound FX) — *Ditunda demi kenyamanan pengguna dan pembaca layar.*
- Backend server khusus, sistem database, CMS eksternal, atau autentikasi login pengguna — *v1 murni berbasis konten lokal bertipe data statis.*
- Form pengiriman pesan server-side yang belum memiliki backend terverifikasi — *v1 menggunakan integrasi `mailto:` dan tombol salin email aman dengan umpan balik clipboard.*
- Dukungan multibahasa (i18n) — *v1 difokuskan pada bahasa Indonesia yang dipoles profesional; terminologi teknis/UI ringkas (seperti Work, About) tetap digunakan secara konsisten.*

---

## 4. Persyaratan Produk (Requirement REQ-01 s/d REQ-12)

Berikut adalah 12 requirement inti yang wajib dipenuhi dan diverifikasi dengan bukti konkret:

| ID | Nama Kebutuhan | Deskripsi Kebutuhan | Kriteria Acceptance & Pengujian |
|---|---|---|---|
| **REQ-01** | Identitas & CTA Segera Tampil | Identitas brand **XEVRYN**, peran profesional, dan tombol aksi utama (Lihat Karya, Hubungi) harus tampil langsung pada first paint tanpa menunggu aset 3D selesai diunduh. | Konten teks hero dan tombol CTA dapat dilihat dan diklik dalam waktu <1.5 detik pada koneksi standar. Fallback poster tampil sebelum canvas 3D siap. |
| **REQ-02** | Tema Kosmik Sinematik Konsisten | Visual seluruh website menampilkan tema alam semesta yang kohesif: palet warna ruang angkasa gelap, pencahayaan satu arah, rim light kebiruan, debu bintang berlapis, dan horizon planet. | Tinjauan visual membuktikan tidak ada elemen bergaya template biasa atau warna neon yang merusak estetika gelap kosmik. |
| **REQ-03** | Parallax & Kedalaman Berlapis | Latar belakang kosmik menghadirkan ilusi kedalaman 3 dimensi nyata menggunakan multi-layer: bintang jauh (lambat), bintang tengah, nebula, dan debu foreground (cepat). | Pengujian scroll bolak-balik membuktikan kecepatan pergerakan tiap lapisan berbeda secara proporsional dan tidak terjadi stutter. |
| **REQ-04** | Perjalanan Kamera & Transisi Halus | Pergerakan scroll mengendalikan posisi dan sudut kamera 3D dari orbit mendekati planet, melintasi warp tunnel, hingga memandang horizon. | Perpindahan antar scene mulus tanpa patahan (*jump cut*). Tidak ada perebutan nilai koordinat antara scroll DOM dan render loop WebGL. |
| **REQ-05** | Tipografi Ekspresif & Aksesibel | Judul dianimasikan per huruf dan paragraf dianimasikan per baris saat memasuki viewport, namun tetap terbaca utuh oleh pembaca layar (*screen reader*). | Screen reader membaca kalimat secara utuh dalam satu kesatuan, tidak mengeja per huruf. Teks tetap tersusun rapi saat ukuran jendela di-resize. |
| **REQ-06** | Showcase Karya yang Jelas & Dapat Dibuka | Karya ditampilkan secara dominan dengan gambar sampul berkualitas tinggi, peran, tag teknologi, dan dapat dibuka menuju halaman studi kasus detail melalui mouse, sentuhan, maupun keyboard. | Semua kartu proyek dapat diakses via navigasi Tab. URL studi kasus dapat dimuat langsung (*direct URL load*) dan fungsi Back/Forward peramban bekerja normal. |
| **REQ-07** | Konstelasi Keahlian Berbasis Bukti | Daftar keahlian direpresentasikan sebagai graf konstelasi bintang interaktif yang menghubungkan keahlian dengan proyek nyata yang membuktikannya. | Memilih salah satu keahlian akan menyoroti kartu proyek terkait. Tidak ada klaim tingkat keahlian dalam bentuk persentase fiktif (misal: "React 95%"). |
| **REQ-08** | Kontak Andal & Salin Email Satu-Klik | Pengguna dapat menghubungi pemilik dengan cepat melalui tautan email terverifikasi dan tombol salin alamat email ke clipboard disertai notifikasi visual yang sopan (*accessible live region*). | Mengklik tombol salin berhasil menaruh alamat email di clipboard dan memunculkan toast konfirmasi. Jika izin clipboard ditolak, teks email tetap dapat disalin manual. |
| **REQ-09** | Pengalaman Mobile yang Dirancang Khusus | Versi mobile memiliki layout khusus yang nyaman untuk layar sentuh satu tangan: alur vertikal alami, tanpa warp streak yang memusingkan, dan ukuran target sentuh minimal 44×44px. | Pengujian pada perangkat mobile nyata (layar 360–414px) membuktikan tidak ada teks terpotong, tidak ada horizontal overflow tak disengaja, dan baterai/suhu aman. |
| **REQ-10** | Kepatuhan Reduced Motion & Fallback Penuh | Pengguna yang mengaktifkan preferensi *Reduced Motion* atau perangkat tanpa dukungan WebGL tetap menerima seluruh konten secara utuh dan nyaman dibaca. | Mode Reduced Motion mematikan seluruh pergerakan kamera, tilt, dan parallax. Kegagalan WebGL otomatis menampilkan background poster tanpa pesan error teknis. |
| **REQ-11** | Performa Tinggi & Anggaran Terukur | Website mematuhi batas anggaran transfer, render frame-rate 60 FPS pada desktop standar dan 30 FPS pada mobile, LCP ≤ 2.5s, dan CLS ≤ 0.1. | Laporan build produksi membuktikan ukuran bundel non-3D ≤ 250KB compressed. Profiling menunjukkan draw calls ≤ 60 dan VRAM tekstur ≤ 64MB. |
| **REQ-12** | Keterlacakan & Handoff Siap Eksekusi | Setiap baris kode, animasi, dan komponen terhubung langsung dengan nomor kebutuhan, nomor task, dan rencana pengujian tanpa ada celah spesifikasi. | Matriks keterlacakan 100% lengkap. Agen berikutnya dapat langsung melanjutkan pengerjaan dari task yang sudah siap tanpa perlu menebak arsitektur. |

---

## 5. Integritas Konten & Data `CONTENT_PENDING`

Sesuai aturan operasional, **dilarang keras mengarang data pribadi, statistik klien fiktif, atau testimoni palsu**. 

Seluruh atribut yang belum diserahkan oleh pemilik portofolio akan diberi penanda `CONTENT_PENDING` pada model data [`docs/07-content.md`](file:///c:/Dev/Portofolio/docs/07-content.md). Layout antarmuka dirancang secara adaptif: jika foto profil atau file CV belum tersedia, komponen tersebut akan disembunyikan secara bersih tanpa merusak estetika tata letak keseluruhan.
