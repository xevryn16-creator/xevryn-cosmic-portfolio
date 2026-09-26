// src/scene/Planet.tsx
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScene } from '@/app/providers/SceneProvider';
import { useMotion } from '@/app/providers/MotionProvider';

/**
 * Natural Geological Rocky Planet Generator
 * Karakteristik:
 * - Variasi batuan: basal arang, batu tulis abu-abu, dan urat mineral besi.
 * - Pegunungan & sesar tektonik memanjang (rilles & scarps).
 * - Kawah alami multi-skala tak seragam dengan cekungan dalam, puncak tengah,
 *   dan ejecta blanket organik tanpa pola lingkaran outline garis kaku.
 * - Tanpa noise pasir per-pixel yang merata.
 */
function createNaturalRockyTextures(isLite: boolean): { diffuseMap: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } {
  const width = isLite ? 1024 : 2048;
  const height = isLite ? 512 : 1024;

  const diffCanvas = document.createElement('canvas');
  diffCanvas.width = width;
  diffCanvas.height = height;
  const diffCtx = diffCanvas.getContext('2d')!;

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = width;
  bumpCanvas.height = height;
  const bumpCtx = bumpCanvas.getContext('2d')!;

  // 1. Base Regolith (Batuan Arang Geologis Alami)
  diffCtx.fillStyle = '#161c26';
  diffCtx.fillRect(0, 0, width, height);

  // Bump neutral grey (128 = level nol)
  bumpCtx.fillStyle = '#808080';
  bumpCtx.fillRect(0, 0, width, height);

  // 2. Large Tectonic Plates & Basaltic Lowlands (Dataran Basalt & Plato Dataran Tinggi)
  const geologicalZones = [
    { x: width * 0.28, y: height * 0.45, rx: width * 0.24, ry: height * 0.35, rot: 0.15, diff: '#0e131b', bump: '#585858' },
    { x: width * 0.72, y: height * 0.58, rx: width * 0.26, ry: height * 0.38, rot: -0.2, diff: '#111722', bump: '#606060' },
    { x: width * 0.50, y: height * 0.22, rx: width * 0.20, ry: height * 0.24, rot: 0.4, diff: '#242d3c', bump: '#9e9e9e' }, // Highland
    { x: width * 0.88, y: height * 0.32, rx: width * 0.16, ry: height * 0.20, rot: -0.1, diff: '#28221e', bump: '#8e847c' }, // Iron-rich province
    { x: width * 0.12, y: height * 0.72, rx: width * 0.14, ry: height * 0.18, rot: 0.3, diff: '#221e1c', bump: '#887e78' },
  ];

  geologicalZones.forEach((zone) => {
    diffCtx.save();
    diffCtx.beginPath();
    diffCtx.ellipse(zone.x, zone.y, zone.rx, zone.ry, zone.rot, 0, Math.PI * 2);
    diffCtx.fillStyle = zone.diff;
    diffCtx.filter = 'blur(45px)';
    diffCtx.fill();
    diffCtx.restore();

    bumpCtx.save();
    bumpCtx.beginPath();
    bumpCtx.ellipse(zone.x, zone.y, zone.rx, zone.ry, zone.rot, 0, Math.PI * 2);
    bumpCtx.fillStyle = zone.bump;
    bumpCtx.filter = 'blur(40px)';
    bumpCtx.fill();
    bumpCtx.restore();
  });

  // 3. Mountain Ranges & Fault Scarps (Punggungan Pegunungan & Sesar Geologis)
  const mountainChains = [
    { start: [width * 0.15, height * 0.25], steps: 9, dx: 45, dy: 18, w: 22, color: '#333f52', bump: '#b8b8b8' },
    { start: [width * 0.40, height * 0.40], steps: 12, dx: 35, dy: 30, w: 26, color: '#2f3b4c', bump: '#bcbcbc' },
    { start: [width * 0.65, height * 0.20], steps: 10, dx: -40, dy: 22, w: 20, color: '#302b28', bump: '#b4aba4' },
  ];

  mountainChains.forEach((chain) => {
    let [cx, cy] = chain.start;

    bumpCtx.save();
    bumpCtx.strokeStyle = chain.bump;
    bumpCtx.lineWidth = chain.w;
    bumpCtx.lineCap = 'round';
    bumpCtx.lineJoin = 'round';
    bumpCtx.filter = 'blur(8px)';
    bumpCtx.beginPath();
    bumpCtx.moveTo(cx, cy);

    diffCtx.save();
    diffCtx.strokeStyle = chain.color;
    diffCtx.lineWidth = chain.w * 0.9;
    diffCtx.lineCap = 'round';
    diffCtx.lineJoin = 'round';
    diffCtx.filter = 'blur(6px)';
    diffCtx.beginPath();
    diffCtx.moveTo(cx, cy);

    for (let s = 0; s < chain.steps; s++) {
      cx += chain.dx + (Math.random() - 0.5) * 40;
      cy += chain.dy + (Math.random() - 0.5) * 35;
      bumpCtx.lineTo(cx, cy);
      diffCtx.lineTo(cx, cy);
    }
    bumpCtx.stroke();
    diffCtx.stroke();
    bumpCtx.restore();
    diffCtx.restore();
  });

  // 4. Tectonic Fault Rilles / Retakan Ngarai Tipis (Linear graben fractures)
  for (let r = 0; r < 8; r++) {
    let rx = Math.random() * width;
    let ry = height * 0.15 + Math.random() * (height * 0.7);

    bumpCtx.save();
    bumpCtx.strokeStyle = '#383838'; // Retakan dalam = gelap di bump
    bumpCtx.lineWidth = 3 + Math.random() * 3;
    bumpCtx.filter = 'blur(1.5px)';
    bumpCtx.beginPath();
    bumpCtx.moveTo(rx, ry);

    for (let step = 0; step < 6; step++) {
      rx += (Math.random() - 0.4) * 80;
      ry += (Math.random() - 0.5) * 40;
      bumpCtx.lineTo(rx, ry);
    }
    bumpCtx.stroke();
    bumpCtx.restore();
  }

  // 5. Natural Non-Uniform Craters (Organik, Poligonal, Tanpa Garis Cincin)
  const drawNaturalCrater = (cx: number, cy: number, radius: number) => {
    const vertices = 16;
    const rimPoints: { x: number; y: number }[] = [];

    // Bentuk tidak bulat sempurna: modulasi harmonik + jitter acak
    for (let i = 0; i < vertices; i++) {
      const angle = (i / vertices) * Math.PI * 2;
      const distortion = 0.88 + Math.sin(angle * 3) * 0.07 + Math.cos(angle * 5) * 0.05 + (Math.random() - 0.5) * 0.12;
      const r = radius * distortion;
      rimPoints.push({
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
      });
    }

    // A. Relief Kawah pada Bump Map
    bumpCtx.save();
    bumpCtx.beginPath();
    bumpCtx.moveTo(rimPoints[0].x, rimPoints[0].y);
    for (let i = 1; i < vertices; i++) {
      bumpCtx.lineTo(rimPoints[i].x, rimPoints[i].y);
    }
    bumpCtx.closePath();

    // Gradasi mangkuk: Pusat cekung dalam (#242424), bibir terangkat tidak rata (#9e9e9e)
    const bowl = bumpCtx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    bowl.addColorStop(0.0, '#262626');
    bowl.addColorStop(0.68, '#3d3d3d');
    bowl.addColorStop(0.92, '#888888');
    bowl.addColorStop(1.0, '#9c9c9c'); // Raised crest
    bumpCtx.fillStyle = bowl;
    bumpCtx.filter = 'blur(3.5px)';
    bumpCtx.fill();
    bumpCtx.restore();

    // B. Warna Albedo: Dasar cekungan basal lebih gelap, tanpa outline garis stroke buatan!
    diffCtx.save();
    diffCtx.beginPath();
    diffCtx.moveTo(rimPoints[0].x, rimPoints[0].y);
    for (let i = 1; i < vertices; i++) {
      diffCtx.lineTo(rimPoints[i].x, rimPoints[i].y);
    }
    diffCtx.closePath();

    const albedoBowl = diffCtx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    albedoBowl.addColorStop(0.0, '#0a0d13');
    albedoBowl.addColorStop(0.72, '#121822');
    albedoBowl.addColorStop(1.0, '#1c2432');
    diffCtx.fillStyle = albedoBowl;
    diffCtx.filter = 'blur(2.5px)';
    diffCtx.fill();
    diffCtx.restore();

    // C. Puncak Pegunungan Tengah (Central Peak) untuk Kawah Besar
    if (radius > 30) {
      bumpCtx.save();
      bumpCtx.beginPath();
      bumpCtx.ellipse(cx, cy, radius * 0.18, radius * 0.14, 0.3, 0, Math.PI * 2);
      bumpCtx.fillStyle = '#b4b4b4';
      bumpCtx.filter = 'blur(3px)';
      bumpCtx.fill();
      bumpCtx.restore();

      diffCtx.save();
      diffCtx.beginPath();
      diffCtx.ellipse(cx, cy, radius * 0.16, radius * 0.12, 0.3, 0, Math.PI * 2);
      diffCtx.fillStyle = '#2d3848';
      diffCtx.filter = 'blur(2px)';
      diffCtx.fill();
      diffCtx.restore();
    }
  };

  // Kawah Utama (Multi-scale impact basins)
  const majorBasins = [
    { x: width * 0.36, y: height * 0.42, r: 58 },
    { x: width * 0.64, y: height * 0.62, r: 72 },
    { x: width * 0.82, y: height * 0.28, r: 46 },
    { x: width * 0.18, y: height * 0.65, r: 42 },
  ];
  majorBasins.forEach((b) => drawNaturalCrater(b.x, b.y, b.r));

  // Kawah Menengah (28)
  for (let i = 0; i < 28; i++) {
    const x = Math.random() * width;
    const y = 70 + Math.random() * (height - 140);
    const r = 16 + Math.random() * 24;
    drawNaturalCrater(x, y, r);
  }

  // Kawah Kecil (55)
  for (let i = 0; i < 55; i++) {
    const x = Math.random() * width;
    const y = 40 + Math.random() * (height - 80);
    const r = 6 + Math.random() * 9;
    drawNaturalCrater(x, y, r);
  }

  const diffuseMap = new THREE.CanvasTexture(diffCanvas);
  diffuseMap.wrapS = THREE.RepeatWrapping;
  diffuseMap.wrapT = THREE.ClampToEdgeWrapping;
  diffuseMap.colorSpace = THREE.SRGBColorSpace;

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.ClampToEdgeWrapping;

  return { diffuseMap, bumpMap };
}

