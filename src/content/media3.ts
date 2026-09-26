// src/content/media3.ts
import { Media3ArchiveItem } from '@/types/content';

export const media3ArchiveContent: Media3ArchiveItem[] = [
  {
    id: 'M3-01',
    category: 'FILM',
    title: 'Produksi Film Pendek & Sinematografi',
    role: 'Wakil Ekstrakurikuler · Tim Produksi',
    focus: ['Film Production', 'Cinematic Composition', 'On-Set Coordination'],
    description:
      'Keterlibatan langsung dalam pra-produksi, pengambilan gambar lapangan, dan koordinasi tim kreatif pada produksi film pendek Media 3 SMAN 3 Sumedang.',
    status: 'CONFIRMED',
    mediaPlaceholder: {
      label: 'MEDIA 3 CREATIVE ARCHIVE · FILM',
      aspectRatio: '16/9',
      colorAccent: '#38bdf8',
    },
  },
  {
    id: 'M3-02',
    category: 'VIDEO',
    title: 'Penyuntingan Video & Visual Pacing',
    role: 'Editor & Creative Team',
    focus: ['Video Editing', 'Audio Pacing', 'Color Mood'],
    description:
      'Eksplorasi alur narasi visual, sinkronisasi audio, dan pemilihan ritme transisi yang membangun suasana cerita dalam karya video sekolah.',
    status: 'CONFIRMED',
    mediaPlaceholder: {
      label: 'MEDIA 3 CREATIVE ARCHIVE · VIDEO',
      aspectRatio: '16/9',
      colorAccent: '#c084fc',
    },
  },
  {
    id: 'M3-03',
    category: 'PRODUCTION',
    title: 'Manajemen Lapangan & Kolaborasi Kru',
    role: 'Wakil Ekstrakurikuler',
    focus: ['Team Collaboration', 'Crew Management', 'Production Logistics'],
    description:
      'Mengkoordinasikan kebutuhan teknis antardivisi, pembagian peran kru, serta kelancaran jadwal syuting dan perlengkapan produksi.',
    status: 'CONFIRMED',
    mediaPlaceholder: {
      label: 'MEDIA 3 CREATIVE ARCHIVE · PRODUCTION',
      aspectRatio: '16/9',
      colorAccent: '#f59e0b',
    },
  },
  {
    id: 'M3-04',
    category: 'MEDIA',
    title: 'Publikasi Kreatif & Dokumentasi Sekolah',
    role: 'Media & Publikasi',
    focus: ['Creative Media', 'Documentation', 'Visual Storytelling'],
    description:
      'Dokumentasi kegiatan dan penyajian visual media ekstrakurikuler yang menjaga kualitas estetika serta identitas Media 3 SMAN 3 Sumedang.',
    status: 'CONFIRMED',
    mediaPlaceholder: {
      label: 'MEDIA 3 CREATIVE ARCHIVE · MEDIA',
      aspectRatio: '16/9',
      colorAccent: '#22c55e',
    },
  },
];
