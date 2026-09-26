// src/scene/Comet.tsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMotion } from '@/app/providers/MotionProvider';

/**
 * Procedural Celestial Comet
 * Komet yang meluncur sesekali melintasi antariksa dengan inti es bercahaya
 * dan ekor debu partikel memanjang yang memudar halus.
 */
export const Comet: React.FC = () => {
  const cometGroupRef = useRef<THREE.Group>(null);
  const { isReduced } = useMotion();

  const startPos = new THREE.Vector3(-18, 14, -18);
  const endPos = new THREE.Vector3(18, -12, -8);

  useFrame((state) => {
    if (!cometGroupRef.current || isReduced) return;

    // Cycle every 16 seconds
    const cycleTime = (state.clock.elapsedTime % 16) / 4.5;

    if (cycleTime <= 1.0) {
      // In flight across the cosmos
      cometGroupRef.current.visible = true;
      cometGroupRef.current.position.lerpVectors(startPos, endPos, cycleTime);
    } else {
      // Hidden waiting for next flyby
      cometGroupRef.current.visible = false;
    }
  });

  return (
    <group ref={cometGroupRef} position={[-18, 14, -18]} rotation={[0, 0, -0.65]}>
      {/* Comet Nucleus (Inti Komet) */}
      <mesh>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Primary Ion Dust Tail */}
      <mesh position={[-0.8, 0.45, 0]} rotation={[0, 0, -0.55]}>
        <coneGeometry args={[0.18, 1.8, 8]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Faint Outer Halo */}
      <mesh position={[-1.4, 0.8, 0]} rotation={[0, 0, -0.55]}>
        <coneGeometry args={[0.32, 2.8, 8]} />
        <meshBasicMaterial
          color="#818cf8"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};
