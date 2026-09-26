// src/components/scene/FallbackPoster.tsx
import React from 'react';
import { useMotion } from '@/app/providers/MotionProvider';
import { useScene } from '@/app/providers/SceneProvider';

export const FallbackPoster: React.FC = () => {
  const { isReduced } = useMotion();
  const { webglSupported, isContextLost } = useScene();

  const showPoster = !webglSupported || isContextLost || isReduced;

  if (!showPoster) return null;

  return (
    <div
      className="webgl-poster-fallback"
      aria-hidden="true"
      style={{ opacity: 1 }}
    >
      <div className="webgl-poster-planet" />
      {/* Decorative CSS stars */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(1.5px 1.5px at 20px 30px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 40px 70px, #93c5fd, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 90px 40px, #fcd34d, rgba(0,0,0,0)), radial-gradient(2px 2px at 160px 120px, #ffffff, rgba(0,0,0,0))',
          backgroundRepeat: 'repeat',
          backgroundSize: '250px 250px',
          opacity: 0.65,
        }}
      />
    </div>
  );
};
