# 07 — Model Konten & Manajemen Status `CONTENT_PENDING`

Versi: 1.0 · Tanggal: 21 September 2026 · Status: Disetujui

---

## 1. Prinsip Integritas Konten

Sesuai aturan utama repositori, **tidak ada data pribadi palsu, statistik fiktif, angka konversi buatan, atau testimoni rekaan**. 

Semua informasi yang belum diverifikasi langsung oleh pemilik portofolio dikategorikan sebagai `CONTENT_PENDING`. Sistem antarmuka dirancang secara anggun untuk tetap dapat berjalan tanpa elemen yang berstatus pending tersebut (contoh: jika berkas CV belum tersedia, tombol unduh CV tidak akan dirender).

---

## 2. Definisi Skema Tipe Data (TypeScript Schemas)

```typescript
// src/types/content.ts

export type ContentStatus = 'CONFIRMED' | 'CONTENT_PENDING';

export interface ProfileContent {
  brand: string;                   // 'XEVRYN' (CONFIRMED)
  publicName: string;              // Nama publik (Bisa alias atau nama lengkap)
  headline: string;                // Jabatan / peran profesional utama
  bioShort: string;                // Ringkasan bio hero (1-2 kalimat)
  bioFull: string[];               // Paragraf narasi About (60–100 kata)
  portraitUrl?: string;            // URL foto profil (Opsional)
  status: ContentStatus;
}

export interface ProjectLink {
  label: string;
  url: string;
  kind: 'live' | 'repo' | 'demo';
}

export interface ProjectContent {
  id: string;                      // ID unik (misal: 'PRJ-01')
  slug: string;                    // Slug URL rute (misal: 'stellar-engine')
  title: string;                   // Judul karya
  summary: string;                 // Ringkasan kartu (1-2 kalimat)
  role: string;                    // Peran XEVRYN dalam proyek
  year?: string;                   // Tahun pengerjaan (hanya jika valid)
  tags: string[];                  // Tag teknologi / bidang
  coverImage: string;              // Path gambar sampul utama
  galleryImages: string[];         // Daftar tangkapan layar galeri
  challenge: string;               // Tantangan teknis & masalah
  approach: string;                // Keputusan arsitektur & solusi
  outcome: string;                 // Hasil yang dapat dibuktikan secara faktual
  links: ProjectLink[];            // Tautan eksternal (hanya yang aktif)
  status: ContentStatus;
}

export interface SkillItem {
  id: string;                      // ID keahlian (misal: 'SKL-WEBGL')
  label: string;                   // Nama teknologi / keahlian
  category: 'graphics' | 'engineering' | 'architecture';
  description: string;             // Penjelasan aplikasi praktis
  projectIds: string[];            // ID proyek yang menjadi bukti keahlian ini
  status: ContentStatus;
}

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'x' | 'email';
  label: string;
  url: string;
  status: ContentStatus;
}
```

---

## 3. Inventaris Konten & Status Faktual Terkonfirmasi

Berikut adalah status terkini data portofolio:

| Bidang | Nilai Terkonfirmasi | Status | Keterangan Implementasi |
|---|---|---|---|
| **Nama Brand** | `XEVRYN` | **CONFIRMED** | Penanda visual utama di Hero, navigasi, dan footer. |
| **Nama Lengkap Publik** | `Daffa Alfie Febryan Tijani` | **CONFIRMED** | Ditampilkan pada kartu identitas resmi di seksi About. |
| **Peran Profesional** | `Pengembang Web & Aplikasi Interaktif` | **CONFIRMED** | Fokus pada pengembangan web, antarmuka, dan kenyamanan pengguna. |
| **Bio Singkat Hero** | "Saya Daffa, pengembang web di balik XEVRYN. Mengerjakan website dan aplikasi dengan perhatian pada tampilan, interaksi, dan kemudahan penggunaan." | **CONFIRMED** | Kalimat pembuka jujur dan proporsional di seksi Hero. |
| **Bio Naratif About** | Narasi bahasa Indonesia natural mengenai fokus antarmuka, lingkup proyek (workspace riset, simulasi ritel, aset desain), serta pengalaman kerja barista & kasir di Sumedang. | **CONFIRMED** | Terpasang rapi di seksi About tanpa jargon teknis berlebihan. |
| **Alamat Email Publik** | `xevryn16@gmail.com` | **CONFIRMED** | Tombol salin email dan tombol kirim email (`mailto:xevryn16@gmail.com`) aktif di seksi Contact & Footer. |
| **Nomor / Link WhatsApp** | `0896-1111-2625` / `https://wa.me/6289611112625` | **CONFIRMED** | Tombol kontak WhatsApp langsung aktif di seksi Contact & Footer. |
| **Akun GitHub** | Utama: `https://github.com/alfiedafa3`<br>Kedua: `https://github.com/xevryn16` | **CONFIRMED** | Ditampilkan dengan label jelas di Contact dan Footer. *Daftar karya portofolio tetap mengacu pada karya yang disepakati.* |
| **Pengalaman Kerja** | **11/12 coffe street (Sumedang)** — Barista & Kasir.<br>*Deskripsi:* Menangani pembuatan dan penyajian minuman, transaksi kasir, serta membantu berbagai kebutuhan operasional harian kafe. | **CONFIRMED** | Disajikan jujur di seksi Experience. Periode kerja belum diberikan dan sengaja tidak dikarang. |
| **Berkas CV (PDF)** | *Belum dibuat oleh pemilik* | `CONTENT_PENDING` | Tombol unduh CV disembunyikan sementara tanpa membuat file PDF placeholder/rusak. |
| **Domain Produksi Definitif** | *Belum ditentukan pemilik* | `CONTENT_PENDING` | Placeholder standar `https://xevryn.example.com` disiapkan pada sitemap/robots. |

---

## 4. Daftar Karya Nyata Terkonfirmasi (5 Proyek)

1. **Marketra / Marketra Mitta (`PRJ-01` / `marketra`):** Workspace riset pasar dan analisis tren digital.
2. **RetailLab (`PRJ-02` / `retaillab`):** Simulasi ritel dan kalkulasi operasional bisnis interaktif.
3. **Xevryn Assets Library (`PRJ-03` / `xevryn-assets`):** Koleksi aset visual dan komponen antarmuka web.
4. **Ucapan-Buat-Kamu (`PRJ-04` / `ucapan-buat-kamu`):** Situs web ucapan personal interaktif (informasi pribadi penerima dilindungi).
5. **Xevryn Forge (`PRJ-05` / `xevryn-forge`):** Eksplorasi rekayasa antarmuka dan utilitas visual web.

*Catatan Integritas: Tidak ada angka metrik penjualan fiktif atau testimoni buatan. Seluruh karya disajikan dengan dokumentasi fitur nyata, peran pemilik, dan tautan yang benar-benar tersedia.*
