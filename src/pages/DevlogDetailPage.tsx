// src/pages/DevlogDetailPage.tsx
import React, { useState } from 'react';
import { devlogArticles } from '@/content/devlog';

interface DevlogDetailPageProps {
  slug: string;
  onBack: () => void;
  onNavigateRoute?: (route: string) => void;
}

export const DevlogDetailPage: React.FC<DevlogDetailPageProps> = ({
  slug,
  onBack,
  onNavigateRoute,
}) => {
  const [copied, setCopied] = useState(false);
  const article = devlogArticles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <main className="devlog-detail-page not-found-state">
        <h2>Artikel Tidak Ditemukan</h2>
        <p>Arsip transmisi devlog dengan slug "{slug}" tidak tersedia.</p>
        <button onClick={onBack} className="btn-back">
          Kembali ke Daftar Devlog
        </button>
      </main>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main id="main-content" className="devlog-detail-page" tabIndex={-1}>
      <article className="article-container">
        {/* Navigation Breadcrumb */}
        <div className="detail-nav-header">
          <button onClick={onBack} className="btn-back" aria-label="Kembali ke Daftar Artikel">
            <span aria-hidden="true">←</span> Daftar Devlog
          </button>
          <button onClick={handleCopyLink} className="btn-share">
            {copied ? '✓ Tautan Disalin' : '🔗 Salin Tautan Artikel'}
          </button>
        </div>

        {/* Article Header */}
        <header className="article-header">
          <div className="article-meta-row">
            <span className="article-id-pill">{article.id}</span>
            <span className="article-date">{article.publishDate}</span>
            <span className="article-reading-time">· {article.readingTime}</span>
          </div>

          <h1 className="article-headline">{article.title}</h1>
          <p className="article-lead">{article.summary}</p>

          <div className="article-tags-row">
            {article.tags.map((t) => (
              <span key={t} className="article-tag">
                #{t}
              </span>
            ))}
          </div>
        </header>

        {/* Key Engineering Highlights Bento */}
        <section className="highlights-box" aria-labelledby="highlights-heading">
          <h2 id="highlights-heading" className="highlights-title">
            ⚡ Poin Kunci & Keputusan Rekayasa
          </h2>
          <ul className="highlights-list">
            {article.keyHighlights.map((h, idx) => (
              <li key={idx} className="highlight-item">
                <span className="bullet-point" aria-hidden="true">
                  ▸
                </span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Article Body Content */}
        <section className="article-prose">
          {article.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </section>

        {/* Article Footer & Interactive Callout */}
        <footer className="article-footer">
          {article.relatedRoute && (
            <div className="related-station-card">
              <div className="station-card-text">
                <span className="card-badge">STASIUN TERKAIT</span>
                <h4>Uji Hasil Rekayasa di Lingkungan Interaktif</h4>
                <p>Fitur yang dibahas dalam catatan ini dapat langsung dicoba di stasiun terkait.</p>
              </div>
              <button
                onClick={() => {
                  if (onNavigateRoute) onNavigateRoute(article.relatedRoute!);
                  else window.location.hash = article.relatedRoute!;
                }}
                className="btn-open-station"
              >
                Kunjungi Stasiun Terkait →
              </button>
            </div>
          )}

          <div className="back-bottom-wrapper">
            <button onClick={onBack} className="btn-back-large">
              ← Kembali ke Arsip Devlog
            </button>
          </div>
        </footer>
      </article>

      <style>{`
        .devlog-detail-page {
          min-height: 100vh;
          padding: 100px 24px 80px;
          background: #050711;
          color: #f8fafc;
          position: relative;
          z-index: 10;
        }

        .article-container {
          max-width: 780px;
          margin: 0 auto;
        }

        .detail-nav-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        .btn-back {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(99, 102, 241, 0.3);
          color: #e2e8f0;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-back:hover, .btn-back:focus-visible {
          background: rgba(99, 102, 241, 0.2);
          border-color: #6366f1;
          color: #ffffff;
          outline: none;
        }

        .btn-share {
          background: transparent;
          border: 1px solid rgba(148, 163, 184, 0.2);
          color: #94a3b8;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 0.85rem;
          cursor: pointer;
        }

        .btn-share:hover {
          color: #ffffff;
          border-color: #818cf8;
        }

        .article-header {
          margin-bottom: 40px;
        }

        .article-meta-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          font-size: 0.85rem;
          color: #94a3b8;
          font-family: 'Space Grotesk', monospace;
        }

        .article-id-pill {
          background: rgba(99, 102, 241, 0.15);
          color: #818cf8;
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 600;
        }

        .article-headline {
          font-size: clamp(2rem, 4.5vw, 2.8rem);
          font-weight: 800;
          line-height: 1.25;
          margin-bottom: 18px;
          letter-spacing: -0.02em;
        }

        .article-lead {
          font-size: 1.2rem;
          line-height: 1.7;
          color: #cbd5e1;
          margin-bottom: 24px;
        }

        .article-tags-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .article-tag {
          font-size: 0.8rem;
          background: rgba(30, 41, 59, 0.7);
          color: #818cf8;
          padding: 4px 12px;
          border-radius: 20px;
          border: 1px solid rgba(99, 102, 241, 0.2);
        }

        .highlights-box {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(99, 102, 241, 0.35);
          border-radius: 12px;
          padding: 28px;
          margin-bottom: 40px;
        }

        .highlights-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 16px;
        }

        .highlights-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .highlight-item {
          display: flex;
          gap: 12px;
          font-size: 0.95rem;
          line-height: 1.6;
          color: #cbd5e1;
        }

        .bullet-point {
          color: #818cf8;
          font-weight: bold;
        }

        .article-prose {
          font-size: 1.1rem;
          line-height: 1.85;
          color: #e2e8f0;
          margin-bottom: 56px;
        }

        .article-prose p {
          margin-bottom: 24px;
        }

        .article-footer {
          border-top: 1px solid rgba(148, 163, 184, 0.15);
          padding-top: 36px;
        }

        .related-station-card {
          background: linear-gradient(135deg, rgba(20, 25, 55, 0.8) 0%, rgba(10, 14, 30, 0.9) 100%);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 12px;
          padding: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }

        .card-badge {
          font-size: 0.7rem;
          font-family: 'Space Grotesk', monospace;
          color: #818cf8;
          letter-spacing: 0.1em;
          display: block;
          margin-bottom: 6px;
        }

        .station-card-text h4 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 6px;
        }

        .station-card-text p {
          font-size: 0.88rem;
          color: #94a3b8;
          margin: 0;
        }

        .btn-open-station {
          background: #6366f1;
          color: #ffffff;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          white-space: nowrap;
        }

        .btn-open-station:hover {
          background: #4f46e5;
        }

        .back-bottom-wrapper {
          text-align: center;
        }

        .btn-back-large {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(148, 163, 184, 0.3);
          color: #cbd5e1;
          padding: 12px 28px;
          border-radius: 8px;
          font-size: 0.95rem;
          cursor: pointer;
        }

        .btn-back-large:hover {
          border-color: #818cf8;
          color: #ffffff;
        }

        @media (max-width: 768px) {
          .devlog-detail-page {
            padding: 84px 16px 60px;
          }

          .related-station-card {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </main>
  );
};
