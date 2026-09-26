// src/scene/Starfield.tsx
/**
 * XEVRYN Cosmic Portfolio - Pinpoint Starfield & Cosmic Dust (ANM-002, ANM-003, ANM-004)
 * Anti-aliased circular particle sprites (zero square boxes), natural magnitude distribution,
 * camera-distance clamping, and text-area density relief.
 */

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMotion } from '@/app/providers/MotionProvider';
import { useScene } from '@/app/providers/SceneProvider';

/**
 * Generates an anti-aliased soft radial star sprite texture.
 * Eliminates square particle rendering.
 */
function createStarTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const center = size / 2;
  const radGrad = ctx.createRadialGradient(center, center, 0, center, center, center * 0.95);
  radGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  radGrad.addColorStop(0.2, 'rgba(240, 246, 255, 0.85)');
  radGrad.addColorStop(0.5, 'rgba(180, 210, 255, 0.35)');
  radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = radGrad;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export const Starfield: React.FC = () => {
  const starsRef = useRef<THREE.Points>(null);
  const dustRef = useRef<THREE.Points>(null);
  const { isReduced } = useMotion();
  const { sceneStateRef } = useScene();

  const starTexture = useMemo(() => {
    if (typeof document === 'undefined') return new THREE.Texture();
    return createStarTexture();
  }, []);

  // 1. Primary Stars (900 stars, mostly faint, biased away from hero text)
  const [starPositions, starColors] = useMemo(() => {
    const count = 900;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#F8FAFC'), // Crisp pure white (common)
      new THREE.Color('#CBD5E1'), // Dim gray-white (most common)
      new THREE.Color('#93C5FD'), // Pale ice blue
      new THREE.Color('#FCD34D'), // Star gold (rare)
      new THREE.Color('#C084FC'), // Soft violet (rare)
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Spread stars across field, keeping Z safely deep (-4 to -32)
      let x = (Math.random() - 0.5) * 36;
      const y = (Math.random() - 0.5) * 30;
      const z = -4.0 - Math.random() * 28.0;

      // Reduce density slightly in text-reading sweet spot (x: -8 to -1, y: -4 to 4)
      if (x > -8 && x < -1 && y > -4 && y < 4 && Math.random() < 0.55) {
        x += (Math.random() > 0.5 ? 6 : -6);
      }

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      // Magnitude distribution: 80% dim, 15% medium, 5% bright
      const magRoll = Math.random();
      let color: THREE.Color;
      let brightness: number;

      if (magRoll < 0.78) {
        // Dim background star
        color = palette[1];
        brightness = 0.25 + Math.random() * 0.25;
      } else if (magRoll < 0.94) {
        // Medium star
        color = Math.random() > 0.4 ? palette[0] : palette[2];
        brightness = 0.55 + Math.random() * 0.25;
      } else {
        // Bright celestial beacon
        color = Math.random() > 0.5 ? palette[3] : palette[4];
        brightness = 0.85 + Math.random() * 0.15;
      }

      colors[i3] = color.r * brightness;
      colors[i3 + 1] = color.g * brightness;
      colors[i3 + 2] = color.b * brightness;
    }

    return [positions, colors];
  }, []);

  // 2. Faint Ambient Cosmic Dust Motes (Reduced to 60 motes, safe Z depth)
  const [dustPositions, dustColors] = useMemo(() => {
    const count = 60;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 16;
      positions[i3 + 1] = (Math.random() - 0.5) * 14;
      // Keep dust behind Z = -2.0 so it never intersects camera near plane
      positions[i3 + 2] = -2.5 - Math.random() * 8.0;

      const alpha = 0.12 + Math.random() * 0.15;
      colors[i3] = 0.38 * alpha;
      colors[i3 + 1] = 0.74 * alpha;
      colors[i3 + 2] = 0.97 * alpha;
    }

    return [positions, colors];
  }, []);

  useFrame((_, delta) => {
    if (isReduced) return;

    const mouse = sceneStateRef.current.mouse;

    if (starsRef.current) {
      // Subtle background parallax
      starsRef.current.rotation.y += delta * 0.008;
      starsRef.current.rotation.x = THREE.MathUtils.lerp(
        starsRef.current.rotation.x,
        mouse.y * 0.025,
        0.04
      );
    }

    if (dustRef.current) {
      // Very gentle floating motes
      dustRef.current.rotation.y -= delta * 0.012;
      dustRef.current.position.x = THREE.MathUtils.lerp(
        dustRef.current.position.x,
        mouse.x * 0.1,
        0.04
      );
      dustRef.current.position.y = THREE.MathUtils.lerp(
        dustRef.current.position.y,
        mouse.y * 0.1,
        0.04
      );
    }
  });

  return (
    <group>
      {/* Pinpoint Circular Stars */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[starColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          map={starTexture}
          size={0.038}
          vertexColors
          transparent
          opacity={0.88}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      {/* Gentle Ambient Dust (Behind Content) */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[dustPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[dustColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          map={starTexture}
          size={0.045}
          vertexColors
          transparent
          opacity={0.4}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
};
