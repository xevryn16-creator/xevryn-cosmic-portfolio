// src/types/motion.ts

export type MotionMode = 'full' | 'lite' | 'reduced';

export interface MotionPreferences {
  mode: MotionMode;
  setMode: (mode: MotionMode) => void;
  isReduced: boolean;
  isLite: boolean;
  isFull: boolean;
}

export interface CameraTarget {
  x: number;
  y: number;
  z: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  fov: number;
  lookAtX: number;
  lookAtY: number;
  lookAtZ: number;
  ambientIntensity: number;
  rimIntensity: number;
  starSpeed: number;
  warpFactor: number;
  nebulaDensity?: number;
  horizonRise?: number;
}

export interface SceneStateRef {
  current: {
    progress: number;
    target: CameraTarget;
    mouse: { x: number; y: number };
    webglSupported: boolean;
    isContextLost: boolean;
    astronautWaveUntil?: number;
    satellitePulseUntil?: number;
    ambientTone?: 'deep_blue' | 'violet' | 'amber' | 'dawn';
    navigationMode?: 'cinematic' | 'explore';
    exploreTilt?: { x: number; y: number };
    isTransitioning?: boolean;
    currentLocation?: string;
    exploreCamera?: {
      azimuth: number;
      polar: number;
      distance: number;
      focusTarget: { x: number; y: number; z: number };
      targetAzimuth: number;
      targetPolar: number;
      targetDistance: number;
      targetFocus: { x: number; y: number; z: number };
      isFocusLocked: boolean;
      focusedObjectId: string | null;
      hoveredObjectId: string | null;
    };
  };
}

