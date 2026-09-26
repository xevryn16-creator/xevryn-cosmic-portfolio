// src/pages/OrbitCafePage.tsx
import React, { useState, useEffect, useRef } from 'react';

interface OrbitCafePageProps {
  onBack: () => void;
}

type AmbienceType = 'none' | 'space_hum' | 'cosmic_rain';

export const OrbitCafePage: React.FC<OrbitCafePageProps> = ({ onBack }) => {
  // -------------------------------------------------------------
  // FOCUS TIMER STATE (Accurate timestamp-based delta)
  // -------------------------------------------------------------
  const [timerDuration, setTimerDuration] = useState<number>(25 * 60); // 25 minutes default in seconds
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [timerStatus, setTimerStatus] = useState<'idle' | 'running' | 'paused'>('idle');
  const [focusMode, setFocusMode] = useState<boolean>(false);

  // References for timestamp calculation
  const endTimeRef = useRef<number>(0);
  const timerIntervalRef = useRef<number | null>(null);

  // Update timer display
  const updateTimer = () => {
    const now = Date.now();
    const remainingMs = endTimeRef.current - now;
    const remainingSec = Math.ceil(remainingMs / 1000);

    if (remainingSec <= 0) {
      setTimeLeft(0);
      setTimerStatus('idle');
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    } else {
      setTimeLeft(remainingSec);
    }
  };

  const handleStartTimer = () => {
    const durationToUse = timerStatus === 'paused' ? timeLeft : timerDuration;
    endTimeRef.current = Date.now() + durationToUse * 1000;
    setTimerStatus('running');

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = window.setInterval(updateTimer, 500);
  };

  const handlePauseTimer = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    const now = Date.now();
    const remainingSec = Math.max(0, Math.ceil((endTimeRef.current - now) / 1000));
    setTimeLeft(remainingSec);
    setTimerStatus('paused');
  };

  const handleResetTimer = (newDurationSec?: number) => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    const dur = newDurationSec !== undefined ? newDurationSec : timerDuration;
    setTimeLeft(dur);
    setTimerStatus('idle');
  };

  const handlePresetSelect = (mins: number) => {
    const sec = mins * 60;
    setTimerDuration(sec);
    handleResetTimer(sec);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  // Format MM:SS
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // -------------------------------------------------------------
  // PROCEDURAL WEB AUDIO AMBIENCE GENERATOR
  // (Zero external files, zero copyright, 100% legal & procedural)
  // -------------------------------------------------------------
  const [ambience, setAmbience] = useState<AmbienceType>('none');
  const [volume, setVolume] = useState<number>(0.35);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const noiseSourceRef = useRef<AudioNode | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);

  const stopAudio = () => {
    try {
      if (noiseSourceRef.current) {
        noiseSourceRef.current.disconnect();
        noiseSourceRef.current = null;
      }
      if (oscRef.current) {
        oscRef.current.stop();
        oscRef.current.disconnect();
        oscRef.current = null;
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    } catch {}
  };

  const startProceduralAmbience = (type: AmbienceType, vol: number) => {
    stopAudio();
    if (type === 'none') return;

    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) return;

      const ctx = new AudioCtxClass();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(vol, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      if (type === 'space_hum') {
        // Deep warm sub-bass cosmic hum (55Hz drone + lowpass)
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(55, ctx.currentTime);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(120, ctx.currentTime);

        osc.connect(filter);
        filter.connect(masterGain);
        osc.start();
        oscRef.current = osc;
      } else if (type === 'cosmic_rain') {
        // Procedural gentle pink noise filtered to simulate soft orbital rain
        const bufferSize = 2 * ctx.sampleRate;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
          b6 = white * 0.115926;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const rainFilter = ctx.createBiquadFilter();
        rainFilter.type = 'bandpass';
        rainFilter.frequency.setValueAtTime(800, ctx.currentTime);
        rainFilter.Q.setValueAtTime(1.2, ctx.currentTime);

        whiteNoise.connect(rainFilter);
        rainFilter.connect(masterGain);
        whiteNoise.start();
        noiseSourceRef.current = whiteNoise;
      }
    } catch {}
  };

  const handleAmbienceChange = (newType: AmbienceType) => {
    setAmbience(newType);
    startProceduralAmbience(newType, volume);
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(newVol, audioCtxRef.current.currentTime);
    }
  };

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <main id="main-content" className={`orbit-cafe-page ${focusMode ? 'focus-mode-active' : ''}`} tabIndex={-1}>
      <div className="cafe-container">
        {/* Navigation Breadcrumb */}
        {!focusMode && (
          <div className="cafe-nav-header">
            <button
              onClick={onBack}
              className="cafe-back-btn"
              aria-label="Kembali ke Orbit Utama"
            >
              <span aria-hidden="true">←</span> Kembali ke Orbit Utama
            </button>
            <div className="cafe-station-badge">
              <span className="badge-pulsar" aria-hidden="true" />
              STASIUN RELAKSASI · ORBIT CAFÉ
            </div>
          </div>
        )}

        {/* Hero Banner (hidden during strict Focus Mode) */}
        {!focusMode && (
          <header className="cafe-hero">
            <div className="cafe-hero-eyebrow">RUANG FOKUS & KEDAI KOPI ORBITAL</div>
            <h1 className="cafe-title">
              Orbit <span className="cafe-accent">Café</span>
            </h1>
            <p className="cafe-lead">
              Tempat beristirahat sejenak di antara perjalanan antariksa. Nikmati pemandangan planet
              dari jendela observasi, atur timer konsentrasi kerja Anda, dan dengarkan ambience kosmik
              yang menenangkan.
            </p>
          </header>
        )}

        {/* Main Station Bento */}
        <div className="cafe-main-grid">
          {/* Left: Window Planet View & Coffee Cup Simulation */}
          <div className="window-view-panel">
            <div className="space-window-frame">
              {/* Outer Space View with Planet */}
              <div className="outer-space-scene">
                <div className="distant-planet-glow" aria-hidden="true" />
                <div className="star-twinkle t1" aria-hidden="true" />
                <div className="star-twinkle t2" aria-hidden="true" />
                <div className="star-twinkle t3" aria-hidden="true" />
              </div>

              {/* Coffee Cup Table Shelf */}
              <div className="window-sill">
                <div className="coffee-cup-wrapper">
                  {/* Floating Coffee Cup Vector */}
                  <div className="floating-cup" aria-hidden="true">
                    {/* Steam trails */}
                    <div className="steam-line s1" />
                    <div className="steam-line s2" />
                    <div className="steam-line s3" />

                    <div className="cup-body">
                      <div className="cup-rim">
                        <div className="coffee-liquid" />
                      </div>
                      <div className="cup-handle" />
                    </div>
                  </div>

                  <div className="cup-caption">
                    <span className="coffee-icon">☕</span>
                    <span>Kopi Hangat di Gravitasi Mikro</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Pomodoro / Focus Timer & Ambience Controls */}
          <div className="timer-controls-panel">
            <div className="timer-display-box">
              <div className="timer-countdown" aria-live="polite">
                {formatTime(timeLeft)}
              </div>
              <div className="timer-status-indicator">
                {timerStatus === 'running'
                  ? '⚡ Waktu Fokus Berjalan'
                  : timerStatus === 'paused'
                  ? '⏸️ Sesi Dijeda'
                  : 'Siap Memulai Sesi'}
              </div>

              {/* Action Buttons */}
              <div className="timer-actions">
                {timerStatus === 'running' ? (
                  <button onClick={handlePauseTimer} className="btn-timer-ctrl btn-pause">
                    Jeda Sesi
                  </button>
                ) : (
                  <button onClick={handleStartTimer} className="btn-timer-ctrl btn-start">
                    {timerStatus === 'paused' ? 'Lanjutkan' : 'Mulai Fokus'}
                  </button>
                )}
                <button onClick={() => handleResetTimer()} className="btn-timer-ctrl btn-reset">
                  Reset
                </button>
              </div>

              {/* Preset Buttons */}
              <div className="timer-presets">
                <span className="presets-label">Preset Durasi:</span>
                <div className="presets-group">
                  {[
                    { label: '25 m', mins: 25 },
                    { label: '50 m', mins: 50 },
                    { label: '15 m', mins: 15 },
                    { label: '5 m', mins: 5 },
                  ].map((p) => (
                    <button
                      key={p.mins}
                      className={`preset-btn ${timerDuration === p.mins * 60 ? 'active' : ''}`}
                      onClick={() => handlePresetSelect(p.mins)}
                      disabled={timerStatus === 'running'}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Ambience & Sound Control */}
            <div className="ambience-box">
              <div className="ambience-header">
                <span className="ambience-title">Suasana Suara Prosedural</span>
                <span className="audio-privacy-note">Audio mati secara default</span>
              </div>

              <div className="ambience-options">
                <button
                  className={`amb-btn ${ambience === 'none' ? 'active' : ''}`}
                  onClick={() => handleAmbienceChange('none')}
                >
                  🔇 Hening
                </button>
                <button
                  className={`amb-btn ${ambience === 'space_hum' ? 'active' : ''}`}
                  onClick={() => handleAmbienceChange('space_hum')}
                >
                  🪐 Deep Space Drone
                </button>
                <button
                  className={`amb-btn ${ambience === 'cosmic_rain' ? 'active' : ''}`}
                  onClick={() => handleAmbienceChange('cosmic_rain')}
                >
                  🌧️ Hujan Kosmik
                </button>
              </div>

              {ambience !== 'none' && (
                <div className="volume-slider-row">
                  <label htmlFor="volume-slider" className="vol-label">
                    Volume: {Math.round(volume * 100)}%
                  </label>
                  <input
                    id="volume-slider"
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="vol-slider"
                  />
                </div>
              )}
            </div>

            {/* Focus Mode Toggle */}
            <div className="focus-mode-toggle-box">
              <button
                onClick={() => setFocusMode(!focusMode)}
                className="btn-toggle-focus"
              >
                {focusMode ? 'Keluar dari Mode Fokus Penuh' : 'Aktifkan Mode Fokus Penuh'}
              </button>
              <p className="focus-mode-hint">
                Mode fokus menyembunyikan elemen dekoratif agar Anda dapat berkonsentrasi penuh.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .orbit-cafe-page {
          min-height: 100vh;
          padding: 100px 24px 80px;
          background: radial-gradient(circle at 50% 20%, rgba(217, 119, 6, 0.08) 0%, rgba(5, 5, 10, 0.96) 80%);
          color: #f8fafc;
          position: relative;
          z-index: 10;
          transition: background 0.3s ease;
        }

        .focus-mode-active {
          padding: 60px 24px;
          background: #030408;
        }

        .cafe-container {
          max-width: 1080px;
          margin: 0 auto;
        }

        .cafe-nav-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 36px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .cafe-back-btn {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(217, 119, 6, 0.3);
          color: #e2e8f0;
          padding: 10px 18px;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .cafe-back-btn:hover, .cafe-back-btn:focus-visible {
          background: rgba(217, 119, 6, 0.2);
          border-color: #d97706;
          color: #ffffff;
          outline: none;
          transform: translateX(-3px);
        }

        .cafe-station-badge {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          color: #f59e0b;
          background: rgba(217, 119, 6, 0.12);
          border: 1px solid rgba(217, 119, 6, 0.25);
          padding: 6px 14px;
          border-radius: 20px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .badge-pulsar {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #f59e0b;
          box-shadow: 0 0 10px #f59e0b;
          display: inline-block;
          animation: badgePulse 2s infinite;
        }

        .cafe-hero {
          margin-bottom: 40px;
        }

        .cafe-hero-eyebrow {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-size: 0.8rem;
          letter-spacing: 0.2em;
          color: #f59e0b;
          margin-bottom: 12px;
          text-transform: uppercase;
        }

        .cafe-title {
          font-size: clamp(2.2rem, 5vw, 3.4rem);
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }

        .cafe-accent {
          color: #f59e0b;
        }

        .cafe-lead {
          font-size: 1.15rem;
          line-height: 1.7;
          color: #94a3b8;
          max-width: 820px;
        }

        .cafe-main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 36px;
        }

        @media (max-width: 860px) {
          .cafe-main-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Space Window Scene */
        .window-view-panel {
          background: #060914;
          border: 2px solid rgba(217, 119, 6, 0.3);
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);
        }

        .space-window-frame {
          height: 100%;
          min-height: 380px;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .outer-space-scene {
          flex: 1;
          background: radial-gradient(circle at 60% 40%, #151b33 0%, #060812 70%);
          position: relative;
          overflow: hidden;
        }

        .distant-planet-glow {
          position: absolute;
          top: 30px;
          right: 40px;
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #f59e0b 0%, #78350f 70%, #1e1b4b 100%);
          box-shadow: 0 0 35px rgba(245, 158, 11, 0.35);
        }

        .star-twinkle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #ffffff;
          border-radius: 50%;
        }

        .t1 { top: 40px; left: 60px; opacity: 0.8; }
        .t2 { top: 120px; left: 140px; opacity: 0.6; }
        .t3 { top: 220px; left: 80px; opacity: 0.9; }

        .window-sill {
          background: #0f172a;
          border-top: 6px solid #1e293b;
          padding: 24px;
          display: flex;
          justify-content: center;
        }

        .coffee-cup-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .floating-cup {
          position: relative;
          animation: floatCup 4s ease-in-out infinite;
        }

        @keyframes floatCup {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .cup-body {
          width: 60px;
          height: 52px;
          background: #f8fafc;
          border-radius: 0 0 16px 16px;
          position: relative;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
        }

        .cup-rim {
          position: absolute;
          top: -6px;
          left: 0;
          width: 60px;
          height: 12px;
          border-radius: 50%;
          background: #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .coffee-liquid {
          width: 52px;
          height: 8px;
          border-radius: 50%;
          background: #451a03;
        }

        .cup-handle {
          position: absolute;
          top: 10px;
          right: -14px;
          width: 16px;
          height: 26px;
          border: 4px solid #f8fafc;
          border-radius: 0 12px 12px 0;
          background: transparent;
        }

        /* Steam lines */
        .steam-line {
          position: absolute;
          width: 2px;
          height: 20px;
          background: rgba(254, 243, 199, 0.6);
          border-radius: 2px;
          animation: steamRise 2s infinite ease-out;
        }

        .s1 { left: 16px; top: -28px; animation-delay: 0s; }
        .s2 { left: 28px; top: -34px; animation-delay: 0.6s; }
        .s3 { left: 40px; top: -26px; animation-delay: 1.2s; }

        @keyframes steamRise {
          0% { opacity: 0; transform: translateY(6px) scaleX(1); }
          50% { opacity: 0.8; transform: translateY(-10px) scaleX(1.5); }
          100% { opacity: 0; transform: translateY(-24px) scaleX(2); }
        }

        .cup-caption {
          font-size: 0.82rem;
          color: #fef3c7;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* Timer Panel */
        .timer-controls-panel {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .timer-display-box {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(217, 119, 6, 0.3);
          border-radius: 16px;
          padding: 32px;
          text-align: center;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }

        .timer-countdown {
          font-family: 'Space Grotesk', monospace;
          font-size: clamp(3.2rem, 7vw, 4.8rem);
          font-weight: 800;
          color: #ffffff;
          line-height: 1;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .timer-status-indicator {
          font-size: 0.95rem;
          color: #f59e0b;
          margin-bottom: 28px;
        }

        .timer-actions {
          display: flex;
          justify-content: center;
          gap: 14px;
          margin-bottom: 28px;
        }

        .btn-timer-ctrl {
          padding: 12px 28px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.15s ease;
        }

        .btn-start {
          background: #f59e0b;
          color: #000000;
          border: none;
        }

        .btn-pause {
          background: #ef4444;
          color: #ffffff;
          border: none;
        }

        .btn-reset {
          background: transparent;
          border: 1px solid rgba(148, 163, 184, 0.3);
          color: #cbd5e1;
        }

        .btn-timer-ctrl:hover {
          transform: scale(1.04);
        }

        .timer-presets {
          border-top: 1px solid rgba(148, 163, 184, 0.15);
          padding-top: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .presets-label {
          font-size: 0.85rem;
          color: #94a3b8;
        }

        .presets-group {
          display: flex;
          gap: 8px;
        }

        .preset-btn {
          background: rgba(30, 41, 59, 0.6);
          border: 1px solid rgba(148, 163, 184, 0.2);
          color: #cbd5e1;
          padding: 6px 14px;
          border-radius: 6px;
          font-size: 0.85rem;
          cursor: pointer;
        }

        .preset-btn.active {
          background: #f59e0b;
          color: #000000;
          font-weight: 700;
          border-color: #f59e0b;
        }

        /* Ambience Sound Box */
        .ambience-box {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-radius: 14px;
          padding: 24px;
        }

        .ambience-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }

        .ambience-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #ffffff;
        }

        .audio-privacy-note {
          font-size: 0.75rem;
          color: #94a3b8;
        }

        .ambience-options {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }

        .amb-btn {
          background: rgba(30, 41, 59, 0.6);
          border: 1px solid rgba(148, 163, 184, 0.2);
          color: #cbd5e1;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.85rem;
          cursor: pointer;
        }

        .amb-btn.active {
          background: #d97706;
          color: #ffffff;
          border-color: #d97706;
          font-weight: 600;
        }

        .volume-slider-row {
          display: flex;
          align-items: center;
          gap: 14px;
          background: rgba(5, 5, 10, 0.4);
          padding: 10px 14px;
          border-radius: 6px;
        }

        .vol-label {
          font-size: 0.82rem;
          color: #cbd5e1;
          white-space: nowrap;
        }

        .vol-slider {
          flex: 1;
          accent-color: #f59e0b;
        }

        .focus-mode-toggle-box {
          text-align: center;
        }

        .btn-toggle-focus {
          background: transparent;
          border: 1px dashed rgba(148, 163, 184, 0.3);
          color: #94a3b8;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 0.88rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-toggle-focus:hover {
          border-color: #f59e0b;
          color: #ffffff;
        }

        .focus-mode-hint {
          font-size: 0.75rem;
          color: #64748b;
          margin-top: 8px;
        }

        @media (max-width: 768px) {
          .orbit-cafe-page {
            padding: 84px 16px 60px;
          }
        }
      `}</style>
    </main>
  );
};
