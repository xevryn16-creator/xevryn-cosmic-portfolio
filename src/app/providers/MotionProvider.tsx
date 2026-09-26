// src/app/providers/MotionProvider.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { MotionMode, MotionPreferences } from '@/types/motion';

const MotionContext = createContext<MotionPreferences>({
  mode: 'full',
  setMode: () => {},
  isReduced: false,
  isLite: false,
  isFull: true,
});

export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<MotionMode>('full');

  useEffect(() => {
    // Check system preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setModeState('reduced');
    }

    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setModeState('reduced');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-motion-mode', mode);
  }, [mode]);

  const setMode = (newMode: MotionMode) => {
    setModeState(newMode);
  };

  const isReduced = mode === 'reduced';
  const isLite = mode === 'lite';
  const isFull = mode === 'full';

  return (
    <MotionContext.Provider value={{ mode, setMode, isReduced, isLite, isFull }}>
      {children}
    </MotionContext.Provider>
  );
};

export const useMotion = () => useContext(MotionContext);
