// src/sections/Experience.tsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experienceContent } from '@/content/experience';
import { useScene } from '@/app/providers/SceneProvider';
import { useMotion } from '@/app/providers/MotionProvider';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { updateCameraTarget } = useScene();
  const { isReduced } = useMotion();

  useEffect(() => {
    if (isReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        end: 'bottom 25%',
        onEnter: () => {
          updateCameraTarget({
            x: 0.6,
            y: -5.5,
            z: 4.8,
            lookAtX: -0.8,
            lookAtY: -5.5,
            lookAtZ: 0,
            fov: 44,
          });
        },
        onEnterBack: () => {
          updateCameraTarget({
            x: 0.6,
            y: -5.5,
            z: 4.8,
            lookAtX: -0.8,
            lookAtY: -5.5,
            lookAtZ: 0,
            fov: 44,
          });
        },
      });

      // Subtle fade in of cards
      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isReduced, updateCameraTarget]);

  return (
    <section id="experience" ref={sectionRef} className="section" aria-labelledby="experience-heading">
      <div className="container">
        {/* Section Marker */}
        <div className="section-header">
          <div className="section-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
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
              08 / PENGALAMAN KERJA
            </span>
          </div>
          <h2 id="experience-heading" className="section-title">
            Pengalaman Kerja Nyata
          </h2>
          <p className="section-desc">
            Rekam jejak kerja nyata yang membentuk ketelitian, fokus, dan dedikasi dalam setiap karya.
          </p>
        </div>

        {/* Experience Timeline Grid with Orbit Coffee Break Accent */}
        <div
          ref={containerRef}
          style={{
            maxWidth: '820px',
            marginTop: '40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {/* Coffee Break in Orbit Visual Accent Card */}
          <div className="orbit-coffee-break-card">
            <div className="coffee-break-visual" aria-hidden="true">
              <div className="floating-zero-g-cup">
                <div className="steam-line s1" />
                <div className="steam-line s2" />
                <div className="steam-line s3" />
                <div className="cup-shape">
                  <div className="cup-rim-oval">
                    <div className="coffee-brew" />
                  </div>
                  <div className="cup-side-handle" />
                </div>
              </div>
              <div className="floating-coffee-beans">
                <span className="coffee-bean b1">☕</span>
                <span className="coffee-bean b2">✦</span>
                <span className="coffee-bean b3">☕</span>
              </div>
            </div>

            <div className="coffee-break-text">
              <span className="break-badge">ORBIT COFFEE BREAK · SENTUHAN PERSONAL</span>
              <h3 className="break-title">Ketelitian Barista di Ruang Gravitasi</h3>
              <p className="break-desc">
                Keahlian meracik minuman, menjaga standar rasa, dan melayani pelanggan secara cepat
                dan cermat melatih ketenangan serta ketelitian yang saya bawa ke dalam setiap baris kode
                dan tata letak antarmuka.
              </p>
            </div>
          </div>

          {experienceContent.map((item) => (
            <article
              key={item.id}
              className="cosmic-card barista-amber-card"
              style={{
                padding: '28px 32px',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                background: 'linear-gradient(135deg, rgba(28, 18, 10, 0.95), rgba(12, 10, 18, 0.98))',
                borderRadius: '12px',
                backdropFilter: 'blur(16px)',
              }}
            >
              {/* Accent Warm Amber Glow Line */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '4px',
                  height: '100%',
                  background: 'linear-gradient(180deg, #f59e0b, #d97706)',
                }}
                aria-hidden="true"
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-main)', margin: '0 0 4px 0' }}>
                    {item.role}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    {item.organization && (
                      <span style={{ fontSize: '14px', color: 'var(--color-cyan-glow)', fontFamily: 'var(--font-mono)' }}>
                        {item.organization}
                      </span>
                    )}
                    {item.location && (
                      <span style={{ fontSize: '13px', color: 'var(--color-text-dim)', fontFamily: 'var(--font-mono)' }}>
                        · {item.location}
                      </span>
                    )}
                  </div>
                </div>

                {item.period && (
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      padding: '4px 10px',
                      background: 'rgba(56, 189, 248, 0.1)',
                      border: '1px solid rgba(56, 189, 248, 0.25)',
                      borderRadius: '100px',
                      color: 'var(--color-accent-blue)',
                    }}
                  >
                    {item.period}
                  </span>
                )}
              </div>

              <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'var(--color-text-dim)', margin: '0 0 20px 0' }}>
                {item.description}
              </p>

              {item.tags && item.tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '12px',
                        fontFamily: 'var(--font-mono)',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
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

      <style>{`
        .orbit-coffee-break-card {
          display: flex;
          gap: 24px;
          background: linear-gradient(135deg, rgba(38, 24, 12, 0.8) 0%, rgba(18, 14, 24, 0.9) 100%);
          border: 1px solid rgba(245, 158, 11, 0.35);
          border-radius: 14px;
          padding: 24px 28px;
          align-items: center;
          margin-bottom: 8px;
          backdrop-filter: blur(14px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
        }

        .coffee-break-visual {
          position: relative;
          width: 80px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .floating-zero-g-cup {
          position: relative;
          animation: floatZeroGCup 3.5s ease-in-out infinite;
        }

        @keyframes floatZeroGCup {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-7px) rotate(3deg); }
        }

        .cup-shape {
          width: 44px;
          height: 38px;
          background: #f8fafc;
          border-radius: 0 0 12px 12px;
          position: relative;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);
        }

        .cup-rim-oval {
          position: absolute;
          top: -4px;
          left: 0;
          width: 44px;
          height: 9px;
          background: #e2e8f0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .coffee-brew {
          width: 38px;
          height: 6px;
          background: #451a03;
          border-radius: 50%;
        }

        .cup-side-handle {
          position: absolute;
          top: 6px;
          right: -10px;
          width: 12px;
          height: 20px;
          border: 3px solid #f8fafc;
          border-radius: 0 10px 10px 0;
        }

        .steam-line {
          position: absolute;
          width: 2px;
          height: 16px;
          background: rgba(254, 243, 199, 0.6);
          border-radius: 2px;
          animation: steamFloat 2.2s infinite ease-out;
        }

        .s1 { left: 10px; top: -20px; animation-delay: 0s; }
        .s2 { left: 20px; top: -24px; animation-delay: 0.7s; }
        .s3 { left: 30px; top: -18px; animation-delay: 1.4s; }

        @keyframes steamFloat {
          0% { opacity: 0; transform: translateY(4px); }
          50% { opacity: 0.8; transform: translateY(-8px); }
          100% { opacity: 0; transform: translateY(-18px); }
        }

        .floating-coffee-beans {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .coffee-bean {
          position: absolute;
          font-size: 10px;
          color: #f59e0b;
          opacity: 0.7;
          animation: beanDrift 4s ease-in-out infinite;
        }

        .b1 { top: 0; right: 4px; animation-delay: 0.5s; }
        .b2 { bottom: 4px; left: 0; animation-delay: 1.8s; font-size: 8px; }
        .b3 { bottom: 8px; right: 0; animation-delay: 1.2s; }

        @keyframes beanDrift {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        .coffee-break-text {
          flex: 1;
        }

        .break-badge {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-size: 0.72rem;
          color: #f59e0b;
          letter-spacing: 0.1em;
          margin-bottom: 4px;
          display: block;
        }

        .break-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 6px 0;
        }

        .break-desc {
          font-size: 0.88rem;
          line-height: 1.6;
          color: #cbd5e1;
          margin: 0;
        }

        @media (max-width: 640px) {
          .orbit-coffee-break-card {
            flex-direction: column;
            align-items: flex-start;
            padding: 20px;
          }
        }
      `}</style>
    </section>
  );
};
