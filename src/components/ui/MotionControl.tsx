// src/components/ui/MotionControl.tsx
import React from 'react';
import { useMotion } from '@/app/providers/MotionProvider';
import { MotionMode } from '@/types/motion';

export const MotionControl: React.FC = () => {
  const { mode, setMode } = useMotion();

  const modes: { key: MotionMode; label: string; ariaLabel: string }[] = [
    { key: 'full', label: 'Full', ariaLabel: 'Full cinematic motion with 3D camera effects' },
    { key: 'lite', label: 'Lite', ariaLabel: 'Lite motion with reduced rendering overhead' },
    { key: 'reduced', label: 'Reduced', ariaLabel: 'Reduced motion mode, zero continuous movement' },
  ];

  return (
    <div className="motion-toggle" role="radiogroup" aria-label="Motion Experience Mode">
      {modes.map((item) => (
        <button
          key={item.key}
          type="button"
          role="radio"
          aria-checked={mode === item.key}
          aria-label={item.ariaLabel}
          className={`motion-btn ${mode === item.key ? 'active' : ''}`}
          onClick={() => setMode(item.key)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
