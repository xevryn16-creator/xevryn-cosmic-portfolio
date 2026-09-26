// src/sections/SpaceHubStations.tsx
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { hubStations } from '@/content/hubStations';
import { useMotion } from '@/app/providers/MotionProvider';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SpaceHubStationsProps {
  onNavigateStation: (route: string) => void;
}

export const SpaceHubStations: React.FC<SpaceHubStationsProps> = ({
  onNavigateStation,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { isReduced } = useMotion();

  useEffect(() => {
    if (isReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isReduced]);

  const activeStations = hubStations.filter((s) => s.id !== 'portfolio');

  return (
    <section
      id="space-hub-stations"
      ref={sectionRef}
      className="section"
      aria-labelledby="stations-heading"
      style={{
        padding: '120px 0 80px',
        position: 'relative',
        zIndex: 5,
      }}
    >
      <div className="container">
        {/* Section Tag */}
        <div className="section-header">
          <div
            className="section-tag"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#38bdf8',
                boxShadow: '0 0 8px #38bdf8',
              }}
              aria-hidden="true"
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                letterSpacing: '0.12em',
                color: '#38bdf8',
              }}
            >
              DERMAGA TRANSIT · XEVRYN SPACE HUB
            </span>
          </div>

          <h2 id="stations-heading" className="section-title">
            Stasiun Luar Angkasa XEVRYN
          </h2>
          <p className="section-desc">
            Pintu masuk menuju modul mandiri Space Hub: laboratorium Luau, galeri hologram Atomic Hub,
            mini game simulasi, katalog aset orisinal, devlog teknis, dan kedai santai Orbit Café.
          </p>
        </div>

        {/* Stations Grid */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
            marginTop: '48px',
          }}
        >
          {activeStations.map((station) => (
            <article
              key={station.id}
              className="station-entry-card"
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                border: `1px solid ${station.color}40`,
                borderRadius: '14px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
                backdropFilter: 'blur(16px)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top Accent Line */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: station.color,
                }}
                aria-hidden="true"
              />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  marginBottom: '16px',
                }}
              >
                <span
                  style={{
                    fontSize: '2rem',
                    lineHeight: 1,
                  }}
                  aria-hidden="true"
                >
                  {station.symbol}
                </span>
                <div>
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      margin: 0,
                    }}
                  >
                    {station.name}
                  </h3>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      color: station.color,
                    }}
                  >
                    {station.tagline}
                  </span>
                </div>
              </div>

              <p
                style={{
                  fontSize: '0.92rem',
                  lineHeight: '1.6',
                  color: 'var(--color-text-dim, #94a3b8)',
                  marginBottom: '24px',
                  flexGrow: 1,
                }}
              >
                {station.description}
              </p>

              <button
                onClick={() => onNavigateStation(station.route)}
                className="btn-enter-station"
                style={{
                  background: 'transparent',
                  border: `1px solid ${station.color}`,
                  color: station.color,
                  padding: '10px 18px',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                  width: '100%',
                }}
              >
                Masuk ke {station.name} <span aria-hidden="true">→</span>
              </button>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .station-entry-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
        }

        .btn-enter-station:hover, .btn-enter-station:focus-visible {
          background: rgba(255, 255, 255, 0.08) !important;
          transform: scale(1.02);
          outline: none;
        }
      `}</style>
    </section>
  );
};
