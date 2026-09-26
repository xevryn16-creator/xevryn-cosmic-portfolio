# 08 — Manifest Aset, Anggaran Ukuran & Lisensi (Assets)

Versi: 1.0 · Tanggal: 21 September 2026 · Status: Disetujui

---

## 1. Kebijakan Manajemen Aset & Lisensi

Seluruh aset visual, tekstur 3D, font, dan gambar yang digunakan dalam repositori **XEVRYN Cosmic Portfolio** wajib memiliki catatan asal-usul (*provenance*), ukuran terukur, dan lisensi terbuka yang sah. Dilarang mengunduh aset dari internet tanpa memeriksa hak cipta atau menyematkan berkas biner berukuran raksasa yang merusak performa loading.

Semua aset saat ini berstatus **PENDING** (belum ada berkas aset lokal yang diunduh ke folder `public/`). Dokumen ini menetapkan spesifikasi teknis dan strategi fallback untuk masing-masing aset.

---

## 2. Manifest Aset Lengkap (AST-01 s/d AST-12)

| ID | Nama Aset | Spesifikasi Teknis & Format | Anggaran Ukuran | Status Saat Ini | Strategi Fallback | Lisensi / Sumber Rencana |
|---|---|---|---|---|---|---|
| **AST-01** | Poster Hero Desktop | AVIF / WebP, resolusi 1920×1080px | ≤ 300 KB | `PENDING` | Gradien kosmik CSS `#050711` + pendaran biru atmosfer | Desain internal / Generasi AI berlisensi CC0 |
| **AST-02** | Poster Hero Mobile | AVIF / WebP, resolusi 1080×1920px (portrait) | ≤ 180 KB | `PENDING` | Gradien kosmik CSS portrait dengan framing terpusat | Desain internal / Generasi AI berlisensi CC0 |
| **AST-03** | Tekstur Permukaan Planet | Peta Normal & Diffuse 1K (Lite) / 2K (Full) | ≤ 600 KB total | `PENDING` | Shader prosedural Three.js (tanpa tekstur gambar eksternal) | Tekstur exoplanet NASA / Procedural noise shader |
| **AST-04** | Tekstur Gas Nebula | PNG / WebP transparan resolusi 1024×1024px | ≤ 180 KB | `PENDING` | Gradien radial CSS statis dengan rona violet kosmik | Procedural Simplex Noise / Public domain observatory |
| **AST-05** | Sprite Partikel Bintang | Atlas partikel kecil (64×64px) atau procedural point | ≤ 30 KB | `PENDING` | `THREE.PointsMaterial` bawaan WebGL | Procedural circle point shader |
| **AST-06** | Foto Profil XEVRYN | WebP / AVIF, rasio 4:5, resolusi 800×1000px | ≤ 180 KB | `PENDING` | Hilangkan elemen foto; tata letak otomatis fokus pada teks | Diserahkan langsung oleh pemilik portofolio |
| **AST-07** | Sampul Karya (Cover) | WebP / AVIF, rasio 16:10, resolusi 1280×800px | ≤ 180 KB/karya | `PENDING` | Panel kartu kosmik bertuliskan judul proyek dan ikon teknis | Screenshot karya asli pemilik / Diagram arsitektur |
| **AST-08** | Galeri Studi Kasus | WebP responsif dengan srcset (800px, 1200px) | ≤ 150 KB/gambar | `PENDING` | Placeholder diagram struktural dengan alt-text deskriptif | Screenshot karya asli pemilik / Diagram arsitektur |
| **AST-09** | Font Utama (Inter) | WOFF2 Variable Font (Latin subset) | ≤ 140 KB total | `PENDING` | System font fallback: `-apple-system, Segoe UI, Roboto` | OFL (SIL Open Font License) / Google Fonts |
| **AST-10** | Gambar OpenGraph (OG) | PNG / JPEG, resolusi standar 1200×630px | ≤ 200 KB | `PENDING` | Banner OG statis berlogo XEVRYN kosmik | Desain internal |
| **AST-11** | Favicon & App Icons | Favicon SVG multi-resolusi + fallback PNG 32px | ≤ 20 KB total | `PENDING` | Glyp 'X' geometris sederhana | Desain internal |
| **AST-12** | Berkas CV (PDF) | Dokumen PDF terkompresi dengan teks terbaca | ≤ 1.5 MB | `PENDING` | Tombol unduh CV disembunyikan penuh | Diserahkan langsung oleh pemilik portofolio |

---

## 3. Pipeline Optimasi Aset Saat Implementasi

Ketika berkas aset disiapkan pada fase implementasi:
1. **Kompresi Gambar:** Semua gambar fotografi/render dikonversi ke format modern `AVIF` dengan fallback `WebP`. Tidak ada gambar format BMP atau PNG tak terkompresi.
2. **Dimensi Pasti (CLS Prevention):** Setiap tag `<img>` wajib memiliki atribut `width` dan `height` eksplisit serta `aspect-ratio` CSS untuk mencegah Cumulative Layout Shift (CLS).
3. **Pemuatan Bertahap (Lazy Loading):** Gambar sampul karya di bawah viewport dan galeri studi kasus wajib menggunakan `loading="lazy"` dan `decoding="async"`.
4. **Font Subsetting:** Font WOFF2 hanya menyertakan karakter Latin standar untuk meminimalkan beban transfer awal.
