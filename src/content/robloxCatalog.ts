// src/content/robloxCatalog.ts
import { RobloxItem } from '@/types/content';

export const robloxCatalog: RobloxItem[] = [
  {
    id: 'RBX-01',
    title: 'Modul Eksplorasi Gerak & Navigasi Karakter',
    category: 'script',
    status: 'learning_prototype',
    description: 'Eksperimen script Luau dasar untuk memahami manipulasi Humanoid, TweenService untuk objek bergerak, dan deteksi zona pemicu (Touched events).',
    tech: ['Luau', 'Roblox Studio', 'TweenService'],
    notes: 'Karya aktif dalam tahap pembelajaran mandiri. Kode dan place resmi akan ditautkan setelah terverifikasi stabil.',
  },
  {
    id: 'RBX-02',
    title: 'Eksperimen Mekanika Interaksi Objek & ProximityPrompt',
    category: 'mechanic',
    status: 'learning_prototype',
    description: 'Pengembangan script interaksi pemain dengan perlengkapan stasiun, pintu geser otomatis, dan antarmuka prompt kontekstual.',
    tech: ['Luau', 'ProximityPrompt', 'ReplicatedStorage'],
    notes: 'Berfokus pada arsitektur client-server dasar (RemoteEvents).',
  },
  {
    id: 'RBX-03',
    title: 'Konsep Prototipe Lingkungan Antariksa Modular',
    category: 'game',
    status: 'planned',
    description: 'Rancangan awal ruang stasiun orbital dengan gravitasi rendah, lampu koridor dinamis, dan sistem gerbang udara (airlock).',
    tech: ['Roblox Studio', 'Building Tools', 'Atmosphere'],
    notes: 'Direncanakan sebagai showcase interaktif portofolio di platform Roblox.',
  },
];
