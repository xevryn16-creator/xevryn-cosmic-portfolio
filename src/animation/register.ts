// src/animation/register.ts
/**
 * XEVRYN Cosmic Portfolio - Animation Register & Helper Utilities
 * Reference: docs/10-animation-register.md (ANM-001 through ANM-064)
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { debounce } from './tokens';

gsap.registerPlugin(ScrollTrigger);

export type AnimationId =
  // Global & Environment (001 - 012)
  | 'ANM-001' | 'ANM-002' | 'ANM-003' | 'ANM-004' | 'ANM-005' | 'ANM-006'
  | 'ANM-007' | 'ANM-008' | 'ANM-009' | 'ANM-010' | 'ANM-011' | 'ANM-012'
  // Hero Orbit S01 (013 - 022)
  | 'ANM-013' | 'ANM-014' | 'ANM-015' | 'ANM-016' | 'ANM-017' | 'ANM-018'
  | 'ANM-019' | 'ANM-020' | 'ANM-021' | 'ANM-022'
  // About Identity S02 (023 - 030)
  | 'ANM-023' | 'ANM-024' | 'ANM-025' | 'ANM-026' | 'ANM-027' | 'ANM-028'
  | 'ANM-029' | 'ANM-030'
  // Warp Bridge S03 (031 - 034)
  | 'ANM-031' | 'ANM-032' | 'ANM-033' | 'ANM-034'
  // Work Constellations S04 (035 - 044)
  | 'ANM-035' | 'ANM-036' | 'ANM-037' | 'ANM-038' | 'ANM-039' | 'ANM-040'
  | 'ANM-041' | 'ANM-042' | 'ANM-043' | 'ANM-044'
  // Skills Matrix S05 (045 - 052)
  | 'ANM-045' | 'ANM-046' | 'ANM-047' | 'ANM-048' | 'ANM-049' | 'ANM-050'
  | 'ANM-051' | 'ANM-052'
  // Contact Horizon S06 (053 - 060)
  | 'ANM-053' | 'ANM-054' | 'ANM-055' | 'ANM-056' | 'ANM-057' | 'ANM-058'
  | 'ANM-059' | 'ANM-060'
  // Case Study Detail (061 - 062)
  | 'ANM-061' | 'ANM-062'
  // Mode & Recovery (063 - 064)
  | 'ANM-063' | 'ANM-064';

export interface RegisteredAnimation {
  id: AnimationId;
  name: string;
  section: string;
  type: 'E' | 'R' | 'L' | 'I';
  owner: string;
}

/**
 * Standard debounced ScrollTrigger refresh
 */
export const debouncedRefresh = debounce(() => {
  ScrollTrigger.refresh();
}, 200);

/**
 * Safely create a GSAP context scoped to a ref or element with automatic cleanup.
 */
export function createScopedAnimation(
  scope: React.RefObject<HTMLElement | null> | HTMLElement | null,
  initFn: (context: gsap.Context) => void
): () => void {
  if (!scope) return () => {};
  const targetScope = 'current' in scope ? scope.current : scope;
  if (!targetScope) return () => {};

  const ctx = gsap.context(() => {
    initFn(ctx);
  }, targetScope);

  return () => {
    ctx.revert();
  };
}
