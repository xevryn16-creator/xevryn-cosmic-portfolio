# XEVRYN Cosmic Portfolio — Master Plan

Versi 1.0 · 21 September 2026 · Bahasa kerja: Indonesia

Status: blueprint implementasi. Website, aset final, hasil pengujian, dan skill terpasang belum dibuat. Semua angka gerak dan anggaran performa merupakan target awal yang harus dikalibrasi di perangkat nyata. Dokumen ini merancang scope selengkap mungkin untuk kebutuhan yang disepakati; temuan implementasi dicatat sebagai perubahan, bukan disembunyikan.

## Daftar isi

1. Brief, batas scope, dan keputusan
2. Sistem dokumen Markdown
3. Pengalaman halaman dan storyboard
4. Design system
5. Arsitektur dan struktur proyek
6. Konten, aset, dan lisensi
7. Kontrak sistem animasi
8. Register animasi
9. Responsif, aksesibilitas, dan fallback
10. Performa dan loading
11. Sistem skill agen
12. Rencana pengerjaan dan task register
13. Pengujian dan bukti
14. SEO, kontak, keamanan, dan rilis
15. Risiko dan keputusan terbuka
16. Handoff dan prompt eksekusi
17. Checklist selesai
18. Referensi teknis

## 1. Brief, batas scope, dan keputusan

### 1.1 Hasil yang ingin dicapai

Bangun portofolio personal XEVRYN dengan tema alam semesta. Pengunjung mengenali pemiliknya, memahami bidang kerja, melihat bukti karya, dan menemukan kontak. Pengalaman visual berupa perjalanan kamera dari orbit planet menuju ruang angkasa dalam, lalu berakhir di horizon planet.

Keinginan yang sudah disepakati:

- Gaya premium, sinematik, bertema alam semesta.
- Parallax berlapis dengan kecepatan foreground, midground, dan background berbeda.
- Animasi teks per huruf untuk judul, per baris untuk paragraf.
- Transisi antarbab terhubung; terdapat satu momen warp sebagai puncak visual.
- Planet 3D, bintang, debu kosmik, nebula, dan konstelasi skill.
- Project showcase yang besar, jelas, dan dapat dibuka.
- Hampir setiap elemen mempunyai perilaku masuk, interaksi, atau gerak lingkungan. Elemen tidak harus bergerak terus.
- Versi mobile dirancang tersendiri dan tetap memiliki karakter visual yang sama.

### 1.2 Audiens dan aksi utama

Audiens: calon kolaborator, recruiter, calon klien, dan orang yang ingin melihat karya. Aksi utama: membuka studi kasus project. Aksi kedua: menghubungi pemilik. Navigasi wajib dapat langsung menuju About, Work, Skills, dan Contact tanpa menonton seluruh perjalanan.

Ukuran keberhasilan rilis: semua CTA benar, karya asli tampil, semua konten dapat dibaca tanpa animasi, tidak ada scroll terkunci, dan kualitas visual/performa memenuhi gate yang dicatat. Pengukuran klik setelah rilis bersifat opsional; jangan mengklaim peningkatan conversion sebelum ada data.

### 1.3 Scope v1

| Area | Keputusan |
|---|---|
| Identitas | Brand XEVRYN; nama publik, jabatan, bio, dan link wajib dikonfirmasi dari materi pemilik saat implementasi |
| Bahasa UI | Draft awal bahasa Indonesia; label singkat Work/About dapat dipakai konsisten; bilingual ditunda |
| Halaman | Home `/`, studi kasus `/work/:slug/`, halaman 404 |
| Home | Hero, About, Work, Skills, Contact; Warp merupakan transisi About → Work |
| Project | Layout dirancang untuk 3 karya pilihan; dukung jumlah 1–6 dari data |
| Kontak | Email/social link terverifikasi; form server ditunda |
| CV | Link unduh hanya muncul jika file CV final tersedia |
| Backend | Tidak dibutuhkan untuk v1 berbasis konten lokal |
| CMS, login, dashboard | Di luar v1 |
| Audio | Tidak digunakan di v1; tidak ada autoplay |
| Animasi | Full, Lite, dan Reduced; pilihan pengguna tersedia |
| Aset | Planet prosedural/berlisensi, screenshot asli project, foto milik pemilik bila disediakan |
| Publikasi | Dilakukan pada tahap rilis setelah implementasi dan gate; dokumen ini sendiri tidak memublikasikan website |

### 1.4 Ketentuan kualitas

Tidak membuat angka pengalaman, jumlah klien, testimonial, gelar, skill level, atau hasil bisnis yang belum diberikan. Jangan menyajikan demo konseptual sebagai pekerjaan klien. Tidak menggunakan screenshot palsu untuk karya nyata. Tidak ada progress loading palsu. Hindari teks panjang yang seluruhnya dipecah menjadi karakter, scroll-jacking, cursor bawaan disembunyikan, flashes, dan efek yang menghalangi klik.

Prioritas saat ada konflik: kebenaran konten → akses dan fungsi → keterbacaan → kelancaran → tambahan efek. Perubahan visual besar dicatat dalam keputusan; jangan diam-diam menghapus tema atau mengurangi seluruh website menjadi template kartu biasa.

## 2. Sistem dokumen Markdown

Dokumen ini menjadi sumber awal. Saat proyek dimulai, pecah bagian relevan ke berkas berikut. Jangan mempertahankan dua salinan spesifikasi yang sama: setelah dipindah, master hanya menjadi indeks/ringkasan. Status awal seluruh berkas di bawah adalah planned.

| Berkas yang direncanakan | Isi wajib dan tanggung jawab |
|---|---|
| `README.md` | Tujuan, cara menjalankan, command yang benar-benar ada, persyaratan runtime, tautan docs |
| `AGENTS.md` | Aturan agen, urutan baca, pembatas scope, validasi, handoff; tetap tunduk pada instruksi platform |
| `docs/00-index.md` | Peta dokumen, sumber kebenaran setiap topik, status versi |
| `docs/01-prd.md` | Brief, audiens, scope, requirement REQ, acceptance produk |
| `docs/02-art-direction.md` | Komposisi, warna, pencahayaan, referensi berlisensi, anti-pattern |
| `docs/03-storyboard.md` | Setiap scene, keadaan masuk/tahan/keluar, kamera, mobile |
| `docs/04-design-system.md` | Token warna, type, space, grid, layer, komponen dan state |
| `docs/05-architecture.md` | Stack terpilih, rendering, data flow, ownership animasi, fallback |
| `docs/06-project-structure.md` | Peta file dan batas tanggung jawab komponen |
| `docs/07-content.md` | Copy, identitas, data project, field belum lengkap, persetujuan pemilik |
| `docs/08-assets.md` | Manifest aset, ukuran, dimensi, lisensi, sumber dan fallback |
| `docs/09-motion-system.md` | Timeline, easing, scrub, lifecycle, refresh dan mode |
| `docs/10-animation-register.md` | ANM-001–064; state implementasi dan bukti per efek |
| `docs/11-responsive-accessibility.md` | Matriks viewport/input, keyboard, screen reader, reduced motion |
| `docs/12-performance.md` | Budget, kondisi profiling, hasil, exception dan tindakan |
| `docs/13-seo-contact-security.md` | Metadata, route, kontak, privacy, header, dependency audit |
| `docs/14-skill-system.md` | Kontrak SKL, trigger, input, output, validasi dan scope |
| `docs/15-plan.md` | Fase, dependensi, milestone, gate dan jalur kritis |
| `docs/16-tasks.md` | TSK register, status, bukti, blocker, owner |
| `docs/17-test-plan.md` | Test scenario, browser, perangkat dan severity |
| `docs/18-release.md` | Preview, rilis, smoke test, rollback, operasi |
| `docs/19-decisions.md` | ADR: konteks, pilihan, alasan, konsekuensi, tanggal |
| `docs/20-progress.md` | Ringkasan sesi yang selesai dan pekerjaan berikutnya |
| `docs/21-handoff.md` | Kondisi repo, task aktif, commands, known issues, next action |
| `docs/22-traceability.md` | REQ → scene → ANM → task → bukti QA |

Aturan pencatatan: gunakan `todo`, `in_progress`, `blocked`, `done`, `deferred`. Maksimal satu task aktif per agen. `done` memerlukan file hasil dan bukti acceptance. `deferred` harus punya alasan serta dampak; requirement wajib tidak boleh ditunda diam-diam. Jangan menandai cek browser sukses dari hasil build saja.

Requirement utama:

| ID | Requirement | Validasi |
|---|---|---|
| REQ-01 | Identitas dan CTA terlihat segera | First paint, no-JS, layar kecil |
| REQ-02 | Tema kosmik konsisten | Review tiap scene dan detail project |
| REQ-03 | Parallax berlapis | Rekaman scroll maju/mundur |
| REQ-04 | Kamera dan transisi sinematik | Boundary tiap scene, fast scroll |
| REQ-05 | Tipografi bergerak dan tetap terbaca | Font load, resize, pembaca layar |
| REQ-06 | Karya dapat dibaca/dibuka | Mouse, touch, keyboard, direct route |
| REQ-07 | Skill didukung contoh nyata | Review konten dan interaksi konstelasi |
| REQ-08 | Kontak bekerja | Verifikasi tujuan tautan dan fallback |
| REQ-09 | Mobile tetap fungsional dan visual | Perangkat touch nyata |
| REQ-10 | Reduced motion dan fallback lengkap | OS reduce, WebGL gagal, JS off |
| REQ-11 | Performa terukur | Build report, trace, perangkat baseline |
| REQ-12 | Handoff dapat dilanjutkan | Task/dependency/evidence konsisten |

## 3. Pengalaman halaman dan storyboard

### 3.1 Struktur narasi

Urutan: Orbit → Perkenalan → Warp → Destinasi karya → Konstelasi keahlian → Horizon kontak. Section HTML tetap berada dalam urutan baca normal. Satu canvas dekoratif mengisi latar home; konten dan CTA berada di DOM. Header selalu menyediakan jalan pintas.

