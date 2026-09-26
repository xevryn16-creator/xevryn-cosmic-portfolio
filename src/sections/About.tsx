// src/sections/About.tsx
/**
 * XEVRYN Cosmic Portfolio - Section 02: IDENTITY ARCHIVE
 * Futuristic archival chamber floating inside the universe.
 * Features:
 * - Archival chamber UI with telemetry & orbital lines
 * - Identity Hero: XEVRYN / DAFFA ALFIE FEBRYAN / FULL STACK WEB DEVELOPER / CREATIVE TECHNOLOGIST
 * - Developer DNA dimensions (BUILD, CREATE, EXPLORE, LEARN, EXPERIMENT)
 * - Interactive Identity Constellation linking to verified universe sectors
 * - Calm zone camera behavior and star deceleration
 */

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profileContent } from '@/content/profile';
import { useMotion } from '@/app/providers/MotionProvider';
import { useScene } from '@/app/providers/SceneProvider';
import { useUniverse } from '@/app/providers/UniverseProvider';
import { UniverseLocation } from '@/types/universe';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface DnaNode {
  id: string;
  label: string;
  dimension: string;
  description: string;
  targetLocation: UniverseLocation;
  targetAnchor: string;
  coordinates: { x: number; y: number }; // SVG percentage (0-100)
  color: string;
}

