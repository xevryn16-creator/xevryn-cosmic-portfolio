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
  } = useUniverse();

  return (
    <>
      {/* 1. Explore Mode Telemetry Helper Banner (when explore mode is active) */}
      {navigationMode === 'explore' && (
        <div className="explore-mode-banner" role="status" aria-live="polite">
          <div className="explore-banner-inner">
            <span className="explore-status-dot" aria-hidden="true" />
            <span className="explore-banner-text">
              <strong>EXPLORE MODE ACTIVE</strong> // Drag viewport to tilt orbital camera
            </span>
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

      {/* 2. Floating Spacecraft Navigation HUD */}
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

          {/* Right Action Controls: Map & Mode Toggle */}
          <div className="hud-actions">
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
