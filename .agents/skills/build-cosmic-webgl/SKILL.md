---
name: build-cosmic-webgl
description: SOP pengembangan adegan 3D WebGL, model planet, pencahayaan atmosfer, partikel bintang, efek warp, dan penanganan context loss untuk XEVRYN Cosmic Portfolio. Gunakan saat memodifikasi Three.js, R3F, shader GLSL, atau CameraRig.
---

# Skill: build-cosmic-webgl (SKL-04)

## 1. Gambaran Umum & Pemicu (Trigger)
Gunakan skill ini saat:
- Membangun atau mengoptimasi komponen kanvas latar belakang (`CosmicCanvas.tsx`).
- Menulis atau menyempurnakan shader GLSL untuk atmosfer planet, nebula, atau warp tunnel.
- Menangani siklus hidup WebGL, error boundary, pemulihan context loss, dan fallback poster.

## 2. Dokumen Masukan Wajib (Inputs)
- [`docs/03-storyboard.md`](file:///c:/Dev/Portofolio/docs/03-storyboard.md) — Posisi kamera, orientasi sudut, dan target pergerakan tiap scene.
- [`docs/05-architecture.md`](file:///c:/Dev/Portofolio/docs/05-architecture.md) — Kontrak render loop tunggal dan pemisahan state ref.
- [`docs/08-assets.md`](file:///c:/Dev/Portofolio/docs/08-assets.md) — Manifest tekstur planet, sprite partikel, dan anggaran VRAM.
- [`docs/12-performance.md`](file:///c:/Dev/Portofolio/docs/12-performance.md) — Anggaran draw calls (≤ 60), poligon (≤ 120k), dan DPR cap (1.5).

## 3. Langkah Kerja Terstruktur
1. **Gunakan Kanvas Latar Belakang Tunggal:** Seluruh objek 3D wajib berada di dalam satu kanvas `<CosmicCanvas />` dengan `position: fixed; inset: 0; pointer-events: none`.
2. **Patuhi Kontrak Ref (No Concurrent Writes):** Komponen R3F hanya membaca target pergerakan kamera dari mutable ref di dalam loop `useFrame()`. Dilarang membiarkan GSAP memanipulasi property Three.js secara langsung.
3. **Optimasi Geometri & Draw Calls:** Gunakan `THREE.InstancedMesh` atau `THREE.Points` untuk partikel bintang dan debu kosmik. Gabungkan material jika memungkinkan untuk menjaga draw calls ≤ 60.
4. **Implementasikan Throttling Tab Tersembunyi:** Hentikan loop rendering saat `document.visibilityState === 'hidden'`.
5. **Uji Degradasi Anggun:** Bungkus kanvas dalam `SceneErrorBoundary`. Pastikan simulasi `webglcontextlost` otomatis mengaktifkan poster cadangan CSS tanpa memicu crash React.

## 4. Batas Tanggung Jawab (Boundaries)
- **Dilarang Merender Teks Bacaan di Canvas:** Seluruh teks narasi, judul, dan link wajib berada di DOM semantik demi keterbacaan dan aksesibilitas.
- **Dilarang Menjalankan Render Loop Ganda:** Dilarang membuat instance `new THREE.WebGLRenderer()` tambahan di luar pohon komponen R3F resmi.

## 5. Validasi & Kriteria Selesai
- Scene 3D berhasil merender planet, rim light, dan bintang pada target 60 FPS desktop / 30 FPS mobile.
- Total draw calls pada scene terberat tidak melebihi 60 calls.
- Simulasi context loss via DevTools berhasil memicu poster fallback tanpa galat di konsol.