Angka panjang scroll berikut adalah titik mulai desain untuk desktop Full, termasuk ruang pin. Jangan menambahkan spacer dengan tinggi yang sama di luar pin. Mobile memakai aliran dokumen biasa; pertumbuhan konten lebih utama daripada angka tinggi.

| Scene | Komposisi dan konten | Durasi ruang desktop | Keadaan masuk → tahan → keluar |
|---|---|---|---|
| S01 Orbit | XEVRYN, deskripsi peran singkat, CTA Lihat karya/Kontak, planet di kanan bawah | 160–180svh total | Huruf terbentuk → nama utuh dapat dibaca → planet membesar dan nama naik |
| S02 About | Bio ringkas 60–100 kata, foto opsional, fokus kerja | Minimum 110svh; memanjang sesuai teks | Teks per baris → ruang baca stabil → planet keluar kiri dan nebula menggelap |
| S03 Warp | Jembatan dekoratif, tanpa informasi wajib | Maksimum 50–70svh | Bintang memanjang → kamera maju → streak mereda; tidak ada kilat putih |
| S04 Work | Judul dan 1–6 karya, default rancangan 3; preview dominan | Sesuai lebar track terukur | Kartu pertama → tiap karya aktif → track selesai sebelum pin dilepas |
| S05 Skills | Daftar skill semantik dengan hubungan ke project | Minimum 100svh | Titik muncul → garis terhubung → pilihan skill menampilkan bukti |
| S06 Contact | Ajakan kerja sama, email, social, footer | Minimum 90svh | Horizon muncul → judul dan kontak → latar tetap tenang |

### 3.2 Pembagian progress lokal

Gunakan progress masing-masing scene `p` dalam rentang 0–1. Jangan memetakan semua efek ke satu persentase seluruh dokumen; panjang konten dan jumlah karya akan berubah.

- S01: 0–0.18 keadaan hero stabil; 0.18–0.70 kamera mendekat; 0.70–1 nama keluar dan handoff ke About. Intro berbasis waktu terpisah dari scroll; bila pengguna langsung scroll, intro selesai dan menyerahkan transform ke timeline scroll.
- S02: 0–0.25 reveal; 0.25–0.75 ruang baca; 0.75–1 handoff lingkungan. Bio tidak dihilangkan sebelum pembaca bisa melihatnya utuh.
- S03: 0–0.25 akselerasi; 0.25–0.65 streak memanjang; 0.65–1 deselerasi dan reset. Reverse mengikuti progress tanpa burst tambahan.
- S04: progress mengontrol translate track antara 0 dan `-(scrollWidth-clientWidth)`. Jika jarak nol, tidak pin. Kartu aktif dipilih berdasarkan pusat viewport, bukan jumlah scroll tetap per kartu.
- S05: 0–0.35 node/garis masuk; 0.35–1 konten stabil. Hover dan focus memakai state lokal, tidak menggerakkan kamera utama.
- S06: 0–0.35 horizon masuk; 0.35–1 kontak stabil. Footer selalu dapat dijangkau dengan End dan keyboard.

### 3.3 Detail studi kasus

Halaman detail mempertahankan latar kosmik yang lebih tenang. Struktur: judul, ringkasan, peran, tahun bila benar, tujuan, tantangan, proses, keputusan teknis/desain, galeri, hasil yang dapat dibuktikan, link live/repository bila tersedia, dan tombol kembali. Jangan membuat hasil numerik jika tidak ada.

Jika data belum tersedia, gunakan draft internal berlabel; jangan merilis studi kasus kosong. Route yang tidak dikenal menampilkan 404 yang jelas. Navigasi Back mengembalikan posisi dan kartu sebelumnya tanpa mengulang intro. Direct load halaman detail tetap memiliki metadata, heading dan gambar tanpa perlu mengunjungi home terlebih dahulu.

## 4. Design system

### 4.1 Token visual

| Token | Nilai awal | Pemakaian |
|---|---|---|
| `color.space` | `#050711` | Background utama |
| `color.surface` | `#101626` | Panel kecil, menu, fallback |
| `color.text` | `#F2F3F7` | Teks utama |
| `color.muted` | `#AAB4CA` | Deskripsi sekunder; ukur kontras final |
| `color.blue` | `#6B9FFF` | Link/aksen; cek kontras tiap background |
| `color.nebula` | `#8A6BDA` | Cahaya dekoratif |
| `color.line` | `#33405B` | Garis dan divider |
| `space` | 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px | Spacing konsisten |
| `radius` | 8px kontrol, 16px preview | Bentuk sederhana; hindari semua elemen jadi pill |
| `content.max` | 1440px | Batas konten di ultrawide |
| `gutter` | 20px mobile, 32px tablet, 64px desktop | Padding tepi + safe area |
| `z-layer` | background 0, content 10, nav 30, menu 50, notice 60 | Hindari z-index acak |

Planet: permukaan gelap, satu arah cahaya utama, rim light kebiruan, atmosfer tipis. Nebula hanya menambah kedalaman. Teks tidak ditumpuk di atas area bintang yang paling terang. Efek grain opsional sangat halus dan tidak dianimasikan terus.

### 4.2 Tipografi

Pilih satu keluarga sans variable berlisensi untuk heading dan body; satu mono opsional hanya untuk label kecil. Catat nama final dan lisensinya pada manifest. Font fallback harus cukup dekat metriknya. Jangan mengambil font berbayar tanpa lisensi.

- Hero desktop: `clamp(64px, 13vw, 192px)`; mobile: `clamp(48px, 15vw, 88px)`; uji nama tidak terpotong.
- H2: `clamp(36px, 6vw, 88px)`; H3: 24–36px.
- Body: 16–20px, line-height 1.5–1.7, lebar 55–68 karakter.
- Label: 12–14px, letter-spacing tipis. Jangan menggunakan label kecil untuk informasi penting.
- Satu H1 per halaman. Teks yang dipisah animasi tetap satu kalimat dalam accessibility tree.

### 4.3 Komponen dan state wajib

Header: default, scrolled, menu terbuka, keyboard focus. Button/link: default, hover, focus-visible, active; disabled hanya jika fungsinya memang tidak tersedia. Project card: default, active, hover/focus, loading image, image failed. Motion control: Full/Lite/Reduced, nilai tersimpan jika storage tersedia. Toast copy-email: success/error dengan status terbaca. Menu mobile: fokus terkelola, Escape menutup, fokus kembali ke tombol pembuka.

Kontrol preferensi dapat tampil sebagai tombol kecil “Animasi”. Jangan menampilkan FPS, GPU, nama shader, atau istilah implementasi pada UI publik. Tidak ada cursor custom wajib; efek pointer bersifat tambahan.

## 5. Arsitektur dan struktur proyek

### 5.1 Pilihan teknis awal

Rancangan default: React + TypeScript + Vite, CSS token/global + stylesheet komponen, GSAP untuk timeline DOM/scroll, Three.js melalui React Three Fiber untuk scene. Prerender konten home dan studi kasus merupakan requirement SEO/no-JS; pilih integrasi build yang kompatibel saat spike awal. Versi pasti ditetapkan setelah mengecek dokumentasi resmi, peer dependencies, runtime dan hosting; simpan lockfile. Jangan mengunci versi dari ingatan.

GSAP mengelola scroll, teks, dan transisi DOM. React Three Fiber memiliki render loop canvas. GSAP hanya mengubah target numerik/ref scene; `useFrame` membaca target tersebut. Jangan menjalankan dua render loop Three atau dua library yang menulis transform yang sama. Motion/Framer Motion dan smooth-scroll tambahan tidak masuk default v1. Native scroll digunakan terlebih dahulu.

Jika prerender Vite tidak dapat dibuktikan pada spike, catat ADR dan pilih framework yang mendukung render HTML statis sebelum implementasi scene. Jangan menunda keputusan ini sampai akhir, karena direct route dan no-JS bergantung padanya. Jika lingkungan deployment mewajibkan scaffold tertentu, pertahankan kontrak dokumen dan adaptasikan struktur; jangan membuat dua proyek.

### 5.2 Struktur target

```text
xevryn-cosmic/
  README.md
  AGENTS.md
  package.json
  package-lock.json
  tsconfig.json
  vite.config.ts
  index.html
  docs/                         # manifest pada bagian 2
  public/
    fonts/
    images/                     # poster fallback, screenshot, portrait
    textures/                   # tekstur terkompresi sesuai pipeline
    models/                     # hanya jika planet prosedural tidak cukup
    social/                     # og image dan favicon
    cv/                         # hanya jika CV tersedia
    robots.txt
  src/
    app/
      App.tsx
      routes.tsx
      providers/MotionProvider.tsx
      providers/SceneProvider.tsx
    pages/
      HomePage.tsx
      ProjectPage.tsx
      NotFoundPage.tsx
    components/
      layout/{Header,MobileMenu,Footer,SkipLink}.tsx
      ui/{Button,MotionControl,CopyEmail,ImageWithFallback}.tsx
      motion/{AnimatedHeading,AnimatedLines,RevealGroup}.tsx
      projects/{ProjectCard,ProjectTrack,ProjectGallery}.tsx
    sections/{Hero,About,Work,Skills,Contact}.tsx
    scene/
      CosmicCanvas.tsx
      SceneErrorBoundary.tsx
      CameraRig.tsx
      Planet.tsx
      Starfield.tsx
      Nebula.tsx
      Warp.tsx
      Horizon.tsx
      shaders/
    animation/
      register.ts
      tokens.ts
      scene-config.ts
      hero.timeline.ts
      about.timeline.ts
      warp.timeline.ts
      work.timeline.ts
      skills.timeline.ts
      contact.timeline.ts
    hooks/
      useMotionPreferences.ts
      useSceneProgress.ts
      usePageVisibility.ts
      useCapabilityTier.ts
      useScrollRestoration.ts
    content/{profile,projects,skills,links}.ts
    types/{content,motion}.ts
    styles/{tokens,global,typography,components}.css
    lib/{assets,metadata,validation}.ts
  scripts/                      # buat hanya jika dipakai berulang
  tests/{unit,e2e}/
  evidence/                     # hasil verifikasi, bukan aset runtime
```

