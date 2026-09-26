// src/content/experience.ts
import { ExperienceItem } from '@/types/content';

/**
 * Catatan Pengalaman Kerja Terkonfirmasi:
 * - Tempat: 11/12 coffe street
 * - Lokasi: Sumedang
 * - Peran: Barista & Kasir
 * - Deskripsi: Menangani pembuatan dan penyajian minuman, transaksi kasir, serta membantu berbagai kebutuhan operasional harian kafe.
 * - Periode: Belum diberikan pemilik (tidak mengarang tanggal/durasi/status kerja).
 */
export const experienceContent: ExperienceItem[] = [
  {
    id: 'EXP-01',
    role: 'Barista & Kasir',
    organization: '11/12 coffe street',
    location: 'Sumedang',
    period: undefined, // Belum diberikan oleh pemilik, tidak dikarang
    description: 'Menangani pembuatan dan penyajian minuman, transaksi kasir, serta membantu berbagai kebutuhan operasional harian kafe.',
    tags: ['Pelayanan', 'Operasional Kafe', 'Kasir'],
    status: 'CONFIRMED',
  },
];
