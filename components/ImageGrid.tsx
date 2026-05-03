'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox, { GalleryImage } from './Lightbox';

interface ImageGridProps {
  images: GalleryImage[];
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
      <div
        className={`grid ${colClass} gap-1 md:gap-1.5`}
        onContextMenu={(e) => e.preventDefault()}
      >
        {images.map((img, i) => (
          <button
            key={img.id}
            className="relative aspect-square overflow-hidden bg-white/5 cursor-pointer"
            onClick={() => setLightboxIndex(i)}
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              draggable={false}
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300" />
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