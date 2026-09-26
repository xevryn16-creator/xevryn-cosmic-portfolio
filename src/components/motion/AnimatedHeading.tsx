// src/components/motion/AnimatedHeading.tsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useMotion } from '@/app/providers/MotionProvider';

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
  delay?: number;
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  text,
  className = '',
  as: Component = 'h1',
  delay = 0.2,
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const { isReduced } = useMotion();

  useEffect(() => {
    if (isReduced || !containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.anim-char');
    if (chars.length === 0) return;

    // Reset initial state
    gsap.set(chars, {
      opacity: 0,
      y: 40,
      scale: 0.9,
      filter: 'blur(8px)',
    });

    const ctx = gsap.context(() => {
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.85,
        stagger: 0.045,
        delay,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, [text, isReduced, delay]);

  const letters = text.split('');

  return (
    <Component ref={containerRef} className={className} style={{ position: 'relative' }}>
      {/* Semantic Text for Screen Readers (Unbroken) */}
      <span className="sr-only">{text}</span>

      {/* Visual Char-by-Char Rendering (Hidden from Screen Reader) */}
      <span aria-hidden="true" style={{ display: 'inline-block' }}>
        {letters.map((char, index) => (
          <span
            key={index}
            className="anim-char"
            style={{
              display: 'inline-block',
              whiteSpace: char === ' ' ? 'pre' : 'normal',
            }}
          >
            {char}
          </span>
        ))}
      </span>
    </Component>
  );
};
