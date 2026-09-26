// src/scene/SunSource.tsx
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMotion } from '@/app/providers/MotionProvider';

/**
 * Procedural Solar Surface Texture Generator
 * Menghasilkan tekstur fotosfer matahari dengan sel granulasi plasma,
 * bintik matahari (sunspots dengan umbra & penumbra), dan limb darkening.
 */
function createSolarTextures() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // 1. Base solar plasma gradient (Gold-amber core to deeper fiery orange)
  const baseGrad = ctx.createLinearGradient(0, 0, 0, 256);
  baseGrad.addColorStop(0.0, '#ea580c');
  baseGrad.addColorStop(0.25, '#f59e0b');
  baseGrad.addColorStop(0.5, '#fbbf24');
  baseGrad.addColorStop(0.75, '#f59e0b');
  baseGrad.addColorStop(1.0, '#ea580c');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, 512, 256);

  // 2. Plasma Granulation Cells (Sel-sel konveksi surya)
  for (let i = 0; i < 60; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 256;
    const r = 10 + Math.random() * 24;

    const cellGrad = ctx.createRadialGradient(x, y, 0, x, y, r);
    cellGrad.addColorStop(0.0, 'rgba(254, 240, 138, 0.7)'); // Pusat sel terang
    cellGrad.addColorStop(0.7, 'rgba(245, 158, 11, 0.35)');
    cellGrad.addColorStop(1.0, 'rgba(194, 65, 12, 0.0)');
    ctx.fillStyle = cellGrad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // 3. Sunspots (Bintik Matahari dengan Inti Umbra & Penumbra)
  const spots = [
    { x: 180, y: 110, r: 14 },
    { x: 205, y: 122, r: 9 },
    { x: 330, y: 145, r: 18 },
    { x: 355, y: 155, r: 8 },
    { x: 120, y: 90, r: 11 },
  ];

  spots.forEach(({ x, y, r }) => {
    // Penumbra (Cincin cokelat kemerahan)
    const penumbra = ctx.createRadialGradient(x, y, 0, x, y, r);
    penumbra.addColorStop(0.0, '#431407');
    penumbra.addColorStop(0.5, '#78350f');
    penumbra.addColorStop(1.0, 'rgba(180, 83, 9, 0)');
    ctx.fillStyle = penumbra;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    // Umbra (Inti gelap pekat di tengah bintik)
    ctx.fillStyle = '#1c0903';
    ctx.beginPath();
    ctx.arc(x, y, r * 0.45, 0, Math.PI * 2);
    ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Distant Sun / Stellar Source
 * Memiliki fotosfer bertekstur sel konveksi dan bintik matahari,
 * dipadukan dengan dual-layer corona lembut berputar.
 */
export const SunSource: React.FC = () => {
  const sunMeshRef = useRef<THREE.Mesh>(null);
  const innerCoronaRef = useRef<THREE.Mesh>(null);
  const outerCoronaRef = useRef<THREE.Mesh>(null);
  const { isReduced } = useMotion();

  const solarTexture = useMemo(() => createSolarTextures(), []);

  // Dual-layer corona textures
  const { innerCoronaTex, outerCoronaTex } = useMemo(() => {
    // Inner corona
    const c1 = document.createElement('canvas');
    c1.width = 256;
    c1.height = 256;
    const ctx1 = c1.getContext('2d')!;
    const g1 = ctx1.createRadialGradient(128, 128, 0, 128, 128, 128);
    g1.addColorStop(0.0, 'rgba(255, 255, 255, 0.95)');
    g1.addColorStop(0.2, 'rgba(254, 240, 138, 0.7)');
    g1.addColorStop(0.6, 'rgba(245, 158, 11, 0.2)');
    g1.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
    ctx1.fillStyle = g1;
    ctx1.fillRect(0, 0, 256, 256);

    // Outer corona
    const c2 = document.createElement('canvas');
    c2.width = 256;
    c2.height = 256;
    const ctx2 = c2.getContext('2d')!;
    const g2 = ctx2.createRadialGradient(128, 128, 0, 128, 128, 128);
    g2.addColorStop(0.0, 'rgba(251, 191, 36, 0.45)');
    g2.addColorStop(0.4, 'rgba(217, 119, 6, 0.15)');
    g2.addColorStop(0.8, 'rgba(180, 83, 9, 0.04)');
    g2.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
    ctx2.fillStyle = g2;
    ctx2.fillRect(0, 0, 256, 256);

    return {
      innerCoronaTex: new THREE.CanvasTexture(c1),
      outerCoronaTex: new THREE.CanvasTexture(c2),
    };
  }, []);

  useFrame((_, delta) => {
    if (isReduced) return;
    if (sunMeshRef.current) {
      sunMeshRef.current.rotation.y += delta * 0.012;
    }
    if (innerCoronaRef.current) {
      innerCoronaRef.current.rotation.z += delta * 0.018;
    }
    if (outerCoronaRef.current) {
      outerCoronaRef.current.rotation.z -= delta * 0.01;
    }
  });

  return (
    <group position={[-14.0, 10.5, -26.0]}>
      {/* 1. Core Solar Photosphere (Dengan Granulasi Plasma & Sunspots) */}
      <mesh ref={sunMeshRef}>
        <sphereGeometry args={[2.2, 36, 36]} />
        <meshBasicMaterial
          map={solarTexture}
          color="#ffffff"
        />
      </mesh>

      {/* 2. Inner Golden Corona (Glare Disc) */}
      <mesh ref={innerCoronaRef} scale={[12, 12, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={innerCoronaTex}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 3. Outer Diffuse Corona (Pendar Keemasan Luar) */}
      <mesh ref={outerCoronaRef} scale={[24, 24, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={outerCoronaTex}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 4. Stellar Omni Illumination */}
      <pointLight color="#fef08a" intensity={4.5} distance={120} decay={1.5} />

      {/* 5. Subtle Solar Flare / Emission Particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array(
                Array.from({ length: 90 * 3 }, (_, i) => {
                  const angle = Math.random() * Math.PI * 2;
                  const radius = 2.4 + Math.random() * 3.8;
                  if (i % 3 === 0) return Math.cos(angle) * radius;
                  if (i % 3 === 1) return Math.sin(angle) * radius;
                  return (Math.random() - 0.5) * 2;
                })
              ),
              3,
            ]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          color="#fef08a"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
};