Notasi `{...}` berarti berkas terpisah. Struktur ini rencana, bukan klaim file sudah tersedia.

### 5.3 Aliran data dan state

Konten typed → halaman HTML/React → section semantic. Ukuran section → ScrollTrigger → progress lokal → target kamera/material. Motion preference + kemampuan perangkat → effective motion profile → konfigurasi timeline dan scene. Route menentukan apakah cosmic scene dimount; halaman detail memakai poster atau scene sangat ringan.

State React hanya untuk pilihan UI, route, menu, skill aktif, dan status loading/failure. Posisi kamera, pointer dan progress per frame disimpan dalam ref/nilai mutable; jangan memicu render React tiap frame.

### 5.4 Kontrak lifecycle

Setiap scene/timeline memiliki `setup`, `update target`, dan `cleanup`. Cleanup me-revert GSAP context, membuang listener/observer, mematikan ticker callback miliknya, mengembalikan split text, dan melepas resource GPU yang benar-benar dimiliki. Resource bersama dilepas setelah pemakai terakhir selesai. Tidak menggunakan global kill untuk menghapus animasi komponen lain.

Setelah font siap, gambar berdimensi stabil, perubahan breakpoint, atau perubahan track: batch satu refresh pengukuran. Hindari refresh di setiap frame atau resize callback yang berulang tanpa debounce. React development double-mount harus tidak menghasilkan duplikasi pin/listener.

## 6. Konten, aset, dan lisensi

### 6.1 Data yang disiapkan

| Entitas | Field minimum | Aturan |
|---|---|---|
| Profile | publicName, brand, headline, bio, portrait? | Gunakan identitas yang pemilik setujui untuk publik |
| Project | id, slug, title, summary, role, tags, cover, gallery, problem, approach, outcome, links | Slug unik; link opsional tidak menjadi tombol kosong |
| Skill | id, label, category, description, projectIds | Referensi harus menunjuk project yang ada; tanpa persen kemampuan fiktif |
| Link | label, url, kind | Validasi protokol dan tujuan |
| Asset | id, localPath, purpose, width, height, bytes, source, license, author, attribution, status, fallback | Aset tanpa asal/lisensi tetap blocked |

Bio, email, URL akun, foto, CV, screenshot, dan studi kasus belum diberikan dalam percakapan ini. Semua ditandai `CONTENT_PENDING` di data kerja; placeholder tidak boleh menjadi fakta publik. Agen boleh menyelesaikan layout dengan placeholder internal tanpa menghentikan seluruh proyek.

### 6.2 Manifest aset target

| ID | Aset | Spesifikasi awal | Fallback |
|---|---|---|---|
| AST-01 | Poster hero desktop | AVIF/WebP, ~1920px lebar, target ≤300KB | Gradient kosmik CSS |
| AST-02 | Poster hero mobile | 900–1200px tinggi, target ≤180KB | Gradient CSS |
| AST-03 | Tekstur planet | 1K Lite / 2K Full; periksa lisensi | Planet prosedural |
| AST-04 | Nebula | Transparansi bila perlu, target ≤180KB | Gradient statis |
| AST-05 | Star sprite | Kecil, satu atlas jika perlu | Titik prosedural |
| AST-06 | Foto pemilik | Opsional, crop desktop/mobile, target ≤180KB | Layout About tanpa foto |
| AST-07 | Cover karya | Per project, ~1280px, target ≤180KB | Panel judul karya |
| AST-08 | Galeri karya | Lazy load, ukuran sesuai viewport | Alt text dan placeholder |
| AST-09 | Font utama | WOFF2 subset yang mencakup konten, target total ≤140KB | System sans |
| AST-10 | OG image | 1200×630, identitas dan komposisi kosmik | OG statis standar |
| AST-11 | Favicon | SVG + fallback yang diperlukan | Huruf X sederhana |
| AST-12 | CV | PDF final dari pemilik, nama file jelas | Hilangkan tombol |

Ukuran adalah anggaran internal, bukan ukuran aset yang sudah ada. Jangan mengunduh aset acak lalu mengasumsikan bebas dipakai. Bila menghasilkan gambar AI untuk poster, simpan catatan asal serta konsistensi visual; jangan menjadikannya screenshot project. Semua referensi visual final dicatat dengan sumber dan lisensi; moodboard belum disediakan.

## 7. Kontrak sistem animasi

### 7.1 Token gerak

| Token | Nilai awal |
|---|---|
| Micro | 140–220ms, ease-out |
| Reveal | 550–900ms, power2.out atau padanan |
| Hero intro | Maksimum 1.4 detik; konten/CTA dapat dipakai sejak awal |
| Stagger huruf | 20–35ms; total reveal dibatasi agar judul panjang tidak lambat |
| Stagger baris | 80–120ms |
| Scrub | Progress linear; smoothing maksimum sekitar 0.35s hanya jika nyaman |
| Tilt | Maksimum 3–4° desktop pointer fine |
| Magnetic button | Maksimum perpindahan 6px; area klik tidak ikut menyempit |
| Parallax awal | Jauh 0.04, tengah 0.12, dekat 0.24 × travel; clamp tiap scene |
| Loop ambient | Rotasi planet 120–240s; nebula 40–80s; jeda saat tab tersembunyi |

### 7.2 Ownership dan komposisi

Satu property pada satu elemen hanya ditulis satu pemilik. Pisahkan wrapper scroll, wrapper reveal, dan inner hover jika gerak bertumpuk. Kamera mempunyai target dasar dari scene; pointer memberi offset terbatas pada rig anak. Jangan menambahkan smoothing dua kali yang membuat kamera tertinggal dari scroll.

Judul: pecah huruf setelah font siap, pertahankan nama aksesibel lengkap, wrapper dekoratif disembunyikan dari pembaca layar sesuai struktur yang dipilih. Paragraf: split per baris dengan reflow pada resize. Link di dalam paragraf tetap dapat difokuskan; jangan menyembunyikan link dari accessibility tree demi split text. Teks final terlihat secara default; mode enhanced hanya menyembunyikan bagian yang animasinya sudah siap.

### 7.3 Mode dan prioritas

`Full`: seluruh efek yang lulus performa. `Lite`: gerak teks tetap ada, parallax kecil, partikel rendah, tanpa bloom/warp agresif. `Reduced`: konten langsung terlihat, tanpa pin dekoratif, kamera bergerak, parallax, tilt, atau ambient loop; feedback warna/opacity singkat masih boleh.

OS reduced motion langsung berlaku dan tidak boleh diam-diam dinaikkan oleh mode Auto/Full tersimpan. Kontrol publik menyediakan pengurangan efek tambahan. WebGL gagal → fallback poster dengan konten DOM tetap utuh. Quality tier menentukan detail grafis; motion mode menentukan jenis gerakan. Keduanya tidak boleh dicampur sehingga pengurangan kualitas tiba-tiba mengubah posisi scroll.

### 7.4 Semantik register berikut

`R` = reversible oleh progress; `E` = reveal sekali per mount halaman, reset pada navigasi baru; `L` = ambient loop yang dapat dijeda; `I` = interaksi yang kembali ke idle. Semua efek dibatalkan/revert pada unmount atau pergantian mode. Reduced default = keadaan final/statis, kecuali feedback interaksi esensial yang memakai warna atau opacity ≤120ms. Nilai dalam register adalah spesifikasi awal untuk tuning.

## 8. Register animasi

