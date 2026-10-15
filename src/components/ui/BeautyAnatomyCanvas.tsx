'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import {
  FaceChartVector,
  MakeupBrushVector,
  LipstickVector,
  SerumDropperVector,
  LashCurlerVector,
  FloatingBeautyAccents,
} from './BeautyVectorArt';

interface Hotspot {
  id: string;
  name: string;
  zone: string;
  xPercent: number; // For responsive positioning on face chart
  yPercent: number;
  technique: string;
  toolName: string;
  toolType: 'brush' | 'lipstick' | 'dropper' | 'curler';
  formula: string;
  clientBenefit: string;
}

const BEAUTY_HOTSPOTS: Hotspot[] = [
  {
    id: 'brows',
    name: 'Feathered Brow Architecture',
    zone: 'Upper Orbital Bone',
    xPercent: 59,
    yPercent: 36,
    technique: 'Individual directional micro-strokes mimicking natural hair growth to lift the brow arch without a stamped or harsh look.',
    toolName: 'Ultra-Fine Japanese Angled Definer',
    toolType: 'brush',
    formula: 'Water-resistant pomade & botanical brow wax laminator',
    clientBenefit: 'Frames the entire face and opens the eyes naturally in portraits.',
  },
  {
    id: 'eyes',
    name: 'Editorial Wing & Flutter Lashes',
    zone: 'Ciliary Margin & Outer Crease',
    xPercent: 40.5,
    yPercent: 42.5,
    technique: 'Soft diffused smoked silk liner paired with weightless individual lash clusters graduated toward outer corners for an eye-lengthening feline lift.',
    toolName: 'Ergonomic Precision Lash Curler',
    toolType: 'curler',
    formula: 'Cryo-tested tear-proof pigment with micronized silk fibers',
    clientBenefit: 'Withstands emotional bridal vows without smudging or heavy strip lifting.',
  },
  {
    id: 'cheeks',
    name: 'Candlelight High-Point Glow',
    zone: 'Zygomatic Arch & Temples',
    xPercent: 34,
    yPercent: 51.5,
    technique: 'Seamless blending of liquid pearl strobe melted over highest points of cheekbones, capturing natural and flash lighting.',
    toolName: 'Dual-Fiber Fan Stippling Brush',
    toolType: 'brush',
    formula: 'Crushed tourmaline & hyaluronic micro-spheres',
    clientBenefit: 'Creates that coveted "lit-from-within" radiance with zero pore texture.',
  },
  {
    id: 'complexion',
    name: 'Sub-Dermal Glass Skin Prep',
    zone: 'Facial Canvas & Bridge',
    xPercent: 66,
    yPercent: 51.5,
    technique: 'Lymphatic drainage massage with warm rose quartz followed by multi-molecular hydration serum to plump skin cells before foundation.',
    toolName: 'Cellular Skincare Pipette & Sculpting Tool',
    toolType: 'dropper',
    formula: 'Augustinus Bader TFC8 cellular activator & squalane',
    clientBenefit: 'Foundation glides on like silk; minimal product required for full coverage.',
  },
  {
    id: 'lips',
    name: 'Satin Velvet Lip Architecture',
    zone: 'Cupid’s Bow & Lip Vermilion',
    xPercent: 50,
    yPercent: 66,
    technique: 'Strategic micro-overlining at the center lobes with contoured shading at mouth corners for a plump, camera-ready finish.',
    toolName: 'Chiseled Gold Bullet & Flat Definer',
    toolType: 'lipstick',
    formula: 'Comfort-matte velvet stain infused with jojoba & chamomile',
    clientBenefit: 'Survives the champagne toast, kisses, and dining without drying or feathering.',
  },
];

