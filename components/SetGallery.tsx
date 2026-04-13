'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from './Lightbox';

interface GalleryImage {
  id:  string;
  url: string;
  alt: string;
}

export default function SetGallery({ images }: { images: GalleryImage[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      {/* Masonry grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-3 space-y-3">
        {images.map((img, i) => (
          <div
            key={img.id}
            className="break-inside-avoid cursor-pointer group relative overflow-hidden"
            onClick={() => setLightboxIndex(i)}
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
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
