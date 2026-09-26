// src/components/projects/CaseStudyDrawer.tsx
/**
 * XEVRYN Cosmic Portfolio - Phase 4: Case Study Engine & Mission Control Drawer
 * Cinematic technical archive replacing generic modals with deep architectural immersion.
 * Features:
 * - Dynamic rendering strictly of verified fields (Overview, Problem, Solution, Architecture, Features, Stack, Challenges, Gallery)
 * - Interactive System Architecture Node Graph
 * - Tech Stack with direct linkage to Phase 3 Global Skill Network (#skills)
 * - Project World Navigation (Previous / Next Project)
 * - Keyboard navigation (ESC to close, Left/Right arrows for project cycling)
 * - Desktop cinematic mission control drawer & mobile responsive full-screen sheet
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ProjectContent } from '@/types/content';
import { projectsContent } from '@/content/projects';
import { getProjectWorldConfig } from '@/content/projectWorlds';
import { ProjectArchitecture } from './ProjectArchitecture';
import { ProjectGallery } from './ProjectGallery';
import { useUniverse } from '@/app/providers/UniverseProvider';

interface CaseStudyDrawerProps {
  project: ProjectContent;
  onClose: () => void;
  onSelectProject: (slug: string) => void;
}

export const CaseStudyDrawer: React.FC<CaseStudyDrawerProps> = ({
  project,
  onClose,
  onSelectProject,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'features' | 'challenges' | 'gallery'>('overview');

  const { navigateTo } = useUniverse();
  const worldConfig = getProjectWorldConfig(project.slug);
  const accentColor = worldConfig?.accentColor || 'var(--color-cyan-glow)';

  // Find index in projectsContent
  const currentIndex = projectsContent.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? projectsContent[currentIndex - 1] : projectsContent[projectsContent.length - 1];
  const nextProject = currentIndex < projectsContent.length - 1 ? projectsContent[currentIndex + 1] : projectsContent[0];

  const liveLink = project.links.find((l) => l.kind === 'live' || l.kind === 'demo');
  const repoLink = project.links.find((l) => l.kind === 'repo');

  // Handle focus in 3D universe
  const handleFocusInUniverse = () => {
    onClose();
    // Navigate to projects sector and trigger explore focus if celestial mapping exists
    navigateTo('projects');
  };

  // Jump to Global Skill Network
  const handleJumpToSkills = (_techName: string) => {
    onClose();
    window.location.hash = '#skills';
    const el = document.getElementById('skills');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Keyboard controls
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft' && e.altKey) {
        e.preventDefault();
        onSelectProject(prevProject.slug);
      } else if (e.key === 'ArrowRight' && e.altKey) {
        e.preventDefault();
        onSelectProject(nextProject.slug);
      }
    },
    [nextProject.slug, onClose, onSelectProject, prevProject.slug]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    closeBtnRef.current?.focus();
    // Lock body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  return (
    <div
      className="case-study-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      onClick={(e) => {
        if (e.target === drawerRef.current) onClose();
      }}
    >
      <div ref={drawerRef} className="case-study-backdrop">
        <div className="case-study-drawer" onClick={(e) => e.stopPropagation()}>
          {/* Mission Control Header Bar */}
          <div className="drawer-header-bar">
            <div className="drawer-telemetry">
              <div className="drawer-status-pill" style={{ borderColor: accentColor }}>
                <span className="status-dot" style={{ background: accentColor, boxShadow: `0 0 8px ${accentColor}` }} />
                <span>PROJECT WORLD // {project.id}</span>
              </div>
              {worldConfig && (
                <span className="world-title-tag">
                  {worldConfig.worldName} · [{worldConfig.environment.toUpperCase()}]
                </span>
              )}
            </div>

            <div className="drawer-header-actions">
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                className="btn-drawer-close"
                aria-label="Tutup Case Study (ESC)"
              >
                <span className="key-tag">ESC</span>
                <span>TUTUP</span>
              </button>
            </div>
          </div>

          {/* Hero Section */}
          <div className="drawer-hero-section">
            <div className="hero-titles">
              <div className="hero-eyebrow">
                <span className="celestial-badge">{project.celestialType?.toUpperCase() || 'STELLAR OBJECT'}</span>
                <span className="verified-badge">● TERVERIFIKASI</span>
                {project.year && <span className="year-badge">TAHUN {project.year}</span>}
              </div>

              <h2 id="case-study-title" className="hero-project-title">
                {project.title}
              </h2>

              <div className="hero-role-line">
                <span className="role-label">// PERAN:</span>
                <span className="role-value">{project.role}</span>
              </div>

              <p className="hero-summary">{project.summary}</p>
            </div>

            {/* Quick Action Dock */}
            <div className="drawer-command-dock">
              {liveLink && (
                <a
                  href={liveLink.url}
                  target={liveLink.url.startsWith('#') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="btn btn-primary dock-btn"
                  style={{ background: accentColor, borderColor: accentColor }}
                >
                  <span>KUNJUNGI KARYA</span>
                  <span aria-hidden="true">↗</span>
                </a>
              )}

              {repoLink && (
                <a
                  href={repoLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary dock-btn"
                >
                  <span>REPOSITORI KODE</span>
                  <span aria-hidden="true">↗</span>
                </a>
              )}

              <button
                type="button"
                onClick={handleFocusInUniverse}
                className="btn btn-secondary dock-btn"
              >
                <span>FOKUS DI TATA SURYA</span>
                <span aria-hidden="true">◎</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs Bar */}
          <div className="drawer-nav-tabs" role="tablist" aria-label="Seksi Case Study">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
              className={`nav-tab-btn ${activeTab === 'overview' ? 'is-active' : ''}`}
            >
              <span>01. IKHTISAR</span>
            </button>

            {worldConfig?.architecture && (
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'architecture'}
                onClick={() => setActiveTab('architecture')}
                className={`nav-tab-btn ${activeTab === 'architecture' ? 'is-active' : ''}`}
              >
                <span>02. ARSITEKTUR</span>
              </button>
            )}

            {project.features && project.features.length > 0 && (
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'features'}
                onClick={() => setActiveTab('features')}
                className={`nav-tab-btn ${activeTab === 'features' ? 'is-active' : ''}`}
              >
                <span>03. FITUR UTAMA</span>
              </button>
            )}

            {(project.challenge || project.outcome) && (
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'challenges'}
                onClick={() => setActiveTab('challenges')}
                className={`nav-tab-btn ${activeTab === 'challenges' ? 'is-active' : ''}`}
              >
                <span>04. TANTANGAN &amp; HASIL</span>
              </button>
            )}

            {project.galleryImages && project.galleryImages.length > 0 && (
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'gallery'}
                onClick={() => setActiveTab('gallery')}
                className={`nav-tab-btn ${activeTab === 'gallery' ? 'is-active' : ''}`}
              >
                <span>05. GALERI ARSIP</span>
              </button>
            )}
          </div>

          {/* Main Case Study Scrollable Content Body */}
          <div className="drawer-content-body">
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="tab-pane">
                {/* Problem & Solution Grid */}
                <div className="problem-solution-grid">
                  {project.problem ? (
                    <div className="case-study-card problem-card">
                      <div className="card-head">
                        <span className="card-indicator" style={{ background: '#f87171' }} />
                        <h3 className="card-title">// LATAR BELAKANG &amp; TANTANGAN</h3>
                      </div>
                      <p className="card-text">{project.problem}</p>
                    </div>
                  ) : (
                    <div className="case-study-card unarchived-card">
                      <h3 className="card-title">// LATAR BELAKANG</h3>
                      <p className="card-text text-muted">CATATAN LATAR BELAKANG BELUM DIARSIPKAN</p>
                    </div>
                  )}

                  {project.solution ? (
                    <div className="case-study-card solution-card">
                      <div className="card-head">
                        <span className="card-indicator" style={{ background: '#38bdf8' }} />
                        <h3 className="card-title">// PENDEKATAN SOLUSI</h3>
                      </div>
                      <p className="card-text">{project.solution}</p>
                    </div>
                  ) : (
                    <div className="case-study-card unarchived-card">
                      <h3 className="card-title">// PENDEKATAN SOLUSI</h3>
                      <p className="card-text text-muted">DETAIL PENDEKATAN BELUM DIARSIPKAN</p>
                    </div>
                  )}
                </div>

                {/* Tech Stack Constellation with Skill Network Links */}
                <div className="stack-constellation-section">
                  <div className="section-subtitle">
                    // TEKNOLOGI TERVERIFIKASI &amp; RELASI SKILL NETWORK
                  </div>
                  <div className="stack-pills-wrap">
                    {project.tags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleJumpToSkills(tag)}
                        className="stack-skill-pill"
                        title={`Lihat keahlian ${tag} di Skill Network`}
                      >
                        <span className="pill-dot" style={{ background: accentColor }} />
                        <span className="pill-text">{tag}</span>
                        <span className="pill-arrow" aria-hidden="true">↗</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ARCHITECTURE */}
            {activeTab === 'architecture' && worldConfig?.architecture && (
              <div className="tab-pane">
                <ProjectArchitecture
                  architecture={worldConfig.architecture}
                  accentColor={accentColor}
                />
              </div>
            )}

            {/* TAB 3: FEATURES */}
            {activeTab === 'features' && project.features && (
              <div className="tab-pane">
                <div className="features-list-card">
                  <h3 className="features-card-title">// SPESIFIKASI FITUR SISTEM</h3>
                  <div className="features-grid">
                    {project.features.map((feat, idx) => (
                      <div key={idx} className="feature-item-box">
                        <span className="feature-number">{idx < 9 ? `0${idx + 1}` : idx + 1}</span>
                        <p className="feature-text">{feat}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: CHALLENGES & OUTCOME */}
            {activeTab === 'challenges' && (
              <div className="tab-pane">
                <div className="challenges-stack">
                  {project.challenge && (
                    <div className="case-study-card challenge-item-card">
                      <h3 className="card-title" style={{ color: '#f59e0b' }}>
                        // TANTANGAN TEKNIS &amp; BOUNDARY
                      </h3>
                      <p className="card-text">{project.challenge}</p>
                    </div>
                  )}

                  {project.approach && (
                    <div className="case-study-card approach-item-card">
                      <h3 className="card-title" style={{ color: 'var(--color-cyan-glow)' }}>
                        // REKAYASA &amp; KEPUTUSAN ARSITEKTUR
                      </h3>
                      <p className="card-text">{project.approach}</p>
                    </div>
                  )}

                  {project.outcome && (
                    <div className="case-study-card outcome-item-card">
                      <h3 className="card-title" style={{ color: '#10b981' }}>
                        // HASIL TERUKUR &amp; VERIFIKASI FAKTUAL
                      </h3>
                      <p className="card-text">{project.outcome}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 5: GALLERY */}
            {activeTab === 'gallery' && (
              <div className="tab-pane">
                <ProjectGallery
                  images={project.galleryImages}
                  projectTitle={project.title}
                />
              </div>
            )}
          </div>

          {/* Footer Bar: Inter-World Navigation */}
          <div className="drawer-footer-nav">
            <button
              type="button"
              onClick={() => onSelectProject(prevProject.slug)}
              className="world-nav-btn prev"
              aria-label={`Pindah ke karya sebelumnya: ${prevProject.title}`}
            >
              <span className="arrow">←</span>
              <div className="btn-text">
                <span className="nav-sub">SEBELUMNYA</span>
                <span className="nav-title">{prevProject.title}</span>
              </div>
            </button>

            <div className="world-index-indicator">
              <span>{currentIndex + 1} / {projectsContent.length} KARYA DIGITAL</span>
            </div>

            <button
              type="button"
              onClick={() => onSelectProject(nextProject.slug)}
              className="world-nav-btn next"
              aria-label={`Pindah ke karya selanjutnya: ${nextProject.title}`}
            >
              <div className="btn-text">
                <span className="nav-sub">SELANJUTNYA</span>
                <span className="nav-title">{nextProject.title}</span>
              </div>
              <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
