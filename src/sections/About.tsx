// src/sections/About.tsx
/**
 * XEVRYN Cosmic Portfolio - Section 02: About (ANM-023 to ANM-030)
 * Calm Zone with masked headings, accessible bio lines, metadata pills,
 * portrait frame fallback, and transition towards Warp speed.
 */

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profileContent } from '@/content/profile';
import { useMotion } from '@/app/providers/MotionProvider';
import { useScene } from '@/app/providers/SceneProvider';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { isReduced } = useMotion();
  const { updateCameraTarget } = useScene();

  useEffect(() => {
    if (isReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // ANM-023: Masked Heading Reveal
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

      // ANM-024 & ANM-028: Bio Lines and Metadata Pills entrance
      const bioLines = sectionRef.current?.querySelectorAll('.about-bio-line');
      if (bioLines && bioLines.length > 0) {
        gsap.fromTo(
          bioLines,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              once: true,
            },
          }
        );
      }

      const pills = sectionRef.current?.querySelectorAll('.about-pill');
      if (pills && pills.length > 0) {
        gsap.fromTo(
          pills,
          { y: 8, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.35,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              once: true,
            },
          }
        );
      }

      // ScrollTrigger for Calm Zone, Camera Orbit (ANM-029) and Warp Transition (ANM-030)
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.3,
        onUpdate: (self) => {
          const p = self.progress;

          if (p < 0.75) {
            // Calm zone (p: 0.1 to 0.75): steady camera, lower star speed, subtle orbit rotation
            updateCameraTarget({
              z: 3.8,
              x: 0.6 - p * 0.4,
              y: 0.2,
              rotY: p * 0.2, // ANM-029: 12 degree partial orbit
              starSpeed: 0.05,
              nebulaDensity: 1.0,
              warpFactor: 0.0,
            });
          } else {
            // ANM-030: About to Warp Exit (p: 0.75 - 1.0)
            const exitP = (p - 0.75) / 0.25;
            updateCameraTarget({
              nebulaDensity: 1.0 - exitP * 0.75, // Dims to 0.25
              starSpeed: 0.05 + exitP * 0.4,
              warpFactor: exitP * 0.6, // Star stretching onset (ANM-031)
              fov: 45 + exitP * 15,
            });
          }
        },
        onLeaveBack: () => {
          // Return to orbit view
          updateCameraTarget({
            z: 5.5,
            x: 0,
            y: 0,
            rotY: 0,
            starSpeed: 0.15,
            nebulaDensity: 1.0,
            warpFactor: 0.0,
            fov: 45,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReduced, updateCameraTarget]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section"
      aria-label="Seksi Tentang: Identitas dan Profil"
    >
      <div className="container">
        <div className="calm-zone">
          <div className="section-eyebrow">// 02 · TENTANG SAYA</div>

          {/* ANM-023: Masked Heading */}
          <div style={{ overflow: 'hidden' }}>
            <h2 id="about-heading" ref={headingRef} className="section-title">
              Tentang Kreator &amp; Pendekatan Karya
            </h2>
          </div>

          <div className="grid-2" style={{ marginTop: '32px', alignItems: 'start', gap: '40px' }}>
            <div>
              {/* ANM-024 & ANM-025: Accessible Bio with natural Indonesian narrative */}
              {profileContent.bioFull.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="about-bio-line text-muted max-readable"
                  style={{ fontSize: '18px', lineHeight: '1.75', marginBottom: '20px' }}
                >
                  {paragraph}
                </p>
              ))}

              {/* Visual Storytelling Journey Trail */}
              <div
                style={{
                  marginTop: '28px',
                  padding: '16px 20px',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                  borderRadius: '12px',
                }}
              >
                <div
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-cyan-glow)',
                    letterSpacing: '0.12em',
                    marginBottom: '12px',
                  }}
                >
                  // PERJALANAN EKSPLORASI KREATIF KE TEKNOLOGI
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    flexWrap: 'wrap',
                    fontSize: '12px',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {[
                    'SMAN 3 SUMEDANG',
                    'MEDIA 3',
                    'CREATIVE MEDIA',
                    'WEB DEVELOPMENT',
                    'DIGITAL PROJECTS',
                    'COLLEGE',
                    'XEVRYN',
                  ].map((step, i, arr) => (
                    <React.Fragment key={step}>
                      <span
                        style={{
                          color: i === arr.length - 1 ? 'var(--color-cyan-glow)' : 'var(--color-text-main)',
                          fontWeight: i === arr.length - 1 ? 700 : 500,
                          background: i === arr.length - 1 ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                          padding: '3px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        {step}
                      </span>
                      {i < arr.length - 1 && (
                        <span style={{ color: 'var(--color-accent-blue)', opacity: 0.6 }} aria-hidden="true">
                          →
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* ANM-028: Metadata Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '24px' }}>
                {[
                  'Pengembangan Web',
                  'Roblox & Lua/Luau',
                  'Content Creation',
                  'Pemasaran Komunitas',
                  'Operasional Kafe',
                ].map((pill) => (
                  <span
                    key={pill}
                    className="about-pill"
                    style={{
                      background: 'rgba(56, 189, 248, 0.08)',
                      border: '1px solid rgba(56, 189, 248, 0.25)',
                      color: 'var(--color-text-main)',
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '12px',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* ANM-026 & ANM-027: Official Identity Card */}
              <div
                id="about-portrait-frame"
                className="cosmic-card"
                style={{
                  padding: '24px',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, rgba(11, 17, 32, 0.85) 0%, rgba(15, 23, 42, 0.6) 100%)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--color-accent-blue), var(--color-nebula-violet))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                      boxShadow: '0 0 16px rgba(56, 189, 248, 0.4)',
                    }}
                    aria-hidden="true"
                  >
                    D
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', color: 'var(--color-text-main)', margin: 0 }}>
                      {profileContent.publicName}
                    </h3>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-dim)', fontFamily: 'var(--font-mono)' }}>
                      {profileContent.brand} · PENGEMBANG WEB
                    </span>
                  </div>
                </div>

                <div className="cosmic-card" style={{ padding: '16px', border: '1px solid rgba(255, 255, 255, 0.05)', background: 'rgba(0, 0, 0, 0.2)' }}>
                  <h4 style={{ fontSize: '14px', color: 'var(--color-accent-blue)', margin: '0 0 6px 0' }}>
                    // FOKUS &amp; KETELITIAN
                  </h4>
                  <p className="text-muted" style={{ fontSize: '13px', margin: 0, lineHeight: '1.6' }}>
                    Membangun website dan aplikasi dengan perhatian pada tampilan yang nyaman, interaksi yang responsif, serta kemudahan penggunaan bagi pengunjung.
                  </p>
                </div>

                <div className="cosmic-card" style={{ padding: '16px', marginTop: '12px', border: '1px solid rgba(255, 255, 255, 0.05)', background: 'rgba(0, 0, 0, 0.2)' }}>
                  <h4 style={{ fontSize: '14px', color: 'var(--color-cyan-glow)', margin: '0 0 6px 0' }}>
                    // LINGKUP KARYA
                  </h4>
                  <p className="text-muted" style={{ fontSize: '13px', margin: 0, lineHeight: '1.6' }}>
                    Mencakup workspace riset terintegrasi, simulasi ritel interaktif, serta koleksi aset desain dan visual web.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
