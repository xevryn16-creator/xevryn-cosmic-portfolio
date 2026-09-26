// src/pages/AssetStationPage.tsx
import React, { useState } from 'react';
import { assetCatalog } from '@/content/assets';
import { AssetItem } from '@/types/content';

interface AssetStationPageProps {
  onBack: () => void;
}

export const AssetStationPage: React.FC<AssetStationPageProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePreviewAsset, setActivePreviewAsset] = useState<AssetItem | null>(null);

  const filteredAssets = assetCatalog.filter((asset) => {
    const matchesCategory =
      selectedCategory === 'all' || asset.category === selectedCategory;
    const matchesSearch =
      asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <main id="main-content" className="asset-station-page" tabIndex={-1}>
      <div className="station-container">
        {/* Navigation Breadcrumb */}
        <div className="station-nav-header">
          <button
            onClick={onBack}
            className="station-back-btn"
            aria-label="Kembali ke Orbit Utama"
          >
            <span aria-hidden="true">←</span> Kembali ke Orbit Utama
          </button>
          <div className="station-badge">
            <span className="badge-pulsar" aria-hidden="true" />
            STASIUN LOGISTIK · ASSET STATION
          </div>
        </div>

        {/* Hero Title */}
        <header className="station-hero">
          <div className="station-hero-eyebrow">KATALOG ASET VEKTOR & GRAFIS KOSMIK</div>
          <h1 className="station-title">
            Asset <span className="station-accent">Station</span>
          </h1>
          <p className="station-lead">
            Unduh aset desain grafis, paket ikon orbit SVG, dan pola latar belakang orisinal buatan
            XEVRYN. Seluruh aset di bawah ini berlisensi bebas (MIT / CC0) dan dapat langsung
            digunakan untuk proyek pribadi maupun komersial tanpa royalti.
          </p>
        </header>

        {/* Search & Filter Toolbar */}
        <div className="station-toolbar">
          <div className="search-box">
            <span className="search-icon" aria-hidden="true">
              🔍
            </span>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari aset (misal: ikon, wallpaper, pattern)..."
              className="search-input"
              aria-label="Cari aset desain"
            />
          </div>

          <div className="filter-pills" role="radiogroup" aria-label="Filter Kategori">
            {[
              { id: 'all', label: 'Semua Kategori' },
              { id: 'icons', label: 'Paket Ikon' },
              { id: 'patterns', label: 'Pola Latar' },
              { id: 'wallpapers', label: 'Wallpaper' },
              { id: 'ui', label: 'Monogram & UI' },
            ].map((cat) => (
              <button
                key={cat.id}
                role="radio"
                aria-checked={selectedCategory === cat.id}
                className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Assets Grid */}
        <section className="assets-grid-section">
          {filteredAssets.length === 0 ? (
            <div className="empty-assets-state">
              <div className="empty-icon" aria-hidden="true">
                📦
              </div>
              <h3 className="empty-title">Tidak ada aset yang sesuai</h3>
              <p className="empty-desc">
                Coba gunakan kata kunci pencarian lain atau pilih kategori Semua.
              </p>
            </div>
          ) : (
            <div className="assets-grid">
              {filteredAssets.map((asset) => (
                <article key={asset.id} className="asset-card">
                  {/* Asset Visual Preview Box */}
                  <div className="asset-preview-box">
                    <img
                      src={asset.previewUrl}
                      alt={`Preview visual dari ${asset.title}`}
                      className="asset-preview-img"
                      loading="lazy"
                    />
                    <div className="preview-overlay-btn">
                      <button
                        onClick={() => setActivePreviewAsset(asset)}
                        className="btn-inspect"
                        aria-label={`Inspeksi ${asset.title}`}
                      >
                        Perbesar Preview
                      </button>
                    </div>
                  </div>

                  {/* Asset Details */}
                  <div className="asset-body">
                    <div className="asset-header-meta">
                      <span className="asset-id">{asset.id}</span>
                      <span className="asset-format-badge">{asset.format}</span>
                    </div>

                    <h2 className="asset-title">{asset.title}</h2>
                    <p className="asset-desc">{asset.description}</p>

                    <div className="asset-specs-table">
                      <div className="spec-row">
                        <span className="spec-label">Dimensi / Ukuran:</span>
                        <span className="spec-val">{asset.dimensionOrSize}</span>
                      </div>
                      <div className="spec-row">
                        <span className="spec-label">Ketentuan Lisensi:</span>
                        <span className="spec-val spec-license">{asset.license}</span>
                      </div>
                      <div className="spec-row">
                        <span className="spec-label">Asal Sumber:</span>
                        <span className="spec-val">{asset.source}</span>
                      </div>
                    </div>

                    <div className="asset-tags">
                      {asset.tags.map((t) => (
                        <span key={t} className="asset-tag">
                          #{t}
                        </span>
                      ))}
                    </div>

                    {/* Direct Real Download Link */}
                    <div className="asset-card-footer">
                      <a
                        href={asset.downloadUrl}
                        download
                        className="btn-download-asset"
                      >
                        <span aria-hidden="true">📥</span> Unduh File Asli
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Fullscreen Preview Lightbox */}
      {activePreviewAsset && (
        <div
          className="preview-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-title"
          onClick={() => setActivePreviewAsset(null)}
        >
          <div
            className="preview-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="preview-modal-header">
              <h3 id="preview-title" className="preview-modal-title">
                {activePreviewAsset.title}
              </h3>
              <button
                onClick={() => setActivePreviewAsset(null)}
                className="modal-close-btn"
                aria-label="Tutup jendela preview"
              >
                ✕ ESC
              </button>
            </div>

            <div className="preview-modal-body">
              <img
                src={activePreviewAsset.previewUrl}
                alt={activePreviewAsset.title}
                className="modal-large-img"
              />
            </div>

            <div className="preview-modal-footer">
              <span className="modal-specs">
                {activePreviewAsset.format} · {activePreviewAsset.dimensionOrSize}
              </span>
              <a
                href={activePreviewAsset.downloadUrl}
                download
                className="btn-download-asset"
              >
                <span aria-hidden="true">📥</span> Unduh Sekarang
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .asset-station-page {
          min-height: 100vh;
          padding: 100px 24px 80px;
          background: radial-gradient(circle at 50% 20%, rgba(16, 185, 129, 0.08) 0%, rgba(5, 5, 10, 0.96) 80%);
          color: #f8fafc;
          position: relative;
          z-index: 10;
        }

        .station-container {
          max-width: 1080px;
          margin: 0 auto;
        }

        .station-nav-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 36px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .station-back-btn {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(16, 185, 129, 0.3);
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

        .station-back-btn:hover, .station-back-btn:focus-visible {
          background: rgba(16, 185, 129, 0.2);
          border-color: #10b981;
          color: #ffffff;
          outline: none;
          transform: translateX(-3px);
        }

        .station-badge {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          color: #10b981;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.25);
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
          background: #10b981;
          box-shadow: 0 0 10px #10b981;
          display: inline-block;
          animation: badgePulse 2s infinite;
        }

        .station-hero {
          margin-bottom: 40px;
        }

        .station-hero-eyebrow {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-size: 0.8rem;
          letter-spacing: 0.2em;
          color: #10b981;
          margin-bottom: 12px;
          text-transform: uppercase;
        }

        .station-title {
          font-size: clamp(2.2rem, 5vw, 3.4rem);
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }

        .station-accent {
          color: #10b981;
        }

        .station-lead {
          font-size: 1.15rem;
          line-height: 1.7;
          color: #94a3b8;
          max-width: 820px;
        }

        .station-toolbar {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 40px;
        }

        .search-box {
          display: flex;
          align-items: center;
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 10px;
          padding: 8px 16px;
        }

        .search-icon {
          margin-right: 12px;
          font-size: 1.1rem;
        }

        .search-input {
          flex: 1;
          background: transparent;
          border: none;
          color: #f8fafc;
          font-size: 1rem;
          outline: none;
        }

        .filter-pills {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .filter-btn {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(148, 163, 184, 0.2);
          color: #cbd5e1;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-btn.active {
          background: #10b981;
          color: #000000;
          border-color: #10b981;
          font-weight: 700;
        }

        .assets-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 28px;
        }

        .asset-card {
          background: rgba(15, 23, 42, 0.7);
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-radius: 14px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .asset-card:hover {
          transform: translateY(-4px);
          border-color: rgba(16, 185, 129, 0.4);
        }

        .asset-preview-box {
          position: relative;
          aspect-ratio: 16 / 10;
          background: #080c1b;
          overflow: hidden;
          border-bottom: 1px solid rgba(148, 163, 184, 0.1);
        }

        .asset-preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .preview-overlay-btn {
          position: absolute;
          inset: 0;
          background: rgba(5, 7, 18, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .asset-preview-box:hover .preview-overlay-btn {
          opacity: 1;
        }

        .btn-inspect {
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid #10b981;
          color: #ffffff;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 0.85rem;
          cursor: pointer;
        }

        .asset-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .asset-header-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .asset-id {
          font-family: 'Space Grotesk', monospace;
          font-size: 0.8rem;
          color: #10b981;
        }

        .asset-format-badge {
          font-size: 0.75rem;
          background: rgba(16, 185, 129, 0.15);
          color: #a7f3d0;
          padding: 2px 8px;
          border-radius: 4px;
        }

        .asset-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 10px;
        }

        .asset-desc {
          font-size: 0.9rem;
          line-height: 1.6;
          color: #94a3b8;
          margin-bottom: 18px;
        }

        .asset-specs-table {
          background: rgba(5, 5, 10, 0.4);
          border-radius: 8px;
          padding: 12px 14px;
          margin-bottom: 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 0.82rem;
        }

        .spec-row {
          display: flex;
          justify-content: space-between;
          gap: 12px;
        }

        .spec-label {
          color: #94a3b8;
        }

        .spec-val {
          color: #f1f5f9;
          font-weight: 500;
        }

        .spec-license {
          color: #10b981;
        }

        .asset-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 20px;
        }

        .asset-tag {
          font-size: 0.75rem;
          color: #64748b;
        }

        .asset-card-footer {
          margin-top: auto;
        }

        .btn-download-asset {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          background: #10b981;
          color: #000000;
          font-weight: 700;
          padding: 12px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 0.95rem;
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .btn-download-asset:hover, .btn-download-asset:focus-visible {
          background: #059669;
          color: #ffffff;
          transform: translateY(-2px);
          outline: none;
        }

        /* Modal Preview */
        .preview-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(3, 4, 10, 0.85);
          backdrop-filter: blur(12px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .preview-modal-content {
          background: #090e1f;
          border: 1px solid rgba(16, 185, 129, 0.4);
          border-radius: 16px;
          max-width: 880px;
          width: 100%;
          overflow: hidden;
        }

        .preview-modal-header {
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(148, 163, 184, 0.15);
        }

        .modal-large-img {
          width: 100%;
          max-height: 60vh;
          object-fit: contain;
          background: #050711;
          display: block;
        }

        .preview-modal-footer {
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(148, 163, 184, 0.15);
        }

        @media (max-width: 768px) {
          .asset-station-page {
            padding: 84px 16px 60px;
          }
        }
      `}</style>
    </main>
  );
};
