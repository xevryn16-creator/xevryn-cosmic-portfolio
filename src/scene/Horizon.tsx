// src/scene/Horizon.tsx
/**
 * XEVRYN Cosmic Portfolio - Cinematic Planet Horizon (ANM-053)
 * Gentle planetary curvature emerging strictly at the bottom 25-30% of viewport,
 * preserving deep dark space above, with a delicate atmospheric dawn crest.
 */

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScene } from '@/app/providers/SceneProvider';
import { useMotion } from '@/app/providers/MotionProvider';

/**
 * Shader for the narrow atmospheric glow strip along the planet horizon crest.
 * Prevents full-screen cyan wash and confines luminosity strictly to the horizon edge.
 */
const HorizonAtmosphereShader = {
  uniforms: {
    uColor: { value: new THREE.Color('#38BDF8') },
    uIntensity: { value: 0.0 },
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    uniform float uIntensity;
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      // Glow is concentrated at the crest (vUv.y ~ 0.5) and fades rapidly
      float edge = sin(vUv.y * 3.14159);
      float glow = pow(edge, 3.0) * uIntensity;
      if (glow < 0.005) discard;
      gl_FragColor = vec4(uColor, glow * 0.55);
    }
  `,
};

export const Horizon: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const atmosphereMatRef = useRef<THREE.ShaderMaterial | null>(null);
  const { sceneStateRef } = useScene();
  const { isReduced } = useMotion();

  const atmosphereMaterial = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(HorizonAtmosphereShader.uniforms),
      vertexShader: HorizonAtmosphereShader.vertexShader,
      fragmentShader: HorizonAtmosphereShader.fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.FrontSide,
      depthWrite: false,
    });
    atmosphereMatRef.current = mat;
    return mat;
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    if (isReduced) {
      groupRef.current.position.y = -22.6;
      groupRef.current.visible = true;
      if (atmosphereMatRef.current) {
        atmosphereMatRef.current.uniforms.uIntensity.value = 0.5;
      }
      return;
    }

    const horizonRise = sceneStateRef.current.target.horizonRise ?? 0;

    // Radius is 20. Submerged resting position at y = -34.0 (crest at -14.0, below frustum).
    // When rising at Contact, smoothly ascends to y = -22.4 (crest at -2.4, bottom 25% of viewport).
    const targetY = -34.0 + horizonRise * 11.6;
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.08);

    if (atmosphereMatRef.current) {
      atmosphereMatRef.current.uniforms.uIntensity.value = THREE.MathUtils.lerp(
        atmosphereMatRef.current.uniforms.uIntensity.value,
        horizonRise * 0.75,
        0.08
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -34.0, -4.5]}>
      {/* 1. Giant Curved Planetary Sphere */}
      <mesh>
        <sphereGeometry args={[20.0, 64, 32]} />
        <meshStandardMaterial
          color="#060911"
          roughness={0.92}
          metalness={0.08}
        />
      </mesh>

      {/* 2. Narrow Atmospheric Glow Crescent Ribbon along Top Crest */}
      <mesh position={[0, 0.06, 0.2]}>
        <sphereGeometry args={[20.06, 64, 16, 0, Math.PI * 2, 0, Math.PI * 0.35]} />
        <primitive object={atmosphereMaterial} attach="material" />
      </mesh>
    </group>
  );
};
