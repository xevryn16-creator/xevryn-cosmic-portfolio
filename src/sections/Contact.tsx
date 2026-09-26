// src/sections/Contact.tsx
/**
 * XEVRYN Cosmic Portfolio - Section 06: Contact & Horizon (ANM-053 to ANM-057)
 * Planet horizon dawn view, masked heading reveal, CTA block entrance,
 * magnetic button physics, and copy-email feedback.
 */

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CopyEmail } from '@/components/ui/CopyEmail';
import { Button } from '@/components/ui/Button';
import { profileContent } from '@/content/profile';
import { useMotion } from '@/app/providers/MotionProvider';
import { useScene } from '@/app/providers/SceneProvider';

gsap.registerPlugin(ScrollTrigger);

export const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { isReduced } = useMotion();
  const { updateCameraTarget } = useScene();

  useEffect(() => {
    if (isReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // ANM-054: Contact Heading Masked Reveal
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: '100%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        );
      }

      // ANM-055: CTA Block entrance
      const ctaBlock = sectionRef.current?.querySelector('#contact-cta-block');
      if (ctaBlock) {
        gsap.fromTo(
          ctaBlock,
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            delay: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              once: true,
            },
          }
        );
      }

      // ANM-053: Full Planet Horizon rise trigger
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: 0.3,
        onUpdate: (self) => {
          const p = self.progress;
          updateCameraTarget({
            horizonRise: p,
            z: 4.6 - p * 0.4,
            y: -0.4 - p * 0.3,
            starSpeed: 0.04,
          });
        },
        onLeaveBack: () => {
          updateCameraTarget({
            horizonRise: 0.0,
            starSpeed: 0.08,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReduced, updateCameraTarget]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section"
      aria-label="Seksi Kontak: Inisiasi dan Komunikasi"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <div className="container">
        <div className="calm-zone" style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto' }}>
          <div className="section-eyebrow">// 11 · HORIZON TRANSMISI</div>

          {/* ANM-054: Masked Heading */}
          <div style={{ overflow: 'hidden', margin: '0 auto' }}>
            <h2
              id="contact-heading"
              ref={headingRef}
              className="section-title"
              style={{ fontSize: 'clamp(32px, 6vw, 64px)' }}
            >
              Mulai Terhubung
            </h2>
          </div>

          <p className="text-muted" style={{ fontSize: '18px', maxWidth: '52ch', margin: '16px auto 32px', lineHeight: '1.7' }}>
            Terbuka untuk diskusi, pertukaran ide, atau terhubung seputar proyek pengembangan web dan kegiatan digital.
          </p>

          {/* ANM-055: CTA Block with Email, WhatsApp & CopyEmail */}
          <div
            id="contact-cta-block"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '14px',
              flexWrap: 'wrap',
            }}
          >
            {/* 1. Tombol Salin Email */}
            <CopyEmail email={profileContent.email} />

            {/* 2. Tombol Kirim Email Langsung */}
            <Button
              variant="primary"
              asLink
              href={`mailto:${profileContent.email}`}
              magnetic={true}
              aria-label={`Kirim pesan langsung ke ${profileContent.email}`}
            >
              <span>Kirim Email</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </Button>

            {/* 3. Tombol WhatsApp */}
            <a
              href={profileContent.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                borderColor: 'rgba(34, 197, 94, 0.35)',
                color: 'var(--color-text-main)',
              }}
              aria-label="Kirim pesan melalui WhatsApp"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <span>WhatsApp ({profileContent.whatsappNumber})</span>
            </a>
          </div>

          {/* GitHub Accounts Display */}
          <div
            style={{
              marginTop: '40px',
              padding: '20px 24px',
              background: 'rgba(15, 23, 42, 0.65)',
              border: '1px solid rgba(56, 189, 248, 0.15)',
              borderRadius: '12px',
              backdropFilter: 'blur(12px)',
              maxWidth: '620px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <div
              style={{
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.12em',
                color: 'var(--color-accent-blue)',
                marginBottom: '12px',
                textTransform: 'uppercase',
              }}
            >
              // Repositori &amp; Eksplorasi Kode
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <a
                href={profileContent.githubPrimary}
                target="_blank"
                rel="noopener noreferrer"
                className="cosmic-card"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  fontSize: '13px',
                  color: 'var(--color-text-main)',
                  textDecoration: 'none',
                  borderColor: 'rgba(56, 189, 248, 0.25)',
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub Utama (alfiedafa3)</span>
              </a>

              <a
                href={profileContent.githubSecondary}
                target="_blank"
                rel="noopener noreferrer"
                className="cosmic-card"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  fontSize: '13px',
                  color: 'var(--color-text-main)',
                  textDecoration: 'none',
                  borderColor: 'rgba(56, 189, 248, 0.25)',
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub Kedua (xevryn16)</span>
              </a>
            </div>

            <p style={{ fontSize: '12px', color: 'var(--color-text-dim)', margin: '10px 0 0 0', lineHeight: '1.5' }}>
              *Daftar karya terpilih yang disepakati terangkum pada seksi Work.
            </p>
          </div>

          <div style={{ marginTop: '36px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--color-success)',
                boxShadow: '0 0 8px rgba(34, 197, 94, 0.6)',
              }}
              aria-hidden="true"
            />
            <span style={{ fontSize: '13px', color: 'var(--color-text-dim)', fontFamily: 'var(--font-mono)' }}>
              SALURAN TRANSMISI: TERSEDIA UNTUK KOMUNIKASI
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
