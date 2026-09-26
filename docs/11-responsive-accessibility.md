# 11 — Responsif, Aksesibilitas & Matriks Fallback

Versi: 1.0 · Tanggal: 21 September 2026 · Status: Disetujui

---

## 1. Matriks Breakpoint & Penanganan Input

Situs dirancang untuk merespons berbagai ukuran layar dan tipe perangkat input secara anggun. Kami membedakan antara ukuran layar (*viewport width*) dan tipe penunjuk (*fine mouse pointer vs coarse touch*), sehingga tablet besar atau laptop layar sentuh tidak diperlakukan keliru sebagai mouse desktop biasa.

| Kategori Viewport | Rentang Resolusi | Tipe Input Utama | Penyesuaian Tata Letak & Gerak |
|---|---|---|---|
| **Mobile Portrait** | 320px – 767px | Coarse Touch | 1 kolom terpusat, alur karya vertikal alami (tanpa pin horizontal), skill berbentuk akordeon/list sentuh, padding aman dari notch/dynamic island, warp diringankan menjadi crossfade singkat. |
| **Tablet / Foldable** | 768px – 1023px | Touch / Mouse | 2 kolom proporsional pada bagian tertentu, preview kartu lebih besar, karya tetap mengalir vertikal alami, menu navigasi beralih ke drawer jika ruang horizontal sempit. |
| **Desktop Standar** | 1024px – 1919px | Fine Pointer (Mouse) | Layout horizontal track aktif untuk karya jika ada overflow lebar, interaksi magnetik pada tombol CTA, tilt 3D mikro pada kartu proyek, kanvas 3D penuh. |
| **Ultrawide Monitor** | ≥ 1920px | Fine Pointer | Konten teks dan kartu dibatasi pada `max-width: 1440px` terpusat, kanvas bintang 3D meluas ke seluruh tepi layar tanpa distorsi rasio aspek. |
| **Mobile Landscape Pendek** | Tinggi < 500px | Coarse Touch | Tinggi scene hero dipangkas, tombol CTA tetap terlihat tanpa tertutup keyboard/navigasi peramban, tidak ada pemaksaan tinggi `100vh`. |
| **Browser Zoom 200% & 400%** | Zoom peramban | Beragam | Teks reflow alami tanpa terpotong, tidak memicu scrollbar horizontal dokumen liar, menu hamburger aktif otomatis jika navigasi desktop sempit. |

---

## 2. Standar Aksesibilitas & Pembaca Layar (WCAG 2.1 AA)

Website mengimplementasikan standar aksesibilitas internasional secara menyeluruh:

### 2.1 Arsitektur Teks Terbelah (SplitText Accessibility Pattern)
Animasi huruf per huruf (ANM-013) dan paragraf per baris (ANM-024) sering kali merusak pembaca layar (*screen reader*) jika tidak ditangani dengan benar. Kami menerapkan arsitektur isolasi semantik:

```html
<!-- Pola Implementasi Aksesibel untuk Judul Animasi -->
<h1 class="hero-brand" aria-label="XEVRYN — Creative Technologist">
  <!-- Pembungkus visual diabaikan oleh pembaca layar -->
  <span aria-hidden="true" class="animated-chars">
    <span class="char">X</span>
    <span class="char">E</span>
    <span class="char">V</span>
    <span class="char">R</span>
    <span class="char">Y</span>
    <span class="char">N</span>
  </span>
</h1>
```
- Pembaca layar membaca satu kalimat utuh: *"XEVRYN — Creative Technologist"*.
- Pembaca layar **tidak akan pernah** mengeja huruf demi huruf *"X... E... V... R... Y... N"*.

