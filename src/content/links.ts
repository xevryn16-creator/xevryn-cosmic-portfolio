// src/content/links.ts
import { SocialLink } from '@/types/content';

export interface NavLinkItem {
  label: string;
  href: string;
  id: string;
}

export const navLinks: NavLinkItem[] = [
  { label: 'Orbit', href: '#hero', id: 'hero' },
  { label: 'Tentang', href: '#about', id: 'about' },
  { label: 'Bidang', href: '#focus-areas', id: 'focus-areas' },
  { label: 'Karya Web', href: '#work', id: 'work' },
  { label: 'Roblox', href: '#roblox', id: 'roblox' },
  { label: 'Pengalaman', href: '#experience', id: 'experience' },
  { label: 'Keahlian', href: '#skills', id: 'skills' },
  { label: 'Eksplorasi', href: '#exploration-deck', id: 'exploration-deck' },
  { label: 'Stasiun Hub', href: '#space-hub-stations', id: 'space-hub-stations' },
  { label: 'Kontak', href: '#contact', id: 'contact' },
];

export interface StationLinkItem {
  label: string;
  href: string;
  icon: string;
  badge?: string;
}

export const stationLinks: StationLinkItem[] = [
  { label: 'Roblox Lab', href: '#roblox-lab', icon: '💠' },
  { label: 'Atomic Hub', href: '#atomic-hub', icon: '⚡' },
  { label: 'Playground', href: '#playground', icon: '🚀', badge: 'Mini Game' },
  { label: 'Asset Station', href: '#asset-station', icon: '📦', badge: 'Unduh' },
  { label: 'Devlog', href: '#devlog', icon: '📜' },
  { label: 'Orbit Café', href: '#orbit-cafe', icon: '☕', badge: 'Fokus' },
];

export const socialLinks: SocialLink[] = [
  {
    platform: 'github',
    label: 'GitHub Utama (alfiedafa3)',
    url: 'https://github.com/alfiedafa3',
    status: 'CONFIRMED',
  },
  {
    platform: 'github',
    label: 'GitHub Kedua (xevryn16)',
    url: 'https://github.com/xevryn16',
    status: 'CONFIRMED',
  },
  {
    platform: 'whatsapp',
    label: 'WhatsApp (0896-1111-2625)',
    url: 'https://wa.me/6289611112625',
    status: 'CONFIRMED',
  },
  {
    platform: 'email',
    label: 'xevryn16@gmail.com',
    url: 'mailto:xevryn16@gmail.com',
    status: 'CONFIRMED',
  },
];
