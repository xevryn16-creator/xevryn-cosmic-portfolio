// src/components/universe/UniverseHUD.tsx

import React from 'react';
import { useUniverse } from '@/app/providers/UniverseProvider';

export const UniverseHUD: React.FC = () => {
  const {
    currentSector,
    navigationMode,
    toggleNavigationMode,
    openUniverseMap,
    isTransitioning,
    sectors,
    navigateTo,
    focusedObject,
    hoveredObject,
    exitFocus,
    openProjectWorld,
  } = useUniverse();

  const handleActionClick = (target?: string) => {
    if (!target) return;
    if (target.startsWith('#work/')) {
      const slug = target.replace('#work/', '');
      openProjectWorld(slug);
    } else if (target.startsWith('#')) {
      const id = target.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        // Switch to cinematic mode before scrolling to section
        toggleNavigationMode();
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      } else {
        window.location.hash = target;
      }
    } else {
      window.location.href = target;
    }
  };

  return (
    <>
      {/* 1. Explore Mode Subtle Center Crosshair & Hover Lock Reticle */}
      {navigationMode === 'explore' && !focusedObject && (
        <div className="explore-crosshair-wrap" aria-hidden="true">
          <div className={`explore-crosshair ${hoveredObject ? 'is-targeting' : ''}`}>
            <span className="crosshair-reticle" />
            {hoveredObject && (
              <div className="crosshair-target-card">
                <span className="target-card-cat">
                  {hoveredObject.category === 'PROJECT' ? 'PROJECT DETECTED' : hoveredObject.category}
                </span>
                <span className="target-card-name">{hoveredObject.name}</span>
                <span className="target-card-hint">
                  {hoveredObject.category === 'PROJECT' ? '[ CLICK TO FOCUS WORLD ]' : 'CLICK TO FOCUS'}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Focus Mode Locked Object Telemetry Card */}
      {navigationMode === 'explore' && focusedObject && (
        <div className="universe-focus-card-wrap" role="dialog" aria-label="Focused Celestial Object">
          <div className="universe-focus-card">
            <div className="focus-card-header">
              <span className="focus-badge-pulse" aria-hidden="true" />
              <div className="focus-header-text">
                <span className="focus-card-status">
                  {focusedObject.category === 'PROJECT'
                    ? `PROJECT // ${focusedObject.name}`
                    : `FOCUS LOCKED // ${focusedObject.category}`}
                </span>
                <h3 className="focus-card-title">{focusedObject.name}</h3>
                {focusedObject.category === 'PROJECT' && (
                  <div style={{ display: 'flex', gap: '12px', marginTop: '4px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-cyan-glow)' }}>
                    <span>STATUS // VERIFIED</span>
                    <span>TYPE // {focusedObject.subtitle ? focusedObject.subtitle.toUpperCase() : 'WEB APPLICATION'}</span>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={exitFocus}
                className="btn-focus-close"
                aria-label="Exit Focus Lock (ESC)"
              >
                ✕
              </button>
            </div>

            <p className="focus-card-subtitle">{focusedObject.subtitle}</p>
            <p className="focus-card-desc">{focusedObject.description}</p>

            {focusedObject.tags && (
              <div className="focus-card-tags">
                {focusedObject.tags.map((tag) => (
                  <span key={tag} className="focus-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="focus-card-actions">
              {focusedObject.slug ? (
                <button
                  type="button"
                  onClick={() => openProjectWorld(focusedObject.slug!)}
                  className="btn-focus-primary btn-enter-world"
                  style={{
                    background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.4), rgba(99, 102, 241, 0.4))',
                    border: '1px solid var(--color-cyan-glow)',
                    boxShadow: '0 0 16px rgba(56, 189, 248, 0.3)',
                  }}
                >
                  <span>ENTER WORLD</span>
                  <span className="focus-btn-arrow">✦</span>
                </button>
              ) : (
                focusedObject.actionLabel && focusedObject.actionTarget && (
                  <button
                    type="button"
                    onClick={() => handleActionClick(focusedObject.actionTarget)}
                    className="btn-focus-primary"
                  >
                    <span>{focusedObject.actionLabel}</span>
                    <span className="focus-btn-arrow">➔</span>
                  </button>
                )
              )}

              <button
                type="button"
                onClick={exitFocus}
                className="btn-focus-secondary"
              >
                <span>EXIT FOCUS</span>
                <span className="universe-key-badge">ESC</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Explore Mode Active Telemetry Banner */}
      {navigationMode === 'explore' && !focusedObject && (
        <div className="explore-mode-banner" role="status" aria-live="polite">
          <div className="explore-banner-inner">
            <span className="explore-status-dot" aria-hidden="true" />
            <div className="explore-banner-text">
              <strong>FREE EXPLORE ACTIVE</strong>
              <span className="explore-controls-hint hidden-mobile">
                // [L-DRAG] Orbit · [R-DRAG] Pan · [WHEEL] Zoom · [W/S/A/D] Move
              </span>
            </div>
            <button
              type="button"
              onClick={toggleNavigationMode}
              className="btn-exit-explore"
              aria-label="Return to Guided Cinematic Mode (E)"
            >
              <span>RETURN TO CINEMATIC</span>
              <span className="universe-key-badge">E</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. Floating Spacecraft Navigation HUD */}
      <nav
        className={`universe-hud ${isTransitioning ? 'hud-transitioning' : ''}`}
        aria-label="Universe Telemetry & Quick Navigation"
      >
        <div className="universe-hud-inner">
          {/* Current Sector Telemetry Badge */}
          <button
            type="button"
            onClick={openUniverseMap}
            className="hud-sector-btn"
            aria-label={`Current location: ${currentSector.sectorCode} ${currentSector.title}. Click to open Universe Star Map (M)`}
          >
            <span className="hud-radar-beacon" aria-hidden="true" />
            <div className="hud-sector-info">
              <span className="hud-sector-code">{currentSector.sectorCode}</span>
              <span className="hud-sector-title">{currentSector.shortName}</span>
            </div>
            <span className="hud-map-hint" aria-hidden="true">MAP ↗</span>
          </button>

          {/* Quick Constellation Sector Track (Desktop only) */}
          <div className="hud-sectors-track hidden-mobile" aria-label="Universe Sectors">
            {sectors.map((sector) => {
              const isActive = sector.id === currentSector.id;
              return (
                <button
                  key={sector.id}
                  type="button"
                  onClick={() => navigateTo(sector.id)}
                  className={`hud-sector-dot-btn ${isActive ? 'is-active' : ''}`}
                  title={`${sector.sectorCode}: ${sector.title} [Key ${sector.shortcutKey}]`}
                  aria-label={`Navigate to ${sector.title}`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <span className="hud-dot" />
                  <span className="hud-dot-label">{sector.shortName}</span>
                </button>
              );
            })}
          </div>

          {/* Right Action Controls: Map, Command Palette & Mode Toggle */}
          <div className="hud-actions">
            {/* Command Palette Button */}
            <button
              type="button"
              onClick={() => {
                const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true });
                window.dispatchEvent(event);
              }}
              className="hud-map-btn hidden-mobile"
              aria-label="Open Command Palette (Ctrl+K)"
              title="Command Palette — Ctrl/Cmd+K"
            >
              <span aria-hidden="true">⌕</span>
              <span className="hidden-mobile">SEARCH</span>
              <span className="universe-key-badge hidden-mobile">⌘K</span>
            </button>

            {/* Tactical Star Map Opener Button */}
            <button
              type="button"
              onClick={openUniverseMap}
              className="hud-map-btn"
              aria-label="Open Interactive Universe Star Map (M)"
            >
              <span className="hud-map-icon" aria-hidden="true">🗺️</span>
              <span className="hidden-mobile">STAR MAP</span>
              <span className="universe-key-badge hidden-mobile">M</span>
            </button>

            {/* Mode Switcher Button: Cinematic vs Explore */}
            <button
              type="button"
              onClick={toggleNavigationMode}
              className={`hud-mode-btn ${navigationMode === 'explore' ? 'mode-explore' : 'mode-cinematic'}`}
              aria-label={`Switch navigation mode. Currently in ${navigationMode} mode.`}
            >
              <span className="mode-indicator-dot" aria-hidden="true" />
              <span className="hidden-mobile">
                {navigationMode === 'explore' ? 'EXPLORE' : 'CINEMATIC'}
              </span>
              <span className="universe-key-badge hidden-mobile">E</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};
