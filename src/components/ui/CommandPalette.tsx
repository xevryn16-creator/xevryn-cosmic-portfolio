// src/components/ui/CommandPalette.tsx
// Ctrl/Cmd+K Command Palette — XEVRYN Cosmic Portfolio
// Accessible, keyboard-driven, wired to NavigatorEngine + UniverseProvider

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { queryNavigator, NavigatorResult } from '@/lib/navigatorEngine';
import { useUniverse } from '@/app/providers/UniverseProvider';
import { UniverseLocation } from '@/types/universe';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<NavigatorResult[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const {
    navigateTo,
    openProjectWorld,
    toggleNavigationMode,
    openUniverseMap,
  } = useUniverse();

  // Quick-access commands always shown when query is empty
  const QUICK_ACCESS: NavigatorResult[] = [
    { intent: 'GOTO_SECTOR', target: 'home', label: 'Xevryn Core', description: 'Hero & intro universe', action: 'navigateTo', confidence: 1, sector: 'home', icon: '✦' },
    { intent: 'GOTO_SECTOR', target: 'identity', label: 'Identity Archive', description: 'DNA & profil identitas', action: 'navigateTo', confidence: 1, sector: 'identity', icon: '◎' },
    { intent: 'GOTO_SECTOR', target: 'projects', label: 'Project Constellation', description: 'Tata surya proyek & karya', action: 'navigateTo', confidence: 1, sector: 'projects', icon: '🪐' },
    { intent: 'GOTO_SECTOR', target: 'skills', label: 'Skill Network', description: 'Grafik kemampuan terverifikasi', action: 'navigateTo', confidence: 1, sector: 'skills', icon: '⬡' },
    { intent: 'GOTO_SECTOR', target: 'experience', label: 'Orbital Timeline', description: 'Riwayat pengalaman', action: 'navigateTo', confidence: 1, sector: 'experience', icon: '◌' },
    { intent: 'GOTO_SECTOR', target: 'media', label: 'Creative Film Archive', description: 'Karya media & film Media 3', action: 'navigateTo', confidence: 1, sector: 'media', icon: '▶' },
    { intent: 'GOTO_SECTOR', target: 'lab', label: 'Xevryn Lab', description: 'Eksperimen & modul interaktif', action: 'navigateTo', confidence: 1, sector: 'lab', icon: '⚗' },
    { intent: 'GOTO_SECTOR', target: 'contact', label: 'Communication Station', description: 'Hubungi XEVRYN', action: 'navigateTo', confidence: 1, sector: 'contact', icon: '📡' },
    { intent: 'TOGGLE_EXPLORE', target: 'explore', label: 'Free Explore Mode', description: 'Aktifkan orbital camera', action: 'toggleNavigationMode', confidence: 1, icon: '🚀' },
    { intent: 'OPEN_MAP', target: 'map', label: 'Universe Star Map', description: 'Buka tactical star map', action: 'openUniverseMap', confidence: 1, icon: '🗺' },
    { intent: 'OPEN_TERMINAL', target: 'terminal', label: 'Developer Terminal', description: 'Buka terminal interaktif CLI', action: 'navigateTo:terminal', confidence: 1, icon: '>_' },
  ];

  // Recompute results when query changes
  useEffect(() => {
    if (!query.trim()) {
      setResults(QUICK_ACCESS);
    } else {
      const r = queryNavigator(query);
      setResults(r.length > 0 ? r : []);
    }
    setSelectedIdx(0);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults(QUICK_ACCESS);
      setSelectedIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const executeResult = useCallback((result: NavigatorResult) => {
    onClose();
    setQuery('');

    switch (result.intent) {
      case 'OPEN_PROJECT':
        if (result.slug) openProjectWorld(result.slug);
        break;
      case 'OPEN_SKILL':
        navigateTo('skills');
        break;
      case 'GOTO_SECTOR':
        if (result.sector) navigateTo(result.sector as UniverseLocation);
        break;
      case 'EXPLORE':
      case 'TOGGLE_EXPLORE':
        toggleNavigationMode();
        break;
      case 'OPEN_MAP':
        openUniverseMap();
        break;
      case 'OPEN_TERMINAL':
        navigateTo('contact');
        setTimeout(() => {
          document.getElementById('terminal')?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
        break;
      case 'CONTACT':
      case 'OPEN_CONTACT':
        navigateTo('contact');
        break;
      default:
        break;
    }
  }, [navigateTo, onClose, openProjectWorld, openUniverseMap, toggleNavigationMode]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIdx((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIdx((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIdx]) executeResult(results[selectedIdx]);
    }
  }, [results, selectedIdx, onClose, executeResult]);

  // Scroll selected item into view
  useEffect(() => {
    const item = listRef.current?.children[selectedIdx] as HTMLElement;
    if (item) item.scrollIntoView({ block: 'nearest' });
  }, [selectedIdx]);

  if (!isOpen) return null;

  return (
    <div
      className="cmd-palette-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="cmd-palette-wrap">
        {/* Header Bar */}
        <div className="cmd-palette-header">
          <div className="cmd-palette-search-row">
            <span className="cmd-palette-icon" aria-hidden="true">
              {query ? '⌕' : '✦'}
            </span>
            <input
              ref={inputRef}
              type="text"
              className="cmd-palette-input"
              placeholder="Navigasi, cari proyek, skill, atau goto…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Command palette search input"
              aria-autocomplete="list"
              aria-controls="cmd-results-list"
              autoComplete="off"
              spellCheck={false}
            />
            <span className="cmd-palette-shortcut-tag">ESC</span>
          </div>

          {/* Category hints */}
          <div className="cmd-palette-hints">
            <span className="cmd-hint-chip">🪐 proyek</span>
            <span className="cmd-hint-chip">⬡ skill</span>
            <span className="cmd-hint-chip">✦ sektor</span>
            <span className="cmd-hint-chip">🚀 explore</span>
            <span className="cmd-hint-chip">🗺 map</span>
          </div>
        </div>

        {/* Results */}
        <ul
          id="cmd-results-list"
          ref={listRef}
          className="cmd-palette-results"
          role="listbox"
          aria-label="Command palette results"
        >
          {results.length === 0 && query && (
            <li className="cmd-no-results" role="option">
              <span className="cmd-no-results-icon">◌</span>
              <span>Tidak ditemukan hasil untuk &quot;{query}&quot;</span>
            </li>
          )}

          {!query && (
            <li className="cmd-section-label" role="presentation">
              AKSES CEPAT — UNIVERSE NAVIGATION
            </li>
          )}

          {query && results.length > 0 && (
            <li className="cmd-section-label" role="presentation">
              HASIL PENCARIAN — {results.length} DITEMUKAN
            </li>
          )}

          {results.map((result, idx) => (
            <li
              key={`${result.intent}-${result.target}-${idx}`}
              role="option"
              aria-selected={idx === selectedIdx}
              className={`cmd-result-item ${idx === selectedIdx ? 'is-selected' : ''}`}
              onClick={() => executeResult(result)}
              onMouseEnter={() => setSelectedIdx(idx)}
            >
              <span className="cmd-result-icon" aria-hidden="true">
                {result.icon || '→'}
              </span>
              <div className="cmd-result-text">
                <span className="cmd-result-label">{result.label}</span>
                <span className="cmd-result-desc">{result.description}</span>
              </div>
              <div className="cmd-result-meta">
                <span className="cmd-intent-tag">{result.intent.replace('_', ' ')}</span>
                {idx === selectedIdx && (
                  <span className="cmd-enter-hint" aria-hidden="true">↵</span>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="cmd-palette-footer">
          <span className="cmd-footer-hint">
            <kbd>↑↓</kbd> Navigasi · <kbd>↵</kbd> Pilih · <kbd>ESC</kbd> Tutup
          </span>
          <span className="cmd-footer-brand">XEVRYN UNIVERSE NAVIGATOR</span>
        </div>
      </div>
    </div>
  );
};
