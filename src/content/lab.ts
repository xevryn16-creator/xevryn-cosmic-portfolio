// src/content/lab.ts
import { LabItem } from '@/types/content';

export const labContent: LabItem[] = [
  {
    id: 'LAB-01',
    title: 'AI & Autonomous Agent Workflows',
    category: 'AI',
    status: 'LEARNING',
    description:
      'Mengeksplorasi integrasi model bahasa besar (LLM), prompt engineering terstruktur, serta alur agen otonom untuk otomatisasi produktivitas.',
    technologies: ['Gemini API', 'Claude Code', 'Structured Output', 'RAG Concepts'],
  },
  {
    id: 'LAB-02',
    title: 'Automated Campus & Community Bots',
    category: 'AUTOMATION',
    status: 'BUILDING',
    description:
      'Pengembangan bot layanan dan notifikasi kampus berbasis WhatsApp Web API dengan pemrosesan perintah otomatis dan alur respons terjadwal.',
    technologies: ['Node.js', 'WhatsApp Web API', 'Cron', 'Webhook'],
  },
  {
    id: 'LAB-03',
    title: 'Web Application Security & Hardening',
    category: 'CYBERSECURITY',
    status: 'LEARNING',
    description:
      'Mempelajari prinsip OWASP Top 10, sanitasi input, audit dependensi, proteksi header HTTP (CSP, CORS), dan mitigasi celah keamanan web.',
    technologies: ['OWASP Top 10', 'CSP Headers', 'Input Sanitization', 'Dependency Audit'],
  },
  {
    id: 'LAB-04',
    title: 'Procedural 3D Shaders & Space Particles',
    category: 'WEBGL',
    status: 'EXPERIMENTING',
    description:
      'Riset pembuatan shader GLSL kustom, noise prosedural untuk permukaan planet dan korona matahari, serta optimasi instancing partikel bintang.',
    technologies: ['Three.js', 'GLSL Shaders', 'InstancedMesh', 'Simplex Noise'],
  },
  {
    id: 'LAB-05',
    title: 'Luau State Synchronization in Roblox',
    category: 'ROBLOX',
    status: 'EXPERIMENTING',
    description:
      'Eksplorasi replikasi state client-server, event handling terpusat, dan optimasi physics part pada lingkungan 3D Roblox Studio.',
    technologies: ['Roblox Studio', 'Luau Scripting', 'RemoteEvents', 'DataStores'],
  },
  {
    id: 'LAB-06',
    title: 'Realtime Web Audio Ambient Synthesis',
    category: '3D',
    status: 'BUILDING',
    description:
      'Sintesis suara ruang angkasa dan efek sonik interaktif menggunakan Web Audio API murni tanpa file audio eksternal untuk efisiensi transfer.',
    technologies: ['Web Audio API', 'OscillatorNodes', 'BiquadFilter', 'Noise Buffers'],
  },
];
