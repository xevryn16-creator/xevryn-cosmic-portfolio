// src/sections/Media3Archive.tsx
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { media3ArchiveContent } from '@/content/media3';
import { useMotion } from '@/app/providers/MotionProvider';
import { useScene } from '@/app/providers/SceneProvider';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const Media3Archive: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'FILM' | 'VIDEO' | 'PRODUCTION' | 'MEDIA'>('ALL');
  const { isReduced } = useMotion();
  const { updateCameraTarget } = useScene();

  const filteredItems =
    activeCategory === 'ALL'
      ? media3ArchiveContent
      : media3ArchiveContent.filter((item) => item.category === activeCategory);

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

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.3,
        onUpdate: (self) => {
          const p = self.progress;
          updateCameraTarget({
            z: 4.6,
            x: 0.4 - p * 0.4,
            y: -7.5 - p * 1.2,
            rotY: 0.1 - p * 0.15,
            starSpeed: 0.06,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReduced, updateCameraTarget]);

  return (
    <section
      id="media3-archive"
      ref={sectionRef}
      className="section"
      aria-labelledby="media3-archive-heading"
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '36px' }}>
          <div
            className="section-eyebrow"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#f43f5e',
                boxShadow: '0 0 8px #f43f5e',
              }}
              aria-hidden="true"
            />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.12em', color: '#f43f5e' }}>
              05 / MEDIA 3 · CREATIVE ARCHIVE
            </span>
          </div>

          <div style={{ overflow: 'hidden' }}>
            <h2 id="media3-archive-heading" ref={headingRef} className="section-title">
              Creative Film &amp; Media Archive
            </h2>
          </div>

          <p className="section-desc" style={{ maxWidth: '64ch' }}>
            Dokumentasi digital perjalanan kreatif di Media 3 SMAN 3 Sumedang—mulai dari peran wakil ekstrakurikuler, produksi film pendek, hingga tata visual sinematik.
          </p>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '24px' }}>
            {(['ALL', 'FILM', 'VIDEO', 'PRODUCTION', 'MEDIA'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  border: activeCategory === cat ? '1px solid #f43f5e' : '1px solid rgba(255, 255, 255, 0.1)',
                  background: activeCategory === cat ? 'rgba(244, 63, 94, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  color: activeCategory === cat ? '#f43f5e' : 'var(--color-text-dim)',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Film Strip Grid Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="cosmic-card film-archive-card"
              style={{
                borderRadius: '14px',
                border: '1px solid rgba(244, 63, 94, 0.25)',
                background: 'linear-gradient(135deg, rgba(28, 12, 20, 0.9) 0%, rgba(10, 14, 24, 0.95) 100%)',
                padding: '24px',
                backdropFilter: 'blur(14px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Abstract Cinematic Film Strip Header */}
              <div
                className="film-strip-header"
                style={{
                  height: '130px',
                  borderRadius: '8px',
                  background: `linear-gradient(135deg, rgba(20, 10, 18, 0.95), rgba(30, 16, 28, 0.8))`,
                  border: `1px solid ${item.mediaPlaceholder.colorAccent}40`,
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}
              >
                {/* Perforation holes on film strip top and bottom */}
                <div className="film-perforations top" />
                <div className="film-perforations bottom" />

                <div style={{ textAlign: 'center', padding: '0 16px', zIndex: 2 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      color: item.mediaPlaceholder.colorAccent,
                      letterSpacing: '0.14em',
                      marginBottom: '6px',
                    }}
                  >
                    // {item.category} REEL
                  </div>
                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#ffffff',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {item.mediaPlaceholder.label}
                  </div>
                  <div
                    style={{
                      fontSize: '10px',
                      color: 'var(--color-text-dim)',
                      marginTop: '4px',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    SMAN 3 SUMEDANG · CREATIVE MEDIA
                  </div>
                </div>

                {/* Subtle camera lens ring overlay */}
                <div
                  style={{
                    position: 'absolute',
                    width: '180px',
                    height: '180px',
                    borderRadius: '50%',
                    border: '1px dashed rgba(255, 255, 255, 0.08)',
                    pointerEvents: 'none',
                  }}
                  aria-hidden="true"
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      color: item.mediaPlaceholder.colorAccent,
                      letterSpacing: '0.08em',
                    }}
                  >
                    {item.role}
                  </span>
                  <span
                    style={{
                      fontSize: '10px',
                      fontFamily: 'var(--font-mono)',
                      background: 'rgba(255, 255, 255, 0.06)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      color: 'var(--color-text-dim)',
                    }}
                  >
                    TERVERIFIKASI
                  </span>
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-main)', margin: '0 0 10px 0' }}>
                  {item.title}
                </h3>

                <p className="text-muted" style={{ fontSize: '14px', lineHeight: '1.7', margin: '0 0 16px 0' }}>
                  {item.description}
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                {item.focus.map((f) => (
                  <span
                    key={f}
                    style={{
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: 'rgba(244, 63, 94, 0.08)',
                      border: '1px solid rgba(244, 63, 94, 0.2)',
                      color: '#cbd5e1',
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .film-perforations {
          position: absolute;
          left: 0;
          right: 0;
          height: 8px;
          display: flex;
          justify-content: space-around;
          padding: 0 8px;
          pointer-events: none;
        }

        .film-perforations.top {
          top: 6px;
        }

        .film-perforations.bottom {
          bottom: 6px;
        }

        .film-perforations::before {
          content: '';
          display: block;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(circle, rgba(255, 255, 255, 0.35) 2px, transparent 2px);
          background-size: 16px 8px;
        }
      `}</style>
    </section>
  );
};
