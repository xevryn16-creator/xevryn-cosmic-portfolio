// src/content/projects.ts
import { ProjectContent } from '@/types/content';

/**
 * Inventaris Proyek Asli XEVRYN:
 * 1. Marketra / Marketra Mitta — Aplikasi workspace riset dengan onboarding dan dashboard.
 * 2. RetailLab — Aplikasi RetailLab/SMK untuk praktik dan simulasi ritel.
 * 3. Xevryn Assets Library — Koleksi terkurasi aset desain dan antarmuka.
 * 4. Ucapan-Buat-Kamu — Website hadiah dan ucapan personal interaktif (privasi terjaga, tanpa data pribadi).
 * 5. Xevryn Forge — Website publik/landing untuk Xevryn Forge.
 * 
 * Catatan: Screenshot asli & link live akan diisi setelah diserahkan pemilik.
 * Sementara menggunakan cover tipografi editorial kosmik yang elegan.
 */
export const projectsContent: ProjectContent[] = [
  {
    id: 'PRJ-01',
    slug: 'marketra',
    title: 'Marketra / Marketra Mitta',
    summary: 'Aplikasi workspace riset terintegrasi yang menghadirkan alur onboarding terarah dan dashboard analisis data terstruktur.',
    role: 'Frontend Developer & UI Designer',
    year: '2025',
    tags: ['React', 'TypeScript', 'Workspace', 'Dashboard UI'],
    coverImage: '/images/project-01.webp',
    galleryImages: ['/images/project-01-detail1.webp'],
    challenge: 'Menyusun hierarki informasi pada dashboard multi-panel serta merancang onboarding yang memandu pengguna memahami alur riset tanpa rasa kewalahan.',
    approach: 'Mengembangkan sistem komponen modular dengan state management yang terstruktur, navigasi yang intuitif, dan visual feedback yang jelas.',
    outcome: 'Alur onboarding yang terarah dan antarmuka dashboard riset yang responsif di berbagai resolusi layar.',
    links: [
      { label: 'Lihat Detail Proyek', url: '#work/marketra', kind: 'demo' }
    ],
    status: 'CONFIRMED',
  },
  {
    id: 'PRJ-02',
    slug: 'retaillab',
    title: 'RetailLab',
    summary: 'Aplikasi platform simulasi dan manajemen pembelajaran ritel yang dirancang untuk kebutuhan praktikum kejuruan (SMK).',
    role: 'Frontend Developer',
    year: '2025',
    tags: ['Web App', 'Interactive UI', 'Education Tech', 'Retail Simulation'],
    coverImage: '/images/project-02.webp',
    galleryImages: ['/images/project-02-detail1.webp'],
    challenge: 'Menerjemahkan alur operasional ritel nyata ke dalam antarmuka web interaktif yang mudah dipahami oleh siswa dalam proses belajar.',
    approach: 'Mendesain tata letak fungsional dengan form interaktif, simulasi transaksi kasir/stok, serta feedback visual langsung.',
    outcome: 'Aplikasi interaktif yang memfasilitasi simulasi skenario ritel secara visual dan terstruktur.',
    links: [
      { label: 'Lihat Detail Proyek', url: '#work/retaillab', kind: 'demo' }
    ],
    status: 'CONFIRMED',
  },
  {
    id: 'PRJ-03',
    slug: 'xevryn-assets',
    title: 'Xevryn Assets Library',
    summary: 'Koleksi terkurasi aset desain, token antarmuka, dan komponen reusable untuk mempercepat perancangan produk digital konsisten.',
    role: 'Design System & Asset Curator',
    year: '2024',
    tags: ['Design System', 'UI Assets', 'Design Tokens', 'Figma/Code'],
    coverImage: '/images/project-03.webp',
    galleryImages: ['/images/project-03-detail1.webp'],
    challenge: 'Membangun standardisasi token warna, tipografi, dan komponen UI yang konsisten serta mudah diadaptasi ke berbagai proyek.',
    approach: 'Menerapkan token arsitektural berskala dan dokumentasi spesifikasi komponen yang jelas untuk kemudahan penggunaan.',
    outcome: 'Perpustakaan aset terorganisir yang menjadi fondasi konsistensi desain di seluruh proyek digital.',
    links: [
      { label: 'Lihat Detail Proyek', url: '#work/xevryn-assets', kind: 'demo' }
    ],
    status: 'CONFIRMED',
  },
  {
    id: 'PRJ-04',
    slug: 'ucapan-buat-kamu',
    title: 'Ucapan-Buat-Kamu',
    summary: 'Website hadiah dan ucapan personal interaktif dengan sentuhan animasi dan mikro-interaksi yang hangat.',
    role: 'Creative Web Developer',
    year: '2024',
    tags: ['Creative Web', 'Interactive Experience', 'CSS Motion', 'Personal Gift'],
    coverImage: '/images/project-04.webp',
    galleryImages: ['/images/project-04-detail1.webp'],
    challenge: 'Menghadirkan pengalaman membuka pesan personal yang berkesan melalui interaksi web yang lembut dan tidak monoton.',
    approach: 'Mengombinasikan tata letak estetik, animasi transisi kartu, dan interaksi sentuh/klik yang intuitif (dengan menjaga privasi penerima).',
    outcome: 'Media digital ekspresif untuk menyampaikan ucapan secara kreatif dan personal.',
    links: [
      { label: 'Lihat Detail Proyek', url: '#work/ucapan-buat-kamu', kind: 'demo' }
    ],
    status: 'CONFIRMED',
  },
  {
    id: 'PRJ-05',
    slug: 'xevryn-forge',
    title: 'Xevryn Forge',
    summary: 'Website publik dan landing page showcase untuk inisiatif kreatif dan eksplorasi digital Xevryn Forge.',
    role: 'Frontend Engineer & Web Designer',
    year: '2024',
    tags: ['Landing Page', 'Web Design', 'Digital Showcase', 'Responsive'],
    coverImage: '/images/project-05.webp',
    galleryImages: ['/images/project-05-detail1.webp'],
    challenge: 'Membangun kehadiran web publik yang modern, ringan, dan efektif dalam mengomunikasikan identitas proyek.',
    approach: 'Memanfaatkan tipografi tegas, tata letak grid modern, dan optimasi aset untuk waktu muat yang cepat.',
    outcome: 'Landing page publik yang rapi, responsif, dan menyajikan identitas Xevryn Forge secara profesional.',
    links: [
      { label: 'Lihat Detail Proyek', url: '#work/xevryn-forge', kind: 'demo' }
    ],
    status: 'CONFIRMED',
  },
];
