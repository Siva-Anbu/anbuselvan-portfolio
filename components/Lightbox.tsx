'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

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
  const [dims, setDims] = useState({ width: 1200, height: 800 });

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
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next]);

  const current = images[index];

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black flex items-center justify-center"
      onClick={onClose}
    >
      {/* Image container - fills screen, no black bars */}
      <div
        className="relative w-full h-full flex items-center justify-center p-4 md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`relative transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ maxWidth: '94vw', maxHeight: '92vh' }}>
          <img
            src={current.url}
            alt={current.alt}
            onLoad={(e) => {
              const img = e.target as HTMLImageElement;
              setDims({ width: img.naturalWidth, height: img.naturalHeight });
              setLoaded(true);
            }}
            style={{
              maxWidth: '94vw',
              maxHeight: '90vh',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>

        {/* Prev / Next */}
        {images.length > 1 && (
          <>
            <button onClick={prev}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white/50 hover:text-white bg-black/40 hover:bg-black/70 rounded-full transition-all"
              aria-label="Previous">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13 4L7 10L13 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            <button onClick={next}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white/50 hover:text-white bg-black/40 hover:bg-black/70 rounded-full transition-all"
              aria-label="Next">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Close button */}
      <button onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white bg-black/40 hover:bg-black/70 rounded-full transition-all z-10"
        aria-label="Close">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-white/30">
        {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
      </div>

      {/* Caption */}
      {current.alt && (
        <div className="absolute bottom-4 right-6 font-mono text-[9px] tracking-widest uppercase text-white/20 hidden md:block">
          {current.alt}
        </div>
      )}
    </div>
  );
}
