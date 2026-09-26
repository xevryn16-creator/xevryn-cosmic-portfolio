# 02 — Arah Seni & Estetika Visual (Art Direction)

Versi: 1.0 · Tanggal: 21 September 2026 · Status: Disetujui

---

## 1. Filosofi Desain: Realisme Sinematik Kosmik

Arah seni **XEVRYN Cosmic Portfolio** terinspirasi dari keagungan ruang angkasa dalam (*deep space*) yang sunyi, misterius, dan presisi. Pendekatan visual tidak meniru gaya fiksi ilmiah klise (seperti HUD sci-fi bergaris hijau/kuning neon murahan atau tampilan antarmuka game arcade), melainkan mengadopsi estetika sinematik bergaya *hard sci-fi* dan fotografi observatorium modern (seperti tangkapan teleskop James Webb dipadu sinematografi film *Interstellar*).

Prinsip dasar:
1. **Keheningan Ruang Hampa (Cosmic Solitude):** Ruang kosong (*negative space*) yang luas dan gelap bukanlah kekosongan tanpa guna, melainkan medium yang memberikan bobot dan gravitasi visual pada setiap kata, kartu karya, dan benda langit.
2. **Pencahayaan Berarah Tunggal (Physical Key Lighting):** Seluruh objek angkasa (planet, atmosfer, debu kosmik) diterangi oleh satu sumber cahaya utama bintang jauh (*key light*), menghasilkan kontras dramatis antara belahan siang yang bertekstur dan belahan malam yang gelap pekat.
3. **Zona Ketenangan Visual (Calm Reading Zones):** Area tempat teks informasi dibaca dipastikan bebas dari kilatan bintang tajam atau nebula yang terlalu terang. Keterbacaan teks adalah keharusan mutlak.

---

## 2. Palet Warna Kosmik (Color Grammar)

Sistem warna dibangun menggunakan palet warna gelap bertingkat yang harmonis, meniadakan warna hitam absolut (`#000000`) dan putih murni (`#FFFFFF`) agar mata pengunjung tidak cepat lelah saat menatap layar dalam durasi lama.

```text
Deep Space Abyss ───────────► #050711 (Latar Belakang Dasar)
Cosmic Surface Layer ───────► #101626 (Panel, Kartu, Menu)
Stellar Boundary Line ──────► #33405B (Divider, Garis Orbit, Border)
Atmospheric Rim Blue ───────► #6B9FFF (Aksen Interaksi, Link, Cahaya Tepi)
Deep Nebula Violet ─────────► #8A6BDA (Glow Dekoratif, Gas Kosmik)
Cosmic Dust Muted ──────────► #AAB4CA (Teks Sekunder, Keterangan)
Starlight High-Contrast ────► #F2F3F7 (Teks Utama, Heading)
```

### Panduan Penerapan Warna
- **Latar Belakang (`#050711`):** Warna dasar kosmik yang menyerap cahaya, memiliki sentuhan rona biru laut yang sangat dalam untuk mencegah efek "hampa mati" dari warna hitam murni.
- **Permukaan Panel (`#101626`):** Digunakan pada kartu proyek, latar belakang menu modal, dan panel detail keahlian dengan transparansi kaca gelap halus (*glassmorphism* dengan `backdrop-filter: blur(16px)`).
- **Aksen Biru Atmosfer (`#6B9FFF`):** Digunakan untuk status fokus keyboard, garis sorot link aktif, pendaran rim light pada horizon planet, dan indikator interaksi sentuh. Memiliki rasio kontras > 4.5:1 terhadap latar belakang gelap untuk kepatuhan WCAG AA.
- **Nebula Ungu Kosmik (`#8A6BDA`):** Diterapkan dengan densitas rendah pada shader nebula latar belakang, memberikan nuansa misteri dan kehangatan organik pada kedalaman ruang hampa.
- **Teks Utama (`#F2F3F7`):** Menyerupai pancaran cahaya bintang yang stabil, memberikan kontras tajam tanpa menyilaukan.

---

## 3. Tata Cahaya & Material 3D

### 3.1 Model Pencahayaan Planet
- **Key Light (Bintang Induk):** Lampu direksional berintensitas terkalibrasi yang datang dari sudut kiri atas (sekitar sudut -45° azimuth, 30° elevasi relatif terhadap kamera) dengan rona putih hangat sangat tipis (`#FAF9F6`).
- **Atmospheric Rim Light (Cahaya Hamburan):** Shader Fresnel kustom pada tepi siluet planet yang menghasilkan pendaran kebiruan lembut (`#6B9FFF`), mensimulasikan hamburan Rayleigh atmosfer tipis planet ke ruang hampa.
- **Ambient Fill:** Cahaya pengisi global yang sangat redup (maksimal 5–8% intensitas) sehingga belahan malam planet tetap memiliki siluet gelap namun tidak kehilangan bentuk geometrisnya.

