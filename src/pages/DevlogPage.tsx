// src/pages/DevlogPage.tsx
import React, { useState } from 'react';
import { devlogArticles } from '@/content/devlog';

interface DevlogPageProps {
  onBack: () => void;
  onSelectArticle: (slug: string) => void;
}

export const DevlogPage: React.FC<DevlogPageProps> = ({
  onBack,
  onSelectArticle,
}) => {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const allTags = Array.from(
    new Set(devlogArticles.flatMap((a) => a.tags))
  );

  const filteredArticles = devlogArticles.filter((art) => {
    const matchesTag = selectedTag === 'all' || art.tags.includes(selectedTag);
    const matchesSearch =
      art.title.toLowerCase().includes(search.toLowerCase()) ||
      art.summary.toLowerCase().includes(search.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <main id="main-content" className="devlog-page" tabIndex={-1}>
      <div className="devlog-container">
        {/* Navigation Breadcrumb */}
        <div className="devlog-nav-header">
          <button
            onClick={onBack}
            className="devlog-back-btn"
            aria-label="Kembali ke Orbit Utama"
          >
            <span aria-hidden="true">←</span> Kembali ke Orbit Utama
          </button>
          <div className="devlog-badge">
            <span className="badge-pulsar" aria-hidden="true" />
            ARSIP TRANSMISI · XEVRYN DEVLOG
          </div>
        </div>

        {/* Hero Title */}
        <header className="devlog-hero">
          <div className="devlog-hero-eyebrow">CATATAN REKAYASA & ARSITEKTUR KOSMIK</div>
          <h1 className="devlog-title">
            Engineering <span className="devlog-accent">Devlog</span>
          </h1>
          <p className="devlog-lead">
            Dokumentasi faktual mengenai keputusan arsitektur, tantangan rekayasa 3D WebGL,
            koreografi timeline GSAP, dan evolusi modul di balik pembangunan ekosistem XEVRYN Space Hub.
          </p>
        </header>

        {/* Search & Tag Filters */}
        <div className="devlog-toolbar">
          <div className="search-box">
            <span className="search-icon" aria-hidden="true">
              🔍
            </span>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari artikel rekayasa (misal: Three.js, GSAP, roket)..."
              className="search-input"
              aria-label="Cari artikel devlog"
            />
          </div>

          <div className="tags-row" role="radiogroup" aria-label="Filter Tag">
            <button
              role="radio"
              aria-checked={selectedTag === 'all'}
              className={`tag-filter-btn ${selectedTag === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedTag('all')}
            >
              Semua Tag
            </button>
            {allTags.map((t) => (
              <button
                key={t}
                role="radio"
                aria-checked={selectedTag === t}
                className={`tag-filter-btn ${selectedTag === t ? 'active' : ''}`}
                onClick={() => setSelectedTag(t)}
              >
                #{t}
              </button>
            ))}
          </div>
        </div>

        {/* Article Cards Grid */}
        <section className="articles-grid" aria-label="Daftar Artikel Devlog">
          {filteredArticles.map((art) => (
            <article
              key={art.id}
              className="devlog-card"
              onClick={() => onSelectArticle(art.slug)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectArticle(art.slug);
                }
              }}
              tabIndex={0}
              role="button"
            >
              <div className="card-top-meta">
                <span className="article-date">{art.publishDate}</span>
                <span className="reading-time">{art.readingTime}</span>
              </div>

              <h2 className="article-card-title">{art.title}</h2>
              <p className="article-card-summary">{art.summary}</p>

              <div className="highlights-preview">
                <span className="highlights-title">Poin Rekayasa Kunci:</span>
                <ul>
                  {art.keyHighlights.slice(0, 2).map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
              </div>

              <div className="card-bottom-row">
                <div className="article-tags">
                  {art.tags.map((t) => (
                    <span key={t} className="tag-badge">
                      #{t}
                    </span>
                  ))}
                </div>
                <span className="read-more-link" aria-hidden="true">
                  Baca Selengkapnya →
                </span>
              </div>
            </article>
          ))}
        </section>
      </div>

      <style>{`
        .devlog-page {
          min-height: 100vh;
          padding: 100px 24px 80px;
          background: radial-gradient(circle at 50% 20%, rgba(99, 102, 241, 0.08) 0%, rgba(5, 5, 10, 0.96) 80%);
          color: #f8fafc;
          position: relative;
          z-index: 10;
        }

        .devlog-container {
          max-width: 960px;
          margin: 0 auto;
        }

        .devlog-nav-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 36px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .devlog-back-btn {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(99, 102, 241, 0.3);
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

        .devlog-back-btn:hover, .devlog-back-btn:focus-visible {
          background: rgba(99, 102, 241, 0.2);
          border-color: #6366f1;
          color: #ffffff;
          outline: none;
          transform: translateX(-3px);
        }

        .devlog-badge {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          color: #818cf8;
          background: rgba(99, 102, 241, 0.12);
          border: 1px solid rgba(99, 102, 241, 0.25);
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
          background: #818cf8;
          box-shadow: 0 0 10px #818cf8;
          display: inline-block;
          animation: badgePulse 2s infinite;
        }

        .devlog-hero {
          margin-bottom: 40px;
        }

        .devlog-hero-eyebrow {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-size: 0.8rem;
          letter-spacing: 0.2em;
          color: #818cf8;
          margin-bottom: 12px;
          text-transform: uppercase;
        }

        .devlog-title {
          font-size: clamp(2.2rem, 5vw, 3.4rem);
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }

        .devlog-accent {
          color: #818cf8;
        }

        .devlog-lead {
          font-size: 1.15rem;
          line-height: 1.7;
          color: #94a3b8;
          max-width: 820px;
        }

        .devlog-toolbar {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 36px;
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

        .tags-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .tag-filter-btn {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(148, 163, 184, 0.2);
          color: #cbd5e1;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.82rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tag-filter-btn.active {
          background: #6366f1;
          color: #ffffff;
          border-color: #6366f1;
          font-weight: 600;
        }

        .articles-grid {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .devlog-card {
          background: rgba(15, 23, 42, 0.75);
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-radius: 14px;
          padding: 32px;
          cursor: pointer;
          transition: all 0.25s ease;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
        }

        .devlog-card:hover, .devlog-card:focus-visible {
          transform: translateY(-4px);
          border-color: #818cf8;
          box-shadow: 0 8px 32px rgba(99, 102, 241, 0.2);
          outline: none;
        }

        .card-top-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: #818cf8;
          margin-bottom: 14px;
          font-family: 'Space Grotesk', monospace;
        }

        .article-card-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #f8fafc;
          margin-bottom: 12px;
          line-height: 1.35;
        }

        .article-card-summary {
          font-size: 0.95rem;
          line-height: 1.65;
          color: #cbd5e1;
          margin-bottom: 20px;
        }

        .highlights-preview {
          background: rgba(5, 5, 10, 0.4);
          border-left: 3px solid #6366f1;
          padding: 12px 18px;
          border-radius: 6px;
          margin-bottom: 20px;
        }

        .highlights-title {
          font-size: 0.8rem;
          color: #818cf8;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 6px;
        }

        .highlights-preview ul {
          margin: 0;
          padding-left: 18px;
          font-size: 0.88rem;
          color: #94a3b8;
          line-height: 1.5;
        }

        .card-bottom-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: auto;
        }

        .article-tags {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .tag-badge {
          font-size: 0.75rem;
          background: rgba(99, 102, 241, 0.15);
          color: #c7d2fe;
          padding: 2px 8px;
          border-radius: 4px;
        }

        .read-more-link {
          font-size: 0.9rem;
          font-weight: 600;
          color: #818cf8;
        }

        @media (max-width: 768px) {
          .devlog-page {
            padding: 84px 16px 60px;
          }

          .devlog-card {
            padding: 24px;
          }
        }
      `}</style>
    </main>
  );
};
