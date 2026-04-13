'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

interface GalleryImage {
  id:  string;
  url: string;
  alt: string;
}

function Lightbox({ images, index, onClose, onPrev, onNext }: {
  images:  GalleryImage[];
  index:   number;
  onClose: () => void;
  onPrev:  () => void;
  onNext:  () => void;
}) {
  const img = images[index];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowLeft')  onPrev();
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
    position:       'fixed',
    zIndex:         2147483647,
    width:          '44px',
    height:         '44px',
    borderRadius:   '50%',
    background:     'rgba(0,0,0,0.7)',
    border:         '1px solid rgba(255,255,255,0.3)',
    cursor:         'pointer',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    padding:        '0',
  };

  const content = (
    <div
      onClick={onClose}
      style={{
        position:        'fixed',
        top:             0,
        left:            0,
        right:           0,
        bottom:          0,
        zIndex:          2147483646,
        backgroundColor: 'rgba(0,0,0,0.96)',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
      }}
    >
      {/* Image — 60px padding on all sides so it never touches edges */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={img.url}
        src={img.url}
        alt={img.alt}
        onClick={(e) => e.stopPropagation()}
        style={{
          display:   'block',
          maxWidth:  'calc(100vw - 120px)',
          maxHeight: 'calc(100vh - 120px)',
          width:     'auto',
          height:    'auto',
          objectFit: 'contain',
        }}
      />

      {/* Close */}
      <button onClick={(e) => { e.stopPropagation(); onClose(); }}
        style={{ ...btn, top: '16px', right: '16px' }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 2L14 14M14 2L2 14" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Prev */}
      {images.length > 1 && (
        <button onClick={(e) => { e.stopPropagation(); onPrev(); }}
          style={{ ...btn, left: '16px', top: '50%', transform: 'translateY(-50%)' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 4L6 9L11 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* Next */}
      {images.length > 1 && (
        <button onClick={(e) => { e.stopPropagation(); onNext(); }}
          style={{ ...btn, right: '16px', top: '50%', transform: 'translateY(-50%)' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M7 4L12 9L7 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* Counter */}
      <div style={{
        position:      'fixed',
        bottom:        '20px',
        left:          '50%',
        transform:     'translateX(-50%)',
        zIndex:        2147483647,
        color:         'rgba(255,255,255,0.4)',
        fontFamily:    'monospace',
        fontSize:      '11px',
        letterSpacing: '0.2em',
      }}>
        {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
      </div>
    </div>
  );

  // Portal renders directly into document.body — bypasses ALL parent CSS
  return createPortal(content, document.body);
}

export default function SetGallery({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  // Only render portal on client side
  useEffect(() => { setMounted(true); }, []);

  const close = useCallback(() => setActiveIndex(null), []);
  const prev  = useCallback(() => setActiveIndex((i) => i === null ? 0 : (i - 1 + images.length) % images.length), [images.length]);
  const next  = useCallback(() => setActiveIndex((i) => i === null ? 0 : (i + 1) % images.length), [images.length]);

  return (
    <>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-3 space-y-3">
        {images.map((img, i) => (
          <div
            key={img.id}
            className="break-inside-avoid cursor-pointer group relative overflow-hidden"
            onClick={() => setActiveIndex(i)}
          >
            <Image
              src={img.url}
              alt={img.alt}
              width={1200}
              height={800}
              className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
        ))}
      </div>

      {mounted && activeIndex !== null && (
        <Lightbox
          images={images}
          index={activeIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}
