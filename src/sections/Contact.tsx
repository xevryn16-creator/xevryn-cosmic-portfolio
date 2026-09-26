// src/sections/Contact.tsx
/**
 * XEVRYN Cosmic Portfolio - Section: Send a Transmission (Contact & Horizon)
 * Planet horizon dawn view, transmission console form, CTA actions,
 * magnetic button physics, and copy-email feedback.
 */

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CopyEmail } from '@/components/ui/CopyEmail';
import { Button } from '@/components/ui/Button';
import { profileContent } from '@/content/profile';
import { useMotion } from '@/app/providers/MotionProvider';
import { useScene } from '@/app/providers/SceneProvider';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { isReduced } = useMotion();
  const { updateCameraTarget } = useScene();

  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isTransmitted, setIsTransmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;

    // Build mailto URI for clean client-side submission
    const subject = encodeURIComponent(`[XEVRYN TRANSMISSION] Pesan dari ${formState.name || 'Pengunjung'}`);
    const body = encodeURIComponent(
      `Nama: ${formState.name}\nEmail: ${formState.email}\n\nPesan:\n${formState.message}`
    );
    window.location.href = `mailto:${profileContent.email}?subject=${subject}&body=${body}`;

    setIsTransmitted(true);
    setTimeout(() => {
      setIsTransmitted(false);
      setFormState({ name: '', email: '', message: '' });
    }, 6000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section"
      aria-label="Send a Transmission: Contact and Horizon"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <div className="container">
        <div className="calm-zone" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto' }}>
          <div className="section-eyebrow">// 11 · SEND A TRANSMISSION</div>

          <div style={{ overflow: 'hidden', margin: '0 auto' }}>
            <h2
              id="contact-heading"
              ref={headingRef}
              className="section-title"
              style={{ fontSize: 'clamp(32px, 6vw, 60px)' }}
            >
              SEND A TRANSMISSION
            </h2>
          </div>

          <p className="text-muted" style={{ fontSize: '18px', maxWidth: '54ch', margin: '16px auto 36px', lineHeight: '1.7' }}>
            Kirimkan sinyal transmisi untuk kolaborasi pengembangan web, proyek kreatif, atau pertukaran ide teknologi.
          </p>

          {/* Interactive Transmission Form */}
          <form
            onSubmit={handleSubmit}
            className="cosmic-card transmission-form"
            style={{
              padding: '32px',
              borderRadius: '16px',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(10, 14, 26, 0.95) 100%)',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(56, 189, 248, 0.05)',
              backdropFilter: 'blur(16px)',
              textAlign: 'left',
              marginBottom: '36px',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label
                  htmlFor="contact-name"
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-cyan-glow)',
                    letterSpacing: '0.1em',
                    marginBottom: '8px',
                  }}
                >
                  NAME // PENGIRIM
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Nama atau alias Anda"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: 'rgba(5, 10, 20, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    fontFamily: 'inherit',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--color-accent-blue)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-cyan-glow)',
                    letterSpacing: '0.1em',
                    marginBottom: '8px',
                  }}
                >
                  EMAIL // SALURAN RESPON *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="nama@domain.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: 'rgba(5, 10, 20, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    fontFamily: 'inherit',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--color-accent-blue)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
                />
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label
                htmlFor="contact-message"
                style={{
                  display: 'block',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-cyan-glow)',
                  letterSpacing: '0.1em',
                  marginBottom: '8px',
                }}
              >
                MESSAGE // ISI TRANSMISI *
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                placeholder="Tuliskan pesan, penawaran proyek, atau sapaan Anda..."
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  background: 'rgba(5, 10, 20, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '8px',
                  color: '#f8fafc',
                  fontFamily: 'inherit',
                  fontSize: '14px',
                  outline: 'none',
                  resize: 'vertical',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--color-accent-blue)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  padding: '12px 28px',
                  fontSize: '13px',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.1em',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                }}
              >
                <span>TRANSMIT</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>

              {isTransmitted && (
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    color: '#34d399',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                  role="status"
                >
                  <span>TRANSMISSION SENT ✓</span>
                </div>
              )}
            </div>
          </form>

          {/* Quick Direct Channels */}
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
            <CopyEmail email={profileContent.email} />

            <Button
              variant="primary"
              asLink
              href={`mailto:${profileContent.email}`}
              magnetic={true}
              aria-label={`Kirim email ke ${profileContent.email}`}
            >
              <span>Kirim Email Langsung</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </Button>

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

          {/* GitHub Repositories */}
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
              // REPOSITORI &amp; EKSPLORASI KODE
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
          </div>
        </div>
      </div>
    </section>
  );
};
