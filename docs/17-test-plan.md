# 17 — Rencana Pengujian & Matriks Kualitas (Test Plan)

Versi: 1.0 · Tanggal: 21 September 2026 · Status: Disetujui

---

## 1. Strategi Pengujian & Prinsip Kualitas

Pengujian **XEVRYN Cosmic Portfolio** dirancang untuk memastikan bahwa integrasi visual 3D yang ambisius tidak mengorbankan fungsi dasar sebuah website portofolio: aksesibilitas, ketahanan terhadap kegagalan, dan kenyamanan membaca.

*Prinsip Mutlak: Keberhasilan kompilasi kode (`build pass`) tidak sama dengan kelulusan visual dan interaksi (`visual pass`). Setiap fitur wajib diuji pada kondisi nyata sebelum dinyatakan selesai.*

---

## 2. Tingkat Keparahan Defect (Severity Levels)

Setiap masalah yang ditemukan selama pengujian diklasifikasikan ke dalam 4 tingkat keparahan:

| Tingkat | Kategori | Dampak pada Pengguna | Kebijakan Rilis |
|---|---|---|---|
| **P0** | **Blocker** | Halaman crash/layar putih, scroll terkunci permanen, keyboard terjebak (*focus trap liar*), kebocoran kredensial rahasia. | **Wajib Selesai 100%.** Rilis dibatalkan jika ada 1 saja isu P0. |
| **P1** | **Critical** | Studi kasus karya tidak dapat dibuka, tombol kontak gagal total, mode Reduced Motion rusak, WebGL context loss merusak seluruh antarmuka. | **Wajib Selesai 100%** sebelum gerbang rilis produksi dibuka. |
| **P2** | **Moderate** | Glitch visual sesaat saat fast-scroll, jeda transisi sedikit melambat, teks sedikit rapat pada orientasi layar langka. | Boleh ditunda ke rilis minor jika ada mitigasi dan dicatat dalam known issues. |
| **P3** | **Minor** | Polish kosmetik mikro, ketidakselarasan jarak 2px pada browser versi lama yang tidak mengganggu fungsi. | Dicatat dalam backlog pemeliharaan. |

---

## 3. Matriks Skenario Pengujian Wajib (QA-01 s/d QA-24)

