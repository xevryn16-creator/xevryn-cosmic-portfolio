// src/scene/CameraRig.tsx
import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useScene } from '@/app/providers/SceneProvider';
import { useMotion } from '@/app/providers/MotionProvider';

export const CameraRig: React.FC = () => {
  const { sceneStateRef } = useScene();
  const { isReduced } = useMotion();
  const { camera } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    if (isReduced) {
      camera.position.set(0, 0, 5.5);
      camera.lookAt(0, 0, 0);
      return;
    }

    const { target, mouse, navigationMode, exploreTilt } = sceneStateRef.current;

    // In explore mode, apply user drag tilt influence
    const tiltX = navigationMode === 'explore' && exploreTilt ? exploreTilt.x * 2.5 : 0;
    const tiltY = navigationMode === 'explore' && exploreTilt ? -exploreTilt.y * 1.8 : 0;

    // Mouse parallax offset
    const parallaxX = mouse.x * 0.35 + tiltX;
    const parallaxY = mouse.y * 0.25 + tiltY;

    // Smoothly lerp camera position
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, target.x + parallaxX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, target.y + parallaxY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, target.z, 0.05);

    // Safety boundary constraints: prevent clipping into celestial bodies or horizon
    camera.position.z = Math.max(2.8, camera.position.z);
    camera.position.y = Math.max(-20.0, Math.min(3.0, camera.position.y));

    // Smoothly lerp lookAt target
    const lookOffsetX = navigationMode === 'explore' && exploreTilt ? exploreTilt.x * 1.2 : 0;
    const lookOffsetY = navigationMode === 'explore' && exploreTilt ? -exploreTilt.y * 1.0 : 0;

    currentLookAt.current.x = THREE.MathUtils.lerp(currentLookAt.current.x, target.lookAtX + lookOffsetX, 0.05);
    currentLookAt.current.y = THREE.MathUtils.lerp(currentLookAt.current.y, target.lookAtY + lookOffsetY, 0.05);
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
