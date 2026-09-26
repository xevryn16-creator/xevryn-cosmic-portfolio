# 04 — Sistem Desain & Token Visual (Design System)

Versi: 1.0 · Tanggal: 21 September 2026 · Status: Disetujui

---

## 1. Fondasi Token Desain (CSS Custom Properties)

Seluruh komponen antarmuka menggunakan token terpusat dalam Vanilla CSS. Token ini menjamin konsistensi visual, kemudahan penyesuaian tema, serta performa rendering maksimal tanpa ketergantungan pada runtime styling pihak ketiga.

### 1.1 Token Warna & Permukaan
```css
:root {
  /* Palet Warna Kosmik */
  --color-space: #050711;          /* Latar belakang kanvas kosmik utama */
  --color-surface: #101626;        /* Permukaan solid panel, kartu, dan menu */
  --color-surface-glass: rgba(16, 22, 38, 0.72); /* Kaca gelap dengan backdrop blur */
  --color-surface-hover: #161e33;  /* Keadaan hover pada elemen kartu */
  --color-border: #33405B;         /* Garis batas, pemisah, dan garis orbit */
  --color-border-glow: rgba(107, 159, 255, 0.35); /* Pendaran batas saat aktif */

  /* Tipografi & Kontras */
  --color-text-main: #F2F3F7;      /* Teks primer, heading, kontras bintang */
  --color-text-muted: #AAB4CA;     /* Teks sekunder, deskripsi, metadata */
  --color-text-dim: #677592;       /* Label kecil, placeholder */

  /* Aksen & Atmosfer */
  --color-accent-blue: #6B9FFF;    /* Aksen interaksi, tautan, rim light */
  --color-accent-glow: rgba(107, 159, 255, 0.45);
  --color-nebula-violet: #8A6BDA;  /* Aksen gas kosmik dan status istimewa */
  --color-danger: #FF6B6B;         /* Status kegagalan / kesalahan */
  --color-success: #51CF66;        /* Status sukses salin email */
}
```

---

### 1.2 Skala Spasi & Radius
```css
:root {
  /* Skala Spasi Konsisten (Kelipatan 4px/8px) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;
  --space-32: 128px;

  /* Radius Sudut */
  --radius-xs: 4px;
  --radius-sm: 8px;   /* Kontrol kecil, tombol, tag */
  --radius-md: 12px;  /* Panel menu, toast */
  --radius-lg: 16px;  /* Kartu proyek, wadah preview */
  --radius-full: 9999px; /* Tombol kapsul pilihan */

  /* Batas Layout & Gutter */
  --content-max-width: 1440px;
  --gutter-mobile: 20px;
  --gutter-tablet: 32px;
  --gutter-desktop: 64px;
}
```

---

### 1.3 Lapisan Kedalaman (Z-Index Layering)
Untuk mencegah benturan z-index liar, seluruh lapisan hierarki antarmuka diatur secara eksplisit:
```css
:root {
  --z-canvas: 0;       /* Kanvas 3D WebGL di latar belakang */
  --z-content: 10;     /* Konten DOM utama (teks, section, kartu) */
  --z-header: 30;      /* Header navigasi atas persisten */
  --z-menu-modal: 50;  /* Menu layar sentuh mobile */
  --z-toast: 60;       /* Notifikasi salin email */
  --z-skip-link: 100;  /* Tombol aksesibilitas skip to main */
}
```

---

## 2. Tipografi & Hierarki Teks

Menggunakan satu keluarga font utama sans-serif modern yang fleksibel (variable font) berkarakter geometris presisi, dipadukan dengan font monospaced opsional untuk label teknis dan indeks numerik.

### 2.1 Skala Ukuran Font Responsif
```css
:root {
  --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Consolas, monospace;

  /* Tipografi Hero & Heading Fluida */
  --font-hero: clamp(48px, 12vw, 160px);
  --font-h1: clamp(36px, 7vw, 96px);
  --font-h2: clamp(28px, 5vw, 64px);
  --font-h3: clamp(20px, 3vw, 36px);
  --font-body-large: clamp(18px, 2vw, 22px);
  --font-body: 16px;
  --font-small: 14px;
  --font-mono-tag: 12px;
}
```

### 2.2 Aturan Aksesibilitas Teks
1. **Lebar Kolom Optimal:** Paragraf deskripsi dibatasi pada rentang `55–68ch` demi kenyamanan membaca tanpa membuat leher bergerak terlalu jauh.
2. **Jarak Antar-baris (`line-height`):** Heading utama menggunakan `1.05–1.15`, paragraf body menggunakan `1.6–1.7`.
3. **Satu `<h1>` Semantik:** Hanya terdapat satu tag `<h1>` per halaman (Nama brand dan peran utama pada Beranda; Judul studi kasus pada halaman detail). Teks animasi per huruf atau per baris diatur menggunakan wrapper dekoratif sehingga *accessibility tree* tetap membaca satu kalimat lengkap.

---

## 3. Komponen Inti & State Interaksi

### 3.1 Header Navigasi & Tautan Pintas
- **Default State:** Latar belakang transparan penuh menyatu dengan kanvas kosmik.
- **Scrolled State:** Saat di-scroll > 40px, mengaktifkan latar belakang kaca gelap (`--color-surface-glass`) dengan garis batas bawah halus (`--color-border`).
- **Focus Ring:** Fokus keyboard menampilkan outline solid 2px `--color-accent-blue` dengan offset 2px.

### 3.2 Tombol Aksi (Buttons & CTA)
- **Primary CTA ("Lihat Karya"):** Latar belakang bergradien biru kosmik dengan teks terang, efek glow halus pada hover.
- **Secondary CTA ("Hubungi"):** Bingkai bergaris batas halus (`--color-border`), latar semi-transparan yang memadat saat disentuh/dihajar hover.
- **Magnetic Interaction (Desktop Fine Pointer):** Tombol berpindah mengikuti arah mouse sejauh maksimal 6px, namun *hitbox* klik tetap stabil sehingga tidak menyulitkan penekanan.

### 3.3 Kartu Proyek (Project Card)
- **Rasio Aspek Terkunci:** Rasio 16:10 dengan wrapper gambar berlatar belakang kosmik untuk mencegah layout shift.
- **State Gambar Gagal (Image Error):** Jika gambar sampul gagal dimuat, kartu menampilkan panel gradien kosmik dengan teks nama proyek dan ikon cadangan, tombol detail tetap dapat diklik.
- **Hover / Active:** Zoom mikro gambar 1.035x di dalam wadah `overflow: hidden`, disertai pendaran batas biru lembut.

### 3.4 Pengalih Preferensi Animasi (Motion Control)
- Tombol kontrol minimalis di header: opsi **Full** (Semua efek), **Lite** (Hemat daya/mobile), dan **Reduced** (Statis aksesibilitas).
- Preferensi disimpan dalam `localStorage` secara aman dengan penanganan kegagalan jika penyimpanan dinonaktifkan peramban.

### 3.5 Toast Konfirmasi Salin Email
- Muncul di sudut kanan bawah dengan atribut `role="status"` dan `aria-live="polite"`.
- Memberikan kepastian visual teks tersalin selama 2.5 detik sebelum memudar secara otomatis.
