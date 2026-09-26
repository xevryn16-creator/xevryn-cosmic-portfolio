// src/components/layout/Footer.tsx
import React from 'react';
import { socialLinks } from '@/content/links';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const heroEl = document.getElementById('hero') || document.getElementById('main-content');
    if (heroEl) {
      heroEl.focus({ preventScroll: true });
    }
  };

  return (
    <footer id="site-footer" className="site-footer">
      <div className="container">
        <div className="flex-between" style={{ flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <div className="brand-logo" style={{ marginBottom: '8px' }}>
              <span className="brand-dot" aria-hidden="true" />
              <span>XEVRYN</span>
            </div>
            <p className="text-dim" style={{ fontSize: '14px', margin: 0 }}>
              Cosmic Portfolio &amp; Spatial Digital Architecture
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {socialLinks.filter((l) => l.status === 'CONFIRMED').length > 0 ? (
              socialLinks.filter((l) => l.status === 'CONFIRMED').map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link nav-link"
                  style={{ fontSize: '13px' }}
                >
                  {link.label}
                </a>
              ))
            ) : (
              <span className="text-dim" style={{ fontSize: '13px', fontFamily: 'var(--font-mono)' }}>
                // KANAL RESMI: MENUNGGU PENYERAHAN TAUTAN
              </span>
            )}

            <button
              id="back-to-top"
              type="button"
              onClick={scrollToTop}
              className="btn btn-secondary"
              style={{ padding: '8px 16px', fontSize: '13px', minHeight: '36px' }}
              aria-label="Return to top of page"
            >
              ↑ Back to Orbit
            </button>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--color-border)', marginTop: '32px', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p className="text-dim" style={{ fontSize: '12px', margin: 0 }}>
            © 2026 XEVRYN. Crafted with Three.js, React &amp; GSAP.
          </p>
          <p className="text-dim" style={{ fontSize: '12px', margin: 0, fontFamily: 'var(--font-mono)' }}>
            CREATIVE ENGINEERING &amp; SPATIAL SYSTEMS
          </p>
        </div>
      </div>
    </footer>
  );
};
