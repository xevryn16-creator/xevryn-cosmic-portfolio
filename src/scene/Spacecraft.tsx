// src/scene/Spacecraft.tsx
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScene } from '@/app/providers/SceneProvider';
import { useMotion } from '@/app/providers/MotionProvider';

/**
 * Procedural Spacecraft (Roket Penjelajah)
 * Mengikuti jalur kurva 3D kontinu melintasi seluruh perjalanan tata surya:
 * Hero -> About -> Experience -> Work -> Skills -> Contact (meluncur keluar ke angkasa luar).
 * Arah haluan roket selalu selaras secara matematis dengan tangen jalurnya.
 */
export const Spacecraft: React.FC = () => {
  const craftGroupRef = useRef<THREE.Group>(null);
  const exhaustPlumeRef = useRef<THREE.Mesh>(null);
  const coreFlameRef = useRef<THREE.Mesh>(null);
  const { sceneStateRef } = useScene();
  const { isReduced } = useMotion();

  // 3D Flight Path Spline yang sepenuhnya bebas tabrakan dari seluruh benda langit & horizon
  const flightCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.25, 1.65, 0.8),    // 0.00: Hero (Orbit planet utama di luar atmosfer aman)
      new THREE.Vector3(-0.4, 0.6, -0.2),    // 0.16: Transisi Hero -> About
      new THREE.Vector3(-1.8, -1.2, -0.8),   // 0.28: About (Melintas di kiri, astronot di kanan)
      new THREE.Vector3(0.0, -1.8, -1.2),    // 0.40: Transisi About -> Experience
      new THREE.Vector3(1.8, -2.6, -0.6),    // 0.52: Experience (Melintas di kanan, satelit di kiri)
      new THREE.Vector3(-0.8, -2.2, -1.5),   // 0.68: Work (Melintasi celah sabuk asteroid aman)
      new THREE.Vector3(0.6, -1.6, -0.5),    // 0.82: Skills (Melintas dekat relai konstelasi)
      new THREE.Vector3(1.4, -0.6, 1.2),     // 0.92: Contact (Melintas di atas garis lengkung fajar horizon)
      new THREE.Vector3(4.5, 2.2, 2.8),      // 1.00: Exit (Meluncur naik ke angkasa luar meninggalkan scene)
    ]);
  }, []);

  useFrame((state) => {
    if (!craftGroupRef.current) return;

    // Progress mengalir kontinu 0.0 - 1.0 dari scroll global
    const progress = Math.min(0.999, Math.max(0.001, sceneStateRef.current.progress || 0));

    // Dapatkan posisi dan tangen arah gerak pada kurva
    const point = flightCurve.getPointAt(progress);
    const tangent = flightCurve.getTangentAt(progress);

    // Micro-wobble jika bukan reduced motion
    const wobbleY = isReduced ? 0 : Math.sin(state.clock.elapsedTime * 4.5) * 0.025;
    const wobbleX = isReduced ? 0 : Math.cos(state.clock.elapsedTime * 3.5) * 0.015;

    craftGroupRef.current.position.set(point.x + wobbleX, point.y + wobbleY, point.z);

    // Orientasikan badan roket sejajar dengan arah gerak (tangent)
    // Model roket dibangun vertikal sepanjang sumbu Y positif, jadi arahkan sumbu Y lokal ke tangent
    const upVector = new THREE.Vector3(0, 0, 1);
    const matrix = new THREE.Matrix4();
    matrix.lookAt(new THREE.Vector3(0, 0, 0), tangent, upVector);
    
    // Rotasikan kuaternion agar moncong roket menghadap ke depan
    const rotation = new THREE.Euler().setFromRotationMatrix(matrix);
    // Tambahkan koreksi offset rotasi lokal
    craftGroupRef.current.rotation.x = THREE.MathUtils.lerp(craftGroupRef.current.rotation.x, rotation.x - Math.PI / 2, 0.08);
    craftGroupRef.current.rotation.y = THREE.MathUtils.lerp(craftGroupRef.current.rotation.y, rotation.y, 0.08);
    craftGroupRef.current.rotation.z = THREE.MathUtils.lerp(craftGroupRef.current.rotation.z, rotation.z, 0.08);

    // Pulsating engine exhaust flame
    if (!isReduced) {
      if (exhaustPlumeRef.current) {
        const pulse = 1.0 + Math.sin(state.clock.elapsedTime * 32) * 0.28 + (Math.random() - 0.5) * 0.15;
        exhaustPlumeRef.current.scale.set(1.0, pulse, 1.0);
      }
      if (coreFlameRef.current) {
        const corePulse = 1.0 + Math.sin(state.clock.elapsedTime * 40) * 0.2;
        coreFlameRef.current.scale.set(1.0, corePulse, 1.0);
      }
    }
  });

  return (
    <group ref={craftGroupRef} scale={[0.34, 0.34, 0.34]} position={[0.9, 1.2, 0.4]}>
      {/* 1. Main Fuselage (Badan Silinder Aerodinamis Roket) */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.26, 1.3, 20]} />
        <meshStandardMaterial
          color="#f8fafc"
          roughness={0.32}
          metalness={0.68}
        />
      </mesh>

      {/* Detail Panel Lines pada Badan Roket */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.224, 0.224, 0.04, 20]} />
        <meshStandardMaterial color="#0284c7" roughness={0.4} metalness={0.7} />
      </mesh>
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.244, 0.244, 0.04, 20]} />
        <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* 2. Aerodynamic Nose Cone (Moncong Hidung Roket) */}
      <mesh position={[0, 0.95, 0]}>
        <coneGeometry args={[0.22, 0.65, 20]} />
        <meshStandardMaterial
          color="#0284c7"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* 3. Cockpit Sensor / Canopy Window */}
      <mesh position={[0, 0.48, 0.13]} rotation={[0.22, 0, 0]}>
        <boxGeometry args={[0.18, 0.12, 0.15]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* 4. Stabilizer Fins (3 Sirip Penyeimbang di Ekor) */}
      {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((angle, i) => (
        <group key={i} rotation={[0, angle, 0]}>
          <mesh position={[0.3, -0.46, 0]} rotation={[0, 0, -0.25]}>
            <boxGeometry args={[0.24, 0.48, 0.025]} />
            <meshStandardMaterial
              color="#0f172a"
              roughness={0.35}
              metalness={0.65}
            />
          </mesh>
        </group>
      ))}

      {/* 5. Engine Nozzle (Corong Mesin Pendorong) */}
      <mesh position={[0, -0.74, 0]}>
        <cylinderGeometry args={[0.21, 0.14, 0.22, 20]} />
        <meshStandardMaterial
          color="#1e293b"
          roughness={0.5}
          metalness={0.85}
        />
      </mesh>

      {/* 6. Thrust Exhaust Flame Plume (Semburan Api Luar Cyan) */}
      <mesh ref={exhaustPlumeRef} position={[0, -1.25, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.18, 0.85, 16]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.82}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Inti Api Dalam (Kuning-Oranye Terang) */}
      <mesh ref={coreFlameRef} position={[0, -1.02, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.095, 0.48, 16]} />
        <meshBasicMaterial
          color="#fbbf24"
          transparent
          opacity={0.95}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};
