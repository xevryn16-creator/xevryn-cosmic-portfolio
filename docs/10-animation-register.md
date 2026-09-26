# 10 — Register Animasi Lengkap (ANM-001 s/d ANM-064)

Versi: 1.0 · Tanggal: 21 September 2026 · Status: Disetujui (Blueprint Spesifikasi)

---

## 1. Tata Kelola Register Animasi

Dokumen ini memuat kontrak spesifikasi teknis dari **64 animasi terdaftar (ANM-001 sampai ANM-064)**. Setiap efek memiliki penanggung jawab komponen tunggal, rentang pemicu yang presisi, serta perilaku khusus untuk mode *Reduced Motion* dan perangkat mobile layar sentuh.

### Notasi Jenis Animasi
- **`E` (Entrance / Reveal):** Animasi satu kali saat elemen memasuki viewport atau saat halaman dimount.
- **`R` (Reversible Scroll):** Animasi yang dikontrol langsung oleh progress scroll (`p: 0.0–1.0`), dapat dibalik (*scrubbed*).
- **`L` (Ambient Loop):** Animasi lingkungan berkelanjutan yang dijeda saat tab tersembunyi.
- **`I` (Interactive / Event):** Animasi sesaat yang dipicu oleh hover, klik, fokus keyboard, atau event pointer.

---

## 2. Bagian 1: Animasi Global & Lingkungan (ANM-001 s/d ANM-012)

### ANM-001: Poster ke Kanvas WebGL (Global)
- **Elemen & Section:** Wrapper canvas latar belakang (`#cosmic-canvas`) & poster CSS (`#hero-poster`).
- **Tujuan Visual:** Transisi crossfade mulus dari poster statis ke kanvas 3D interaktif tanpa layar berkedip.
- **Pemicu:** Event frame pertama berhasil dirender oleh Three.js (`onFirstFrameReady`).
- **Keadaan Awal & Akhir:** Canvas `opacity: 0` → `1`; Poster `opacity: 1` → `0`.
- **Property:** `opacity`.
- **Durasi & Easing:** Durasi 450ms, easing `power2.out`.
- **Perilaku Reverse / Fast-Scroll:** Tidak dapat dibalik (transisi satu kali per sesi).
- **Hubungan Efek:** Membuka jalan untuk ANM-002 s/d ANM-006.
- **Mobile & Reduced Motion:** *Mobile:* Durasi dipercepat ke 250ms. *Reduced:* Canvas tidak dimuat; poster dipertahankan permanen.
- **Cleanup & Resize:** Event listener dihapus setelah transisi selesai.
- **Komponen Pemilik:** `src/scene/CosmicCanvas.tsx`.
- **Acceptance & Uji:** Poster tetap tampil sampai frame 3D sukses. Pengujian: Throttle koneksi dan verifikasi tidak ada layar putih.

### ANM-002: Lapisan Bintang Jauh (Parallax)
- **Elemen & Section:** Lapisan partikel bintang latar (`StarfieldFar`).
- **Tujuan Visual:** Ilusi kedalaman ruang angkasa kosmik tak terhingga.
- **Pemicu:** Nilai scroll progresif sepanjang halaman utama.
- **Keadaan Awal & Akhir:** Translasi Y `0px` → `-20px` (maksimal per scene).
- **Property:** `points.position.y` pada scene 3D.
- **Durasi & Easing:** Terikat scrub scroll linear (`scrub: 0.2`).
- **Perilaku Reverse / Fast-Scroll:** Mengikuti arah scroll seketika tanpa melayang tertinggal.
- **Hubungan Efek:** Bergerak lebih lambat daripada bintang tengah (ANM-003) dan debu foreground (ANM-004).
- **Mobile & Reduced Motion:** *Mobile:* Batas translasi dikurangi ke 8px. *Reduced:* Dinonaktifkan (offset 0px).
- **Cleanup & Resize:** Posisi direset saat ScrollTrigger di-refresh.
- **Komponen Pemilik:** `src/scene/Starfield.tsx`.
- **Acceptance & Uji:** Rekaman scroll maju-mundur menunjukkan pergerakan paling lambat dari semua lapisan.

### ANM-003: Lapisan Bintang Tengah (Parallax)
- **Elemen & Section:** Lapisan partikel bintang tengah (`StarfieldMid`).
- **Tujuan Visual:** Memberi persepsi jarak menengah antara bintang latar dan planet.
- **Pemicu:** Nilai scroll progresif sepanjang halaman utama.
- **Keadaan Awal & Akhir:** Translasi Y `0px` → `-60px`.
- **Property:** `points.position.y`.
- **Durasi & Easing:** Terikat scrub scroll linear (`scrub: 0.25`).
- **Perilaku Reverse / Fast-Scroll:** Reversibel penuh mengikuti posisi scroll.
- **Hubungan Efek:** Berdampingan dengan rotasi planet (ANM-006).
- **Mobile & Reduced Motion:** *Mobile:* Maksimal 20px. *Reduced:* Dinonaktifkan (statis).
- **Cleanup & Resize:** Disinkronkan dengan batch refresh GSAP.
- **Komponen Pemilik:** `src/scene/Starfield.tsx`.
- **Acceptance & Uji:** Kecepatan 3x lipat dibanding bintang jauh.

### ANM-004: Partikel Debu Kosmik Foreground
- **Elemen & Section:** Partikel debu ruang angkasa di depan kamera (`CosmicDust`).
- **Tujuan Visual:** Menambah sensasi sinematik partikel mengambang dekat lensa.
- **Pemicu:** Nilai scroll progresif sepanjang halaman utama.
- **Keadaan Awal & Akhir:** Translasi Y `0px` → `-120px` dengan rotasi mikro.
- **Property:** `points.position.y` & `points.rotation.z`.
- **Durasi & Easing:** Terikat scrub scroll linear (`scrub: 0.35`).
- **Perilaku Reverse / Fast-Scroll:** Reversibel penuh.
- **Hubungan Efek:** Tidak menangkap pointer event (`pointer-events: none`).
- **Mobile & Reduced Motion:** *Mobile:* Dinonaktifkan penuh demi performa GPU. *Reduced:* Dinonaktifkan.
- **Cleanup & Resize:** Geometri didispose saat unmount.
- **Komponen Pemilik:** `src/scene/Starfield.tsx`.
- **Acceptance & Uji:** Partikel foreground tidak menutupi tombol atau mengganggu klik.

### ANM-005: Pergeseran Gas Nebula (Nebula Drift)
- **Elemen & Section:** Shader gas kosmik (`Nebula`).
- **Tujuan Visual:** Menghidupkan atmosfer kosmik yang dinamis dan bernapas.
- **Pemicu:** Ambient loop waktu (`clock.getElapsedTime()`).
- **Keadaan Awal & Akhir:** Pergeseran koordinat UV noise 0% → 100% setiap 60 detik.
- **Property:** Shader uniform `uTime`.
- **Durasi & Easing:** Loop berkelanjutan 60s, linear.
- **Perilaku Reverse / Fast-Scroll:** Tidak terpengaruh scroll (waktu independen).
- **Hubungan Efek:** Dijeda otomatis saat tab tidak aktif (`document.hidden`).
- **Mobile & Reduced Motion:** *Mobile:* Shader disederhanakan. *Reduced:* Statis (uniform `uTime = 0`).
- **Cleanup & Resize:** Shader uniform dibersihkan saat canvas unmount.
- **Komponen Pemilik:** `src/scene/Nebula.tsx`.
- **Acceptance & Uji:** Loop berhenti saat berpindah tab; tidak mengonsumsi daya saat diminimalkan.

### ANM-006: Rotasi Aksial Planet (Planet Rotation)
- **Elemen & Section:** Objek 3D planet (`PlanetMesh`).
- **Tujuan Visual:** Memberi skala kemegahan benda langit raksasa.
- **Pemicu:** Ambient loop waktu di dalam `useFrame`.
- **Keadaan Awal & Akhir:** Rotasi sumbu Y `0` → `2π` radian setiap 180 detik.
- **Property:** `mesh.rotation.y`.
- **Durasi & Easing:** 180s per putaran, kecepatan konstan.
- **Perilaku Reverse / Fast-Scroll:** Tidak meloncat saat scroll bolak-balik.
- **Hubungan Efek:** Berpadu dengan pergerakan mendekati planet (ANM-021).
- **Mobile & Reduced Motion:** *Mobile:* 240 detik per putaran. *Reduced:* Rotasi dihentikan pada sudut terbaik.
- **Cleanup & Resize:** Variabel rotasi disimpan dalam ref lokal.
- **Komponen Pemilik:** `src/scene/Planet.tsx`.
- **Acceptance & Uji:** Kecepatan rotasi konstan dan tidak ada stutter per frame.

### ANM-007: Kedalaman Pointer Kursor (Pointer Rig Offset)
- **Elemen & Section:** Dudukan kamera 3D (`CameraRig`).
- **Tujuan Visual:** Responsivitas halus terhadap gerakan kursor pengguna di desktop.
- **Pemicu:** Event `mousemove` pada window (hanya untuk mouse / pointer fine).
- **Keadaan Awal & Akhir:** Rotasi kamera `x: 0, y: 0` → offset maksimal ±2 derajat.
- **Property:** `cameraRig.rotation.x`, `cameraRig.rotation.y`.
- **Durasi & Easing:** Lerp halus (`factor: 0.05`).
- **Perilaku Reverse / Fast-Scroll:** Kembali ke netral `(0,0)` saat kursor meninggalkan jendela (`pointerleave`).
- **Hubungan Efek:** Tidak boleh mengubah target translasi scroll kamera utama.
- **Mobile & Reduced Motion:** *Mobile / Touch:* Dinonaktifkan 100%. *Reduced:* Dinonaktifkan.
- **Cleanup & Resize:** Event listener `mousemove` dan `pointerleave` di-revert saat unmount.
- **Komponen Pemilik:** `src/scene/CameraRig.tsx`.
- **Acceptance & Uji:** Kursor digerakkan cepat tidak menyebabkan kamera bergetar atau clipping.

