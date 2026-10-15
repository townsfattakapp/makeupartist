'use client';

import * as React from 'react';
import Image from 'next/image';
import { Sparkles, ArrowLeftRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = 'Natural Skin Preparation (Consented Sample)',
  afterAlt = 'Finished Haute Bridal Glass Skin',
  beforeLabel = 'Skin Prep & Bare Canvas',
  afterLabel = 'Finished Glass-Skin Radiance',
  className = '',
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = React.useState(50);
  const [isDragging, setIsDragging] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMove = React.useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
      setSliderPosition(percentage);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(prev - 5, 0));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(prev + 5, 100));
    }
  };

  React.useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <div className={`relative flex flex-col space-y-3 ${className}`}>
      {/* Slider Visual Container */}
      <div
        ref={containerRef}
        role="slider"
        aria-label="Before and after transformation slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPosition)}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full aspect-4/5 sm:aspect-1/1 md:aspect-4/3 rounded-xl overflow-hidden select-none cursor-ew-resize border border-[var(--border)] shadow-md bg-[var(--background-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      >
        {/* "After" Image (Full background) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={afterImage}
            alt={afterAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-medium tracking-wide text-white border border-white/20 flex items-center space-x-1.5 pointer-events-none">
            <Sparkles className="w-3 h-3 text-[var(--accent)]" />
            <span>{afterLabel}</span>
          </div>
        </div>

        {/* "Before" Image (Clipped overlay) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div
            className="relative h-full"
            style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
          >
            <Image
              src={beforeImage}
              alt={beforeAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-medium tracking-wide text-white border border-white/20 pointer-events-none">
            <span>{beforeLabel}</span>
          </div>
        </div>

        {/* Dividing Line & Grab Handle */}
        <div
          className="absolute top-0 bottom-0 z-20 w-[2px] bg-white pointer-events-none shadow-lg"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[var(--background)] border-2 border-[var(--accent)] shadow-xl flex items-center justify-center text-[var(--foreground)]">
            <ArrowLeftRight className="w-4 h-4 text-[var(--accent)]" />
          </div>
        </div>
      </div>

      {/* Helper Caption & Keyboard Instruction */}
      <div className="flex items-center justify-between text-xs text-[var(--muted)] px-1">
        <span>Drag slider or use ← / → keyboard arrows</span>
        <span className="font-mono text-[11px]">{Math.round(sliderPosition)}% reveal</span>
      </div>
    </div>
  );
}