| ID | Area / efek | Pemicu dan gerak Full | Jenis | Mobile/Lite | Kriteria cek |
|---|---|---|---|---|---|
| ANM-001 | Global: Poster → canvas | Canvas siap; opacity 0→1, 450ms | E | Crossfade 250ms | Poster tetap ada sampai frame pertama berhasil |
| ANM-002 | Global: Bintang jauh | Scroll scene; offset maks 20px | R | 8px | Lapisan jauh bergerak paling pelan |
| ANM-003 | Global: Bintang tengah | Scroll scene; offset maks 60px | R | 20px | Tidak melewati teks terang berlebihan |
| ANM-004 | Global: Debu foreground | Scroll scene; offset maks 120px | R | Off | Tidak menangkap pointer |
| ANM-005 | Global: Nebula drift | Ambient 60s, translasi 2% | L | Statis | Jeda tab hidden dan Reduced |
| ANM-006 | Global: Planet rotation | Ambient 180s per putaran | L | 240s/Lite | Tidak reset mendadak antar scene |
| ANM-007 | Global: Pointer depth | Pointer fine; rig offset maks 2° | I | Off | Kembali netral pointerleave |
| ANM-008 | Global: Header masuk | Ready; y -12→0, opacity, 350ms | E | 250ms | Header tetap aksesibel selama intro |
| ANM-009 | Global: Header scrolled | Scroll >40px; background 180ms | I | Sama | Kontras menu selalu cukup |
| ANM-010 | Global: Nav underline | Hover/focus; scaleX 0→1, 160ms | I | Focus/active | Tidak bergantung hover |
| ANM-011 | Global: Menu mobile | Klik; panel opacity/y 12px, 220ms | I | Utama | Escape/focus return bekerja |
| ANM-012 | Global: Progress perjalanan | Scroll terukur; scaleX 0→1 | R | Opsional | Dekoratif; tidak spam aria-live |
| ANM-013 | Hero: XEVRYN per huruf | Intro; y 100%→0, stagger 30ms | E | Stagger 20ms | Nama utuh terbaca ≤1.4s |
| ANM-014 | Hero: Blur huruf | Intro; blur 6→0px, 650ms | E | Off | Blur tidak pada seluruh viewport |
| ANM-015 | Hero: Label peran | Intro +180ms; y 12px, 450ms | E | 300ms | Tidak overlap nama |
| ANM-016 | Hero: CTA group | Intro +250ms; opacity/y 10px, 350ms | E | 250ms | Bisa ditekan sebelum animasi selesai |
| ANM-017 | Hero: Rim planet | Intro; intensitas 0.3→1, 900ms | E | Poster/crossfade | Tidak overexposure |
| ANM-018 | Hero: Orbit line | Masuk; stroke dash offset, 900ms | E | Off | Garis dekoratif aria-hidden |
| ANM-019 | Hero: Scroll cue | Ambient y 4px, 2s; berhenti setelah scroll | L | Sama singkat | Bukan satu-satunya navigasi |
| ANM-020 | Hero: Nama keluar | S01 p .18–.8; y -18vh, opacity 1→0 | R | Y -30px | Tidak hilang pada first paint |
| ANM-021 | Hero: Planet approach | S01 p .18–1; framing radius 1→1.3 | R | 1→1.08 | Tidak menutup CTA |
| ANM-022 | Hero: Handoff About | S01 p .7–1; rig bergeser ke kiri | R | Crossfade | Boundary maju/mundur tidak meloncat |
| ANM-023 | About: Judul masuk | Enter; mask per kata, 650ms | E | 450ms | Line wrap aman |
| ANM-024 | About: Bio per baris | Enter; y 18px, stagger 100ms | E | Y 10px | Semua isi tetap dapat disalin |
| ANM-025 | About: Penekanan teks | S02 p .1–.5; warna muted→text | R | Warna final | Kontras awal tetap terbaca |
| ANM-026 | About: Foto reveal | Enter; opacity dan scale 1.04→1, 700ms | E | Opacity | Skip jika foto tidak tersedia |
| ANM-027 | About: Foto parallax | Scroll; y 24→-24px | R | Off | Crop tidak memotong wajah penting |
| ANM-028 | About: Detail label | Enter; stagger 70ms | E | Stagger 40ms | Hanya data nyata |
| ANM-029 | About: Orbit background | S02; rotasi parsial 12° | R | Off | Teks tetap stabil |
| ANM-030 | About: Nebula exit | S02 p .75–1; opacity turun | R | Crossfade | Tidak menjadi layar kosong |
| ANM-031 | Warp: Streak onset | S03 p 0–.25; panjang bintang 1→4 | R | Crossfade | Tanpa flash putih |
| ANM-032 | Warp: Camera forward | S03 p .1–.65; dolly ke preset berikut | R | Off | Konten tidak dipaksa menunggu |
| ANM-033 | Warp: Tunnel peak | S03 p .25–.65; streak maks 8 | R | Off | Satu puncak saja |
| ANM-034 | Warp: Warp recovery | S03 p .65–1; streak 8→1 | R | Crossfade | Reset saat fast scroll melewati scene |
| ANM-035 | Work: Judul showcase | Enter; per huruf 22ms, mask 650ms | E | Per kata | Judul tetap satu H2 |
| ANM-036 | Work: Track horizontal | S04; x 0→-overflowWidth | R | Stack vertikal | Pin hanya overflow dan layar lebar |
| ANM-037 | Work: Kartu aktif | Pusat viewport; scale .96→1, 250ms | I | Statis | Layout width tidak berubah |
| ANM-038 | Work: Cover reveal | Kartu terlihat; opacity/scale 1.03→1 | E | Opacity | Tidak menunda gambar penting |
| ANM-039 | Work: Metadata kartu | Kartu terlihat; y 10px, 350ms | E | 250ms | Tidak terlalu lama setelah cover |
| ANM-040 | Work: Kartu depth | Fine pointer; tilt maksimum 3° | I | Off | Focus keyboard tidak perlu tilt |
| ANM-041 | Work: Cover zoom | Hover; scale 1→1.035, 300ms | I | Off | Overflow terpotong di wrapper |
| ANM-042 | Work: Link detail | Hover/focus; panah x 4px, 160ms | I | Active | Label link eksplisit |
| ANM-043 | Work: Index project | Kartu aktif; opacity angka 160ms | I | Index statis | Angka mengikuti kartu benar |
| ANM-044 | Work: Pin release | Akhir overflow; posisi natural | R | Tidak pin | Tidak ada ruang kosong ekstra |
| ANM-045 | Skills: Judul skill | Enter; per kata, 600ms | E | 400ms | Tidak memecah link |
| ANM-046 | Skills: Node reveal | Enter; scale .8→1, stagger 70ms | E | List reveal | Target klik minimal 44px desain |
| ANM-047 | Skills: Garis konstelasi | Enter; stroke dash 900ms | E | Statis/Off | Tidak menyampaikan informasi sendirian |
| ANM-048 | Skills: Node hover/focus | Interaction; glow opacity 180ms | I | Tap/focus | Ada indikator selain warna |
| ANM-049 | Skills: Skill detail | Select; panel crossfade 180ms | I | Sama | Panel tetap dapat dibaca dan ditutup |
| ANM-050 | Skills: Bukti project | Pilih skill; highlight link terkait 180ms | I | Sama | Relasi berasal dari projectIds |
| ANM-051 | Skills: Constellation drift | Ambient rotasi maks 1°, 18s | L | Off | Tidak menggerakkan hit target |
| ANM-052 | Skills: Exit environment | S05 akhir; nebula→horizon blend | R | Crossfade | Tidak menghilangkan skill saat focus |
| ANM-053 | Contact: Horizon rise | S06 p 0–.35; y 40→0px | R | Y 12px | Kontak tetap punya kontras |
| ANM-054 | Contact: Judul penutup | Enter; per huruf 22ms, 700ms | E | Per kata | Kalimat tidak terlalu panjang |
| ANM-055 | Contact: Email reveal | Enter +120ms; opacity/y 8px | E | Opacity | Email asli atau sembunyikan draft |
| ANM-056 | Contact: Magnetic CTA | Fine pointer; x/y maksimum 6px | I | Off | Hitbox tetap dan focus stabil |
| ANM-057 | Contact: Copy feedback | Copy result; status opacity 120ms | I | Sama | Success hanya setelah clipboard berhasil |
| ANM-058 | Contact: Social underline | Hover/focus; scaleX 160ms | I | Focus | Link tujuan terverifikasi |
| ANM-059 | Contact: Footer reveal | Enter; opacity 250ms | E | Opacity | Tahun/status tidak dibuat fiktif |
| ANM-060 | Contact: Back to top | Klik; scroll native smooth bila Full | I | Auto pada Reduced | Fokus menuju heading/anchor tepat |
| ANM-061 | Detail: Page enter | Route siap; opacity/y 12px, 350ms | E | Opacity | Tidak menghalangi direct load |
| ANM-062 | Detail: Gallery reveal | Enter; opacity 300ms | E | Opacity | Dimensi tetap mencegah layout shift |
| ANM-063 | Global: Motion mode change | Pilihan; revert → rebuild → posisi stabil | I | Sama | Tidak ada pin lama tertinggal |
| ANM-064 | Global: Failure transition | WebGL loss/error; canvas→poster 200ms | I | Sama | DOM, nav, CTA tetap aktif |

Setiap baris mendapat field tambahan saat implementasi: owner component, source path, requirement, task, mode Reduced, status, evidence path, known limitation. Register ini berisi target; belum ada efek yang berstatus implemented. Global → TSK-031; Hero → TSK-032; About → TSK-033; Warp → TSK-034; Work → TSK-035; Skills → TSK-036; Contact → TSK-037; Detail → TSK-038. ANM-063/064 juga wajib diverifikasi pada TSK-040/047.

## 9. Responsif, aksesibilitas, dan fallback

### 9.1 Layout dan input

| Kondisi | Perilaku |
|---|---|
| 320–767px | Satu kolom, hero aman dari notch, project vertikal, skill berupa list interaktif, tanpa warp/pin dekoratif |
| 768–1023px | Dua kolom bila muat, preview besar, project tetap aliran vertikal |
| ≥1024px + fine pointer | Track horizontal boleh aktif jika overflow; tilt/magnetic opsional |
| Desktop touch/coarse | Jangan menganggap lebar = mouse; nonaktifkan efek hover-dependent |
| Ultrawide ≥1920px | Konten dibatasi max-width; scene tetap memenuhi layar; teks tidak membesar tanpa batas |
| Landscape pendek | Kurangi tinggi hero/pin; semua CTA tetap terlihat; jangan memaksa 100vh konten |
| Zoom 200% dan 400% | Reflow, nav tetap dapat digunakan, tidak overlap/horizontal scroll halaman |

Gunakan unit viewport stabil untuk scene, uji address bar mobile dan perubahan orientasi. Tidak mengunci body scroll kecuali saat dialog/menu modal dibuka; selalu pulihkan scroll sebelumnya pada close/unmount/error. Konten panjang menentukan tinggi minimum, bukan dipotong agar cocok dengan storyboard.

### 9.2 Keyboard dan pembaca layar

Skip link menuju main. Urutan tab mengikuti dokumen. Canvas, garis dekoratif, partikel, dan duplikasi teks animasi diabaikan pembaca layar. Tombol ikon mempunyai nama. Fokus terlihat di latar gelap dan tidak tertutup header. Heading mengikuti hierarki. Project link bisa dibuka dari keyboard tanpa menunggu slide mendekat; bila mode horizontal menghambat focus, tampilkan layout vertikal untuk navigasi tersebut atau scroll kartu ke posisi dengan benar.

Konstelasi visual menggunakan daftar/button semantic yang sama; jangan membuat dua rangkaian tab target yang duplikat. Gunakan tombol dengan `aria-expanded` untuk disclosure skill, serta panel berlabel. Status copy memakai polite live region hanya saat aksi pengguna. Menu modal: focus trap, inert background bila didukung strategi, Escape, focus return; menu tidak terjebak ketika route berubah.

### 9.3 Motion dan failure matrix

