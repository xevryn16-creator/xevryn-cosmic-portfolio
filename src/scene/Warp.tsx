// src/scene/Warp.tsx
/**
 * XEVRYN Cosmic Portfolio - Warp Speed Bridge (ANM-031 to ANM-034)
 * Star stretching shader effect without full-screen strobe or flash.
 */

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScene } from '@/app/providers/SceneProvider';
import { useMotion } from '@/app/providers/MotionProvider';

export const Warp: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { sceneStateRef } = useScene();
  const { isReduced } = useMotion();

  // 600 warp stars positioned in a tunnel cylinder
  const [positions, initialPositions, colors] = useMemo(() => {
    const count = 600;
    const pos = new Float32Array(count * 3);
    const initPos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);

    const colorNear = new THREE.Color('#38BDF8'); // Cyan glow
    const colorPeak = new THREE.Color('#C084FC'); // Nebula violet

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Cylinder distribution along Z axis
      const radius = 2.0 + Math.random() * 8.0;
      const angle = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.5) * 40;

      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;

      initPos[i3] = x;
      initPos[i3 + 1] = y;
      initPos[i3 + 2] = z;

      const mixFactor = Math.random();
      const c = colorNear.clone().lerp(colorPeak, mixFactor);
      cols[i3] = c.r;
      cols[i3 + 1] = c.g;
      cols[i3 + 2] = c.b;
    }

    return [pos, initPos, cols];
  }, []);

  useFrame((_, delta) => {
    if (isReduced || !pointsRef.current) return;

    const warpFactor = sceneStateRef.current.target.warpFactor || 0;
    const material = pointsRef.current.material as THREE.PointsMaterial;

    // Modulate opacity and size by warpFactor
    // Zero warpFactor = invisible / dormant
    if (warpFactor < 0.05) {
      material.opacity = THREE.MathUtils.lerp(material.opacity, 0, 0.1);
      if (material.opacity < 0.01) {
        pointsRef.current.visible = false;
        return;
      }
    } else {
      pointsRef.current.visible = true;
      const targetOpacity = Math.min(0.9, warpFactor * 0.95);
      material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, 0.1);
      material.size = THREE.MathUtils.lerp(material.size, 0.04 + warpFactor * 0.12, 0.1);
    }

    // Move stars toward camera (Z direction) based on warpFactor with radial streaks
    const positionsAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const posArray = positionsAttr.array as Float32Array;
    const speed = (0.8 + warpFactor * 36.0) * delta;
    const radialStretch = 1.0 + warpFactor * 0.06;

    for (let i = 0; i < 600; i++) {
      const i3 = i * 3;
      posArray[i3 + 2] += speed;

      // Radial stretching outward as stars accelerate toward the viewer
      const zProgress = (posArray[i3 + 2] + 25) / 40; // 0 to 1
      const stretch = 1.0 + zProgress * (radialStretch - 1.0);
      posArray[i3] = initialPositions[i3] * stretch;
      posArray[i3 + 1] = initialPositions[i3 + 1] * stretch;

      // Wrap around tunnel bounds
      if (posArray[i3 + 2] > 18) {
        posArray[i3 + 2] = -28;
        posArray[i3] = initialPositions[i3];
        posArray[i3 + 1] = initialPositions[i3 + 1];
      }
    }

    positionsAttr.needsUpdate = true;
  });

  if (isReduced) return null;

  return (
    <points ref={pointsRef} visible={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
};
