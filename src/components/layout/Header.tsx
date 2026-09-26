import React, { useState, useEffect } from 'react';
import { navLinks, stationLinks } from '@/content/links';
import { MotionControl } from '@/components/ui/MotionControl';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { useSound } from '@/app/providers/SoundProvider';
import { useUniverse } from '@/app/providers/UniverseProvider';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isStationMenuOpen, setIsStationMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [progress, setProgress] = useState(0);
  const [logoClicks, setLogoClicks] = useState(0);
  const { isMuted, toggleSound, playChime } = useSound();
  const { currentSector, openUniverseMap, navigationMode, toggleNavigationMode } = useUniverse();

  const handleLogoClick = (e: React.MouseEvent) => {
    const nextCount = logoClicks + 1;
    setLogoClicks(nextCount);
    if (nextCount >= 5) {
      e.preventDefault();
      setLogoClicks(0);
      playChime();
      window.location.hash = '#terminal';
      const termEl = document.getElementById('terminal');
      if (termEl) termEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 40);

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        setProgress(Math.min(1, Math.max(0, scrollY / maxScroll)));
      }

      // Scroll Spy to detect active visible section
      const sections = [
        'hero',
        'about',
        'focus',
        'work',
        'more-projects',
        'roblox',
        'atomic-hub',
        'experience',
        'skills',
        'exploration',
        'contact',
      ];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            let activeId = sections[i];
            // Map sub-sections to their primary nav landmark
            if (activeId === 'more-projects') activeId = 'work';
            if (activeId === 'atomic-hub') activeId = 'roblox';
            setActiveSection(activeId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div
        id="journey-progress"
        className="journey-progress"
        style={{
          transform: `scaleX(${progress})`,
        }}
        aria-hidden="true"
      />
      <header id="site-header" className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container header-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a
              href="#hero"
              onClick={handleLogoClick}
              className="brand-logo"
              aria-label="XEVRYN Cosmic Portfolio Home (Click 5 times for secret terminal)"
            >
              <span className="brand-dot" aria-hidden="true" />
              <span>XEVRYN</span>
            </a>

            {/* Current Universe Sector Badge */}
            <button
              type="button"
              onClick={openUniverseMap}
              className="header-sector-badge hidden-mobile"
              aria-label={`Current location: ${currentSector.sectorCode} ${currentSector.shortName}. Click to open Universe Star Map (M)`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(56, 189, 248, 0.08)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                borderRadius: '12px',
                padding: '3px 8px',
                fontSize: '10px',
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-cyan-glow)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              title="Open Universe Star Map [M]"
            >
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--color-cyan-glow)' }} />
              <span>{currentSector.sectorCode} // {currentSector.shortName}</span>
            </button>
          </div>

          <nav aria-label="Main Navigation">
            <ul className="nav-links">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className={`nav-link ${isActive ? 'is-active' : ''}`}
                      aria-current={isActive ? 'page' : undefined}
                      style={
                        isActive
                          ? {
                              color: 'var(--color-cyan-glow)',
                              textShadow: '0 0 12px rgba(56, 189, 248, 0.5)',
                            }
                          : undefined
                      }
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="header-actions">
            {/* Universe Star Map Button */}
            <button
              type="button"
              onClick={openUniverseMap}
              className="btn-header-map hidden-mobile"
              style={{
                background: 'rgba(56, 189, 248, 0.12)',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                color: 'var(--color-cyan-glow)',
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.15s ease',
              }}
              aria-label="Open Interactive Universe Star Map (M)"
            >
              <span aria-hidden="true">🗺️</span>
              <span>MAP</span>
              <span className="universe-key-badge" style={{ fontSize: '8px', padding: '1px 3px' }}>M</span>
            </button>

            {/* Mode Switcher: Cinematic vs Explore */}
            <button
              type="button"
              onClick={toggleNavigationMode}
              className="btn-header-mode hidden-mobile"
              style={{
                background: navigationMode === 'explore' ? 'rgba(168, 85, 247, 0.18)' : 'rgba(255, 255, 255, 0.05)',
                border: navigationMode === 'explore' ? '1px solid rgba(168, 85, 247, 0.45)' : '1px solid rgba(255, 255, 255, 0.15)',
                color: navigationMode === 'explore' ? '#c084fc' : 'var(--color-text-dim)',
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'all 0.15s ease',
              }}
              aria-label={`Switch navigation mode. Current: ${navigationMode}`}
            >
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'currentColor' }} />
              <span>{navigationMode === 'explore' ? 'EXPLORE' : 'CINEMATIC'}</span>
              <span className="universe-key-badge" style={{ fontSize: '8px', padding: '1px 3px' }}>E</span>
            </button>

            {/* Desktop Space Hub Stations Quick Dropdown */}
            <div className="station-dropdown-wrapper hidden-mobile" style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setIsStationMenuOpen(!isStationMenuOpen)}
                className="btn-station-dropdown"
                aria-expanded={isStationMenuOpen}
                aria-haspopup="true"
                style={{
                  background: 'rgba(56, 189, 248, 0.12)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  color: '#38bdf8',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>🛰️ Stasiun Hub</span>
                <span style={{ fontSize: '9px' }}>{isStationMenuOpen ? '▲' : '▼'}</span>
              </button>

              {isStationMenuOpen && (
                <div
                  className="station-dropdown-menu"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '8px',
                    width: '210px',
                    background: 'rgba(10, 14, 26, 0.96)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    borderRadius: '10px',
                    padding: '8px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(16px)',
                    zIndex: 100,
                  }}
                >
                  {stationLinks.map((st) => (
                    <a
                      key={st.href}
                      href={st.href}
                      onClick={() => setIsStationMenuOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 10px',
                        color: '#e2e8f0',
                        textDecoration: 'none',
                        fontSize: '13px',
                        borderRadius: '6px',
                        transition: 'background 0.15s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(56, 189, 248, 0.15)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <span aria-hidden="true">{st.icon}</span>
                      <span>{st.label}</span>
                      {st.badge && (
                        <span
                          style={{
                            marginLeft: 'auto',
                            fontSize: '10px',
                            background: 'rgba(56, 189, 248, 0.2)',
                            color: '#38bdf8',
                            padding: '1px 6px',
                            borderRadius: '10px',
                          }}
                        >
                          {st.badge}
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="hidden-mobile" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Sound Toggle Button */}
              <button
                type="button"
                onClick={toggleSound}
                className="btn-sound-toggle"
                style={{
                  background: isMuted ? 'rgba(255, 255, 255, 0.05)' : 'rgba(56, 189, 248, 0.15)',
                  border: isMuted ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(56, 189, 248, 0.4)',
                  color: isMuted ? 'var(--color-text-dim)' : 'var(--color-cyan-glow)',
                  borderRadius: '20px',
                  padding: '4px 10px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all 0.18s ease',
                }}
                aria-label={isMuted ? 'Turn ambient cosmic sound on' : 'Mute ambient sound'}
              >
                <span>{isMuted ? '🔇 SOUND OFF' : '🔊 SOUND ON'}</span>
              </button>

              <MotionControl />
            </div>

            <button
              type="button"
              id="open-mobile-menu-btn"
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => {
          setIsMobileMenuOpen(false);
          // Return focus to menu trigger button
          setTimeout(() => {
            document.getElementById('open-mobile-menu-btn')?.focus();
          }, 50);
        }}
      />
    </>
  );
};
