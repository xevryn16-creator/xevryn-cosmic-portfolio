// src/animation/tokens.ts
/**
 * XEVRYN Cosmic Portfolio - Motion Tokens & Constants
 * Reference: docs/09-motion-system.md, docs/10-animation-register.md
 */

export const MOTION_DIALS = {
  DESIGN_VARIANCE: 8,
  MOTION_INTENSITY: 9,
  VISUAL_DENSITY: 3,
} as const;

export const DURATION = {
  instant: 0,
  fast: 0.18,
  base: 0.35,
  medium: 0.65,
  slow: 0.9,
  celestial: 1.4,
  ambientLoop: 60.0,
} as const;

export const EASING = {
  default: 'power2.out',
  cinematic: 'power3.out',
  inOut: 'power2.inOut',
  linear: 'none',
  springTension: 'elastic.out(1, 0.75)',
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
} as const;

/**
 * Debounce helper for resizing and ScrollTrigger refresh
 */
export function debounce<T extends (...args: unknown[]) => void>(fn: T, wait = 150): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
}
