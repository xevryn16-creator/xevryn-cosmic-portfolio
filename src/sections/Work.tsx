// src/sections/Work.tsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsContent } from '@/content/projects';
import { ProjectTrack } from '@/components/projects/ProjectTrack';
import { useMotion } from '@/app/providers/MotionProvider';
import { useScene } from '@/app/providers/SceneProvider';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface WorkProps {
  onInspectProject?: (slug: string) => void;
}

export const Work: React.FC<WorkProps> = ({ onInspectProject }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [selectedPlanetIndex, setSelectedPlanetIndex] = useState(0);
  const { isReduced } = useMotion();
  const { updateCameraTarget } = useScene();

  const celestialPlanets = [
    { name: 'Cosmic Core', type: 'Matahari', color: '#f59e0b', slug: 'xevryn-cosmic-portfolio', icon: '☀️' },
    { name: 'Campus Prime', type: 'Dunia Samudra', color: '#38bdf8', slug: 'xevryn-campus', icon: '🌊' },
    { name: 'Comm Satellite', type: 'Relai Otomasi', color: '#34d399', slug: 'campus-whatsapp-bot', icon: '🛰️' },
    { name: 'Retail Rock', type: 'Planet Batuan', color: '#f97316', slug: 'retaillab', icon: '🪨' },
    { name: 'Gift Nebula', type: 'Nebula Hangat', color: '#f43f5e', slug: 'ucapan-buat-kamu', icon: '✨' },
    { name: 'Roblox Colossus', type: 'Raksasa Gas', color: '#c084fc', slug: 'roblox-projects', icon: '🪐' },
  ];

  useEffect(() => {
    if (isReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: '100%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      // Camera position adjustment for Work: traversing through solar system
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 0.3,
        onUpdate: (self) => {
          const p = self.progress;
          updateCameraTarget({
            z: 4.8 - p * 0.4,
            x: -0.3 + p * 0.6,
            y: -11.0 - p * 1.5,
            rotY: 0.1 - p * 0.2,
            starSpeed: 0.08,
            warpFactor: 0.0,
            fov: 45,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReduced, updateCameraTarget]);

  const handlePlanetSelect = (idx: number, slug: string) => {
    setSelectedPlanetIndex(idx);
    if (onInspectProject) {
      onInspectProject(slug);
    }
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="section"
      aria-label="Work Section: Project Solar System"
    >
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div className="section-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--color-cyan-glow)',
                boxShadow: '0 0 8px var(--color-cyan-glow)',
              }}
              aria-hidden="true"
            />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.12em', color: 'var(--color-cyan-glow)' }}>
              07 / PROJECT SOLAR SYSTEM
            </span>
          </div>

          <div style={{ overflow: 'hidden' }}>
            <h2 id="work-heading" ref={headingRef} className="section-title">
              Tata Surya Proyek &amp; Karya Digital
            </h2>
          </div>

          <p className="section-desc" style={{ maxWidth: '64ch' }}>
            Setiap proyek direpresentasikan sebagai objek angkasa dalam tata surya XEVRYN. Sorot planet untuk melihat orbitnya atau pilih karya untuk mendekat ke antarmuka teknis.
          </p>

          {/* Celestial Orbit Mini Radar / Selector */}
          <div
            className="solar-system-radar"
            style={{
              marginTop: '28px',
              padding: '16px 20px',
              background: 'rgba(15, 23, 42, 0.75)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: '12px',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px' }}>🪐</span>
              <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-dim)', letterSpacing: '0.08em' }}>
                RADAR ORBIT KARYA:
              </span>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {celestialPlanets.map((pl, i) => (
                <button
                  key={pl.slug}
                  type="button"
                  onClick={() => handlePlanetSelect(i, pl.slug)}
                  data-cursor="open"
                  style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: selectedPlanetIndex === i ? `${pl.color}25` : 'rgba(255, 255, 255, 0.04)',
                    border: selectedPlanetIndex === i ? `1px solid ${pl.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                    color: selectedPlanetIndex === i ? '#ffffff' : 'var(--color-text-dim)',
                    transition: 'all 0.2s ease',
                  }}
                  aria-label={`Inspect ${pl.name} (${pl.type})`}
                >
                  <span style={{ color: pl.color }}>{pl.icon}</span>
                  <span>{pl.name}</span>
                  <span style={{ fontSize: '9px', opacity: 0.7 }}>[{pl.type}]</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Showcase Track */}
        <ProjectTrack
          projects={projectsContent}
          onInspectProject={onInspectProject}
        />
      </div>
    </section>
  );
};
