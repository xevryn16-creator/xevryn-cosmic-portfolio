// src/hooks/useUniverseKeyboard.ts

import { useEffect } from 'react';
import { useUniverse } from '@/app/providers/UniverseProvider';

export function useUniverseKeyboard() {
  const {
    isUniverseMapOpen,
    toggleUniverseMap,
    closeUniverseMap,
    toggleNavigationMode,
    setNavigationMode,
    navigationMode,
    focusedObject,
    exitFocus,
    navigateTo,
    sectors,
  } = useUniverse();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in form inputs, textareas, or contentEditable elements
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      // Ignore if modifier keys are pressed (e.g. Ctrl+C, Cmd+R, Alt+Tab)
      if (e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }

      const key = e.key.toLowerCase();

      // 1. Toggle Universe Map [M]
      if (key === 'm') {
        e.preventDefault();
        toggleUniverseMap();
        return;
      }

      // 2. Toggle Explore Mode [E]
      if (key === 'e') {
        e.preventDefault();
        toggleNavigationMode();
        return;
      }

      // 3. Escape key closes map, exits focus lock, or exits explore mode
      if (e.key === 'Escape') {
        if (isUniverseMapOpen) {
          e.preventDefault();
          closeUniverseMap();
        } else if (focusedObject) {
          e.preventDefault();
          exitFocus();
        } else if (navigationMode === 'explore') {
          e.preventDefault();
          setNavigationMode('cinematic');
        }
        return;
      }

      // 4. Sector Number Shortcuts: 1 through 8
      const sectorByShortcut = sectors.find((s) => s.shortcutKey === e.key);
      if (sectorByShortcut) {
        e.preventDefault();
        navigateTo(sectorByShortcut.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isUniverseMapOpen,
    toggleUniverseMap,
    closeUniverseMap,
    toggleNavigationMode,
    setNavigationMode,
    navigationMode,
    navigateTo,
    sectors,
  ]);
}