const DNA_NODES: DnaNode[] = [
  {
    id: 'dna-build',
    label: 'BUILD',
    dimension: 'Web Projects & Production UI',
    description: 'Arsitektur frontend reaktif, aplikasi web kampus, dan sistem portofolio.',
    targetLocation: 'projects',
    targetAnchor: '#work',
    coordinates: { x: 80, y: 30 },
    color: 'var(--color-cyan-glow)',
  },
  {
    id: 'dna-create',
    label: 'CREATE',
    dimension: 'Media / Creative Work',
    description: 'Videografi, koordinasi kru, dan produksi film pendek Media 3 SMAN 3 Sumedang.',
    targetLocation: 'media',
    targetAnchor: '#media3-archive',
    coordinates: { x: 50, y: 14 },
    color: '#f43f5e',
  },
  {
    id: 'dna-explore',
    label: 'EXPLORE',
    dimension: 'Roblox & 3D WebGL',
    description: 'Eksplorasi ruang 3D Three.js, procedural stars, dan scripting Luau.',
    targetLocation: 'home',
    targetAnchor: '#hero',
    coordinates: { x: 18, y: 40 },
    color: '#38bdf8',
  },
  {
    id: 'dna-learn',
    label: 'LEARN',
    dimension: 'Current Exploration & Research',
    description: 'Pendalaman arsitektur komputasi, AI workflows, dan keamanan sistem web.',
    targetLocation: 'skills',
    targetAnchor: '#skills',
    coordinates: { x: 26, y: 80 },
    color: '#c084fc',
  },
  {
    id: 'dna-experiment',
    label: 'EXPERIMENT',
    dimension: 'Xevryn Lab Sandbox',
    description: 'Bot otomasi kampus, webhook tools, dan prototipe rekayasa mandiri.',
    targetLocation: 'lab',
    targetAnchor: '#lab',
    coordinates: { x: 74, y: 78 },
    color: '#f59e0b',
  },
];

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const chamberRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [activeDna, setActiveDna] = useState<DnaNode | null>(null);

  const { isReduced } = useMotion();
  const { updateCameraTarget } = useScene();
  const { navigateTo } = useUniverse();

  useEffect(() => {
    if (isReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading & Archival Header Reveal
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

      // Archival chamber container entrance
      if (chamberRef.current) {
        gsap.fromTo(
          chamberRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              once: true,
            },
          }
        );
      }

      // Calm Zone: Camera Orbit & Starfield Slowdown
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.3,
        onUpdate: (self) => {
          const p = self.progress;

          if (p < 0.8) {
            // Calm archival zone: steady camera, lowered star speed, stable view
            updateCameraTarget({
              z: 4.0,
              x: 0.5 - p * 0.3,
              y: -1.2,
              rotY: p * 0.15,
              starSpeed: 0.06, // Calms stars down to 0.06
              ambientIntensity: 0.28,
              warpFactor: 0.0,
            });
          } else {
            // Transition onward
            const exitP = (p - 0.8) / 0.2;
            updateCameraTarget({
              starSpeed: 0.06 + exitP * 0.2,
              warpFactor: exitP * 0.3,
            });
          }
        },
        onLeaveBack: () => {
          updateCameraTarget({
            z: 5.5,
            x: 0,
            y: 0,
            rotY: 0,
            starSpeed: 0.15,
            warpFactor: 0.0,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReduced, updateCameraTarget]);

  const handleNodeClick = (node: DnaNode) => {
    navigateTo(node.targetLocation);
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section identity-archive-section"
      aria-label="Seksi Identitas: Identity Archive & Developer DNA"
    >
      <div className="container">
        {/* Archival Chamber Shell */}
        <div ref={chamberRef} className="archival-chamber">
          {/* Chamber Telemetry Top Bar */}
          <div className="chamber-telemetry-header">
            <div className="chamber-badge">
              <span className="chamber-status-beacon" aria-hidden="true" />
              <span className="chamber-code">SECTOR 02 // IDENTITY ARCHIVE</span>
            </div>
            <div className="chamber-meta">
              <span>CHAMBER: VAULT-02-XEV</span>
              <span className="meta-divider">·</span>
              <span>RA 18h 45m // DEC +02° 35′</span>
              <span className="meta-divider">·</span>
              <span className="status-confirmed">STATUS: VERIFIED</span>
            </div>
          </div>

          {/* Section Main Title */}
          <div className="chamber-title-row">
            <div style={{ overflow: 'hidden' }}>
              <h2 id="about-heading" ref={headingRef} className="section-title chamber-title">
                Identity Archive &amp; Developer DNA
              </h2>
            </div>
            <p className="section-desc chamber-desc">
              Ruang arsip digital terpusat: identitas kreator di balik XEVRYN, dimensi keahlian inti, serta pemetaan jalur eksplorasi kreatif ke rekayasa perangkat lunak.
            </p>
          </div>

          {/* Grid Layout: Identity Hero (Left) & Developer DNA Constellation (Right) */}
          <div className="identity-archive-grid">
            {/* 1. Identity Hero Archival Dossier */}
            <div className="identity-dossier-panel">
              <div className="dossier-header">
                <div className="dossier-avatar" aria-hidden="true">
                  <span className="avatar-letter">X</span>
                  <div className="avatar-ring-pulse" />
                </div>
                <div className="dossier-titles">
                  <div className="dossier-brand">{profileContent.brand}</div>
                  <h3 className="dossier-name">{profileContent.publicName}</h3>
                  <div className="dossier-roles">
                    <span className="role-tag">FULL STACK WEB DEVELOPER</span>
                    <span className="role-tag">CREATIVE TECHNOLOGIST</span>
                  </div>
                </div>
              </div>

              {/* Bio Narrative from Verified Content */}
              <div className="dossier-body">
                {profileContent.bioFull.map((paragraph, idx) => (
                  <p key={idx} className="dossier-bio-text">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Verified Dimensions Badges */}
              <div className="dossier-attributes">
                <div className="attr-label">// DIMENSI TERVERIFIKASI</div>
                <div className="attr-pills">
                  {[
                    'Pengembangan Web',
                    'Roblox & Lua/Luau',
                    'Content Creation',
                    'Media 3 SMAN 3',
                    'Coffee Street Barista',
                  ].map((attr) => (
                    <span key={attr} className="attr-pill">
                      {attr}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Communication Relay Link */}
              <div className="dossier-actions">
                <a
                  href="#contact"
                  className="btn btn-secondary dossier-contact-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('contact');
                  }}
                >
                  <span className="btn-icon">⚡</span>
                  <span>Hubungi Stasiun Komunikasi</span>
                </a>
              </div>
            </div>

            {/* 2. Developer DNA & Constellation Matrix */}
            <div className="developer-dna-panel">
              <div className="dna-panel-header">
                <div className="dna-title-group">
                  <span className="dna-sub">// RELATIONSHIP NETWORK</span>
                  <h3 className="dna-title">Developer DNA Constellation</h3>
                </div>
                <div className="dna-legend">
                  <span className="legend-hint">Arahkan atau klik simpul untuk melompat ke sektor</span>
                </div>
              </div>

              {/* Interactive Constellation Canvas / SVG Container */}
              <div className="constellation-viewport" role="region" aria-label="Developer DNA Constellation Graph">
                <svg
                  className="constellation-svg"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  {/* Outer Orbital Rings */}
                  <circle cx="50" cy="50" r="38" className="orbital-guide-ring r1" />
                  <circle cx="50" cy="50" r="26" className="orbital-guide-ring r2" />
                  <circle cx="50" cy="50" r="14" className="orbital-guide-ring r3" />

                  {/* Radiating Connection Lines to Central Core */}
                  {DNA_NODES.map((node) => {
                    const isActive = activeDna?.id === node.id;
                    return (
                      <line
                        key={`line-${node.id}`}
                        x1="50"
                        y1="50"
                        x2={node.coordinates.x}
                        y2={node.coordinates.y}
                        className={`constellation-edge ${isActive ? 'edge-active' : ''}`}
                        style={{
                          stroke: isActive ? node.color : 'rgba(56, 189, 248, 0.25)',
                        }}
                      />
                    );
                  })}
                </svg>

                {/* Central Anchor Node: XEVRYN CORE */}
                <div
                  className="constellation-core-node"
                  style={{ left: '50%', top: '50%' }}
                >
                  <div className="core-node-inner">
                    <span className="core-node-label">XEVRYN</span>
                    <span className="core-node-sub">CORE</span>
                  </div>
                  <div className="core-pulse-ring" />
                </div>

                {/* Surrounding Thematic DNA Nodes */}
                {DNA_NODES.map((node) => {
                  const isActive = activeDna?.id === node.id;
                  return (
                    <button
                      key={node.id}
                      type="button"
                      className={`dna-node-button ${isActive ? 'is-active' : ''}`}
                      style={{
                        left: `${node.coordinates.x}%`,
                        top: `${node.coordinates.y}%`,
                        borderColor: isActive ? node.color : 'rgba(56, 189, 248, 0.35)',
                      }}
                      onMouseEnter={() => setActiveDna(node)}
                      onMouseLeave={() => setActiveDna(null)}
                      onFocus={() => setActiveDna(node)}
                      onBlur={() => setActiveDna(null)}
                      onClick={() => handleNodeClick(node)}
                      aria-label={`${node.label}: ${node.dimension}. Klik untuk membuka sektor.`}
                    >
                      <span
                        className="node-dot"
                        style={{
                          background: node.color,
                          boxShadow: isActive ? `0 0 12px ${node.color}` : 'none',
                        }}
                      />
                      <span className="node-text">{node.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active DNA Node Information Card */}
              <div className="dna-info-card" aria-live="polite">
                {activeDna ? (
                  <div className="dna-info-content">
                    <div className="info-top">
                      <span className="info-label" style={{ color: activeDna.color }}>
                        // DIMENSI · {activeDna.label}
                      </span>
                      <span className="info-target-tag">JUMP TO {activeDna.targetLocation.toUpperCase()}</span>
                    </div>
                    <div className="info-dimension">{activeDna.dimension}</div>
                    <p className="info-desc">{activeDna.description}</p>
                    <button
                      type="button"
                      className="info-jump-btn"
                      onClick={() => handleNodeClick(activeDna)}
                      style={{ borderColor: activeDna.color }}
                    >
                      <span>Buka Sektor {activeDna.targetLocation.toUpperCase()}</span>
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                ) : (
                  <div className="dna-info-placeholder">
                    <span className="placeholder-icon">✦</span>
                    <span className="placeholder-text">
                      Pilih atau arahkan kursor ke salah satu simpul DNA (BUILD, CREATE, EXPLORE, LEARN, EXPERIMENT) untuk melihat detail relasi.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