export function BeautyAnatomyCanvas() {
  const [activeId, setActiveId] = useState<string>('cheeks');
  const activeSpot = BEAUTY_HOTSPOTS.find((h) => h.id === activeId) || BEAUTY_HOTSPOTS[0];

  const renderToolIcon = (type: string) => {
    switch (type) {
      case 'brush':
        return <MakeupBrushVector className="w-10 h-10" />;
      case 'lipstick':
        return <LipstickVector className="w-10 h-10" />;
      case 'dropper':
        return <SerumDropperVector className="w-10 h-10" />;
      case 'curler':
        return <LashCurlerVector className="w-10 h-10" />;
      default:
        return <MakeupBrushVector className="w-10 h-10" />;
    }
  };

  return (
    <section className="relative py-14 sm:py-24 bg-[var(--background)] border-b border-[var(--border)] overflow-hidden">
      {/* Subtle vector backdrop curves */}
      <FloatingBeautyAccents />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 space-y-10 sm:space-y-16">
        {/* Section Title - Super Aligned & Crystal Clear */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--accent)] text-[11px] sm:text-xs tracking-wider sm:tracking-ultra-wide uppercase font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Artistry Face Chart</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-[var(--foreground)] tracking-tight">
            Anatomy of Haute Artistry
          </h2>

          <p className="text-xs sm:text-base text-[var(--muted)] leading-relaxed max-w-2xl mx-auto px-1">
            Backstage at premier bridal couture runways, every bespoke transformation begins with a hand-drawn face chart.
            Explore the facial planes, bespoke brushwork, and formulation placements that define Kumkum Patel’s signature aesthetic.
          </p>
        </div>

        {/* Interactive Face Chart Experience - Super Aligned Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* LEFT: Face Chart Canvas with Glowing Interactive Vector Hotspots */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="relative w-full aspect-[5/6] sm:aspect-square bg-[var(--card)] rounded-2xl sm:rounded-3xl border border-[var(--border)] p-4 sm:p-8 shadow-xl overflow-hidden flex flex-col justify-between">
              {/* Luxury Editorial Header Bar */}
              <div className="flex flex-wrap items-center justify-between border-b border-[var(--border)] pb-3 z-10 gap-2">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)] shadow-xs shadow-[var(--accent)]" />
                  <span className="font-serif text-sm sm:text-base tracking-wide text-[var(--foreground)] font-medium">
                    Kumkum Patel <span className="italic font-light text-[var(--accent)]">Face Chart</span>
                  </span>
                  <span className="text-[11px] tracking-wide text-[var(--muted)] hidden sm:inline">
                    • Haute Bridal Architecture
                  </span>
                </div>

                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[var(--accent-light)] border border-[var(--accent)]/30 text-[10px] sm:text-[11px] tracking-wider uppercase text-[var(--accent)] font-semibold shadow-xs">
                  <Sparkles className="w-3 h-3 text-[var(--accent)]" />
                  <span>Interactive Anatomy</span>
                </div>
              </div>

              {/* The SVG Line Art Face */}
              <div className="relative flex-1 w-full flex items-center justify-center py-2 sm:py-4">
                {/* 5:6 Canvas Frame geometrically locked to SVG dimensions */}
                <div className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-[5/6] mx-auto flex items-center justify-center">
                  <FaceChartVector className="w-full h-full object-contain pointer-events-none" activeHotspot={activeId} />

                  {/* Interactive Vector Hotspot Pins - Precision Symmetrically Placed */}
                  {BEAUTY_HOTSPOTS.map((spot) => {
                    const isSelected = spot.id === activeId;
                    return (
                      <button
                        key={spot.id}
                        type="button"
                        onClick={() => setActiveId(spot.id)}
                        style={{ left: `${spot.xPercent}%`, top: `${spot.yPercent}%` }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 focus:outline-none z-10 cursor-pointer ${
                          isSelected ? 'scale-125 z-20' : 'hover:scale-115'
                        }`}
                        title={spot.name}
                        aria-label={spot.name}
                      >
                        <span className="relative flex h-8 w-8 items-center justify-center">
                          {/* Luminous Pulsing Glow */}
                          <span
                            className={`absolute inline-flex h-full w-full rounded-full transition-all duration-500 ${
                              isSelected
                                ? 'animate-ping bg-[var(--accent)] opacity-70'
                                : 'bg-[var(--accent)]/30 opacity-30 group-hover:opacity-75 group-hover:scale-110'
                            }`}
                          />
                          {/* Couture Gold Coin Pin */}
                          <span
                            className={`relative inline-flex items-center justify-center rounded-full h-5.5 w-5.5 text-[10px] font-bold transition-all duration-300 shadow-md ${
                              isSelected
                                ? 'bg-gradient-to-tr from-[#C5A880] to-[#FAF8F5] text-black border-2 border-white shadow-lg shadow-[var(--accent)]/60 scale-105 ring-2 ring-[var(--accent)]'
                                : 'bg-black/85 text-[var(--accent)] border border-[var(--accent)]/80 group-hover:bg-[var(--accent)] group-hover:text-black'
                            }`}
                          >
                            +
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Instructions strip */}
              <div className="text-center text-[10px] sm:text-[11px] text-[var(--muted)] bg-[var(--background)]/90 backdrop-blur-xs py-2 px-4 rounded-full border border-[var(--border)] shadow-xs mx-auto max-w-md">
                Select any gold point (+) to inspect Kumkum’s bespoke brushwork & formulations
              </div>
            </div>

            {/* Quick-Select Feature Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-2">
              {[
                { id: 'brows', label: 'Feathered Brows' },
                { id: 'eyes', label: 'Eyes & Lashes' },
                { id: 'cheeks', label: 'Cheekbone Glow' },
                { id: 'complexion', label: 'Glass Skin Prep' },
                { id: 'lips', label: 'Velvet Lips' },
              ].map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveId(feature.id)}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs transition-all font-medium cursor-pointer ${
                    activeId === feature.id
                      ? 'bg-[var(--foreground)] text-[var(--background)] shadow-xs scale-102 font-semibold'
                      : 'bg-[var(--card)] text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--border)]'
                  }`}
                >
                  {feature.label}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Active Zone Specification & Formulation Breakdown */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4 sm:space-y-6">
            <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[var(--card)] border border-[var(--border)] shadow-xl relative overflow-hidden space-y-5 sm:space-y-6 flex-1 flex flex-col justify-between">
              {/* Ambient gold glow */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-[var(--accent)]/15 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-4 sm:space-y-6">
                {/* Header with tool vector icon */}
                <div className="flex items-start justify-between gap-3 sm:gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] sm:text-[11px] tracking-wider sm:tracking-ultra-wide uppercase font-semibold text-[var(--accent)] block">
                      {activeSpot.zone}
                    </span>
                    <h3 className="font-serif text-xl sm:text-3xl text-[var(--foreground)]">
                      {activeSpot.name}
                    </h3>
                  </div>

                  <div className="p-2.5 sm:p-3 rounded-2xl bg-[var(--background)] border border-[var(--border)] shrink-0 shadow-inner">
                    {renderToolIcon(activeSpot.toolType)}
                  </div>
                </div>

                {/* Technique Description */}
                <div className="space-y-1.5 sm:space-y-2">
                  <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-mono text-[var(--muted)]">
                    The Artist’s Technique
                  </span>
                  <p className="text-xs sm:text-sm text-[var(--foreground)] leading-relaxed">
                    {activeSpot.technique}
                  </p>
                </div>

                {/* Two-Column Specification */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-3 sm:p-3.5 rounded-xl bg-[var(--background)] border border-[var(--border)] space-y-1">
                    <span className="text-[9px] sm:text-[10px] tracking-widest uppercase text-[var(--accent)] font-semibold block">
                      Essential Tool
                    </span>
                    <p className="text-xs text-[var(--foreground)] font-medium leading-snug">
                      {activeSpot.toolName}
                    </p>
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-xl bg-[var(--background)] border border-[var(--border)] space-y-1">
                    <span className="text-[9px] sm:text-[10px] tracking-widest uppercase text-[var(--accent)] font-semibold block">
                      Formula Placement
                    </span>
                    <p className="text-xs text-[var(--foreground)] font-medium leading-snug">
                      {activeSpot.formula}
                    </p>
                  </div>
                </div>

                {/* The Wedding Day Advantage Card - Well-Formatted & Elegant */}
                <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[var(--accent)]/10 border border-[var(--accent)]/25 space-y-2">
                  <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] tracking-wider sm:tracking-ultra-wide uppercase font-semibold text-[var(--accent)]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>The Wedding Day Advantage</span>
                  </div>
                  <p className="font-serif text-xs sm:text-base italic text-[var(--foreground)] leading-relaxed pl-1">
                    “{activeSpot.clientBenefit}”
                  </p>
                </div>
              </div>

              {/* Clean, Well-Formatted Consultation Button */}
              <div className="pt-2">
                <Link
                  href="/enquire"
                  className="w-full flex items-center justify-center space-x-2 px-5 py-3.5 sm:py-4 rounded-full bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-black text-xs sm:text-sm tracking-luxury uppercase font-semibold transition-all shadow-md hover:shadow-xl text-center group"
                >
                  <span>Book Facial Architecture Consultation</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>

            {/* Atelier Toolset Strip */}
            <div className="p-3 sm:p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] grid grid-cols-4 gap-2 text-center">
              <div className="flex flex-col items-center space-y-1">
                <SerumDropperVector className="w-6 h-6 sm:w-8 sm:h-8" />
                <span className="text-[9px] sm:text-[10px] tracking-wider uppercase text-[var(--muted)] font-medium leading-tight">Cellular Prep</span>
              </div>
              <div className="flex flex-col items-center space-y-1 border-l border-[var(--border)] pl-1">
                <MakeupBrushVector className="w-6 h-6 sm:w-8 sm:h-8" />
                <span className="text-[9px] sm:text-[10px] tracking-wider uppercase text-[var(--muted)] font-medium leading-tight">Bone Sculpt</span>
              </div>
              <div className="flex flex-col items-center space-y-1 border-l border-[var(--border)] pl-1">
                <LashCurlerVector className="w-6 h-6 sm:w-8 sm:h-8" />
                <span className="text-[9px] sm:text-[10px] tracking-wider uppercase text-[var(--muted)] font-medium leading-tight">Lash Lift</span>
              </div>
              <div className="flex flex-col items-center space-y-1 border-l border-[var(--border)] pl-1">
                <LipstickVector className="w-6 h-6 sm:w-8 sm:h-8" />
                <span className="text-[9px] sm:text-[10px] tracking-wider uppercase text-[var(--muted)] font-medium leading-tight">Velvet Lips</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
