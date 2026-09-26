// src/content/projectWorlds.ts
/**
 * XEVRYN Cosmic Portfolio - Phase 4: Project Worlds Configuration
 * Data-driven configuration mapping verified projects to celestial environments and
 * verified architecture node graphs.
 * NOTE: Zero fabricated technologies or backend claims. All nodes are strictly
 * based on verified data in projects.ts.
 */

import { ProjectWorldConfig } from '@/types/content';

export const PROJECT_WORLDS: Record<string, ProjectWorldConfig> = {
  'xevryn-cosmic-portfolio': {
    projectId: 'PRJ-COSMIC',
    environment: 'cosmic',
    accentColor: '#38bdf8',
    worldName: 'Cosmic Core Prime',
    worldSubtitle: 'Persistent 3D Solar System & GSAP Timeline Bridge',
    architecture: {
      diagramTitle: 'Single Persistent WebGL Scene + Ref Bridge Architecture',
      nodes: [
        {
          id: 'viewport-dom',
          label: 'Client Viewport & DOM',
          role: 'Browser Interaction Layer',
          category: 'client',
          description: 'Menerima scroll alami peramban tanpa manipulasi roda mouse eksternal (zero scroll-jacking).',
        },
        {
          id: 'gsap-bridge',
          label: 'GSAP ScrollTrigger',
          role: 'Interpolation & Timeline Engine',
          category: 'logic',
          description: 'Mengoreografikan progress scroll dan memperbarui target ref numerik secara mutabel.',
        },
        {
          id: 'r3f-canvas',
          label: 'React Three Fiber Canvas',
          role: 'WebGL Single Scene Loop',
          category: 'engine',
          description: 'Loop useFrame membaca nilai target ref numerik dengan interpolasi damped lerp 60 FPS.',
        },
        {
          id: 'procedural-mesh',
          label: 'Procedural Mesh & Instancing',
          role: 'GPU Render Pipeline',
          category: 'service',
          description: 'Mesh asteroid ter-instance, shader tekstur planet prosedural, dan pinpoint starfield.',
        },
      ],
      edges: [
        { from: 'viewport-dom', to: 'gsap-bridge', label: 'Native Scroll' },
        { from: 'gsap-bridge', to: 'r3f-canvas', label: 'Mutable Ref Bridge' },
        { from: 'r3f-canvas', to: 'procedural-mesh', label: 'useFrame Render' },
      ],
    },
  },

  'xevryn-campus': {
    projectId: 'PRJ-CAMPUS',
    environment: 'system',
    accentColor: '#38bdf8',
    worldName: 'Campus Prime Ocean World',
    worldSubtitle: 'Academic Productivity & Task Management Hub',
    architecture: {
      diagramTitle: 'Modular Academic Workspace & Local Persistence',
      nodes: [
        {
          id: 'campus-ui',
          label: 'Modular React UI',
          role: 'Academic Dashboard & Views',
          category: 'frontend',
          description: 'Komposisi komponen modular yang ringan dengan filter kategori dan mode tampilan gelap.',
        },
        {
          id: 'persistence-layer',
          label: 'Local Storage State Hub',
          role: 'Isolated State Persistence',
          category: 'state',
          description: 'Penyimpanan terisolasi lokal yang cepat dan responsif untuk jadwal dan catatan materi.',
        },
        {
          id: 'schedule-engine',
          label: 'Deadline Tracker Engine',
          role: 'Academic Agenda Logic',
          category: 'logic',
          description: 'Pelacak tenggat waktu tugas terstruktur dengan kalender interaktif mahasiswa.',
        },
      ],
      edges: [
        { from: 'campus-ui', to: 'persistence-layer', label: 'State Sync' },
        { from: 'persistence-layer', to: 'schedule-engine', label: 'Deadline Query' },
      ],
    },
  },

  'campus-whatsapp-bot': {
    projectId: 'PRJ-BOT',
    environment: 'communication',
    accentColor: '#34d399',
    worldName: 'Orbital Telemetry Relay Alpha',
    worldSubtitle: 'Automated Messaging & Academic Dispatch System',
    architecture: {
      diagramTitle: 'Event-Driven WhatsApp Automation Pipeline',
      nodes: [
        {
          id: 'wa-client',
          label: 'WhatsApp Web Client API',
          role: 'Message Stream & Session Gateway',
          category: 'client',
          description: 'Membuka koneksi sesi WhatsApp Web dan mendengarkan event pesan teks masuk.',
        },
        {
          id: 'heartbeat-watcher',
          label: 'Heartbeat & Auto-Retry Loop',
          role: 'Session Resilience Service',
          category: 'service',
          description: 'Menjaga liveness check koneksi dan auto-reconnect saat terputus dari jaringan.',
        },
        {
          id: 'cmd-dispatcher',
          label: 'Modular Command Dispatcher',
          role: 'Instruction Router (!jadwal, !tugas)',
          category: 'logic',
          description: 'Handler perintah modular yang mengekstrak instruksi teks dan menyiapkan respon otomatis.',
        },
        {
          id: 'queue-scheduler',
          label: 'Cron Scheduler & Outbox Queue',
          role: 'Anti-Rate Limit Dispatch Engine',
          category: 'engine',
          description: 'Pengingat jadwal otomatis pagi hari dan antrean kirim berkala untuk pencegahan ban.',
        },
      ],
      edges: [
        { from: 'wa-client', to: 'heartbeat-watcher', label: 'Liveness Check' },
        { from: 'wa-client', to: 'cmd-dispatcher', label: 'Message Stream' },
        { from: 'cmd-dispatcher', to: 'queue-scheduler', label: 'Scheduled Queue' },
      ],
    },
  },

  'retaillab': {
    projectId: 'PRJ-RETAIL',
    environment: 'retail',
    accentColor: '#f97316',
    worldName: 'RetailLab Ring World',
    worldSubtitle: 'Interactive Retail POS & Inventory Practical Simulator',
    architecture: {
      diagramTitle: 'Interactive POS & Real-Time Stock Flow',
      nodes: [
        {
          id: 'pos-ui',
          label: 'Interactive POS Interface',
          role: 'Virtual Cashier & Scanner Form',
          category: 'frontend',
          description: 'Antarmuka kasir interaktif yang ramah siswa kejuruan untuk simulasi transaksi ritel.',
        },
        {
          id: 'cart-math',
          label: 'Transaction & Tax Math Engine',
          role: 'Realtime Price Calculation',
          category: 'logic',
          description: 'Kalkulasi instan untuk harga barang, potongan diskon, dan total tagihan.',
        },
        {
          id: 'stock-simulator',
          label: 'Inventory & Struk Generator',
          role: 'Stock Deduction & Virtual Receipt',
          category: 'state',
          description: 'Pembaruan otomatis stok barang masuk/keluar serta pencetakan struk transaksi virtual.',
        },
      ],
      edges: [
        { from: 'pos-ui', to: 'cart-math', label: 'Item Entry' },
        { from: 'cart-math', to: 'stock-simulator', label: 'Stock Deduction' },
      ],
    },
  },

  'marketra': {
    projectId: 'PRJ-MARKETRA',
    environment: 'system',
    accentColor: '#ef4444',
    worldName: 'Marketra Canyon Red Planet',
    worldSubtitle: 'Integrated Research Workspace & Structured Data Dashboard',
    architecture: {
      diagramTitle: 'Structured Onboarding & Multi-Panel Research Dashboard',
      nodes: [
        {
          id: 'onboarding-layer',
          label: 'Guided Onboarding Flow',
          role: 'Step-by-Step Research Orientation',
          category: 'frontend',
          description: 'Alur panduan terarah yang memperkenalkan struktur data riset tanpa membebani pengguna.',
        },
        {
          id: 'multi-panel-dashboard',
          label: 'Multi-Panel Dashboard',
          role: 'Information Hierarchy Layout',
          category: 'frontend',
          description: 'Susunan komponen modular yang merespons berbagai ukuran resolusi layar peramban.',
        },
        {
          id: 'research-state',
          label: 'Research Catalog State Hub',
          role: 'Data Analysis State Manager',
          category: 'state',
          description: 'Manajemen state terstruktur yang memberikan visual feedback seketika saat kueri dijalankan.',
        },
      ],
      edges: [
        { from: 'onboarding-layer', to: 'multi-panel-dashboard', label: 'Orientation Entry' },
        { from: 'multi-panel-dashboard', to: 'research-state', label: 'Catalog Queries' },
      ],
    },
  },

  'ucapan-buat-kamu': {
    projectId: 'PRJ-UCAPAN',
    environment: 'gift',
    accentColor: '#f43f5e',
    worldName: 'Gift Nebula Cluster',
    worldSubtitle: 'Expressive Personal Micro-Experience with Zero-Server Privacy',
    architecture: {
      diagramTitle: 'Hardware-Accelerated CSS Motion & Client Isolation',
      nodes: [
        {
          id: 'envelope-ui',
          label: 'Interactive Envelope & Card UI',
          role: 'Touch-Responsive Message Interface',
          category: 'frontend',
          description: 'Animasi amplop pembuka dan kartu pesan berlapis dengan mikro-interaksi responsif.',
        },
        {
          id: 'css-gpu',
          label: 'Hardware-Accelerated CSS Engine',
          role: 'Smooth GPU Transforms (translate3d)',
          category: 'engine',
          description: 'Optimasi animasi menggunakan CSS transforms untuk pergerakan mulus tanpa layout thrashing.',
        },
        {
          id: 'client-privacy-sandbox',
          label: 'Client Privacy Sandbox',
          role: 'Zero-Server PII Storage Policy',
          category: 'service',
          description: 'Menjaga privasi penerima secara menyeluruh tanpa menyimpan data pribadi ke server publik.',
        },
      ],
      edges: [
        { from: 'envelope-ui', to: 'css-gpu', label: 'GPU Acceleration' },
        { from: 'envelope-ui', to: 'client-privacy-sandbox', label: 'Private Isolation' },
      ],
    },
  },

  'roblox-projects': {
    projectId: 'PRJ-ROBLOX',
    environment: 'experimental',
    accentColor: '#c084fc',
    worldName: 'Roblox Colossus Gas Giant',
    worldSubtitle: '3D Space Environment & Event-Driven Luau Scripting',
    architecture: {
      diagramTitle: 'Roblox 3D Parts & Event-Driven Luau Logic',
      nodes: [
        {
          id: 'roblox-space-set',
          label: '3D Space Environment Set',
          role: 'Station Geometry & Part Hierarchy',
          category: 'engine',
          description: 'Pembangunan set lingkungan 3D luar angkasa dan stasiun futuristik di Roblox Studio.',
        },
        {
          id: 'luau-event-scripts',
          label: 'Event-Driven Luau Scripts',
          role: 'Trigger & Teleport Mechanics',
          category: 'logic',
          description: 'Skrip interaksi pintu otomatis, tombol pemicu, modul manajemen state, dan sistem teleport.',
        },
        {
          id: 'roblox-physics',
          label: 'Roblox Physics Simulation',
          role: 'Realtime Collision & Gravity Mechanics',
          category: 'service',
          description: 'Simulasi interaksi fisik part dan sinkronisasi mekanika game real-time.',
        },
      ],
      edges: [
        { from: 'roblox-space-set', to: 'luau-event-scripts', label: 'Instance Binding' },
        { from: 'luau-event-scripts', to: 'roblox-physics', label: 'Collision Events' },
      ],
    },
  },

  'xevryn-assets': {
    projectId: 'PRJ-ASSETS',
    environment: 'system',
    accentColor: '#38bdf8',
    worldName: 'Orbital Signal Relay Beta',
    worldSubtitle: 'Curated Design Tokens & Reusable UI Component Specifications',
    architecture: {
      diagramTitle: 'Scalable Design Tokens & Vector Asset Pipeline',
      nodes: [
        {
          id: 'token-system',
          label: 'Architectural Token System',
          role: 'Color, Typography & Radius Specs',
          category: 'state',
          description: 'Standardisasi token arsitektural berskala untuk konsistensi di seluruh lini proyek digital.',
        },
        {
          id: 'vector-library',
          label: 'Original SVG Asset Library',
          role: 'Monograms & Cosmic Patterns',
          category: 'frontend',
          description: 'Koleksi aset grafis SVG asli dan komponen reusable siap unduh.',
        },
      ],
      edges: [
        { from: 'token-system', to: 'vector-library', label: 'Token Binding' },
      ],
    },
  },
};

export function getProjectWorldConfig(slug: string): ProjectWorldConfig | undefined {
  return PROJECT_WORLDS[slug];
}