### ANM-008: Kemunculan Header Persisten (Header Enter)
- **Elemen & Section:** Navigasi atas (`#site-header`).
- **Tujuan Visual:** Menghadirkan navigasi secara elegan saat aplikasi siap.
- **Pemicu:** Inisialisasi awal aplikasi selesai (`appMounted`).
- **Keadaan Awal & Akhir:** `y: -16px, opacity: 0` → `y: 0px, opacity: 1`.
- **Property:** `transform: translateY()`, `opacity`.
- **Durasi & Easing:** Durasi 350ms, easing `power2.out`.
- **Perilaku Reverse / Fast-Scroll:** Satu kali saat pembukaan halaman.
- **Hubungan Efek:** Berjalan serentak dengan permulaan intro Hero (ANM-013).
- **Mobile & Reduced Motion:** *Mobile:* 250ms. *Reduced:* Langsung tampil `opacity: 1, y: 0`.
- **Cleanup & Resize:** Transisi diakhiri dengan class CSS permanen.
- **Komponen Pemilik:** `src/components/layout/Header.tsx`.
- **Acceptance & Uji:** Header dapat difokuskan oleh keyboard sejak detik pertama.

### ANM-009: Latar Belakang Header Scrolled (Header Blur/Glass)
- **Elemen & Section:** Header (`#site-header`).
- **Tujuan Visual:** Memastikan kontras teks menu saat konten lain melintas di bawahnya.
- **Pemicu:** Scroll vertikal melewati jarak 40px dari atas.
- **Keadaan Awal & Akhir:** Background transparan → latar kaca gelap (`--color-surface-glass`) + border bawah.
- **Property:** `background-color`, `backdrop-filter`, `border-bottom-color`.
- **Durasi & Easing:** 180ms ease-out.
- **Perilaku Reverse / Fast-Scroll:** Kembali transparan saat posisi scroll kembali < 40px.
- **Hubungan Efek:** Mengamankan keterbacaan menu di atas section S02, S04, dan S05.
- **Mobile & Reduced Motion:** Identik di semua mode demi keterbacaan.
- **Cleanup & Resize:** Dikontrol oleh class CSS `.is-scrolled` via scroll listener pasif.
- **Komponen Pemilik:** `src/components/layout/Header.tsx`.
- **Acceptance & Uji:** Scroll turun 50px mengaktifkan blur; scroll naik ke atas mengembalikan transparansi.

### ANM-010: Indikator Sorot Navigasi (Nav Link Underline)
- **Elemen & Section:** Garis bawah tautan menu header (`.nav-link::after`).
- **Tujuan Visual:** Umpan balik visual saat tautan diarahkan atau menerima fokus.
- **Pemicu:** Event `mouseenter`, `focus-visible`, atau status rute aktif.
- **Keadaan Awal & Akhir:** `scaleX(0)` → `scaleX(1)`.
- **Property:** `transform: scaleX()`.
- **Durasi & Easing:** 160ms, easing `power2.out`, titik tumpu dari kiri (`transform-origin: left`).
- **Perilaku Reverse / Fast-Scroll:** Menutup dari kanan ke kiri pada `mouseleave` / `blur`.
- **Hubungan Efek:** Tidak menggeser posisi teks tautan.
- **Mobile & Reduced Motion:** *Mobile:* Hanya saat tap aktif. *Reduced:* Ganti warna teks tanpa animasi transform.
- **Cleanup & Resize:** Murni CSS transition.
- **Komponen Pemilik:** `src/components/layout/Header.tsx`.
- **Acceptance & Uji:** Fokus keyboard via Tab memunculkan garis bawah secara instan dan jelas.

### ANM-011: Buka-Tutup Menu Mobile (Mobile Menu Drawer)
- **Elemen & Section:** Panel drawer navigasi mobile (`#mobile-menu-drawer`).
- **Tujuan Visual:** Transisi pembukaan menu layar sentuh yang cepat dan responsif.
- **Pemicu:** Klik tombol toggle menu hamburger.
- **Keadaan Awal & Akhir:** `y: -12px, opacity: 0, visibility: hidden` → `y: 0, opacity: 1, visibility: visible`.
- **Property:** `opacity`, `transform`, `visibility`.
- **Durasi & Easing:** 220ms, easing `power2.out`.
- **Perilaku Reverse / Fast-Scroll:** Menutup seketika saat tombol close atau tombol Escape ditekan.
- **Hubungan Efek:** Mengaktifkan focus-trap di dalam drawer saat terbuka.
- **Mobile & Reduced Motion:** *Reduced:* Perubahan opacity 100ms tanpa translasi sumbu Y.
- **Cleanup & Resize:** Mengembalikan fokus ke tombol pembuka saat drawer ditutup.
- **Komponen Pemilik:** `src/components/layout/MobileMenu.tsx`.
- **Acceptance & Uji:** Menekan Escape menutup drawer dan mengembalikan fokus keyboard dengan sempurna.

### ANM-012: Bar Kemajuan Perjalanan (Cosmic Journey Progress)
- **Elemen & Section:** Garis indikator kemajuan scroll tipis di tepi atas/samping (`#journey-progress`).
- **Tujuan Visual:** Memberikan orientasi spasial posisi pengguna dalam alur narasi kosmik.
- **Pemicu:** Progress scroll seluruh dokumen (`0.0` s/d `1.0`).
- **Keadaan Awal & Akhir:** `scaleX(0)` → `scaleX(1)`.
- **Property:** `transform: scaleX()`.
- **Durasi & Easing:** Terikat scrub linear.
- **Perilaku Reverse / Fast-Scroll:** Mengikuti posisi scroll aktual secara instan.
- **Hubungan Efek:** Murni elemen dekoratif berstatus `aria-hidden="true"`.
- **Mobile & Reduced Motion:** *Reduced / Mobile:* Opsional, dapat disembunyikan untuk menjaga kesederhanaan.
- **Cleanup & Resize:** Disinkronkan dengan total scroll height dokumen.
- **Komponen Pemilik:** `src/components/layout/Header.tsx`.
- **Acceptance & Uji:** Nilai scaleX mencapai 1.0 tepat saat scroll menyentuh batas bawah footer.

---

## 3. Bagian 2: Scene 01 — Orbit & Hero (ANM-013 s/d ANM-022)

### ANM-013: Judul Nama XEVRYN Reveal per Huruf (Hero)
- **Elemen & Section:** Huruf-huruf judul brand `#hero-brand-name span`.
- **Tujuan Visual:** Pintu masuk dramatis yang mengukir nama brand ke ruang hampa.
- **Pemicu:** Halaman selesai di-mount (`window load` / font ready).
- **Keadaan Awal & Akhir:** `y: 100%, opacity: 0` → `y: 0%, opacity: 1`.
- **Property:** `transform: translateY()`, `opacity`.
- **Durasi & Easing:** 650ms per huruf, stagger 28ms antar-huruf, easing `power3.out`.
- **Perilaku Reverse / Fast-Scroll:** Tidak dapat dibalik (intro sekali putar). Jika pengguna langsung scroll, animasi langsung meloncat ke status akhir.
- **Hubungan Efek:** Beriringan dengan blur huruf (ANM-014) dan mendahului peran (ANM-015).
- **Mobile & Reduced Motion:** *Mobile:* Stagger 20ms. *Reduced:* Tampil instan tanpa pemisahan huruf.
- **Cleanup & Resize:** SplitText dibersihkan dan mengembalikan teks utuh ke accessibility tree.
- **Komponen Pemilik:** `src/components/motion/AnimatedHeading.tsx`.
- **Acceptance & Uji:** Nama terbaca utuh dalam waktu ≤ 1.2 detik. Screen reader membaca "XEVRYN" sebagai satu kata.

### ANM-014: Efek Blur Huruf Hero (Hero Character Blur)
- **Elemen & Section:** Huruf judul nama `#hero-brand-name span`.
- **Tujuan Visual:** Mensimulasikan fokus lensa kamera observatorium saat menangkap objek jauh.
- **Pemicu:** Berbarengan dengan ANM-013.
- **Keadaan Awal & Akhir:** `filter: blur(6px)` → `filter: blur(0px)`.
- **Property:** `filter: blur()`.
- **Durasi & Easing:** 650ms, easing `power2.out`.
- **Perilaku Reverse / Fast-Scroll:** Langsung 0px jika diinterupsi scroll.
- **Hubungan Efek:** Diterapkan khusus pada pembungkus huruf dekoratif.
- **Mobile & Reduced Motion:** *Mobile:* Dinonaktifkan (beban berat filter raster). *Reduced:* Dinonaktifkan.
- **Cleanup & Resize:** Properti filter dihapus tuntas setelah selesai.
- **Komponen Pemilik:** `src/components/motion/AnimatedHeading.tsx`.
- **Acceptance & Uji:** Teks menjadi tajam sempurna tanpa sisa blur yang membuat buram.

### ANM-015: Label Peran Profesional (Hero Role Label)
- **Elemen & Section:** Sub-heading peran `#hero-role-label`.
- **Tujuan Visual:** Memperjelas bidang keahlian XEVRYN segera setelah nama muncul.
- **Pemicu:** Terpicu 180ms setelah huruf pertama ANM-013 dimulai.
- **Keadaan Awal & Akhir:** `y: 12px, opacity: 0` → `y: 0px, opacity: 1`.
- **Property:** `transform: translateY()`, `opacity`.
- **Durasi & Easing:** 450ms, easing `power2.out`.
- **Perilaku Reverse / Fast-Scroll:** Mengikuti aturan pemotongan intro.
- **Hubungan Efek:** Muncul sebelum tombol CTA (ANM-016).
- **Mobile & Reduced Motion:** *Mobile:* 300ms. *Reduced:* Tampil instan.
- **Cleanup & Resize:** Transform di-clear menjadi status inline normal.
- **Komponen Pemilik:** `src/sections/Hero.tsx`.
- **Acceptance & Uji:** Tidak tumpang tindih dengan nama brand pada semua breakpoint.