/**
 * Atmosphere Silhouette Shader
 * Menyala lembut pada siluet terluar planet (Fresnel power 4.8).
 */
const AtmosphereFresnelShader = {
  uniforms: {
    uGlowColor: { value: new THREE.Color('#38bdf8') },
    uIntensity: { value: 0.8 },
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform vec3 uGlowColor;
    uniform float uIntensity;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    void main() {
      vec3 viewDir = normalize(vViewPosition);
      float fresnel = 1.0 - max(dot(viewDir, vNormal), 0.0);
      fresnel = pow(fresnel, 4.8) * uIntensity;
      gl_FragColor = vec4(uGlowColor, fresnel * 0.7);
    }
  `,
};

export const Planet: React.FC = () => {
  const planetGroupRef = useRef<THREE.Group>(null);
  const planetMeshRef = useRef<THREE.Mesh>(null);
  const moonOrbitRef = useRef<THREE.Group>(null);
  const moonMeshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.ShaderMaterial>(null);

  const { sceneStateRef } = useScene();
  const { isReduced, isLite } = useMotion();

  const { diffuseMap, bumpMap } = useMemo(() => createNaturalRockyTextures(isLite), [isLite]);

  // Tekstur Bulan Khusus (Batuan Regolith Kelabu Tua dengan Kawah Mikro)
  const moonTextures = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    // Base lunar grey
    ctx.fillStyle = '#4b5563';
    ctx.fillRect(0, 0, 256, 128);

    // Mare basal patch
    ctx.fillStyle = '#374151';
    ctx.beginPath();
    ctx.ellipse(80, 60, 45, 30, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Natural small craters
    for (let i = 0; i < 18; i++) {
      const cx = Math.random() * 256;
      const cy = Math.random() * 128;
      const r = 3 + Math.random() * 7;
      ctx.fillStyle = '#1f2937';
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  useFrame((_, delta) => {
    if (!planetGroupRef.current) return;

    if (!isReduced) {
      if (planetMeshRef.current) {
        planetMeshRef.current.rotation.y += delta * 0.024;
      }
      if (moonOrbitRef.current) {
        moonOrbitRef.current.rotation.y += delta * 0.042;
      }
      if (moonMeshRef.current) {
        moonMeshRef.current.rotation.y += delta * 0.028;
      }
    }

    // Dynamic scroll positioning (0.0 Hero -> 1.0 Contact)
    const progress = sceneStateRef.current.progress || 0;

    // Bergerak terukur di belahan kanan-tengah
    const targetX = THREE.MathUtils.lerp(1.95, -1.6, Math.min(1, progress * 1.8));
    const targetY = THREE.MathUtils.lerp(0.0, -0.6, Math.min(1, progress * 1.4));
    const targetZ = THREE.MathUtils.lerp(0.0, -3.2, Math.min(1, progress * 1.6));

    planetGroupRef.current.position.x = THREE.MathUtils.lerp(planetGroupRef.current.position.x, targetX, 0.05);
    planetGroupRef.current.position.y = THREE.MathUtils.lerp(planetGroupRef.current.position.y, targetY, 0.05);
    planetGroupRef.current.position.z = THREE.MathUtils.lerp(planetGroupRef.current.position.z, targetZ, 0.05);

    if (atmosphereRef.current) {
      const rimIntensity = sceneStateRef.current.target.rimIntensity ?? 0.8;
      atmosphereRef.current.uniforms.uIntensity.value = rimIntensity;
    }
  });

  return (
    <group ref={planetGroupRef} position={[1.95, 0.0, 0.0]} rotation={[0.22, 0.35, -0.12]}>
      {/* 1. Primary Rocky Planet Mesh */}
      <mesh ref={planetMeshRef}>
        <sphereGeometry args={[1.5, isLite ? 36 : 64, isLite ? 36 : 64]} />
        <meshStandardMaterial
          map={diffuseMap}
          bumpMap={bumpMap}
          bumpScale={0.055}
          roughness={0.92}
          metalness={0.06}
        />
      </mesh>

      {/* 2. Thin Grazing Atmosphere Glow (Hanya di siluet terluar) */}
      <mesh scale={[1.018, 1.018, 1.018]}>
        <sphereGeometry args={[1.5, isLite ? 32 : 48, isLite ? 32 : 48]} />
        <shaderMaterial
          ref={atmosphereRef}
          attach="material"
          args={[AtmosphereFresnelShader]}
          transparent
          blending={THREE.AdditiveBlending}
          side={THREE.FrontSide}
          depthWrite={false}
        />
      </mesh>

      {/* 3. Orbiting Natural Moon */}
      <group ref={moonOrbitRef}>
        <mesh ref={moonMeshRef} position={[3.4, 0.4, 0.6]}>
          <sphereGeometry args={[0.26, isLite ? 16 : 32, isLite ? 16 : 32]} />
          <meshStandardMaterial
            map={moonTextures}
            roughness={0.95}
            metalness={0.05}
          />
        </mesh>
      </group>
    </group>
  );
};
