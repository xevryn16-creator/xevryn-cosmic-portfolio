// src/app/providers/SoundProvider.tsx
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { useMotion } from '@/app/providers/MotionProvider';

interface SoundContextValue {
  isMuted: boolean;
  toggleSound: () => void;
  playBeep: (freq?: number, duration?: number) => void;
  playChime: () => void;
}

const SoundContext = createContext<SoundContextValue | null>(null);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(true); // Default OFF as required
  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneNodesRef = useRef<{ osc1: OscillatorNode; osc2: OscillatorNode; gain: GainNode } | null>(null);
  const { isReduced } = useMotion();

  const getAudioContext = () => {
    if (!audioCtxRef.current && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const startAmbientDrone = () => {
    const ctx = getAudioContext();
    if (!ctx || droneNodesRef.current) return;

    try {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, ctx.currentTime); // Low A

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(110, ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 3); // Soft ambient volume

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      droneNodesRef.current = { osc1, osc2, gain };
    } catch {
      // Audio not permitted or context failure
    }
  };

  const stopAmbientDrone = () => {
    if (droneNodesRef.current && audioCtxRef.current) {
      try {
        const { osc1, osc2, gain } = droneNodesRef.current;
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 1);
        setTimeout(() => {
          try {
            osc1.stop();
            osc2.stop();
            osc1.disconnect();
            osc2.disconnect();
          } catch {
            // ignore
          }
          droneNodesRef.current = null;
        }, 1100);
      } catch {
        droneNodesRef.current = null;
      }
    }
  };

  const toggleSound = () => {
    if (isMuted) {
      setIsMuted(false);
      startAmbientDrone();
    } else {
      setIsMuted(true);
      stopAmbientDrone();
    }
  };

  const playBeep = (freq = 440, duration = 0.08) => {
    if (isMuted || isReduced) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // ignore
    }
  };

  const playChime = () => {
    if (isMuted || isReduced) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      [523.25, 659.25, 783.99].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.06);

        gain.gain.setValueAtTime(0.02, ctx.currentTime + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.06 + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.06);
        osc.stop(ctx.currentTime + i * 0.06 + 0.35);
      });
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    return () => {
      stopAmbientDrone();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <SoundContext.Provider value={{ isMuted, toggleSound, playBeep, playChime }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    return {
      isMuted: true,
      toggleSound: () => {},
      playBeep: () => {},
      playChime: () => {},
    };
  }
  return ctx;
};