### ANM-016: Grup Tombol CTA Utama (Hero CTA Group)
- **Elemen & Section:** Wadah tombol `#hero-cta-group`.
- **Tujuan Visual:** Menyediakan akses instan ke karya dan kontak.
- **Pemicu:** Terpicu 250ms setelah ANM-015.
- **Keadaan Awal & Akhir:** `y: 10px, opacity: 0` → `y: 0px, opacity: 1`.
- **Property:** `transform: translateY()`, `opacity`.
- **Durasi & Easing:** 350ms, easing `power2.out`.
- **Perilaku Reverse / Fast-Scroll:** Tombol sudah dapat diklik bahkan sebelum transisi selesai.
- **Hubungan Efek:** Mengakhiri rangkaian intro visual Hero.
- **Mobile & Reduced Motion:** *Mobile:* 250ms. *Reduced:* Tampil instan.
- **Cleanup & Resize:** Elemen mempertahankan posisi layout flex/grid.
- **Komponen Pemilik:** `src/sections/Hero.tsx`.
- **Acceptance & Uji:** Tombol langsung menerima klik/tap tanpa penundaan pointer-events.

### ANM-017: Intensitas Rim Light Planet (Planet Rim Lighting)
- **Elemen & Section:** Shader material atmosfer planet (`AtmosphereMaterial`).
- **Tujuan Visual:** Planet perlahan menyala dari bayang-bayang fajar kosmik.
- **Pemicu:** Berbarengan dengan inisialisasi Hero.
- **Keadaan Awal & Akhir:** Intensitas rim light `0.3` → `1.0`.
- **Property:** Shader uniform `uRimIntensity`.
- **Durasi & Easing:** 900ms, easing `power2.out`.
- **Perilaku Reverse / Fast-Scroll:** Tidak berkedip jika di-scroll cepat.
- **Hubungan Efek:** Berjalan serentak dengan rotasi planet (ANM-006).
- **Mobile & Reduced Motion:** *Reduced:* Langsung bernilai `1.0`.
- **Cleanup & Resize:** Nilai uniform disimpan dalam ref.
- **Komponen Pemilik:** `src/scene/Planet.tsx`.
- **Acceptance & Uji:** Cahaya rim tidak mengalami overexposure yang memutihkan layar.

### ANM-018: Garis Orbit Kosmik (Hero Orbit Line)
- **Elemen & Section:** Garis elips orbit SVG dekoratif (`#hero-orbit-svg`).
- **Tujuan Visual:** Memperkuat kesan gravitasi dan jalur pergerakan planet.
- **Pemicu:** Enter scene Hero.
- **Keadaan Awal & Akhir:** `stroke-dashoffset: 100%` → `0%`.
- **Property:** `stroke-dashoffset`.
- **Durasi & Easing:** 900ms, easing `power2.inOut`.
- **Perilaku Reverse / Fast-Scroll:** Ditarik kembali jika di-scroll mundur ke posisi 0.
- **Hubungan Efek:** Garis dekoratif berstatus `aria-hidden="true"`.
- **Mobile & Reduced Motion:** *Mobile / Reduced:* Dinonaktifkan penuh.
- **Cleanup & Resize:** Path SVG dihitung ulang saat resize.
- **Komponen Pemilik:** `src/sections/Hero.tsx`.
- **Acceptance & Uji:** Garis orbit tipis dan tidak menabrak teks judul.

### ANM-019: Isyarat Scroll (Hero Scroll Cue)
- **Elemen & Section:** Ikon panah/garis isyarat scroll `#hero-scroll-cue`.
- **Tujuan Visual:** Memberi petunjuk visual halus bagi pengunjung untuk mulai menelusuri ke bawah.
- **Pemicu:** Setelah intro Hero selesai dan scroll masih di posisi 0.
- **Keadaan Awal & Akhir:** Translasi Y `0px` → `6px` mengambang lembut.
- **Property:** `transform: translateY()`, `opacity`.
- **Durasi & Easing:** Siklus 2.0 detik, looping bolak-balik (`yoyo: true, repeat: -1`).
- **Perilaku Reverse / Fast-Scroll:** Memudar keluar seketika (`opacity: 0`) saat scroll > 30px.
- **Hubungan Efek:** Tidak menghalangi interaksi tombol utama.
- **Mobile & Reduced Motion:** *Mobile:* Durasi siklus sama. *Reduced:* Ikon statis tanpa animasi mengambang.
- **Cleanup & Resize:** Animasi dihentikan permanen setelah user scroll pertama kali.
- **Komponen Pemilik:** `src/sections/Hero.tsx`.
- **Acceptance & Uji:** Menghilang begitu halaman di-scroll dan tidak muncul kembali di tengah konten.

### ANM-020: Transisi Keluar Teks Hero (Hero Text Exit)
- **Elemen & Section:** Seluruh kontainer teks Hero `#hero-content-wrapper`.
- **Tujuan Visual:** Menyerahkan panggung secara elegan saat pengguna mulai bergerak ke S02.
- **Pemicu:** Progress scroll S01 dari `p: 0.18` sampai `p: 0.80`.
- **Keadaan Awal & Akhir:** `y: 0vh, opacity: 1` → `y: -18vh, opacity: 0`.
- **Property:** `transform: translateY()`, `opacity`.
- **Durasi & Easing:** Terikat scrub scroll (`scrub: 0.3`).
- **Perilaku Reverse / Fast-Scroll:** Mengembalikan teks ke posisi awal saat scroll ke paling atas.
- **Hubungan Efek:** Bekerja harmonis dengan pendekatan kamera ke planet (ANM-021).
- **Mobile & Reduced Motion:** *Mobile:* `y: 0px` → `-30px`. *Reduced:* Teks keluar melalui scroll alami dokumen biasa.
- **Cleanup & Resize:** Nilai transform di-revert saat ScrollTrigger di-kill.
- **Komponen Pemilik:** `src/sections/Hero.tsx`.
- **Acceptance & Uji:** Teks tidak hilang mendadak pada saat pertama kali dimuat.

### ANM-021: Pendekatan Kamera ke Planet (Hero Planet Approach)
- **Elemen & Section:** Kamera 3D & Planet (`CameraRig` / `Planet`).
- **Tujuan Visual:** Memberi pengalaman sinematik meluncur mendekati permukaan planet.
- **Pemicu:** Progress scroll S01 dari `p: 0.18` sampai `p: 1.00`.
- **Keadaan Awal & Akhir:** Framing radius planet membesar 1.0x → 1.3x bidang layar.
- **Property:** Kamera `position.z` maju dari `5.5` ke `4.2`.
- **Durasi & Easing:** Terikat scrub scroll (`scrub: 0.35`).
- **Perilaku Reverse / Fast-Scroll:** Reversibel penuh mengikuti posisi scroll.
- **Hubungan Efek:** Menjaga planet tetap berada di sisi kanan/bawah agar tidak menutupi teks keluar.
- **Mobile & Reduced Motion:** *Mobile:* Perbesaran dibatasi ke 1.08x. *Reduced:* Kamera tetap diam.
- **Cleanup & Resize:** Nilai Z kamera diatur ulang saat breakpoint berubah.
- **Komponen Pemilik:** `src/scene/CameraRig.tsx`.
- **Acceptance & Uji:** Pergerakan kamera halus tanpa clipping geometri planet.

### ANM-022: Handoff Hero Menuju About (Hero to About Boundary)
- **Elemen & Section:** Koordinat target kamera (`SceneStateRef`).
- **Tujuan Visual:** Menghubungkan scene S01 dengan S02 tanpa jeda visual.
- **Pemicu:** Progress scroll S01 dari `p: 0.70` sampai `p: 1.00`.
- **Keadaan Awal & Akhir:** Posisi kamera `x: 0` bergeser halus ke `x: -2.0`.
- **Property:** `cameraRig.position.x`.
- **Durasi & Easing:** Terikat scrub scroll (`scrub: 0.25`).
- **Perilaku Reverse / Fast-Scroll:** Transisi mulus bolak-balik tanpa loncatan posisi.
- **Hubungan Efek:** Menggeser planet ke tepi kiri luar bingkai saat S02 masuk.
- **Mobile & Reduced Motion:** *Mobile:* Translasi kamera ditiadakan. *Reduced:* Statis.
- **Cleanup & Resize:** Disinkronkan dengan transisi section S02.
- **Komponen Pemilik:** `src/scene/CameraRig.tsx`.
- **Acceptance & Uji:** Sambungan antara batas bawah Hero dan batas atas About tidak melompat.

---

## 4. Bagian 3: Scene 02 — Perkenalan & About (ANM-023 s/d ANM-030)

### ANM-023: Judul About Masked Reveal
- **Elemen & Section:** Judul section `#about-heading`.
- **Tujuan Visual:** Membuka bab perkenalan dengan potongan tipografi yang berwibawa.
- **Pemicu:** Section About menyentuh viewport (`top 75%`).
- **Keadaan Awal & Akhir:** `y: 100%, opacity: 0` → `y: 0%, opacity: 1` di dalam wadah `overflow: hidden`.
- **Property:** `transform: translateY()`, `opacity`.
- **Durasi & Easing:** 650ms, easing `power3.out`.
- **Perilaku Reverse / Fast-Scroll:** Satu kali per kemunculan (`once: true`).
- **Hubungan Efek:** Mendahului kemunculan baris bio (ANM-024).
- **Mobile & Reduced Motion:** *Mobile:* 450ms. *Reduced:* Langsung tampil 100%.
- **Cleanup & Resize:** Masking dilepas setelah animasi selesai untuk mencegah pemotongan huruf panjang.
- **Komponen Pemilik:** `src/sections/About.tsx`.
- **Acceptance & Uji:** Teks judul tersusun rapi dan tidak terpotong pada huruf dengan descender (g, j, y).

