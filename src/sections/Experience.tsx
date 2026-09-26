// src/sections/Experience.tsx
/**
 * XEVRYN Cosmic Portfolio - Section 03: ORBITAL TIMELINE
 * Spacecraft navigation waypoint system replacing conventional timeline cards.
 * Features:
 * - Orbital waypoints from verified milestones (SMAN 3, Media 3, 11/12 coffe street, Web Dev, Current Xevryn)
 * - Glowing route connection path connecting milestones
 * - Interactive waypoint lock & subtle camera reaction
 * - Orbit Coffee Break visual accent for 11/12 coffe street
 * - Fully accessible keyboard controls and reduced-motion compliance
 */

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experienceContent, journeyTimeline, TimelineMilestone } from '@/content/experience';
import { useScene } from '@/app/providers/SceneProvider';
import { useMotion } from '@/app/providers/MotionProvider';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const waypointsTrackRef = useRef<HTMLDivElement>(null);
  const [activeWaypointId, setActiveWaypointId] = useState<string>(journeyTimeline[0].id);

  const { updateCameraTarget } = useScene();
  const { isReduced } = useMotion();

  const activeMilestone = journeyTimeline.find((m) => m.id === activeWaypointId) || journeyTimeline[0];

  useEffect(() => {
    if (isReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading reveal
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

      // Orbital timeline waypoints staggered reveal
      const waypoints = sectionRef.current?.querySelectorAll('.orbital-waypoint-node');
      if (waypoints && waypoints.length > 0) {
        gsap.fromTo(
          waypoints,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 68%',
              once: true,
            },
          }
        );
      }

      // Section camera orbit alignment
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        end: 'bottom 25%',
        scrub: 0.3,
        onUpdate: (self) => {
          const p = self.progress;
          // Subtle camera reaction revealing waypoint depth
          updateCameraTarget({
            x: 0.4 - p * 0.3,
            y: -4.5 - p * 1.0,
            z: 5.2,
            lookAtX: -0.4,
            lookAtY: -4.5,
            lookAtZ: 0,
            starSpeed: 0.12,
            ambientIntensity: 0.3,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReduced, updateCameraTarget]);

  // Handle Waypoint selection with subtle camera reaction
  const handleSelectWaypoint = (milestone: TimelineMilestone) => {
    setActiveWaypointId(milestone.id);

    if (!isReduced) {
      // Subtle depth shift depending on waypoint index
      const idx = journeyTimeline.findIndex((m) => m.id === milestone.id);
      const stepOffset = (idx / (journeyTimeline.length - 1) - 0.5) * 0.8;
      updateCameraTarget({
        x: 0.4 + stepOffset * 0.3,
        z: 5.0 - Math.abs(stepOffset) * 0.2,
      });
    }
  };

  const getWaypointCategoryColor = (type: TimelineMilestone['type']) => {
    switch (type) {
      case 'creative':
        return '#f43f5e';
      case 'work':
        return '#f59e0b';
      case 'tech':
        return 'var(--color-cyan-glow)';
      case 'education':
      default:
        return '#38bdf8';
    }
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section orbital-timeline-section"
      aria-labelledby="experience-heading"
    >
      <div className="container">
        {/* Section Telemetry Header */}
        <div className="section-header">
          <div className="section-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#f59e0b',
                boxShadow: '0 0 8px #f59e0b',
              }}
              aria-hidden="true"
            />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.12em', color: '#f59e0b' }}>
              SECTOR 03 // ORBITAL TIMELINE
            </span>
          </div>

          <div style={{ overflow: 'hidden' }}>
            <h2 id="experience-heading" ref={headingRef} className="section-title">
              Orbital Timeline &amp; Experience Waypoints
            </h2>
          </div>

          <p className="section-desc">
            Rangkaian waypoint perjalanan nyata: berawal dari fondasi kreatif di SMAN 3 Sumedang, operasional bertekanan tinggi di Coffee Street, hingga rekayasa sistem perangkat lunak modern.
          </p>
        </div>

        {/* Spacecraft Navigation Waypoints Deck */}
        <div className="orbital-waypoints-deck">
          <div className="deck-telemetry-strip">
            <span className="telemetry-label">// TRAJECTORY ROUTE: ORIGIN → MEDIA 3 → COFFEE STREET → WEB DEV → CURRENT XEVRYN</span>
            <span className="telemetry-status">WAYPOINTS ACTIVE: {journeyTimeline.length} / {journeyTimeline.length}</span>
          </div>

          {/* Glowing Sequential Route Track */}
          <div ref={waypointsTrackRef} className="waypoints-horizontal-track">
            {/* Background Route Line */}
            <div className="waypoints-route-line" aria-hidden="true">
              <div className="route-glow-pulse" />
            </div>

            {journeyTimeline.map((item, index) => {
              const isSelected = item.id === activeWaypointId;
              const catColor = getWaypointCategoryColor(item.type);

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectWaypoint(item)}
                  className={`orbital-waypoint-node ${isSelected ? 'is-waypoint-locked' : ''}`}
                  aria-pressed={isSelected}
                  aria-label={`Waypoint ${item.stage}: ${item.title} (${item.role})`}
                >
                  {/* Waypoint Marker Icon */}
                  <div
                    className="waypoint-beacon"
                    style={{
                      borderColor: isSelected ? catColor : 'rgba(255, 255, 255, 0.2)',
                      background: isSelected ? catColor : 'rgba(15, 23, 42, 0.9)',
                      boxShadow: isSelected ? `0 0 16px ${catColor}` : 'none',
                    }}
                  >
                    <span className="waypoint-stage-number">{item.stage}</span>
                    {isSelected && <div className="beacon-pulse-ring" style={{ borderColor: catColor }} />}
                  </div>

                  {/* Waypoint Header */}
                  <div className="waypoint-meta">
                    <span className="waypoint-type-tag" style={{ color: catColor }}>
                      {item.type.toUpperCase()}
                    </span>
                    <h3 className="waypoint-title">{item.title}</h3>
                    <span className="waypoint-org">{item.organization}</span>
                  </div>

                  {/* Connector Arrow */}
                  {index < journeyTimeline.length - 1 && (
                    <span className="waypoint-connector-arrow" aria-hidden="true">
                      →
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Waypoint Telemetry Inspector */}
          <div className="waypoint-inspector-card" aria-live="polite">
            <div className="inspector-badge-row">
              <div className="inspector-id-group">
                <span className="inspector-pulse-dot" style={{ background: getWaypointCategoryColor(activeMilestone.type) }} />
                <span className="inspector-waypoint-id">WAYPOINT LOCK // {activeMilestone.id} (STEP {activeMilestone.stage})</span>
              </div>
              <span className="inspector-status-badge">TERVERIFIKASI</span>
            </div>

            <div className="inspector-main-grid">
              <div>
                <h3 className="inspector-title">{activeMilestone.title}</h3>
                <div className="inspector-role">
                  <span className="role-highlight" style={{ color: getWaypointCategoryColor(activeMilestone.type) }}>
                    {activeMilestone.role}
                  </span>
                  <span className="role-divider">·</span>
                  <span className="role-org">{activeMilestone.organization}</span>
                </div>
                <p className="inspector-description">{activeMilestone.description}</p>
              </div>

              <div className="inspector-highlights">
                <div className="highlights-title">// FOKUS &amp; HASIL PEMBELAJARAN</div>
                <ul className="highlights-list">
                  {activeMilestone.highlights.map((h, i) => (
                    <li key={i} className="highlight-item">
                      <span className="highlight-bullet" style={{ color: getWaypointCategoryColor(activeMilestone.type) }}>✦</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Real-World Operational Highlight: 11/12 coffe street */}
        <div className="experience-detail-stack" style={{ marginTop: '36px' }}>
          {/* Orbit Coffee Break Accent Card */}
          <div className="orbit-coffee-break-card">
            <div className="coffee-break-visual" aria-hidden="true">
              <div className="floating-zero-g-cup">
                <div className="steam-line s1" />
                <div className="steam-line s2" />
                <div className="steam-line s3" />
                <div className="cup-shape">
                  <div className="cup-rim-oval">
                    <div className="coffee-brew" />
                  </div>
                  <div className="cup-side-handle" />
                </div>
              </div>
              <div className="floating-coffee-beans">
                <span className="coffee-bean b1">☕</span>
                <span className="coffee-bean b2">✦</span>
                <span className="coffee-bean b3">☕</span>
              </div>
            </div>

            <div className="coffee-break-text">
              <span className="break-badge">WAYPOINT 04 // 11/12 COFFE STREET SUMEDANG</span>
              <h3 className="break-title">Ketelitian Barista &amp; Kasir di Bawah Tekanan Nyata</h3>
              <p className="break-desc">
                Pelayanan pelanggan yang ramah, akurasi transaksi kasir harian, komunikasi responsif antarkru, serta ketenangan menghadapi alur pesanan yang padat melatih fokus, kedisiplinan, dan ketahanan mental kerja.
              </p>
            </div>
          </div>

          {/* Deep Experience Verification Articles */}
          <div className="experience-cards-grid">
            {experienceContent.map((item) => (
              <article
                key={item.id}
                className="cosmic-card experience-archival-card"
                style={{
                  borderLeft: item.id === 'EXP-M3' ? '3px solid #f43f5e' : '3px solid #f59e0b',
                }}
              >
                <div className="card-top">
                  <div>
                    <h3 className="card-role">{item.role}</h3>
                    <div className="card-org-line">
                      <span className="card-org" style={{ color: item.id === 'EXP-M3' ? '#f43f5e' : '#f59e0b' }}>
                        {item.organization}
                      </span>
                      {item.location && <span className="card-loc">· {item.location}</span>}
                    </div>
                  </div>
                  <span className="card-verified-tag">BUKTI TERVERIFIKASI</span>
                </div>

                <p className="card-description">{item.description}</p>

                {item.tags && item.tags.length > 0 && (
                  <div className="card-tags">
                    {item.tags.map((tag) => (
                      <span key={tag} className="experience-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
