// src/components/projects/ProjectCard.tsx
/**
 * XEVRYN Cosmic Portfolio - Project Card Component (ANM-037 to ANM-042)
 * Micro 3D tilt, cover hover zoom, detail link arrow, and aspect ratio lock.
 */

import React, { useRef, useState } from 'react';
import { ProjectContent } from '@/types/content';
import { useMotion } from '@/app/providers/MotionProvider';

interface ProjectCardProps {
  project: ProjectContent;
  index: number;
  isActive?: boolean;
  onInspect?: (slug: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  isActive = true,
  onInspect,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { isReduced } = useMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imageError, setImageError] = useState(false);

  // ANM-040: Micro 3D Depth Tilt on desktop fine pointer
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -3.0;
    const rotateY = ((x - centerX) / centerX) * 3.0;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const formattedIndex = String(index + 1).padStart(2, '0');

  return (
    <article
      ref={cardRef}
      className={`project-card cosmic-card ${isActive ? 'is-active' : 'is-inactive'}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isReduced
          ? 'none'
          : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isActive ? 1.0 : 0.98})`,
        opacity: 1.0,
        background: 'linear-gradient(180deg, #111726 0%, #0A0E18 100%)',
        border: isActive ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: isActive ? '0 12px 36px rgba(0, 0, 0, 0.6), 0 0 20px rgba(56, 189, 248, 0.15)' : '0 8px 24px rgba(0, 0, 0, 0.5)',
        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease-out, box-shadow 0.25s ease-out',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxWidth: '460px',
        width: '100%',
        minWidth: '320px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 2,
      }}
      aria-label={`Project: ${project.title}`}
    >
      {/* Laptop / Monitor Device Frame Mockup Header */}
      <div
        className="monitor-frame-header"
        style={{
          background: 'rgba(15, 23, 42, 0.95)',
          padding: '8px 14px',
          borderBottom: '1px solid rgba(148, 163, 184, 0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
        aria-hidden="true"
      >
        {/* 3 Window Control Dots */}
        <div style={{ display: 'flex', gap: '5px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} />
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
        </div>
        {/* Mockup Address Bar */}
        <div
          style={{
            flex: 1,
            background: 'rgba(5, 5, 10, 0.5)',
            borderRadius: '4px',
            padding: '2px 8px',
            fontSize: '10px',
            fontFamily: 'var(--font-mono)',
            color: 'rgba(148, 163, 184, 0.7)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          xevryn.local/projects/{project.slug}
        </div>
      </div>

      {/* ANM-038: Aspect-ratio locked 16:10 cover in monitor screen */}
      <div
        className="project-card-cover"
        style={{
          aspectRatio: '16 / 10',
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #082f49 100%)',
        }}
      >
        {!imageError && project.coverImage ? (
          <img
            src={project.coverImage}
            alt={`${project.title} Preview`}
            className="project-card-image"
            onError={() => setImageError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        ) : (
          /* High-aesthetic typographical editorial banner */
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              textAlign: 'center',
              position: 'relative',
              background: 'radial-gradient(ellipse at center, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.95) 100%)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            {/* Architectural Grid Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                pointerEvents: 'none',
              }}
              aria-hidden="true"
            />
            <div
              style={{
                fontSize: '10px',
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-cyan-glow)',
                letterSpacing: '0.18em',
                marginBottom: '10px',
                position: 'relative',
              }}
            >
              PROJECT INVENTORY // {project.id} · {formattedIndex}
            </div>
            <div
              style={{
                fontSize: '22px',
                fontWeight: 700,
                color: 'var(--color-text-main)',
                letterSpacing: '-0.02em',
                lineHeight: '1.25',
                position: 'relative',
              }}
            >
              {project.title}
            </div>
            <div
              style={{
                fontSize: '12px',
                color: 'var(--color-accent-blue)',
                fontFamily: 'var(--font-mono)',
                marginTop: '10px',
                position: 'relative',
              }}
            >
              {project.role}
            </div>
          </div>
        )}

        {/* Index badge */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            padding: '4px 10px',
            background: 'rgba(5, 5, 10, 0.75)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 'var(--radius-full)',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--color-accent-blue)',
            letterSpacing: '0.05em',
          }}
        >
          {project.id}
        </div>
      </div>

      {/* ANM-039: Card Metadata */}
      <div
        className="project-card-meta"
        style={{
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '20px', color: 'var(--color-text-main)', margin: 0 }}>
              {project.title}
            </h3>
            {project.year && (
              <span style={{ fontSize: '12px', color: 'var(--color-text-dim)', fontFamily: 'var(--font-mono)' }}>
                {project.year}
              </span>
            )}
          </div>

          <p className="text-muted" style={{ fontSize: '14px', lineHeight: '1.6', margin: '0 0 18px 0' }}>
            {project.summary}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: 'var(--color-text-muted)',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer with role and ANM-042 detail arrow */}
        <div
          style={{
            borderTop: '1px solid var(--color-border)',
            paddingTop: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '12px', color: 'var(--color-text-dim)' }}>
            {project.role}
          </span>

          <button
            type="button"
            onClick={() => onInspect ? onInspect(project.slug) : window.location.assign(`#work`)}
            className="btn btn-ghost project-link-btn"
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              minHeight: '32px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
            aria-label={`Inspect case study for ${project.title}`}
          >
            <span>Inspect Case</span>
            <svg
              className="project-link-arrow"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              aria-hidden="true"
              style={{ transition: 'transform 0.16s ease-out' }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
};
