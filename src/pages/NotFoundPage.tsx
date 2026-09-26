// src/pages/NotFoundPage.tsx
import React from 'react';

interface NotFoundPageProps {
  onReturn?: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onReturn }) => {
  const handleReturn = () => {
    if (onReturn) {
      onReturn();
    } else {
      window.location.hash = '#hero';
    }
  };

  return (
    <main
      id="not-found-page"
      className="content-stack section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '32px',
      }}
    >
      <div className="container" style={{ maxWidth: '640px' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            letterSpacing: '0.15em',
            color: 'var(--color-cyan-glow)',
            marginBottom: '16px',
          }}
        >
          // ERROR 404 · DEEP SPACE VOID
        </div>

        <h1
          className="section-title"
          style={{ fontSize: 'clamp(40px, 8vw, 80px)', margin: '0 0 16px 0', lineHeight: 1.1 }}
        >
          Orbit Hilang
        </h1>

        <p
          className="text-muted"
          style={{ fontSize: '18px', lineHeight: '1.7', marginBottom: '36px' }}
        >
          Koordinat antariksa yang Anda tuju tidak ditemukan atau belum dipetakan dalam rute penjelajahan tata surya XEVRYN.
        </p>

        <div>
          <button
            type="button"
            onClick={handleReturn}
            className="btn btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <span>← Kembali ke Orbit Utama</span>
          </button>
        </div>
      </div>
    </main>
  );
};