### ANM-024: Paragraf Bio Reveal per Baris
- **Elemen & Section:** Baris-baris kalimat bio `.about-bio-line`.
- **Tujuan Visual:** Pengalaman membaca yang terstruktur dan mengundang fokus pembaca.
- **Pemicu:** Mengikuti ANM-023 dengan jeda 100ms.
- **Keadaan Awal & Akhir:** `y: 18px, opacity: 0` → `y: 0px, opacity: 1`.
- **Property:** `transform: translateY()`, `opacity`.
- **Durasi & Easing:** 550ms per baris, stagger 100ms antar-baris, easing `power2.out`.
- **Perilaku Reverse / Fast-Scroll:** Teks tetap tampil utuh setelah selesai.
- **Hubungan Efek:** Membawa pengguna masuk ke Zona Ketenangan Membaca (p: 0.25–0.75).
- **Mobile & Reduced Motion:** *Mobile:* Perpindahan 10px, stagger 60ms. *Reduced:* Tampil utuh instan.
- **Cleanup & Resize:** Elemen di-revert ke teks paragraf HTML normal jika jendela di-resize.
- **Komponen Pemilik:** `src/components/motion/AnimatedLines.tsx`.
- **Acceptance & Uji:** Seluruh teks bio dapat diseleksi dan disalin dengan kursor tanpa kerusakan layout.

### ANM-025: Penekanan Kata Kunci Narasi (Text Highlighting)
- **Elemen & Section:** Kata kunci penting di dalam bio `.bio-highlight`.
- **Tujuan Visual:** Mengarahkan perhatian pada fokus teknis XEVRYN.
- **Pemicu:** Progress scroll S02 dari `p: 0.10` sampai `p: 0.50`.
- **Keadaan Awal & Akhir:** Warna teks `--color-text-muted` (`#AAB4CA`) → `--color-text-main` (`#F2F3F7`) dengan pendaran biru tipis.
- **Property:** `color`, `text-shadow`.
- **Durasi & Easing:** Terikat scrub scroll (`scrub: 0.2`).
- **Perilaku Reverse / Fast-Scroll:** Reversibel penuh.
- **Hubungan Efek:** Kontras awal tetap memenuhi kriteria WCAG AA (> 4.5:1).
- **Mobile & Reduced Motion:** *Mobile / Reduced:* Kata kunci langsung menggunakan warna utama `--color-text-main`.
- **Cleanup & Resize:** Styling diatur melalui transisi CSS berbasis class.
- **Komponen Pemilik:** `src/sections/About.tsx`.
- **Acceptance & Uji:** Perubahan warna kontras tidak membuat teks bergetar.

### ANM-026: Reveal Foto Profil Resmi (Opsional)
- **Elemen & Section:** Wadah foto profil `#about-portrait-frame`.
- **Tujuan Visual:** Menampilkan wajah pemilik portofolio secara profesional.
- **Pemicu:** Section About memasuki viewport.
- **Keadaan Awal & Akhir:** `opacity: 0, scale: 1.04` → `opacity: 1, scale: 1.00`.
- **Property:** `opacity`, `transform: scale()`.
- **Durasi & Easing:** 700ms, easing `power2.out`.
- **Perilaku Reverse / Fast-Scroll:** Satu kali putar.
- **Hubungan Efek:** Jika foto belum disediakan (`CONTENT_PENDING`), komponen ini disembunyikan bersih tanpa celah.
- **Mobile & Reduced Motion:** *Mobile:* Fade-in sederhana tanpa scale. *Reduced:* Tampil statis.
- **Cleanup & Resize:** Dimensi frame terkunci dengan aspect-ratio.
- **Komponen Pemilik:** `src/sections/About.tsx`.
- **Acceptance & Uji:** Tidak ada layout shift saat gambar selesai dimuat.

### ANM-027: Parallax Halus Foto Profil
- **Elemen & Section:** Elemen gambar di dalam frame `#about-portrait-image`.
- **Tujuan Visual:** Efek kedalaman visual fotografi potret.
- **Pemicu:** Scroll vertikal sepanjang section About.
- **Keadaan Awal & Akhir:** Translasi Y `24px` → `-24px`.
- **Property:** `transform: translateY()`.
- **Durasi & Easing:** Terikat scrub scroll (`scrub: 0.2`).
- **Perilaku Reverse / Fast-Scroll:** Reversibel penuh.
- **Hubungan Efek:** Frame memiliki `overflow: hidden` sehingga crop tidak memotong wajah penting.
- **Mobile & Reduced Motion:** *Mobile / Reduced:* Dinonaktifkan penuh.
- **Cleanup & Resize:** Dihitung ulang saat ukuran viewport berubah.
- **Komponen Pemilik:** `src/sections/About.tsx`.
- **Acceptance & Uji:** Foto tidak keluar dari batas bingkai frame.

### ANM-028: Reveal Metadata & Spesialisasi
- **Elemen & Section:** Item daftar keahlian ringkas `.about-pill`.
- **Tujuan Visual:** Mempertegas domain teknis inti dengan tag visual yang rapi.
- **Pemicu:** Terpicu setelah baris bio selesai diungkap.
- **Keadaan Awal & Akhir:** `y: 8px, opacity: 0` → `y: 0px, opacity: 1`.
- **Property:** `transform`, `opacity`.
- **Durasi & Easing:** 350ms, stagger 70ms, easing `power2.out`.
- **Perilaku Reverse / Fast-Scroll:** Menetap setelah muncul.
- **Hubungan Efek:** Membentuk jembatan konten menuju Work Showcase.
- **Mobile & Reduced Motion:** *Mobile:* Stagger 40ms. *Reduced:* Tampil instan.
- **Cleanup & Resize:** Disinkronkan dengan flexbox wrap.
- **Komponen Pemilik:** `src/sections/About.tsx`.
- **Acceptance & Uji:** Tag tersusun rapi tanpa patah baris kata tunggal.

### ANM-029: Rotasi Latar Belakang Orbit (About Background)
- **Elemen & Section:** Benda langit di latar belakang scene S02.
- **Tujuan Visual:** Menjaga dinamika ruang angkasa tanpa mengalihkan perhatian baca.
- **Pemicu:** Scroll sepanjang section About.
- **Keadaan Awal & Akhir:** Rotasi parsial kamera `12°` ke kanan.
- **Property:** `cameraRig.rotation.y`.
- **Durasi & Easing:** Terikat scrub scroll sangat lambat (`scrub: 0.4`).
- **Perilaku Reverse / Fast-Scroll:** Reversibel penuh.
- **Hubungan Efek:** Memastikan area teks selalu berada di atas latar gelap pekat.
- **Mobile & Reduced Motion:** *Mobile / Reduced:* Dinonaktifkan (kamera diam).
- **Cleanup & Resize:** Reset rotasi saat keluar dari scene.
- **Komponen Pemilik:** `src/scene/CameraRig.tsx`.
- **Acceptance & Uji:** Teks tetap nyaman dibaca sepanjang scroll berlangsung.

### ANM-030: Transisi Redup Nebula (About to Warp Exit)
- **Elemen & Section:** Shader nebula latar belakang (`NebulaMesh`).
- **Tujuan Visual:** Meredupkan cahaya gas kosmik sebagai persiapan visual memasuki Warp Tunnel.
- **Pemicu:** Progress scroll S02 dari `p: 0.75` sampai `p: 1.00`.
- **Keadaan Awal & Akhir:** `opacity: 1.0` → `opacity: 0.25`.
- **Property:** Shader uniform `uNebulaDensity`.
- **Durasi & Easing:** Terikat scrub scroll (`scrub: 0.25`).
- **Perilaku Reverse / Fast-Scroll:** Cahaya kembali terang saat scroll ke atas.
- **Hubungan Efek:** Mengalihkan kontras ke bintang-bintang yang akan meregang di S03.
- **Mobile & Reduced Motion:** *Mobile:* Crossfade sederhana. *Reduced:* Densitas konstan rendah.
- **Cleanup & Resize:** Nilai uniform dipulihkan saat unmount.
- **Komponen Pemilik:** `src/scene/Nebula.tsx`.
- **Acceptance & Uji:** Layar tidak menjadi hitam mati; bintang tetap terlihat jelas.

---

## 5. Bagian 4: Scene 03 — Warp Speed Bridge (ANM-031 s/d ANM-034)

### ANM-031: Peregangan Bintang Awal (Warp Streak Onset)
- **Elemen & Section:** Shader partikel bintang (`WarpStars`).
- **Tujuan Visual:** Efek akselerasi gravitasi saat bintang mulai meregang menjadi garis cahaya.
- **Pemicu:** Progress scroll S03 dari `p: 0.00` sampai `p: 0.25`.
- **Keadaan Awal & Akhir:** Panjang garis bintang `1.0x` (titik) → `4.0x` (garis pendek).
- **Property:** Shader uniform `uStreakLength`.
- **Durasi & Easing:** Terikat scrub scroll (`scrub: 0.2`).
- **Perilaku Reverse / Fast-Scroll:** Kembali menjadi titik normal jika scroll dibalik.
- **Hubungan Efek:** **Bebas strobo: dilarang ada kilatan putih layar penuh.**
- **Mobile & Reduced Motion:** *Mobile:* Peregangan dibatasi maksimal 2.0x. *Reduced:* Ditiadakan (crossfade gradien).
- **Cleanup & Resize:** Partikel kembali ke status default saat keluar dari S03.
- **Komponen Pemilik:** `src/scene/Warp.tsx`.
- **Acceptance & Uji:** Tidak memicu kedipan fotosensitif; garis bintang menyebar radial dari pusat.

### ANM-032: Akselerasi Maju Kamera (Warp Camera Forward)
- **Elemen & Section:** Dudukan kamera 3D (`CameraRig`).
- **Tujuan Visual:** Memberikan sensasi dorongan fisik meluncur ke depan (*dolly forward*).
- **Pemicu:** Progress scroll S03 dari `p: 0.10` sampai `p: 0.65`.
- **Keadaan Awal & Akhir:** Posisi Z kamera `4.2` → `1.2`, FOV `50°` → `68°`.
- **Property:** `camera.position.z`, `camera.fov`.
- **Durasi & Easing:** Terikat scrub scroll (`scrub: 0.3`).
- **Perilaku Reverse / Fast-Scroll:** Reversibel penuh.
- **Hubungan Efek:** Bekerja serentak dengan puncak streak bintang (ANM-033).
- **Mobile & Reduced Motion:** *Mobile:* Kamera tetap diam; FOV tetap 50°. *Reduced:* Dinonaktifkan.
- **Cleanup & Resize:** `camera.updateProjectionMatrix()` wajib dipanggil pada setiap perubahan FOV.
- **Komponen Pemilik:** `src/scene/CameraRig.tsx`.
- **Acceptance & Uji:** Matriks proyeksi kamera terupdate tanpa distorsi aspek rasio.

