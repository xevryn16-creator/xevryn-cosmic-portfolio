// src/sections/MoreProjects.tsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsContent } from '@/content/projects';
import { useMotion } from '@/app/providers/MotionProvider';
import { useScene } from '@/app/providers/SceneProvider';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface MoreProjectsProps {
  onInspectProject?: (slug: string) => void;
}

export const MoreProjects: React.FC<MoreProjectsProps> = ({ onInspectProject }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { isReduced } = useMotion();
  const { updateCameraTarget } = useScene();

  const otherProjects = projectsContent.slice(3); // Ucapan-Buat-Kamu & Xevryn Forge

  useEffect(() => {
    if (isReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading reveal
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

      // Cards entrance
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              once: true,
            },
          }
        );
      }

      // Camera drift near Red Planet and outer asteroid belt
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.3,
        onUpdate: (self) => {
          const p = self.progress;
          updateCameraTarget({
            x: 0.8 - p * 0.4,
            y: -7.0 - p * 1.5,
            z: 4.6,
            fov: 44,
            starSpeed: 0.05,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReduced, updateCameraTarget]);

  return (
    <section
      id="more-projects"
      ref={sectionRef}
      className="section"
      aria-labelledby="more-projects-heading"
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
                background: 'var(--color-accent-blue)',
                boxShadow: '0 0 8px var(--color-accent-blue)',
              }}
              aria-hidden="true"
            />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.12em', color: 'var(--color-accent-blue)' }}>
              05 / MORE PROJECTS
            </span>
          </div>

          <div style={{ overflow: 'hidden' }}>
            <h2 id="more-projects-heading" ref={headingRef} className="section-title">
              Inisiatif &amp; Eksplorasi Lainnya
            </h2>
          </div>

          <p className="section-desc" style={{ maxWidth: '64ch' }}>
            Karya web interaktif dan inisiatif digital personal yang dibangun dengan perhatian khusus pada kenyamanan interaksi dan privasi pengguna.
          </p>
        </div>

        {/* Projects Grid */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
          }}
        >
          {otherProjects.map((p) => (
            <article
              key={p.id}
              className="cosmic-card"
              style={{
                padding: '32px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, rgba(17, 23, 38, 0.95) 0%, rgba(10, 14, 24, 0.9) 100%)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      color: 'var(--color-cyan-glow)',
                      letterSpacing: '0.08em',
                    }}
                  >
                    // {p.id} · {p.year}
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      padding: '3px 10px',
                      borderRadius: '4px',
                      background: 'rgba(56, 189, 248, 0.1)',
                      border: '1px solid rgba(56, 189, 248, 0.25)',
                      color: 'var(--color-accent-blue)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {p.role}
                  </span>
                </div>

                <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-text-main)', margin: '0 0 12px 0' }}>
                  {p.title}
                </h3>

                <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'var(--color-text-dim)', margin: '0 0 18px 0' }}>
                  {p.summary}
                </p>

                {/* Privacy Badge on Gift Project */}
                {p.slug === 'ucapan-buat-kamu' && (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      marginBottom: '20px',
                      fontSize: '12px',
                      color: 'var(--color-text-dim)',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>Informasi personal penerima dilindungi</span>
                  </div>
                )}
              </div>

              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '11px',
                        fontFamily: 'var(--font-mono)',
                        padding: '4px 9px',
                        borderRadius: '4px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: 'var(--color-text-dim)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => onInspectProject?.(p.slug)}
                  className="btn btn-secondary"
                  style={{ width: '100%', fontSize: '13px', padding: '10px 16px' }}
                >
                  Detail &amp; Pendekatan Proyek →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
