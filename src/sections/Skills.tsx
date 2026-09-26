// src/sections/Skills.tsx
/**
 * XEVRYN Cosmic Portfolio - Section 09: Skills Constellation (ANM-045 to ANM-052)
 * Interactive star constellation nodes, connecting lines, detail panel,
 * linked project/experience evidence, and smooth transition toward Exploration Deck.
 */

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillsContent } from '@/content/skills';
import { projectsContent } from '@/content/projects';
import { useMotion } from '@/app/providers/MotionProvider';
import { useScene } from '@/app/providers/SceneProvider';

gsap.registerPlugin(ScrollTrigger);

export const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [selectedSkillId, setSelectedSkillId] = useState<string>(skillsContent[0].id);
  const { isReduced } = useMotion();
  const { updateCameraTarget } = useScene();

  const selectedSkill = skillsContent.find((s) => s.id === selectedSkillId) || skillsContent[0];
  const linkedProjects = projectsContent.filter((p) => selectedSkill.projectIds?.includes(p.id));

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'web':
        return 'var(--color-cyan-glow)';
      case 'roblox':
        return 'var(--color-nebula-violet)';
      case 'creative':
        return '#f472b6';
      case 'marketing':
        return '#f59e0b';
      case 'operations':
        return '#10b981';
      default:
        return 'var(--color-accent-blue)';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'web':
        return 'Pengembangan Web';
      case 'roblox':
        return 'Roblox & Lua';
      case 'creative':
        return 'Kreatif';
      case 'marketing':
        return 'Pemasaran';
      case 'operations':
        return 'Operasional';
      default:
        return category;
    }
  };

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

      // Skill nodes reveal
      const nodes = sectionRef.current?.querySelectorAll('.skill-node');
      if (nodes && nodes.length > 0) {
        gsap.fromTo(
          nodes,
          { scale: 0.85, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              once: true,
            },
          }
        );
      }

      // Camera drift
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.3,
        onUpdate: (self) => {
          const p = self.progress;
          updateCameraTarget({
            z: 4.8 - p * 0.2,
            x: -0.5 + p * 0.4,
            y: -15.5 - p * 1.5,
            starSpeed: 0.05,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReduced, updateCameraTarget]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section"
      aria-labelledby="skills-heading"
    >
      <div className="container">
        <div style={{ marginBottom: '40px' }}>
          <div
            className="section-eyebrow"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--color-accent-blue)',
                boxShadow: '0 0 8px var(--color-accent-blue)',
              }}
              aria-hidden="true"
            />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.12em', color: 'var(--color-accent-blue)' }}>
              09 / SKILLS CONSTELLATION
            </span>
          </div>

          <div style={{ overflow: 'hidden' }}>
            <h2 id="skills-heading" ref={headingRef} className="section-title">
              Konstelasi Kemampuan &amp; Keahlian
            </h2>
          </div>

          <p className="section-desc" style={{ maxWidth: '64ch' }}>
            Pemetaan kemampuan berdasarkan fakta kegiatan dan proyek nyata—tanpa skor persentase atau sertifikasi buatan.
          </p>
        </div>

        <div className="grid-2" style={{ alignItems: 'start', gap: '32px' }}>
          {/* Constellation Grid of Nodes */}
          <div
            id="skills-constellation-container"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '12px',
            }}
          >
            {skillsContent.map((skill) => {
              const isSelected = skill.id === selectedSkillId;
              const catColor = getCategoryColor(skill.category);
              return (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => setSelectedSkillId(skill.id)}
                  className={`skill-node cosmic-card ${isSelected ? 'is-selected' : ''}`}
                  style={{
                    padding: '18px 20px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    minHeight: '44px',
                    position: 'relative',
                    border: isSelected
                      ? `1px solid ${catColor}`
                      : '1px solid var(--color-border)',
                    boxShadow: isSelected
                      ? `0 0 20px rgba(56, 189, 248, 0.2), inset 0 0 12px rgba(56, 189, 248, 0.08)`
                      : 'none',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  aria-pressed={isSelected}
                  aria-controls="skill-detail-panel"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: catColor,
                        boxShadow: isSelected ? `0 0 8px ${catColor}` : 'none',
                      }}
                      aria-hidden="true"
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: 'var(--color-text-dim)',
                        letterSpacing: '0.06em',
                      }}
                    >
                      {getCategoryLabel(skill.category)}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-main)', margin: 0 }}>
                    {skill.label}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* Skill Detail Panel */}
          <div
            id="skill-detail-panel"
            className="cosmic-card"
            style={{
              padding: '32px',
              border: `1px solid ${getCategoryColor(selectedSkill.category)}`,
              background: 'linear-gradient(135deg, rgba(11, 17, 32, 0.95) 0%, rgba(15, 23, 42, 0.9) 100%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
              borderRadius: '14px',
            }}
            aria-live="polite"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: getCategoryColor(selectedSkill.category),
                  letterSpacing: '0.1em',
                }}
              >
                // KELOMPOK · {getCategoryLabel(selectedSkill.category).toUpperCase()}
              </span>
              <span
                style={{
                  background: 'rgba(56, 189, 248, 0.1)',
                  color: 'var(--color-cyan-glow)',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                TERVERIFIKASI
              </span>
            </div>

            <h3 style={{ fontSize: '22px', color: 'var(--color-text-main)', marginBottom: '14px' }}>
              {selectedSkill.label}
            </h3>

            <p className="text-muted" style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '24px' }}>
              {selectedSkill.description}
            </p>

            {/* Evidence Linkage */}
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '20px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--color-text-dim)',
                  letterSpacing: '0.08em',
                  marginBottom: '12px',
                }}
              >
                BUKTI PENERAPAN &amp; KONTEKS NYATA:
              </div>

              {linkedProjects.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {linkedProjects.map((p) => (
                    <a
                      key={p.id}
                      href="#work"
                      className="skill-project-link cosmic-card"
                      style={{
                        padding: '12px 16px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        textDecoration: 'none',
                        border: '1px solid rgba(56, 189, 248, 0.2)',
                        transition: 'all 0.18s ease-out',
                      }}
                    >
                      <span style={{ fontSize: '14px', color: 'var(--color-text-main)', fontWeight: 500 }}>
                        {p.title}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '12px',
                          color: 'var(--color-accent-blue)',
                        }}
                      >
                        {p.id} →
                      </span>
                    </a>
                  ))}
                </div>
              ) : selectedSkill.category === 'operations' ? (
                <a
                  href="#experience"
                  className="skill-project-link cosmic-card"
                  style={{
                    padding: '12px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textDecoration: 'none',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                  }}
                >
                  <span style={{ fontSize: '14px', color: 'var(--color-text-main)', fontWeight: 500 }}>
                    11/12 coffe street (Sumedang) — Barista &amp; Kasir
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#10b981' }}>
                    EXP-01 →
                  </span>
                </a>
              ) : selectedSkill.category === 'roblox' ? (
                <a
                  href="#roblox"
                  className="skill-project-link cosmic-card"
                  style={{
                    padding: '12px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textDecoration: 'none',
                    border: '1px solid rgba(192, 132, 252, 0.3)',
                  }}
                >
                  <span style={{ fontSize: '14px', color: 'var(--color-text-main)', fontWeight: 500 }}>
                    Eksplorasi Roblox Studio &amp; Scripting Lua/Luau
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-nebula-violet)' }}>
                    RBLX →
                  </span>
                </a>
              ) : (
                <a
                  href="#atomic-hub"
                  className="skill-project-link cosmic-card"
                  style={{
                    padding: '12px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textDecoration: 'none',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                  }}
                >
                  <span style={{ fontSize: '14px', color: 'var(--color-text-main)', fontWeight: 500 }}>
                    Atomic Roblox Hub — Content Creator &amp; Pemasaran
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#f59e0b' }}>
                    HUB →
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
