// src/sections/TerminalSection.tsx
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DeveloperTerminal } from '@/components/ui/DeveloperTerminal';
import { useMotion } from '@/app/providers/MotionProvider';
import { useScene } from '@/app/providers/SceneProvider';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const TerminalSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
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

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.3,
        onUpdate: (self) => {
          const p = self.progress;
          updateCameraTarget({
            z: 4.8,
            x: 0,
            y: -21.0 - p * 1.0,
            starSpeed: 0.04,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReduced, updateCameraTarget]);

  return (
    <section
      id="terminal"
      ref={sectionRef}
      className="section"
      aria-labelledby="terminal-section-heading"
    >
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div
            className="section-eyebrow"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#34d399',
                boxShadow: '0 0 8px #34d399',
              }}
              aria-hidden="true"
            />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.12em', color: '#34d399' }}>
              10 / DEVELOPER INTERFACE
            </span>
          </div>

          <div style={{ overflow: 'hidden' }}>
            <h2 id="terminal-section-heading" ref={headingRef} className="section-title">
              Interactive Terminal Console
            </h2>
          </div>

          <p className="section-desc" style={{ maxWidth: '58ch', margin: '0 auto' }}>
            Akses langsung sistem portofolio melalui konsol perintah. Ketik <code style={{ color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>help</code> untuk melihat opsi penjelajahan interaktif.
          </p>
        </div>

        {/* Embedded Interactive Developer Terminal */}
        <DeveloperTerminal />
      </div>
    </section>
  );
};