### 2.2 Navigasi Keyboard & Visual Focus
1. **Tombol Lewati ke Konten (`SkipLink`):** Tombol tersembunyi pertama di DOM yang langsung muncul saat tombol `Tab` pertama ditekan, mengarahkan fokus langsung ke elemen `<main id="main-content">`.
2. **Urutan Tab Alami:** Urutan fokus keyboard mengikuti hierarki dokumen semantik dari atas ke bawah: SkipLink → Header Logo → Menu Links → Hero CTA → Kartu Karya → Simpul Keahlian → Kontak → Footer.
3. **Cincin Fokus Berkontras Tinggi (High-Contrast Focus Ring):** Seluruh elemen fokus menampilkan outline solid 2px warna biru atmosfer `--color-accent-blue` (`#6B9FFF`) dengan offset 2px, sangat jelas terlihat di atas latar kosmik gelap.
4. **Perangkap Fokus Menu Mobile (Focus Trap):** Saat drawer menu mobile terbuka, navigasi keyboard terperangkap di dalam menu; menekan tombol `Escape` menutup menu dan mengembalikan fokus ke tombol hamburger pembuka.

---

## 3. Matriks Kegagalan & Degradasi Anggun (Failure Matrix)

Sistem menjamin keandalan dan keberlanjutan pengalaman pengguna pada berbagai skenario kegagalan:

| Skenario Kegagalan | Perilaku Sistem & Pemulihan Anggun | Dampak pada Pengguna |
|---|---|---|
| **OS `prefers-reduced-motion: reduce` aktif sejak awal** | Seluruh animasi scroll, kamera bergerak, pergeseran warp, partikel foreground, dan tilt dinonaktifkan. Konten langsung tampil 100% pada posisi final. | Pengguna sensitif terhadap gerakan dapat membaca seluruh portofolio dengan sangat nyaman dan tenang. |
| **Pengguna mengubah mode ke Reduced saat halaman terbuka** | `MotionProvider` memanggil `gsap.context().revert()`, melepaskan seluruh pin scroll, dan menyelaraskan posisi halaman ke titik baca saat ini. | Transisi mulus tanpa loncatan posisi dokumen yang membingungkan. |
| **JavaScript Dimatikan (No-JS Mode)** | Berkas HTML hasil prerender (SSG) menyajikan struktur teks utuh, identitas XEVRYN, kartu karya, tautan studi kasus, dan kontak. | Mesin pencari dan pengguna tanpa-JS tetap menerima 100% informasi portofolio. |
| **WebGL Tidak Didukung Perangkat / Browser** | Deteksi kegagalan WebGL langsung mengaktifkan poster latar belakang kosmik CSS bergradien halus (`#hero-poster`). | Tidak ada pesan error teknis; antarmuka DOM tetap berfungsi normal. |
| **WebGL Context Loss (Crash Driver GPU)** | Komponen `SceneErrorBoundary` menangkap event `webglcontextlost`, menghentikan render loop, dan memunculkan poster fallback. | Aplikasi React tidak crash; seluruh tombol dan link karya tetap dapat diklik. |
| **Tekstur 3D Gagal Dimuat (Koneksi Terputus)** | Material planet otomatis beralih ke shader prosedural sederhana yang tidak memerlukan aset gambar eksternal. | Planet tetap tampak sebagai bola kosmik gelap dengan rim light kebiruan. |
| **Gambar Sampul Karya Gagal Dimuat** | Komponen `ImageWithFallback` menampilkan panel kosmik cadangan berisikan judul proyek dan teks alt deskriptif. | Tata letak kartu tidak rusak; tautan menuju halaman detail tetap bekerja. |
| **Penyimpanan Lokal (`localStorage`) Ditolak** | Pengaturan mode gerak beralih ke variabel state memori sementara selama sesi aktif tanpa memicu uncaught exception. | Preferensi tetap bekerja selama tab dibuka tanpa pesan galat. |
| **Izin Clipboard Ditolak Peramban** | Tombol salin email menampilkan notifikasi ramah: *"Alamat email telah disorot, silakan salin manual"*, dan otomatis menyeleksi teks email. | Pengguna tetap dapat menyalin alamat kontak dengan mudah. |
| **Tab Diminimalkan / Tidak Aktif** | Event `visibilitychange` menghentikan loop rendering Three.js dan ticker GSAP. | Konsumsi baterai dan suhu perangkat pengguna tetap terjaga dingin. |
