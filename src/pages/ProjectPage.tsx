// src/pages/ProjectPage.tsx
/**
 * XEVRYN Cosmic Portfolio - Case Study Detail Page
 * Cinematic celestial approach, structured problem/solution/features breakdown,
 * and clear orbit return actions.
 */

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { projectsContent } from '@/content/projects';
import { ProjectGallery } from '@/components/projects/ProjectGallery';
import { useMotion } from '@/app/providers/MotionProvider';

interface ProjectPageProps {
  slug?: string;
  onBack?: () => void;
}

export const ProjectPage: React.FC<ProjectPageProps> = ({
  slug = 'xevryn-cosmic-portfolio',
  onBack,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const { isReduced } = useMotion();
  const project = projectsContent.find((p) => p.slug === slug) || projectsContent[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });

    if (isReduced || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [slug, isReduced]);

  const handleReturn = () => {
    if (onBack) {
      onBack();
    } else {
      window.location.hash = '#work';
    }
  };

  const liveLink = project.links.find((l) => l.kind === 'live' || l.kind === 'demo');
  const repoLink = project.links.find((l) => l.kind === 'repo');

  return (
    <main
      id="project-detail-page"
      ref={containerRef}
      className="content-stack section"
      style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}
    >
      <div className="container" style={{ maxWidth: '920px' }}>
        {/* Navigation Action */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <button
            type="button"
            onClick={handleReturn}
            className="btn btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
            aria-label="Back to Solar System Orbit"
          >
            <span>←</span>
            <span>BACK TO ORBIT</span>
          </button>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {liveLink && (
              <a
                href={liveLink.url}
                target={liveLink.url.startsWith('#') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <span>VIEW LIVE</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}
            {repoLink && (
              <a
                href={repoLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <span>VIEW SOURCE</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>

        {/* Header Metadata */}
        <div className="section-eyebrow" style={{ color: 'var(--color-cyan-glow)' }}>
          // CELESTIAL PROJECT ARCHIVE · {project.id}
        </div>
        <h1 className="section-title" style={{ fontSize: 'clamp(32px, 6vw, 54px)', marginBottom: '16px' }}>
          {project.title}
        </h1>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '24px' }}>
          <span style={{ fontSize: '14px', color: 'var(--color-cyan-glow)', fontFamily: 'var(--font-mono)' }}>
            PERAN: {project.role}
          </span>
          {project.year && (
            <span style={{ fontSize: '14px', color: 'var(--color-text-dim)', fontFamily: 'var(--font-mono)' }}>
              TAHUN: {project.year}
            </span>
          )}
        </div>

        {/* Tech Stack Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
          {project.tags.map((t) => (
            <span
              key={t}
              style={{
                background: 'rgba(56, 189, 248, 0.08)',
                border: '1px solid rgba(56, 189, 248, 0.22)',
                color: '#e2e8f0',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <p className="text-muted" style={{ fontSize: '18px', lineHeight: '1.75', margin: '0 0 36px 0' }}>
          {project.summary}
        </p>

        {/* Problem & Solution Breakdown */}
        {(project.problem || project.solution) && (
          <div className="grid-2" style={{ gap: '20px', marginBottom: '28px' }}>
            {project.problem && (
              <div className="cosmic-card" style={{ padding: '24px', background: 'rgba(15, 23, 42, 0.7)' }}>
                <h2 style={{ fontSize: '14px', color: '#f87171', fontFamily: 'var(--font-mono)', margin: '0 0 8px 0', letterSpacing: '0.08em' }}>
                  // TANTANGAN &amp; LATAR BELAKANG
                </h2>
                <p className="text-muted" style={{ fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
                  {project.problem}
                </p>
              </div>
            )}
            {project.solution && (
              <div className="cosmic-card" style={{ padding: '24px', background: 'rgba(15, 23, 42, 0.7)' }}>
                <h2 style={{ fontSize: '14px', color: '#38bdf8', fontFamily: 'var(--font-mono)', margin: '0 0 8px 0', letterSpacing: '0.08em' }}>
                  // PENDEKATAN SOLUSI
                </h2>
                <p className="text-muted" style={{ fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
                  {project.solution}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Key Features List */}
        {project.features && project.features.length > 0 && (
          <div className="cosmic-card" style={{ padding: '28px', marginBottom: '28px' }}>
            <h2 style={{ fontSize: '15px', color: 'var(--color-accent-blue)', fontFamily: 'var(--font-mono)', margin: '0 0 14px 0', letterSpacing: '0.08em' }}>
              // FITUR UTAMA &amp; ARSITEKTUR
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {project.features.map((feat, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--color-text-main)' }}>
                  <span style={{ color: 'var(--color-cyan-glow)', fontFamily: 'var(--font-mono)' }}>✦</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Challenge, Approach & Outcome */}
        <div className="calm-zone" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="cosmic-card" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '14px', color: 'var(--color-accent-blue)', fontFamily: 'var(--font-mono)', margin: '0 0 8px 0', letterSpacing: '0.08em' }}>
              // TANTANGAN TEKNIS
            </h2>
            <p className="text-muted" style={{ fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
              {project.challenge}
            </p>
          </div>

          <div className="cosmic-card" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '14px', color: 'var(--color-cyan-glow)', fontFamily: 'var(--font-mono)', margin: '0 0 8px 0', letterSpacing: '0.08em' }}>
              // KEPUTUSAN ARSITEKTUR
            </h2>
            <p className="text-muted" style={{ fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
              {project.approach}
            </p>
          </div>

          <div className="cosmic-card" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '14px', color: 'var(--color-success)', fontFamily: 'var(--font-mono)', margin: '0 0 8px 0', letterSpacing: '0.08em' }}>
              // HASIL TERUKUR
            </h2>
            <p className="text-muted" style={{ fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
              {project.outcome}
            </p>
          </div>
        </div>

        {/* Gallery Artifacts */}
        <ProjectGallery
          images={project.galleryImages}
          projectTitle={project.title}
        />

        {/* Bottom Orbit Return CTA */}
        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <button
            type="button"
            onClick={handleReturn}
            className="btn btn-secondary"
            style={{ padding: '12px 28px', fontSize: '14px' }}
          >
            ← KEMBALI KE ORBIT UTAMA
          </button>
        </div>
      </div>
    </main>
  );
};
