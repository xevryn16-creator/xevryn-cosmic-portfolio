// src/scene/Nebula.tsx
/**
 * XEVRYN Cosmic Portfolio - Organic Ethereal Nebula Clouds (ANM-005, ANM-030)
 * Irregular soft cloud planes with Gaussian-quartic falloff, zero hard circle edges,
 * and delicate additive blending across deep violet and interstellar cyan.
 */

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMotion } from '@/app/providers/MotionProvider';
import { useScene } from '@/app/providers/SceneProvider';

/**
 * Creates a soft, irregular cloud puff texture with zero hard boundaries.
 * Uses a quartic distance falloff (1 - d^2)^2 multiplied by organic perlin-like noise.
 */
function createCloudTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const imgData = ctx.createImageData(size, size);
  const data = imgData.data;
  const center = size / 2;
  const maxR = size * 0.48;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (x - center) / maxR;
      const dy = (y - center) / maxR;
      const distSq = dx * dx + dy * dy;

      if (distSq < 1.0) {
        // Multi-frequency organic turbulence
        const angle = Math.atan2(dy, dx);
        const dist = Math.sqrt(distSq);
        const noise = Math.sin(angle * 3.0 + dist * 6.0) * 0.15 +
                      Math.cos(angle * 5.0 - dist * 8.0) * 0.1;

        // Smooth quartic falloff to guarantee 0 opacity at border
        const falloff = Math.pow(Math.max(0, 1.0 - (dist + noise)), 2.5);
        const alpha = Math.min(255, Math.floor(falloff * 255));

        const idx = (y * size + x) * 4;
        data[idx] = 255;
        data[idx + 1] = 255;
        data[idx + 2] = 255;
        data[idx + 3] = alpha;
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

interface CloudLayer {
  pos: [number, number, number];
  scale: [number, number, number];
  rot: number;
  rotSpeed: number;
  color: string;
  opacity: number;
}

export const Nebula: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { isReduced } = useMotion();
  const { sceneStateRef } = useScene();

  const cloudTexture = useMemo(() => {
    if (typeof document === 'undefined') return new THREE.Texture();
    return createCloudTexture();
  }, []);

  // 6 irregular layered cloud sheets spread deep in space
  const layers: CloudLayer[] = useMemo(() => [
    {
      pos: [-6, 2, -12],
      scale: [16, 12, 1],
      rot: 0.2,
      rotSpeed: 0.003,
      color: '#581c87', // Deep cosmic purple
      opacity: 0.045,
    },
    {
      pos: [5, -3, -14],
      scale: [18, 14, 1],
      rot: -0.4,
      rotSpeed: -0.0025,
      color: '#0369a1', // Celestial cyan-blue
      opacity: 0.038,
    },
    {
      pos: [2, 4, -16],
      scale: [20, 14, 1],
      rot: 0.8,
      rotSpeed: 0.002,
      color: '#6b21a8', // Rich violet
      opacity: 0.035,
    },
    {
      pos: [-4, -4, -10],
      scale: [14, 10, 1],
      rot: -0.6,
      rotSpeed: 0.004,
      color: '#0e7490', // Deep teal
      opacity: 0.04,
    },
    {
      pos: [7, 1, -18],
      scale: [22, 16, 1],
      rot: 1.2,
      rotSpeed: -0.002,
      color: '#4c1d95', // Indigo violet
      opacity: 0.03,
    },
  ], []);

  useFrame((_, delta) => {
    if (isReduced || !groupRef.current || typeof document !== 'undefined' && document.hidden) return;

    // Slow ambient group drift
    groupRef.current.rotation.z += delta * 0.002;

    // Modulate overall nebula density based on scroll state
    const targetDensity = sceneStateRef.current.target.nebulaDensity ?? 1.0;
    const currentScale = groupRef.current.scale.x;
    const nextScale = THREE.MathUtils.lerp(currentScale, targetDensity, 0.04);
    groupRef.current.scale.set(nextScale, nextScale, nextScale);
  });

  return (
    <group ref={groupRef} position={[0, 0, -4]}>
      {layers.map((layer, idx) => (
        <mesh
          key={idx}
          position={layer.pos}
          scale={layer.scale}
          rotation={[0, 0, layer.rot]}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={cloudTexture}
            color={layer.color}
            transparent
            opacity={layer.opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
};
