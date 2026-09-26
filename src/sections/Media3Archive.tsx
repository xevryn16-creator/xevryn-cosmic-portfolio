// src/sections/Media3Archive.tsx
/**
 * XEVRYN Cosmic Portfolio - Section 04: CREATIVE FILM ARCHIVE
 * Dark cinematic projection room & film strip archive for Media 3 SMAN 3 Sumedang.
 * Features:
 * - Archival film reel interaction & frame counter
 * - Interactive filter system: ALL, FILM, VIDEO, PRODUCTION, MEDIA
 * - Cinematic Viewer Modal with keyboard navigation (Arrows, ESC)
 * - Intentional placeholder: ARCHIVE FRAME // AWAITING ORIGINAL MEDIA (Zero fabricated media)
 * - Section-aware cinematic lighting & projector cone atmosphere
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { media3ArchiveContent } from '@/content/media3';
import { Media3ArchiveItem } from '@/types/content';
import { useMotion } from '@/app/providers/MotionProvider';
import { useScene } from '@/app/providers/SceneProvider';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const Media3Archive: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const modalCloseBtnRef = useRef<HTMLButtonElement>(null);

  const [activeCategory, setActiveCategory] = useState<'ALL' | 'FILM' | 'VIDEO' | 'PRODUCTION' | 'MEDIA'>('ALL');
  const [selectedFrame, setSelectedFrame] = useState<Media3ArchiveItem | null>(null);
  const [viewerItemIndex, setViewerItemIndex] = useState<number | null>(null);

  const { isReduced } = useMotion();
  const { updateCameraTarget } = useScene();

  const filteredItems =
    activeCategory === 'ALL'
      ? media3ArchiveContent
      : media3ArchiveContent.filter((item) => item.category === activeCategory);

  // Cinematic scroll atmosphere
  useEffect(() => {
    if (isReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: '100%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        );
      }

      // Camera drift into warm rose/cinematic projection angle
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.3,
        onUpdate: (self) => {
          const p = self.progress;
          updateCameraTarget({
            z: 4.6,
            x: 0.3 - p * 0.3,
            y: -7.5 - p * 1.0,
            rotY: 0.08 - p * 0.12,
            starSpeed: 0.06, // Calmed stars in projection room
            ambientIntensity: 0.32,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReduced, updateCameraTarget]);

  // Open viewer modal
  const openViewer = (item: Media3ArchiveItem) => {
    const idx = filteredItems.findIndex((it) => it.id === item.id);
    setViewerItemIndex(idx >= 0 ? idx : 0);
    setSelectedFrame(item);
  };

  const closeViewer = useCallback(() => {
    setSelectedFrame(null);
    setViewerItemIndex(null);
  }, []);

  const navigateViewer = useCallback((direction: 'next' | 'prev') => {
    if (viewerItemIndex === null || filteredItems.length === 0) return;
    let nextIdx = direction === 'next' ? viewerItemIndex + 1 : viewerItemIndex - 1;
    if (nextIdx >= filteredItems.length) nextIdx = 0;
    if (nextIdx < 0) nextIdx = filteredItems.length - 1;
    setViewerItemIndex(nextIdx);
    setSelectedFrame(filteredItems[nextIdx]);
  }, [filteredItems, viewerItemIndex]);

  // Keyboard navigation for modal
  useEffect(() => {
    if (!selectedFrame) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeViewer();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateViewer('next');
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateViewer('prev');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    modalCloseBtnRef.current?.focus();

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeViewer, navigateViewer, selectedFrame]);

  return (
    <section
      id="media3-archive"
      ref={sectionRef}
      className="section creative-film-archive-section"
      aria-labelledby="media3-archive-heading"
    >
      <div className="container">
        {/* Projector Room Atmosphere Lighting Overlay */}
        <div className="projector-light-cone" aria-hidden="true" />

        {/* Section Header */}
        <div className="archive-header-block">
          <div className="archive-eyebrow">
            <span className="projector-indicator-dot" aria-hidden="true" />
            <span className="eyebrow-text">SECTOR 04 // CREATIVE FILM ARCHIVE</span>
          </div>

          <div style={{ overflow: 'hidden' }}>
            <h2 id="media3-archive-heading" ref={headingRef} className="section-title">
              Creative Film &amp; Media Archive
            </h2>
          </div>

          <div className="archive-intro-banner">
            <span className="intro-badge">SMAN 3 SUMEDANG · EKSTRAKURIKULER MEDIA 3</span>
            <p className="intro-text">
              Ruang arsip dokumentasi kreatif: peran sebagai wakil ekstrakurikuler, produksi film pendek sekolah, komposisi visual kamera, dan manajemen logistik kru lapangan.
            </p>
          </div>

          {/* Interactive Reel Filter Controls */}
          <div className="reel-filters-wrapper" role="toolbar" aria-label="Kategori Arsip Media 3">
            {(['ALL', 'FILM', 'VIDEO', 'PRODUCTION', 'MEDIA'] as const).map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`reel-filter-btn ${isActive ? 'is-active' : ''}`}
                  aria-pressed={isActive}
                >
                  <span className="btn-reel-sprocket" aria-hidden="true">○</span>
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Film Strip Gallery Container */}
        <div className="filmstrip-archive-grid">
          {filteredItems.map((item, index) => {
            const frameNumber = `FRAME 00${index + 1}`;
            return (
              <article
                key={item.id}
                className="film-cell-card"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openViewer(item);
                  }
                }}
              >
                {/* 35mm Sprocket Perforations Top */}
                <div className="film-sprockets top" aria-hidden="true">
                  <div className="sprocket-hole" />
                  <div className="sprocket-hole" />
                  <div className="sprocket-hole" />
                  <div className="sprocket-hole" />
                  <div className="sprocket-hole" />
                  <div className="sprocket-hole" />
                </div>

                {/* Film Cell Frame Display */}
                <div
                  className="film-cell-viewport"
                  style={{
                    borderColor: `${item.mediaPlaceholder.colorAccent}50`,
                  }}
                >
                  {/* Subtle Projector Scanline Accent */}
                  <div className="projector-scanlines" aria-hidden="true" />

                  {/* Frame Technical Data Stamp */}
                  <div className="film-frame-stamp">
                    <span className="stamp-id">{item.id} // {frameNumber}</span>
                    <span className="stamp-cat">{item.category}</span>
                  </div>

                  {/* Intentional Archive Frame Preview Placeholder */}
                  <div className="film-cell-preview">
                    <div className="preview-aperture-icon" aria-hidden="true">
                      🎬
                    </div>
                    <div className="preview-label">{item.mediaPlaceholder.label}</div>
                    <div className="preview-sub">SMAN 3 SUMEDANG // MEDIA 3</div>
                  </div>

                  {/* Hover Overlay Button */}
                  <button
                    type="button"
                    className="open-archive-btn"
                    onClick={() => openViewer(item)}
                    aria-label={`Buka arsip ${item.title}`}
                  >
                    <span>[ BUKA ARSIP FRAME ]</span>
                  </button>
                </div>

                {/* 35mm Sprocket Perforations Bottom */}
                <div className="film-sprockets bottom" aria-hidden="true">
                  <div className="sprocket-hole" />
                  <div className="sprocket-hole" />
                  <div className="sprocket-hole" />
                  <div className="sprocket-hole" />
                  <div className="sprocket-hole" />
                  <div className="sprocket-hole" />
                </div>

                {/* Archival Information Block */}
                <div className="film-cell-meta">
                  <div className="meta-top">
                    <span className="meta-role" style={{ color: item.mediaPlaceholder.colorAccent }}>
                      {item.role}
                    </span>
                    <span className="meta-status">CONFIRMED</span>
                  </div>

                  <h3 className="meta-title">{item.title}</h3>
                  <p className="meta-desc">{item.description}</p>

                  <div className="meta-focus-tags">
                    {item.focus.map((f) => (
                      <span key={f} className="focus-pill">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Cinematic Fullscreen Viewer Modal */}
      {selectedFrame && viewerItemIndex !== null && (
        <div
          className="cinematic-viewer-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="viewer-title"
          onClick={closeViewer}
        >
          <div
            className="cinematic-viewer-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="viewer-header">
              <div className="viewer-header-info">
                <span className="viewer-indicator">● PROJECTION ACTIVE</span>
                <span className="viewer-frame-counter">
                  FRAME {viewerItemIndex + 1} OF {filteredItems.length} // REEL 35MM-M3
                </span>
              </div>
              <button
                ref={modalCloseBtnRef}
                type="button"
                className="viewer-close-btn"
                onClick={closeViewer}
                aria-label="Tutup penampil arsip (ESC)"
              >
                ✕ ESC
              </button>
            </div>

            {/* Cinematic Projection Screen */}
            <div className="viewer-screen-container">
              <div className="viewer-screen-frame">
                {/* Intentional Honest Placeholder - No Fabricated School Assets */}
                <div className="viewer-screen-placeholder">
                  <div className="placeholder-film-badge">
                    <span>35MM CELLULAR ARCHIVE</span>
                  </div>
                  <div className="placeholder-main-heading">
                    ARCHIVE FRAME // AWAITING ORIGINAL MEDIA
                  </div>
                  <p className="placeholder-subheading">
                    Dokumentasi aset visual asli Media 3 SMAN 3 Sumedang dalam tahap kurasi arsip.
                  </p>
                  <div className="placeholder-telemetry-box">
                    <div><strong>IDENTIFIER:</strong> {selectedFrame.id}</div>
                    <div><strong>KATEGORI:</strong> {selectedFrame.category}</div>
                    <div><strong>ORGANISASI:</strong> SMAN 3 Sumedang · Media 3</div>
                    <div><strong>PERAN KREATIF:</strong> {selectedFrame.role}</div>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                type="button"
                className="viewer-nav-btn prev"
                onClick={() => navigateViewer('prev')}
                aria-label="Frame sebelumnya (Panah Kiri)"
              >
                ←
              </button>
              <button
                type="button"
                className="viewer-nav-btn next"
                onClick={() => navigateViewer('next')}
                aria-label="Frame selanjutnya (Panah Kanan)"
              >
                →
              </button>
            </div>

            {/* Modal Detail Footer */}
            <div className="viewer-footer">
              <h3 id="viewer-title" className="viewer-title">
                {selectedFrame.title}
              </h3>
              <p className="viewer-desc">{selectedFrame.description}</p>
              <div className="viewer-focus-pills">
                {selectedFrame.focus.map((tag) => (
                  <span key={tag} className="viewer-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
