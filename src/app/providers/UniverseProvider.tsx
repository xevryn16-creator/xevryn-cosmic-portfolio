// src/app/providers/UniverseProvider.tsx

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { UniverseLocation, NavigationMode, SectorInfo, CelestialObjectMeta } from '@/types/universe';
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
  focusedObject: CelestialObjectMeta | null;
  hoveredObject: CelestialObjectMeta | null;
  openUniverseMap: () => void;
  closeUniverseMap: () => void;
  toggleUniverseMap: () => void;
  setNavigationMode: (mode: NavigationMode) => void;
  toggleNavigationMode: () => void;
  navigateTo: (location: UniverseLocation) => void;
  focusCelestialObject: (obj: CelestialObjectMeta) => void;
  exitFocus: () => void;
  setHoveredObject: (obj: CelestialObjectMeta | null) => void;
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
  const [focusedObject, setFocusedObject] = useState<CelestialObjectMeta | null>(null);
  const [hoveredObject, setHoveredObject] = useState<CelestialObjectMeta | null>(null);

  const currentSector = useMemo(() => getSectorById(currentLocation), [currentLocation]);

  // Synchronize navigationMode and ensure exploreCamera state in sceneStateRef
  useEffect(() => {
    sceneStateRef.current.navigationMode = navigationMode;

    if (!sceneStateRef.current.exploreCamera) {
      sceneStateRef.current.exploreCamera = {
        azimuth: 0,
        polar: Math.PI / 2.2,
        distance: 6.5,
        focusTarget: { x: 0, y: 0, z: 0 },
        targetAzimuth: 0,
        targetPolar: Math.PI / 2.2,
        targetDistance: 6.5,
        targetFocus: { x: 0, y: 0, z: 0 },
        isFocusLocked: false,
        focusedObjectId: null,
        hoveredObjectId: null,
      };
    }

    if (navigationMode === 'cinematic') {
      sceneStateRef.current.exploreTilt = { x: 0, y: 0 };
      setFocusedObject(null);
      if (sceneStateRef.current.exploreCamera) {
        sceneStateRef.current.exploreCamera.isFocusLocked = false;
        sceneStateRef.current.exploreCamera.focusedObjectId = null;
      }
    } else if (navigationMode === 'explore') {
      // Seamlessly initialize explore camera from current camera target
      const target = sceneStateRef.current.target;
      const ec = sceneStateRef.current.exploreCamera;
      const fx = target.lookAtX || 0;
      const fy = target.lookAtY || 0;
      const fz = target.lookAtZ || 0;
      const dx = target.x - fx;
      const dy = target.y - fy;
      const dz = target.z - fz;
      const dist = Math.max(3.0, Math.sqrt(dx * dx + dy * dy + dz * dz)) || 6.5;

      ec.focusTarget = { x: fx, y: fy, z: fz };
      ec.targetFocus = { x: fx, y: fy, z: fz };
      ec.distance = dist;
      ec.targetDistance = dist;
      ec.polar = Math.max(0.1, Math.min(Math.PI - 0.1, Math.acos(dy / dist) || Math.PI / 2.2));
      ec.targetPolar = ec.polar;
      ec.azimuth = Math.atan2(dx, dz) || 0;
      ec.targetAzimuth = ec.azimuth;
    }
  }, [navigationMode, sceneStateRef]);

  // Map controls
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

  // Planetary Focus System
  const focusCelestialObject = useCallback(
    (obj: CelestialObjectMeta) => {
      playChime();
      setFocusedObject(obj);

      // If currently in cinematic mode, switch into explore mode
      if (sceneStateRef.current.navigationMode !== 'explore') {
        setNavigationMode('explore');
      }

      const ec = sceneStateRef.current.exploreCamera;
      if (ec) {
        ec.isFocusLocked = true;
        ec.focusedObjectId = obj.id;
        ec.targetFocus = { x: obj.position[0], y: obj.position[1], z: obj.position[2] };
        ec.targetDistance = obj.safeDistance;
      }
    },
    [playChime, sceneStateRef]
  );

  const exitFocus = useCallback(() => {
    playChime();
    setFocusedObject(null);
    const ec = sceneStateRef.current.exploreCamera;
    if (ec) {
      ec.isFocusLocked = false;
      ec.focusedObjectId = null;
      ec.targetDistance = Math.max(7.5, ec.targetDistance * 1.4);
    }
  }, [playChime, sceneStateRef]);

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

      setIsUniverseMapOpen(false);
      setFocusedObject(null);

      // If in explore mode, switch back to cinematic for guided storytelling
      if (sceneStateRef.current.navigationMode === 'explore') {
        setNavigationMode('cinematic');
      }

      // Calculate distance between current sector and target sector to scale warp duration
      const currentSec = getSectorById(currentLocation);
      const dx = targetSector.coordinates.x - currentSec.coordinates.x;
      const dy = targetSector.coordinates.y - currentSec.coordinates.y;
      const dz = targetSector.coordinates.z - currentSec.coordinates.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const warpDuration = Math.min(1300, Math.max(700, Math.round(dist * 60 + 600)));

      // Hyperspace Warp Burst (ANM-031 to ANM-034)
      if (!isReduced) {
        updateCameraTarget({
          warpFactor: Math.min(1.0, 0.65 + dist * 0.025),
          starSpeed: 0.5,
        });

        setTimeout(() => {
          updateCameraTarget({
            warpFactor: 0.0,
            starSpeed: targetSector.cameraTarget.starSpeed || 0.15,
          });
        }, warpDuration - 100);
      }

      // Update camera target orientation & coordinates
      updateCameraTarget(targetSector.cameraTarget);

      // Scroll DOM smoothly to target section
      const targetElement = document.getElementById(targetSector.sectionId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: isReduced ? 'auto' : 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: isReduced ? 'auto' : 'smooth' });
      }

      setTimeout(() => {
        setIsTransitioning(false);
        sceneStateRef.current.isTransitioning = false;
      }, warpDuration);
    },
    [currentLocation, isReduced, playChime, sceneStateRef, updateCameraTarget]
  );

  // Scroll spy to detect active sector while user scrolls naturally in cinematic mode
  useEffect(() => {
    const handleScrollSpy = () => {
      if (sceneStateRef.current.isTransitioning || navigationMode === 'explore') return;

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
  }, [navigationMode, sceneStateRef]);

  // FREE-ROAM ORBITAL CAMERA CONTROLLER & INPUT LISTENER (Explore Mode)
  const isDraggingRef = useRef(false);
  const dragButtonRef = useRef(0);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const touchDistanceRef = useRef<number | null>(null);

  useEffect(() => {
    if (navigationMode !== 'explore') return;

    // Prevent body page scrolling in explore mode; mouse wheel zooms instead
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const ec = sceneStateRef.current.exploreCamera;
      if (!ec) return;

      const zoomSpeed = 0.0035;
      const deltaZoom = e.deltaY * zoomSpeed * (ec.targetDistance * 0.18);
      ec.targetDistance = Math.max(2.5, Math.min(36.0, ec.targetDistance + deltaZoom));
    };

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, textarea, .interactive-hud, .universe-map-overlay')) {
        return;
      }

      isDraggingRef.current = true;
      dragButtonRef.current = e.button; // 0 = left (orbit), 2 = right (pan)
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const ec = sceneStateRef.current.exploreCamera;
      if (!ec) return;

      const dx = e.clientX - prevMouseRef.current.x;
      const dy = e.clientY - prevMouseRef.current.y;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };

      if (dragButtonRef.current === 0) {
        // Left click drag: Orbit azimuth & polar
        ec.targetAzimuth -= dx * 0.005;
        ec.targetPolar = Math.max(0.08, Math.min(Math.PI - 0.08, ec.targetPolar - dy * 0.005));
      } else if (dragButtonRef.current === 2 || e.shiftKey) {
        // Right click or Shift+Drag: Pan focus target
        const panScale = ec.distance * 0.0018;
        const sinA = Math.sin(ec.azimuth);
        const cosA = Math.cos(ec.azimuth);

        // Lateral pan along camera right vector
        ec.targetFocus.x -= cosA * dx * panScale;
        ec.targetFocus.z += sinA * dx * panScale;
        ec.targetFocus.y += dy * panScale;

        // Spherical boundary clamping for focus
        ec.targetFocus.x = Math.max(-25, Math.min(25, ec.targetFocus.x));
        ec.targetFocus.y = Math.max(-25, Math.min(25, ec.targetFocus.y));
        ec.targetFocus.z = Math.max(-25, Math.min(25, ec.targetFocus.z));
      }
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleContextMenu = (e: MouseEvent) => {
      if (navigationMode === 'explore') {
        e.preventDefault(); // allow right drag pan without browser context menu
      }
    };

    // Mobile touch gestures: 1-finger orbit, 2-finger zoom
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        dragButtonRef.current = 0;
        prevMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        touchDistanceRef.current = Math.sqrt(dx * dx + dy * dy);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const ec = sceneStateRef.current.exploreCamera;
      if (!ec) return;

      if (e.touches.length === 1 && isDraggingRef.current) {
        const dx = e.touches[0].clientX - prevMouseRef.current.x;
        const dy = e.touches[0].clientY - prevMouseRef.current.y;
        prevMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

        ec.targetAzimuth -= dx * 0.006;
        ec.targetPolar = Math.max(0.08, Math.min(Math.PI - 0.08, ec.targetPolar - dy * 0.006));
      } else if (e.touches.length === 2 && touchDistanceRef.current !== null) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const currentDist = Math.sqrt(dx * dx + dy * dy);
        const pinchDelta = touchDistanceRef.current - currentDist;
        touchDistanceRef.current = currentDist;

        ec.targetDistance = Math.max(2.5, Math.min(36.0, ec.targetDistance + pinchDelta * 0.03));
      }
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
      touchDistanceRef.current = null;
    };

    // Keyboard movement in Explore Mode
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('input, textarea, select') || target.isContentEditable) return;

      const ec = sceneStateRef.current.exploreCamera;
      if (!ec) return;

      const key = e.key.toLowerCase();
      if (key === 'w') {
        // Forward / Zoom in
        ec.targetDistance = Math.max(2.5, ec.targetDistance - 0.7);
      } else if (key === 's') {
        // Backward / Zoom out
        ec.targetDistance = Math.min(36.0, ec.targetDistance + 0.7);
      } else if (key === 'a') {
        // Lateral pan left
        ec.targetAzimuth += 0.08;
      } else if (key === 'd') {
        // Lateral pan right
        ec.targetAzimuth -= 0.08;
      } else if (key === 'q') {
        // Elevate focus up
        ec.targetFocus.y = Math.min(25, ec.targetFocus.y + 0.6);
      } else if (key === 'escape') {
        if (focusedObject) {
          e.preventDefault();
          exitFocus();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [exitFocus, focusedObject, navigationMode, sceneStateRef]);

  return (
    <UniverseContext.Provider
      value={{
        currentLocation,
        currentSector,
        navigationMode,
        isUniverseMapOpen,
        isTransitioning,
        sectors: UNIVERSE_SECTORS,
        focusedObject,
        hoveredObject,
        openUniverseMap,
        closeUniverseMap,
        toggleUniverseMap,
        setNavigationMode,
        toggleNavigationMode,
        navigateTo,
        focusCelestialObject,
        exitFocus,
        setHoveredObject,
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