| Keadaan | Hasil yang wajib |
|---|---|
| OS reduce sejak awal | Konten statis terbaca, tanpa pin/warp/parallax, tombol tetap punya focus |
| OS reduce berubah saat halaman terbuka | Revert timeline, lepaskan pin, pertahankan anchor/posisi baca |
| JavaScript off | HTML prerender menampilkan identitas, karya, kontak; navigasi anchor/link normal |
| WebGL tidak tersedia | Poster; tidak mengulang percobaan tanpa batas |
| Context lost | Fallback segera; satu upaya pemulihan terkendali opsional, tanpa loop error |
| Tekstur gagal/timeout | Planet prosedural atau poster; konten tidak menunggu |
| Gambar karya gagal | Rasio tetap, alt/nama karya terlihat, link detail tetap bisa dipakai |
| Font gagal | System font, split/measurement ulang hanya bila perlu |
| Storage ditolak | Preferensi dalam memori; tidak ada crash |
| Clipboard ditolak | Email tetap bisa dipilih/copy manual; feedback gagal jujur |
| Tab hidden | Ambient/render berat dijeda; lanjut tanpa time jump besar |
| Direct anchor `/#work` | Skip intro; ukur/pulihkan anchor setelah layout stabil |
| Back/forward browser | Posisi dan route pulih; tidak ada intro berulang atau pin ganda |

## 10. Performa dan loading

### 10.1 Anggaran awal

Target ini gate internal yang diuji, bukan jaminan hasil Lighthouse atau semua perangkat.

| Metrik | Target awal | Kondisi pencatatan |
|---|---|---|
| HTML/CSS/JS awal non-3D | ≤250KB compressed total | Build produksi; chunk 3D terpisah |
| Transfer awal mobile | ≤900KB sebelum idle enhancement | Cache dingin; catat font/poster |
| Chunk 3D + aset awalnya | ≤1.5MB tambahan | Lazy setelah konten utama tampil |
| Halaman home seluruh aset lazy | ≤5MB target | Jumlah karya 3; galeri detail tidak diunduh di home |
| LCP | ≤2.5s target | Profil mobile throttled yang dicatat |
| CLS | ≤0.1 | Load, resize, font, pin setup |
| INP | ≤200ms target lapangan | Sebelum traffic: cek latency interaksi lokal, jangan menyebutnya INP lapangan |
| Desktop render | Sekitar 60fps; median frame ≤16.7ms target | Perangkat baseline dan scene terberat |
| Lite render | Sekurangnya pengalaman stabil sekitar 30fps | Perangkat mobile nyata; lihat dropped frames |
| DPR Full / Lite | Cap 1.5 / 1 awal | Tuning setelah visual comparison |
| Draw calls | ≤60 Full / ≤30 Lite target | Scene terberat |
| Geometri terlihat | ≤120k / ≤40k triangles target | Planet dan dekorasi |
| Texture GPU | ≤64MB Full / ≤24MB Lite target | Hitung decoded + mipmaps, bukan file download |

Jangan menghapus fitur inti sekadar mengejar skor. Jika budget terlewati, catat sumber biaya dan optimasi terarah. Urutan penurunan: bloom/postprocess → jumlah partikel → resolusi tekstur/DPR → kompleksitas material → poster. Teks dan CTA tetap dipertahankan.

### 10.2 Pipeline loading

1. Kirim HTML konten, CSS, dan poster hero berdimensi tetap.
2. Font menggunakan strategi swap yang diuji; preload hanya font/poster yang benar-benar kritis.
3. Hydrate UI dan kontrol; konten sudah dapat dipakai.
4. Muat modul scene setelah first content/idle dengan batas penjadwalan yang wajar; jangan menunggu seluruh gallery.
5. Siapkan scene di belakang poster; ganti hanya setelah render pertama sukses.
6. Jika scene belum siap setelah sekitar 4 detik, tetap gunakan poster dan sediakan retry ringan bila berguna; jangan tampilkan layar loading terkunci.
7. Lazy load gallery dan aset section jauh; hentikan download dekoratif tambahan pada mode Reduced atau kemampuan rendah jika memungkinkan.

Tidak ada timer yang berpura-pura sebagai persentase unduhan. Status teks “menyiapkan visual” bersifat opsional dan tidak menutupi isi. Hanya tampilkan progress numerik jika total resource benar-benar diketahui.

### 10.3 Profiling dan kualitas adaptif

Mulai dari tier konservatif; viewport saja tidak cukup untuk mengukur GPU. Ukur frame selama scene aktif dan tab visible. Jika frame buruk bertahan beberapa detik, turunkan satu tier dengan cooldown; jangan naik-turun terus. Reduced motion adalah preferensi aksesibilitas, bukan kesimpulan dari FPS. Hindari remount total canvas saat tiap tier berubah.

Baseline uji direncanakan: laptop Windows dengan GPU terintegrasi/RAM 8GB, iPhone Safari kelas iPhone 11/13, serta Android kelas menengah. Model pasti, OS/browser, power mode, network, viewport dan tanggal dicatat ketika diuji. Jika perangkat tidak tersedia, laporkan sebagai belum diuji; emulasi tidak diklaim sebagai hardware nyata.

## 11. Sistem skill agen

Bagian ini merupakan rancangan skill untuk fase implementasi, belum menginstal skill ke aplikasi mana pun. Prinsip dari panduan skill-creator dipakai: trigger jelas, instruksi pendek, referensi terpisah, output terukur. Pada platform yang mendukung skill, gunakan mekanisme resminya. Pada agen yang tidak mendukung, bacakan kontrak yang sama sebagai instruksi proyek. Jangan mengasumsikan semua agen membaca `.claude`, `.codex`, atau `.agents` secara otomatis.

### 11.1 Registry skill yang direncanakan

| ID | Nama | Trigger | Dokumen input | Output | Batas penting |
|---|---|---|---|---|---|
| SKL-01 | plan-cosmic-portfolio | Menyusun atau mengubah scope/milestone XEVRYN | 01-prd, 15-plan, 16-tasks, 22-traceability | Requirement, dependensi, gate, dan next task | Tidak menulis kode scene sebelum scope dan gap dicatat |
| SKL-02 | design-cosmic-scenes | Mengatur komposisi, token, atau storyboard kosmik | 02-art-direction, 03-storyboard, 04-design-system | Komposisi desktop/mobile dan token terukur | Tidak menambah neon/panel tanpa fungsi atau mengganti tema |
| SKL-03 | structure-cosmic-app | Bootstrap, route, data, prerender, ownership | 05-architecture, 06-project-structure | Fondasi build, HTML statis, route dan data typed | Tidak memasang dependency tanpa penggunaan dan compatibility check |
| SKL-04 | build-cosmic-webgl | Planet, kamera, bintang, material dan context recovery | 03-storyboard, 08-assets, 12-performance | Scene modular + poster fallback + resource cleanup | Tidak mengubah konten menjadi canvas text atau membuat canvas per section |
| SKL-05 | choreograph-cosmic-scroll | Pin, scrub, transisi scene, progress kamera | 09-motion-system, 10-animation-register | Timeline scoped, reverse, resize, cleanup | Tidak membuat global wheel hijack atau nested pin tanpa alasan |
| SKL-06 | animate-cosmic-type | Reveal huruf/baris, font reflow dan split | 04-design-system, 09-motion-system, 11-responsive-accessibility | Komponen teks aksesibel dan demo resize | Tidak memecah semua paragraf per karakter atau menghilangkan link |
| SKL-07 | build-cosmic-projects | Kartu karya, track horizontal, studi kasus dan route | 07-content, 10-animation-register, 13-seo-contact-security | Showcase data-driven dan detail dengan direct load | Tidak mengarang hasil karya atau mengunci jumlah kartu |
| SKL-08 | adapt-cosmic-accessibility | Responsive, keyboard, Reduced, mode switch | 11-responsive-accessibility, 17-test-plan | Fallback dan hasil cek input/mode | Tidak menilai aksesibilitas dari pemeriksaan otomatis saja |
| SKL-09 | optimize-cosmic-performance | Profiling, aset berat, FPS, lazy scene | 08-assets, 12-performance | Trace sebelum/sesudah dan perubahan budget | Tidak mengklaim FPS tanpa ukuran atau menghapus identitas visual |
| SKL-10 | verify-cosmic-experience | QA user journey, cross-browser, regressions | 17-test-plan, 22-traceability | Test evidence, severity, daftar gap nyata | Tidak menyamakan build pass dengan visual pass |
| SKL-11 | release-cosmic-portfolio | SEO, link, hosting, rilis dan rollback | 13-seo-contact-security, 18-release | Release checklist, route smoke, rollback target | Tidak mengubah audience/credential atau mengklaim deploy tanpa hasil |
| SKL-12 | handoff-cosmic-work | Sesi selesai, limit agent, perpindahan tool | 16-tasks, 19-decisions, 20-progress, 21-handoff | Status aktual, bukti, blocker, next action | Tidak mengisi selesai berdasarkan rencana; jangan membawa secret |

### 11.2 Kontrak setiap skill

Saat skill dibuat, `SKILL.md` memiliki frontmatter `name` dan `description`. Description menjelaskan kapan digunakan, khusus proyek XEVRYN agar tidak memicu semua tugas coding. Body memuat urutan berikut:

1. Baca task aktif dan file input yang relevan saja.
2. Periksa repo/status saat ini sebelum mengedit; jangan menimpa kerja pengguna.
3. Sebutkan output yang akan diubah dan requirement/ANM terkait.
4. Kerjakan unit kecil yang dapat diverifikasi; ikuti dependency task.
5. Jalankan acceptance yang relevan, bukan seluruh suite pada setiap edit kecil.
6. Simpan bukti: command/status, screenshot/trace jika perlu, limitation nyata.
7. Update task dan handoff; jika blocked, tulis penyebab dan pekerjaan lain yang tetap bisa dilanjutkan.

Referensi detail ditempatkan dalam `references/` hanya bila perlu diakses skill tersebut. Gunakan satu sumber kebenaran; jangan menyalin semua dokumen ke tiap skill. `scripts/` hanya untuk pemeriksaan berulang yang sudah dijalankan dan diuji. Rencana kandidat script: pemeriksa ID/dependensi, pemeriksa asset manifest, pemeriksa internal link. Jangan membuat banyak wrapper yang tidak menambah kegunaan.

Skill adalah prosedur, bukan agen tambahan. Default eksekusi satu agen berurutan. Delegasi hanya jika diminta atau diizinkan oleh instruksi lingkungan. Bila beberapa agen dipakai, setiap agen memiliki file ownership dan semua hasil harus diintegrasikan sebelum task dianggap selesai.

