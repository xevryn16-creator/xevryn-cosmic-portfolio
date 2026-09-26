// src/sections/XevrynLab.tsx
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { labContent } from '@/content/lab';
import { useMotion } from '@/app/providers/MotionProvider';
import { useScene } from '@/app/providers/SceneProvider';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const XevrynLab: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const { isReduced } = useMotion();
  const { updateCameraTarget } = useScene();

  const categories = ['ALL', 'AI', 'AUTOMATION', 'CYBERSECURITY', 'WEBGL', 'ROBLOX'];

  const filteredItems =
    filterCategory === 'ALL'
      ? labContent
      : labContent.filter((item) => item.category === filterCategory);

  const getStatusBadgeStyle = (status: 'BUILDING' | 'EXPERIMENTING' | 'LEARNING') => {
    switch (status) {
      case 'BUILDING':
        return {
          background: 'rgba(56, 189, 248, 0.12)',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          color: '#38bdf8',
        };
      case 'EXPERIMENTING':
        return {
          background: 'rgba(192, 132, 252, 0.12)',
          border: '1px solid rgba(192, 132, 252, 0.35)',
          color: '#c084fc',
        };
      case 'LEARNING':
        return {
          background: 'rgba(245, 158, 11, 0.12)',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          color: '#f59e0b',
        };
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

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.3,
        onUpdate: (self) => {
          const p = self.progress;
          updateCameraTarget({
            z: 4.5,
            x: -0.4 + p * 0.3,
            y: -18.5 - p * 1.5,
            rotY: -0.1 + p * 0.1,
            starSpeed: 0.05,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReduced, updateCameraTarget]);

  return (
    <section
      id="xevryn-lab"
      ref={sectionRef}
      className="section"
      aria-labelledby="xevryn-lab-heading"
    >
      <div className="container">
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
                background: '#a855f7',
                boxShadow: '0 0 8px #a855f7',
              }}
              aria-hidden="true"
            />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.12em', color: '#a855f7' }}>
              09 / XEVRYN LAB · EXPERIMENTS
            </span>
          </div>

          <div style={{ overflow: 'hidden' }}>
            <h2 id="xevryn-lab-heading" ref={headingRef} className="section-title">
              XEVRYN Digital Laboratory
            </h2>
          </div>

          <p className="section-desc" style={{ maxWidth: '64ch' }}>
            Ruang eksplorasi teknologi terdepan—AI workflows, otomatisasi bot, cybersecurity, dan WebGL shaders. Ditampilkan secara jujur dalam status eksplorasi aktif.
          </p>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '20px' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterCategory(cat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  border: filterCategory === cat ? '1px solid #a855f7' : '1px solid rgba(255, 255, 255, 0.1)',
                  background: filterCategory === cat ? 'rgba(168, 85, 247, 0.18)' : 'rgba(255, 255, 255, 0.03)',
                  color: filterCategory === cat ? '#c084fc' : 'var(--color-text-dim)',
                  transition: 'all 0.18s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredItems.map((item) => {
            const badgeStyle = getStatusBadgeStyle(item.status);
            return (
              <article
                key={item.id}
                className="cosmic-card lab-card"
                style={{
                  borderRadius: '14px',
                  border: '1px solid rgba(168, 85, 247, 0.22)',
                  background: 'linear-gradient(135deg, rgba(16, 12, 28, 0.94) 0%, rgba(8, 10, 20, 0.95) 100%)',
                  padding: '28px',
                  backdropFilter: 'blur(14px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: 'var(--color-accent-blue)',
                        letterSpacing: '0.1em',
                      }}
                    >
                      // {item.category}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        padding: '3px 8px',
                        borderRadius: '12px',
                        ...badgeStyle,
                      }}
                    >
                      ● {item.status}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-main)', margin: '0 0 10px 0' }}>
                    {item.title}
                  </h3>

                  <p className="text-muted" style={{ fontSize: '14px', lineHeight: '1.7', margin: '0 0 20px 0' }}>
                    {item.description}
                  </p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  {item.technologies.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: '11px',
                        fontFamily: 'var(--font-mono)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        background: 'rgba(168, 85, 247, 0.08)',
                        border: '1px solid rgba(168, 85, 247, 0.2)',
                        color: '#e2e8f0',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
