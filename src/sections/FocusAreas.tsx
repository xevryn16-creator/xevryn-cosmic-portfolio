// src/sections/FocusAreas.tsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { focusAreasContent } from '@/content/focus';
import { useMotion } from '@/app/providers/MotionProvider';
import { useScene } from '@/app/providers/SceneProvider';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const FocusAreas: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { isReduced } = useMotion();
  const { updateCameraTarget } = useScene();

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

      // Grid cards entrance
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              once: true,
            },
          }
        );
      }

      // Camera drift through celestial ocean world & towards asteroid belt
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.3,
        onUpdate: (self) => {
          const p = self.progress;
          updateCameraTarget({
            z: 4.2 - p * 0.2,
            x: -0.4 + p * 0.5,
            y: -1.2 - p * 1.5,
            rotY: 0.15 - p * 0.1,
            starSpeed: 0.05,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReduced, updateCameraTarget]);

  return (
    <section
      id="focus"
      ref={sectionRef}
      className="section"
      aria-labelledby="focus-heading"
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
              03 / FOCUS AREAS
            </span>
          </div>

          <div style={{ overflow: 'hidden' }}>
            <h2 id="focus-heading" ref={headingRef} className="section-title">
              Bidang yang Saya Kerjakan
            </h2>
          </div>

          <p className="section-desc" style={{ maxWidth: '64ch' }}>
            Cakupan aktivitas dan eksplorasi yang ditekuni secara nyata—mulai dari perancangan antarmuka web, lingkungan game Roblox, hingga produksi konten komunitas.
          </p>
        </div>

        {/* 4 Focus Areas Grid */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {focusAreasContent.map((item, index) => (
            <article
              key={item.id}
              className="cosmic-card"
              style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                background: 'linear-gradient(135deg, rgba(17, 23, 38, 0.9) 0%, rgba(10, 14, 24, 0.85) 100%)',
                borderRadius: '12px',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      color: 'var(--color-cyan-glow)',
                      letterSpacing: '0.1em',
                    }}
                  >
                    // 0{index + 1}
                  </span>
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--color-accent-blue)',
                      opacity: 0.8,
                    }}
                    aria-hidden="true"
                  />
                </div>

                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: 'var(--color-text-main)',
                    lineHeight: '1.4',
                    marginBottom: '12px',
                  }}
                >
                  {item.title}
                </h3>

                <p
                  className="text-muted"
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.7',
                    margin: 0,
                  }}
                >
                  {item.description}
                </p>
              </div>

              {item.details && item.details.length > 0 && (
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    marginTop: '20px',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  {item.details.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '11px',
                        fontFamily: 'var(--font-mono)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        background: 'rgba(56, 189, 248, 0.08)',
                        border: '1px solid rgba(56, 189, 248, 0.18)',
                        color: 'var(--color-text-dim)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
