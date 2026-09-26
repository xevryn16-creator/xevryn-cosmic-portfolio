// src/components/projects/ProjectGallery.tsx
/**
 * XEVRYN Cosmic Portfolio - Project Gallery Component (ANM-062)
 * Aspect-ratio locked image gallery with zero CLS and lazy loading.
 */

import React, { useState } from 'react';

interface ProjectGalleryProps {
  images: string[];
  projectTitle: string;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  images,
  projectTitle,
}) => {
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  const handleImageError = (index: number) => {
    setFailedImages((prev) => ({ ...prev, [index]: true }));
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="project-gallery" style={{ marginTop: '40px' }}>
      <h3 style={{ fontSize: '18px', color: 'var(--color-text-main)', marginBottom: '18px' }}>
        // SYSTEM ARTIFACTS &amp; TELEMETRY
      </h3>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}
      >
        {images.map((imgSrc, idx) => (
          <div
            key={idx}
            className="project-gallery-item cosmic-card"
            style={{
              aspectRatio: '16 / 10',
              overflow: 'hidden',
              position: 'relative',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(8, 14, 26, 0.95))',
            }}
          >
            {!failedImages[idx] ? (
              <img
                src={imgSrc}
                alt={`${projectTitle} Artifact ${idx + 1}`}
                loading="lazy"
                onError={() => handleImageError(idx)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'var(--color-text-dim)',
                  border: '1px dashed rgba(255, 255, 255, 0.1)',
                }}
              >
                TELEMETRY ARTIFACT {String(idx + 1).padStart(2, '0')} [CONFIRMED]
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
