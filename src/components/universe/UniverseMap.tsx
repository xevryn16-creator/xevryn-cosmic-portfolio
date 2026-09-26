// src/components/universe/UniverseMap.tsx

import React, { useState, useEffect, useRef } from 'react';
import { useUniverse } from '@/app/providers/UniverseProvider';
import { SectorInfo, UniverseLocation } from '@/types/universe';

export const UniverseMap: React.FC = () => {
  const {
    isUniverseMapOpen,
    closeUniverseMap,
    currentLocation,
    navigateTo,
    sectors,
  } = useUniverse();

  const [hoveredSector, setHoveredSector] = useState<SectorInfo | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Focus management when map opens
  useEffect(() => {
    if (isUniverseMapOpen) {
      setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);

      // Lock body scroll while map overlay is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setHoveredSector(null);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isUniverseMapOpen]);

  if (!isUniverseMapOpen) return null;

  const activeSector = hoveredSector || sectors.find((s) => s.id === currentLocation) || sectors[0];

  const handleSelectSector = (id: UniverseLocation) => {
    navigateTo(id);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="universe-map-title"
      className="universe-map-overlay"
      ref={modalRef}
      onClick={(e) => {
        if (e.target === modalRef.current) closeUniverseMap();
      }}
    >
      <div className="universe-map-container">
        {/* Header telemetry bar */}
        <div className="universe-map-header">
          <div className="universe-map-title-wrap">
            <span className="universe-map-dot-pulse" aria-hidden="true" />
            <div>
              <h2 id="universe-map-title" className="universe-map-heading">
                XEVRYN UNIVERSE // TACTICAL STAR MAP
              </h2>
              <p className="universe-map-subheading">
                CELESTIAL NAVIGATION MATRIX & SECTOR TELEMETRY
              </p>
            </div>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={closeUniverseMap}
            className="universe-map-close-btn"
            aria-label="Close Universe Map (ESC)"
          >
            <span className="universe-key-badge">ESC</span>
            <span>CLOSE MAP</span>
          </button>
        </div>

        {/* Tactical Starmap Visualization Area */}
        <div className="universe-map-canvas-area">
          {/* Subtle tactical grid background */}
          <div className="universe-map-grid-bg" aria-hidden="true" />

          {/* SVG Constellation Connection Vectors */}
          <svg className="universe-constellation-svg" aria-hidden="true">
            {sectors.map((sector) =>
              sector.connections.map((targetId) => {
                const targetSector = sectors.find((s) => s.id === targetId);
                if (!targetSector) return null;

                const isPathActive =
                  sector.id === currentLocation || targetSector.id === currentLocation;

                return (
                  <line
                    key={`${sector.id}-${targetSector.id}`}
                    x1={`${sector.mapPosition.x}%`}
                    y1={`${sector.mapPosition.y}%`}
                    x2={`${targetSector.mapPosition.x}%`}
                    y2={`${targetSector.mapPosition.y}%`}
                    className={`constellation-line ${isPathActive ? 'line-active' : ''}`}
                  />
                );
              })
            )}
          </svg>

          {/* Celestial Sector Nodes */}
          <div className="universe-nodes-layer">
            {sectors.map((sector) => {
              const isCurrent = sector.id === currentLocation;
              const isHovered = hoveredSector?.id === sector.id;

              return (
                <button
                  key={sector.id}
                  type="button"
                  onClick={() => handleSelectSector(sector.id)}
                  onMouseEnter={() => setHoveredSector(sector)}
                  onFocus={() => setHoveredSector(sector)}
                  style={{
                    left: `${sector.mapPosition.x}%`,
                    top: `${sector.mapPosition.y}%`,
                  }}
                  className={`universe-node-btn ${isCurrent ? 'node-current' : ''} ${
                    isHovered ? 'node-hovered' : ''
                  }`}
                  aria-label={`${sector.sectorCode}: ${sector.title} (Key ${sector.shortcutKey})`}
                >
                  <span className="node-ring-pulse" aria-hidden="true" />
                  <span className="node-core-dot" aria-hidden="true">
                    {sector.id === 'home' ? '☀' : '●'}
                  </span>
                  <span className="node-label">
                    <span className="node-code">{sector.sectorCode}</span>
                    <span className="node-name">{sector.shortName}</span>
                  </span>
                  <span className="node-key-badge" aria-hidden="true">
                    {sector.shortcutKey}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Inspector & Telemetry Drawer */}
        <div className="universe-map-inspector">
          <div className="inspector-left">
            <span className="inspector-badge">{activeSector.sectorCode}</span>
            <div>
              <h3 className="inspector-title">{activeSector.title}</h3>
              <p className="inspector-tagline">{activeSector.tagline}</p>
            </div>
          </div>

          <div className="inspector-telemetry">
            <div className="telemetry-item">
              <span className="telemetry-label">COORDINATES</span>
              <span className="telemetry-value">
                X:{activeSector.coordinates.x.toFixed(1)} Y:
                {activeSector.coordinates.y.toFixed(1)} Z:
                {activeSector.coordinates.z.toFixed(1)}
              </span>
            </div>
            <div className="telemetry-item">
              <span className="telemetry-label">TELEMETRY</span>
              <span className="telemetry-value">{activeSector.telemetry}</span>
            </div>
            <div className="telemetry-item">
              <span className="telemetry-label">STATUS</span>
              <span className="telemetry-value status-online">ORBIT ACTIVE</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleSelectSector(activeSector.id)}
            className="btn-warp-jump"
          >
            <span>INITIATE WARP JUMP</span>
            <span className="warp-arrow">➔</span>
          </button>
        </div>
      </div>
    </div>
  );
};