### ANM-033: Puncak Terowongan Warp (Warp Tunnel Peak)
- **Elemen & Section:** Shader partikel warp (`WarpStars`).
- **Tujuan Visual:** Puncak klimaks visual kecepatan ruang angkasa sebelum tiba di etalase karya.
- **Pemicu:** Progress scroll S03 dari `p: 0.25` sampai `p: 0.65`.
- **Keadaan Awal & Akhir:** Faktor peregangan mencapai puncak `8.0x` dengan rona violet kosmik.
- **Property:** `uStreakLength = 8.0`, `uColorShift = 1.0`.
- **Durasi & Easing:** Terikat scrub scroll.
- **Perilaku Reverse / Fast-Scroll:** Segera mereda saat scroll dihentikan atau dibalik.
- **Hubungan Efek:** Hanya ada satu puncak tunggal; tidak ada burst ganda.
- **Mobile & Reduced Motion:** *Mobile / Reduced:* Dinonaktifkan penuh demi kenyamanan dan baterai.
- **Cleanup & Resize:** Shader uniform dikembalikan ke netral saat keluar.
- **Komponen Pemilik:** `src/scene/Warp.tsx`.
- **Acceptance & Uji:** Frame rate tetap stabil pada target minimal 50 FPS saat puncak terowongan.

### ANM-034: Pemulihan Kecepatan Normal (Warp Recovery & Reset)
- **Elemen & Section:** Shader partikel bintang & kamera.
- **Tujuan Visual:** Deselerasi anggun memasuki ruang angkasa baru tempat karya-karya berada.
- **Pemicu:** Progress scroll S03 dari `p: 0.65` sampai `p: 1.00`.
- **Keadaan Awal & Akhir:** Bintang memendek kembali `8.0x` → `1.0x`, FOV `68°` → `50°`, posisi Z kamera `1.2` → `4.8`.
- **Property:** `uStreakLength`, `camera.fov`, `camera.position.z`.
- **Durasi & Easing:** Terikat scrub scroll (`scrub: 0.25`).
- **Perilaku Reverse / Fast-Scroll:** Reset instan jika pengguna melakukan fast-scroll melintasi scene.
- **Hubungan Efek:** Menyerahkan fokus visual secara bersih ke judul Work Showcase (ANM-035).
- **Mobile & Reduced Motion:** *Reduced:* Crossfade gradien 200ms.
- **Cleanup & Resize:** Proyeksi kamera dipastikan normal 50°.
- **Komponen Pemilik:** `src/scene/Warp.tsx`.
- **Acceptance & Uji:** Saat S04 mulai terlihat, seluruh efek warp sudah bersih 100%.

---

## 6. Bagian 5: Scene 04 — Destinasi Karya (ANM-035 s/d ANM-044)

### ANM-035: Judul Work Showcase Reveal
- **Elemen & Section:** Judul utama karya `#work-heading`.
- **Tujuan Visual:** Mengumumkan kedatangan di etalase karya terpilih.
- **Pemicu:** Section Work memasuki viewport (`top 80%`).
- **Keadaan Awal & Akhir:** `y: 100%, opacity: 0` → `y: 0%, opacity: 1`.
- **Property:** `transform: translateY()`, `opacity`.
- **Durasi & Easing:** 650ms, easing `power3.out`.
- **Perilaku Reverse / Fast-Scroll:** Satu kali per tampilan.
- **Hubungan Efek:** Membuka panggung untuk pergerakan track karya (ANM-036).
- **Mobile & Reduced Motion:** *Mobile:* Reveal per kata 400ms. *Reduced:* Langsung tampil 100%.
- **Cleanup & Resize:** Menjaga teks tetap menjadi satu tag `<h2>` semantik.
- **Komponen Pemilik:** `src/sections/Work.tsx`.
- **Acceptance & Uji:** Teks judul terbaca jelas dan tidak tertutup kartu pertama.

### ANM-036: Jalur Horizontal Karya (Work Horizontal Track)
- **Elemen & Section:** Wadah jalur kartu proyek `#work-track`.
- **Tujuan Visual:** Menjelajahi proyek unggulan dengan perpindahan horizontal yang megah di desktop.
- **Pemicu:** Scroll vertikal di dalam section S04 yang di-pinning.
- **Keadaan Awal & Akhir:** Translasi X `0px` → `-(scrollWidth - clientWidth)px`.
- **Property:** `transform: translateX()`.
- **Durasi & Easing:** Terikat scrub scroll proporsional terhadap total lebar overflow.
- **Perilaku Reverse / Fast-Scroll:** Reversibel penuh. Pin dilepaskan saat track mencapai batas akhir.
- **Hubungan Efek:** **Hanya aktif jika terdapat overflow lebar dan layar desktop (≥1024px).**
- **Mobile & Reduced Motion:** *Mobile / Tablet / Reduced:* **Dinonaktifkan penuh.** Kartu tersusun secara vertikal alami tanpa pin.
- **Cleanup & Resize:** Total `scrollWidth` dihitung ulang setiap resize via debounced listener.
- **Komponen Pemilik:** `src/components/projects/ProjectTrack.tsx`.
- **Acceptance & Uji:** Tidak ada ruang kosong berlebih setelah kartu terakhir; scroll tidak terkunci.

### ANM-037: Fokus Kartu Aktif di Tengah Viewport
- **Elemen & Section:** Kartu proyek `.project-card`.
- **Tujuan Visual:** Mengarahkan pandangan ke karya yang sedang berada di titik fokus utama.
- **Pemicu:** Pusat kartu berada dalam jarak ±20% dari pusat layar horizontal.
- **Keadaan Awal & Akhir:** Skala `0.96`, opacity `0.75` → Skala `1.00`, opacity `1.00`.
- **Property:** `transform: scale()`, `opacity`.
- **Durasi & Easing:** 250ms, easing `power2.out`.
- **Perilaku Reverse / Fast-Scroll:** Mengikuti pergerakan horizontal track secara mulus.
- **Hubungan Efek:** Berpadu dengan pembaruan nomor indeks proyek (ANM-043).
- **Mobile & Reduced Motion:** *Mobile / Reduced:* Semua kartu memiliki skala 1.0 dan opacity 1.0 statis.
- **Cleanup & Resize:** Layout width kartu tidak berubah (transform murni visual).
- **Komponen Pemilik:** `src/components/projects/ProjectCard.tsx`.
- **Acceptance & Uji:** Kartu di tengah membesar anggun tanpa mendorong kartu lain (*no layout reflow*).

### ANM-038: Reveal Gambar Sampul Kartu (Cover Image Reveal)
- **Elemen & Section:** Wadah gambar kartu `.project-card-cover`.
- **Tujuan Visual:** Mengungkap tangkapan layar karya dengan transisi sinematik.
- **Pemicu:** Kartu proyek memasuki viewport.
- **Keadaan Awal & Akhir:** `scale: 1.03, opacity: 0` → `scale: 1.00, opacity: 1`.
- **Property:** `transform: scale()`, `opacity`.
- **Durasi & Easing:** 550ms, easing `power2.out`.
- **Perilaku Reverse / Fast-Scroll:** Menetap setelah muncul pertama kali.
- **Hubungan Efek:** Didahului oleh poster gradien jika gambar sedang di-load.
- **Mobile & Reduced Motion:** *Mobile:* Fade-in 300ms tanpa scale. *Reduced:* Langsung tampil 100%.
- **Cleanup & Resize:** Aspek rasio gambar terkunci pada 16:10.
- **Komponen Pemilik:** `src/components/projects/ProjectCard.tsx`.
- **Acceptance & Uji:** Gambar tampil tajam tanpa distorsi stretch atau layout shift.

### ANM-039: Reveal Metadata & Tag Proyek
- **Elemen & Section:** Blok informasi kartu `.project-card-meta`.
- **Tujuan Visual:** Menyajikan judul, peran, dan tag teknologi segera setelah cover terlihat.
- **Pemicu:** 120ms setelah ANM-038 dimulai.
- **Keadaan Awal & Akhir:** `y: 10px, opacity: 0` → `y: 0px, opacity: 1`.
- **Property:** `transform: translateY()`, `opacity`.
- **Durasi & Easing:** 350ms, easing `power2.out`.
- **Perilaku Reverse / Fast-Scroll:** Menetap setelah muncul.
- **Hubungan Efek:** Memastikan informasi terbaca jelas sebelum pengguna memutuskan untuk klik.
- **Mobile & Reduced Motion:** *Mobile:* 250ms. *Reduced:* Tampil instan.
- **Cleanup & Resize:** Transform dibersihkan ke status inline default.
- **Komponen Pemilik:** `src/components/projects/ProjectCard.tsx`.
- **Acceptance & Uji:** Tag tersusun dalam flex wrap dan tidak meluap keluar kartu.

### ANM-040: Efek Tilt 3D Mikro pada Kartu (Card Depth Tilt)
- **Elemen & Section:** Kartu proyek aktif `.project-card`.
- **Tujuan Visual:** Sensasi kedalaman taktil saat kursor mouse melintas di atas kartu karya.
- **Pemicu:** Event `mousemove` di atas kartu (hanya desktop fine pointer).
- **Keadaan Awal & Akhir:** Rotasi sumbu X dan Y maksimal ±3.0 derajat.
- **Property:** `transform: perspective(1000px) rotateX() rotateY()`.
- **Durasi & Easing:** Interpolasi halus lerp (`0.1`), kembali ke `(0,0)` pada `mouseleave`.
- **Perilaku Reverse / Fast-Scroll:** Reset ke netral seketika saat kursor keluar.
- **Hubungan Efek:** Tidak mempengaruhi navigasi keyboard.
- **Mobile & Reduced Motion:** *Mobile / Touch / Reduced:* **Dinonaktifkan penuh.**
- **Cleanup & Resize:** Event listener dibersihkan saat kartu unmount.
- **Komponen Pemilik:** `src/components/projects/ProjectCard.tsx`.
- **Acceptance & Uji:** Tilt tidak mengaburkan teks atau membuat teks blur di layar retina.

