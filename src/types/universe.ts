// src/types/universe.ts

import { CameraTarget } from './motion';

export type UniverseLocation =
  | 'home'        // SECTOR 01: XEVRYN CORE (Hero)
  | 'identity'    // SECTOR 02: IDENTITY ARCHIVE (About)
  | 'experience'  // SECTOR 03: ORBITAL TIMELINE (Experience)
  | 'media'       // SECTOR 04: CREATIVE FILM ARCHIVE (Media 3)
  | 'skills'      // SECTOR 05: SKILL NETWORK (Skills)
  | 'projects'    // SECTOR 06: PROJECT CONSTELLATION (Work)
  | 'lab'         // SECTOR 07: XEVRYN LAB (Experiments)
  | 'contact';    // SECTOR 08: COMMUNICATION STATION (Contact)

export type NavigationMode = 'cinematic' | 'explore';

export interface SectorInfo {
  id: UniverseLocation;
  sectorCode: string;
  title: string;
  shortName: string;
  sectionId: string;
  tagline: string;
  telemetry: string;
  coordinates: { x: number; y: number; z: number };
  mapPosition: { x: number; y: number }; // Percentage in 2D tactical map (0 to 100)
  cameraTarget: Partial<CameraTarget>;
  connections: UniverseLocation[];
  shortcutKey: string;
}

export interface UniverseState {
  currentLocation: UniverseLocation;
  navigationMode: NavigationMode;
  isUniverseMapOpen: boolean;
  isTransitioning: boolean;
  transitionProgress: number;
}
