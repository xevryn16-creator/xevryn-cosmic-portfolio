// src/sections/ExplorationDeck.tsx
/**
 * XEVRYN Cosmic Portfolio - Section 10: Exploration Deck
 * Interactive solar system observation deck allowing visitors to focus
 * the WebGL camera on various celestial bodies without reloading the scene.
 */

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMotion } from '@/app/providers/MotionProvider';
import { useScene } from '@/app/providers/SceneProvider';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CelestialTarget {
  id: string;
  name: string;
  category: string;
  description: string;
  coordinates: { x: number; y: number; z: number; fov?: number };
}

const CELESTIAL_TARGETS: CelestialTarget[] = [
  {
    id: 'rocky-planet',
    name: 'Planet Berbatu & Bulan',
    category: 'Planet Terestrial',
    description: 'Planet permukaan berbatu dengan kawah multi-skala ber-relief tajam, patahan rille, cekungan maria basaltik, dan bulan pengorbit.',
    coordinates: { x: 1.6, y: -0.2, z: 3.2, fov: 42 },
  },
  {
    id: 'ocean-world',
    name: 'Dunia Samudera (Ocean World)',
    category: 'Planet Berair & Berawan',
    description: 'Bola dunia biru dengan batimetri kedalaman laut, daratan benua organik, dan lapisan awan independen yang berotasi.',
    coordinates: { x: -2.2, y: -3.2, z: 3.0, fov: 44 },
  },
  {
    id: 'red-planet',
    name: 'Planet Merah (Mars-like)',
    category: 'Planet Gurun Oksida Besi',
    description: 'Permukaan berkarat dengan belahan ngarai raksasa Valles Marineris melintasi khatulistiwa dan tudung es kutub.',
    coordinates: { x: 2.6, y: -8.2, z: 3.2, fov: 42 },
  },
  {
    id: 'gas-giant',
    name: 'Gas Giant Berpita',
    category: 'Raksasa Gas Turbulen',
    description: 'Atmosfer tebal dengan pita awan bergelombang dinamis (turbulent flows) dan badai bintik ambar besar (Great Storm Oval).',
    coordinates: { x: -2.8, y: -11.5, z: 3.6, fov: 46 },
  },
  {
    id: 'ringed-world',
    name: 'Planet Bercincin (Saturn-like)',
    category: 'Sistem Planet & Cincin',
    description: 'Piringan cincin es dan debu dengan Ring A, Ring B padat, dan celah Cassini Division yang tembus pandang nyata.',
    coordinates: { x: 2.2, y: -14.8, z: 3.4, fov: 45 },
  },
  {
    id: 'asteroid-belt',
    name: 'Sabuk Asteroid Kosmik',
    category: 'Formasi Batuan Mineral',
    description: 'Kumpulan pecahan batuan mineral instanced (dodecahedron dan octahedron) dengan variasi rona silikat, karbonat, dan besi.',
    coordinates: { x: 0.0, y: -7.5, z: 3.8, fov: 48 },
  },
  {
    id: 'sun-source',
    name: 'Matahari Kosmik (Bintang Induk)',
    category: 'Bintang & Sumber Cahaya',
    description: 'Fotosfer dengan tekstur sel konveksi plasma, bintik matahari ber-umbra/penumbra, dan korona ganda berotasi lambat.',
    coordinates: { x: -5.5, y: 1.5, z: -10.0, fov: 50 },
  },
];

