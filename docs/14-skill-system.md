# 14 — Sistem Skill Proyek Agen (Skill System)

Versi: 1.1 · Tanggal: 21 September 2026 · Status: Disetujui & Terintegrasi

---

## 1. Mekanisme Kustomisasi & Lokasi Resmi Skill

Lingkungan **Google Antigravity** mengenali kustomisasi agen melalui root kustomisasi workspace di:
```text
c:\Dev\Portofolio\.agents\skills\<nama-skill>\SKILL.md
```

Setiap skill berfungsi sebagai prosedur operasional standar (SOP) berbasis alur kerja (*workflow*) yang dipanggil berdasarkan pemicu (*trigger*) tugas spesifik. Setiap berkas `SKILL.md` memuat frontmatter YAML (`name`, `description`), dokumen masukan (*inputs*), langkah kerja terurut, batasan tanggung jawab, serta kriteria verifikasi keluaran.

Rincian pelengkap sistem skill didokumentasikan dalam berkas berikut:
- [`docs/skills-manifest.md`](file:///c:/Dev/Portofolio/docs/skills-manifest.md) — Manifest lengkap, lisensi, commit/versi, skrip pendukung, dan status verifikasi.
- [`docs/skill-routing.md`](file:///c:/Dev/Portofolio/docs/skill-routing.md) — Perutean skill, pembagian tanggung jawab, dan protokol resolusi konflik estetika.
- [`docs/skill-validation.md`](file:///c:/Dev/Portofolio/docs/skill-validation.md) — Laporan validasi integritas dan bukti uji terbatas berbasis dokumen.

---

## 2. Peta Skill Proyek (21 Skill Terpadu)

### A. Skill Eksternal Pendukung (Perancangan, Spesifikasi, Audit, dan Komunikasi)

| Nama Frontmatter | Repositori Sumber | Peran Utama | Kapan Digunakan |
|---|---|---|---|
| `ui-ux-pro-max` | `nextlevelbuilder/ui-ux-pro-max-skill` | Sistem desain, UX guidelines, tipografi, warna, spacing, responsif | Saat menyusun token CSS, menata komponen UI, dan audit kegunaan |
| `design-taste-frontend` | `leonxlnx/taste-skill` | Komposisi visual anti-slop, hierarki, ritme layout, motion kosmik (Dials: 8/9/3) | Saat menata komposisi scene, hero section, dan koreografi visual |
| `spec-driven-development` | `addyosmani/agent-skills` | Penulisan spesifikasi terstruktur sebelum kode dibuat | Saat merencanakan modul fitur atau menghadapi kebutuhan kompleks |
| `planning-and-task-breakdown` | `addyosmani/agent-skills` | Dekomposisi tugas menjadi unit implementasi kecil teruji | Saat memecah milestone menjadi task harian dengan dependensi & DoD |
| `documentation-and-adrs` | `addyosmani/agent-skills` | Pencatatan keputusan arsitektur dan trade-off teknis | Saat menetapkan atau mengubah arsitektur stack di `docs/19-decisions.md` |
| `performance-optimization` | `addyosmani/agent-skills` | Metodologi profiling performa dan target Core Web Vitals | Saat penyusunan budget dan pengukuran performa (tanpa data fiktif) |
| `web-design-guidelines` | `vercel-labs/agent-skills` | Audit antarmuka terhadap Web Interface Guidelines (WCAG AA) | Saat verifikasi aksesibilitas, fokus keyboard, dan target sentuh 44px |
| `humanizer` | `blader/humanizer` | Perapian naskah dari klise AI tanpa mengubah fakta teknis/ID | Saat menulis bio, deskripsi karya, CTA, dan prose dokumentasi |
| `caveman` | `JuliusBrussee/caveman` | Komunikasi singkat, padat, dan efisien (mode lite, bahasa Indonesia) | Saat pelaporan progres dan interaksi chat rutin dengan pengguna |

### B. Skill Internal Khusus Domain Kosmik (SKL-01 s/d SKL-12)

| ID | Nama Direktori Skill | Pemicu (Trigger Kunci) | Dokumen Rujukan Utama | Batas Tanggung Jawab Kritis |
|---|---|---|---|---|
| **SKL-01** | `plan-cosmic-portfolio` | Perencanaan scope, audit dependensi, evaluasi milestone | `01-prd.md`, `15-plan.md`, `16-tasks.md`, `22-traceability.md` | Dilarang menulis kode sebelum scope dan dependensi task dicatat. |
| **SKL-02** | `design-cosmic-scenes` | Komposisi scene, palet warna, tata cahaya kosmik | `02-art-direction.md`, `03-storyboard.md`, `04-design-system.md` | Dilarang mengubah tema kosmik menjadi template kartu biasa. |
| **SKL-03** | `structure-cosmic-app` | Bootstrap repo, struktur direktori, SSG prerender | `05-architecture.md`, `06-project-structure.md` | Dilarang memasang library baru tanpa pencatatan ADR. |
| **SKL-04** | `build-cosmic-webgl` | Kanvas 3D, planet, starfield, kamera, context loss | `03-storyboard.md`, `05-architecture.md`, `08-assets.md` | Dilarang merender teks bacaan di dalam kanvas WebGL. |
| **SKL-05** | `choreograph-cosmic-scroll` | Timeline GSAP, pinning track, scrub, transisi kamera | `09-motion-system.md`, `10-animation-register.md` | Dilarang mengunci scroll (scroll-jacking) atau manipulasi wheel liar. |
| **SKL-06** | `animate-cosmic-type` | Reveal teks per huruf/baris, isolasi screen reader | `04-design-system.md`, `09-motion-system.md`, `11-responsive-accessibility.md` | Dilarang memecah kata tanpa atribut `aria-label` / `aria-hidden`. |
| **SKL-07** | `build-cosmic-projects` | Kartu proyek, horizontal track, rute studi kasus | `07-content.md`, `10-animation-register.md`, `13-seo-contact-security.md` | Dilarang mengarang hasil atau metrik penjualan palsu. |
| **SKL-08** | `adapt-cosmic-accessibility` | Responsivitas, fokus keyboard, mode Reduced Motion | `11-responsive-accessibility.md`, `17-test-plan.md` | Dilarang menilai aksesibilitas hanya dari skor otomatis. |
| **SKL-09** | `optimize-cosmic-performance` | Kompresi aset, optimasi draw calls, profiling FPS | `08-assets.md`, `12-performance.md` | Dilarang mengklaim FPS tinggi tanpa bukti pengukuran nyata. |
| **SKL-10** | `verify-cosmic-experience` | Pengujian QA, uji regresi, cross-browser check | `17-test-plan.md`, `22-traceability.md` | Dilarang menganggap build pass sebagai bukti kelancaran visual. |
| **SKL-11** | `release-cosmic-portfolio` | Build produksi, staging preview, smoke testing rilis | `13-seo-contact-security.md`, `18-release.md` | Dilarang melakukan rilis jika masih ada isu prioritas P0/P1. |
| **SKL-12** | `handoff-cosmic-work` | Pergantian sesi, batas kuota agen, serah terima task | `16-tasks.md`, `19-decisions.md`, `20-progress.md`, `21-handoff.md` | Dilarang menandai task selesai jika belum diverifikasi. |

---

## 3. Integrasi RTK (Rust Token Killer) untuk Terminal

Untuk menjaga efisiensi pemanggilan alat dan panjang keluaran terminal:
- Binary `rtk.exe` (v0.42.4) terpasang di sistem dan dikonfigurasi melalui aturan workspace `.agents/rules/antigravity-rtk-rules.md`.
- Command shell diproxy menggunakan `rtk` (contoh: `rtk git status`, `rtk npm test`).
- Jika debugging memerlukan log mentah, agen menggunakan `rtk proxy <cmd>` atau command langsung tanpa filter. Exit code dan detail kegagalan selalu dipertahankan.

---

## 4. Protokol Eksekusi Agen Berbasis Skill

Saat agen menerima tugas spesifik:
1. **Identifikasi Skill & Perutean:** Agen mencocokkan kata kunci permintaan dengan tabel perutean pada [`docs/skill-routing.md`](file:///c:/Dev/Portofolio/docs/skill-routing.md).
2. **Karantina Konteks:** Agen hanya membaca berkas `SKILL.md` dan masukan (*input docs*) yang relevan untuk meminimalkan beban token.
3. **Pemeriksaan Kondisi Eksisting:** Agen memeriksa berkas dan konfigurasi terkini sebelum membuat perubahan.
4. **Verifikasi Langkah Demi Langkah:** Setiap perubahan diuji terhadap acceptance criteria spesifik.
5. **Pencatatan Bukti:** Agen memperbarui task di `docs/16-tasks.md` dan catatan transisi di `docs/21-handoff.md`.

