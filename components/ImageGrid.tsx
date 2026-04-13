'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from './Lightbox';

export interface GridImage {
  id: string;
  url: string;
  alt: string;
}

interface ImageGridProps {
  images: GridImage[];
  columns?: 2 | 3 | 4;
}

export default function ImageGrid({ images, columns = 3 }: ImageGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const colClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  }[columns];

  return (
    <>
      <div className={`grid ${colClass} gap-1 md:gap-1.5`}>
        {images.map((img, i) => (
          <button
            key={img.id}
            className="photo-hover relative aspect-square overflow-hidden bg-white/5 cursor-pointer"
            onClick={() => setLightboxIndex(i)}
            aria-label={`View ${img.alt}`}
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
              loading="lazy"
              quality={80}
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-400 flex items-end p-3 md:p-4 opacity-0 hover:opacity-100">
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/70">
                {img.alt}
              </span>
            </div>
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex((i) =>
              i === null ? 0 : (i - 1 + images.length) % images.length
            )
          }
          onNext={() =>
            setLightboxIndex((i) =>
              i === null ? 0 : (i + 1) % images.length
            )
          }
        />
      )}
    </>
  );
}