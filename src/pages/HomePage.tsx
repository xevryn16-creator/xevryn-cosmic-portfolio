// src/pages/HomePage.tsx
import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Experience } from '@/sections/Experience';
import { Media3Archive } from '@/sections/Media3Archive';
import { Skills } from '@/sections/Skills';
import { Work } from '@/sections/Work';
import { ExplorationDeck } from '@/sections/ExplorationDeck';
import { RobloxSection } from '@/sections/RobloxSection';
import { AtomicHubSection } from '@/sections/AtomicHubSection';
import { XevrynLab } from '@/sections/XevrynLab';
import { TerminalSection } from '@/sections/TerminalSection';
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
    const triggers: ScrollTrigger[] = [];

    // 1. Hero & About: Deep space blue
    triggers.push(
      ScrollTrigger.create({
        trigger: '#hero',
        start: 'top top',
        end: 'bottom center',
        onEnter: () => setAmbientTone('deep_blue'),
        onEnterBack: () => setAmbientTone('deep_blue'),
      })
    );

    // 2. Experience & Media 3: Warm amber tone
    triggers.push(
      ScrollTrigger.create({
        trigger: '#experience',
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => setAmbientTone('amber'),
        onEnterBack: () => setAmbientTone('amber'),
      })
    );

    // 3. Skills, Projects & Roblox: Cosmic violet
    triggers.push(
      ScrollTrigger.create({
        trigger: '#skills',
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => setAmbientTone('violet'),
        onEnterBack: () => setAmbientTone('violet'),
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
      {/* 1. BOOT SEQUENCE & COSMIC HERO */}
      <Hero />

      {/* 2. WHO IS XEVRYN */}
      <About />

      {/* 3. EXPERIENCE TIMELINE (SMAN 3 → Media 3 → Coffee Street → Web Dev) */}
      <Experience />

      {/* 4. MEDIA 3 / CREATIVE ARCHIVE */}
      <Media3Archive />

      {/* 5. SKILL CONSTELLATION */}
      <Skills />

      {/* 6. PROJECT SOLAR SYSTEM */}
      <Work onInspectProject={onInspectProject} />

      {/* 7. PROJECT EXPLORATION & CELESTIAL RADAR */}
      <ExplorationDeck />

      {/* 8. ROBLOX / DIGITAL PLAYGROUND */}
      <RobloxSection />

      {/* 9. ATOMIC ROBLOX HUB */}
      <AtomicHubSection />

      {/* 10. XEVRYN LAB (AI, Automation, Cybersecurity, WebGL) */}
      <XevrynLab />

      {/* 11. DEVELOPER TERMINAL */}
      <TerminalSection />

      {/* 12. SPACE HUB STATIONS (Modular Transit) */}
      <SpaceHubStations onNavigateStation={onNavigateStation} />

      {/* 13. SEND A TRANSMISSION (Contact & Ending Horizon) */}
      <Contact />

      {/* Mini Jump Map & Easter Egg Signal Controls */}
      <SpaceHubNavigator />
    </main>
  );
};
