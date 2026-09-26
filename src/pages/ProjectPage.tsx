// src/pages/ProjectPage.tsx
/**
 * XEVRYN Cosmic Portfolio - Case Study Detail Page (ANM-061 to ANM-062)
 * Smooth page entrance, structured architectural case breakdown,
 * and aspect-ratio locked telemetry gallery.
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
  slug = 'marketra',
  onBack,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const { isReduced } = useMotion();
  const project = projectsContent.find((p) => p.slug === slug) || projectsContent[0];

  useEffect(() => {
    // Always scroll to top on enter
    window.scrollTo({ top: 0, behavior: 'auto' });

    if (isReduced || !containerRef.current) return;

    // ANM-061: Case Study Page Enter Animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
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

  return (
    <main
      id="project-detail-page"
      ref={containerRef}
      className="content-stack section"
      style={{ minHeight: '100vh', paddingTop: '100px' }}
    >
      <div className="container" style={{ maxWidth: '900px' }}>
        <button
          type="button"
          onClick={handleReturn}
          className="btn btn-ghost"
          style={{ marginBottom: '32px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          aria-label="Return to Constellations Work Showcase"
        >
          <span>←</span>
          <span>Return to Constellations</span>
        </button>

        <div className="section-eyebrow">// CASE STUDY · {project.id}</div>
        <h1 className="section-title" style={{ fontSize: 'clamp(32px, 6vw, 56px)', marginBottom: '16px' }}>
          {project.title}
        </h1>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '24px' }}>
          <span style={{ fontSize: '14px', color: 'var(--color-cyan-glow)', fontFamily: 'var(--font-mono)' }}>
            ROLE: {project.role}
          </span>
          {project.year && (
            <span style={{ fontSize: '14px', color: 'var(--color-text-dim)', fontFamily: 'var(--font-mono)' }}>
              YEAR: {project.year}
            </span>
          )}
        </div>

        <p className="text-muted" style={{ fontSize: '18px', lineHeight: '1.7', margin: '0 0 36px 0' }}>
          {project.summary}
        </p>

        {/* Challenge, Approach & Outcome */}
        <div className="calm-zone" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div className="cosmic-card" style={{ padding: '28px' }}>
            <h2 style={{ fontSize: '18px', color: 'var(--color-accent-blue)', margin: '0 0 10px 0' }}>
              // THE ENGINEERING CHALLENGE
            </h2>
            <p className="text-muted" style={{ fontSize: '15px', lineHeight: '1.7', margin: 0 }}>
              {project.challenge}
            </p>
          </div>

          <div className="cosmic-card" style={{ padding: '28px' }}>
            <h2 style={{ fontSize: '18px', color: 'var(--color-cyan-glow)', margin: '0 0 10px 0' }}>
              // ARCHITECTURAL APPROACH
            </h2>
            <p className="text-muted" style={{ fontSize: '15px', lineHeight: '1.7', margin: 0 }}>
              {project.approach}
            </p>
          </div>

          <div className="cosmic-card" style={{ padding: '28px' }}>
            <h2 style={{ fontSize: '18px', color: 'var(--color-success)', margin: '0 0 10px 0' }}>
              // MEASURED OUTCOME
            </h2>
            <p className="text-muted" style={{ fontSize: '15px', lineHeight: '1.7', margin: 0 }}>
              {project.outcome}
            </p>
          </div>
        </div>

        {/* ANM-062: System Artifacts & Telemetry Gallery */}
        <ProjectGallery
          images={project.galleryImages}
          projectTitle={project.title}
        />
      </div>
    </main>
  );
};
