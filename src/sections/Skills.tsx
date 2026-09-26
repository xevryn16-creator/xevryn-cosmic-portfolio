// src/sections/Skills.tsx
/**
 * XEVRYN Cosmic Portfolio - Section 05: XEVRYN SKILL NETWORK
 * Relationship graph connecting skills directly to verified real-world projects & experiences.
 * Features:
 * - Dynamic relationship graph (No progress bars, no fake proficiency percentages)
 * - 4 Verified Categories: Development, Creative Media, Exploring, Roblox & Operations
 * - Interactive node hover: expands node, glows connection edges, highlights connected projects
 * - Click focus mode with detailed evidence panel and [ EXIT SKILL FOCUS ] button
 * - Gentle camera approach during skill focus and ESC key support
 * - Mobile responsive categorized network with touch targets >= 44px
 */

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillsContent } from '@/content/skills';
import { projectsContent } from '@/content/projects';
import { experienceContent } from '@/content/experience';
import { SkillItem } from '@/types/content';
import { useMotion } from '@/app/providers/MotionProvider';
import { useScene } from '@/app/providers/SceneProvider';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Coordinate layout mapping for skill network nodes in percentage space (0 - 100)
interface SkillGraphNode extends SkillItem {
  cx: number;
  cy: number;
  categoryGroup: 'development' | 'creative_media' | 'exploring' | 'roblox_ops';
}

const CATEGORY_COLORS = {
  development: 'var(--color-cyan-glow)',
  creative_media: '#f43f5e',
  exploring: '#c084fc',
  roblox_ops: '#f59e0b',
};

const CATEGORY_TITLES = {
  development: 'DEVELOPMENT',
  creative_media: 'CREATIVE MEDIA',
  exploring: 'EXPLORING & RESEARCH',
  roblox_ops: 'ROBLOX & OPERATIONS',
};

