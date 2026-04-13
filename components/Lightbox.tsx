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
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowLeft')  prev();
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
    /* Full screen overlay — click backdrop to close */
    <div
      className="fixed inset-0 bg-black"
      style={{ zIndex: 9999 }}
      onClick={onClose}
    >
      {/* ── Close button ── */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close"
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 10001,
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'rgba(0,0,0,0.7)',
          border: '1px solid rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'white',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M3 3L15 15M15 3L3 15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      {/* ── Centred image ── */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '60px 80px',   /* room for close btn + nav arrows */
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={current.url}
          src={current.url}
          alt={current.alt}
          onLoad={() => setLoaded(true)}
          style={{
            maxWidth:   '100%',
            maxHeight:  '100%',
            width:      'auto',
            height:     'auto',
            objectFit:  'contain',
            display:    'block',
            opacity:    loaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      </div>

      {/* ── Prev arrow ── */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          aria-label="Previous"
          style={{
            position: 'fixed',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10001,
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.7)',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 4L6 9L11 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* ── Next arrow ── */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          aria-label="Next"
          style={{
            position: 'fixed',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10001,
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.7)',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M7 4L12 9L7 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* ── Counter ── */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10001,
          fontFamily: 'monospace',
          fontSize: '11px',
          letterSpacing: '0.2em',
          color: 'rgba(255,255,255,0.4)',
        }}
      >
        {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
      </div>
    </div>
  );
}