| QA ID | Skenario Pengujian | Prosedur Uji | Kriteria Acceptance & Bukti Wajib |
|---|---|---|---|
| **QA-01** | First Visit Cold Cache | Buka Beranda pada tab penyamaran (*incognito*) dengan cache bersih dan jaringan throttled Fast 4G. | Teks `XEVRYN` dan tombol CTA tampil < 1.5 detik. Poster kosmik tampil sebelum canvas 3D siap. |
| **QA-02** | Scroll Normal Maju & Mundur | Lakukan scroll perlahan dari Hero (S01) hingga Footer (S06), lalu scroll kembali ke atas. | Seluruh 6 scene bertransisi mulus; tidak ada elemen yang melompat (*jump cut*) atau berkedip. |
| **QA-03** | Fast Scroll, Tombol Home & End | Tekan tombol `End` keyboard untuk melompat ke footer, lalu tekan tombol `Home` untuk kembali ke atas. | Timeline langsung melompat ke status akhir tanpa overlay tersangkut atau glitch kamera. |
| **QA-04** | Resize Jendela di Tengah Pinning | Lakukan resize lebar jendela peramban saat sedang berada di tengah track horizontal karya (S04). | Lebar track dihitung ulang secara akurat; pin tidak meloncat; tidak ada ruang kosong ganda. |
| **QA-05** | Perubahan Orientasi Layar Ponsel | Putar perangkat mobile dari portrait ke landscape dan kembali lagi ke portrait saat scroll. | Tata letak menyesuaikan seketika, teks tidak terpotong, dan posisi baca pengguna tetap dipertahankan. |
| **QA-06** | Direct Anchor Links (`/#work`, `/#contact`) | Masukkan URL `/#work` langsung pada address bar peramban. | Halaman mendarat tepat pada judul Work setelah layout stabil tanpa menampilkan intro Hero ulang. |
| **QA-07** | Direct Case Study Load, Reload & 404 | Buka langsung URL `/work/cosmic-engine`, lakukan reload, lalu buka rute tidak dikenal `/random-url`. | Halaman detail memuat artikel lengkap; reload tidak crash; rute tidak dikenal menampilkan halaman 404. |
| **QA-08** | Navigasi Back / Forward Browser | Masuk ke halaman studi kasus, lalu tekan tombol `Back` peramban untuk kembali ke Beranda. | Kembali tepat pada kartu proyek yang sebelumnya dipilih; intro Hero tidak diputar ulang. |
| **QA-09** | Navigasi Keyboard Penuh (Tanpa Mouse) | Telusuri seluruh website dari awal hingga akhir hanya menggunakan tombol `Tab`, `Shift+Tab`, dan `Enter`. | Cincin fokus terlihat jelas di latar gelap; SkipLink berfungsi; tidak ada jebakan fokus. |
| **QA-10** | Pengujian Pembaca Layar (Screen Reader) | Aktifkan VoiceOver (macOS/iOS) atau NVDA (Windows) untuk menelusuri halaman utama. | Teks animasi dibaca sebagai kalimat utuh normal; partikel dan canvas diabaikan (`aria-hidden`). |
| **QA-11** | Kepatuhan Mode Reduced Motion | Aktifkan preferensi OS Reduced Motion, muat halaman, lalu uji pengalihan mode manual di antarmuka. | Seluruh pergerakan kamera, warp, tilt, dan parallax dinonaktifkan; konten 100% tetap terbaca. |
| **QA-12** | Kegagalan WebGL & Context Loss | Simulasikan `WEBGL_lose_context` via Chrome DevTools Console. | Canvas 3D digantikan oleh poster kosmik CSS seketika; teks DOM dan tombol kontak tetap aktif. |
| **QA-13** | Ketahanan Terhadap Aset Rusak / Gagal | Simulasikan error 404 pada salah satu gambar sampul proyek atau berkas tekstur planet. | Komponen cadangan (*image fallback*) menampilkan panel judul proyek; aplikasi tidak crash. |
| **QA-14** | Aksesibilitas Tanpa JavaScript (No-JS) | Matikan JavaScript pada peramban, lalu muat ulang halaman utama dan halaman studi kasus. | Konten teks, daftar karya, tautan detail, dan kontak tetap tampil dan dapat dibaca sempurna. |
| **QA-15** | Penolakan Izin Clipboard & Storage | Blokir izin clipboard dan nonaktifkan cookies/localStorage pada pengaturan situs peramban. | Preferensi gerak beralih ke memori sementara; salin email menampilkan instruksi seleksi manual. |
| **QA-16** | Fleksibilitas Jumlah Proyek (1, 2, 3, 6) | Uji tata letak karya dengan data uji berjumlah 1 proyek, 3 proyek, dan 6 proyek. | Lebar track horizontal menyesuaikan dinamis; jika hanya 1 proyek, tidak ada pin berlebih. |
| **QA-17** | Uji Reflow Judul & Bio Panjang | Uji teks judul yang panjang dan paragraf bio yang memanjang pada berbagai resolusi. | Teks membungkus (*wrap*) alami tanpa memotong descender huruf atau meluap dari wadah kartu. |
| **QA-18** | Matriks Viewport Responsif | Uji pada resolusi 320px, 390px, 768px, 1024px, 1440px, dan 1920px. | Tangkapan layar membuktikan tidak ada horizontal scrollbar dokumen yang tidak disengaja. |
| **QA-19** | Pengujian Browser Zoom 200% & 400% | Tingkatkan zoom peramban menjadi 200% dan 400% pada resolusi 1920×1080. | Teks melakukan reflow rapi; kontrol navigasi tetap dapat diakses; tidak ada elemen yang tumpang tindih. |
| **QA-20** | Penanganan Tab Tersembunyi (Hidden Tab) | Buka tab lain selama 30 detik saat berada di tengah animasi, lalu kembali ke tab portofolio. | Render loop dijeda saat tersembunyi; saat aktif kembali, tidak terjadi ledakan frame (*no time jump*). |
| **QA-21** | Uji Ketahanan Navigasi Bolak-Balik 10x | Lakukan navigasi Beranda → Detail → Beranda sebanyak 10 kali secara berturut-turut. | Penggunaan memori stabil; tidak ada kebocoran listener GSAP atau context WebGL ganda. |
| **QA-22** | Verifikasi Tautan Eksternal & CV | Klik seluruh tautan media sosial, repositori karya, dan tombol unduh CV. | Seluruh tautan terarah ke tujuan yang benar; tautan yang belum ada ditangani secara aman. |
| **QA-23** | Profiling Performa Scene Terberat | Rekam trace performa pada Scene 01 (Hero) dan Scene 03 (Warp) menggunakan DevTools Performance. | Memenuhi anggaran: 60 FPS desktop, LCP ≤ 2.5s, draw calls ≤ 60, VRAM ≤ 64MB. |
| **QA-24** | Uji Pratinjau Build Produksi | Bangun bundel produksi (`npm run build`) dan jalankan server pratinjau (`npm run preview`). | Seluruh rute statis, MIME types aset, dan header caching terverifikasi berfungsi sempurna. |

---

## 4. Matriks Peramban & Perangkat Target

1. **Desktop:** Google Chrome (Windows/macOS), Microsoft Edge (Windows), Mozilla Firefox (Windows/macOS), Apple Safari (macOS).
2. **Mobile:** Apple Safari pada iOS (iPhone nyata), Google Chrome pada Android (ponsel Android nyata).
3. **Pencatatan Bukti:** Setiap laporan pengujian wajib mencatat versi spesifik peramban, resolusi layar yang diuji, serta lampiran bukti rekaman/screenshot di folder `evidence/`.
