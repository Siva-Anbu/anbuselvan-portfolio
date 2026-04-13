'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
}

export default function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const img = images[index];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  const btn: React.CSSProperties = {
    position: 'fixed',
    zIndex: 2147483647,
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: 'rgba(0,0,0,0.7)',
    border: '1px solid rgba(255,255,255,0.3)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '18px',
  };

  const content = (
    <>
      {/* BACKDROP */}
      <div
        onClick={onClose}
        onContextMenu={(e) => e.preventDefault()}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2147483646,
          backgroundColor: 'rgba(0,0,0,0.96)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* IMAGE WRAPPER */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100vw',
            height: '100vh',
            padding: '60px',
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <img
            key={img.url}
            src={img.url}
            alt={img.alt}
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
            }}
          />
        </div>
      </div>

      {/* CLOSE BUTTON */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        style={{ ...btn, top: '16px', right: '16px' }}
      >
        ✕
      </button>

      {/* PREV */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          style={{
            ...btn,
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          ‹
        </button>
      )}

      {/* NEXT */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          style={{
            ...btn,
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          ›
        </button>
      )}

      {/* COUNTER */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2147483647,
          color: 'rgba(255,255,255,0.5)',
          fontFamily: 'monospace',
          fontSize: '11px',
          letterSpacing: '0.2em',
        }}
      >
        {String(index + 1).padStart(2, '0')} /{' '}
        {String(images.length).padStart(2, '0')}
      </div>

      {/* COPYRIGHT */}
      <div
        style={{
          position: 'fixed',
          bottom: '10px',
          right: '16px',
          fontSize: '10px',
          color: 'rgba(255,255,255,0.4)',
          zIndex: 2147483647,
          pointerEvents: 'none',
        }}
      >
        © Anbuselvan Sivaraju
      </div>
    </>
  );

  return createPortal(content, document.body);
}