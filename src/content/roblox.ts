// src/content/roblox.ts
import { RobloxContent } from '@/types/content';

export const robloxContent: RobloxContent = {
  title: 'Eksplorasi Pengembangan Roblox',
  headline: 'Membangun Interaksi & Logika dengan Lua/Luau',
  description:
    'Selain pengembangan web, saya aktif mengeksplorasi platform Roblox sebagai kreator dan pengembang. Fokus saat ini adalah mempelajari dasar-dasar arsitektur game, logika event, dan penulisan script fungsional sederhana dengan bahasa Lua/Luau.',
  learningFocus: [
    'Pemahaman hierarki objek & service dalam Roblox Studio',
    'Penulisan script logika dasar dengan bahasa Lua / Luau',
    'Eksplorasi interaksi pemain, collision, dan event handling sederhana',
    'Terus belajar memperdalam pemahaman mekanika game secara bertahap',
  ],
  status: 'CONFIRMED',
};

export interface RobloxExperienceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  status: 'CONFIRMED' | 'CONTENT_PENDING';
}

/**
 * Daftar karya/game Roblox disiapkan secara terstruktur.
 * Belum ada judul game spesifik yang diserahkan pemilik, sehingga daftar ini dikosongkan
 * tanpa kartu palsu, siap menerima data rilisan mendatang.
 */
export const robloxShowcaseList: RobloxExperienceItem[] = [];
