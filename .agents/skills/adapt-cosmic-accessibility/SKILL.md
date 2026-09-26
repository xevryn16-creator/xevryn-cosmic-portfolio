---
name: adapt-cosmic-accessibility
description: SOP adaptasi responsif berbagai ukuran layar, navigasi keyboard, mode Reduced Motion, pembaca layar, dan penanganan kegagalan untuk XEVRYN Cosmic Portfolio. Gunakan saat mengaudit aksesibilitas atau menangani perilaku layar sentuh/mobile.
---

# Skill: adapt-cosmic-accessibility (SKL-08)

## 1. Gambaran Umum & Pemicu (Trigger)
Gunakan skill ini saat:
- Mengadaptasi antarmuka untuk layar ponsel pintar portrait (320px–767px) atau orientasi landscape pendek.
- Mengimplementasikan atau menguji navigasi keyboard, focus-trap, dan cincin fokus berkontras tinggi.
- Mengelola mode aksesibilitas Reduced Motion (`prefers-reduced-motion`) dan sinkronisasi preferensi antarmuka.

## 2. Dokumen Masukan Wajib (Inputs)
- [`docs/11-responsive-accessibility.md`](file:///c:/Dev/Portofolio/docs/11-responsive-accessibility.md) — Matriks breakpoint, aturan coarse/fine pointer, dan matriks kegagalan hardware.
- [`docs/17-test-plan.md`](file:///c:/Dev/Portofolio/docs/17-test-plan.md) — Skenario pengujian aksesibilitas QA-09 s/d QA-15.

## 3. Langkah Kerja Terstruktur
1. **Verifikasi Target Sentuh Mobile:** Pastikan seluruh tombol interaktif, simpul keahlian, dan link navigasi memiliki area klik/sentuh minimal **44×44px** pada layar sentuh.
2. **Pola Mode Reduced Motion:**
   - Deteksi preferensi OS secara otomatis via `window.matchMedia('(prefers-reduced-motion: reduce)')`.
   - Jika aktif, nonaktifkan seluruh pinning scroll, warp tunnel, parallax, dan rotasi 3D.
   - Pastikan teks dan kartu langsung tampil 100% pada posisi finalnya tanpa animasi penundaan.
3. **Uji Navigasi Keyboard Penuh:**
   - Navigasikan seluruh website dari atas ke bawah menggunakan tombol `Tab`.
   - Pastikan outline fokus solid 2px (`--color-accent-blue`) terlihat jelas di atas latar kosmik gelap.
   - Pastikan drawer menu mobile memiliki *focus trap* dan dapat ditutup menggunakan tombol `Escape`.
4. **Validasi Kepatuhan Screen Reader:** Pastikan kanvas 3D latar belakang, partikel bintang, dan garis orbit dekoratif diberi atribut `aria-hidden="true"`.

## 4. Batas Tanggung Jawab (Boundaries)
- **Dilarang Menghilangkan Cincin Fokus:** Dilarang memberi style `outline: none` tanpa menyediakan cincin fokus pengganti yang memenuhi kontras WCAG AA.
- **Dilarang Mengorbankan Konten demi Gerak:** Aksesibilitas dan keterbacaan informasi selalu mengungguli efek visual tambahan.

## 5. Validasi & Kriteria Selesai
- Seluruh antarmuka dapat dioperasikan secara penuh tanpa menggunakan mouse.
- Menyalakan Reduced Motion tidak menyembunyikan konten apa pun dari pandangan pengguna.
