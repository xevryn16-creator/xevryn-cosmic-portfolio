// src/scene/CameraRig.tsx

import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useScene } from '@/app/providers/SceneProvider';
import { useMotion } from '@/app/providers/MotionProvider';
import { CELESTIAL_OBJECTS } from '@/content/celestialObjects';

const UNIVERSE_RADIUS = 38.0;

export const CameraRig: React.FC = () => {
  const { sceneStateRef } = useScene();
  const { isReduced } = useMotion();
  const { camera } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, delta) => {
    if (isReduced) {
      camera.position.set(0, 0, 5.5);
      camera.lookAt(0, 0, 0);
      return;
    }

    const { target, mouse, navigationMode, exploreCamera } = sceneStateRef.current;

    // ==========================================
    // 1. FREE-ROAM ORBITAL EXPLORATION MODE
    // ==========================================
    if (navigationMode === 'explore' && exploreCamera) {
      const ec = exploreCamera;
      const dampFactor = Math.min(1.0, delta * 5.0);

      // Interpolate angles, distance, and focus point with smooth inertia
      ec.azimuth = THREE.MathUtils.lerp(ec.azimuth, ec.targetAzimuth, dampFactor);
      ec.polar = THREE.MathUtils.lerp(ec.polar, ec.targetPolar, dampFactor);
      ec.distance = THREE.MathUtils.lerp(ec.distance, ec.targetDistance, dampFactor);

      ec.focusTarget.x = THREE.MathUtils.lerp(ec.focusTarget.x, ec.targetFocus.x, dampFactor);
      ec.focusTarget.y = THREE.MathUtils.lerp(ec.focusTarget.y, ec.targetFocus.y, dampFactor);
      ec.focusTarget.z = THREE.MathUtils.lerp(ec.focusTarget.z, ec.targetFocus.z, dampFactor);

      // Compute 3D camera position from spherical coordinates around focus target
      const sinP = Math.sin(ec.polar);
      const cosP = Math.cos(ec.polar);
      const sinA = Math.sin(ec.azimuth);
      const cosA = Math.cos(ec.azimuth);

      let camX = ec.focusTarget.x + ec.distance * sinP * sinA;
      let camY = ec.focusTarget.y + ec.distance * cosP;
      let camZ = ec.focusTarget.z + ec.distance * sinP * cosA;

      // Spherical Universe Boundary Clamping
      const distFromOrigin = Math.sqrt(camX * camX + camY * camY + camZ * camZ);
      if (distFromOrigin > UNIVERSE_RADIUS) {
        const scale = UNIVERSE_RADIUS / distFromOrigin;
        camX *= scale;
        camY *= scale;
        camZ *= scale;
        ec.targetDistance = Math.min(ec.targetDistance, ec.distance);
      }

      // Lightweight Collision Avoidance against major celestial bodies
      for (let i = 0; i < CELESTIAL_OBJECTS.length; i++) {
        const obj = CELESTIAL_OBJECTS[i];
        const dx = camX - obj.position[0];
        const dy = camY - obj.position[1];
        const dz = camZ - obj.position[2];
        const distSq = dx * dx + dy * dy + dz * dz;
        const minSafeDist = obj.radius + 1.25;

        if (distSq < minSafeDist * minSafeDist && distSq > 0.001) {
          const dist = Math.sqrt(distSq);
          const push = (minSafeDist - dist) / dist;
          camX += dx * push;
          camY += dy * push;
          camZ += dz * push;
        }
      }

      // NaN Protection fallback
      if (isNaN(camX) || isNaN(camY) || isNaN(camZ)) {
        camX = 0;
        camY = 0;
        camZ = 6.5;
      }

      camera.position.set(camX, camY, camZ);

      // Smoothly update lookAt point
      currentLookAt.current.x = THREE.MathUtils.lerp(currentLookAt.current.x, ec.focusTarget.x, dampFactor);
      currentLookAt.current.y = THREE.MathUtils.lerp(currentLookAt.current.y, ec.focusTarget.y, dampFactor);
      currentLookAt.current.z = THREE.MathUtils.lerp(currentLookAt.current.z, ec.focusTarget.z, dampFactor);

      camera.lookAt(currentLookAt.current);
      return;
    }

    // ==========================================
    // 2. GUIDED CINEMATIC SCROLL MODE
    // ==========================================
    // Mouse parallax offset
    const parallaxX = mouse.x * 0.35;
    const parallaxY = mouse.y * 0.25;

    // Smoothly lerp camera position
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, target.x + parallaxX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, target.y + parallaxY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, target.z, 0.05);

    // Safety boundary constraints: prevent clipping into celestial bodies or horizon
    camera.position.z = Math.max(2.8, camera.position.z);
    camera.position.y = Math.max(-20.0, Math.min(3.0, camera.position.y));

    // Smoothly lerp lookAt target
    currentLookAt.current.x = THREE.MathUtils.lerp(currentLookAt.current.x, target.lookAtX, 0.05);
    currentLookAt.current.y = THREE.MathUtils.lerp(currentLookAt.current.y, target.lookAtY, 0.05);
    currentLookAt.current.z = THREE.MathUtils.lerp(currentLookAt.current.z, target.lookAtZ, 0.05);

    // Smoothly lerp FOV if PerspectiveCamera (Warp ANM-032)
    if ('fov' in camera && typeof (camera as THREE.PerspectiveCamera).fov === 'number') {
      const persCamera = camera as THREE.PerspectiveCamera;
      const targetFov = target.fov || 45;
      if (Math.abs(persCamera.fov - targetFov) > 0.05) {
        persCamera.fov = THREE.MathUtils.lerp(persCamera.fov, targetFov, 0.05);
        persCamera.updateProjectionMatrix();
      }
    }

    camera.lookAt(currentLookAt.current);
  });

  return null;
};
