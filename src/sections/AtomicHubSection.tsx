// src/sections/AtomicHubSection.tsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { atomicHubContent } from '@/content/atomicHub';
import { useMotion } from '@/app/providers/MotionProvider';
import { useScene } from '@/app/providers/SceneProvider';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const AtomicHubSection: React.FC = () => {
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
            duration: 0.55,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              once: true,
            },
          }
        );
      }

      // Camera drift towards Ringed Planet & orbital satellite
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.3,
        onUpdate: (self) => {
          const p = self.progress;
          updateCameraTarget({
            x: 0.4 - p * 0.3,
            y: -13.0 - p * 1.5,
            z: 4.8,
            starSpeed: 0.05,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReduced, updateCameraTarget]);

  return (
    <section
      id="atomic-hub"
      ref={sectionRef}
      className="section"
      aria-labelledby="atomic-hub-heading"
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
              07 / COMMUNITY CONTRIBUTION
            </span>
          </div>

          <div style={{ overflow: 'hidden' }}>
            <h2 id="atomic-hub-heading" ref={headingRef} className="section-title">
              {atomicHubContent.organization}
            </h2>
          </div>

          <p className="section-desc" style={{ maxWidth: '64ch' }}>
            Kontribusi aktif dalam ekosistem kreator dan pemasaran komunitas game Roblox.
          </p>
        </div>

        {/* Card Layout with Media Support Slot */}
        <div
          ref={cardRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
          }}
        >
          {/* 1. Contribution Card */}
          <div
            className="cosmic-card"
            style={{
              padding: '36px',
              borderRadius: '14px',
              border: '1px solid rgba(56, 189, 248, 0.22)',
              background: 'linear-gradient(135deg, rgba(17, 23, 38, 0.95) 0%, rgba(10, 14, 24, 0.9) 100%)',
              backdropFilter: 'blur(14px)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', color: 'var(--color-cyan-glow)', letterSpacing: '0.08em' }}>
                // PERAN KONTRIBUSI
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  background: 'rgba(56, 189, 248, 0.1)',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  color: 'var(--color-accent-blue)',
                }}
              >
                {atomicHubContent.role}
              </span>
            </div>

            <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '14px' }}>
              {atomicHubContent.summary}
            </h3>

            <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0 0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {atomicHubContent.contributions.map((point, index) => (
                <li
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: 'var(--color-text-dim)',
                  }}
                >
                  <span style={{ color: 'var(--color-accent-blue)', fontWeight: 'bold' }}>•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Media Slot Container */}
          <div
            className="cosmic-card"
            style={{
              padding: '36px',
              borderRadius: '14px',
              border: '1px dashed rgba(56, 189, 248, 0.25)',
              background: 'rgba(11, 17, 32, 0.6)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              minHeight: '220px',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-cyan-glow)',
                marginBottom: '16px',
              }}
              aria-hidden="true"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>

            <div style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-dim)', maxWidth: '38ch', lineHeight: '1.6' }}>
              // SLOT ASET MEDIA RESMI
              <br />
              Wadah visual siap menyematkan materi grafis atau banner resmi Atomic Roblox Hub saat diserahkan pemilik.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