export const ExplorationDeck: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [selectedTargetId, setSelectedTargetId] = useState<string>(CELESTIAL_TARGETS[0].id);
  const { isReduced } = useMotion();
  const { updateCameraTarget } = useScene();

  const activeTarget = CELESTIAL_TARGETS.find((t) => t.id === selectedTargetId) || CELESTIAL_TARGETS[0];

  const handleSelectTarget = (target: CelestialTarget) => {
    setSelectedTargetId(target.id);
    if (!isReduced) {
      updateCameraTarget({
        x: target.coordinates.x,
        y: target.coordinates.y,
        z: target.coordinates.z,
        fov: target.coordinates.fov || 45,
        starSpeed: 0.03,
      });
    }
  };

  const handleResetCamera = () => {
    if (!isReduced) {
      updateCameraTarget({
        x: 0,
        y: -18.0,
        z: 4.8,
        fov: 45,
        starSpeed: 0.05,
      });
    }
  };

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
              start: 'top 75%',
              once: true,
            },
          }
        );
      }

      // Camera base scroll positioning when entering this section naturally
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.3,
        onUpdate: (self) => {
          const p = self.progress;
          // Keep a steady wide observation position across the deck
          updateCameraTarget({
            x: 0.2 - p * 0.4,
            y: -17.5 - p * 2.0,
            z: 5.0,
            starSpeed: 0.04,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReduced, updateCameraTarget]);

  return (
    <section
      id="exploration"
      ref={sectionRef}
      className="section"
      aria-labelledby="exploration-heading"
    >
      <div className="container">
        <div style={{ marginBottom: '40px' }}>
          <div
            className="section-eyebrow"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}
          >
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
              10 / INTERACTIVE EXPLORATION DECK
            </span>
          </div>

          <div style={{ overflow: 'hidden' }}>
            <h2 id="exploration-heading" ref={headingRef} className="section-title">
              Eksplorasi Tata Surya Portofolio
            </h2>
          </div>

          <p className="section-desc" style={{ maxWidth: '64ch' }}>
            Fitur interaktif website ini untuk mengarahkan lensa kamera pengamatan ke berbagai benda langit dan artefak kosmik 3D yang menyertai seluruh alur portofolio.
          </p>

          <p style={{ fontSize: '13px', color: 'var(--color-text-dim)', fontFamily: 'var(--font-mono)', marginTop: '8px' }}>
            *PETUNJUK: Klik salah satu objek di bawah untuk mengarahkan kamera 3D secara langsung.
          </p>
        </div>

        {/* Observation Deck Control Board */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Celestial Buttons Selector */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
            role="tablist"
            aria-label="Pilihan Benda Langit Tata Surya"
          >
            {CELESTIAL_TARGETS.map((target) => {
              const isSelected = target.id === selectedTargetId;
              return (
                <button
                  key={target.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleSelectTarget(target)}
                  className="cosmic-card"
                  style={{
                    padding: '16px 20px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: '10px',
                    border: isSelected
                      ? '1px solid var(--color-cyan-glow)'
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    background: isSelected
                      ? 'linear-gradient(90deg, rgba(56, 189, 248, 0.15) 0%, rgba(15, 23, 42, 0.9) 100%)'
                      : 'rgba(17, 23, 38, 0.8)',
                    boxShadow: isSelected
                      ? '0 0 16px rgba(56, 189, 248, 0.2)'
                      : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: isSelected ? 'var(--color-cyan-glow)' : 'var(--color-text-dim)', display: 'block', marginBottom: '2px' }}>
                      {target.category}
                    </span>
                    <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-main)' }}>
                      {target.name}
                    </span>
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      color: isSelected ? 'var(--color-cyan-glow)' : 'var(--color-text-dim)',
                    }}
                  >
                    {isSelected ? '● FOKUS' : 'ARAHKAN →'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Telemetry Display & Information */}
          <div
            className="cosmic-card"
            style={{
              padding: '36px',
              borderRadius: '14px',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              background: 'linear-gradient(135deg, rgba(11, 17, 32, 0.95) 0%, rgba(15, 23, 42, 0.9) 100%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-cyan-glow)', letterSpacing: '0.1em' }}>
                // TELEMETRI PENELUSURAN KOSMIK
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  background: 'rgba(56, 189, 248, 0.1)',
                  color: 'var(--color-cyan-glow)',
                }}
              >
                TERFOKUS
              </span>
            </div>

            <h3 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '8px' }}>
              {activeTarget.name}
            </h3>

            <div style={{ fontSize: '13px', color: 'var(--color-accent-blue)', fontFamily: 'var(--font-mono)', marginBottom: '18px' }}>
              KOORDINAT WEBGL: [X: {activeTarget.coordinates.x.toFixed(1)}, Y: {activeTarget.coordinates.y.toFixed(1)}, Z: {activeTarget.coordinates.z.toFixed(1)}]
            </div>

            <p style={{ fontSize: '15px', lineHeight: '1.75', color: 'var(--color-text-dim)', marginBottom: '24px' }}>
              {activeTarget.description}
            </p>

            {isReduced && (
              <div
                style={{
                  padding: '12px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  marginBottom: '20px',
                  fontSize: '12px',
                  color: 'var(--color-text-dim)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                [Mode Gerak Berkurang Aktif: Kamera tetap stabil, telemetri disajikan secara statis].
              </div>
            )}

            <button
              type="button"
              onClick={handleResetCamera}
              className="btn btn-secondary"
              style={{ fontSize: '13px', padding: '10px 18px', width: '100%' }}
            >
              ↺ Kembalikan Sudut Pandang Standar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
