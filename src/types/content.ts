// src/types/content.ts

export type ContentStatus = 'CONFIRMED' | 'CONTENT_PENDING';

export interface ProfileContent {
  brand: string;                   // 'XEVRYN' (CONFIRMED)
  publicName: string;              // Nama lengkap / publik (Daffa Alfie Febryan Tijani)
  headline: string;                // Peran utama (Pengembang Web)
  bioShort: string;                // Ringkasan bio hero (1-2 kalimat)
  bioFull: string[];               // Paragraf narasi About
  email?: string;                  // xevryn16@gmail.com
  whatsappNumber?: string;         // 0896-1111-2625
  whatsappUrl?: string;            // https://wa.me/6289611112625
  githubPrimary?: string;          // https://github.com/alfiedafa3
  githubSecondary?: string;        // https://github.com/xevryn16
  portraitUrl?: string;            // URL foto profil (Opsional)
  status: ContentStatus;
}

export interface ProjectLink {
  label: string;
  url: string;
  kind: 'live' | 'repo' | 'demo';
}

export interface ProjectContent {
  id: string;                      // ID unik (misal: 'PRJ-01')
  slug: string;                    // Slug URL rute (misal: 'stellar-engine')
  title: string;                   // Judul karya
  summary: string;                 // Ringkasan kartu (1-2 kalimat)
  role: string;                    // Peran XEVRYN dalam proyek
  year?: string;                   // Tahun pengerjaan (hanya jika valid)
  tags: string[];                  // Tag teknologi / bidang
  coverImage: string;              // Path gambar sampul utama
  galleryImages: string[];         // Daftar tangkapan layar galeri
  problem?: string;                // Latar belakang / masalah
  solution?: string;               // Pendekatan solusi
  features?: string[];             // Fitur utama
  challenge: string;               // Tantangan teknis & masalah
  approach: string;                // Keputusan arsitektur & solusi
  outcome: string;                 // Hasil yang dapat dibuktikan secara faktual
  links: ProjectLink[];            // Tautan eksternal (hanya yang aktif)
  celestialType?: 'sun' | 'rocky' | 'ocean' | 'gas_giant' | 'ringed' | 'nebula_planet' | 'satellite';
  status: ContentStatus;
}

export type SkillCategory =
  | 'development'
  | 'creative_media'
  | 'exploring'
  | 'web'
  | 'roblox'
  | 'creative'
  | 'marketing'
  | 'operations';

export interface SkillItem {
  id: string;                      // ID keahlian (misal: 'SKL-DEV-REACT')
  label: string;                   // Nama teknologi / keahlian
  category: SkillCategory;
  badge?: 'Exploring' | 'Learning' | 'Confirmed';
  description: string;             // Penjelasan aplikasi praktis berdasarkan fakta
  projectIds?: string[];           // ID proyek atau pengalaman terkait
  status: ContentStatus;
}

export interface Media3ArchiveItem {
  id: string;
  category: 'FILM' | 'VIDEO' | 'PRODUCTION' | 'MEDIA';
  title: string;
  role: string;
  focus: string[];
  description: string;
  status: ContentStatus;
  mediaPlaceholder: {
    label: string;
    aspectRatio: string;
    colorAccent: string;
  };
}

export interface LabItem {
  id: string;
  title: string;
  category: 'AI' | 'AUTOMATION' | 'CYBERSECURITY' | 'WEBGL' | '3D' | 'ROBLOX';
  status: 'BUILDING' | 'EXPERIMENTING' | 'LEARNING';
  description: string;
  technologies: string[];
  notes?: string;
}

export interface FocusAreaItem {
  id: string;
  title: string;
  description: string;
  details?: string[];
}

export interface RobloxContent {
  title: string;
  headline: string;
  description: string;
  learningFocus: string[];
  status: ContentStatus;
}

export interface AtomicHubContent {
  organization: string;
  role: string;
  summary: string;
  contributions: string[];
  status: ContentStatus;
}

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'x' | 'email' | 'whatsapp';
  label: string;
  url: string;
  status: ContentStatus;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization?: string;
  location?: string;
  period?: string;
  description: string;
  tags?: string[];
  status: ContentStatus;
}

export interface DevlogArticle {
  id: string;
  slug: string;
  title: string;
  publishDate: string;
  readingTime: string;
  summary: string;
  tags: string[];
  content: string[];
  keyHighlights: string[];
  relatedRoute?: string;
}

export interface AssetItem {
  id: string;
  title: string;
  category: 'icons' | 'wallpapers' | 'patterns' | 'ui';
  format: string;
  dimensionOrSize: string;
  license: string;
  source: string;
  description: string;
  downloadUrl: string;
  previewUrl?: string;
  tags: string[];
}

export interface RobloxItem {
  id: string;
  title: string;
  category: 'script' | 'game' | 'mechanic' | 'ui';
  status: 'in_development' | 'learning_prototype' | 'planned';
  description: string;
  tech: string[];
  notes?: string;
}

export interface AtomicMediaItem {
  id: string;
  title: string;
  type: 'image' | 'video';
  platform: string;
  caption: string;
  mediaUrl?: string;
  externalUrl?: string;
  status: ContentStatus;
}

export interface HubStation {
  id: string;
  name: string;
  route: string;
  tagline: string;
  description: string;
  symbol: string;
  color: string;
  planetCoord?: { x: number; y: number; z: number };
}

