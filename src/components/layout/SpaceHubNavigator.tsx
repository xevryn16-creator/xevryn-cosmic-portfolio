// src/components/layout/SpaceHubNavigator.tsx
import React, { useState, useEffect } from 'react';
import { useScene } from '@/app/providers/SceneProvider';

const JOURNEY_STOPS = [
  { id: 'hero', label: '01 Orbit', icon: '☀️' },
  { id: 'about', label: '02 Tentang', icon: '👨‍🚀' },
  { id: 'focus-areas', label: '03 Bidang', icon: '💠' },
  { id: 'work', label: '04 Karya', icon: '💻' },
  { id: 'more-projects', label: '05 Lainnya', icon: '📦' },
  { id: 'roblox', label: '06 Roblox', icon: '⚡' },
  { id: 'atomic-hub-section', label: '07 Atomic', icon: '🎯' },
  { id: 'experience', label: '08 Kerja', icon: '☕' },
  { id: 'skills', label: '09 Keahlian', icon: '✨' },
  { id: 'exploration-deck', label: '10 Observasi', icon: '🪐' },
  { id: 'contact', label: '11 Horizon', icon: '📡' },
];

export const SpaceHubNavigator: React.FC = () => {
  const { triggerAstronautWave, triggerSatellitePulse } = useScene();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Monitor active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (let i = JOURNEY_STOPS.length - 1; i >= 0; i--) {
        const el = document.getElementById(JOURNEY_STOPS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(JOURNEY_STOPS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAstronautWave = () => {
    triggerAstronautWave();
    showToast('👋 Astronaut membalas lambaian tangan Anda dari orbit!');
  };

  const handleSatellitePulse = () => {
    triggerSatellitePulse();
    showToast('📡 Satelit memancarkan denyut transmisi radio ke stasiun bumi!');
  };

  const handleJump = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <aside className="space-hub-navigator" aria-label="Navigasi Cepat & Kontrol Interaktif">
      {/* Toast Notification for Easter Eggs */}
      {toastMessage && (
        <div className="navigator-toast" role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-toggle-navigator"
        aria-expanded={isOpen}
        aria-label="Buka Peta Perjalanan & Easter Egg"
      >
        <span className="nav-icon" aria-hidden="true">
          🧭
        </span>
        <span className="nav-text">PETA ORBIT</span>
      </button>

      {/* Expanded Quick Jump Map & Easter Egg Panel */}
      {isOpen && (
        <div className="navigator-panel">
          <div className="panel-header">
            <div className="panel-title">
              <span className="panel-icon" aria-hidden="true">
                🗺️
              </span>
              <span>Peta Perjalanan Cepat</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="btn-close-panel"
              aria-label="Tutup panel navigasi cepat"
            >
              ✕
            </button>
          </div>

          {/* Quick Jump Buttons */}
          <div className="journey-stops-list" role="navigation" aria-label="Daftar Section">
            {JOURNEY_STOPS.map((stop) => (
              <button
                key={stop.id}
                onClick={() => handleJump(stop.id)}
                className={`stop-btn ${activeSection === stop.id ? 'active' : ''}`}
              >
                <span className="stop-icon" aria-hidden="true">
                  {stop.icon}
                </span>
                <span className="stop-label">{stop.label}</span>
                {activeSection === stop.id && <span className="active-dot" aria-hidden="true" />}
              </button>
            ))}
          </div>

          {/* Easter Eggs Controls */}
          <div className="easter-eggs-box">
            <div className="easter-title">✨ Sinyal Interaktif (Easter Eggs)</div>
            <div className="easter-buttons">
              <button
                onClick={handleAstronautWave}
                className="btn-easter"
                aria-label="Sapa Astronaut untuk melambaikan tangan"
              >
                👋 Sapa Astronaut
              </button>
              <button
                onClick={handleSatellitePulse}
                className="btn-easter"
                aria-label="Pancarkan gelombang transmisi satelit"
              >
                📡 Pancarkan Sinyal
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .space-hub-navigator {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 90;
          font-family: var(--font-sans, system-ui, sans-serif);
        }

        .navigator-toast {
          position: fixed;
          bottom: 84px;
          right: 24px;
          background: rgba(15, 23, 42, 0.95);
          border: 1px solid #38bdf8;
          color: #f8fafc;
          padding: 12px 18px;
          border-radius: 8px;
          font-size: 0.88rem;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(56, 189, 248, 0.25);
          backdrop-filter: blur(12px);
          animation: toastSlideUp 0.25s ease;
          max-width: 320px;
          z-index: 100;
        }

        @keyframes toastSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .btn-toggle-navigator {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(15, 23, 42, 0.85);
          border: 1px solid rgba(56, 189, 248, 0.4);
          color: #f8fafc;
          padding: 10px 16px;
          border-radius: 30px;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          cursor: pointer;
          backdrop-filter: blur(12px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5), 0 0 14px rgba(56, 189, 248, 0.2);
          transition: all 0.2s ease;
        }

        .btn-toggle-navigator:hover, .btn-toggle-navigator:focus-visible {
          background: rgba(56, 189, 248, 0.2);
          border-color: #38bdf8;
          transform: translateY(-2px);
          outline: none;
        }

        .navigator-panel {
          position: absolute;
          bottom: 50px;
          right: 0;
          width: 290px;
          background: rgba(10, 14, 26, 0.96);
          border: 1px solid rgba(56, 189, 248, 0.35);
          border-radius: 14px;
          padding: 18px;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(56, 189, 248, 0.15);
          backdrop-filter: blur(16px);
          animation: panelPop 0.2s ease;
        }

        @keyframes panelPop {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.15);
        }

        .panel-title {
          font-size: 0.9rem;
          font-weight: 700;
          color: #ffffff;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .btn-close-panel {
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 0.85rem;
          cursor: pointer;
          padding: 4px;
        }

        .btn-close-panel:hover {
          color: #ffffff;
        }

        .journey-stops-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
          max-height: 240px;
          overflow-y: auto;
          margin-bottom: 16px;
          padding-right: 4px;
        }

        .stop-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          border: none;
          color: #cbd5e1;
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 0.82rem;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s ease;
          width: 100%;
        }

        .stop-btn:hover, .stop-btn:focus-visible {
          background: rgba(56, 189, 248, 0.12);
          color: #ffffff;
          outline: none;
        }

        .stop-btn.active {
          background: rgba(56, 189, 248, 0.2);
          color: #38bdf8;
          font-weight: 700;
        }

        .active-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #38bdf8;
          box-shadow: 0 0 6px #38bdf8;
          margin-left: auto;
        }

        .easter-eggs-box {
          border-top: 1px solid rgba(148, 163, 184, 0.15);
          padding-top: 12px;
        }

        .easter-title {
          font-size: 0.75rem;
          color: #f59e0b;
          font-weight: 600;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .easter-buttons {
          display: flex;
          gap: 8px;
        }

        .btn-easter {
          flex: 1;
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid rgba(245, 158, 11, 0.3);
          color: #fef08a;
          padding: 6px 8px;
          border-radius: 6px;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .btn-easter:hover, .btn-easter:focus-visible {
          background: rgba(245, 158, 11, 0.2);
          border-color: #f59e0b;
          outline: none;
        }
      `}</style>
    </aside>
  );
};
