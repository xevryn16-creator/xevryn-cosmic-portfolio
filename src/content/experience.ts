// src/content/experience.ts
import { ExperienceItem } from '@/types/content';

export interface TimelineMilestone {
  id: string;
  stage: string;
  title: string;
  organization: string;
  role: string;
  type: 'education' | 'creative' | 'work' | 'tech';
  description: string;
  highlights: string[];
  status: 'CONFIRMED';
}

export const journeyTimeline: TimelineMilestone[] = [
  {
    id: 'TL-01',
    stage: '01',
    title: 'SMAN 3 SUMEDANG',
    organization: 'SMAN 3 Sumedang',
    role: 'Siswa / Anggota Komunitas',
    type: 'education',
    description: 'Fondasi akademik dan lingkungan awal tumbuhnya minat pada media visual, komunikasi, dan teknologi.',
    highlights: ['Pendidikan Menengah Atas', 'Minat Awal Teknologi & Media'],
    status: 'CONFIRMED',
  },
  {
    id: 'TL-02',
    stage: '02',
    title: 'MEDIA 3',
    organization: 'Ekstrakurikuler Media 3 — SMAN 3 Sumedang',
    role: 'Wakil Ekstrakurikuler',
    type: 'creative',
    description: 'Memimpin koordinasi tim kreatif, perencanaan produksi, serta manajemen kegiatan media sekolah.',
    highlights: ['Wakil Ekstrakurikuler', 'Creative Media', 'Team Collaboration'],
    status: 'CONFIRMED',
  },
  {
    id: 'TL-03',
    stage: '03',
    title: 'CREATIVE & FILM PRODUCTION',
    organization: 'Media 3 SMAN 3 Sumedang',
    role: 'Tim Produksi & Videografi',
    type: 'creative',
    description: 'Terlibat langsung dalam proses pembuatan film pendek sekolah, komposisi visual kamera, dan ritme penyuntingan video.',
    highlights: ['Produksi Film Pendek', 'Videografi & Editing', 'Sinematografi'],
    status: 'CONFIRMED',
  },
  {
    id: 'TL-04',
    stage: '04',
    title: 'COFFEE STREET',
    organization: '11/12 coffe street (Sumedang)',
    role: 'Barista & Kasir',
    type: 'work',
    description: 'Mengasah ketelitian peracikan minuman, manajemen transaksi kasir, komunikasi pelanggan, serta kerja sama tim dalam alur pesanan yang padat.',
    highlights: ['Customer Service', 'Cashier Operations', 'Working Under Pressure', 'Teamwork'],
    status: 'CONFIRMED',
  },
  {
    id: 'TL-05',
    stage: '05',
    title: 'WEB DEVELOPMENT',
    organization: 'Eksplorasi Rekayasa Perangkat Lunak',
    role: 'Frontend & Web Developer',
    type: 'tech',
    description: 'Mendalami ekosistem JavaScript/TypeScript, React modern, Three.js 3D WebGL, dan arsitektur antarmuka performa tinggi.',
    highlights: ['React & TypeScript', 'Three.js / WebGL', 'Responsive & Accessible UI'],
    status: 'CONFIRMED',
  },
  {
    id: 'TL-06',
    stage: '06',
    title: 'COLLEGE & HIGHER STUDIES',
    organization: 'Pendidikan Tinggi',
    role: 'Mahasiswa',
    type: 'education',
    description: 'Melanjutkan perjalanan akademik, memperdalam wawasan ilmu komputer, pemecahan masalah komputasi, dan kolaborasi proyek.',
    highlights: ['Studi Perguruan Tinggi', 'Pengembangan Komputasi', 'Eksplorasi Lanjutan'],
    status: 'CONFIRMED',
  },
  {
    id: 'TL-07',
    stage: '07',
    title: 'XEVRYN PROJECTS',
    organization: 'XEVRYN Universe & Digital Laboratory',
    role: 'Creative Technologist & Creator',
    type: 'tech',
    description: 'Mengembangkan portofolio kosmik 3D, platform produktivitas kampus, bot otomatisasi, serta eksperimen Roblox Luau dan AI.',
    highlights: ['Cosmic Portfolio V2', 'Campus WhatsApp Bot', 'RetailLab & Digital Experiments'],
    status: 'CONFIRMED',
  },
];

export const experienceContent: ExperienceItem[] = [
  {
    id: 'EXP-M3',
    role: 'Wakil Ekstrakurikuler',
    organization: 'Media 3 SMAN 3 Sumedang',
    location: 'Sumedang',
    period: undefined,
    description:
      'Memegang tanggung jawab sebagai wakil ekstrakurikuler dalam mengkoordinasikan kegiatan kreatif, produksi film pendek, dokumentasi visual, dan kolaborasi antardivisi.',
    tags: ['Wakil Ekstrakurikuler', 'Creative Media', 'Film Production', 'Team Collaboration'],
    status: 'CONFIRMED',
  },
  {
    id: 'EXP-01',
    role: 'Barista & Kasir',
    organization: '11/12 coffe street',
    location: 'Sumedang',
    period: undefined,
    description:
      'Menangani pembuatan dan penyajian minuman dengan standar rasa yang konsisten, mengoperasikan transaksi kasir harian, melayani pelanggan dengan ramah dan tanggap, serta menjaga kelancaran alur kerja di bawah tekanan jam sibuk kafe.',
    tags: [
      'Customer Service',
      'Cashier Operations',
      'Handling Transactions',
      'Communication',
      'Teamwork',
      'Handling Busy Order Flow',
      'Working Under Pressure',
    ],
    status: 'CONFIRMED',
  },
];
