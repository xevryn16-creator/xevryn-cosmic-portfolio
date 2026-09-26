// src/content/skills.ts
import { SkillItem } from '@/types/content';

export const skillsContent: SkillItem[] = [
  // 1. Web
  {
    id: 'SKL-WEB-01',
    label: 'React & Frontend Web',
    category: 'web',
    description: 'Pembangunan antarmuka interaktif, pemecahan komponen modular, dan manajemen state reaktif.',
    projectIds: ['PRJ-01', 'PRJ-02', 'PRJ-04'],
    status: 'CONFIRMED',
  },
  {
    id: 'SKL-WEB-02',
    label: 'TypeScript & Struktur Kode',
    category: 'web',
    description: 'Penerapan type safety yang ketat, arsitektur kode bersih, dan pemeliharaan struktur aplikasi yang rapi.',
    projectIds: ['PRJ-01', 'PRJ-03'],
    status: 'CONFIRMED',
  },
  {
    id: 'SKL-WEB-03',
    label: 'Desain Antarmuka & Responsif',
    category: 'web',
    description: 'Perancangan tata letak fleksibel, hierarki tipografi yang nyaman dibaca, dan aksesibilitas dasar antarmuka.',
    projectIds: ['PRJ-01', 'PRJ-03', 'PRJ-05'],
    status: 'CONFIRMED',
  },

  // 2. Roblox
  {
    id: 'SKL-RBLX-01',
    label: 'Pengembangan Roblox Studio',
    category: 'roblox',
    description: 'Eksplorasi pembuatan ruang 3D, manajemen part dan model, serta struktur objek di Roblox Studio.',
    status: 'CONFIRMED',
  },
  {
    id: 'SKL-RBLX-02',
    label: 'Scripting Sederhana Lua / Luau',
    category: 'roblox',
    description: 'Menulis script fungsional dasar untuk event handling, interaksi objek, dan mekanika sederhana (masih dalam tahap belajar aktif).',
    status: 'CONFIRMED',
  },

  // 3. Kreatif
  {
    id: 'SKL-CRT-01',
    label: 'Pembuatan Konten Kreatif',
    category: 'creative',
    description: 'Menyusun materi visual dan ide konten untuk memperkenalkan aktivitas dan proyek komunitas secara menarik.',
    status: 'CONFIRMED',
  },

  // 4. Pemasaran
  {
    id: 'SKL-MKT-01',
    label: 'Pemasaran Digital & Komunitas',
    category: 'marketing',
    description: 'Mendukung penyebaran informasi dan promosi komunitas secara organik, terbukti melalui keterlibatan di Atomic Roblox Hub.',
    status: 'CONFIRMED',
  },

  // 5. Operasional
  {
    id: 'SKL-OPS-01',
    label: 'Barista, Kasir & Pelayanan',
    category: 'operations',
    description: 'Keahlian nyata dalam pembuatan minuman, ketelitian transaksi kasir, dan pelayanan langsung kepada pelanggan di 11/12 coffe street Sumedang.',
    projectIds: ['EXP-01'],
    status: 'CONFIRMED',
  },
];
