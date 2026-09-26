// src/components/ui/InteractiveCursor.tsx
import React, { useEffect, useState, useRef } from 'react';

export type CursorMode = 'default' | 'explore' | 'open' | 'visit' | 'drag';

export const InteractiveCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<CursorMode>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Detect touch / coarse pointer devices to disable custom cursor
    if (typeof window === 'undefined') return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Determine cursor state based on target element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('[data-cursor="open"]') || target.closest('.project-planet-trigger') || target.closest('.project-card')) {
        setMode('open');
      } else if (target.closest('[data-cursor="explore"]') || target.closest('.skill-node') || target.closest('.celestial-trigger') || target.closest('.station-card')) {
        setMode('explore');
      } else if (target.closest('a[target="_blank"]') || target.closest('[data-cursor="visit"]')) {
        setMode('visit');
      } else if (target.closest('[data-cursor="drag"]') || target.closest('.draggable-area')) {
        setMode('drag');
      } else if (target.closest('a') || target.closest('button') || target.closest('[role="button"]')) {
        setMode('explore');
      } else {
        setMode('default');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const render = () => {
      // Smooth lerp following
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  const getLabel = () => {
    switch (mode) {
      case 'explore':
        return 'EXPLORE';
      case 'open':
        return 'OPEN';
      case 'visit':
        return 'VISIT ↗';
      case 'drag':
        return 'DRAG';
      default:
        return '';
    }
  };

  return (
    <div
      ref={cursorRef}
      className={`cosmic-custom-cursor ${mode !== 'default' ? 'has-badge' : ''} ${isVisible ? 'visible' : ''}`}
      aria-hidden="true"
    >
      <div className="cursor-dot" />
      {mode !== 'default' && (
        <span className="cursor-badge">
          {getLabel()}
        </span>
      )}

      <style>{`
        .cosmic-custom-cursor {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 99999;
          will-change: transform;
          opacity: 0;
          transition: opacity 0.2s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .cosmic-custom-cursor.visible {
          opacity: 1;
        }

        .cursor-dot {
          width: 8px;
          height: 8px;
          background: #38bdf8;
          border-radius: 50%;
          box-shadow: 0 0 10px #38bdf8, 0 0 20px rgba(56, 189, 248, 0.6);
          transform: translate(-50%, -50%);
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s ease;
        }

        .cosmic-custom-cursor.has-badge .cursor-dot {
          transform: translate(-50%, -50%) scale(1.6);
          background: #c084fc;
          box-shadow: 0 0 12px #c084fc, 0 0 24px rgba(192, 132, 252, 0.8);
        }

        .cursor-badge {
          font-family: 'Space Grotesk', monospace, sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #f8fafc;
          background: rgba(15, 23, 42, 0.85);
          border: 1px solid rgba(56, 189, 248, 0.4);
          padding: 2px 8px;
          border-radius: 12px;
          backdrop-filter: blur(8px);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          animation: badgePop 0.18s ease-out;
          white-space: nowrap;
        }

        @keyframes badgePop {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};
