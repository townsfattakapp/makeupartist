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
    xPercent: 35,
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
    xPercent: 33,
    yPercent: 42,
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
    xPercent: 31,
    yPercent: 51,
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
    xPercent: 48,
    yPercent: 56,
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
    yPercent: 67,
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
    <section className="relative py-24 bg-[var(--background)] border-b border-[var(--border)] overflow-hidden">
      {/* Subtle vector backdrop curves */}
      <FloatingBeautyAccents />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--accent)] text-xs tracking-ultra-wide uppercase font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Artistry Face Chart</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[var(--foreground)] tracking-tight">
            Anatomy of Haute Artistry
          </h2>

          <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
            Backstage in Paris and Milan, every couture runway look begins with a hand-drawn face chart.
            Explore the bespoke techniques and luxury formulation placement that construct Aurelia’s signature look.
          </p>
        </div>

        {/* Interactive Face Chart Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* LEFT: Face Chart Canvas with Glowing Interactive Vector Hotspots */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full max-w-md sm:max-w-lg aspect-[5/6] bg-[var(--card)] rounded-3xl border border-[var(--border)] p-6 shadow-xl overflow-hidden flex items-center justify-center">
              {/* Corner Editorial Label */}
              <div className="absolute top-5 left-6 text-[10px] tracking-ultra-wide uppercase text-[var(--muted)] font-mono border-b border-[var(--border)] pb-1">
                Aurelia Luxe Studio / Face Chart Specimen #01
              </div>

              <div className="absolute top-5 right-6 text-[10px] tracking-widest uppercase text-[var(--accent)] font-semibold flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Interactive</span>
              </div>

              {/* The SVG Line Art Face */}
              <div className="w-full h-full flex items-center justify-center p-4">
                <FaceChartVector className="w-full h-auto max-h-[480px]" activeHotspot={activeId} />
              </div>

              {/* Interactive Vector Hotspot Pins */}
              {BEAUTY_HOTSPOTS.map((spot) => {
                const isSelected = spot.id === activeId;
                return (
                  <button
                    key={spot.id}
                    onClick={() => setActiveId(spot.id)}
                    style={{ left: `${spot.xPercent}%`, top: `${spot.yPercent}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 focus:outline-none z-10 ${
                      isSelected ? 'scale-125' : 'hover:scale-110'
                    }`}
                    title={spot.name}
                  >
                    <span className="relative flex h-8 w-8 items-center justify-center">
                      {/* Outer ripple ring */}
                      <span
                        className={`absolute inline-flex h-full w-full rounded-full transition-opacity ${
                          isSelected
                            ? 'animate-ping bg-[var(--accent)] opacity-75'
                            : 'bg-[var(--accent)] opacity-30 group-hover:opacity-60'
                        }`}
                      />
                      {/* Inner metallic button */}
                      <span
                        className={`relative inline-flex items-center justify-center rounded-full h-5 w-5 text-[10px] font-bold border transition-colors ${
                          isSelected
                            ? 'bg-[var(--foreground)] text-[var(--background)] border-[var(--accent)] shadow-md shadow-[var(--accent)]/40'
                            : 'bg-[var(--card)] text-[var(--foreground)] border-[var(--accent)] hover:bg-[var(--accent)] hover:text-black'
                        }`}
                      >
                        +
                      </span>
                    </span>
                  </button>
                );
              })}

              {/* Bottom Instructions strip */}
              <div className="absolute bottom-4 inset-x-6 text-center text-[11px] text-[var(--muted)] bg-[var(--background)]/80 backdrop-blur-xs py-2 px-3 rounded-xl border border-[var(--border)]">
                Click any gold hotspot (+) on the face to inspect professional placement
              </div>
            </div>

            {/* Quick-Select Zone Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {BEAUTY_HOTSPOTS.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setActiveId(spot.id)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-all font-medium ${
                    activeId === spot.id
                      ? 'bg-[var(--foreground)] text-[var(--background)] shadow-sm'
                      : 'bg-[var(--card)] text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--border)]'
                  }`}
                >
                  {spot.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Active Zone Specification & Formulation Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[var(--card)] border border-[var(--border)] shadow-xl relative overflow-hidden space-y-6">
              {/* Ambient gold glow */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-[var(--accent)]/15 rounded-full blur-2xl pointer-events-none" />

              {/* Header with tool vector icon */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] tracking-ultra-wide uppercase font-semibold text-[var(--accent)] block">
                    {activeSpot.zone}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[var(--foreground)]">
                    {activeSpot.name}
                  </h3>
                </div>

                <div className="p-3 rounded-2xl bg-[var(--background)] border border-[var(--border)] shrink-0 shadow-inner">
                  {renderToolIcon(activeSpot.toolType)}
                </div>
              </div>

              {/* Technique Description */}
              <div className="space-y-2">
                <span className="text-[10px] tracking-widest uppercase font-mono text-[var(--muted)]">
                  The Artist’s Technique
                </span>
                <p className="text-sm text-[var(--foreground)] leading-relaxed">
                  {activeSpot.technique}
                </p>
              </div>

              {/* Two-Column Specification */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-xl bg-[var(--background)] border border-[var(--border)] space-y-1">
                  <span className="text-[10px] tracking-widest uppercase text-[var(--accent)] font-semibold block">
                    Essential Tool
                  </span>
                  <p className="text-xs text-[var(--foreground)] font-medium leading-snug">
                    {activeSpot.toolName}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[var(--background)] border border-[var(--border)] space-y-1">
                  <span className="text-[10px] tracking-widest uppercase text-[var(--accent)] font-semibold block">
                    Formula Placement
                  </span>
                  <p className="text-xs text-[var(--foreground)] font-medium leading-snug">
                    {activeSpot.formula}
                  </p>
                </div>
              </div>

              {/* Client Benefit */}
              <div className="flex items-start space-x-3 p-4 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-xs">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-semibold text-[var(--foreground)] block">
                    The Wedding Day Advantage:
                  </span>
                  <p className="text-[var(--muted)]">
                    {activeSpot.clientBenefit}
                  </p>
                </div>
              </div>

              {/* CTA link */}
              <div className="pt-2">
                <Link
                  href="/enquire"
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-black text-xs tracking-luxury uppercase font-medium transition-colors shadow-md"
                >
                  <span>Request Custom Consultation for Your Facial Architecture</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Atelier Toolset Strip */}
            <div className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-between text-center gap-4">
              <div className="flex flex-col items-center space-y-1 flex-1">
                <SerumDropperVector className="w-8 h-8" />
                <span className="text-[10px] tracking-wider uppercase text-[var(--muted)] font-medium">Cellular Prep</span>
              </div>
              <div className="h-8 w-px bg-[var(--border)]" />
              <div className="flex flex-col items-center space-y-1 flex-1">
                <MakeupBrushVector className="w-8 h-8" />
                <span className="text-[10px] tracking-wider uppercase text-[var(--muted)] font-medium">Bone Sculpt</span>
              </div>
              <div className="h-8 w-px bg-[var(--border)]" />
              <div className="flex flex-col items-center space-y-1 flex-1">
                <LashCurlerVector className="w-8 h-8" />
                <span className="text-[10px] tracking-wider uppercase text-[var(--muted)] font-medium">Lash Lift</span>
              </div>
              <div className="h-8 w-px bg-[var(--border)]" />
              <div className="flex flex-col items-center space-y-1 flex-1">
                <LipstickVector className="w-8 h-8" />
                <span className="text-[10px] tracking-wider uppercase text-[var(--muted)] font-medium">Velvet Lips</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
