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
  };
}

