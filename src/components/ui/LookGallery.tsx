'use client';

import * as React from 'react';
import Image from 'next/image';
import { Maximize2 } from 'lucide-react';
import { Lightbox } from './Lightbox';

interface LookGalleryProps {
  images: string[];
  title: string;
  category?: string;
  finishType?: string;
}

export function LookGallery({
  images,
  title,
  category,
  finishType,
}: LookGalleryProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);

  const selectedImage = images[selectedIndex] || images[0];

  return (
    <div className="space-y-4">
      {/* Primary Display Container */}
      <div className="relative aspect-4/5 sm:aspect-1/1 w-full rounded-2xl overflow-hidden bg-[var(--background-subtle)] border border-[var(--border)] shadow-md group">
        <Image
          src={selectedImage}
          alt={`${title} main view`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-102"
          priority
        />

        {finishType && (
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] tracking-wide text-white border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
              <span>{finishType}</span>
            </span>
          </div>
        )}

        {/* Expand Lightbox Button */}
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          aria-label="Open fullscreen gallery"
          className="absolute bottom-4 right-4 z-10 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-transform hover:scale-110 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Thumbnails Strip */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              aria-label={`View photo ${idx + 1}`}
              className={`relative aspect-1/1 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                selectedIndex === idx
                  ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/30'
                  : 'border-[var(--border)] opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={images}
        initialIndex={selectedIndex}
        title={title}
        category={category}
      />
    </div>
  );
}
