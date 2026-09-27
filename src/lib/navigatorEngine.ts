// src/lib/navigatorEngine.ts
// XEVRYN Portfolio Navigator Engine
// Deterministic, offline-capable intent detection — no AI API required.

import { projectsContent } from '@/content/projects';
import { skillsContent } from '@/content/skills';
import { UniverseLocation } from '@/types/universe';

export type NavigatorIntent =
  | 'OPEN_PROJECT'
  | 'OPEN_SKILL'
  | 'GOTO_SECTOR'
  | 'TOGGLE_EXPLORE'
  | 'EXPLORE'
  | 'OPEN_TERMINAL'
  | 'OPEN_MAP'
  | 'OPEN_CONTACT'
  | 'CONTACT'
  | 'UNKNOWN';

export interface NavigatorResult {
  intent: NavigatorIntent;
  target: string;
  label: string;
  description: string;
  action: string;
  confidence: number;
  slug?: string;
  sector?: UniverseLocation;
  icon?: string;
}

// Sector keyword mapping
const SECTOR_KEYWORDS: { id: UniverseLocation; keywords: string[]; label: string; icon: string }[] = [
  { id: 'home', keywords: ['home', 'hero', 'mulai', 'xevryn', 'start', 'awal'], label: 'Xevryn Core', icon: '✦' },
  { id: 'identity', keywords: ['about', 'tentang', 'identity', 'identitas', 'dna', 'profil', 'profile', 'bio', 'siapa'], label: 'Identity Archive', icon: '◎' },
  { id: 'experience', keywords: ['experience', 'pengalaman', 'timeline', 'orbit', 'history', 'riwayat', 'kerja', 'media', 'barista'], label: 'Orbital Timeline', icon: '◌' },
  { id: 'media', keywords: ['media', 'film', 'cinema', 'archive', 'video', 'creative', 'sinema', 'arsip', 'media3'], label: 'Creative Film Archive', icon: '▶' },
  { id: 'skills', keywords: ['skills', 'skill', 'keahlian', 'teknologi', 'tech', 'network', 'kemampuan', 'ability'], label: 'Skill Network', icon: '⬡' },
  { id: 'projects', keywords: ['work', 'projects', 'proyek', 'karya', 'solar', 'planet', 'world', 'portfolio', 'showcase'], label: 'Project Constellation', icon: '🪐' },
  { id: 'lab', keywords: ['lab', 'laboratory', 'eksperimen', 'experiment', 'atomic', 'hub', 'roblox'], label: 'Xevryn Lab', icon: '⚗' },
  { id: 'contact', keywords: ['contact', 'kontak', 'hubungi', 'email', 'communication', 'station', 'wa', 'whatsapp'], label: 'Communication Station', icon: '📡' },
];

// Project slug to name aliases
const PROJECT_ALIASES: Record<string, string[]> = {
  'xevryn-cosmic-portfolio': ['cosmic', 'portfolio', 'xevryn cosmic', 'this site', 'website'],
  'xevryn-campus': ['campus', 'academic', 'universitas', 'kampus'],
  'campus-whatsapp-bot': ['whatsapp', 'bot', 'wa bot', 'otomasi', 'automation'],
  'retaillab': ['retail', 'lab retail', 'retaillab', 'toko'],
  'ucapan-buat-kamu': ['ucapan', 'greeting', 'hadiah', 'birthday'],
  'roblox-projects': ['roblox', 'rblx', 'lua', 'luau'],
  'marketra': ['market', 'marketra'],
  'xevryn-assets': ['asset', 'assets', 'design'],
};

// Normalize text for comparison
function normalize(text: string): string {
  return text.toLowerCase().trim().replace(/[^\w\s]/g, '');
}

// Score a string match: exact > startsWith > includes
function scoreMatch(query: string, target: string): number {
  const q = normalize(query);
  const t = normalize(target);
  if (t === q) return 1.0;
  if (t.startsWith(q)) return 0.85;
  if (t.includes(q)) return 0.7;
  // Word-level partial match
  const words = q.split(' ').filter(Boolean);
  const matchCount = words.filter((w) => t.includes(w)).length;
  if (matchCount === words.length) return 0.65;
  if (matchCount > 0) return 0.4 + 0.1 * matchCount;
  return 0;
}

