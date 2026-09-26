// src/scene/AsteroidBelt.tsx
import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMotion } from '@/app/providers/MotionProvider';

/**
 * Procedural Multi-Form Asteroid Belt
 * Menggunakan dua grup InstancedMesh (Dodecahedron & Octahedron) dengan deformasi
 * skala non-uniform (lonjong, pipih, bongkahan bersudut) dan palet warna per-instance
 * (batuan karbonat gelap, silikat abu-abu, dan mineral besi kecokelatan).
 */
export const AsteroidBelt: React.FC = () => {
  const { isReduced, isLite } = useMotion();
  const totalCount = isLite ? 44 : 110;
  const count1 = Math.floor(totalCount * 0.6);
  const count2 = totalCount - count1;

  const mesh1Ref = useRef<THREE.InstancedMesh>(null);
  const mesh2Ref = useRef<THREE.InstancedMesh>(null);

  // Palet mineral asteroid
  const rockColors = [
    new THREE.Color('#334155'), // Karbonat gelap
    new THREE.Color('#475569'), // Silikat abu-abu
    new THREE.Color('#64748b'), // Batuan terang
    new THREE.Color('#57534e'), // Mineral besi
    new THREE.Color('#78716c'), // Batu teroksidasi
  ];

  // Generator data asteroid
  const generateAsteroidStream = (count: number, offsetAngle: number) => {
    const list: { pos: THREE.Vector3; rot: THREE.Euler; scale: THREE.Vector3; rotSpeed: THREE.Vector3; color: THREE.Color }[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + offsetAngle + (Math.random() - 0.5) * 0.35;
      const radiusX = 14 + (Math.random() - 0.5) * 6;
      const radiusZ = 12 + (Math.random() - 0.5) * 5;
      const y = -10 + (Math.random() - 0.5) * 4 + Math.sin(angle) * 2.5;

      const x = Math.cos(angle) * radiusX;
      const z = Math.sin(angle) * radiusZ - 12;

      // Variasi skala non-uniform (tidak seragam polihedral)
      const baseScale = 0.12 + Math.random() * 0.36;
      const sx = baseScale * (0.7 + Math.random() * 0.6);
      const sy = baseScale * (0.6 + Math.random() * 0.8);
      const sz = baseScale * (0.8 + Math.random() * 0.5);

      const rot = new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      const rotSpeed = new THREE.Vector3(
        (Math.random() - 0.5) * 0.28,
        (Math.random() - 0.5) * 0.36,
        (Math.random() - 0.5) * 0.28
      );

      const color = rockColors[Math.floor(Math.random() * rockColors.length)];

      list.push({ pos: new THREE.Vector3(x, y, z), rot, scale: new THREE.Vector3(sx, sy, sz), rotSpeed, color });
    }
    return list;
  };

  const stream1 = useMemo(() => generateAsteroidStream(count1, 0.0), [count1]);
  const stream2 = useMemo(() => generateAsteroidStream(count2, 0.5), [count2]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (mesh1Ref.current) {
      stream1.forEach((ast, i) => {
        dummy.position.copy(ast.pos);
        dummy.rotation.copy(ast.rot);
        dummy.scale.copy(ast.scale);
        dummy.updateMatrix();
        mesh1Ref.current!.setMatrixAt(i, dummy.matrix);
        mesh1Ref.current!.setColorAt(i, ast.color);
      });
      mesh1Ref.current.instanceMatrix.needsUpdate = true;
      if (mesh1Ref.current.instanceColor) mesh1Ref.current.instanceColor.needsUpdate = true;
    }

    if (mesh2Ref.current) {
      stream2.forEach((ast, i) => {
        dummy.position.copy(ast.pos);
        dummy.rotation.copy(ast.rot);
        dummy.scale.copy(ast.scale);
        dummy.updateMatrix();
        mesh2Ref.current!.setMatrixAt(i, dummy.matrix);
        mesh2Ref.current!.setColorAt(i, ast.color);
      });
      mesh2Ref.current.instanceMatrix.needsUpdate = true;
      if (mesh2Ref.current.instanceColor) mesh2Ref.current.instanceColor.needsUpdate = true;
    }
  }, [stream1, stream2, dummy]);

  useFrame((_, delta) => {
    if (isReduced) return;

    if (mesh1Ref.current) {
      stream1.forEach((ast, i) => {
        ast.rot.x += ast.rotSpeed.x * delta;
        ast.rot.y += ast.rotSpeed.y * delta;
        ast.rot.z += ast.rotSpeed.z * delta;

        dummy.position.copy(ast.pos);
        dummy.rotation.copy(ast.rot);
        dummy.scale.copy(ast.scale);
        dummy.updateMatrix();
        mesh1Ref.current!.setMatrixAt(i, dummy.matrix);
      });
      mesh1Ref.current.instanceMatrix.needsUpdate = true;
    }

    if (mesh2Ref.current) {
      stream2.forEach((ast, i) => {
        ast.rot.x += ast.rotSpeed.x * delta;
        ast.rot.y += ast.rotSpeed.y * delta;
        ast.rot.z += ast.rotSpeed.z * delta;

        dummy.position.copy(ast.pos);
        dummy.rotation.copy(ast.rot);
        dummy.scale.copy(ast.scale);
        dummy.updateMatrix();
        mesh2Ref.current!.setMatrixAt(i, dummy.matrix);
      });
      mesh2Ref.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group name="asteroid-belt-system">
      {/* Tipe 1: Batuan Dodecahedron Bersudut Beralur */}
      <instancedMesh
        ref={mesh1Ref}
        args={[undefined, undefined, count1]}
      >
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial roughness={0.94} metalness={0.12} flatShading />
      </instancedMesh>

      {/* Tipe 2: Pecahan Serpihan Runcing Octahedron */}
      <instancedMesh
        ref={mesh2Ref}
        args={[undefined, undefined, count2]}
      >
        <octahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial roughness={0.96} metalness={0.18} flatShading />
      </instancedMesh>
    </group>
  );
};
