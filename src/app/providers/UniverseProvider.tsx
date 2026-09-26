// src/app/providers/UniverseProvider.tsx

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { UniverseLocation, NavigationMode, SectorInfo } from '@/types/universe';
import { UNIVERSE_SECTORS, getSectorById } from '@/content/universe';
import { useScene } from '@/app/providers/SceneProvider';
import { useMotion } from '@/app/providers/MotionProvider';
import { useSound } from '@/app/providers/SoundProvider';

interface UniverseContextValue {
  currentLocation: UniverseLocation;
  currentSector: SectorInfo;
  navigationMode: NavigationMode;
  isUniverseMapOpen: boolean;
  isTransitioning: boolean;
  sectors: SectorInfo[];
  openUniverseMap: () => void;
  closeUniverseMap: () => void;
  toggleUniverseMap: () => void;
  setNavigationMode: (mode: NavigationMode) => void;
  toggleNavigationMode: () => void;
  navigateTo: (location: UniverseLocation) => void;
}

const UniverseContext = createContext<UniverseContextValue | null>(null);

export const UniverseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { sceneStateRef, updateCameraTarget } = useScene();
  const { isReduced } = useMotion();
  const { playChime } = useSound();

  const [currentLocation, setCurrentLocation] = useState<UniverseLocation>('home');
  const [navigationMode, setNavigationMode] = useState<NavigationMode>('cinematic');
  const [isUniverseMapOpen, setIsUniverseMapOpen] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const currentSector = useMemo(() => getSectorById(currentLocation), [currentLocation]);

  // Sync navigation mode into sceneStateRef for useFrame in R3F
  useEffect(() => {
    sceneStateRef.current.navigationMode = navigationMode;
    if (navigationMode === 'cinematic') {
      sceneStateRef.current.exploreTilt = { x: 0, y: 0 };
    }
  }, [navigationMode, sceneStateRef]);

  // Open/Close Map handlers
  const openUniverseMap = useCallback(() => {
    setIsUniverseMapOpen(true);
    playChime();
  }, [playChime]);

  const closeUniverseMap = useCallback(() => {
    setIsUniverseMapOpen(false);
  }, []);

  const toggleUniverseMap = useCallback(() => {
    setIsUniverseMapOpen((prev) => {
      const next = !prev;
      if (next) playChime();
      return next;
    });
  }, [playChime]);

  const toggleNavigationMode = useCallback(() => {
    setNavigationMode((prev) => {
      const next = prev === 'cinematic' ? 'explore' : 'cinematic';
      playChime();
      return next;
    });
  }, [playChime]);

  // Navigate to universe destination with hyperspace warp burst & camera target update
  const navigateTo = useCallback(
    (location: UniverseLocation) => {
      const targetSector = getSectorById(location);
      if (!targetSector) return;

      playChime();
      setIsTransitioning(true);
      sceneStateRef.current.isTransitioning = true;
      sceneStateRef.current.currentLocation = location;
      setCurrentLocation(location);

      // Close universe map overlay if open
      setIsUniverseMapOpen(false);

      // If in explore mode, switch back to cinematic for guided transition
      if (sceneStateRef.current.navigationMode === 'explore') {
        setNavigationMode('cinematic');
      }

      // Hyperspace Warp Burst (ANM-031 to ANM-034)
      if (!isReduced) {
        updateCameraTarget({
          warpFactor: 0.75,
          starSpeed: 0.45,
        });

        setTimeout(() => {
          updateCameraTarget({
            warpFactor: 0.0,
            starSpeed: targetSector.cameraTarget.starSpeed || 0.15,
          });
        }, 650);
      }

      // Update camera target orientation & coordinates
      updateCameraTarget(targetSector.cameraTarget);

      // Scroll DOM smoothly to target section
      const targetElement = document.getElementById(targetSector.sectionId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: isReduced ? 'auto' : 'smooth' });
      } else {
        // Fallback for home
        window.scrollTo({ top: 0, behavior: isReduced ? 'auto' : 'smooth' });
      }

      setTimeout(() => {
        setIsTransitioning(false);
        sceneStateRef.current.isTransitioning = false;
      }, 800);
    },
    [isReduced, playChime, sceneStateRef, updateCameraTarget]
  );

  // Scroll spy to detect active sector while user scrolls naturally
  useEffect(() => {
    const handleScrollSpy = () => {
      if (sceneStateRef.current.isTransitioning) return;

      const viewportCenter = window.innerHeight * 0.42;

      for (let i = UNIVERSE_SECTORS.length - 1; i >= 0; i--) {
        const sector = UNIVERSE_SECTORS[i];
        const el = document.getElementById(sector.sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportCenter) {
            setCurrentLocation((prev) => {
              if (prev !== sector.id) {
                sceneStateRef.current.currentLocation = sector.id;
                return sector.id;
              }
              return prev;
            });
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [sceneStateRef]);

  // Explore Mode mouse drag listener foundation
  useEffect(() => {
    if (navigationMode !== 'explore') return;

    let isDragging = false;
    let startX = 0;
    let startY = 0;

    const onMouseDown = (e: MouseEvent) => {
      // Don't drag if clicking buttons, inputs, or interactive links
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, textarea, .interactive-el')) return;

      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = (e.clientX - startX) * 0.003;
      const deltaY = (e.clientY - startY) * 0.003;

      // Constrain explore tilt within safe boundaries
      sceneStateRef.current.exploreTilt = {
        x: Math.max(-0.6, Math.min(0.6, deltaX)),
        y: Math.max(-0.4, Math.min(0.4, deltaY)),
      };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [navigationMode, sceneStateRef]);

  return (
    <UniverseContext.Provider
      value={{
        currentLocation,
        currentSector,
        navigationMode,
        isUniverseMapOpen,
        isTransitioning,
        sectors: UNIVERSE_SECTORS,
        openUniverseMap,
        closeUniverseMap,
        toggleUniverseMap,
        setNavigationMode,
        toggleNavigationMode,
        navigateTo,
      }}
    >
      {children}
    </UniverseContext.Provider>
  );
};

export const useUniverse = () => {
  const ctx = useContext(UniverseContext);
  if (!ctx) throw new Error('useUniverse must be used within a UniverseProvider');
  return ctx;
};
