// src/scene/Satellite.tsx
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMotion } from '@/app/providers/MotionProvider';

import { useScene } from '@/app/providers/SceneProvider';

/**
 * Procedural Space Satellite
 * Memiliki bodi modular metalik, panel surya fotovoltaik biru bergaris kisi,
 * piringan antena transmisi, dan lampu beacon komunikasi yang berkedip.
 */
export const Satellite: React.FC<{ position?: [number, number, number]; scale?: number }> = ({
  position = [-2.2, -5.8, -1.2],
  scale = 0.45,
}) => {
  const satGroupRef = useRef<THREE.Group>(null);
  const beaconLightRef = useRef<THREE.PointLight>(null);
  const pulseWaveRef = useRef<THREE.Mesh>(null);
  const { isReduced } = useMotion();
  const { sceneStateRef } = useScene();

  // Create solar cell grid canvas texture
  const solarPanelTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(0, 0, 256, 128);

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;

    // Grid lines
    for (let x = 0; x <= 256; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 128);
      ctx.stroke();
    }
    for (let y = 0; y <= 128; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(256, y);
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  useFrame((state, delta) => {
    if (!satGroupRef.current) return;

    if (!isReduced) {
      satGroupRef.current.rotation.y += delta * 0.035;
      satGroupRef.current.rotation.x += delta * 0.015;

      // Blinking beacon light
      if (beaconLightRef.current) {
        beaconLightRef.current.intensity = Math.sin(state.clock.elapsedTime * 5) > 0.3 ? 1.5 : 0.1;
      }

      // Easter egg: radio transmission pulse wave
      const isPulsing = (sceneStateRef.current.satellitePulseUntil || 0) > Date.now();
      if (pulseWaveRef.current) {
        if (isPulsing) {
          const pulseProgress = (state.clock.elapsedTime * 2.5) % 1;
          pulseWaveRef.current.scale.setScalar(1 + pulseProgress * 6);
          (pulseWaveRef.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - pulseProgress);
          if (beaconLightRef.current) beaconLightRef.current.intensity = 4.0;
        } else {
          (pulseWaveRef.current.material as THREE.MeshBasicMaterial).opacity = 0;
        }
      }
    }
  });

  return (
    <group ref={satGroupRef} position={position} scale={[scale, scale, scale]}>
      {/* Radio Wave Transmission Pulse Ring */}
      <mesh ref={pulseWaveRef} position={[0, 0.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.2, 0.35, 32]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>

      {/* 1. Central Satellite Bus (Bodi Kubus Modular) */}
      <mesh>
        <boxGeometry args={[0.5, 0.65, 0.5]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Gold Thermal Foil Accent */}
      <mesh position={[0, 0, 0.26]}>
        <planeGeometry args={[0.42, 0.54]} />
        <meshStandardMaterial color="#d97706" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* 2. Left Solar Array Wing */}
      <group position={[-1.2, 0, 0]}>
        <mesh>
          <boxGeometry args={[1.6, 0.6, 0.04]} />
          <meshStandardMaterial
            map={solarPanelTexture}
            roughness={0.2}
            metalness={0.7}
          />
        </mesh>
        {/* Support Truss Arm */}
        <mesh position={[0.9, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
          <meshStandardMaterial color="#475569" metalness={0.8} />
        </mesh>
      </group>

      {/* 3. Right Solar Array Wing */}
      <group position={[1.2, 0, 0]}>
        <mesh>
          <boxGeometry args={[1.6, 0.6, 0.04]} />
          <meshStandardMaterial
            map={solarPanelTexture}
            roughness={0.2}
            metalness={0.7}
          />
        </mesh>
        {/* Support Truss Arm */}
        <mesh position={[-0.9, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
          <meshStandardMaterial color="#475569" metalness={0.8} />
        </mesh>
      </group>

      {/* 4. High-Gain Dish Antenna (Piringan Parabola) */}
      <group position={[0, 0.45, 0]} rotation={[-0.4, 0, 0.3]}>
        <mesh>
          <cylinderGeometry args={[0.26, 0.05, 0.12, 16]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.4} metalness={0.7} />
        </mesh>
        {/* Antenna Feed Horn */}
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.2, 8]} />
          <meshStandardMaterial color="#0284c7" metalness={0.9} />
        </mesh>
      </group>

      {/* 5. Communication Beacon Light */}
      <mesh position={[0, -0.38, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>
      <pointLight
        ref={beaconLightRef}
        position={[0, -0.38, 0]}
        color="#38bdf8"
        intensity={1.2}
        distance={4}
      />
    </group>
  );
};
