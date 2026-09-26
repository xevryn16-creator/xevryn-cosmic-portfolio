// src/components/layout/MobileMenu.tsx
import React, { useEffect, useRef } from 'react';
import { navLinks, stationLinks } from '@/content/links';
import { MotionControl } from '@/components/ui/MotionControl';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Focus close button on mount
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Focus Trap inside drawer
      if (e.key === 'Tab' && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={drawerRef}
      className="mobile-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      <div className="mobile-drawer-header">
        <span className="brand-logo">
          <span className="brand-dot" aria-hidden="true" />
          <span>XEVRYN</span>
        </span>
        <button
          ref={closeButtonRef}
          type="button"
          className="mobile-menu-btn"
          onClick={onClose}
          aria-label="Close navigation menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <nav aria-label="Mobile Navigation Links">
        <ul className="mobile-nav-list">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className="mobile-nav-link"
                onClick={onClose}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: '24px', borderTop: '1px solid rgba(148, 163, 184, 0.15)', paddingTop: '16px' }}>
          <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-cyan-glow)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
            STASIUN SPACE HUB
          </p>
          <ul className="mobile-nav-list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {stationLinks.map((st) => (
              <li key={st.href}>
                <a
                  href={st.href}
                  className="mobile-nav-link"
                  onClick={onClose}
                  style={{
                    fontSize: '13px',
                    padding: '8px 12px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span aria-hidden="true">{st.icon}</span>
                  <span>{st.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: '32px' }}>
        <p className="text-dim" style={{ fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Motion Experience
        </p>
        <MotionControl />
      </div>
    </div>
  );
};
