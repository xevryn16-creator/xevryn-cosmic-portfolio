// src/pages/AtomicHubPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { atomicMediaGallery } from '@/content/atomicMedia';
import { AtomicMediaItem } from '@/types/content';

interface AtomicHubPageProps {
  onBack: () => void;
}

export const AtomicHubPage: React.FC<AtomicHubPageProps> = ({ onBack }) => {
  const [selectedMedia, setSelectedMedia] = useState<AtomicMediaItem | null>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);
  const modalCloseBtnRef = useRef<HTMLButtonElement | null>(null);

  // Handle ESC key to close modal and restore focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedMedia) {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMedia]);

  const handleOpenModal = (item: AtomicMediaItem, e: React.MouseEvent<HTMLElement>) => {
    triggerElementRef.current = e.currentTarget;
    setSelectedMedia(item);
    setTimeout(() => {
      modalCloseBtnRef.current?.focus();
    }, 50);
  };

  const handleCloseModal = () => {
    setSelectedMedia(null);
    setTimeout(() => {
      triggerElementRef.current?.focus();
    }, 50);
  };

  return (
    <main id="main-content" className="atomic-hub-page" tabIndex={-1}>
      <div className="hub-container">
        {/* Navigation Breadcrumb */}
        <div className="hub-nav-header">
          <button
            onClick={onBack}
            className="hub-back-btn"
            aria-label="Kembali ke Orbit Utama"
          >
            <span aria-hidden="true">←</span> Kembali ke Orbit Utama
          </button>
          <div className="hub-station-badge">
            <span className="badge-pulsar" aria-hidden="true" />
            STASIUN ATOMIC HUB · KONTRIBUSI KREATIF
          </div>
        </div>

        {/* Hero Banner */}
        <header className="hub-hero">
          <div className="hub-hero-eyebrow">DOKUMENTASI KONTRIBUSI & PEMASARAN DIGITAL</div>
          <h1 className="hub-title">
            Atomic Roblox Hub <span className="hub-accent">Showcase</span>
          </h1>
          <p className="hub-lead">
            Halaman ini didedikasikan sebagai ruang dokumentasi kontribusi saya sebagai{' '}
            <strong>Content Creator & Pemasaran</strong> di Atomic Roblox Hub. Seluruh publikasi
            dan materi promosi dirancang untuk mendukung interaksi komunitas dan keterlibatan pemain.
          </p>

          {/* Factual Disclaimer Card */}
          <div className="hub-disclaimer-card">
            <div className="disclaimer-icon" aria-hidden="true">
              ⚡
            </div>
            <div className="disclaimer-text">
              <h2 className="disclaimer-title">Catatan Status & Integritas Kontributor</h2>
              <p>
                Ruang ini merupakan etalase portofolio kontribusi pribadi saya, bukan website resmi
                atau klaim kepemilikan atas Atomic Roblox Hub. Seluruh metrik statistik, pengikut,
                dan hasil kampanye sengaja tidak dikarang. Media asli akan ditautkan setelah materi
                kampanye resmi dirilis untuk publik.
              </p>
            </div>
          </div>
        </header>

        {/* Holographic Media Gallery Section */}
        <section className="hub-gallery-section" aria-labelledby="gallery-heading">
          <div className="section-header-compact">
            <h2 id="gallery-heading" className="section-title">
              Galeri Layar Hologram Kontribusi
            </h2>
            <p className="section-subtitle">
              Format terstruktur yang disiapkan untuk cuplikan visual, poster kampanye, dan video pendek.
            </p>
          </div>

          <div className="hologram-grid">
            {atomicMediaGallery.map((item) => (
              <article
                key={item.id}
                className="hologram-card"
                tabIndex={0}
                role="button"
                aria-haspopup="dialog"
                onClick={(e) => handleOpenModal(item, e)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOpenModal(item, e as any);
                  }
                }}
              >
                <div className="hologram-screen">
                  {/* Holographic grid scanline decoration */}
                  <div className="screen-scanline" aria-hidden="true" />
                  <div className="screen-corner corner-tl" aria-hidden="true" />
                  <div className="screen-corner corner-tr" aria-hidden="true" />
                  <div className="screen-corner corner-bl" aria-hidden="true" />
                  <div className="screen-corner corner-br" aria-hidden="true" />

                  <div className="screen-content">
                    <div className="screen-icon" aria-hidden="true">
                      {item.type === 'video' ? '🎬' : '🖼️'}
                    </div>
                    <span className="screen-status-badge">
                      {item.status === 'CONTENT_PENDING' ? 'SLOT MEDIA DISIAPKAN' : 'AKTIF'}
                    </span>
                    <h3 className="screen-card-title">{item.title}</h3>
                    <p className="screen-hint">Klik atau tekan Enter untuk inspeksi modal</p>
                  </div>
                </div>

                <div className="hologram-footer">
                  <span className="platform-tag">{item.platform}</span>
                  <span className="type-badge">{item.type.toUpperCase()}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Roles Breakdown Bento */}
        <section className="hub-roles-section">
          <div className="roles-grid">
            <div className="role-card">
              <div className="role-header">
                <span className="role-num">01</span>
                <h3 className="role-title">Pembuatan Konten (Content Creation)</h3>
              </div>
              <p className="role-desc">
                Penyusunan ide konsep visual, pembuatan grafis pengumuman, dan penataan materi
                komunikasi untuk memperkenalkan pembaruan terkini di lingkungan Atomic Roblox Hub.
              </p>
            </div>

            <div className="role-card">
              <div className="role-header">
                <span className="role-num">02</span>
                <h3 className="role-title">Pemasaran Komunitas (Community Marketing)</h3>
              </div>
              <p className="role-desc">
                Membantu menjangkau audiens pemain baru, mengelola penyampaian pesan kampanye, serta
                membangun antusiasme pengguna saat event dan fitur baru diluncurkan.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Holographic Lightbox Modal */}
      {selectedMedia && (
        <div
          className="hologram-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={handleCloseModal}
        >
          <div
            className="hologram-modal-window"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-badge">
                <span className="badge-pulsar" aria-hidden="true" />
                DOKUMENTASI KONTRIBUTOR · {selectedMedia.id}
              </div>
              <button
                ref={modalCloseBtnRef}
                onClick={handleCloseModal}
                className="modal-close-btn"
                aria-label="Tutup jendela hologram"
              >
                ✕ ESC
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-display-area">
                <div className="display-placeholder">
                  <div className="placeholder-icon" aria-hidden="true">
                    {selectedMedia.type === 'video' ? '📽️' : '🌌'}
                  </div>
                  <h4 className="placeholder-title">{selectedMedia.title}</h4>
                  <p className="placeholder-desc">
                    Materi visual / video resolusi penuh sedang disiapkan. Begitu materi kampanye resmi
                    tersedia, file media akan disematkan langsung di jendela interaktif ini dengan
                    kontrol pemutar video lengkap.
                  </p>
                </div>
              </div>

              <div className="modal-info-panel">
                <h3 id="modal-title" className="info-title">
                  {selectedMedia.title}
                </h3>
                <p className="info-caption">{selectedMedia.caption}</p>

                <div className="info-meta-list">
                  <div className="meta-item">
                    <span className="meta-label">Entitas:</span>
                    <span className="meta-val">{selectedMedia.platform}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Format:</span>
                    <span className="meta-val">{selectedMedia.type.toUpperCase()}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Status Aset:</span>
                    <span className="meta-val meta-pending">Menunggu Publikasi Resmi</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={handleCloseModal} className="btn-modal-close">
                Kembali ke Galeri
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .atomic-hub-page {
          min-height: 100vh;
          padding: 100px 24px 80px;
          background: radial-gradient(circle at 50% 20%, rgba(236, 72, 153, 0.08) 0%, rgba(5, 5, 10, 0.96) 80%);
          color: #f8fafc;
          position: relative;
          z-index: 10;
        }

        .hub-container {
          max-width: 1080px;
          margin: 0 auto;
        }

        .hub-nav-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 36px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .hub-back-btn {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(236, 72, 153, 0.3);
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

        .hub-back-btn:hover, .hub-back-btn:focus-visible {
          background: rgba(236, 72, 153, 0.2);
          border-color: #ec4899;
          color: #ffffff;
          outline: none;
          transform: translateX(-3px);
        }

        .hub-station-badge {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          color: #ec4899;
          background: rgba(236, 72, 153, 0.12);
          border: 1px solid rgba(236, 72, 153, 0.25);
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
          background: #ec4899;
          box-shadow: 0 0 10px #ec4899;
          display: inline-block;
          animation: badgePulse 2s infinite;
        }

        .hub-hero {
          margin-bottom: 56px;
        }

        .hub-hero-eyebrow {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-size: 0.8rem;
          letter-spacing: 0.2em;
          color: #ec4899;
          margin-bottom: 12px;
          text-transform: uppercase;
        }

        .hub-title {
          font-size: clamp(2.2rem, 5vw, 3.4rem);
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 20px;
          letter-spacing: -0.02em;
        }

        .hub-accent {
          color: #ec4899;
        }

        .hub-lead {
          font-size: 1.15rem;
          line-height: 1.7;
          color: #94a3b8;
          max-width: 820px;
          margin-bottom: 32px;
        }

        .hub-disclaimer-card {
          display: flex;
          gap: 20px;
          background: rgba(40, 15, 30, 0.6);
          border: 1px solid rgba(236, 72, 153, 0.35);
          border-left: 4px solid #ec4899;
          padding: 22px 26px;
          border-radius: 12px;
          backdrop-filter: blur(12px);
        }

        .disclaimer-icon {
          font-size: 2rem;
          line-height: 1;
        }

        .disclaimer-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 6px;
        }

        .disclaimer-text p {
          font-size: 0.92rem;
          line-height: 1.6;
          color: #cbd5e1;
          margin: 0;
        }

        .hub-gallery-section {
          margin-bottom: 64px;
        }

        .hologram-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }

        .hologram-card {
          background: rgba(15, 23, 42, 0.7);
          border: 1px solid rgba(236, 72, 153, 0.2);
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.25s ease;
          display: flex;
          flex-direction: column;
        }

        .hologram-card:hover, .hologram-card:focus-visible {
          transform: translateY(-4px);
          border-color: #ec4899;
          box-shadow: 0 8px 30px rgba(236, 72, 153, 0.2);
          outline: none;
        }

        .hologram-screen {
          position: relative;
          aspect-ratio: 16 / 10;
          background: linear-gradient(180deg, #090e1f 0%, #15091a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          text-align: center;
          overflow: hidden;
        }

        .screen-scanline {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 2px,
            transparent 2px,
            transparent 4px
          );
          pointer-events: none;
        }

        .screen-corner {
          position: absolute;
          width: 10px;
          height: 10px;
          border-color: #ec4899;
          border-style: solid;
        }

        .corner-tl { top: 8px; left: 8px; border-width: 2px 0 0 2px; }
        .corner-tr { top: 8px; right: 8px; border-width: 2px 2px 0 0; }
        .corner-bl { bottom: 8px; left: 8px; border-width: 0 0 2px 2px; }
        .corner-br { bottom: 8px; right: 8px; border-width: 0 2px 2px 0; }

        .screen-icon {
          font-size: 2.2rem;
          margin-bottom: 8px;
        }

        .screen-status-badge {
          font-size: 0.7rem;
          font-family: 'Space Grotesk', monospace;
          color: #ec4899;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
          display: block;
        }

        .screen-card-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 6px;
        }

        .screen-hint {
          font-size: 0.8rem;
          color: #94a3b8;
          margin: 0;
        }

        .hologram-footer {
          padding: 14px 18px;
          background: rgba(10, 14, 26, 0.8);
          border-top: 1px solid rgba(148, 163, 184, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .platform-tag {
          font-size: 0.8rem;
          color: #cbd5e1;
        }

        .type-badge {
          font-size: 0.7rem;
          padding: 2px 8px;
          border-radius: 4px;
          background: rgba(236, 72, 153, 0.15);
          color: #fbcfe8;
          font-weight: 600;
        }

        .roles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
        }

        .role-card {
          background: rgba(15, 23, 42, 0.7);
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-radius: 14px;
          padding: 28px;
        }

        .role-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 14px;
        }

        .role-num {
          font-family: 'Space Grotesk', monospace;
          font-size: 1.6rem;
          font-weight: 800;
          color: #ec4899;
        }

        .role-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }

        .role-desc {
          font-size: 0.92rem;
          line-height: 1.6;
          color: #94a3b8;
          margin: 0;
        }

        /* Modal Styles */
        .hologram-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(3, 4, 10, 0.85);
          backdrop-filter: blur(14px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: modalFadeIn 0.2s ease;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }

        .hologram-modal-window {
          background: #090e1f;
          border: 1px solid rgba(236, 72, 153, 0.4);
          border-radius: 16px;
          max-width: 780px;
          width: 100%;
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.7), 0 0 30px rgba(236, 72, 153, 0.2);
          overflow: hidden;
        }

        .modal-header {
          padding: 16px 24px;
          background: rgba(15, 23, 42, 0.9);
          border-bottom: 1px solid rgba(148, 163, 184, 0.15);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-badge {
          font-family: 'Space Grotesk', system-ui;
          font-size: 0.8rem;
          color: #ec4899;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
        }

        .modal-close-btn {
          background: transparent;
          border: 1px solid rgba(148, 163, 184, 0.25);
          color: #cbd5e1;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .modal-close-btn:hover, .modal-close-btn:focus-visible {
          border-color: #ec4899;
          color: #ffffff;
          outline: none;
        }

        .modal-body {
          padding: 28px;
        }

        .modal-display-area {
          aspect-ratio: 16 / 9;
          background: #050711;
          border: 1px solid rgba(236, 72, 153, 0.25);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          padding: 32px;
          text-align: center;
        }

        .placeholder-icon {
          font-size: 3rem;
          margin-bottom: 12px;
        }

        .placeholder-title {
          font-size: 1.25rem;
          color: #ffffff;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .placeholder-desc {
          font-size: 0.9rem;
          line-height: 1.6;
          color: #94a3b8;
          max-width: 500px;
          margin: 0 auto;
        }

        .info-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 10px;
        }

        .info-caption {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #cbd5e1;
          margin-bottom: 20px;
        }

        .info-meta-list {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          padding: 14px 18px;
          background: rgba(15, 23, 42, 0.6);
          border-radius: 8px;
        }

        .meta-item {
          display: flex;
          gap: 8px;
          font-size: 0.85rem;
        }

        .meta-label {
          color: #94a3b8;
        }

        .meta-val {
          color: #f1f5f9;
          font-weight: 500;
        }

        .meta-pending {
          color: #f59e0b;
        }

        .modal-footer {
          padding: 16px 24px;
          background: rgba(10, 14, 26, 0.9);
          border-top: 1px solid rgba(148, 163, 184, 0.15);
          display: flex;
          justify-content: flex-end;
        }

        .btn-modal-close {
          background: #ec4899;
          color: #ffffff;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .btn-modal-close:hover {
          background: #db2777;
        }

        @media (max-width: 768px) {
          .atomic-hub-page {
            padding: 84px 16px 60px;
          }

          .hub-disclaimer-card {
            flex-direction: column;
            gap: 12px;
          }

          .modal-display-area {
            aspect-ratio: auto;
            min-height: 200px;
          }
        }
      `}</style>
    </main>
  );
};