### ANM-041: Zoom Mikro Cover pada Hover
- **Elemen & Section:** Elemen gambar sampul `.project-card-image`.
- **Tujuan Visual:** Isyarat interaktif bahwa kartu dapat diklik untuk membuka studi kasus.
- **Pemicu:** Event hover mouse atau fokus keyboard pada tautan kartu.
- **Keadaan Awal & Akhir:** `scale: 1.00` → `scale: 1.035`.
- **Property:** `transform: scale()`.
- **Durasi & Easing:** 300ms, easing `power2.out`.
- **Perilaku Reverse / Fast-Scroll:** Kembali ke 1.00 saat hover berakhir.
- **Hubungan Efek:** Overflow terpotong rapi di batas wadah kartu (`overflow: hidden`).
- **Mobile & Reduced Motion:** *Mobile / Reduced:* Dinonaktifkan.
- **Cleanup & Resize:** Murni transisi CSS hardware-accelerated.
- **Komponen Pemilik:** `src/components/projects/ProjectCard.tsx`.
- **Acceptance & Uji:** Pembesaran gambar tidak memicu scrollbar horizontal atau pergeseran layout.

### ANM-042: Animasi Panah Tautan Detail (Detail Link Arrow)
- **Elemen & Section:** Ikon panah pada tombol eksplorasi `.project-link-arrow`.
- **Tujuan Visual:** Umpan balik arah perpindahan halaman menuju studi kasus.
- **Pemicu:** Hover pada kartu atau fokus keyboard pada tombol "Pelajari Studi Kasus".
- **Keadaan Awal & Akhir:** Translasi X `0px` → `4px`.
- **Property:** `transform: translateX()`.
- **Durasi & Easing:** 160ms, easing `power2.out`.
- **Perilaku Reverse / Fast-Scroll:** Kembali ke 0px saat fokus lepas.
- **Hubungan Efek:** Label tautan eksplisit menyebut nama proyek demi aksesibilitas.
- **Mobile & Reduced Motion:** *Reduced:* Perubahan warna tanpa translasi X.
- **Cleanup & Resize:** Murni CSS transition.
- **Komponen Pemilik:** `src/components/projects/ProjectCard.tsx`.
- **Acceptance & Uji:** Panah bergeser halus saat tombol difokuskan via tombol Tab.

### ANM-043: Pembaruan Angka Indeks Proyek
- **Elemen & Section:** Indikator nomor urut karya `#work-index-display`.
- **Tujuan Visual:** Memberikan informasi posisi kartu yang sedang aktif (misal: "01 / 03").
- **Pemicu:** Perpindahan kartu aktif berdasarkan posisi tengah viewport.
- **Keadaan Awal & Akhir:** Nilai angka berganti disertai fade transisi singkat (`opacity: 0.4` → `1.0`).
- **Property:** `opacity`.
- **Durasi & Easing:** 160ms ease-out.
- **Perilaku Reverse / Fast-Scroll:** Mengikuti kartu aktif maju maupun mundur.
- **Hubungan Efek:** Memperkuat orientasi penelusuran portofolio.
- **Mobile & Reduced Motion:** *Mobile / Reduced:* Indeks nomor tetap ditampilkan secara statis di setiap kartu.
- **Cleanup & Resize:** Diperbarui secara reaktif dari state kartu aktif.
- **Komponen Pemilik:** `src/sections/Work.tsx`.
- **Acceptance & Uji:** Nomor indeks selalu cocok dengan kartu yang sedang menjadi fokus utama.

### ANM-044: Pelepasan Pinning Jalur Karya (Work Pin Release)
- **Elemen & Section:** Section Work (`#work-section`).
- **Tujuan Visual:** Transisi natural kembali ke aliran scroll vertikal setelah seluruh karya dilintasi.
- **Pemicu:** Ujung kanan track kartu mencapai tepi kanan viewport.
- **Keadaan Awal & Akhir:** Status pin GSAP ScrollTrigger dilepas (`unpin`).
- **Property:** Posisi elemen kembali ke aliran dokumen normal.
- **Durasi & Easing:** Mengikuti laju scroll pengguna secara proporsional.
- **Perilaku Reverse / Fast-Scroll:** Mengunci kembali (`re-pin`) seketika saat pengguna scroll ke atas.
- **Hubungan Efek:** Menghubungkan S04 langsung dengan S05 tanpa spacer kosong.
- **Mobile & Reduced Motion:** *Mobile / Reduced:* Tidak pernah di-pin; alur selalu vertikal alami.
- **Cleanup & Resize:** Jarak pin dihitung ulang otomatis saat resize.
- **Komponen Pemilik:** `src/sections/Work.tsx`.
- **Acceptance & Uji:** Tidak ada area kosong atau lompatan scroll saat pin dilepaskan.

---

## 7. Bagian 6: Scene 05 — Konstelasi Keahlian (ANM-045 s/d ANM-052)

### ANM-045: Judul Keahlian Reveal
- **Elemen & Section:** Judul section keahlian `#skills-heading`.
- **Tujuan Visual:** Membuka bagian konstelasi keahlian teknis.
- **Pemicu:** Section Skills menyentuh viewport (`top 75%`).
- **Keadaan Awal & Akhir:** `y: 100%, opacity: 0` → `y: 0%, opacity: 1`.
- **Property:** `transform: translateY()`, `opacity`.
- **Durasi & Easing:** 600ms, easing `power3.out`.
- **Perilaku Reverse / Fast-Scroll:** Satu kali per kemunculan.
- **Hubungan Efek:** Mendahului kemunculan simpul-simpul bintang (ANM-046).
- **Mobile & Reduced Motion:** *Mobile:* Reveal per kata 400ms. *Reduced:* Langsung tampil 100%.
- **Cleanup & Resize:** Teks tetap menjadi satu tag `<h2>` semantik.
- **Komponen Pemilik:** `src/sections/Skills.tsx`.
- **Acceptance & Uji:** Tidak memecah struktur link atau anchor navigasi.

### ANM-046: Reveal Simpul Bintang Keahlian (Skill Nodes)
- **Elemen & Section:** Elemen simpul bintang `.skill-node`.
- **Tujuan Visual:** Menampilkan kumpulan keahlian sebagai gugusan bintang kosmik.
- **Pemicu:** Mengikuti ANM-045 dengan jeda 100ms.
- **Keadaan Awal & Akhir:** `scale: 0.8, opacity: 0` → `scale: 1.0, opacity: 1`.
- **Property:** `transform: scale()`, `opacity`.
- **Durasi & Easing:** 450ms per simpul, stagger 70ms antar-simpul, easing `power2.out`.
- **Perilaku Reverse / Fast-Scroll:** Menetap setelah muncul.
- **Hubungan Efek:** Berpadu dengan pelukisan garis konstelasi (ANM-047).
- **Mobile & Reduced Motion:** *Mobile:* Muncul sebagai daftar list interaktif ramah sentuh. *Reduced:* Tampil instan.
- **Cleanup & Resize:** Ukuran target sentuh/klik dijamin minimal 44×44px.
- **Komponen Pemilik:** `src/sections/Skills.tsx`.
- **Acceptance & Uji:** Seluruh simpul dapat difokuskan melalui tombol Tab keyboard secara berurutan.

### ANM-047: Garis Penghubung Konstelasi (Constellation Lines)
- **Elemen & Section:** Garis penghubung antar-simpul SVG (`.constellation-line`).
- **Tujuan Visual:** Menggambarkan hubungan arsitektural antarkeahlian sebagai rasi bintang.
- **Pemicu:** Mengiringi kemunculan simpul keahlian.
- **Keadaan Awal & Akhir:** `stroke-dashoffset: 100%` → `0%`.
- **Property:** `stroke-dashoffset`.
- **Durasi & Easing:** 900ms, easing `power2.inOut`.
- **Perilaku Reverse / Fast-Scroll:** Menetap setelah terlukis utuh.
- **Hubungan Efek:** Murni garis dekoratif berstatus `aria-hidden="true"`.
- **Mobile & Reduced Motion:** *Mobile / Reduced:* Garis disederhanakan atau dinonaktifkan.
- **Cleanup & Resize:** Koordinat SVG dihitung ulang saat ukuran kontainer berubah.
- **Komponen Pemilik:** `src/sections/Skills.tsx`.
- **Acceptance & Uji:** Garis tidak menyampaikan informasi tunggal (daftar teks tetap tersedia di DOM).

### ANM-048: Sorotan Pendaran Simpul (Node Hover / Focus Glow)
- **Elemen & Section:** Simpul keahlian aktif `.skill-node`.
- **Tujuan Visual:** Umpan balik langsung saat keahlian disentuh atau diarahkan kursor.
- **Pemicu:** Event hover mouse atau fokus keyboard pada simpul.
- **Keadaan Awal & Akhir:** Pendaran halo `opacity: 0, scale: 0.9` → `opacity: 1, scale: 1.15`.
- **Property:** `opacity`, `transform: scale()`, `box-shadow`.
- **Durasi & Easing:** 180ms ease-out.
- **Perilaku Reverse / Fast-Scroll:** Meredup kembali saat kursor lepas.
- **Hubungan Efek:** Memicu penyorotan proyek yang membuktikannya (ANM-050).
- **Mobile & Reduced Motion:** *Mobile:* Terpicu saat tap. *Reduced:* Outline fokus solid tanpa scale.
- **Cleanup & Resize:** Murni CSS transition.
- **Komponen Pemilik:** `src/sections/Skills.tsx`.
- **Acceptance & Uji:** Indikator fokus terlihat sangat kontras di latar belakang gelap.

