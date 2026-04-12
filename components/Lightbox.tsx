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

  const prev = useCallback(() => { setLoaded(false); setIndex((i) => (i - 1 + images.length) % images.length); }, [images.length]);
  const next = useCallback(() => { setLoaded(false); setIndex((i) => (i + 1) % images.length); }, [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, prev, next]);

  const current = images[index];

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="relative max-w-[92vw] max-h-[88vh] w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <div className={`relative transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`} style={{ maxWidth: '90vw', maxHeight: '85vh' }}>
          <Image src={current.url} alt={current.alt} width={1400} height={900}
            className="object-contain max-h-[85vh] max-w-[90vw] w-auto h-auto"
            quality={95} onLoad={() => setLoaded(true)} />
        </div>
        {images.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors" aria-label="Previous">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><line x1="20" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="1.5" /><line x1="12" y1="16" x2="20" y2="24" stroke="currentColor" strokeWidth="1.5" /></svg>
            </button>
            <button onClick={next} className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors" aria-label="Next">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><line x1="12" y1="8" x2="20" y2="16" stroke="currentColor" strokeWidth="1.5" /><line x1="20" y1="16" x2="12" y2="24" stroke="currentColor" strokeWidth="1.5" /></svg>
            </button>
          </>
        )}
      </div>
      <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors" aria-label="Close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="1.5" /><line x1="20" y1="4" x2="4" y2="20" stroke="currentColor" strokeWidth="1.5" /></svg>
      </button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-white/30">
        {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
      </div>
    </div>
  );
}
