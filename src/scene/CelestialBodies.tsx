// src/scene/CelestialBodies.tsx
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMotion } from '@/app/providers/MotionProvider';

/**
 * Procedural Planetary Texture Generators
 * Menghasilkan tekstur terkalibrasi untuk masing-masing dunia unik:
 * 1. Ocean Planet: Daratan organik, kedalaman laut bertingkat, roughness map (laut kilap vs daratan kesat), dan lapisan awan terpisah.
 * 2. Red Planet: Ngarai raksasa (Valles Marineris), tudung es kutub, dan dataran besi berkarat.
 * 3. Gas Giant: Pita awan bergelombang turbulen dan badai pusaran oval.
 * 4. Ringed World: Pita pastel lembut dan cincin berzona densitas dengan celah Cassini.
 */
function createAdvancedPlanetaryTextures() {
  // A. OCEAN PLANET: Albedo, Roughness Map, dan Separated Cloud Layer
  // 1. Albedo & Bathymetry (Kedalaman Laut & Daratan Organik)
  const oceanCanvas = document.createElement('canvas');
  oceanCanvas.width = 1024;
  oceanCanvas.height = 512;
  const oCtx = oceanCanvas.getContext('2d')!;

  // Deep Abyssal Ocean
  oCtx.fillStyle = '#061c36';
  oCtx.fillRect(0, 0, 1024, 512);

  // Mid-depth Ocean Swells
  for (let i = 0; i < 20; i++) {
    oCtx.fillStyle = '#0d325a';
    oCtx.beginPath();
    oCtx.ellipse(Math.random() * 1024, Math.random() * 512, 120 + Math.random() * 160, 60 + Math.random() * 90, 0, 0, Math.PI * 2);
    oCtx.filter = 'blur(30px)';
    oCtx.fill();
  }

  // Continental Shelves (Shallow Aquamarine Water)
  const drawContinent = (cx: number, cy: number, w: number, h: number) => {
    // Coastal shallows
    oCtx.save();
    oCtx.fillStyle = '#0ea5e9';
    oCtx.beginPath();
    oCtx.ellipse(cx, cy, w * 1.15, h * 1.15, 0.2, 0, Math.PI * 2);
    oCtx.filter = 'blur(16px)';
    oCtx.fill();

    // Landmass Core (Hutan, pegunungan dan dataran tinggi hijau-kecokelatan)
    oCtx.fillStyle = '#1e3a1e';
    oCtx.beginPath();
    oCtx.ellipse(cx, cy, w, h, 0.2, 0, Math.PI * 2);
    oCtx.filter = 'blur(6px)';
    oCtx.fill();

    // Mountain highlands inside continent
    oCtx.fillStyle = '#475569';
    oCtx.beginPath();
    oCtx.ellipse(cx + 10, cy - 8, w * 0.45, h * 0.4, -0.3, 0, Math.PI * 2);
    oCtx.filter = 'blur(4px)';
    oCtx.fill();
    oCtx.restore();
  };

  drawContinent(220, 240, 160, 110);
  drawContinent(460, 180, 130, 95);
  drawContinent(760, 320, 180, 120);
  drawContinent(880, 160, 110, 75);

  // Polar Ice Caps (Kutub Utara & Selatan Es)
  oCtx.fillStyle = '#f1f5f9';
  oCtx.beginPath();
  oCtx.ellipse(512, 20, 480, 35, 0, 0, Math.PI * 2);
  oCtx.filter = 'blur(10px)';
  oCtx.fill();
  oCtx.beginPath();
  oCtx.ellipse(512, 492, 480, 35, 0, 0, Math.PI * 2);
  oCtx.fill();

  // 2. Roughness Map (Hitam/Gelap = Laut Sangat Mengilap, Putih = Daratan Kasar)
  const roughCanvas = document.createElement('canvas');
  roughCanvas.width = 1024;
  roughCanvas.height = 512;
  const roughCtx = roughCanvas.getContext('2d')!;
  roughCtx.fillStyle = '#262626'; // Laut reflektif (roughness rendah ~0.15)
  roughCtx.fillRect(0, 0, 1024, 512);

  const drawRoughLand = (cx: number, cy: number, w: number, h: number) => {
    roughCtx.save();
    roughCtx.fillStyle = '#e5e5e5'; // Daratan kesat (roughness tinggi ~0.9)
    roughCtx.beginPath();
    roughCtx.ellipse(cx, cy, w, h, 0.2, 0, Math.PI * 2);
    roughCtx.filter = 'blur(8px)';
    roughCtx.fill();
    roughCtx.restore();
  };
  drawRoughLand(220, 240, 160, 110);
  drawRoughLand(460, 180, 130, 95);
  drawRoughLand(760, 320, 180, 120);
  drawRoughLand(880, 160, 110, 75);

  // 3. Separated Atmospheric Cloud Map (Lapisan Awan Terpisah)
  const cloudCanvas = document.createElement('canvas');
  cloudCanvas.width = 1024;
  cloudCanvas.height = 512;
  const cloudCtx = cloudCanvas.getContext('2d')!;
  cloudCtx.clearRect(0, 0, 1024, 512);

  for (let i = 0; i < 28; i++) {
    const cx = Math.random() * 1024;
    const cy = 40 + Math.random() * 432;
    const rx = 50 + Math.random() * 120;
    const ry = 15 + Math.random() * 35;
    const rot = (Math.random() - 0.5) * 0.4;

    const cloudGrad = cloudCtx.createRadialGradient(cx, cy, 0, cx, cy, rx);
    cloudGrad.addColorStop(0.0, 'rgba(255, 255, 255, 0.75)');
    cloudGrad.addColorStop(0.6, 'rgba(255, 255, 255, 0.35)');
    cloudGrad.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)');

    cloudCtx.save();
    cloudCtx.fillStyle = cloudGrad;
    cloudCtx.beginPath();
    cloudCtx.ellipse(cx, cy, rx, ry, rot, 0, Math.PI * 2);
    cloudCtx.fill();
    cloudCtx.restore();
  }

  // B. RED PLANET (Mars-like): Valles Marineris Canyon, Iron Ochre, Polar Frost
  const redCanvas = document.createElement('canvas');
  redCanvas.width = 1024;
  redCanvas.height = 512;
  const rCtx = redCanvas.getContext('2d')!;
  rCtx.fillStyle = '#8f331a';
  rCtx.fillRect(0, 0, 1024, 512);

  // Ochre dust deserts and darker basaltic plains
  for (let i = 0; i < 16; i++) {
    rCtx.fillStyle = i % 2 === 0 ? '#632110' : '#b84626';
    rCtx.beginPath();
    rCtx.ellipse(Math.random() * 1024, Math.random() * 512, 100 + Math.random() * 160, 50 + Math.random() * 90, 0, 0, Math.PI * 2);
    rCtx.filter = 'blur(35px)';
    rCtx.fill();
  }

  // Giant Canyon System (Valles Marineris) - Belahan retakan ngarai raksasa di ekuator
  rCtx.save();
  rCtx.strokeStyle = '#2b0c05';
  rCtx.lineWidth = 14;
  rCtx.lineCap = 'round';
  rCtx.filter = 'blur(4px)';
  rCtx.beginPath();
  rCtx.moveTo(250, 270);
  rCtx.bezierCurveTo(400, 250, 600, 290, 750, 260);
  rCtx.stroke();
  // Secondary canyon branches
  rCtx.lineWidth = 6;
  rCtx.beginPath();
  rCtx.moveTo(380, 255);
  rCtx.lineTo(430, 295);
  rCtx.moveTo(560, 280);
  rCtx.lineTo(610, 240);
  rCtx.stroke();
  rCtx.restore();

  // Polar Frost
  rCtx.fillStyle = '#fed7aa';
  rCtx.beginPath();
  rCtx.ellipse(512, 16, 320, 24, 0, 0, Math.PI * 2);
  rCtx.filter = 'blur(8px)';
  rCtx.fill();

  // C. GAS GIANT (Jupiter-like): Wavy Turbulent Atmospheric Bands & Oval Storm Spot
  const gasCanvas = document.createElement('canvas');
  gasCanvas.width = 1024;
  gasCanvas.height = 512;
  const gCtx = gasCanvas.getContext('2d')!;

  const palette = [
    '#3c2214', '#704221', '#9a6336', '#c98a52',
    '#ebd0a9', '#8a4b21', '#b86d37', '#542d14',
    '#9e663a', '#dfaf78', '#6b3718', '#381e0f',
  ];
  const bandStep = 512 / palette.length;

  palette.forEach((col, idx) => {
    const yCenter = idx * bandStep;
    gCtx.fillStyle = col;
    gCtx.beginPath();
    gCtx.moveTo(0, yCenter);

    // Gelombang turbulensi bergelombang di batas pita awan
    for (let x = 0; x <= 1024; x += 16) {
      const wave = Math.sin((x / 1024) * Math.PI * 8 + idx) * 8 + Math.cos((x / 1024) * Math.PI * 14) * 4;
      gCtx.lineTo(x, yCenter + wave);
    }
    gCtx.lineTo(1024, (idx + 1) * bandStep + 10);
    gCtx.lineTo(0, (idx + 1) * bandStep + 10);
    gCtx.closePath();
    gCtx.fill();
  });

  // Great Red Storm Oval with swirling outer rings
  gCtx.save();
  gCtx.fillStyle = '#b9381e';
  gCtx.beginPath();
  gCtx.ellipse(680, 310, 68, 38, -0.08, 0, Math.PI * 2);
  gCtx.filter = 'blur(3px)';
  gCtx.fill();
  // Storm core
  gCtx.fillStyle = '#d9532f';
  gCtx.beginPath();
  gCtx.ellipse(680, 310, 38, 20, -0.08, 0, Math.PI * 2);
  gCtx.fill();
  gCtx.restore();

  // D. RINGED PLANET (Saturn-like): Soft Pastel Bands & Ring Zone Density Texture
  const ringPlanetCanvas = document.createElement('canvas');
  ringPlanetCanvas.width = 512;
  ringPlanetCanvas.height = 256;
  const rpCtx = ringPlanetCanvas.getContext('2d')!;
  rpCtx.fillStyle = '#c9b58f';
  rpCtx.fillRect(0, 0, 512, 256);
  for (let i = 0; i < 10; i++) {
    rpCtx.fillStyle = i % 2 === 0 ? '#ad966d' : '#dbcbb0';
    rpCtx.fillRect(0, i * 26, 512, 16);
  }

  // Ring Texture with A-Ring, Cassini Division Gap, and Dense B-Ring
  const ringCanvas = document.createElement('canvas');
  ringCanvas.width = 1024;
  ringCanvas.height = 32;
  const ringCtx = ringCanvas.getContext('2d')!;
  const rGrad = ringCtx.createLinearGradient(0, 0, 1024, 0);
  rGrad.addColorStop(0.0, 'rgba(0,0,0,0)');
  rGrad.addColorStop(0.08, 'rgba(180, 158, 120, 0.15)'); // Ring C (Crepe ring)
  rGrad.addColorStop(0.24, 'rgba(235, 218, 185, 0.88)'); // Ring B inner
  rGrad.addColorStop(0.48, 'rgba(250, 236, 205, 0.95)'); // Ring B dense core
  rGrad.addColorStop(0.53, 'rgba(0, 0, 0, 0.0)');        // Cassini Division (Bersih tembus pandang)
  rGrad.addColorStop(0.57, 'rgba(215, 196, 160, 0.72)'); // Ring A inner
  rGrad.addColorStop(0.82, 'rgba(200, 180, 145, 0.65)'); // Ring A middle
  rGrad.addColorStop(0.86, 'rgba(0, 0, 0, 0.05)');       // Encke Gap
  rGrad.addColorStop(0.92, 'rgba(185, 165, 130, 0.4)');  // Ring A outer
  rGrad.addColorStop(1.0, 'rgba(0,0,0,0)');
  ringCtx.fillStyle = rGrad;
  ringCtx.fillRect(0, 0, 1024, 32);

  const oceanAlbedo = new THREE.CanvasTexture(oceanCanvas);
  const oceanRoughness = new THREE.CanvasTexture(roughCanvas);
  const oceanClouds = new THREE.CanvasTexture(cloudCanvas);
  const redAlbedo = new THREE.CanvasTexture(redCanvas);
  const gasAlbedo = new THREE.CanvasTexture(gasCanvas);
  const ringPlanetAlbedo = new THREE.CanvasTexture(ringPlanetCanvas);
  const ringMap = new THREE.CanvasTexture(ringCanvas);

  [oceanAlbedo, oceanClouds, redAlbedo, gasAlbedo, ringPlanetAlbedo, ringMap].forEach((t) => {
    t.colorSpace = THREE.SRGBColorSpace;
  });

  return { oceanAlbedo, oceanRoughness, oceanClouds, redAlbedo, gasAlbedo, ringPlanetAlbedo, ringMap };
}

