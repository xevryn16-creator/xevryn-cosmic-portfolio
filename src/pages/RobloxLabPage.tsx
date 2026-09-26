// src/pages/RobloxLabPage.tsx
import React from 'react';
import { robloxCatalog } from '@/content/robloxCatalog';

interface RobloxLabPageProps {
  onBack: () => void;
  onNavigatePlayground?: () => void;
}

export const RobloxLabPage: React.FC<RobloxLabPageProps> = ({
  onBack,
  onNavigatePlayground,
}) => {
  return (
    <main id="main-content" className="roblox-lab-page" tabIndex={-1}>
      <div className="lab-container">
        {/* Navigation Breadcrumb & Back Button */}
        <div className="lab-nav-header">
          <button
            onClick={onBack}
            className="lab-back-btn"
            aria-label="Kembali ke Orbit Utama"
          >
            <span aria-hidden="true">←</span> Kembali ke Orbit Utama
          </button>
          <div className="lab-station-badge">
            <span className="badge-pulsar" aria-hidden="true" />
            STASIUN ROBLOX LAB · SEKTOR LUAU
          </div>
        </div>

        {/* Hero Station Banner */}
        <header className="lab-hero">
          <div className="lab-hero-eyebrow">LABORATORIUM & EKSPERIMEN VIRTUAL</div>
          <h1 className="lab-title">
            Roblox Lab <span className="lab-accent">&</span> Eksplorasi Luau
          </h1>
          <p className="lab-lead">
            Selamat datang di modul eksperimen luar angkasa XEVRYN. Di sini saya mengeksplorasi
            arsitektur game di platform Roblox dan mendalami pembuatan script sederhana dengan
            bahasa pemrograman Lua/Luau.
          </p>

          {/* Factual Information Callout */}
          <div className="lab-fact-card">
            <div className="fact-icon" aria-hidden="true">
              💠
            </div>
            <div className="fact-content">
              <h2 className="fact-title">Status Riset & Eksplorasi Terkonfirmasi</h2>
              <p className="fact-text">
                Saya berkegiatan sebagai pengembang Roblox dan saat ini aktif mempelajari dasar-dasar
                scripting Lua/Luau. Seluruh karya game resmi masih berada dalam tahap perancangan
                dan validasi lokal, tanpa klaim statistik atau cuplikan kode karangan.
              </p>
            </div>
          </div>
        </header>

        {/* Experiment Modules Section */}
        <section className="lab-modules-section" aria-labelledby="modules-heading">
          <div className="section-header-compact">
            <h2 id="modules-heading" className="section-title">
              Katalog Eksplorasi & Modul Pembelajaran
            </h2>
            <p className="section-subtitle">
              Arsitektur modul yang sedang dikembangkan dalam lingkungan Roblox Studio lokal.
            </p>
          </div>

          <div className="modules-grid">
            {robloxCatalog.map((item) => (
              <article key={item.id} className="module-card">
                <div className="module-card-header">
                  <span className="module-id">{item.id}</span>
                  <span className="module-badge">
                    {item.status === 'learning_prototype'
                      ? 'Tahap Belajar'
                      : 'Dalam Perancangan'}
                  </span>
                </div>

                <h3 className="module-title">{item.title}</h3>
                <p className="module-desc">{item.description}</p>

                {item.notes && (
                  <div className="module-notes">
                    <span className="notes-label">Catatan:</span> {item.notes}
                  </div>
                )}

                <div className="module-tech-tags">
                  {item.tech.map((t) => (
                    <span key={t} className="tech-pill">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Live Simulation Invitation Card */}
        <section className="lab-cta-panel">
          <div className="cta-icon-box" aria-hidden="true">
            🚀
          </div>
          <div className="cta-content">
            <h2 className="cta-title">Ingin Mencoba Simulasi Langsung di Browser?</h2>
            <p className="cta-text">
              Sembari karya game Roblox kami disiapkan untuk rilis publik, Anda dapat menguji
              kemampuan refleks dan sistem navigasi antariksa langsung di modul simulasi kami:
              mini game <strong>Asteroid Dodge</strong> dan <strong>Eksplorasi Planet</strong>.
            </p>
            <div className="cta-actions">
              <button
                onClick={() => {
                  if (onNavigatePlayground) {
                    onNavigatePlayground();
                  } else {
                    window.location.hash = '#playground';
                  }
                }}
                className="btn-primary-glow"
              >
                Buka Space Playground Sekarang →
              </button>
              <button onClick={onBack} className="btn-secondary-ghost">
                Jelajahi Portofolio Utama
              </button>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .roblox-lab-page {
          min-height: 100vh;
          padding: 100px 24px 80px;
          background: radial-gradient(circle at 50% 20%, rgba(192, 132, 252, 0.08) 0%, rgba(5, 5, 10, 0.96) 80%);
          color: #f8fafc;
          position: relative;
          z-index: 10;
        }

        .lab-container {
          max-width: 1080px;
          margin: 0 auto;
        }

        .lab-nav-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 36px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .lab-back-btn {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(192, 132, 252, 0.3);
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

        .lab-back-btn:hover, .lab-back-btn:focus-visible {
          background: rgba(192, 132, 252, 0.2);
          border-color: #c084fc;
          color: #ffffff;
          outline: none;
          transform: translateX(-3px);
        }

        .lab-station-badge {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          color: #c084fc;
          background: rgba(192, 132, 252, 0.12);
          border: 1px solid rgba(192, 132, 252, 0.25);
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
          background: #c084fc;
          box-shadow: 0 0 10px #c084fc;
          display: inline-block;
          animation: badgePulse 2s infinite;
        }

        @keyframes badgePulse {
          0%, 100% { opacity: 0.4; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        .lab-hero {
          margin-bottom: 56px;
        }

        .lab-hero-eyebrow {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-size: 0.8rem;
          letter-spacing: 0.2em;
          color: #c084fc;
          margin-bottom: 12px;
          text-transform: uppercase;
        }

        .lab-title {
          font-size: clamp(2.2rem, 5vw, 3.4rem);
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 20px;
          letter-spacing: -0.02em;
        }

        .lab-accent {
          color: #c084fc;
        }

        .lab-lead {
          font-size: 1.15rem;
          line-height: 1.7;
          color: #94a3b8;
          max-width: 820px;
          margin-bottom: 32px;
        }

        .lab-fact-card {
          display: flex;
          gap: 20px;
          background: rgba(30, 20, 50, 0.6);
          border: 1px solid rgba(192, 132, 252, 0.35);
          border-left: 4px solid #c084fc;
          padding: 22px 26px;
          border-radius: 12px;
          backdrop-filter: blur(12px);
        }

        .fact-icon {
          font-size: 2rem;
          line-height: 1;
        }

        .fact-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 6px;
        }

        .fact-text {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #cbd5e1;
          margin: 0;
        }

        .lab-modules-section {
          margin-bottom: 64px;
        }

        .section-header-compact {
          margin-bottom: 28px;
        }

        .section-title {
          font-size: 1.6rem;
          font-weight: 700;
          color: #f8fafc;
          margin-bottom: 8px;
        }

        .section-subtitle {
          color: #94a3b8;
          font-size: 0.95rem;
          margin: 0;
        }

        .modules-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }

        .module-card {
          background: rgba(15, 23, 42, 0.7);
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-radius: 14px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease, border-color 0.2s ease;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
        }

        .module-card:hover {
          transform: translateY(-4px);
          border-color: rgba(192, 132, 252, 0.45);
        }

        .module-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .module-id {
          font-family: 'Space Grotesk', monospace;
          font-size: 0.8rem;
          color: #c084fc;
          letter-spacing: 0.08em;
        }

        .module-badge {
          font-size: 0.75rem;
          padding: 4px 10px;
          border-radius: 20px;
          background: rgba(192, 132, 252, 0.15);
          color: #e9d5ff;
          border: 1px solid rgba(192, 132, 252, 0.3);
        }

        .module-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 12px;
          line-height: 1.4;
        }

        .module-desc {
          font-size: 0.9rem;
          line-height: 1.6;
          color: #94a3b8;
          margin-bottom: 16px;
          flex-grow: 1;
        }

        .module-notes {
          background: rgba(5, 5, 10, 0.5);
          border-left: 2px solid #818cf8;
          padding: 10px 14px;
          border-radius: 4px;
          font-size: 0.82rem;
          line-height: 1.5;
          color: #cbd5e1;
          margin-bottom: 16px;
        }

        .notes-label {
          color: #818cf8;
          font-weight: 600;
        }

        .module-tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tech-pill {
          font-size: 0.75rem;
          background: rgba(30, 41, 59, 0.8);
          color: #cbd5e1;
          padding: 4px 10px;
          border-radius: 6px;
          border: 1px solid rgba(148, 163, 184, 0.15);
        }

        .lab-cta-panel {
          display: flex;
          gap: 28px;
          background: linear-gradient(135deg, rgba(25, 15, 45, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%);
          border: 1px solid rgba(192, 132, 252, 0.35);
          border-radius: 16px;
          padding: 36px;
          align-items: center;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }

        .cta-icon-box {
          font-size: 3.2rem;
          flex-shrink: 0;
        }

        .cta-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 8px;
        }

        .cta-text {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #94a3b8;
          margin-bottom: 20px;
        }

        .cta-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .btn-primary-glow {
          background: linear-gradient(135deg, #c084fc 0%, #7c3aed 100%);
          color: #ffffff;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 18px rgba(192, 132, 252, 0.35);
        }

        .btn-primary-glow:hover, .btn-primary-glow:focus-visible {
          box-shadow: 0 6px 24px rgba(192, 132, 252, 0.6);
          transform: translateY(-2px);
          outline: none;
        }

        .btn-secondary-ghost {
          background: transparent;
          color: #cbd5e1;
          border: 1px solid rgba(148, 163, 184, 0.3);
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-secondary-ghost:hover, .btn-secondary-ghost:focus-visible {
          background: rgba(255, 255, 255, 0.05);
          border-color: #cbd5e1;
          color: #ffffff;
          outline: none;
        }

        @media (max-width: 768px) {
          .roblox-lab-page {
            padding: 84px 16px 60px;
          }

          .lab-fact-card {
            flex-direction: column;
            gap: 12px;
          }

          .lab-cta-panel {
            flex-direction: column;
            text-align: center;
            padding: 24px;
          }

          .cta-actions {
            justify-content: center;
          }
        }
      `}</style>
    </main>
  );
};
