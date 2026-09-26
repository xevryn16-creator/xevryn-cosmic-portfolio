// src/components/motion/AnimatedLines.tsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useMotion } from '@/app/providers/MotionProvider';

interface AnimatedLinesProps {
  lines: string[];
  className?: string;
  delay?: number;
}

export const AnimatedLines: React.FC<AnimatedLinesProps> = ({
  lines,
  className = '',
  delay = 0.4,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isReduced } = useMotion();

  useEffect(() => {
    if (isReduced || !containerRef.current) return;

    const lineElements = containerRef.current.querySelectorAll('.anim-line');
    if (lineElements.length === 0) return;

    gsap.set(lineElements, { opacity: 0, y: 24 });

    const ctx = gsap.context(() => {
      gsap.to(lineElements, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        delay,
        ease: 'power2.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, [lines, isReduced, delay]);

  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, index) => (
        <p key={index} className="anim-line" style={{ margin: '0 0 16px 0' }}>
          {line}
        </p>
      ))}
    </div>
  );
};