export const CelestialBodies: React.FC = () => {
  const { isReduced, isLite } = useMotion();

  const oceanGroupRef = useRef<THREE.Group>(null);
  const oceanCloudsRef = useRef<THREE.Mesh>(null);
  const oceanMoonOrbitRef = useRef<THREE.Group>(null);
  const redRef = useRef<THREE.Mesh>(null);
  const gasGiantRef = useRef<THREE.Mesh>(null);
  const ringPlanetGroupRef = useRef<THREE.Group>(null);

  const textures = useMemo(() => createAdvancedPlanetaryTextures(), []);
  const segments = isLite ? 24 : 48;

  useFrame((_, delta) => {
    if (isReduced) return;

    if (oceanGroupRef.current) {
      oceanGroupRef.current.rotation.y += delta * 0.022;
    }
    // Lapisan awan berputar independen berlawanan arah jam
    if (oceanCloudsRef.current) {
      oceanCloudsRef.current.rotation.y += delta * 0.032;
    }
    if (oceanMoonOrbitRef.current) {
      oceanMoonOrbitRef.current.rotation.y += delta * 0.048;
    }
    if (redRef.current) {
      redRef.current.rotation.y += delta * 0.024;
    }
    if (gasGiantRef.current) {
      gasGiantRef.current.rotation.y += delta * 0.038;
    }
    if (ringPlanetGroupRef.current) {
      ringPlanetGroupRef.current.rotation.y += delta * 0.018;
    }
  });

  return (
    <group name="celestial-solar-system">
      {/* 1. OCEAN WORLD (Planet Biru Berawan): Dual Layer Awan + Roughness Daratan/Laut */}
      <group ref={oceanGroupRef} position={[6.2, 1.8, -9.5]} rotation={[0.18, 0.4, 0]}>
        {/* Core Planet (Daratan & Lautan) */}
        <mesh>
          <sphereGeometry args={[1.1, segments, segments]} />
          <meshStandardMaterial
            map={textures.oceanAlbedo}
            roughnessMap={textures.oceanRoughness}
            roughness={0.65}
            metalness={0.12}
          />
        </mesh>

        {/* Separated Atmospheric Cloud Layer (Awan Kumulus Melayang) */}
        <mesh ref={oceanCloudsRef} scale={[1.022, 1.022, 1.022]}>
          <sphereGeometry args={[1.1, segments, segments]} />
          <meshStandardMaterial
            map={textures.oceanClouds}
            transparent
            opacity={0.72}
            blending={THREE.NormalBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Bulan pengorbit Ocean World */}
        <group ref={oceanMoonOrbitRef}>
          <mesh position={[2.2, 0.35, 0.5]}>
            <sphereGeometry args={[0.2, isLite ? 12 : 20, isLite ? 12 : 20]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.92} metalness={0.08} />
          </mesh>
        </group>
      </group>

      {/* 2. RED PLANET (Planet Merah): Ngarai Valles Marineris & Tudung Es Kutub */}
      <mesh
        ref={redRef}
        position={[-6.2, -6.5, -11.5]}
        rotation={[0.28, 0.75, -0.15]}
      >
        <sphereGeometry args={[1.3, segments, segments]} />
        <meshStandardMaterial
          map={textures.redAlbedo}
          roughness={0.9}
          metalness={0.08}
        />
      </mesh>

      {/* 3. GAS GIANT (Jupiter-like): Pita Awan Turbulen Bergelombang & Badai Oval */}
      <mesh
        ref={gasGiantRef}
        position={[8.5, -13.2, -15.0]}
        rotation={[0.08, 1.1, 0.05]}
      >
        <sphereGeometry args={[2.8, segments, segments]} />
        <meshStandardMaterial
          map={textures.gasAlbedo}
          roughness={0.82}
          metalness={0.05}
        />
      </mesh>

      {/* 4. RINGED PLANET (Saturn-like): Cincin Bertingkat dengan Celah Cassini */}
      <group
        ref={ringPlanetGroupRef}
        position={[-7.5, -18.5, -14.0]}
        rotation={[0.45, 0.65, -0.28]}
      >
        {/* Core Sphere (depthWrite: true agar menutupi bagian belakang cincin) */}
        <mesh renderOrder={1}>
          <sphereGeometry args={[1.6, segments, segments]} />
          <meshStandardMaterial
            map={textures.ringPlanetAlbedo}
            roughness={0.8}
            metalness={0.08}
          />
        </mesh>

        {/* Ring Disk miring dengan transparansi & celah Cassini */}
        <mesh rotation={[Math.PI / 2, 0, 0]} renderOrder={2}>
          <ringGeometry args={[2.0, 4.4, isLite ? 36 : 72]} />
          <meshStandardMaterial
            map={textures.ringMap}
            side={THREE.DoubleSide}
            transparent
            opacity={0.92}
            roughness={0.9}
            depthTest={true}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
};