### ANM-049: Panel Detail Keahlian (Skill Detail Panel)
- **Elemen & Section:** Panel deskripsi keahlian terpilih `#skill-detail-panel`.
- **Tujuan Visual:** Menjelaskan penerapan praktis keahlian yang dipilih tanpa klaim persentase fiktif.
- **Pemicu:** Pengguna mengklik atau menekan Enter pada salah satu simpul keahlian.
- **Keadaan Awal & Akhir:** `opacity: 0, y: 8px` → `opacity: 1, y: 0px`.
- **Property:** `opacity`, `transform: translateY()`.
- **Durasi & Easing:** 180ms ease-out.
- **Perilaku Reverse / Fast-Scroll:** Berpindah konten secara crossfade saat simpul lain dipilih.
- **Hubungan Efek:** Komponen menggunakan atribut `aria-expanded` dan `aria-controls`.
- **Mobile & Reduced Motion:** Identik di semua mode demi kejelasan informasi.
- **Cleanup & Resize:** Panel dapat ditutup via tombol silang atau tombol Escape.
- **Komponen Pemilik:** `src/sections/Skills.tsx`.
- **Acceptance & Uji:** Deskripsi keahlian terbaca utuh dan tidak terpotong oleh batas layar.

### ANM-050: Penyorotan Bukti Proyek (Project Evidence Linkage)
- **Elemen & Section:** Tautan proyek pembuktian di dalam panel keahlian `.skill-project-link`.
- **Tujuan Visual:** Membuktikan keahlian dengan mengarahkan pengguna ke karya nyata yang relevan.
- **Pemicu:** Pemilihan keahlian yang memiliki relasi `projectIds`.
- **Keadaan Awal & Akhir:** Highlight pendaran biru `--color-accent-blue` aktif pada tautan.
- **Property:** `border-color`, `color`, `background-color`.
- **Durasi & Easing:** 180ms ease-out.
- **Perilaku Reverse / Fast-Scroll:** Reset saat keahlian lain dipilih.
- **Hubungan Efek:** Relasi data bersumber langsung dari skema `SkillItem.projectIds`.
- **Mobile & Reduced Motion:** Identik di semua mode.
- **Cleanup & Resize:** Menghubungkan slug proyek yang valid.
- **Komponen Pemilik:** `src/sections/Skills.tsx`.
- **Acceptance & Uji:** Mengklik tautan membuka halaman studi kasus proyek yang bersangkutan dengan benar.

### ANM-051: Pergeseran Halus Konstelasi (Constellation Ambient Drift)
- **Elemen & Section:** Wadah graf konstelasi bintang (`#skills-constellation-container`).
- **Tujuan Visual:** Memberikan kesan konstelasi mengapung bebas di ruang tanpa gravitasi.
- **Pemicu:** Ambient loop waktu saat section Skills aktif di viewport.
- **Keadaan Awal & Akhir:** Rotasi mikro maksimal ±1.0 derajat setiap siklus 18 detik.
- **Property:** `transform: rotate()`.
- **Durasi & Easing:** 18s per siklus, continuous smooth wave.
- **Perilaku Reverse / Fast-Scroll:** Dijeda saat pengguna melakukan interaksi klik/fokus.
- **Hubungan Efek:** **Tidak boleh menggeser hitbox tombol klik lebih dari 2px.**
- **Mobile & Reduced Motion:** *Mobile / Reduced:* Dinonaktifkan penuh.
- **Cleanup & Resize:** Dihentikan saat section keluar dari viewport.
- **Komponen Pemilik:** `src/sections/Skills.tsx`.
- **Acceptance & Uji:** Kursor mouse tidak meleset saat hendak mengklik simpul bintang.

### ANM-052: Transisi Menuju Horizon Planet (Skills to Horizon Exit)
- **Elemen & Section:** Latar belakang gas kosmik dan pencahayaan global.
- **Tujuan Visual:** Membawa suasana dari kedalaman rasi bintang menuju lengkungan fajar planet.
- **Pemicu:** Progress scroll S05 mendekati akhir (`p: 0.70` sampai `p: 1.00`).
- **Keadaan Awal & Akhir:** Nebula memudar lembut seiring naiknya siluet horizon planet (ANM-053).
- **Property:** Opacity lapisan nebula, posisi Y horizon.
- **Durasi & Easing:** Terikat scrub scroll (`scrub: 0.25`).
- **Perilaku Reverse / Fast-Scroll:** Reversibel penuh.
- **Hubungan Efek:** Mengalir tanpa jeda ke section penutup S06.
- **Mobile & Reduced Motion:** *Reduced:* Crossfade gradien statis.
- **Cleanup & Resize:** Disinkronkan dengan penempatan elemen Horizon.
- **Komponen Pemilik:** `src/scene/Horizon.tsx`.
- **Acceptance & Uji:** Transisi mulus tanpa kedipan latar belakang hitam kosong.

---

## 8. Bagian 7: Scene 06 — Horizon Planet & Kontak (ANM-053 s/d ANM-060)

### ANM-053: Pengangkatan Horizon Planet (Planet Horizon Rise)
- **Elemen & Section:** Model lengkungan horizon planet 3D (`HorizonMesh`).
- **Tujuan Visual:** Pemandangan lengkungan raksasa planet di fajar kosmik sebagai penutup epik.
- **Pemicu:** Progress scroll S06 dari `p: 0.00` sampai `p: 0.35`.
- **Keadaan Awal & Akhir:** Translasi Y `40px` → `0px` dengan rim light atmosfer yang menyala.
- **Property:** `mesh.position.y`, `uAtmosphereIntensity`.
- **Durasi & Easing:** Terikat scrub scroll (`scrub: 0.3`).
- **Perilaku Reverse / Fast-Scroll:** Reversibel penuh saat scroll ke atas.
- **Hubungan Efek:** Membentuk panggung dasar yang kokoh bagi teks ajakan kerja sama.
- **Mobile & Reduced Motion:** *Mobile:* Pergeseran dibatasi ke 12px. *Reduced:* Horizon statis pada posisi akhir.
- **Cleanup & Resize:** Skala lengkungan disesuaikan dengan aspek rasio layar.
- **Komponen Pemilik:** `src/scene/Horizon.tsx`.
- **Acceptance & Uji:** Teks kontak di atas horizon tetap memiliki rasio kontras > 4.5:1 terhadap atmosfer.

### ANM-054: Judul Penutup Ajakan Kerja Sama (Contact Heading)
- **Elemen & Section:** Judul utama kontak `#contact-heading`.
- **Tujuan Visual:** Ajakan aksi penutup yang penuh keyakinan dan profesional.
- **Pemicu:** Section Contact memasuki viewport (`top 75%`).
- **Keadaan Awal & Akhir:** `y: 100%, opacity: 0` → `y: 0%, opacity: 1`.
- **Property:** `transform: translateY()`, `opacity`.
- **Durasi & Easing:** 700ms, stagger per kata 22ms, easing `power3.out`.
- **Perilaku Reverse / Fast-Scroll:** Menetap setelah muncul.
- **Hubungan Efek:** Mendahului kemunculan tombol kontak email (ANM-055).
- **Mobile & Reduced Motion:** *Mobile:* 400ms. *Reduced:* Langsung tampil 100%.
- **Cleanup & Resize:** Teks tetap menjadi satu heading semantik lengkap.
- **Komponen Pemilik:** `src/sections/Contact.tsx`.
- **Acceptance & Uji:** Judul tidak terlalu panjang dan memecah kalimat secara wajar di layar ponsel.

### ANM-055: Reveal Tombol Kontak & Email
- **Elemen & Section:** Area tombol kontak `#contact-cta-block`.
- **Tujuan Visual:** Membuka akses komunikasi dengan tombol yang menonjol dan jelas.
- **Pemicu:** 120ms setelah ANM-054.
- **Keadaan Awal & Akhir:** `y: 8px, opacity: 0` → `y: 0px, opacity: 1`.
- **Property:** `transform: translateY()`, `opacity`.
- **Durasi & Easing:** 450ms, easing `power2.out`.
- **Perilaku Reverse / Fast-Scroll:** Menetap setelah muncul.
- **Hubungan Efek:** Mengaktifkan tombol salin email satu-klik.
- **Mobile & Reduced Motion:** *Mobile:* 300ms. *Reduced:* Tampil instan.
- **Cleanup & Resize:** Tombol mempertahankan dimensi layout aslinya.
- **Komponen Pemilik:** `src/sections/Contact.tsx`.
- **Acceptance & Uji:** Tombol email menampilkan alamat terverifikasi atau placeholder aman jika pending.

### ANM-056: Interaksi Magnetik Tombol CTA (Magnetic Button)
- **Elemen & Section:** Tombol salin email & CTA utama `.btn-magnetic`.
- **Tujuan Visual:** Respons taktil yang memuaskan saat kursor mouse mendekati tombol.
- **Pemicu:** Event `mousemove` di atas radius batas tombol (fine pointer desktop).
- **Keadaan Awal & Akhir:** Translasi tombol mengikuti kursor sejauh maksimal ±6.0px.
- **Property:** `transform: translate(x, y)`.
- **Durasi & Easing:** Interpolasi lerp halus (`0.15`), kembali ke `(0,0)` pada `mouseleave`.
- **Perilaku Reverse / Fast-Scroll:** Reset ke posisi netral saat kursor keluar.
- **Hubungan Efek:** **Hitbox klik tidak menyusut; klik selalu mendarat akurat.**
- **Mobile & Reduced Motion:** *Mobile / Touch / Reduced:* **Dinonaktifkan penuh.**
- **Cleanup & Resize:** Event listener di-remove saat unmount.
- **Komponen Pemilik:** `src/components/ui/Button.tsx`.
- **Acceptance & Uji:** Tombol bergerak elastis tanpa menyebabkan glitch getaran di sudut tombol.

