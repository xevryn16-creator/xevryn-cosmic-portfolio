// src/components/ui/Button.tsx
/**
 * XEVRYN Cosmic Portfolio - Button Component (ANM-056 Magnetic Interaction)
 */

import React, { useRef, useState } from 'react';
import { useMotion } from '@/app/providers/MotionProvider';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
  asLink?: boolean;
  href?: string;
  magnetic?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  asLink = false,
  href,
  magnetic = false,
  className = '',
  ...props
}) => {
  const { isReduced } = useMotion();
  const elementRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!magnetic || isReduced || !elementRef.current) return;
    const rect = elementRef.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);

    // Limit translation to ±6px maximum (ANM-056)
    const maxOffset = 6.0;
    const x = Math.max(-maxOffset, Math.min(maxOffset, relX * 0.25));
    const y = Math.max(-maxOffset, Math.min(maxOffset, relY * 0.25));

    setOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const variantClass = `btn-${variant}`;
  const combinedClass = `btn ${variantClass} ${magnetic ? 'btn-magnetic' : ''} ${className}`.trim();
  const transformStyle = offset.x !== 0 || offset.y !== 0
    ? { transform: `translate(${offset.x}px, ${offset.y}px)`, transition: 'transform 0.1s ease-out' }
    : { transition: 'transform 0.2s ease-out' };

  if (asLink && href) {
    return (
      <a
        ref={elementRef}
        href={href}
        className={combinedClass}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={transformStyle}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={elementRef}
      className={combinedClass}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={transformStyle}
      {...props}
    >
      {children}
    </button>
  );
};
