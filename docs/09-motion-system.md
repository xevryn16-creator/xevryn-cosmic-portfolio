# 09 — Sistem Gerak, Timeline & Lifecycle Animasi (Motion System)

Versi: 1.0 · Tanggal: 21 September 2026 · Status: Disetujui

---

## 1. Filosofi & Kontrak Sistem Gerak

Sistem gerak **XEVRYN Cosmic Portfolio** dirancang untuk memperkuat narasi perjalanan kosmik tanpa pernah menghambat tujuan utama pengunjung: membaca profil dan mengevaluasi karya. Gerakan tidak boleh membuat pengguna merasa pusing, mual, atau kesulitan mengklik tombol interaktif.

### Prinsip Inti
1. **Gerak Berarah Tujuan (Purposeful Motion):** Setiap animasi memiliki alasan fungsional: mengarahkan fokus mata, memberikan umpan balik aksi sentuh, atau menciptakan persepsi kedalaman ruang.
2. **Zona Ketenangan Membaca (Calm Reading Zones):** Animasi lingkungan mereda (*calm down*) saat pengguna berhenti scroll untuk membaca paragraf atau mengamati kartu proyek.
3. **Pembalikan Halus (Reversible & Scrubbed):** Seluruh animasi berbasis scroll dapat dibalik secara mulus saat pengguna melakukan scroll ke atas, tanpa glitch atau loncatan elemen.

---

## 2. Token Waktu & Kurva Easing (Motion Tokens)

```typescript
// src/animation/tokens.ts

export const MOTION_TOKENS = {
  // Durasi Interaksi Mikro
  microFast: 0.14,           // 140ms: Hover link, underline, indikator aktif
  microNormal: 0.22,         // 220ms: Transisi warna tombol, pembukaan menu mobile

  // Durasi Reveal Elemen
  revealHeading: 0.65,       // 650ms: Reveal judul per kata/huruf
  revealBodyLine: 0.55,      // 550ms: Reveal paragraf per baris
  heroIntroTotal: 1.40,      // Maksimal 1.4 detik untuk seluruh intro pembuka

  // Staggering (Jeda Berurutan)
  staggerChar: 0.028,        // 28ms jeda antar-huruf pada judul utama
  staggerLine: 0.100,        // 100ms jeda antar-baris pada paragraf bio
  staggerCard: 0.120,        // 120ms jeda antar-kartu proyek

  // Easing Curves (GSAP format)
  easeOutCubic: "power2.out",
  easeOutQuart: "power3.out",
  easeInOutSmooth: "power2.inOut",
  easeWarp: "power4.inOut",

  // Parameter Interaksi Pointer
  tiltMaxAngle: 3.0,         // Maksimal 3 derajat tilt kartu proyek
  magneticMaxOffset: 6.0,    // Maksimal perpindahan 6px untuk tombol magnetik

  // Loop Lingkungan (Ambient)
  planetRotationPeriod: 180, // 180 detik per putaran planet
  nebulaDriftPeriod: 60,     // 60 detik per siklus pergeseran gas nebula
} as const;
```

---

## 3. Matriks Tiga Mode Gerak (Tri-Tier Motion Modes)

Aplikasi mendukung tiga profil gerak yang dapat disesuaikan pengguna maupun sistem:

| Fitur Animasi | Mode Full (Desktop Kuat) | Mode Lite (Mobile / Hemat Daya) | Mode Reduced (Aksesibilitas) |
|---|---|---|---|
| **Animasi Teks Judul** | Reveal per huruf (stagger 28ms) + blur | Reveal per kata (stagger 40ms) tanpa blur | Langsung tampil 100% tanpa delay |
| **Animasi Paragraf** | Reveal per baris (stagger 100ms) | Reveal blok paragraf halus | Langsung tampil 100% tanpa delay |
| **Kamera 3D WebGL** | Perjalanan kamera penuh S01–S06 | Kamera stabil, transisi sudut sederhana | Kamera statis, tanpa pergerakan scroll |
| **Warp Tunnel (S03)** | Efek regang bintang penuh (streak 8x) | Transisi regang bintang pendek (streak 2x) | Ditiadakan; crossfade gradien statis |
| **Track Horizontal Karya** | Pinning scroll dengan translasi X | Alur scroll vertikal alami | Alur scroll vertikal alami |
| **Tilt & Magnetic** | Aktif untuk fine pointer (mouse) | Dinonaktifkan | Dinonaktifkan |
| **Rotasi Ambient 3D** | Aktif berkelanjutan (jeda saat hidden) | Kecepatan diperlambat 50% | Dinonaktifkan penuh |

---

## 4. Pemetaan Progress Scroll Lokal (Scene Progress Mapping)

Setiap scene memiliki ScrollTrigger mandiri yang memetakan jarak scroll menjadi nilai lokal terstandarisasi `p` dalam rentang `0.0` sampai `1.0`. Dilarang memetakan seluruh efek website ke satu persentase scroll dokumen global.

```text
[ S01: Hero ]       p = 0.00 (Nama terbaca) ──────► p = 0.18 (Hold) ──► p = 1.00 (Exit ke About)
[ S02: About ]      p = 0.00 (Enter) ─────────────► p = 0.25–0.75 (Zona Baca) ──► p = 1.00 (Exit)
[ S03: Warp ]       p = 0.00 (Akselerasi) ────────► p = 0.50 (Puncak Streak) ──► p = 1.00 (Reset)
[ S04: Work ]       p = 0.00 (Kartu 1 aktif) ─────► Translasi X dinamis ───────► p = 1.00 (Pin lepas)
[ S05: Skills ]     p = 0.00 (Garis terlukis) ────► p = 0.35–1.00 (Zona Pilihan Interaktif)
[ S06: Contact ]    p = 0.00 (Horizon terangkat) ─► p = 0.35–1.00 (Kontak Stabil & Footer)
```

---

## 5. Kontrak Lifecycle, Pembersihan Memori & Keamanan Render

1. **Pembersihan dengan `gsap.context()`:**
   - Seluruh inisialisasi timeline dan ScrollTrigger wajib dibungkus dalam `gsap.context(() => { ... }, containerRef)`.
   - Fungsi pembersihan `ctx.revert()` wajib dipanggil pada blok return `useEffect()`. Hal ini mencegah penumpukan pin ganda dan memori bocor akibat React StrictMode double-mount.
2. **Sinkronisasi Font Sebelum Pemisahan Teks (SplitText):**
   - Inisialisasi pemisahan teks per huruf/baris hanya dijalankan setelah `document.fonts.ready` selesai. Jika font berubah, teks dikembalikan ke bentuk asli sebelum dihitung ulang (*re-split*).
3. **Batching Refresh Pengukuran Scroll:**
   - Perubahan ukuran jendela (*window resize*) atau orientasi layar ditangani melalui debounced `ScrollTrigger.refresh()`. Dilarang memanggil refresh pada setiap event scroll atau per frame.
4. **Penanganan Tab Tidak Aktif:**
   - Ticker GSAP dan render loop R3F mendengarkan event `visibilitychange`. Saat pengguna berganti tab, seluruh loop dihentikan dan dilanjutkan kembali secara mulus tanpa loncatan waktu (*no time-jump explosion*).
