// src/scene/CosmicCanvas.tsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useScene } from '@/app/providers/SceneProvider';
import { useMotion } from '@/app/providers/MotionProvider';
import { Planet } from '@/scene/Planet';
import { CelestialBodies } from '@/scene/CelestialBodies';
import { SunSource } from '@/scene/SunSource';
import { AsteroidBelt } from '@/scene/AsteroidBelt';
import { Spacecraft } from '@/scene/Spacecraft';
import { Astronaut } from '@/scene/Astronaut';
import { Satellite } from '@/scene/Satellite';
import { Comet } from '@/scene/Comet';
import { Starfield } from '@/scene/Starfield';
import { Nebula } from '@/scene/Nebula';
import { Warp } from '@/scene/Warp';
import { Horizon } from '@/scene/Horizon';
import { CameraRig } from '@/scene/CameraRig';

export const CosmicCanvas: React.FC = () => {
  const { webglSupported, isContextLost, setContextLost } = useScene();
  const { isReduced } = useMotion();

  if (!webglSupported || isContextLost) {
    return null;
  }

  return (
    <div className="canvas-container" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
            console.warn('[XEVRYN] WebGL Context Lost. Switching to fallback poster.');
            setContextLost(true);
          });
          gl.domElement.addEventListener('webglcontextrestored', () => {
            console.info('[XEVRYN] WebGL Context Restored.');
            setContextLost(false);
          });
        }}
      >
        <Suspense fallback={null}>
          {/* 1. Subtle Deep Space Ambient (Reveals faint rock detail on dark side) */}
          <ambientLight intensity={0.22} color="#64748b" />

          {/* 2. Primary Side/Top Key Light (Sweeps across rocky craters and terminator) */}
          <directionalLight
            position={[-4.5, 3.2, 3.8]}
            intensity={3.2}
            color="#f8fafc"
          />

          {/* 3. Soft Far-Side Rim/Fill Light */}
          <directionalLight
            position={[5.0, -2.8, -2.5]}
            intensity={0.4}
            color="#38bdf8"
          />

          {/* 4. Distant Sun / Stellar Glow Source */}
          <SunSource />

          {/* 5. Deep Space Background: Stars, Gas Nebula, and Flyby Comet */}
          <Starfield />
          <Nebula />
          <Comet />

          {/* 6. Primary Rocky Planet with Natural Craters & Orbiting Moon */}
          <Planet />

          {/* 7. Multi-character Planetary Worlds (Ocean World, Red Planet, Gas Giant, Ringed World) */}
          <CelestialBodies />

          {/* 8. Asteroid Belt Instanced Rock Stream */}
          <AsteroidBelt />

          {/* 9. Active Space Activity: Spacewalking Astronaut & Traveling Spacecraft */}
          <Astronaut />
          <Spacecraft />

          {/* 10. Communication Satellites (Experience station & Skills relay) */}
          <Satellite position={[-2.4, -5.8, -1.2]} scale={0.45} />
          <Satellite position={[2.6, -15.5, -2.2]} scale={0.32} />

          {/* 11. Warp Speed Star Tunnel */}
          <Warp />

          {/* 12. Contact Planet Horizon Curvature */}
          <Horizon />

          {/* 13. Smooth Camera Interpolation */}
          {!isReduced && <CameraRig />}
        </Suspense>
      </Canvas>
    </div>
  );
};
