// src/pages/PlaygroundPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useMotion } from '@/app/providers/MotionProvider';

interface PlaygroundPageProps {
  onBack: () => void;
}

// -------------------------------------------------------------
// ASTEROID DODGE GAME CONSTANTS & LOGIC
// -------------------------------------------------------------
interface PlayerShip {
  x: number;
  y: number;
  radius: number;
  speed: number;
}

interface Asteroid {
  id: number;
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotSpeed: number;
  points: number[];
}

export const PlaygroundPage: React.FC<PlaygroundPageProps> = ({ onBack }) => {
  const { isReduced } = useMotion();
  const [activeTab, setActiveTab] = useState<'dodge' | 'planet' | 'particles'>('dodge');

  // Mini-game states
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'paused' | 'gameover'>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('xevryn_dodge_highscore');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  // Game internal variables
  const shipRef = useRef<PlayerShip>({ x: 200, y: 350, radius: 14, speed: 5 });
  const asteroidsRef = useRef<Asteroid[]>([]);
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const animFrameIdRef = useRef<number | null>(null);
  const nextAsteroidTimeRef = useRef<number>(0);
  const nextIdRef = useRef<number>(0);

  // Tab auto-pause
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && gameState === 'playing') {
        setGameState('paused');
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [gameState]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) {
        // Prevent scrolling with game keys
        if (activeTab === 'dodge' && gameState === 'playing') {
          e.preventDefault();
        }
      }
      keysRef.current[e.code] = true;

      // 'P' key to toggle pause
      if (e.code === 'KeyP' && (gameState === 'playing' || gameState === 'paused')) {
        setGameState((prev) => (prev === 'playing' ? 'paused' : 'playing'));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [activeTab, gameState]);

  // Start game handler
  const handleStartGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    shipRef.current = {
      x: canvas.width / 2,
      y: canvas.height - 50,
      radius: 14,
      speed: 5.5,
    };
    asteroidsRef.current = [];
    setScore(0);
    setGameState('playing');
    nextAsteroidTimeRef.current = performance.now() + 600;
  };

  const handleTogglePause = () => {
    setGameState((prev) => (prev === 'playing' ? 'paused' : 'playing'));
  };

  // Main game loop
  useEffect(() => {
    if (gameState !== 'playing') {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localScore = score;
    let scoreAccumulator = 0;

    const gameLoop = (timestamp: number) => {
      // 1. Clear background
      ctx.fillStyle = '#060a17';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Distant stars background in canvas
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < 20; i++) {
        const sx = (Math.sin(i * 99 + timestamp * 0.0002) * 0.5 + 0.5) * canvas.width;
        const sy = (Math.cos(i * 33 + timestamp * 0.0003) * 0.5 + 0.5) * canvas.height;
        ctx.fillRect(sx, sy, 1.5, 1.5);
      }

      // 2. Handle Player Input
      const ship = shipRef.current;
      const keys = keysRef.current;

      if (keys['ArrowLeft'] || keys['KeyA']) {
        ship.x -= ship.speed;
      }
      if (keys['ArrowRight'] || keys['KeyD']) {
        ship.x += ship.speed;
      }
      if (keys['ArrowUp'] || keys['KeyW']) {
        ship.y -= ship.speed;
      }
      if (keys['ArrowDown'] || keys['KeyS']) {
        ship.y += ship.speed;
      }

      // Boundaries clamp
      ship.x = Math.max(ship.radius, Math.min(canvas.width - ship.radius, ship.x));
      ship.y = Math.max(ship.radius, Math.min(canvas.height - ship.radius, ship.y));

      // 3. Draw Player Ship
      ctx.save();
      ctx.translate(ship.x, ship.y);

      // Engine plume
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(-6, 12);
      ctx.lineTo(6, 12);
      ctx.lineTo(0, 18 + Math.random() * 6);
      ctx.closePath();
      ctx.fill();

      // Ship body
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.moveTo(0, -16);
      ctx.lineTo(12, 12);
      ctx.lineTo(-12, 12);
      ctx.closePath();
      ctx.fill();

      // Cockpit cyan glass
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 4. Spawn Asteroids (Hard limit: max 15 asteroids at once)
      if (timestamp >= nextAsteroidTimeRef.current && asteroidsRef.current.length < 15) {
        const radius = 12 + Math.random() * 20;
        const points: number[] = [];
        const numPts = 8;
        for (let p = 0; p < numPts; p++) {
          points.push(0.8 + Math.random() * 0.4);
        }

        asteroidsRef.current.push({
          id: nextIdRef.current++,
          x: radius + Math.random() * (canvas.width - radius * 2),
          y: -radius,
          radius,
          speedY: 2.2 + Math.random() * 2.5 + Math.min(3, localScore * 0.005),
          speedX: (Math.random() - 0.5) * 1.5,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.04,
          points,
        });

        // Next spawn delay
        nextAsteroidTimeRef.current = timestamp + Math.max(400, 1100 - localScore * 3);
      }

      // 5. Update & Draw Asteroids
      let collision = false;
      const updatedAsteroids: Asteroid[] = [];

      for (const ast of asteroidsRef.current) {
        ast.y += ast.speedY;
        ast.x += ast.speedX;
        ast.rotation += ast.rotSpeed;

        // Draw Asteroid
        ctx.save();
        ctx.translate(ast.x, ast.y);
        ctx.rotate(ast.rotation);

        ctx.fillStyle = '#475569';
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let i = 0; i < ast.points.length; i++) {
          const angle = (i / ast.points.length) * Math.PI * 2;
          const r = ast.radius * ast.points[i];
          const px = Math.cos(angle) * r;
          const py = Math.sin(angle) * r;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // Collision Check (Circle vs Circle)
        const dx = ship.x - ast.x;
        const dy = ship.y - ast.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < ship.radius + ast.radius * 0.75) {
          collision = true;
          break;
        }

        // Keep asteroid if still within screen
        if (ast.y < canvas.height + ast.radius) {
          updatedAsteroids.push(ast);
        }
      }

      asteroidsRef.current = updatedAsteroids;

      // 6. Handle Collision / Game Over
      if (collision) {
        setGameState('gameover');
        if (localScore > highScore) {
          setHighScore(localScore);
          try {
            localStorage.setItem('xevryn_dodge_highscore', localScore.toString());
          } catch {}
        }
        return;
      }

      // 7. Update Score
      scoreAccumulator += 1;
      if (scoreAccumulator >= 6) {
        localScore += 1;
        setScore(localScore);
        scoreAccumulator = 0;
      }

      animFrameIdRef.current = requestAnimationFrame(gameLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [gameState, highScore]);

  // Touch control triggers for mobile
  const handleTouchControl = (key: string, pressed: boolean) => {
    keysRef.current[key] = pressed;
  };

  // -------------------------------------------------------------
  // PLANET EXPLORER STATE
  // -------------------------------------------------------------
  const [selectedPlanet, setSelectedPlanet] = useState<'rocky' | 'ocean' | 'red' | 'gas' | 'ring'>('rocky');
  const [planetRotation, setPlanetRotation] = useState(0);
  const [planetZoom, setPlanetZoom] = useState(1);

  const planetConfigs = {
    rocky: {
      name: 'Planet Berbatu & Bulan',
      color: '#78716c',
      atmosphere: 'none',
      type: 'Terestrial / Basaltik',
      facts: 'Permukaan penuh kawah multi-skala ber-relief tajam, rille vulkanik purba, dan bulan pengorbit bermassa rendah.',
    },
    ocean: {
      name: 'Dunia Samudera (Ocean World)',
      color: '#0284c7',
      atmosphere: 'rgba(56, 189, 248, 0.4)',
      type: 'Akuatik & Benua Organik',
      facts: 'Lautan dalam dengan batimetri bertingkat, daratan hijau-kecokelatan, serta lapisan awan independen yang dinamis.',
    },
    red: {
      name: 'Planet Merah (Mars-like)',
      color: '#b45309',
      atmosphere: 'rgba(217, 119, 6, 0.25)',
      type: 'Gurun Oksida Besi',
      facts: 'Dataran berkarat dengan patahan ngarai raksasa Valles Marineris dan tudung es kutub tipis.',
    },
    gas: {
      name: 'Gas Giant Berpita',
      color: '#d97706',
      atmosphere: 'rgba(251, 191, 36, 0.3)',
      type: 'Raksasa Gas Turbulen',
      facts: 'Lapisan atmosfer tebal dengan gelombang geser sinusoidal berlawanan arah dan badai bintik ambar.',
    },
    ring: {
      name: 'Planet Bercincin (Saturn-like)',
      color: '#a89470',
      atmosphere: 'rgba(253, 230, 138, 0.2)',
      type: 'Sistem Planet & Cincin Es',
      facts: 'Cincin tipis berlapis densitas dengan celah tembus pandang nyata Divisi Cassini.',
    },
  };

  // -------------------------------------------------------------
  // PARTICLE EXPERIMENT LOGIC
  // -------------------------------------------------------------
  const particleCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const particleAnimRef = useRef<number | null>(null);
  const mousePosRef = useRef<{ x: number; y: number; active: boolean }>({ x: 250, y: 200, active: false });

  useEffect(() => {
    if (activeTab !== 'particles') {
      if (particleAnimRef.current) cancelAnimationFrame(particleAnimRef.current);
      return;
    }

    const pCanvas = particleCanvasRef.current;
    if (!pCanvas) return;
    const pCtx = pCanvas.getContext('2d');
    if (!pCtx) return;

    // Generate 60 cosmic dust particles
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * pCanvas.width,
      y: Math.random() * pCanvas.height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      radius: 1.5 + Math.random() * 2.5,
      color: Math.random() > 0.5 ? '#38bdf8' : '#c084fc',
    }));

    const renderParticles = () => {
      pCtx.fillStyle = '#060a17';
      pCtx.fillRect(0, 0, pCanvas.width, pCanvas.height);

      const mouse = mousePosRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce walls
        if (p.x < p.radius || p.x > pCanvas.width - p.radius) p.vx *= -1;
        if (p.y < p.radius || p.y > pCanvas.height - p.radius) p.vy *= -1;

        // Gravitational attraction or repulsion to pointer
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120 && dist > 10) {
            const force = (120 - dist) / 1200;
            p.x += dx * force;
            p.y += dy * force;
          }
        }

        // Draw particle
        pCtx.fillStyle = p.color;
        pCtx.beginPath();
        pCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        pCtx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 65) {
            pCtx.strokeStyle = `rgba(56, 189, 248, ${0.35 * (1 - dist / 65)})`;
            pCtx.lineWidth = 0.8;
            pCtx.beginPath();
            pCtx.moveTo(p.x, p.y);
            pCtx.lineTo(p2.x, p2.y);
            pCtx.stroke();
          }
        }
      }

      particleAnimRef.current = requestAnimationFrame(renderParticles);
    };

    particleAnimRef.current = requestAnimationFrame(renderParticles);

    return () => {
      if (particleAnimRef.current) cancelAnimationFrame(particleAnimRef.current);
    };
  }, [activeTab]);

  return (
    <main id="main-content" className="playground-page" tabIndex={-1}>
      <div className="play-container">
        {/* Navigation Breadcrumb */}
        <div className="play-nav-header">
          <button
            onClick={onBack}
            className="play-back-btn"
            aria-label="Kembali ke Orbit Utama"
          >
            <span aria-hidden="true">←</span> Kembali ke Orbit Utama
          </button>
          <div className="play-station-badge">
            <span className="badge-pulsar" aria-hidden="true" />
            STASIUN SIMULASI · XEVRYN PLAYGROUND
          </div>
        </div>

        {/* Header Title */}
        <header className="play-hero">
          <div className="play-hero-eyebrow">SIMULASI & MINI GAME INTERAKTIF</div>
          <h1 className="play-title">
            Cosmic <span className="play-accent">Playground</span>
          </h1>
          <p className="play-lead">
            Uji refleks navigasi antariksa Anda, eksplorasi karakteristik planet tata surya secara
            mandiri, atau berinteraksi dengan simulasi partikel gravitasi kosmik langsung di peramban.
          </p>

          <div className="playground-disclaimer">
            💡 Seluruh eksperimen dan simulasi di bawah ini dibuat khusus sebagai fitur interaktif
            website XEVRYN Space Hub (berjalan 100% lokal tanpa instalasi atau plugin eksternal).
          </div>
        </header>

        {/* Tab Selector */}
        <div className="play-tab-bar" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'dodge'}
            className={`play-tab ${activeTab === 'dodge' ? 'active' : ''}`}
            onClick={() => setActiveTab('dodge')}
          >
            🕹️ Mini Game: Asteroid Dodge
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'planet'}
            className={`play-tab ${activeTab === 'planet' ? 'active' : ''}`}
            onClick={() => setActiveTab('planet')}
          >
            🪐 Eksplorasi Planet
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'particles'}
            className={`play-tab ${activeTab === 'particles' ? 'active' : ''}`}
            onClick={() => setActiveTab('particles')}
          >
            ✨ Partikel Gravitasi
          </button>
        </div>

        {/* TAB 1: ASTEROID DODGE GAME */}
        {activeTab === 'dodge' && (
          <section className="dodge-section" aria-label="Permainan Asteroid Dodge">
            <div className="game-layout">
              {/* Game Viewport Canvas */}
              <div className="game-screen-wrapper">
                <canvas
                  ref={canvasRef}
                  width={440}
                  height={520}
                  className="game-canvas"
                />

                {/* Game Overlay States */}
                {gameState === 'idle' && (
                  <div className="game-overlay">
                    <div className="overlay-content">
                      <div className="overlay-icon">🚀</div>
                      <h2 className="overlay-title">ASTEROID DODGE</h2>
                      <p className="overlay-desc">
                        Pandu pesawat pengintai melintasi sabuk asteroid kosmik. Hindari tabrakan
                        dengan pecahan mineral untuk mengumpulkan skor tertinggi.
                      </p>
                      <button onClick={handleStartGame} className="btn-game-primary">
                        Mulai Misi (Start)
                      </button>
                    </div>
                  </div>
                )}

                {gameState === 'paused' && (
                  <div className="game-overlay">
                    <div className="overlay-content">
                      <div className="overlay-icon">⏸️</div>
                      <h2 className="overlay-title">MISI DIJEDA</h2>
                      <p className="overlay-desc">Tekan tombol di bawah atau tekan tombol P untuk melanjutkan.</p>
                      <button onClick={handleTogglePause} className="btn-game-primary">
                        Lanjutkan (Resume)
                      </button>
                    </div>
                  </div>
                )}

                {gameState === 'gameover' && (
                  <div className="game-overlay">
                    <div className="overlay-content">
                      <div className="overlay-icon">💥</div>
                      <h2 className="overlay-title">KAPAL TERTABRAK</h2>
                      <p className="overlay-score-result">
                        Skor Misi: <strong>{score}</strong>
                        <br />
                        Skor Terbaik: <strong>{Math.max(score, highScore)}</strong>
                      </p>
                      <button onClick={handleStartGame} className="btn-game-primary">
                        Mulai Ulang (Restart)
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Game Sidebar Controls & Instructions */}
              <div className="game-sidebar">
                <div className="score-card">
                  <div className="score-item">
                    <span className="score-label">SKOR MISI SAAT INI</span>
                    <span className="score-val">{score}</span>
                  </div>
                  <div className="score-item">
                    <span className="score-label">SKOR TERBAIK LOKAL</span>
                    <span className="score-val score-high">{highScore}</span>
                  </div>
                </div>

                <div className="instructions-card">
                  <h3 className="card-heading">Petunjuk Kontrol</h3>
                  <ul className="inst-list">
                    <li>
                      <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> atau <kbd>←</kbd> <kbd>↑</kbd> <kbd>→</kbd> <kbd>↓</kbd> untuk mengemudikan kapal.
                    </li>
                    <li>
                      <kbd>P</kbd> untuk Jeda (Pause) atau Lanjutkan.
                    </li>
                    <li>
                      Otomatis jeda saat Anda beralih ke tab lain.
                    </li>
                    {isReduced && (
                      <li className="reduced-note">
                        🛡️ Mode Reduced Motion aktif: efek guncangan dan kedip kilatan dimatikan.
                      </li>
                    )}
                  </ul>
                </div>

                {/* Mobile / Touch D-pad */}
                <div className="touch-controls">
                  <div className="touch-title">Kontrol Layar Sentuh</div>
                  <div className="dpad">
                    <div className="dpad-row">
                      <button
                        className="dpad-btn"
                        onMouseDown={() => handleTouchControl('KeyW', true)}
                        onMouseUp={() => handleTouchControl('KeyW', false)}
                        onTouchStart={() => handleTouchControl('KeyW', true)}
                        onTouchEnd={() => handleTouchControl('KeyW', false)}
                        aria-label="Atas"
                      >
                        ▲
                      </button>
                    </div>
                    <div className="dpad-row middle">
                      <button
                        className="dpad-btn"
                        onMouseDown={() => handleTouchControl('KeyA', true)}
                        onMouseUp={() => handleTouchControl('KeyA', false)}
                        onTouchStart={() => handleTouchControl('KeyA', true)}
                        onTouchEnd={() => handleTouchControl('KeyA', false)}
                        aria-label="Kiri"
                      >
                        ◀
                      </button>
                      <button
                        className="dpad-btn"
                        onMouseDown={() => handleTouchControl('KeyS', true)}
                        onMouseUp={() => handleTouchControl('KeyS', false)}
                        onTouchStart={() => handleTouchControl('KeyS', true)}
                        onTouchEnd={() => handleTouchControl('KeyS', false)}
                        aria-label="Bawah"
                      >
                        ▼
                      </button>
                      <button
                        className="dpad-btn"
                        onMouseDown={() => handleTouchControl('KeyD', true)}
                        onMouseUp={() => handleTouchControl('KeyD', false)}
                        onTouchStart={() => handleTouchControl('KeyD', true)}
                        onTouchEnd={() => handleTouchControl('KeyD', false)}
                        aria-label="Kanan"
                      >
                        ▶
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 2: PLANET EXPLORER */}
        {activeTab === 'planet' && (
          <section className="planet-section" aria-label="Eksplorasi Planet Tata Surya">
            <div className="planet-explorer-layout">
              <div className="planet-viewport">
                <div
                  className="planet-sphere-preview"
                  style={{
                    transform: `scale(${planetZoom}) rotate(${planetRotation}deg)`,
                    backgroundColor: planetConfigs[selectedPlanet].color,
                    boxShadow: `0 0 40px ${planetConfigs[selectedPlanet].atmosphere}`,
                  }}
                >
                  <div className="sphere-lighting" />
                  {selectedPlanet === 'ring' && <div className="saturn-ring-preview" />}
                </div>

                <div className="viewport-controls">
                  <div className="ctrl-group">
                    <label htmlFor="rot-slider">Rotasi Aksis ({planetRotation}°):</label>
                    <input
                      id="rot-slider"
                      type="range"
                      min="-180"
                      max="180"
                      value={planetRotation}
                      onChange={(e) => setPlanetRotation(parseInt(e.target.value, 10))}
                    />
                  </div>
                  <div className="ctrl-group">
                    <label htmlFor="zoom-slider">Perbesaran Optik ({planetZoom.toFixed(1)}x):</label>
                    <input
                      id="zoom-slider"
                      type="range"
                      min="0.8"
                      max="1.6"
                      step="0.1"
                      value={planetZoom}
                      onChange={(e) => setPlanetZoom(parseFloat(e.target.value))}
                    />
                  </div>
                  <button
                    onClick={() => {
                      setPlanetRotation(0);
                      setPlanetZoom(1);
                    }}
                    className="btn-reset-view"
                  >
                    Reset Tampilan
                  </button>
                </div>
              </div>

              <div className="planet-info-panel">
                <div className="planet-selector-pills">
                  {(['rocky', 'ocean', 'red', 'gas', 'ring'] as const).map((key) => (
                    <button
                      key={key}
                      className={`pill-btn ${selectedPlanet === key ? 'active' : ''}`}
                      onClick={() => setSelectedPlanet(key)}
                    >
                      {planetConfigs[key].name.split(' ')[0]}
                    </button>
                  ))}
                </div>

                <div className="planet-detail-card">
                  <h3 className="planet-detail-title">{planetConfigs[selectedPlanet].name}</h3>
                  <div className="detail-row">
                    <span className="detail-label">Klasifikasi:</span>
                    <span className="detail-val">{planetConfigs[selectedPlanet].type}</span>
                  </div>
                  <p className="planet-detail-desc">{planetConfigs[selectedPlanet].facts}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 3: GRAVITATIONAL PARTICLES */}
        {activeTab === 'particles' && (
          <section className="particles-section" aria-label="Simulasi Partikel Gravitasi">
            <div className="particle-layout">
              <div
                className="particle-canvas-wrapper"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  mousePosRef.current = {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                    active: true,
                  };
                }}
                onMouseLeave={() => {
                  mousePosRef.current.active = false;
                }}
                onTouchMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const touch = e.touches[0];
                  if (touch) {
                    mousePosRef.current = {
                      x: touch.clientX - rect.left,
                      y: touch.clientY - rect.top,
                      active: true,
                    };
                  }
                }}
                onTouchEnd={() => {
                  mousePosRef.current.active = false;
                }}
              >
                <canvas
                  ref={particleCanvasRef}
                  width={560}
                  height={420}
                  className="particle-canvas"
                />
              </div>

              <div className="particle-instructions">
                <h3 className="card-heading">Interaksi Gravitasi</h3>
                <p>
                  Gerakkan kursor atau geser jari Anda di atas kanvas partikel. Partikel debu kosmik
                  akan tertarik ke titik interaksi Anda membentuk node konstelasi dinamis.
                </p>
                <div className="tech-badge-note">
                  Ditenagai oleh HTML5 Canvas 2D murni berkinerja tinggi.
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      <style>{`
        .playground-page {
          min-height: 100vh;
          padding: 100px 24px 80px;
          background: radial-gradient(circle at 50% 20%, rgba(245, 158, 11, 0.08) 0%, rgba(5, 5, 10, 0.96) 80%);
          color: #f8fafc;
          position: relative;
          z-index: 10;
        }

        .play-container {
          max-width: 1080px;
          margin: 0 auto;
        }

        .play-nav-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 36px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .play-back-btn {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(245, 158, 11, 0.3);
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

        .play-back-btn:hover, .play-back-btn:focus-visible {
          background: rgba(245, 158, 11, 0.2);
          border-color: #f59e0b;
          color: #ffffff;
          outline: none;
          transform: translateX(-3px);
        }

        .play-station-badge {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          color: #f59e0b;
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.25);
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

        .play-hero {
          margin-bottom: 40px;
        }

        .play-hero-eyebrow {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-size: 0.8rem;
          letter-spacing: 0.2em;
          color: #f59e0b;
          margin-bottom: 12px;
          text-transform: uppercase;
        }

        .play-title {
          font-size: clamp(2.2rem, 5vw, 3.4rem);
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }

        .play-accent {
          color: #f59e0b;
        }

        .play-lead {
          font-size: 1.15rem;
          line-height: 1.7;
          color: #94a3b8;
          max-width: 820px;
          margin-bottom: 24px;
        }

        .playground-disclaimer {
          background: rgba(245, 158, 11, 0.1);
          border-left: 3px solid #f59e0b;
          padding: 12px 18px;
          border-radius: 6px;
          font-size: 0.9rem;
          color: #cbd5e1;
        }

        .play-tab-bar {
          display: flex;
          gap: 12px;
          margin-bottom: 32px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.15);
          padding-bottom: 16px;
          flex-wrap: wrap;
        }

        .play-tab {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(148, 163, 184, 0.2);
          color: #cbd5e1;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .play-tab.active {
          background: rgba(245, 158, 11, 0.2);
          border-color: #f59e0b;
          color: #ffffff;
        }

        .play-tab:hover {
          background: rgba(245, 158, 11, 0.12);
        }

        /* Game Layout */
        .game-layout {
          display: flex;
          gap: 32px;
          align-items: flex-start;
          flex-wrap: wrap;
        }

        .game-screen-wrapper {
          position: relative;
          border: 2px solid rgba(245, 158, 11, 0.35);
          border-radius: 14px;
          overflow: hidden;
          background: #060a17;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
          width: 440px;
          max-width: 100%;
        }

        .game-canvas {
          display: block;
          width: 100%;
          height: auto;
        }

        .game-overlay {
          position: absolute;
          inset: 0;
          background: rgba(5, 7, 18, 0.88);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          text-align: center;
        }

        .overlay-icon {
          font-size: 3rem;
          margin-bottom: 12px;
        }

        .overlay-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 10px;
          letter-spacing: 0.05em;
        }

        .overlay-desc {
          font-size: 0.9rem;
          line-height: 1.6;
          color: #94a3b8;
          margin-bottom: 24px;
        }

        .overlay-score-result {
          font-size: 1.1rem;
          color: #cbd5e1;
          margin-bottom: 24px;
          line-height: 1.8;
        }

        .btn-game-primary {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: #000000;
          font-weight: 700;
          border: none;
          padding: 12px 28px;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 18px rgba(245, 158, 11, 0.4);
        }

        .btn-game-primary:hover, .btn-game-primary:focus-visible {
          transform: scale(1.04);
          box-shadow: 0 6px 24px rgba(245, 158, 11, 0.6);
          outline: none;
        }

        .game-sidebar {
          flex: 1;
          min-width: 280px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .score-card {
          display: flex;
          gap: 16px;
          background: rgba(15, 23, 42, 0.7);
          border: 1px solid rgba(148, 163, 184, 0.15);
          padding: 20px;
          border-radius: 12px;
        }

        .score-item {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .score-label {
          font-size: 0.75rem;
          color: #94a3b8;
          margin-bottom: 6px;
          letter-spacing: 0.05em;
        }

        .score-val {
          font-family: 'Space Grotesk', monospace;
          font-size: 2rem;
          font-weight: 800;
          color: #f8fafc;
        }

        .score-high {
          color: #f59e0b;
        }

        .instructions-card {
          background: rgba(15, 23, 42, 0.7);
          border: 1px solid rgba(148, 163, 184, 0.15);
          padding: 24px;
          border-radius: 12px;
        }

        .card-heading {
          font-size: 1.1rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 14px;
        }

        .inst-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-size: 0.9rem;
          color: #cbd5e1;
        }

        kbd {
          background: #1e293b;
          border: 1px solid #475569;
          border-radius: 4px;
          padding: 2px 6px;
          font-size: 0.8rem;
          font-family: monospace;
          color: #f8fafc;
        }

        .reduced-note {
          color: #38bdf8;
          font-size: 0.85rem;
        }

        .touch-controls {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(148, 163, 184, 0.15);
          padding: 16px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .touch-title {
          font-size: 0.8rem;
          color: #94a3b8;
          margin-bottom: 12px;
        }

        .dpad {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .dpad-row {
          display: flex;
          gap: 6px;
        }

        .dpad-btn {
          width: 48px;
          height: 48px;
          background: #1e293b;
          border: 1px solid #475569;
          border-radius: 8px;
          color: #f8fafc;
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          user-select: none;
        }

        .dpad-btn:active {
          background: #f59e0b;
          color: #000000;
        }

        /* Planet Explorer */
        .planet-explorer-layout {
          display: flex;
          gap: 36px;
          flex-wrap: wrap;
        }

        .planet-viewport {
          flex: 1;
          min-width: 320px;
          background: #060a17;
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 14px;
          padding: 36px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .planet-sphere-preview {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          position: relative;
          margin-bottom: 36px;
          transition: transform 0.1s linear, background-color 0.3s ease;
        }

        .sphere-lighting {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.4) 0%, transparent 60%, rgba(0, 0, 0, 0.8) 100%);
        }

        .saturn-ring-preview {
          position: absolute;
          top: 50%;
          left: -40px;
          right: -40px;
          height: 24px;
          border: 8px solid rgba(226, 212, 190, 0.8);
          border-radius: 50%;
          transform: translateY(-50%) rotate(-20deg);
          pointer-events: none;
        }

        .viewport-controls {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .ctrl-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 0.85rem;
          color: #cbd5e1;
        }

        .ctrl-group input[type="range"] {
          accent-color: #f59e0b;
        }

        .btn-reset-view {
          background: transparent;
          border: 1px solid rgba(148, 163, 184, 0.3);
          color: #cbd5e1;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 0.85rem;
          cursor: pointer;
          align-self: flex-start;
        }

        .planet-info-panel {
          flex: 1;
          min-width: 300px;
        }

        .planet-selector-pills {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }

        .pill-btn {
          background: #0f172a;
          border: 1px solid #334155;
          color: #cbd5e1;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          cursor: pointer;
        }

        .pill-btn.active {
          background: #f59e0b;
          color: #000000;
          font-weight: 700;
        }

        .planet-detail-card {
          background: rgba(15, 23, 42, 0.7);
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-radius: 12px;
          padding: 24px;
        }

        .planet-detail-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 12px;
        }

        .detail-row {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
          font-size: 0.9rem;
        }

        .detail-label {
          color: #94a3b8;
        }

        .detail-val {
          color: #f59e0b;
          font-weight: 600;
        }

        .planet-detail-desc {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #cbd5e1;
          margin: 0;
        }

        /* Particle Section */
        .particle-layout {
          display: flex;
          gap: 32px;
          flex-wrap: wrap;
        }

        .particle-canvas-wrapper {
          border: 2px solid rgba(56, 189, 248, 0.3);
          border-radius: 14px;
          overflow: hidden;
          background: #060a17;
          width: 560px;
          max-width: 100%;
        }

        .particle-canvas {
          display: block;
          width: 100%;
          height: auto;
          cursor: crosshair;
        }

        .particle-instructions {
          flex: 1;
          min-width: 280px;
          background: rgba(15, 23, 42, 0.7);
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-radius: 12px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .tech-badge-note {
          margin-top: 16px;
          padding: 8px 12px;
          background: rgba(56, 189, 248, 0.1);
          border: 1px solid rgba(56, 189, 248, 0.2);
          border-radius: 6px;
          font-size: 0.8rem;
          color: #38bdf8;
        }

        @media (max-width: 768px) {
          .playground-page {
            padding: 84px 16px 60px;
          }

          .game-screen-wrapper, .particle-canvas-wrapper {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
};
