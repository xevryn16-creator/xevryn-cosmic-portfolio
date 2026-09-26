// src/pages/HomePage.tsx
import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { FocusAreas } from '@/sections/FocusAreas';
import { Work } from '@/sections/Work';
import { MoreProjects } from '@/sections/MoreProjects';
import { RobloxSection } from '@/sections/RobloxSection';
import { AtomicHubSection } from '@/sections/AtomicHubSection';
import { Experience } from '@/sections/Experience';
import { Skills } from '@/sections/Skills';
import { ExplorationDeck } from '@/sections/ExplorationDeck';
import { SpaceHubStations } from '@/sections/SpaceHubStations';
import { Contact } from '@/sections/Contact';
import { SpaceHubNavigator } from '@/components/layout/SpaceHubNavigator';
import { useScene } from '@/app/providers/SceneProvider';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HomePageProps {
  onInspectProject?: (slug: string) => void;
  onNavigateStation?: (route: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onInspectProject,
  onNavigateStation = (route) => {
    window.location.hash = route;
  },
}) => {
  const { setAmbientTone } = useScene();

  useEffect(() => {
    // Gradual ambient atmosphere color shifts across the journey
    const triggers: ScrollTrigger[] = [];

    // 1. Hero to Work: Deep space blue
    triggers.push(
      ScrollTrigger.create({
        trigger: '#hero',
        start: 'top top',
        end: 'bottom center',
        onEnter: () => setAmbientTone('deep_blue'),
        onEnterBack: () => setAmbientTone('deep_blue'),
      })
    );

    // 2. Roblox to Atomic: Cosmic violet
    triggers.push(
      ScrollTrigger.create({
        trigger: '#roblox',
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => setAmbientTone('violet'),
        onEnterBack: () => setAmbientTone('violet'),
      })
    );

    // 3. Experience (Barista): Warm coffee amber
    triggers.push(
      ScrollTrigger.create({
        trigger: '#experience',
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => setAmbientTone('amber'),
        onEnterBack: () => setAmbientTone('amber'),
      })
    );

    // 4. Contact Horizon: Peach-cyan dawn
    triggers.push(
      ScrollTrigger.create({
        trigger: '#contact',
        start: 'top 70%',
        onEnter: () => setAmbientTone('dawn'),
        onEnterBack: () => setAmbientTone('dawn'),
      })
    );

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [setAmbientTone]);

  return (
    <main id="main-content" className="content-stack">
      {/* 1. Hero (Orbit, Identitas XEVRYN, Scope Subtitle) */}
      <Hero />

      {/* 2. About (Identitas Daffa, Narasi Bio Terkonfirmasi) */}
      <About />

      {/* 3. Bidang yang Saya Kerjakan (4 Pilar Aktivitas) */}
      <FocusAreas />

      {/* 4. Selected Web Projects (3 Karya Utama Web dalam Bingkai Monitor) */}
      <Work onInspectProject={onInspectProject} />

      {/* 5. More Projects (Inisiatif & Eksplorasi Lainnya) */}
      <MoreProjects onInspectProject={onInspectProject} />

      {/* 6. Roblox Development (Eksplorasi Studio & Lua/Luau) */}
      <RobloxSection />

      {/* 7. Atomic Roblox Hub (Content Creator & Pemasaran) */}
      <AtomicHubSection />

      {/* 8. Pengalaman Kerja (Barista & Kasir 11/12 coffe street Sumedang + Coffee Break in Orbit) */}
      <Experience />

      {/* 9. Skills Constellation (Matriks 5 Kelompok Kemampuan) */}
      <Skills />

      {/* 10. Exploration Deck (Fitur Interaktif Navigasi Tata Surya) */}
      <ExplorationDeck />

      {/* Stasiun Transit Modular Space Hub */}
      <SpaceHubStations onNavigateStation={onNavigateStation} />

      {/* 11. Contact & Transmission Horizon (Lengkung Fajar & Kontak Terverifikasi) */}
      <Contact />

      {/* Floating Mini Journey Jump Map & Easter Egg Signal Controls */}
      <SpaceHubNavigator />
    </main>
  );
};
