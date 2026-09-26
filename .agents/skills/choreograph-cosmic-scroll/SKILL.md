---
name: choreograph-cosmic-scroll
description: SOP orkestrasi timeline animasi GSAP, scroll pinning, scrubbing, dan transisi kamera antarbab untuk XEVRYN Cosmic Portfolio. Gunakan saat mengimplementasikan atau menyesuaikan pergerakan scroll, pinning, dan kurva easing.
---

# Skill: choreograph-cosmic-scroll (SKL-05)

## 1. Gambaran Umum & Pemicu (Trigger)
Gunakan skill ini saat:
- Membangun atau mengkalibrasi timeline GSAP untuk Hero, About, Warp, Work, Skills, atau Contact.
- Mengatur ScrollTrigger pinning pada jalur karya horizontal (S04) atau transisi antarbab.
- Mengintegrasikan pembaruan progress scroll lokal `p` (0.0–1.0) ke objek state WebGL.

## 2. Dokumen Masukan Wajib (Inputs)
- [`docs/09-motion-system.md`](file:///c:/Dev/Portofolio/docs/09-motion-system.md) — Token durasi, kurva easing, dan arsitektur tiga mode gerak.
- [`docs/10-animation-register.md`](file:///c:/Dev/Portofolio/docs/10-animation-register.md) — Kontrak register lengkap ANM-001 s/d ANM-064.

## 3. Langkah Kerja Terstruktur
1. **Gunakan Scope `gsap.context()`:** Seluruh inisialisasi timeline dan ScrollTrigger wajib berada di dalam `gsap.context((self) => { ... }, scopeRef)`.
2. **Pembersihan Wajib pada Unmount:** Panggil `ctx.revert()` di blok return cleanup `useEffect()` untuk mencegah penumpukan pin ganda atau kebocoran memori.
3. **Patuhi Pemetaan Progress Lokal:** Setiap scene menghitung progress lokal `p` dari `0.0` sampai `1.0`. Dilarang memetakan seluruh efek website ke satu persentase scroll dokumen global.
4. **Hormati Zona Ketenangan Membaca:** Pastikan pergerakan kamera mereda pada zona baca S01 (p: 0.00–0.18), S02 (p: 0.25–0.75), dan saat kartu karya berada di tengah layar.
5. **Debounce Refresh pada Resize:** Tangani perubahan ukuran jendela menggunakan debounced `ScrollTrigger.refresh()`.

## 4. Batas Tanggung Jawab (Boundaries)
- **Dilarang Memasang Library Smooth-Scroll Pihak Ketiga:** Gunakan scroll bawaan peramban (*native scroll*). Dilarang menginstal Lenis atau Locomotive di v1.
- **Dilarang Mengunci Scroll Dokumen:** Dilarang memberi style `overflow: hidden` pada `body` kecuali saat dialog menu modal dibuka.

## 5. Validasi & Kriteria Selesai
- Scroll bolak-balik dari atas ke bawah dan sebaliknya berlangsung mulus tanpa loncatan visual (*jump cuts*).
- Menekan tombol `Home` dan `End` pada keyboard memindahkan halaman secara stabil tanpa ada overlay tersangkut.
