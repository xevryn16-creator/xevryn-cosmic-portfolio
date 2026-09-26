// src/scene/Astronaut.tsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMotion } from '@/app/providers/MotionProvider';

import { useScene } from '@/app/providers/SceneProvider';

/**
 * Procedural Spacewalking Astronaut
 * Terdiri dari helm astronot, visor kaca reflektif emas, baju antariksa putih,
 * backpack PLSS (life support), dan postur melayang santai di samping section About.
 */
export const Astronaut: React.FC = () => {
  const astronautGroupRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const { isReduced } = useMotion();
  const { sceneStateRef } = useScene();

  useFrame((state) => {
    if (!astronautGroupRef.current || isReduced) return;

    const t = state.clock.elapsedTime;
    // Gentle floating motion (bobbing & subtle rotation in microgravity)
    astronautGroupRef.current.position.y = -2.6 + Math.sin(t * 0.8) * 0.12;
    astronautGroupRef.current.rotation.x = 0.15 + Math.sin(t * 0.4) * 0.08;
    astronautGroupRef.current.rotation.y = -0.35 + Math.cos(t * 0.35) * 0.12;
    astronautGroupRef.current.rotation.z = Math.sin(t * 0.5) * 0.06;

    // Easter egg hand wave
    const isWaving = (sceneStateRef.current.astronautWaveUntil || 0) > Date.now();
    if (rightArmRef.current) {
      if (isWaving) {
        rightArmRef.current.rotation.x = -1.3;
        rightArmRef.current.rotation.z = -0.4 + Math.sin(t * 9) * 0.5;
      } else {
        rightArmRef.current.rotation.x = -0.5;
        rightArmRef.current.rotation.z = -0.6;
      }
    }
  });

  return (
    <group
      ref={astronautGroupRef}
      position={[2.5, -2.6, 0.2]}
      scale={[0.48, 0.48, 0.48]}
      rotation={[0.15, -0.35, 0]}
    >
      {/* 1. Helmet (Helm Putih Bertepi Bulat) */}
      <mesh position={[0, 0.82, 0]}>
        <sphereGeometry args={[0.32, 24, 24]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} metalness={0.4} />
      </mesh>

      {/* 2. Gold Reflective Visor (Kaca Pelindung Reflektif Emas/Amber) */}
      <mesh position={[0, 0.82, 0.16]} rotation={[0.1, 0, 0]}>
        <sphereGeometry args={[0.24, 20, 20, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial
          color="#f59e0b"
          roughness={0.08}
          metalness={0.96}
          emissive="#78350f"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* 3. Torso (Baju Antariksa Ruang Angkasa) */}
      <mesh position={[0, 0.28, 0]}>
        <boxGeometry args={[0.48, 0.62, 0.32]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Chest Control Module */}
      <mesh position={[0, 0.36, 0.18]}>
        <boxGeometry args={[0.26, 0.22, 0.06]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* 4. PLSS Life Support Backpack (Tabung Oksigen & Punggung) */}
      <mesh position={[0, 0.3, -0.24]}>
        <boxGeometry args={[0.42, 0.58, 0.22]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* Twin Oxygen Tanks */}
      <mesh position={[-0.12, 0.35, -0.34]}>
        <cylinderGeometry args={[0.07, 0.07, 0.44, 12]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[0.12, 0.35, -0.34]}>
        <cylinderGeometry args={[0.07, 0.07, 0.44, 12]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* 5. Left Arm Floating */}
      <group position={[-0.34, 0.46, 0]} rotation={[0.4, 0, 0.5]}>
        <mesh position={[0, -0.22, 0]}>
          <cylinderGeometry args={[0.09, 0.08, 0.42, 12]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.7} metalness={0.2} />
        </mesh>
        {/* Glove */}
        <mesh position={[0, -0.46, 0]}>
          <sphereGeometry args={[0.09, 12, 12]} />
          <meshStandardMaterial color="#64748b" roughness={0.8} metalness={0.3} />
        </mesh>
      </group>

      {/* 6. Right Arm Waving Forward */}
      <group ref={rightArmRef} position={[0.34, 0.46, 0]} rotation={[-0.5, 0.2, -0.6]}>
        <mesh position={[0, -0.22, 0]}>
          <cylinderGeometry args={[0.09, 0.08, 0.42, 12]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.7} metalness={0.2} />
        </mesh>
        {/* Glove */}
        <mesh position={[0, -0.46, 0]}>
          <sphereGeometry args={[0.09, 12, 12]} />
          <meshStandardMaterial color="#64748b" roughness={0.8} metalness={0.3} />
        </mesh>
      </group>

      {/* 7. Legs Bent in Spacewalk */}
      <group position={[-0.14, -0.12, 0]} rotation={[0.3, 0, 0.1]}>
        <mesh position={[0, -0.32, 0]}>
          <cylinderGeometry args={[0.1, 0.09, 0.5, 12]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.7} metalness={0.2} />
        </mesh>
        <mesh position={[0, -0.62, 0.06]}>
          <boxGeometry args={[0.14, 0.12, 0.24]} />
          <meshStandardMaterial color="#475569" roughness={0.8} metalness={0.3} />
        </mesh>
      </group>

      <group position={[0.14, -0.12, 0]} rotation={[-0.2, 0, -0.15]}>
        <mesh position={[0, -0.32, 0]}>
          <cylinderGeometry args={[0.1, 0.09, 0.5, 12]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.7} metalness={0.2} />
        </mesh>
        <mesh position={[0, -0.62, 0.06]}>
          <boxGeometry args={[0.14, 0.12, 0.24]} />
          <meshStandardMaterial color="#475569" roughness={0.8} metalness={0.3} />
        </mesh>
      </group>
    </group>
  );
};
