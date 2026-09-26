// src/sections/RobloxSection.tsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { robloxContent } from '@/content/roblox';
import { useMotion } from '@/app/providers/MotionProvider';
import { useScene } from '@/app/providers/SceneProvider';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const RobloxSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { isReduced } = useMotion();
  const { updateCameraTarget } = useScene();

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

      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              once: true,
            },
          }
        );
      }

      // Camera drift near Gas Giant & stormy bands
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.3,
        onUpdate: (self) => {
          const p = self.progress;
          updateCameraTarget({
            x: -0.6 + p * 0.4,
            y: -10.2 - p * 1.6,
            z: 4.8,
            rotY: -0.15 + p * 0.1,
            starSpeed: 0.05,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReduced, updateCameraTarget]);

  return (
    <section
      id="roblox"
      ref={sectionRef}
      className="section"
      aria-labelledby="roblox-heading"
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
                background: 'var(--color-nebula-violet)',
                boxShadow: '0 0 8px var(--color-nebula-violet)',
              }}
              aria-hidden="true"
            />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.12em', color: 'var(--color-nebula-violet)' }}>
              06 / ROBLOX DEVELOPMENT
            </span>
          </div>

          <div style={{ overflow: 'hidden' }}>
            <h2 id="roblox-heading" ref={headingRef} className="section-title">
              {robloxContent.title}
            </h2>
          </div>

          <p className="section-desc" style={{ maxWidth: '64ch' }}>
            {robloxContent.headline}
          </p>
        </div>

        {/* Main Content Layout */}
        <div
          ref={cardRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
          }}
        >
          {/* 1. Context & Description Card */}
          <div
            className="cosmic-card"
            style={{
              padding: '36px',
              borderRadius: '14px',
              border: '1px solid rgba(192, 132, 252, 0.25)',
              background: 'linear-gradient(135deg, rgba(24, 16, 44, 0.92) 0%, rgba(10, 14, 24, 0.95) 100%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(14px)',
            }}
          >
            <div
              style={{
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-nebula-violet)',
                letterSpacing: '0.12em',
                marginBottom: '16px',
                textTransform: 'uppercase',
              }}
            >
              // PLATFORM &amp; PERSPEKTIF BELAJAR
            </div>

            <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--color-text-main)', margin: '0 0 24px 0' }}>
              {robloxContent.description}
            </p>

            <div
              style={{
                padding: '16px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.07)',
              }}
            >
              <span style={{ fontSize: '13px', color: 'var(--color-text-dim)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '4px' }}>
                STATUS KARYA / PROYEK:
              </span>
              <p style={{ fontSize: '14px', color: 'var(--color-text-main)', margin: 0, lineHeight: '1.6' }}>
                Eksperimen game dan logika script saat ini berada dalam tahap eksplorasi aktif. Rilisan proyek resmi akan ditambahkan secara langsung pada seksi ini saat siap dipublikasikan.
              </p>
            </div>
          </div>

          {/* 2. Focus & Learning Modules Card */}
          <div
            className="cosmic-card"
            style={{
              padding: '36px',
              borderRadius: '14px',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              background: 'linear-gradient(135deg, rgba(17, 23, 38, 0.95) 0%, rgba(10, 14, 24, 0.9) 100%)',
              backdropFilter: 'blur(14px)',
            }}
          >
            <div
              style={{
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-cyan-glow)',
                letterSpacing: '0.12em',
                marginBottom: '16px',
                textTransform: 'uppercase',
              }}
            >
              // AREA EKSPLORASI TEKNIS
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {robloxContent.learningFocus.map((item, index) => (
                <li
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    fontSize: '15px',
                    lineHeight: '1.6',
                    color: 'var(--color-text-dim)',
                  }}
                >
                  <span
                    style={{
                      marginTop: '6px',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--color-cyan-glow)',
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: '28px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Roblox Studio', 'Lua / Luau', 'Event Driven Logic', '3D Environment'].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    background: 'rgba(56, 189, 248, 0.08)',
                    border: '1px solid rgba(56, 189, 248, 0.2)',
                    color: 'var(--color-accent-blue)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