### ANM-057: Umpan Balik Salin Email (Copy Toast Feedback)
- **Elemen & Section:** Toast notifikasi salin email `#copy-toast`.
- **Tujuan Visual:** Kepastian instan bahwa alamat email telah berhasil berada di clipboard pengguna.
- **Pemicu:** Event klik berhasil pada tombol salin email (`navigator.clipboard.writeText`).
- **Keadaan Awal & Akhir:** `y: 12px, opacity: 0, scale: 0.95` → `y: 0px, opacity: 1, scale: 1.00`.
- **Property:** `transform`, `opacity`.
- **Durasi & Easing:** Muncul 180ms, bertahan 2500ms, lalu memudar keluar 220ms.
- **Perilaku Reverse / Fast-Scroll:** Menutup otomatis atau jika tombol tutup ditekan.
- **Hubungan Efek:** Diumumkan secara sopan ke screen reader via `aria-live="polite"`.
- **Mobile & Reduced Motion:** Identik di semua mode demi kepastian aksi pengguna.
- **Cleanup & Resize:** Timer auto-dismiss dibersihkan jika komponen unmount sebelum 2.5s.
- **Komponen Pemilik:** `src/components/ui/CopyEmail.tsx`.
- **Acceptance & Uji:** Hanya menampilkan status sukses jika penulisan clipboard benar-benar berhasil tanpa error.

### ANM-058: Sorot Tautan Sosial (Social Link Underline)
- **Elemen & Section:** Tautan jejaring sosial di footer `.social-link`.
- **Tujuan Visual:** Umpan balik visual saat menjelajahi tautan profil profesional.
- **Pemicu:** Event hover mouse atau fokus keyboard pada tautan sosial.
- **Keadaan Awal & Akhir:** Garis bawah `scaleX(0)` → `scaleX(1)`.
- **Property:** `transform: scaleX()`.
- **Durasi & Easing:** 160ms ease-out.
- **Perilaku Reverse / Fast-Scroll:** Menutup kembali saat kursor lepas.
- **Hubungan Efek:** Tautan eksternal membuka tab baru dengan atribut `rel="noopener noreferrer"`.
- **Mobile & Reduced Motion:** *Reduced:* Perubahan warna teks tanpa animasi transform.
- **Cleanup & Resize:** Murni transisi CSS.
- **Komponen Pemilik:** `src/components/layout/Footer.tsx`.
- **Acceptance & Uji:** Seluruh tautan terarah ke URL yang sah atau disembunyikan jika masih pending.

### ANM-059: Reveal Informasi Footer & Hak Cipta
- **Elemen & Section:** Blok footer `#site-footer`.
- **Tujuan Visual:** Menutup halaman dengan informasi legalitas dan identitas yang rapi.
- **Pemicu:** Pengguna mencapai batas bawah halaman utama.
- **Keadaan Awal & Akhir:** `opacity: 0` → `opacity: 1`.
- **Property:** `opacity`.
- **Durasi & Easing:** 250ms ease-out.
- **Perilaku Reverse / Fast-Scroll:** Menetap saat berada di footer.
- **Hubungan Efek:** Berdampingan dengan tombol kembali ke atas (ANM-060).
- **Mobile & Reduced Motion:** Tampil instan di semua mode.
- **Cleanup & Resize:** Menggunakan tahun berjalan dinamis berbasis kode tanpa teks statis usang.
- **Komponen Pemilik:** `src/components/layout/Footer.tsx`.
- **Acceptance & Uji:** Footer selalu dapat dijangkau oleh tombol `End` pada keyboard.

### ANM-060: Tombol Kembali ke Orbit Atas (Back to Top)
- **Elemen & Section:** Tombol pintas kembali ke atas `#back-to-top`.
- **Tujuan Visual:** Memungkinkan pengguna kembali ke Hero dengan satu sentuhan mudah.
- **Pemicu:** Klik pengguna pada tombol "Kembali ke Orbit Utama".
- **Keadaan Awal & Akhir:** Posisi scroll berpindah dari footer ke `y: 0`.
- **Property:** Scroll posisi vertikal window.
- **Durasi & Easing:** Scroll native halus (`behavior: smooth`) untuk mode Full; instan (`behavior: auto`) untuk Reduced Motion.
- **Perilaku Reverse / Fast-Scroll:** Menghantarkan pengguna kembali ke titik awal narasi.
- **Hubungan Efek:** Memindahkan fokus keyboard kembali ke heading utama `<h1>` atau skip-link.
- **Mobile & Reduced Motion:** *Reduced:* Perpindahan instan tanpa animasi scroll panjang.
- **Cleanup & Resize:** Event listener klik ditangani secara pasif.
- **Komponen Pemilik:** `src/components/layout/Footer.tsx`.
- **Acceptance & Uji:** Fokus keyboard berpindah ke atas; tidak mengulang intro per huruf Hero (ANM-013).

---

## 9. Bagian 8: Studi Kasus Detail & Transisi Rute (ANM-061 s/d ANM-062)

### ANM-061: Transisi Masuk Halaman Studi Kasus (Case Study Page Enter)
- **Elemen & Section:** Halaman studi kasus detail (`#project-detail-page`).
- **Tujuan Visual:** Transisi tenang dari Beranda menuju analisis arsitektur proyek.
- **Pemicu:** Rute `/work/:slug` selesai dimuat.
- **Keadaan Awal & Akhir:** `opacity: 0, y: 12px` → `opacity: 1, y: 0px`.
- **Property:** `opacity`, `transform: translateY()`.
- **Durasi & Easing:** 350ms, easing `power2.out`.
- **Perilaku Reverse / Fast-Scroll:** Satu kali per pemuatan rute.
- **Hubungan Efek:** Tidak menghalangi pemuatan langsung via direct URL (*direct load*).
- **Mobile & Reduced Motion:** *Mobile:* 250ms. *Reduced:* Tampil instan tanpa pergeseran Y.
- **Cleanup & Resize:** Mengembalikan posisi scroll ke paling atas (`window.scrollTo(0,0)`).
- **Komponen Pemilik:** `src/pages/ProjectPage.tsx`.
- **Acceptance & Uji:** Membuka URL langsung menghasilkan halaman yang langsung terbaca dengan rapi.

### ANM-062: Reveal Galeri Tangkapan Layar Proyek
- **Elemen & Section:** Gambar-gambar galeri teknis `.project-gallery-item`.
- **Tujuan Visual:** Mengungkap bukti antarmuka dan diagram teknis saat di-scroll.
- **Pemicu:** Masing-masing gambar galeri memasuki viewport (`top 85%`).
- **Keadaan Awal & Akhir:** `opacity: 0, y: 16px` → `opacity: 1, y: 0px`.
- **Property:** `opacity`, `transform: translateY()`.
- **Durasi & Easing:** 450ms per gambar, easing `power2.out`.
- **Perilaku Reverse / Fast-Scroll:** Menetap setelah dimuat.
- **Hubungan Efek:** Gambar memiliki wadah dengan rasio tetap untuk mencegah layout shift (CLS).
- **Mobile & Reduced Motion:** *Mobile:* 300ms. *Reduced:* Tampil instan tanpa animasi.
- **Cleanup & Resize:** Gambar menggunakan `loading="lazy"` bawaan peramban.
- **Komponen Pemilik:** `src/components/projects/ProjectGallery.tsx`.
- **Acceptance & Uji:** Tidak ada loncatan layout (CLS ≤ 0.05) saat galeri tampil.

---

## 10. Bagian 9: Pergantian Mode Gerak & Pemulihan Kegagalan (ANM-063 s/d ANM-064)

### ANM-063: Transisi Pergantian Mode Animasi (Live Motion Mode Switch)
- **Elemen & Section:** Seluruh kontainer aplikasi (`#app-root`).
- **Tujuan Visual:** Menjamin pergantian seketika saat pengguna beralih antara Full, Lite, dan Reduced.
- **Pemicu:** Perubahan nilai preferensi pada tombol Motion Control atau media query OS.
- **Keadaan Awal & Akhir:** Revert timeline GSAP → Rekalkulasi layout → Pembangunan ulang timeline yang sesuai.
- **Property:** Seluruh inline style animasi dibersihkan dan diatur ulang.
- **Durasi & Easing:** Transisi crossfade 150ms untuk mencegah loncatan visual mendadak.
- **Perilaku Reverse / Fast-Scroll:** Mempertahankan posisi scroll baca pengguna saat mode berganti.
- **Hubungan Efek:** Melepaskan seluruh ScrollTrigger pinning yang tidak relevan (seperti horizontal track).
- **Mobile & Reduced Motion:** Menghormati pengaturan sistem operasi sebagai prioritas tertinggi.
- **Cleanup & Resize:** `gsap.context().revert()` wajib dipanggil penuh sebelum timeline baru dibentuk.
- **Komponen Pemilik:** `src/app/providers/MotionProvider.tsx`.
- **Acceptance & Uji:** Mengubah ke Reduced melepaskan horizontal pin tanpa membuat halaman melompat ke atas.

### ANM-064: Transisi Degradasi Anggun Kegagalan WebGL (WebGL Failure Transition)
- **Elemen & Section:** Kanvas latar belakang (`#cosmic-canvas`) dan poster cadangan (`#hero-poster`).
- **Tujuan Visual:** Menjaga keutuhan presentasi jika hardware grafis mengalami error atau context loss.
- **Pemicu:** Event `webglcontextlost`, penolakan shader, atau inisialisasi timeout > 4 detik.
- **Keadaan Awal & Akhir:** Canvas disembunyikan (`display: none`), poster CSS diaktifkan (`opacity: 1`).
- **Property:** `opacity`, `display`.
- **Durasi & Easing:** Transisi cepat 200ms.
- **Perilaku Reverse / Fast-Scroll:** Menghentikan render loop secara permanen untuk mencegah loop error.
- **Hubungan Efek:** Seluruh konten DOM (teks, kartu karya, tombol kontak) 100% tetap aktif dan dapat digunakan.
- **Mobile & Reduced Motion:** Menjadi jalur default jika perangkat tidak mendukung WebGL.
- **Cleanup & Resize:** Sumber daya GPU yang rusak dilepaskan tanpa menyebabkan crash aplikasi React.
- **Komponen Pemilik:** `src/scene/SceneErrorBoundary.tsx`.
- **Acceptance & Uji:** Simulasi context loss via DevTools membuktikan website tetap dapat dibaca dan seluruh link/CTA bekerja.