export const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const detailPanelRef = useRef<HTMLDivElement>(null);

  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(skillsContent[0].id);

  const { isReduced } = useMotion();
  const { updateCameraTarget } = useScene();

  // Position nodes spatially by category
  const graphNodes: SkillGraphNode[] = useMemo(() => {
    return skillsContent.map((skill) => {
      let cx = 50;
      let cy = 50;
      let categoryGroup: SkillGraphNode['categoryGroup'] = 'development';

      if (skill.category === 'development') {
        categoryGroup = 'development';
        // Cluster in top center (cx: 30-70, cy: 15-38)
        const devSkills = skillsContent.filter((s) => s.category === 'development');
        const devIdx = devSkills.findIndex((s) => s.id === skill.id);
        const angle = (devIdx / devSkills.length) * Math.PI + Math.PI;
        cx = 50 + Math.cos(angle) * 28;
        cy = 28 + Math.sin(angle) * 16;
      } else if (skill.category === 'creative_media') {
        categoryGroup = 'creative_media';
        // Cluster in left center (cx: 12-28, cy: 45-75)
        const crtSkills = skillsContent.filter((s) => s.category === 'creative_media');
        const crtIdx = crtSkills.findIndex((s) => s.id === skill.id);
        cx = 20 + (crtIdx % 2) * 10;
        cy = 50 + crtIdx * 14;
      } else if (skill.category === 'exploring') {
        categoryGroup = 'exploring';
        // Cluster in right center (cx: 72-88, cy: 45-75)
        const expSkills = skillsContent.filter((s) => s.category === 'exploring');
        const expIdx = expSkills.findIndex((s) => s.id === skill.id);
        cx = 72 + (expIdx % 2) * 10;
        cy = 50 + expIdx * 12;
      } else {
        categoryGroup = 'roblox_ops';
        // Cluster in bottom center (cx: 38-62, cy: 75-88)
        const opsSkills = skillsContent.filter((s) => s.category === 'roblox' || s.category === 'operations');
        const opsIdx = opsSkills.findIndex((s) => s.id === skill.id);
        cx = 40 + opsIdx * 20;
        cy = 82;
      }

      // Small jitter so no nodes strictly collide
      return {
        ...skill,
        cx: Math.round(cx * 10) / 10,
        cy: Math.round(cy * 10) / 10,
        categoryGroup,
      };
    });
  }, []);

  const activeSkillId = hoveredSkillId || selectedSkillId;
  const activeSkill = skillsContent.find((s) => s.id === activeSkillId) || skillsContent[0];

  // Resolve verified connected projects or experiences dynamically
  const connectedEvidence = useMemo(() => {
    if (!activeSkill || !activeSkill.projectIds) return [];

    const results: Array<{ id: string; title: string; subtitle: string; url: string; type: 'project' | 'experience' }> = [];

    activeSkill.projectIds.forEach((refId) => {
      // Check projects by slug or ID
      const prj = projectsContent.find((p) => p.slug === refId || p.id === refId);
      if (prj) {
        results.push({
          id: prj.id,
          title: prj.title,
          subtitle: `Proyek Terverifikasi · ${prj.year || '2025'}`,
          url: `#work`,
          type: 'project',
        });
        return;
      }

      // Check experience by ID
      const exp = experienceContent.find((e) => e.id === refId);
      if (exp) {
        results.push({
          id: exp.id,
          title: exp.organization || exp.role,
          subtitle: `${exp.role} · ${exp.location || 'Sumedang'}`,
          url: `#experience`,
          type: 'experience',
        });
        return;
      }

      // If reference is a custom verified tag
      if (refId === 'EXP-M3' || refId === 'M3-02' || refId === 'M3-04') {
        results.push({
          id: refId,
          title: 'Media 3 SMAN 3 Sumedang',
          subtitle: 'Wakil Ekstrakurikuler & Produksi Kreatif',
          url: `#media3-archive`,
          type: 'experience',
        });
      } else if (refId === 'EXP-01') {
        results.push({
          id: 'EXP-01',
          title: '11/12 coffe street Sumedang',
          subtitle: 'Barista & Kasir Operasional',
          url: `#experience`,
          type: 'experience',
        });
      }
    });

    return results;
  }, [activeSkill]);

  // Entrance & camera reaction
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

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.3,
        onUpdate: (self) => {
          const p = self.progress;
          updateCameraTarget({
            z: 4.8 - p * 0.2,
            x: -0.4 + p * 0.3,
            y: -11.0 - p * 1.2,
            starSpeed: 0.08,
            ambientIntensity: 0.28,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReduced, updateCameraTarget]);

  // Handle skill focus click
  const handleSkillClick = (skillId: string) => {
    setSelectedSkillId(skillId);

    if (!isReduced) {
      // Gentle camera approach to skill graph
      updateCameraTarget({
        z: 4.3,
        starSpeed: 0.04,
      });
    }

    // Scroll detail panel into view on mobile
    if (window.innerWidth < 768 && detailPanelRef.current) {
      detailPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const exitSkillFocus = useCallback(() => {
    setSelectedSkillId(null);
    if (!isReduced) {
      updateCameraTarget({
        z: 4.8,
        starSpeed: 0.08,
      });
    }
  }, [isReduced, updateCameraTarget]);

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedSkillId) {
        exitSkillFocus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [exitSkillFocus, selectedSkillId]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section skill-network-section"
      aria-labelledby="skills-heading"
    >
      <div className="container">
        {/* Section Header */}
        <div className="network-header">
          <div className="section-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--color-cyan-glow)',
                boxShadow: '0 0 8px var(--color-cyan-glow)',
              }}
              aria-hidden="true"
            />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.12em', color: 'var(--color-cyan-glow)' }}>
              SECTOR 05 // XEVRYN SKILL NETWORK
            </span>
          </div>

          <div style={{ overflow: 'hidden' }}>
            <h2 id="skills-heading" ref={headingRef} className="section-title">
              Skill Network &amp; Project Relationships
            </h2>
          </div>

          <p className="section-desc">
            Grafik relasi kemampuan berbasis bukti karya nyata—tanpa skor persentase atau angka kemahiran artifisial. Setiap simpul terhubung langsung ke proyek atau pengalaman yang terverifikasi.
          </p>
        </div>

        {/* Network Ecosystem Grid */}
        <div className="skill-network-workspace">
          {/* Interactive Relationship Graph Canvas */}
          <div className="network-graph-panel" role="region" aria-label="Grafik Relasi Kemampuan 2D/3D">
            {/* Top Toolbar / Category Filter Indicators */}
            <div className="graph-category-indicators">
              {Object.entries(CATEGORY_TITLES).map(([key, title]) => (
                <div key={key} className="category-indicator-pill">
                  <span
                    className="cat-dot"
                    style={{ background: CATEGORY_COLORS[key as keyof typeof CATEGORY_COLORS] }}
                  />
                  <span>{title}</span>
                </div>
              ))}
            </div>

            {/* SVG Connecting Edges Layer */}
            <div className="network-canvas-container">
              <svg className="network-svg-layer" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                {/* Background Central Webbing */}
                <line x1="50" y1="28" x2="20" y2="50" className="base-edge" />
                <line x1="50" y1="28" x2="72" y2="50" className="base-edge" />
                <line x1="20" y1="50" x2="40" y2="82" className="base-edge" />
                <line x1="72" y1="50" x2="60" y2="82" className="base-edge" />
                <line x1="50" y1="28" x2="50" y2="82" className="base-edge" />

                {/* Dynamic Edges connecting active node to others in same category */}
                {graphNodes.map((node) => {
                  const isNodeActive = node.id === activeSkillId;
                  if (!isNodeActive) return null;

                  return graphNodes
                    .filter((other) => other.categoryGroup === node.categoryGroup && other.id !== node.id)
                    .map((other) => (
                      <line
                        key={`edge-${node.id}-${other.id}`}
                        x1={node.cx}
                        y1={node.cy}
                        x2={other.cx}
                        y2={other.cy}
                        className="active-glowing-edge"
                        style={{
                          stroke: CATEGORY_COLORS[node.categoryGroup],
                        }}
                      />
                    ));
                })}
              </svg>

              {/* Skill Nodes Interactive Layer */}
              <div className="network-nodes-layer">
                {graphNodes.map((node) => {
                  const isSelected = selectedSkillId === node.id;
                  const isHovered = hoveredSkillId === node.id;
                  const isActive = isSelected || isHovered;
                  const isUnrelated = activeSkillId && node.id !== activeSkillId && node.categoryGroup !== activeSkill?.category;
                  const catColor = CATEGORY_COLORS[node.categoryGroup];

                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => handleSkillClick(node.id)}
                      onMouseEnter={() => setHoveredSkillId(node.id)}
                      onMouseLeave={() => setHoveredSkillId(null)}
                      onFocus={() => setHoveredSkillId(node.id)}
                      onBlur={() => setHoveredSkillId(null)}
                      className={`skill-network-node ${isActive ? 'is-node-active' : ''} ${isUnrelated ? 'is-node-dimmed' : ''}`}
                      style={{
                        left: `${node.cx}%`,
                        top: `${node.cy}%`,
                        borderColor: isActive ? catColor : 'rgba(56, 189, 248, 0.25)',
                        boxShadow: isActive ? `0 0 20px ${catColor}60` : 'none',
                      }}
                      aria-pressed={isSelected}
                      aria-label={`Keahlian: ${node.label}, Kategori: ${node.categoryGroup}`}
                    >
                      <span
                        className="node-status-dot"
                        style={{
                          background: catColor,
                          boxShadow: isActive ? `0 0 10px ${catColor}` : 'none',
                        }}
                      />
                      <span className="node-label-text">{node.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="graph-footer-hint">
              <span>✦ Klik simpul untuk mengunci fokus &amp; memeriksa relasi proyek · Tekan ESC untuk keluar</span>
            </div>
          </div>

          {/* Skill Focus & Evidence Panel */}
          <div ref={detailPanelRef} className="skill-detail-inspector" aria-live="polite">
            <div className="inspector-card-header">
              <div className="inspector-group-tag">
                <span
                  className="category-accent-dot"
                  style={{
                    background:
                      CATEGORY_COLORS[
                        (activeSkill.category === 'roblox' || activeSkill.category === 'operations'
                          ? 'roblox_ops'
                          : activeSkill.category) as keyof typeof CATEGORY_COLORS
                      ] || 'var(--color-cyan-glow)',
                  }}
                />
                <span>
                  // SKILL NODE //{' '}
                  {activeSkill.category.toUpperCase().replace('_', ' ')}
                </span>
              </div>

              {selectedSkillId && (
                <button
                  type="button"
                  className="exit-focus-btn"
                  onClick={exitSkillFocus}
                  aria-label="Keluar dari mode fokus keahlian"
                >
                  [ EXIT SKILL FOCUS ]
                </button>
              )}
            </div>

            <h3 className="inspector-skill-title">{activeSkill.label}</h3>

            <div className="inspector-badge-row">
              <span className="badge-pill status-verified">● TERVERIFIKASI</span>
              {activeSkill.badge && (
                <span className="badge-pill badge-level">{activeSkill.badge.toUpperCase()}</span>
              )}
            </div>

            <p className="inspector-skill-desc">{activeSkill.description}</p>

            {/* Connected Projects / Experience Evidence Section */}
            <div className="inspector-evidence-section">
              <div className="evidence-heading">
                // CONNECTED REAL-WORLD PROJECTS &amp; EVIDENCE ({connectedEvidence.length})
              </div>

              {connectedEvidence.length > 0 ? (
                <div className="evidence-cards-list">
                  {connectedEvidence.map((ev) => (
                    <a
                      key={ev.id}
                      href={ev.url}
                      className="evidence-item-card"
                    >
                      <div className="evidence-item-info">
                        <span className="evidence-item-title">{ev.title}</span>
                        <span className="evidence-item-sub">{ev.subtitle}</span>
                      </div>
                      <span className="evidence-item-arrow" aria-hidden="true">
                        {ev.id} →
                      </span>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="evidence-empty-box">
                  <span className="empty-icon">✦</span>
                  <span className="empty-text">
                    Keahlian ini dalam tahap eksplorasi aktif &amp; penelitian di Xevryn Lab.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
