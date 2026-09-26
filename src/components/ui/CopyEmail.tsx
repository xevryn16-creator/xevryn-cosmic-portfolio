// src/components/ui/CopyEmail.tsx
import React, { useState } from 'react';

interface CopyEmailProps {
  email?: string;
  className?: string;
}

export const CopyEmail: React.FC<CopyEmailProps> = ({
  email = 'xevryn16@gmail.com',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback if clipboard API fails
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        className={`btn btn-secondary ${className}`}
        onClick={handleCopy}
        aria-label={`Salin alamat email ${email} ke papan klip`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          {copied ? (
            <path d="M20 6L9 17l-5-5" />
          ) : (
            <>
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </>
          )}
        </svg>
        <span>{copied ? 'Email Disalin!' : 'Salin Alamat Email'}</span>
      </button>

      {copied && (
        <div id="copy-toast" className="toast-container" role="status" aria-live="polite">
          <div className="toast">
            <span style={{ color: 'var(--color-success)', fontWeight: 700 }}>✓</span>
            <span>{email} berhasil disalin ke papan klip!</span>
          </div>
        </div>
      )}
    </div>
  );
};
