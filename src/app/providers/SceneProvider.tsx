// src/app/providers/SceneProvider.tsx
import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import { CameraTarget, SceneStateRef, EnvironmentProfile } from '@/types/motion';

const defaultTarget: CameraTarget = {
  x: 0,
  y: 0,
  z: 5.5,
  rotX: 0,
  rotY: 0,
  rotZ: 0,
  fov: 45,
  lookAtX: 0,
  lookAtY: 0,
  lookAtZ: 0,
  ambientIntensity: 0.25,
  rimIntensity: 1.8,
  starSpeed: 0.15,
  warpFactor: 0.0,
  nebulaDensity: 1.0,
  horizonRise: 0.0,
};

interface SceneContextValue {
  sceneStateRef: SceneStateRef;
  webglSupported: boolean;
  isContextLost: boolean;
  setContextLost: (lost: boolean) => void;
  updateCameraTarget: (partial: Partial<CameraTarget>) => void;
  triggerAstronautWave: () => void;
  triggerSatellitePulse: () => void;
  ambientTone: 'deep_blue' | 'violet' | 'amber' | 'dawn';
  setAmbientTone: (tone: 'deep_blue' | 'violet' | 'amber' | 'dawn') => void;
  environmentProfile: EnvironmentProfile;
  setEnvironmentProfile: (profile: EnvironmentProfile) => void;
}

const SceneContext = createContext<SceneContextValue | null>(null);

export const SceneProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [isContextLost, setContextLost] = useState<boolean>(false);
  const [ambientTone, setAmbientTone] = useState<'deep_blue' | 'violet' | 'amber' | 'dawn'>('deep_blue');
  const [environmentProfile, setEnvironmentProfile] = useState<EnvironmentProfile>('cosmic');

  const sceneStateRef = useRef<SceneStateRef['current']>({
    progress: 0,
    target: { ...defaultTarget },
    mouse: { x: 0, y: 0 },
    webglSupported: true,
    isContextLost: false,
    astronautWaveUntil: 0,
    satellitePulseUntil: 0,
    ambientTone: 'deep_blue',
    environmentProfile: 'cosmic',
  });

  useEffect(() => {
    sceneStateRef.current.ambientTone = ambientTone;
    document.documentElement.setAttribute('data-ambient-tone', ambientTone);
  }, [ambientTone]);

  useEffect(() => {
    sceneStateRef.current.environmentProfile = environmentProfile;
    document.documentElement.setAttribute('data-environment-profile', environmentProfile);
    
    // Auto-harmonize ambient tone with profile if not manually overridden
    if (environmentProfile === 'timeline') {
      setAmbientTone('amber');
    } else if (environmentProfile === 'media') {
      setAmbientTone('violet');
    } else if (environmentProfile === 'identity') {
      setAmbientTone('deep_blue');
    } else if (environmentProfile === 'skills') {
      setAmbientTone('violet');
    } else if (environmentProfile === 'cosmic') {
      setAmbientTone('deep_blue');
    }
  }, [environmentProfile]);

  const triggerAstronautWave = () => {
    sceneStateRef.current.astronautWaveUntil = Date.now() + 4000;
  };

  const triggerSatellitePulse = () => {
    sceneStateRef.current.satellitePulseUntil = Date.now() + 4000;
  };

  useEffect(() => {
    // Detect WebGL capability safely
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        setWebglSupported(false);
        sceneStateRef.current.webglSupported = false;
      }
    } catch {
      setWebglSupported(false);
      sceneStateRef.current.webglSupported = false;
    }

    // Pointer move listener for subtle parallax
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      sceneStateRef.current.mouse.x = x;
      sceneStateRef.current.mouse.y = y;
    };

    // Global scroll progress listener across entire journey (0.0 to 1.0)
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        sceneStateRef.current.progress = Math.min(1, Math.max(0, scrollY / maxScroll));
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const updateCameraTarget = (partial: Partial<CameraTarget>) => {
    Object.assign(sceneStateRef.current.target, partial);
  };

  return (
    <SceneContext.Provider
      value={{
        sceneStateRef,
        webglSupported,
        isContextLost,
        setContextLost,
        updateCameraTarget,
        triggerAstronautWave,
        triggerSatellitePulse,
        ambientTone,
        setAmbientTone,
        environmentProfile,
        setEnvironmentProfile,
      }}
    >
      {children}
    </SceneContext.Provider>
  );
};

export const useScene = () => {
  const ctx = useContext(SceneContext);
  if (!ctx) throw new Error('useScene must be used within a SceneProvider');
  return ctx;
};