### 11.3 Uji penerimaan skill

| Skenario | Skill | Hasil yang harus muncul |
|---|---|---|
| “Lanjutkan fondasi dari task terakhir” | SKL-01/03/12 | Baca status nyata, lanjut dependency siap, tidak mengulang scaffold |
| “Bikin warp lebih epic” | SKL-04/05/09 | Perubahan terbatas ANM-031–034, tetap aman Reduced/mobile, evidence perf |
| “Huruf berantakan setelah resize” | SKL-06/08 | Revert split/recalculate setelah font/layout; link dan label tetap benar |
| “Project tinggal dua” | SKL-07 | Track dihitung ulang dari overflow; tidak ada spacer kosong |
| “HP ngelag” | SKL-09 | Ukur bottleneck, turunkan biaya grafis terarah, isi tetap lengkap |
| “Limit hampir habis” | SKL-12 | Handoff dari diff/build aktual, task berikut spesifik |
| “Rilis sekarang” | SKL-10/11 | Gate diketahui, blocker dilaporkan, URL/status asli hanya setelah rilis |

### 11.4 AGENTS.md yang harus disiapkan

Isi minimum: tujuan desain; indeks dokumen; stack yang sudah dipilih; command yang tersedia; aturan tidak mengarang konten; larangan menimpa perubahan pengguna; ownership animasi; aksesibilitas/fallback; cara menandai task; format handoff. Jangan berisi instruksi untuk melewati approval, mengabaikan instruksi platform, atau menjalankan deployment tanpa mandat tugas.

Urutan baca agen baru: `AGENTS.md` → `docs/21-handoff.md` → `docs/16-tasks.md` → `docs/19-decisions.md` yang relevan → spesifikasi task. Baca `docs/01-prd.md` dan storyboard pada sesi pertama atau saat scope berubah. Agent tidak perlu memuat seluruh register ketika hanya memperbaiki satu tombol.

## 12. Rencana pengerjaan dan task register

### 12.1 Milestone dan gate

| Fase | Hasil | Gate untuk lanjut |
|---|---|---|
| P0 Definisi | Dokumen inti, konten pending, keputusan stack | REQ dan storyboard tercatat; route/rendering punya rencana |
| P1 Fondasi | App statis responsive dengan data typed | Build, direct route, no-JS/prerender terbukti |
| P2 Art dan scene | Hero kosmik + fallback + camera presets | Satu vertical slice hero lulus visual dan performa awal |
| P3 Koreografi | Semua scene dan ANM diterapkan | Scroll maju/mundur, resize, mode switch tidak rusak |
| P4 Hardening | Konten asli, aksesibilitas, performa, QA | Tidak ada P0/P1 issue; evidence tersimpan |
| P5 Rilis | Metadata, hosting, smoke, handoff | Semua requirement wajib punya bukti atau gap yang disetujui |

Jalur kritis: keputusan rendering → shell/prerender → desain hero → scene/camera → progress/pin → full journey → mobile/fallback → profiling → QA → rilis. Jangan menghabiskan waktu mempercantik tombol saat prerender atau scroll ownership belum jelas.

Jika waktu/kuota terbatas, capai P1 atau vertical slice P2 yang stabil. Pertahankan dokumen dan task agar agen berikut dapat meneruskan P3. Estimasi waktu kalender belum ditetapkan karena aset, konten dan lingkungan implementasi belum tersedia.

### 12.2 Task register

Semua task di bawah mulai `todo`. Dependencies memakai nomor TSK; tanda `—` berarti tidak memiliki dependensi task. Gate bukan bukti yang sudah dihasilkan.

| Task | Fase | Pekerjaan | Dependensi | Acceptance | Skill |
|---|---|---|---|---|---|
| TSK-001 | P0 | Bekukan PRD dan REQ | — | Scope v1, fakta/pending, acceptance produk tercatat | SKL-01 |
| TSK-002 | P0 | Buat indeks dokumen dan aturan agen | 001 | Sumber kebenaran dan urutan baca jelas | SKL-01 |
| TSK-003 | P0 | Inventaris konten pemilik | 001 | Profile/project/link diberi status; tidak ada fakta rekaan | SKL-01 |
| TSK-004 | P0 | Tetapkan art direction dan token | 001 | Komposisi hero/work/mobile dan warna/type disepakati dari brief | SKL-02 |
| TSK-005 | P0 | Tulis storyboard tiap scene | 004 | Masuk/tahan/keluar serta Reduced/mobile tercatat | SKL-02 |
| TSK-006 | P0 | Spike stack dan rendering | 002 | Versi/peer/runtime dipastikan; home+detail HTML statis terbukti | SKL-03 |
| TSK-007 | P0 | Susun asset manifest dan lisensi | 003,004 | Setiap aset punya sumber/fallback/budget atau status pending | SKL-02 |
| TSK-008 | P0 | Siapkan kontrak skill dan traceability | 002,005 | SKL/REQ/ANM/TSK dapat dirujuk tanpa ID hilang | SKL-01 |
| TSK-009 | P1 | Bootstrap repo/app | 006 | Install, dev, typecheck dan build scripts bekerja | SKL-03 |
| TSK-010 | P1 | Implementasi typed content/schema | 003,009 | Slug unik; link opsional; relasi skill-project valid | SKL-03 |
| TSK-011 | P1 | Implementasi design tokens/font | 004,009 | Font fallback, responsive type dan spacing konsisten | SKL-02 |
| TSK-012 | P1 | Layout semantic dan navigasi | 010,011 | Header, skip link, main, footer, anchor bekerja | SKL-03 |
| TSK-013 | P1 | Home statis semua section | 012 | Identitas/karya/kontak tetap terbaca sebelum animasi | SKL-03 |
| TSK-014 | P1 | Studi kasus + 404 + prerender | 010,012 | Direct URL, reload, metadata dasar dan HTML konten benar | SKL-07 |
| TSK-015 | P1 | Kontak email/social/copy | 003,012 | Tujuan terverifikasi atau hidden pending; copy error ditangani | SKL-03 |
| TSK-016 | P1 | Motion preference provider | 009 | Full/Lite/Reduced, OS reduce, storage gagal ditangani | SKL-08 |
| TSK-017 | P1 | Responsive shell dan menu | 013,016 | 320px–ultrawide, keyboard menu, focus return bekerja | SKL-08 |
| TSK-018 | P1 | Gate fondasi dan checkpoint | 014,015,017 | Build dan route/no-JS bukti tersimpan; handoff diperbarui | SKL-10 |
| TSK-019 | P2 | Produksi/siapkan aset hero | 007,018 | Poster final/fallback, tekstur dan lisensi tercatat | SKL-02 |
| TSK-020 | P2 | Canvas lazy + error boundary | 016,019 | Konten tampil sebelum canvas; WebGL gagal aman | SKL-04 |
| TSK-021 | P2 | Planet dan lighting | 020 | Silhouette, rim dan material sesuai arah; budget awal dicatat | SKL-04 |
| TSK-022 | P2 | Starfield/debu/nebula | 020 | Lapisan depth terlihat; draw calls terukur | SKL-04 |
| TSK-023 | P2 | Camera rig dan preset scene | 021,022 | Pose tiap boundary terdokumentasi dan tidak meloncat | SKL-04 |
| TSK-024 | P2 | Bridge progress DOM ke scene | 023 | Ref progress tidak menyebabkan React rerender per frame | SKL-05 |
| TSK-025 | P2 | Primitive heading/line reveal | 011,016 | Font siap, resize, accessible name dan cleanup benar | SKL-06 |
| TSK-026 | P2 | Vertical slice hero lengkap | 024,025 | Hero+scroll ke About diuji desktop/mobile/Reduced | SKL-05 |
| TSK-027 | P2 | Profiling vertical slice | 026 | Baseline frame/bundle tercatat; optimasi bottleneck terbesar | SKL-09 |
| TSK-028 | P2 | Gate visual hero dan checkpoint | 027 | Poster dan canvas konsisten; evidence; lanjut P3 | SKL-10 |
| TSK-029 | P3 | Fondasi timeline/lifecycle | 028 | Scoped context, refresh batch, breakpoint revert benar | SKL-05 |
| TSK-030 | P3 | Sistem layout Work/Skills | 010,029 | Track dinamis dan skill disclosure semantic berfungsi | SKL-07 |
| TSK-031 | P3 | ANM global 001–012 | 029 | Semua efek global memenuhi register dan mode | SKL-05 |
| TSK-032 | P3 | ANM Hero 013–022 final | 029 | Intro dapat diinterupsi; reverse/handoff stabil | SKL-05 |
| TSK-033 | P3 | ANM About 023–030 | 029 | Ruang baca, optional portrait dan line reveal aman | SKL-06 |
| TSK-034 | P3 | ANM Warp 031–034 | 029 | Satu peak, reverse/fast scroll reset, fallback mobile | SKL-05 |
| TSK-035 | P3 | ANM Work 035–044 | 030 | Overflow diukur, jumlah kartu 1–6, keyboard dan release aman | SKL-07 |
| TSK-036 | P3 | ANM Skills 045–052 | 030 | Node/list satu sumber data; focus/tap/relasi berfungsi | SKL-08 |
| TSK-037 | P3 | ANM Contact 053–060 | 015,029 | Kontak tetap klikable; Reduced tanpa gerak dekoratif | SKL-05 |
| TSK-038 | P3 | ANM Detail 061–062 | 014,029 | Page enter/galeri dan scroll restoration bekerja | SKL-07 |
| TSK-039 | P3 | Integrasi perjalanan penuh | 031,032,033,034,035,036,037,038 | Boundary tanpa jump; tidak ada dua writer property | SKL-05 |
| TSK-040 | P3 | ANM mode/failure 063–064 | 039 | Live mode switch dan context loss tidak meninggalkan pin | SKL-08 |
| TSK-041 | P3 | Gate animasi dan checkpoint | 040 | 64 ID berstatus benar; gap tercatat dan hasil dapat dilanjutkan | SKL-10 |
| TSK-042 | P4 | Masukkan konten dan karya final | 003,041 | Semua public claims terverifikasi; placeholder publik nol | SKL-07 |
| TSK-043 | P4 | Optimasi aset/font final | 007,042 | Ukuran, dimensi, lisensi dan loading sesuai manifest | SKL-09 |
| TSK-044 | P4 | Tuning mobile dan landscape | 041 | Touch nyata, safe area, zoom, address bar diperiksa | SKL-08 |
| TSK-045 | P4 | Audit keyboard/screen reader | 042,044 | Skip/menu/skill/project/copy dapat dipakai; label tidak duplikat | SKL-08 |
| TSK-046 | P4 | Audit Reduced dan JS off | 043,045 | Tidak ada konten tersembunyi/pin/gerak dekoratif tersisa | SKL-08 |
| TSK-047 | P4 | Uji failure dan lifecycle | 040,046 | Context lost/font/image/clipboard/storage/route cleanup lulus | SKL-10 |
| TSK-048 | P4 | Profiling full journey | 043,044,047 | Frame, transfer, layout shift dan interaksi diukur | SKL-09 |
| TSK-049 | P4 | Optimasi dan quality tiers | 048 | Budget tercapai atau exception tercatat dengan alasan | SKL-09 |
| TSK-050 | P4 | Uji browser dan direct route | 049 | Browser matrix, deep link/back/forward/404 sesuai | SKL-10 |
| TSK-051 | P4 | Review visual semua scene | 050 | Screenshot desktop/mobile, warna, crop dan teks diperiksa | SKL-02 |
| TSK-052 | P4 | Perbaiki defect prioritas | 051 | P0/P1 nol; retest area terpengaruh tersimpan | SKL-10 |
| TSK-053 | P4 | Gate release candidate | 052 | Traceability REQ lengkap dan konten pending sudah diselesaikan | SKL-10 |
| TSK-054 | P5 | SEO/social/favicon/sitemap | 042,053 | Metadata unik, canonical host nyata, OG dan sitemap valid | SKL-11 |
| TSK-055 | P5 | Audit link/security/privacy | 054 | Link asli, secret nol, dependency/headers sesuai hosting | SKL-11 |
| TSK-056 | P5 | Setup hosting dan preview | 055 | Environment/base path/cache/direct route diverifikasi | SKL-11 |
| TSK-057 | P5 | Smoke test preview build produksi | 056 | Home/detail/404/kontak/mode/WebGL fallback bekerja | SKL-10 |
| TSK-058 | P5 | Rilis dan catat rollback | 057 | Versi/URL/status nyata tersimpan; akses sesuai keputusan | SKL-11 |
| TSK-059 | P5 | Smoke test setelah rilis | 058 | HTTPS, asset, anchor, project dan kontak di URL akhir benar | SKL-10 |
| TSK-060 | P5 | Handoff final dan maintenance | 059 | Status final, issue tersisa, update konten/rollback terdokumentasi | SKL-12 |

