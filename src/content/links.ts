// src/content/links.ts
import { SocialLink } from '@/types/content';

export interface NavLinkItem {
  label: string;
  href: string;
  id: string;
}

export const navLinks: NavLinkItem[] = [
  { label: '01 ABOUT', href: '#about', id: 'about' },
  { label: '02 EXPERIENCE', href: '#experience', id: 'experience' },
  { label: '03 MEDIA 3', href: '#media3-archive', id: 'media3-archive' },
  { label: '04 SKILLS', href: '#skills', id: 'skills' },
  { label: '05 PROJECTS', href: '#work', id: 'work' },
  { label: '06 LAB', href: '#xevryn-lab', id: 'xevryn-lab' },
  { label: '07 TERMINAL', href: '#terminal', id: 'terminal' },
  { label: '08 CONTACT', href: '#contact', id: 'contact' },
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
