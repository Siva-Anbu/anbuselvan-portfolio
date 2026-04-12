'use client';

import { useState, useEffect, useCallback } from 'react';

export interface LightboxImage {
  id: string;
  url: string;
  alt: string;
}

interface LightboxProps {
  images: LightboxImage[];
  initialIndex: number;
  onClose: () => void;
}

export default function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [loaded, setLoaded] = useState(false);

  const prev = useCallback(() => {
    setLoaded(false);
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setLoaded(false);
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next]);

  const current = images[index];

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black"
      onClick={onClose}
    >
      {/* Full screen image — no wrappers causing black space */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={current.url}
          src={current.url}
          alt={current.alt}
          onLoad={() => setLoaded(true)}
          style={{
            maxWidth: '100vw',
            maxHeight: '100vh',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
            display: 'block',
          }}
        />
      </div>

      {/* Gradient overlays top and bottom for controls visibility */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-20 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-all"
        aria-label="Close"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Prev / Next */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-all"
            aria-label="Previous"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-all"
            aria-label="Next"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </>
      )}

      {/* Counter */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 font-mono text-[10px] tracking-[0.3em] text-white/40">
        {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
      </div>
    </div>
  );
}