### 12.3 Format record task saat dikerjakan

```yaml
id: TSK-026
status: todo
requirement_ids: [REQ-01, REQ-02, REQ-03, REQ-04, REQ-05]
animation_ids: [ANM-013, ANM-014, ANM-015, ANM-016, ANM-017, ANM-018, ANM-019, ANM-020, ANM-021, ANM-022]
owner: unassigned
dependencies: [TSK-024, TSK-025]
changed_files: []
checks: []
evidence: []
blockers: []
next_action: implement hero vertical slice
```

Contoh ini template, bukan status pekerjaan aktual. Saat selesai, `checks` memuat command, exit/result, tanggal dan lingkungan. Tidak wajib commit tiap perubahan kecil, tetapi checkpoint harus dapat ditelusuri dan perubahan pengguna tidak boleh disertakan tanpa alasan.

## 13. Pengujian dan bukti

### 13.1 Matriks test wajib

| QA ID | Skenario | Acceptance / bukti |
|---|---|---|
| QA-01 | First visit cold cache | Identitas/CTA tampil tanpa menunggu WebGL; trace load |
| QA-02 | Scroll normal sampai footer dan balik | Semua scene/ANM tampil, tidak jump; video pendek |
| QA-03 | Fast scroll, Home, End | Timeline mengikuti posisi akhir; tidak ada overlay tersangkut |
| QA-04 | Resize di tengah pin | Ukuran track dihitung ulang; posisi masuk akal; tidak spacer ganda |
| QA-05 | Orientation change | Konten tidak terpotong dan scroll dapat diteruskan |
| QA-06 | Direct `/#work` dan `/#contact` | Mendarat di konten yang benar setelah layout stabil |
| QA-07 | Direct detail/reload/404 | HTTP/hosting route tepat, konten dan metadata benar |
| QA-08 | Back/forward dari detail | Kembali ke kartu/posisi; intro tidak diulang |
| QA-09 | Keyboard seluruh halaman | Fokus terlihat; menu/skill/link/copy usable; tidak trap |
| QA-10 | Screen reader sample | Heading, title, link, skill panel dibaca sekali dan runtut |
| QA-11 | Reduced sejak load dan toggle live | Tidak warp/pin/parallax; tidak kehilangan konten |
| QA-12 | WebGL unavailable/context lost | Poster aktif; CTA dan nav tetap bekerja |
| QA-13 | Font/image/texture gagal | Fallback jelas, tidak blank/crash/layout runtuh |
| QA-14 | JS disabled | Identitas, karya, kontak dan route dasar dapat digunakan |
| QA-15 | Clipboard/storage denied | Error terkendali; copy manual/preferences memory berfungsi |
| QA-16 | 1, 2, 3, 6 project | Overflow/pin benar; semua kartu terjangkau |
| QA-17 | Judul panjang dan bio panjang | Reflow, line split, card height tidak memotong teks |
| QA-18 | 320/390/768/1024/1440/1920px | Screenshot tiap layout utama tanpa overflow halaman |
| QA-19 | Zoom 200%/400% | Navigasi/kontak dapat dipakai; konten reflow |
| QA-20 | Hidden tab lalu kembali | Tidak loncat besar, tidak duplikasi loop |
| QA-21 | Navigasi home/detail berulang 10x | Tidak ada pertumbuhan listener/canvas/resource tanpa batas |
| QA-22 | Semua link eksternal dan CV | Tujuan/file benar; tidak ada href kosong/placeholder |
| QA-23 | Performa scene terberat | Trace dengan hardware/network tercatat; budget dibandingkan |
| QA-24 | Build produksi, URL final | Bukan hanya dev server; assets, cache, MIME, routes benar |

Browser matrix target: Chrome/Edge desktop, Firefox desktop, Safari macOS bila tersedia, Safari iOS nyata, Chrome Android nyata. Tuliskan versi yang benar-benar diuji. Minimal satu mesin desktop dan satu perangkat touch nyata sebelum klaim kompatibilitas umum; sisanya menjadi gap tercatat jika akses tidak tersedia.

### 13.2 Jenis pengujian

Unit test hanya untuk logika berisiko: mapping progress, pemilihan mode, slug/relasi konten, track overflow. Integration/E2E: direct route, menu focus, mode switch, contact feedback, restoration. Visual review: screenshot scene dan rekaman scroll untuk timing; screenshot saja tidak membuktikan transisi halus. Accessibility scanner membantu menemukan masalah, lalu keyboard/screen reader diuji manual. Profiling dilakukan build produksi.

Jangan menulis test untuk mencocokkan setiap class CSS. Jangan mengejar angka coverage tanpa hubungan dengan risiko. Setelah suatu perubahan kecil lolos pemeriksaan terkait, lanjutkan; full regression berada pada gate milestone.

### 13.3 Severity dan bukti

P0: halaman tidak dapat dipakai, kebocoran secret, scroll/focus terkunci. P1: kontak/project gagal, informasi penting hilang, Reduced/WebGL fallback rusak, overflow besar. P2: glitch visual terbatas. P3: polish kosmetik.

Bukti disimpan seperti `evidence/qa-02-desktop-scroll.mp4`, `evidence/qa-18-mobile-390.png`, dan laporan `.md` berisi kondisi/result. Nama tersebut target, bukan file yang sudah dibuat. Rilis mensyaratkan P0/P1 selesai. P2/P3 yang tersisa perlu dicatat beserta dampak; jangan menyebut semuanya sempurna.

## 14. SEO, kontak, keamanan, dan rilis

### 14.1 SEO dan konten publik

Home mempunyai title/description asli, H1, canonical setelah domain diketahui, OG image, favicon, dan structured data Person hanya untuk fakta benar. Setiap detail project mempunyai title/description/OG yang relevan. Generate sitemap dari route nyata; robots sesuai status preview/production. Preview dapat noindex; pastikan flag tidak terbawa produksi. Jangan menaruh seluruh teks dalam canvas atau membiarkan HTML awal kosong.

Link memakai anchor asli. Gambar memiliki ukuran dan alt yang sesuai; dekorasi memakai alt kosong. Metadata tidak mengklaim jabatan/pencapaian yang belum disetujui. Domain belum dipilih dan tidak boleh diisi domain milik pihak lain.

### 14.2 Kontak dan privacy

V1 memakai email dan social link. Clipboard hanya atas aksi klik. Jika email belum diberikan, area kontak tetap dirancang tetapi rilis CTA kontak ditahan sampai tujuannya benar. Tidak ada form sukses palsu. Jika form ditambahkan di scope berikutnya, rencanakan endpoint, validation, rate limit, anti-spam, secret server-side, error/retry, privacy dan uji pengiriman nyata.

Analytics opsional, default tidak dipasang. Jika diminta, tentukan event minimum (open project/contact), hindari data pribadi di event, dan dokumentasikan layanan serta kebutuhan consent sesuai konteks. Jangan menambah cookie banner dekoratif tanpa kebutuhan nyata.

### 14.3 Keamanan teknis

Tidak ada API key di frontend atau dokumen. Environment contoh hanya berisi nama variabel, tanpa nilai rahasia. Batasi protokol link ke tujuan yang diizinkan data. Jangan merender HTML bebas dari field konten tanpa sanitasi. Link eksternal yang membuka tab baru menggunakan rel yang tepat. Review dependency/licensing dan header hosting; CSP diuji terhadap font/shader/aset yang benar, jangan mengklaim CSP aktif hanya karena ditulis di docs.

