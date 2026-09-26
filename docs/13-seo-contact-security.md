# 13 — SEO, Metadata, Kontak & Keamanan Teknis

Versi: 1.0 · Tanggal: 21 September 2026 · Status: Disetujui

---

## 1. Strategi SEO & Metadata Publik

Repositori **XEVRYN Cosmic Portfolio** dirancang agar dapat diindeks secara sempurna oleh mesin pencari modern (Google, Bing, DuckDuckGo) tanpa bergantung pada eksekusi JavaScript pada saat perayapan awal (*crawler rendering*).

### 1.1 Konfigurasi Meta Tags Inti
Setiap halaman (`index.html` dan halaman studi kasus) menghasilkan tag metadata unik:
- **Title Tag:** Format Beranda: `XEVRYN — Creative Technologist & Cosmic Web Portfolio`. Format Detail: `[Nama Proyek] — Studi Kasus Arsitektur | XEVRYN`.
- **Meta Description:** Deskripsi ringkas (140–160 karakter) yang merangkum fokus keahlian tanpa klaim kosong.
- **Theme Color:** `<meta name="theme-color" content="#050711">` untuk mewarnai bilah status peramban mobile agar menyatu dengan latar ruang angkasa.
- **Canonical URL:** Ditentukan secara otomatis setelah domain hosting resmi ditetapkan.

### 1.2 OpenGraph & Twitter Cards
- **OG Image (1200×630px):** Menggunakan grafis kosmik beresolusi tinggi dengan tipografi nama `XEVRYN` dan siluet planet di sisi kanan (`AST-10`).
- **Twitter Card:** Tipe `summary_large_image` untuk pratinjau kartu besar yang memikat di lini masa media sosial.

### 1.3 Data Terstruktur JSON-LD (Schema.org)
Menyematkan skema semantik terverifikasi untuk memperjelas identitas entitas:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "XEVRYN",
  "jobTitle": "Creative Technologist & Systems Engineer",
  "description": "Portofolio rekayasa web modern, grafis 3D WebGL, dan arsitektur sistem performa tinggi bertema kosmik.",
  "knowsAbout": [
    "WebGL & Three.js",
    "React & TypeScript",
    "Sistem Desain & Animasi Web",
    "Arsitektur Frontend Performa Tinggi"
  ]
}
</script>
```

---

## 2. Alur Kontak Andal & Perlindungan Privasi

### 2.1 Mekanisme Kontak v1
1. **Tautan `mailto:` Terverifikasi:** Tombol kontak utama langsung membuka aplikasi email bawaan pengguna dengan subjek email terstandarisasi (misal: `Kerja Sama Proyek — Kolaborasi XEVRYN`).
2. **Salin Email Satu-Klik (1-Click Copy):** Menggunakan `navigator.clipboard.writeText`. Jika izin clipboard diblokir oleh peramban, antarmuka otomatis menyeleksi teks alamat email agar pengguna dapat menekan `Ctrl+C` / `Cmd+C` secara manual.
3. **Pemberitahuan Status yang Jujur:** Notifikasi toast (ANM-057) hanya akan menampilkan status sukses jika penulisan ke clipboard benar-benar berhasil. Dilarang menampilkan konfirmasi palsu.
4. **Data Email Pending:** Jika pemilik belum memberikan alamat email resmi, tombol kontak akan menampilkan status penampung yang elegan dan tidak membuka tautan mati.

### 2.2 Larangan Form Palsu
Versi 1 **tidak menyediakan formulir isian palsu** yang berpura-pura mengirimkan pesan tanpa backend yang nyata. Jika di masa mendatang form kontak server-side ditambahkan, maka wajib memenuhi:
- Endpoint API tersanitasi dengan validasi skema server (misal: Zod).
- Proteksi anti-spam (Honeypot field dan rate limiting per IP).
- Kebijakan privasi penyimpanan data yang transparan.

---

## 3. Keamanan Teknis & Perlindungan Repositori

### 3.1 Pencegahan Kebocoran Rahasia (Zero Secrets Policy)
- Dilarang keras menyimpan API key, kata sandi, token otentikasi, atau kredensial hosting di dalam kode sumber repositori maupun di dalam dokumen perancangan.
- File `.env.example` hanya memuat nama variabel lingkungan tanpa nilai rahasia.

### 3.2 Keamanan Tautan Eksternal
Seluruh tautan yang mengarah ke luar domain portofolio wajib menggunakan atribut keamanan:
```html
<a href="https://github.com/..." target="_blank" rel="noopener noreferrer">
  GitHub Profil
</a>
```
Hal ini mencegah celah keamanan *reverse tabnabbing* (`window.opener` exploit) dan melindungi privasi pengguna.

### 3.3 Rekomendasi Header Keamanan & Content Security Policy (CSP)
Saat dideploy pada platform hosting statis (Vercel, Netlify, Cloudflare Pages), server disarankan menyertakan header proteksi:
```http
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; worker-src 'self' blob:;
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```
