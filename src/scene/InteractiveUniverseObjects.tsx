// src/scene/InteractiveUniverseObjects.tsx

import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useUniverse } from '@/app/providers/UniverseProvider';
import { useMotion } from '@/app/providers/MotionProvider';
import { CELESTIAL_OBJECTS } from '@/content/celestialObjects';
import { CelestialObjectMeta } from '@/types/universe';

/**
 * Creates an anti-aliased 2D canvas texture for 3D billboard labels
 */
function createObjectLabelTexture(title: string, category: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  // Background rounded capsule
  ctx.fillStyle = 'rgba(8, 14, 28, 0.85)';
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.roundRect(16, 16, 480, 96, 24);
  ctx.fill();
  ctx.stroke();

  // Category pill
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 22px monospace';
  ctx.fillText(category, 36, 52);

  // Title
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 30px sans-serif';
  ctx.fillText(title, 36, 88);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

const SingleInteractiveObject: React.FC<{
  obj: CelestialObjectMeta;
  onFocus: (obj: CelestialObjectMeta) => void;
  onHover: (obj: CelestialObjectMeta | null) => void;
  isFocused: boolean;
  isHovered: boolean;
}> = ({ obj, onFocus, onHover, isFocused, isHovered }) => {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const spriteRef = useRef<THREE.Sprite>(null);
  const { camera } = useThree();
  const { isReduced } = useMotion();

  const labelTexture = useMemo(
    () => createObjectLabelTexture(obj.name, obj.category),
    [obj.name, obj.category]
  );

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Rotate selection ring if focused or hovered
    if (ringRef.current && (isFocused || isHovered)) {
      ringRef.current.rotation.z += delta * (isFocused ? 1.5 : 0.8);
      ringRef.current.lookAt(camera.position);
    }

    // Distance-based billboard label opacity & scaling
    if (spriteRef.current) {
      const dist = camera.position.distanceTo(groupRef.current.position);
      // Visible between 3.5 and 28 units
      if (dist > 3.0 && dist < 28.0) {
        const fade = dist > 22.0 ? (28.0 - dist) / 6.0 : dist < 5.0 ? (dist - 3.0) / 2.0 : 1.0;
        spriteRef.current.visible = true;
        (spriteRef.current.material as THREE.SpriteMaterial).opacity = Math.max(0, Math.min(0.9, fade));
      } else {
        spriteRef.current.visible = false;
      }
    }
  });

  return (
    <group ref={groupRef} position={obj.position}>
      {/* 1. Invisible Raycasting Interaction Hit Mesh */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onFocus(obj);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
          onHover(obj);
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
          onHover(null);
        }}
      >
        <sphereGeometry args={[obj.radius * 1.35, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* 2. Visual Selection / Focus Reticle Ring */}
      {(isFocused || isHovered) && (
        <mesh ref={ringRef}>
          <ringGeometry args={[obj.radius * 1.3, obj.radius * 1.45, 48]} />
          <meshBasicMaterial
            color={isFocused ? '#fcd34d' : '#38bdf8'}
            side={THREE.DoubleSide}
            transparent
            opacity={isFocused ? 0.85 : 0.55}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* 3. Distance-Aware 3D Billboard Label */}
      {!isReduced && (
        <sprite
          ref={spriteRef}
          position={[0, obj.radius + 1.2, 0]}
          scale={[3.2, 0.8, 1]}
        >
          <spriteMaterial
            map={labelTexture}
            transparent
            opacity={0.8}
            depthTest={false}
            depthWrite={false}
          />
        </sprite>
      )}
    </group>
  );
};

export const InteractiveUniverseObjects: React.FC = () => {
  const {
    navigationMode,
    focusedObject,
    hoveredObject,
    focusCelestialObject,
    setHoveredObject,
  } = useUniverse();

  // In cinematic mode, render minimal interaction without cluttering DOM
  const isExplore = navigationMode === 'explore';

  return (
    <group name="interactive-universe-layer">
      {CELESTIAL_OBJECTS.map((obj) => (
        <SingleInteractiveObject
          key={obj.id}
          obj={obj}
          onFocus={focusCelestialObject}
          onHover={setHoveredObject}
          isFocused={focusedObject?.id === obj.id}
          isHovered={isExplore && hoveredObject?.id === obj.id}
        />
      ))}
    </group>
  );
};
