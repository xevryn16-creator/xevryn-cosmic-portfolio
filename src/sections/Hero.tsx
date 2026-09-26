// src/sections/Hero.tsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profileContent } from '@/content/profile';
import { AnimatedHeading } from '@/components/motion/AnimatedHeading';
import { Button } from '@/components/ui/Button';
import { useMotion } from '@/app/providers/MotionProvider';
import { useScene } from '@/app/providers/SceneProvider';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { isReduced } = useMotion();
  const { updateCameraTarget, sceneStateRef } = useScene();

  useEffect(() => {
    if (isReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Intro animation for eyebrow, subtext, and CTAs
      const tlIntro = gsap.timeline({ delay: 0.3 });

      tlIntro.fromTo(
        '.hero-eyebrow',
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
      );

      tlIntro.fromTo(
        '.hero-subtext',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      );

      tlIntro.fromTo(
        '.hero-actions',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      );

      // ScrollTrigger to smoothly move the camera toward About section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        onUpdate: (self) => {
          const progress = self.progress;
          sceneStateRef.current.progress = progress;

          // Camera push-in and slight orbit tilt towards About
          updateCameraTarget({
            z: 5.5 - progress * 2.2,
            y: progress * 0.8,
            x: -progress * 0.5,
            lookAtY: progress * 0.3,
          });

          // Parallax fade on DOM hero content
          if (contentRef.current) {
            contentRef.current.style.opacity = `${Math.max(0, 1 - progress * 1.5)}`;
            contentRef.current.style.transform = `translateY(${progress * 60}px)`;
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReduced, updateCameraTarget, sceneStateRef]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero-section"
      aria-label="Hero Section: Orbit & Celestial Brand"
    >
      <div className="container" ref={contentRef}>
        {/* Eyebrow Label */}
        <div className="hero-eyebrow" id="hero-role-label">
          <span className="brand-dot" aria-hidden="true" />
          <span>PORTOFOLIO &amp; RUANG KARYA KOSMIK</span>
        </div>

        {/* Brand Heading with accessible split letter animation */}
        <AnimatedHeading
          text={profileContent.brand}
          className="hero-title"
          as="h1"
          delay={0.2}
        />

        {/* Subtitle */}
        <div
          style={{
            fontSize: 'clamp(18px, 2.5vw, 24px)',
            color: 'var(--color-cyan-glow)',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.04em',
            margin: '16px 0 12px',
            fontWeight: 600,
          }}
        >
          Full Stack Web Developer · Creative Technologist
        </div>

        {/* Value Proposition Subtext */}
        <p className="hero-subtext" style={{ margin: '0 0 32px', maxWidth: '56ch', fontSize: '18px', lineHeight: '1.7' }}>
          Building digital experiences across web development, creative media, automation, and emerging technology.
        </p>

        {/* Primary and Secondary CTAs: EXPLORE WORK, VIEW EXPERIENCE, SEND TRANSMISSION */}
        <div id="hero-cta-group" className="hero-actions" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <Button variant="primary" asLink href="#work">
            <span>EXPLORE WORK</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </Button>

          <Button variant="secondary" asLink href="#experience">
            <span>VIEW EXPERIENCE</span>
          </Button>

          <Button variant="secondary" asLink href="#contact" style={{ borderColor: 'rgba(56, 189, 248, 0.4)' }}>
            <span>SEND TRANSMISSION</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </Button>
        </div>

        {/* ANM-018: Decorative Celestial Orbit Line */}
        <svg
          id="hero-orbit-svg"
          className="hero-orbit-line"
          viewBox="0 0 600 300"
          fill="none"
          aria-hidden="true"
        >
          <ellipse
            cx="300"
            cy="150"
            rx="280"
            ry="90"
            stroke="url(#orbitGradient)"
            strokeWidth="1.2"
            strokeDasharray="6 4"
            opacity="0.35"
          />
          <defs>
            <linearGradient id="orbitGradient" x1="0" y1="0" x2="600" y2="300" gradientUnits="userSpaceOnUse">
              <stop stopColor="#60A5FA" stopOpacity="0.8" />
              <stop offset="0.5" stopColor="#C084FC" stopOpacity="0.4" />
              <stop offset="1" stopColor="#38BDF8" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>

        {/* ANM-019: Floating Scroll Cue Indicator */}
        <div id="hero-scroll-cue" className="hero-scroll-cue" aria-hidden="true">
          <span className="scroll-cue-text">GULIR UNTUK MENJELAJAHI</span>
          <div className="scroll-cue-indicator">
            <div className="scroll-cue-dot" />
          </div>
        </div>
      </div>
    </section>
  );
};
