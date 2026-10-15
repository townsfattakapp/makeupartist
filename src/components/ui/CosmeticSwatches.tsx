'use client';

import * as React from 'react';
import { Sparkles, Palette, Check, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface Swatch {
  name: string;
  category: 'Lips' | 'Cheeks' | 'Eyes' | 'Glow';
  finish: 'Velvet Matte' | 'Dewy Glaze' | 'Satin Cream' | 'Liquid Gold' | 'Smoked Silk';
  hex: string;
  borderHex?: string;
  description: string;
  pairedLook: string;
  pairedLookSlug: string;
}

const BEAUTY_SWATCHES: Swatch[] = [
  {
    name: 'Mayfair Cashmere Rose',
    category: 'Lips',
    finish: 'Satin Cream',
    hex: '#C88D82',
    description: 'Custom blended neutral rosewood with subtle peach warmth. Universal bridal favorite.',
    pairedLook: 'The Mayfair Glass-Skin Bride',
    pairedLookSlug: 'mayfair-glass-skin-bride',
  },
  {
    name: 'Imperial Royal Crimson',
    category: 'Lips',
    finish: 'Velvet Matte',
    hex: '#8B1E29',
    description: 'Deep jewel-toned scarlet formulated to balance heavy gold bullion and uncut polki jewels.',
    pairedLook: 'Royal Velvet Heritage Bridal',
    pairedLookSlug: 'royal-velvet-heritage-bridal',
  },
  {
    name: 'Como Twilight Nectar',
    category: 'Lips',
    finish: 'Dewy Glaze',
    hex: '#D7937A',
    description: 'Sheer warm honey-terracotta infused with peptide gloss for romantic sunset vows.',
    pairedLook: 'Lake Como Golden Hour Luminous',
    pairedLookSlug: 'lake-como-golden-hour',
  },
  {
    name: 'Champagne Quartz Glaze',
    category: 'Glow',
    finish: 'Liquid Gold',
    hex: '#E8D4B0',
    borderHex: '#D4AF37',
    description: 'Micro-milled multidimensional pearl that bounces flash photography without flashback.',
    pairedLook: 'The Mayfair Glass-Skin Bride',
    pairedLookSlug: 'mayfair-glass-skin-bride',
  },
  {
    name: 'Venetian Antique Bronze',
    category: 'Eyes',
    finish: 'Smoked Silk',
    hex: '#644733',
    description: 'Velvety chocolate bronze blended into outer feline corners to elongate and lift.',
    pairedLook: 'Cannes Red Carpet Luminous',
    pairedLookSlug: 'cannes-red-carpet-luminous',
  },
  {
    name: 'Dewy Peach Flush',
    category: 'Cheeks',
    finish: 'Dewy Glaze',
    hex: '#E5957F',
    description: 'Melted cream blush pressed directly onto upper cheek apples for an awakened youthful flush.',
    pairedLook: 'Ethereal Clean Girl Morning Radiance',
    pairedLookSlug: 'ethereal-clean-girl-radiance',
  },
];

export function CosmeticSwatches() {
  const [activeCategory, setActiveCategory] = React.useState<'All' | 'Lips' | 'Glow' | 'Eyes' | 'Cheeks'>('All');
  const [selectedSwatch, setSelectedSwatch] = React.useState<Swatch>(BEAUTY_SWATCHES[0]);

  const filteredSwatches = activeCategory === 'All'
    ? BEAUTY_SWATCHES
    : BEAUTY_SWATCHES.filter((s) => s.category === activeCategory);

  return (
    <div className="rounded-2xl sm:rounded-3xl bg-[var(--card)] border border-[var(--border)] p-4 sm:p-10 shadow-xl space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-5 sm:pb-6">
        <div>
          <span className="text-[11px] sm:text-xs tracking-wider sm:tracking-ultra-wide uppercase font-semibold text-[var(--accent)] flex items-center space-x-1.5 mb-2">
            <Palette className="w-3.5 h-3.5" />
            <span>The Couture Color Bar</span>
          </span>
          <h3 className="font-serif text-xl sm:text-3xl text-[var(--foreground)]">
            Hand-Blended Shade Architecture
          </h3>
          <p className="text-xs sm:text-sm text-[var(--muted)] mt-1 max-w-xl leading-relaxed">
            Every bridal and editorial client receives custom-formulated shades blended on-site to match their personal undertone and lighting environment.
          </p>
        </div>

        {/* Category Pills - Wrapped with Zero Horizontal Scrolling */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
          {(['All', 'Lips', 'Glow', 'Cheeks', 'Eyes'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 sm:px-3.5 py-1.5 rounded-full font-medium transition-all cursor-pointer text-xs ${
                activeCategory === cat
                  ? 'bg-[var(--foreground)] text-[var(--background)] shadow-xs'
                  : 'bg-[var(--background-subtle)] text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--border)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Swatches Visual Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {filteredSwatches.map((swatch) => {
          const isSelected = selectedSwatch.name === swatch.name;
          return (
            <button
              key={swatch.name}
              type="button"
              onClick={() => setSelectedSwatch(swatch)}
              className={`group flex flex-col items-center text-center p-4 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? 'border-[var(--accent)] bg-[var(--accent-light)] ring-2 ring-[var(--accent)]/30 shadow-md scale-102'
                  : 'border-[var(--border)] bg-[var(--background)] hover:border-[var(--accent)]/60 hover:bg-[var(--background-subtle)]'
              }`}
            >
              {/* Swatch Pill / Liquid Drop Visual */}
              <div
                className="w-14 h-14 rounded-full shadow-inner mb-3 transition-transform group-hover:scale-110 flex items-center justify-center relative overflow-hidden"
                style={{
                  backgroundColor: swatch.hex,
                  border: swatch.borderHex ? `2px solid ${swatch.borderHex}` : '1px solid rgba(0,0,0,0.1)',
                }}
              >
                {/* Subtle Liquid Shine Gloss Reflection */}
                <div className="absolute -top-1 -right-1 w-7 h-7 bg-white/40 rounded-full blur-[2px]" />
                {isSelected && (
                  <Check className="w-4 h-4 text-white drop-shadow-md" />
                )}
              </div>

              <div className="text-[10px] tracking-widest uppercase font-semibold text-[var(--accent)]">
                {swatch.category}
              </div>
              <div className="font-serif text-sm font-medium text-[var(--foreground)] mt-0.5 leading-tight">
                {swatch.name}
              </div>
              <div className="text-[10px] text-[var(--muted)] mt-1 font-mono">
                {swatch.finish}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Swatch Formulation Deep-Dive Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[var(--background-subtle)] border border-[var(--border)] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start space-x-4">
          <div
            className="w-12 h-12 rounded-xl shrink-0 shadow-md relative overflow-hidden"
            style={{ backgroundColor: selectedSwatch.hex }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-white/30" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="font-serif text-lg font-semibold text-[var(--foreground)]">
                {selectedSwatch.name}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[var(--card)] border border-[var(--border)] text-[10px] font-mono text-[var(--accent)]">
                {selectedSwatch.finish}
              </span>
            </div>
            <p className="text-xs text-[var(--muted)] max-w-xl leading-relaxed">
              {selectedSwatch.description}
            </p>
          </div>
        </div>

        <Link
          href={`/portfolio/${selectedSwatch.pairedLookSlug}`}
          className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center space-x-1.5 px-5 py-3 sm:py-2.5 rounded-full bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-black text-xs tracking-luxury uppercase font-medium transition-all shadow-xs text-center"
        >
          <span>See Look: {selectedSwatch.pairedLook}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
