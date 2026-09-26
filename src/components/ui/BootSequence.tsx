// src/components/ui/BootSequence.tsx
import React, { useState, useEffect } from 'react';
import { useMotion } from '@/app/providers/MotionProvider';

interface BootSequenceProps {
  onComplete?: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const { isReduced } = useMotion();
  const [step, setStep] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const messages = [
    'INITIALIZING XEVRYN SYSTEM...',
    'LOADING COSMIC ENVIRONMENT...',
    'ESTABLISHING CONNECTION...',
  ];

  useEffect(() => {
    // If reduced motion is requested or already seen, skip immediately
    if (isReduced) {
      setIsDismissed(true);
      if (onComplete) onComplete();
      return;
    }

    const t1 = setTimeout(() => setStep(1), 380);
    const t2 = setTimeout(() => setStep(2), 760);
    const t3 = setTimeout(() => {
      setIsFading(true);
      const t4 = setTimeout(() => {
        setIsDismissed(true);
        if (onComplete) onComplete();
      }, 450);
      return () => clearTimeout(t4);
    }, 1150);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isReduced, onComplete]);

  if (isDismissed) return null;

  return (
    <div
      className={`cosmic-boot-overlay ${isFading ? 'is-fading' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Boot sequence loading"
    >
      <div className="boot-terminal-box">
        <div className="boot-header">
          <span className="boot-dot red" />
          <span className="boot-dot yellow" />
          <span className="boot-dot green" />
          <span className="boot-title">XEVRYN-SYS // V2.0-CORE</span>
        </div>

        <div className="boot-body">
          {messages.slice(0, step + 1).map((msg, idx) => (
            <div key={idx} className="boot-line">
              <span className="boot-prompt">&gt;</span>
              <span className="boot-text">{msg}</span>
              {idx === step && <span className="boot-cursor" aria-hidden="true">_</span>}
            </div>
          ))}
        </div>

        <div className="boot-progress-bar">
          <div
            className="boot-progress-fill"
            style={{ width: `${((step + 1) / messages.length) * 100}%` }}
          />
        </div>

        <button
          type="button"
          onClick={() => {
            setIsDismissed(true);
            if (onComplete) onComplete();
          }}
          className="boot-skip-btn"
        >
          [LEWATI]
        </button>
      </div>

      <style>{`
        .cosmic-boot-overlay {
          position: fixed;
          inset: 0;
          z-index: 100000;
          background: #05050a;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 1;
          transition: opacity 0.45s ease-out;
        }

        .cosmic-boot-overlay.is-fading {
          opacity: 0;
          pointer-events: none;
        }

        .boot-terminal-box {
          width: 90%;
          max-width: 440px;
          background: rgba(10, 14, 26, 0.95);
          border: 1px solid rgba(56, 189, 248, 0.3);
          border-radius: 12px;
          box-shadow: 0 0 40px rgba(56, 189, 248, 0.15), inset 0 0 20px rgba(0, 0, 0, 0.8);
          padding: 16px 20px 20px;
          font-family: 'Space Grotesk', monospace, sans-serif;
          position: relative;
        }

        .boot-header {
          display: flex;
          align-items: center;
          gap: 6px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 16px;
        }

        .boot-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .boot-dot.red { background: #ef4444; }
        .boot-dot.yellow { background: #eab308; }
        .boot-dot.green { background: #22c55e; }

        .boot-title {
          margin-left: 8px;
          font-size: 11px;
          color: #94a3b8;
          letter-spacing: 0.1em;
        }

        .boot-body {
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-height: 80px;
        }

        .boot-line {
          font-size: 13px;
          color: #38bdf8;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .boot-prompt {
          color: #c084fc;
          font-weight: bold;
        }

        .boot-cursor {
          display: inline-block;
          animation: blink 0.7s infinite;
          color: #38bdf8;
          font-weight: bold;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .boot-progress-bar {
          height: 3px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 3px;
          overflow: hidden;
          margin-top: 20px;
        }

        .boot-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #38bdf8, #c084fc);
          transition: width 0.3s ease-out;
        }

        .boot-skip-btn {
          position: absolute;
          bottom: -32px;
          right: 0;
          background: transparent;
          border: none;
          color: #64748b;
          font-family: inherit;
          font-size: 11px;
          cursor: pointer;
          letter-spacing: 0.1em;
          transition: color 0.15s ease;
        }

        .boot-skip-btn:hover {
          color: #94a3b8;
        }
      `}</style>
    </div>
  );
};