### 3.2 Tekstur & Detail Permukaan
- Permukaan planet memiliki peta elevasi halus (normal map mikro) berupa kawah purba dan lempeng tektonik gelap (*rocky exoplanet*), menghindari warna-warna cerah seperti kartun.
- Rotasi planet berlangsung sangat lambat dan stabil (1 putaran per 180 detik pada desktop), menciptakan rasa skala kosmik yang masif (*colossal planetary scale*).

---

## 4. Komposisi Visual Tiap Babak (Cinematic Grammar)

```text
[ S01: Orbit Hero ]      [ S02: Perkenalan ]      [ S03: Warp Tunnel ]
  ┌────────────────┐       ┌────────────────┐       ┌────────────────┐
  │ XEVRYN    (○)  │       │ (○)   Bio Teks │       │   \\  ||  //   │
  │ Peran          │  ──►  │       Fokus    │  ──►  │  ═══ ● ═══     │
  │ [CTA]          │       │       [Detail] │       │   //  ||  \\   │
  └────────────────┘       └────────────────┘       └────────────────┘

[ S04: Destinasi Karya ]  [ S05: Konstelasi ]      [ S06: Horizon Kontak ]
  ┌────────────────┐       ┌────────────────┐       ┌────────────────┐
  │ Karya 1 ──► 2  │       │   *──*         │       │    Hubungi     │
  │ [Preview Besar]│  ──►  │  /    \──*     │  ──►  │    xevryn@     │
  │ Ringkasan/Link │       │  Keahlian Panel│       │ ────────────── │
  └────────────────┘       └────────────────┘       │ ▄▄▄▄(Horizon)  │
                                                    └────────────────┘
```

1. **Scene 01 — Orbit (Hero):** 
   - Komposisi seimbang asimetris. Nama besar `XEVRYN` mendominasi sisi kiri atas hingga tengah, sementara siluet planet 3D mengambang megah di kanan bawah.
   - Fokus mata langsung tertuju pada identitas, diikuti oleh peran profesional dan tombol CTA di bawahnya.
2. **Scene 02 — Perkenalan (About):**
   - Kamera meluncur perlahan menyamping. Planet bergerak ke sisi kiri luar bingkai, memberi panggung bagi tipografi naratif di area kanan tengah.
   - Bidang baca memiliki lebar yang dibatasi (55–68 karakter per baris) agar pembacaan terasa intim dan fokus.
3. **Scene 03 — Warp Tunnel (Jembatan Transisi):**
   - Puncak dinamika visual. Bintang-bintang latar belakang memanjang menjadi garis-garis berkilau (*light streaks*) seiring akselerasi kamera menuju kedalaman ruang.
   - Tidak ada kilatan putih menyilaukan (*no white strobe*); transisi tetap berada dalam spektrum biru tua dan ungu gelap yang terkendali.
4. **Scene 04 — Destinasi Karya (Work Showcase):**
   - Kamera melambat ke orbit tenang. Fokus utama 100% beralih ke kartu karya beresolusi tinggi dengan bingkai sudut presisi (radius 16px).
   - Efek kedalaman diterapkan halus melalui tilt 3D mikro saat kursor mouse melintas di atas kartu.
5. **Scene 05 — Konstelasi Keahlian (Skills):**
   - Node-node bintang keahlian saling terhubung dengan garis orbit tipis semi-transparan (`#33405B`).
   - Setiap interaksi hover memicu pendaran lembut bintang terkait dan menyoroti keterhubungannya dengan proyek nyata.
6. **Scene 06 — Horizon Planet (Contact & Penutup):**
   - Kamera memandang lengkungan raksasa horizon planet yang memotong bagian bawah layar secara dramatis, disinari fajar kosmik kebiruan.
   - Informasi kontak utama tampil megah di atas lengkungan horizon yang kokoh dan tenang.

---

## 5. Anti-Pattern Desain (Hal yang Dilarang Keras)

- **Dilarang Warna Pelangi RGB Neon:** Jangan menggunakan gradien pelangi atau perpaduan warna neon acak yang membuat situs tampak seperti demo gaming murahan.
- **Dilarang Kilatan Strobo (Flashes/Strobes):** Transisi Warp tidak boleh menghasilkan kedipan cahaya putih layar penuh yang dapat memicu kejang epilepsi fotosensitif (kepatuhan WCAG kriteria 2.3.1).
- **Dilarang Bintang Terlalu Ramai di Belakang Teks:** Jumlah dan intensitas partikel bintang harus dibatasi secara cerdas agar tidak mengganggu keterbacaan huruf.
- **Dilarang Elemen HUD Dekoratif Palsu:** Jangan menambahkan elemen visual seperti garis bidik senjata (*crosshairs*), angka heksadesimal acak yang berkedip tanpa arti, atau lingkaran persentase fiktif.
- **Dilarang Menghilangkan Kursor Standar:** Kursor mouse bawaan sistem operasi wajib tetap terlihat; dilarang menyembunyikan kursor asli demi kursor custom yang lambat merespons (*laggy trailing cursor*).