export function queryNavigator(rawQuery: string): NavigatorResult[] {
  const q = rawQuery.trim();
  if (!q) return [];

  const results: NavigatorResult[] = [];

  // 1. Check for project matches
  for (const proj of projectsContent) {
    let best = 0;
    best = Math.max(best, scoreMatch(q, proj.title));
    best = Math.max(best, scoreMatch(q, proj.slug));
    best = Math.max(best, scoreMatch(q, proj.summary));
    const aliases = PROJECT_ALIASES[proj.slug] || [];
    for (const alias of aliases) {
      best = Math.max(best, scoreMatch(q, alias));
    }
    for (const tag of proj.tags) {
      best = Math.max(best, scoreMatch(q, tag) * 0.75);
    }
    if (best >= 0.3) {
      results.push({
        intent: 'OPEN_PROJECT',
        target: proj.slug,
        label: proj.title,
        description: proj.summary.slice(0, 90) + '…',
        action: 'openProjectWorld',
        confidence: best,
        slug: proj.slug,
        icon: '🪐',
      });
    }
  }

  // 2. Check for skill matches
  for (const skill of skillsContent) {
    let best = 0;
    best = Math.max(best, scoreMatch(q, skill.label));
    best = Math.max(best, scoreMatch(q, skill.description));
    best = Math.max(best, scoreMatch(q, skill.category));
    if (best >= 0.4) {
      results.push({
        intent: 'OPEN_SKILL',
        target: skill.id,
        label: skill.label,
        description: skill.description.slice(0, 80) + '…',
        action: 'navigateTo:skills',
        confidence: best * 0.85,
        slug: skill.id,
        icon: '⬡',
      });
    }
  }

  // 3. Check for sector navigation
  for (const sec of SECTOR_KEYWORDS) {
    let best = 0;
    for (const kw of sec.keywords) {
      best = Math.max(best, scoreMatch(q, kw));
    }
    if (best >= 0.45) {
      results.push({
        intent: 'GOTO_SECTOR',
        target: sec.id,
        label: sec.label,
        description: `Navigate to ${sec.label} sector`,
        action: 'navigateTo',
        confidence: best * 0.9,
        sector: sec.id,
        icon: sec.icon,
      });
    }
  }

  // 4. Explore mode keywords
  const exploreKeywords = ['explore', 'free roam', 'orbit', 'jelajah', 'fly'];
  if (exploreKeywords.some((kw) => normalize(q).includes(normalize(kw)))) {
    results.push({
      intent: 'TOGGLE_EXPLORE',
      target: 'explore',
      label: 'Free Explore Mode',
      description: 'Aktifkan orbital free-roam camera',
      action: 'toggleNavigationMode',
      confidence: 0.85,
      icon: '🚀',
    });
  }

  // 5. Terminal keywords
  const termKeywords = ['terminal', 'console', 'bash', 'cmd'];
  if (termKeywords.some((kw) => normalize(q).includes(normalize(kw)))) {
    results.push({
      intent: 'OPEN_TERMINAL',
      target: 'terminal',
      label: 'Developer Terminal',
      description: 'Buka terminal interaktif portfolio',
      action: 'navigateTo:terminal',
      confidence: 0.9,
      icon: '>_',
    });
  }

  // 6. Map keywords
  const mapKeywords = ['map', 'peta', 'universe map', 'star map'];
  if (mapKeywords.some((kw) => normalize(q).includes(normalize(kw)))) {
    results.push({
      intent: 'OPEN_MAP',
      target: 'map',
      label: 'Universe Star Map',
      description: 'Buka tactical universe map',
      action: 'openUniverseMap',
      confidence: 0.9,
      icon: '🗺',
    });
  }

  // Sort by confidence descending, deduplicate by target
  const seen = new Set<string>();
  return results
    .sort((a, b) => b.confidence - a.confidence)
    .filter((r) => {
      const key = `${r.intent}:${r.target}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 8);
}

// Convenience: get top result
export function findBestResult(query: string): NavigatorResult | null {
  const results = queryNavigator(query);
  return results.length > 0 && results[0].confidence >= 0.5 ? results[0] : null;
}