### 14.4 Runbook release

1. Periksa branch/diff, lockfile, konten, lisensi, QA gate dan status pending.
2. Jalankan clean install sesuai package manager, typecheck/lint/build dan test yang relevan; simpan hasil.
3. Periksa artefak produksi, HTML home/detail, ukuran chunk, URL/base path.
4. Deploy preview sesuai platform pilihan; belum ada provider/domain yang ditetapkan di blueprint ini.
5. Smoke test URL preview: route, gambar/font, anchor, kontak, Reduced, WebGL failure.
6. Rilis versi yang sama dengan yang diuji; simpan identitas versi dan URL dari hasil nyata.
7. Periksa HTTPS, canonical, sitemap, cache, MIME dan status 404 pada URL final.
8. Catat versi sebelumnya/artefak yang dapat dipulihkan. Bila gagal, kembalikan versi sehat melalui prosedur platform; jangan menghapus data atau mengubah audience untuk mengatasi error.
9. Update handoff, keputusan, known issues dan cara update konten.

Hosting static membutuhkan strategi route yang benar: keluaran per-route bila prerender, atau fallback router yang tetap membedakan route 404 dengan layak. Uji reload URL detail di server produksi. Nama host, DNS, header cache dan redirect adalah keputusan implementasi, bukan asumsi dokumen.

### 14.5 Pemeliharaan

Ketika menambah karya: isi data, screenshot/lisensi, studi kasus, metadata, relasi skill; jalankan validation dan QA jumlah kartu/overflow. Ketika mengubah font: ulang split/reflow/CLS. Ketika menambah efek: beri ID baru setelah ANM-064, tentukan mode dan budget, perbarui task dan test. Jangan menomori ulang ID lama. Update dependency dilakukan terpisah dengan compatibility check dan regression scene.

## 15. Risiko dan keputusan terbuka

| Risiko / keputusan | Penanganan |
|---|---|
| Nama publik, headline, bio belum final | CONTENT_PENDING; tidak mengambil seluruh data personal otomatis untuk publik |
| Screenshot dan studi kasus belum diberikan | Layout placeholder internal; gate konten sebelum rilis |
| Email/social/CV belum final | Sembunyikan tombol yang belum punya tujuan, catat blocker rilis kontak |
| Aset 3D membuat mobile berat | Hero poster, tier kualitas, satu canvas, profiling sejak P2 |
| Banyak animasi membuat teks tidak nyaman | Hold baca, per-baris, kontrol Reduced/Lite |
| Pin melompat saat font/gambar berubah | Dimensi eksplisit, pengukuran setelah siap, refresh batch |
| Scene/time intro berebut property | Pisahkan wrapper dan handoff ownership ketika scroll mulai |
| Prerender tidak cocok dengan library | Spike P0; catat ADR dan putuskan framework sebelum scene |
| Dependency/API berubah | Verifikasi official docs dan lockfile saat implementasi |
| Agent berganti/kuota habis | Checkpoint per milestone, handoff task konkret |
| Hosting/domain belum ditetapkan | Pilih sebelum release, uji direct route dan base path |
| Semua perangkat tidak tersedia | Laporkan matrix yang benar-benar diuji; jangan klaim universal |

Keputusan yang sudah cukup untuk mulai: tema, narasi, scene, jenis animasi, data lokal, kontak link, native scroll, fallback, dokumentasi dan task. Kekurangan konten tidak menghalangi fondasi. Saat butuh keputusan tambahan, kerjakan dahulu bagian yang tidak bergantung padanya lalu tanyakan poin spesifik.

## 16. Handoff dan prompt eksekusi

### 16.1 Isi handoff setiap akhir sesi

- Tanggal, branch/versi kerja, kondisi perubahan lokal dan identitas checkpoint bila ada.
- Task yang selesai beserta file/bukti; task aktif beserta bagian yang belum selesai.
- Command yang benar-benar dijalankan dan hasilnya. Bedakan belum diuji, gagal, dan lulus.
- Blocker konten, aset, dependency atau akses; jangan mengulang kebutuhan yang sudah diselesaikan.
- Keputusan baru dan alasan, termasuk perubahan scope.
- Daftar file penting untuk dibaca agen berikut, maksimal yang relevan.
- Satu task berikut yang siap dikerjakan dengan acceptance konkret.
- Cara menjalankan dev/build, cara memeriksa visual, issue yang masih dapat direproduksi.

### 16.2 Prompt mulai untuk agen coding

```text
Bangun XEVRYN Cosmic Portfolio berdasarkan XEVRYN-COSMIC-MASTER-PLAN.md.

Mulai dengan membaca kondisi workspace dan instruksi proyek yang tersedia.
Jangan mengasumsikan proyek masih kosong dan jangan menimpa perubahan pengguna.

Tahap pertama: susun dokumen Markdown sesuai manifest, isi scope dan task nyata,
verifikasi pilihan stack/rendering, lalu kerjakan fondasi P1. Rancang skill proyek
sesuai bagian 11 melalui mekanisme yang didukung lingkungan. Skill yang belum
dipasang harus disebut sebagai rancangan, bukan diklaim aktif.

Setelah fondasi lolos gate, lanjutkan vertical slice hero P2 dan tahap berikut
secara berurutan selama kapasitas memungkinkan. Tema wajib alam semesta
sinematik dengan planet, parallax berlapis, tipografi animatif dan transisi
kamera. Ikuti register ANM-001–064; setiap efek wajib punya fallback mobile dan
Reduced serta cleanup. Pertahankan konten DOM yang tetap terbaca tanpa WebGL.

Jangan membuat klaim personal, testimonial, angka hasil atau project palsu.
Tandai data yang belum tersedia sebagai CONTENT_PENDING dan lanjutkan pekerjaan
fondasi yang tidak bergantung pada data itu. Sebelum publikasi, selesaikan gap
konten dan gate yang diperlukan.

Tandai task done hanya setelah acceptance diperiksa. Jangan menyebut build
pass sebagai bukti visual/performa. Jika kapasitas sesi menipis, selesaikan unit
aktif yang aman, simpan perubahan dan tulis handoff berdasarkan kondisi nyata.
Jangan memulai rewrite besar menjelang akhir sesi.

Output tiap milestone: file yang berubah, task selesai, pemeriksaan dan hasil,
blocker, serta task berikut. Ikuti aturan hosting/publikasi lingkungan yang
berlaku ketika mencapai tahap rilis.
```

### 16.3 Prompt lanjut di agen lain

```text
Lanjutkan proyek XEVRYN Cosmic Portfolio dari kondisi repo saat ini.
Baca AGENTS.md, docs/21-handoff.md, docs/16-tasks.md, lalu dokumen yang relevan
untuk task berikut. Cocokkan laporan dengan file dan hasil command aktual.
Jangan mengulang scaffold, mengganti stack, atau menulis ulang seluruh proyek
jika tidak ada masalah yang dibuktikan. Pilih task todo paling awal yang seluruh
dependensinya sudah done; jika task aktif belum selesai, lanjutkan itu dahulu.
Jaga tema kosmik, register animasi, mobile/Reduced dan fallback. Setelah
mengerjakan, perbarui task, bukti, decisions bila berubah, dan handoff.
```

## 17. Checklist selesai

- [ ] Seluruh REQ-01–12 dipetakan ke hasil dan bukti, bukan hanya task.
- [ ] Semua dokumen manifest memiliki isi sesuai tanggung jawab atau keputusan eksplisit bila digabung.
- [ ] Stack, runtime, lockfile dan metode prerender benar-benar diverifikasi.
- [ ] Identitas, bio, karya, skill, email, social dan CV berasal dari data yang disetujui.
- [ ] S01–S06 membentuk perjalanan kosmik yang konsisten.
- [ ] ANM-001–064 terimplementasi atau pengecualian tercatat; efek utama tetap memenuhi brief.
- [ ] Setiap animasi memiliki desktop/mobile/Reduced, trigger dan cleanup yang diperiksa.
- [ ] Project jumlah variabel, route detail, reload, 404 dan Back/forward bekerja.
- [ ] Tidak ada pin ganda, body lock tersisa, pointer overlay atau keyboard trap.
- [ ] HTML tanpa JS dan WebGL failure tetap menyediakan konten utama.
- [ ] Reduced sejak awal dan pergantian live tidak menyembunyikan konten.
- [ ] Aset memiliki sumber, lisensi, ukuran, dimensi dan fallback.
- [ ] Performa diukur pada kondisi yang dicatat; exception dijelaskan.
- [ ] Browser/device matrix mencatat tested dan untested secara jujur.
- [ ] Kontak, metadata, OG, favicon, sitemap dan canonical benar.
- [ ] Tidak ada secret, link placeholder, statistik palsu atau form sukses palsu.
- [ ] Rilis memakai build yang diuji, status/URL nyata tersimpan dan rollback tersedia.
- [ ] Handoff akhir cukup untuk agen lain melanjutkan tanpa menebak.

## 18. Referensi teknis

Dibaca pada penyusunan blueprint, 21 September 2026. Gunakan dokumentasi resmi lagi saat menetapkan versi dan API. Rincian parameter dalam blueprint adalah keputusan desain; bukan kutipan standar atau jaminan performa.

- [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/): dasar penyesuaian timeline berdasarkan media query dan revert saat kondisi berubah. Dipakai untuk desain breakpoint dan reduced motion.
- [GSAP SplitText](https://gsap.com/docs/v3/Plugins/SplitText/): referensi pemisahan teks; verifikasi perilaku aksesibilitas/reflow pada versi yang dipasang.
- [Vite Getting Started](https://vite.dev/guide/): referensi bootstrap dan persyaratan runtime; versi tidak dikunci dalam dokumen ini.

Dokumen ini tidak menyatakan website sudah dibangun, lulus test, atau tersedia online. Hasil saat ini adalah rencana implementasi yang dapat dipakai untuk memulai dan meneruskan pekerjaan secara terukur.
