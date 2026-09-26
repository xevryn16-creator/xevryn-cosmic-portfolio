// src/content/devlog.ts
import { DevlogArticle } from '@/types/content';

export const devlogArticles: DevlogArticle[] = [
  {
    id: 'DEV-01',
    slug: 'membangun-tata-surya-3d',
    title: 'Membangun Tata Surya 3D: Arsitektur Kanvas Kosmik XEVRYN',
    publishDate: '21 September 2026',
    readingTime: '4 min baca',
    summary: 'Bagaimana kami merancang kanvas WebGL tunggal yang merender matahari fotosfer bertekstur granulasi, 5 planet berkarakter unik, awan atmosfer bertingkat, dan sabuk asteroid tanpa membebani performa browser.',
    tags: ['Three.js', 'WebGL', 'Shaders', 'React Three Fiber'],
    keyHighlights: [
      'Single background WebGL canvas dengan lifecycle terkontrol.',
      'Procedural canvas texturing untuk planet dan matahari (mengurangi aset eksternal).',
      'Pemisahan lapisan awan atmosfer independen pada Ocean World.',
      'Cincin Saturn-like dengan celah Cassini Division tembus pandang nyata dan depthWrite terkontrol.',
    ],
    content: [
      'Tantangan utama saat merancang portofolio berbasis 3D adalah menjaga keseimbangan antara kekayaan visual dan keterbacaan konten teks. Di XEVRYN, kami memilih pendekatan "Calm Zones", di mana objek 3D hadir sebagai pendamping sinematik yang mereda saat pengguna membaca bio, karya, atau keahlian.',
      'Alih-alih memuat model 3D raksasa berukuran puluhan megabyte, kami membuat generator tekstur prosedural berbasis HTML Canvas. Setiap planet memiliki karakter geologisnya sendiri: Planet Berbatu dengan kawah multi-skala ber-relief tajam, Ocean World dengan batimetri kedalaman laut dan awan kumulus terpisah, Planet Merah dengan ngarai Valles Marineris, Gas Giant dengan pita awan bergelombang dinamis, serta Planet Bercincin dengan celah Cassini transparan yang nyata.',
      'Dengan menggunakan arsitektur single-canvas di latar belakang, memori GPU tetap stabil, dan transisi antar halaman tidak pernah memicu reload canvas WebGL yang mahal.',
    ],
    relatedRoute: '#playground',
  },
  {
    id: 'DEV-02',
    slug: 'koreografi-kamera-dan-roket',
    title: 'Koreografi Kamera & Lintasan Roket: Menghilangkan Tabrakan & Jitter Scroll',
    publishDate: '22 September 2026',
    readingTime: '5 min baca',
    summary: 'Catatan teknis mengenai sinkronisasi timeline GSAP dengan useFrame Three.js, kurva 3D CatmullRom 9-titik untuk roket, dan eliminasi lompatan posisi pada transisi Contact.',
    tags: ['GSAP', 'Math3D', 'Animation', 'ScrollTrigger'],
    keyHighlights: [
      'Penggunaan mutable ref target untuk mengalirkan progress scroll ke Three.js tanpa memicu React re-render.',
      'Penyusunan THREE.CatmullRomCurve3 9 simpul dengan kalkulasi orientasi haluan tangen dinamis.',
      'Pembersihan hard toggle visible = false pada Horizon fajar, diganti lerp kontinu posisi Y.',
      'Penetapan safety boundary camera rig untuk mencegah kamera menembus objek langit.',
    ],
    content: [
      'Dalam integrasi DOM scroll dan Three.js, bug paling umum terjadi saat state React dipaksa re-render setiap frame atau setiap event scroll. Kami memecahkan ini melalui SceneProvider dengan arsitektur mutable ref: listener scroll global memperbarui nilai progress numerik, dan hook useFrame di dalam Three.js membaca ref tersebut secara kontinu.',
      'Untuk roket penjelajah, kami merancang kurva 3D Catmull-Rom yang memiliki 9 titik jangkar keselamatan. Roket mengitari planet berbatu, meluncur menembus celah sabuk asteroid, dan melintas di atas horizon fajar Contact tanpa pernah menabrak planet, astronaut, atau teks halaman.',
      'Pada transisi akhir menuju Contact, kami mengganti mekanisme diskret dengan lerp kontinu posisi Y horizon dari -34.0 ke -22.4. Hasilnya adalah fajar kosmik yang terbit secara organik, baik saat di-scroll perlahan, scroll cepat, maupun saat scroll dibalikkan ke atas.',
    ],
    relatedRoute: '/',
  },
  {
    id: 'DEV-03',
    slug: 'evolusi-xevryn-space-hub',
    title: 'Evolusi Menjadi XEVRYN Space Hub: Stasiun, Mini Game & Ruang Fokus',
    publishDate: '22 September 2026',
    readingTime: '4 min baca',
    summary: 'Transformasi dari portofolio personal satu halaman menjadi ekosistem Space Hub modular dengan Roblox Lab, Atomic Hub, mini game Asteroid Dodge, Asset Station, dan Orbit Café.',
    tags: ['Space Hub', 'Architecture', 'Playground', 'Orbit Café'],
    keyHighlights: [
      'Pemisahan halaman berbasis SPA hash routing yang ramah keyboard dan deep linking.',
      'Mini game Asteroid Dodge 2D Canvas dengan auto-pause saat tab tidak aktif.',
      'Orbit Café focus timer berbasis Date.now delta yang anti-drift di background tab.',
      'Sintesis audio prosedural Web Audio API bebas copyright dan tanpa file audio eksternal berat.',
    ],
    content: [
      'Saat cakupan kegiatan pemilik mencakup pengembangan web, eksplorasi Roblox dengan Lua/Luau, kontribusi di Atomic Roblox Hub, serta pengalaman nyata sebagai barista, menumpuk semua informasi dalam satu halaman panjang akan mengorbankan kenyamanan pembaca.',
      'Kami memperluas arsitektur XEVRYN menjadi Space Hub dengan stasiun-stasiun terdedikasi: Roblox Lab untuk eksperimen teknis, Atomic Hub untuk etalase media kontribusi, Playground untuk simulasi dan mini game yang benar-benar dapat dimainkan, Asset Station untuk berbagi aset orisinal, serta Orbit Café sebagai ruang fokus yang tenang dengan timer Pomodoro anti-drift.',
      'Setiap stasiun dirancang mandiri dengan tombol kembali yang jelas, pembersihan event listener yang ketat saat unmount, serta dukungan penuh untuk navigasi keyboard dan preferensi Reduced Motion.',
    ],
    relatedRoute: '#orbit-cafe',
  },
];
