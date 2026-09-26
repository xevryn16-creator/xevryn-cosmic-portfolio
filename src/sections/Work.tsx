// src/sections/Work.tsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsContent } from '@/content/projects';
import { ProjectTrack } from '@/components/projects/ProjectTrack';
import { useMotion } from '@/app/providers/MotionProvider';
import { useScene } from '@/app/providers/SceneProvider';
import { useUniverse } from '@/app/providers/UniverseProvider';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface WorkProps {
  onInspectProject?: (slug: string) => void;
}

type CategoryFilter = 'ALL' | 'WEB' | 'AI/AUTO' | 'ROBLOX' | 'CREATIVE';

const CATEGORY_MAP: Record<string, CategoryFilter> = {
  'xevryn-cosmic-portfolio': 'WEB',
  'xevryn-campus': 'WEB',
  'campus-whatsapp-bot': 'AI/AUTO',
  'retaillab': 'WEB',
  'ucapan-buat-kamu': 'CREATIVE',
  'roblox-projects': 'ROBLOX',
  'marketra': 'WEB',
  'xevryn-assets': 'CREATIVE',
};

const CATEGORY_FILTERS: CategoryFilter[] = ['ALL', 'WEB', 'AI/AUTO', 'ROBLOX', 'CREATIVE'];

export const Work: React.FC<WorkProps> = ({ onInspectProject }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [selectedPlanetIndex, setSelectedPlanetIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const { isReduced } = useMotion();
  const { updateCameraTarget } = useScene();
  const { openProjectWorld } = useUniverse();

  const celestialPlanets = [
    { name: 'Cosmic Core', type: 'Matahari', color: '#f59e0b', slug: 'xevryn-cosmic-portfolio', icon: '☀️' },
    { name: 'Campus Prime', type: 'Dunia Samudra', color: '#38bdf8', slug: 'xevryn-campus', icon: '🌊' },
    { name: 'Comm Satellite', type: 'Relai Otomasi', color: '#34d399', slug: 'campus-whatsapp-bot', icon: '🛰️' },
    { name: 'Retail Rock', type: 'Planet Batuan', color: '#f97316', slug: 'retaillab', icon: '🪨' },
    { name: 'Gift Nebula', type: 'Nebula Hangat', color: '#f43f5e', slug: 'ucapan-buat-kamu', icon: '✨' },
    { name: 'Roblox Colossus', type: 'Raksasa Gas', color: '#c084fc', slug: 'roblox-projects', icon: '🪐' },
  ];

  // Filter projects based on active category and search query
  const filteredProjects = projectsContent.filter((proj) => {
    const matchesCategory = activeFilter === 'ALL' || CATEGORY_MAP[proj.slug] === activeFilter;
    const matchesSearch =
      !searchQuery ||
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      // Camera position adjustment for Work: traversing through solar system
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 0.3,
        onUpdate: (self) => {
          const p = self.progress;
          updateCameraTarget({
            z: 4.8 - p * 0.4,
            x: -0.3 + p * 0.6,
            y: -11.0 - p * 1.5,
            rotY: 0.1 - p * 0.2,
            starSpeed: 0.08,
            warpFactor: 0.0,
            fov: 45,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReduced, updateCameraTarget]);

  const handlePlanetSelect = (idx: number, slug: string) => {
    setSelectedPlanetIndex(idx);
    openProjectWorld(slug);
  };

  const handleInspectProject = (slug: string) => {
    openProjectWorld(slug);
    if (onInspectProject) {
      onInspectProject(slug);
    }
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="section"
      aria-label="Work Section: Project Constellation"
    >
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div className="section-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
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
              07 / PROJECT CONSTELLATION 2.0
            </span>
          </div>

          <div style={{ overflow: 'hidden' }}>
            <h2 id="work-heading" ref={headingRef} className="section-title">
              Tata Surya Proyek &amp; Karya Digital
            </h2>
          </div>

          <p className="section-desc" style={{ maxWidth: '64ch' }}>
            Setiap proyek direpresentasikan sebagai dunia tersendiri dalam semesta XEVRYN. Pilih planet untuk memasuki studi kasus teknis interaktif.
          </p>

          {/* Project Constellation 2.0 Controls: Filters + Search */}
          <div className="project-constellation-controls">
            <div className="constellation-toolbar">
              {/* Category Filters */}
              <div className="constellation-filters" role="group" aria-label="Filter kategori proyek">
                {CATEGORY_FILTERS.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`constellation-filter-btn ${activeFilter === cat ? 'is-active' : ''}`}
                    onClick={() => setActiveFilter(cat)}
                    aria-pressed={activeFilter === cat}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Input */}
              <div className="constellation-search-wrap">
                <span className="constellation-search-icon" aria-hidden="true">⌕</span>
                <input
                  type="search"
                  className="constellation-search-input"
                  placeholder="Cari proyek atau teknologi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Cari proyek"
                />
              </div>
            </div>
          </div>

          {/* Celestial Orbit Mini Radar / Selector */}
          <div
            className="solar-system-radar"
            style={{
              marginTop: '16px',
              padding: '16px 20px',
              background: 'rgba(15, 23, 42, 0.75)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: '12px',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px' }}>🪐</span>
              <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-dim)', letterSpacing: '0.08em' }}>
                ORBIT RADAR // ENTER WORLD:
              </span>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {celestialPlanets.map((pl, i) => (
                <button
                  key={pl.slug}
                  type="button"
                  onClick={() => handlePlanetSelect(i, pl.slug)}
                  data-cursor="open"
                  style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: selectedPlanetIndex === i ? `${pl.color}25` : 'rgba(255, 255, 255, 0.04)',
                    border: selectedPlanetIndex === i ? `1px solid ${pl.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                    color: selectedPlanetIndex === i ? '#ffffff' : 'var(--color-text-dim)',
                    transition: 'all 0.2s ease',
                  }}
                  aria-label={`Enter world: ${pl.name} (${pl.type})`}
                >
                  <span style={{ color: pl.color }}>{pl.icon}</span>
                  <span>{pl.name}</span>
                  <span style={{ fontSize: '9px', opacity: 0.7 }}>[{pl.type}]</span>
                </button>
              ))}
            </div>
          </div>

          {/* Filter result count */}
          {(activeFilter !== 'ALL' || searchQuery) && (
            <div style={{ marginTop: '12px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-text-dim)' }}>
              MENAMPILKAN {filteredProjects.length} DARI {projectsContent.length} PROYEK
              {searchQuery && (
                <span style={{ color: 'var(--color-cyan-glow)', marginLeft: '8px' }}>
                  // QUERY: &quot;{searchQuery}&quot;
                </span>
              )}
            </div>
          )}
        </div>

        {/* Main Showcase Track - uses filtered projects */}
        <ProjectTrack
          projects={filteredProjects.length > 0 ? filteredProjects : projectsContent}
          onInspectProject={handleInspectProject}
        />
      </div>
    </section>
  );
};
