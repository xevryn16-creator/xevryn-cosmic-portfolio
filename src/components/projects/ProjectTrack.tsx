// src/components/projects/ProjectTrack.tsx
/**
 * XEVRYN Cosmic Portfolio - Horizontal Project Track (ANM-036, ANM-043, ANM-044)
 * Desktop horizontal pinning with ScrollTrigger, responsive vertical fallback,
 * and dynamic project index display.
 */

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectContent } from '@/types/content';
import { ProjectCard } from './ProjectCard';
import { useMotion } from '@/app/providers/MotionProvider';

gsap.registerPlugin(ScrollTrigger);

interface ProjectTrackProps {
  projects: ProjectContent[];
  onInspectProject?: (slug: string) => void;
}

export const ProjectTrack: React.FC<ProjectTrackProps> = ({
  projects,
  onInspectProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { isReduced } = useMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
  );

  useEffect(() => {
    const checkWidth = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  useEffect(() => {
    // Only pin on desktop when not in reduced motion and multiple projects exist
    if (isReduced || !isDesktop || !containerRef.current || !trackRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;

      const scrollDistance = track.scrollWidth - container.clientWidth;

      // If no overflow distance (e.g., only 1 card on large monitor), do not pin
      if (scrollDistance <= 20) return;

      const pinTrigger = ScrollTrigger.create({
        trigger: container,
        start: 'top 12%',
        end: () => `+=${scrollDistance + 200}`,
        pin: true,
        scrub: 1.0,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          // Pan the track to the left
          gsap.set(track, { x: -p * scrollDistance });

          // ANM-043: Calculate active project index based on scroll progress
          const index = Math.min(
            projects.length - 1,
            Math.floor(p * projects.length + 0.3)
          );
          setActiveIndex(index);
        },
      });

      return () => {
        pinTrigger.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, [isReduced, isDesktop, projects.length]);

  return (
    <div ref={containerRef} className="project-track-wrapper" style={{ position: 'relative' }}>
      {/* ANM-043: Project Index Counter (Desktop) */}
      {isDesktop && !isReduced && (
        <div
          id="work-index-display"
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '8px',
            marginBottom: '24px',
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            color: 'var(--color-text-dim)',
          }}
          aria-live="polite"
        >
          <span style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-cyan-glow)' }}>
            {String(activeIndex + 1).padStart(2, '0')}
          </span>
          <span>/</span>
          <span>{String(projects.length).padStart(2, '0')}</span>
          <span style={{ marginLeft: '12px', fontSize: '12px', letterSpacing: '0.1em' }}>
            ORBITAL CONSTELLATION TRACK
          </span>
        </div>
      )}

      {/* ANM-036: Horizontal Track or Responsive Grid */}
      <div
        ref={trackRef}
        id="work-track"
        className={isDesktop && !isReduced ? 'work-track-horizontal' : 'work-track-grid'}
        style={
          isDesktop && !isReduced
            ? {
                display: 'flex',
                gap: '32px',
                width: 'max-content',
                willChange: 'transform',
                paddingBottom: '24px',
              }
            : {
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px',
              }
        }
      >
        {projects.map((project, idx) => (
          <div key={project.id} style={{ display: 'flex' }}>
            <ProjectCard
              project={project}
              index={idx}
              isActive={isDesktop && !isReduced ? idx === activeIndex : true}
              onInspect={onInspectProject}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
