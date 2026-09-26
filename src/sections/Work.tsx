// src/sections/Work.tsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsContent } from '@/content/projects';
import { ProjectTrack } from '@/components/projects/ProjectTrack';
import { useMotion } from '@/app/providers/MotionProvider';
import { useScene } from '@/app/providers/SceneProvider';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface WorkProps {
  onInspectProject?: (slug: string) => void;
}

export const Work: React.FC<WorkProps> = ({ onInspectProject }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { isReduced } = useMotion();
  const { updateCameraTarget } = useScene();

  const featuredProjects = projectsContent.slice(0, 3);

  useEffect(() => {
    if (isReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading Masked Reveal
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

      // Camera position adjustment for Work: traversing through asteroid belt toward gas giant
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          updateCameraTarget({
            z: 4.8,
            x: 0,
            y: -10.5,
            lookAtX: 0,
            lookAtY: -10.5,
            lookAtZ: 0,
            starSpeed: 0.12,
            warpFactor: 0.0,
            fov: 45,
          });
        },
        onEnterBack: () => {
          updateCameraTarget({
            z: 4.8,
            x: 0,
            y: -10.5,
            lookAtX: 0,
            lookAtY: -10.5,
            lookAtZ: 0,
            starSpeed: 0.12,
            warpFactor: 0.0,
            fov: 45,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReduced, updateCameraTarget]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="section"
      aria-label="Work Section: Featured Projects and Systems"
    >
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <div className="section-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
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
              04 / SELECTED WEB PROJECTS
            </span>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <h2 id="work-heading" ref={headingRef} className="section-title">
              Proyek Web Pilihan
            </h2>
          </div>
          <p className="section-desc">
            Koleksi aplikasi web terstruktur, platform simulasi praktikum, dan perpustakaan aset desain dengan perhatian pada arsitektur antarmuka dan pengalaman pengguna.
          </p>
        </div>

        {/* Main Showcase (Horizontal Pin Track di Desktop / Grid di Mobile) */}
        <ProjectTrack
          projects={featuredProjects}
          onInspectProject={onInspectProject}
        />
      </div>
    </section>
  );
};
