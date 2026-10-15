import Link from 'next/link';
import { Sparkles, ShieldCheck, ArrowUpRight, Droplets, CheckCircle2 } from 'lucide-react';
import { BeforeAfterSlider } from './BeforeAfterSlider';

export function TransformationSpotlight() {
  return (
    <section className="py-24 bg-[var(--background-subtle)] border-y border-[var(--border)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs tracking-ultra-wide uppercase font-semibold text-[var(--accent)] flex items-center justify-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Power of Bespoke Artistry</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[var(--foreground)] leading-tight">
            The Transformation Spotlight
          </h2>
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            Drag the interactive slider below to inspect how classical color correction and sub-dermal botanical hydration awaken the face without a heavy mask of foundation.
          </p>
        </div>

        {/* Transformation Split Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Interactive Comparison Slider */}
          <div className="lg:col-span-7">
            <BeforeAfterSlider
              beforeImage="/assets/ff293627f3f413d12a8f47c2a4f6a519.jpg"
              afterImage="/assets/8cefb0245c79153f745fc34d21844435.jpg"
              beforeLabel="Pre-Session Botanical Prep"
              afterLabel="Finished Mayfair Glass Skin"
            />
          </div>

          {/* Technique & Ritual Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] tracking-ultra-wide uppercase font-semibold text-[var(--accent)]">
                The 3-Phase Transformation Method
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[var(--foreground)]">
                Light Reflection Over Heavy Product
              </h3>
              <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                Rather than suffocating the skin with heavy matte concealers, Kumkum uses botanical lymphatic drainage to sculpt the jawline and brow bones, followed by pinpoint micro-corrections that leave natural freckles glowing.
              </p>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-start space-x-3 shadow-xs">
                <div className="w-6 h-6 rounded-full bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center font-serif text-xs font-bold shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--foreground)]">Lymphatic Drainage & Cold Quartz Roller</h4>
                  <p className="text-[11px] text-[var(--muted)] mt-0.5">
                    Depuffs morning fluid retention and tightens pores before any cosmetic touches the skin.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-start space-x-3 shadow-xs">
                <div className="w-6 h-6 rounded-full bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center font-serif text-xs font-bold shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--foreground)]">Pinpoint Micro-Pigment Balancing</h4>
                  <p className="text-[11px] text-[var(--muted)] mt-0.5">
                    Neutralizing redness around the nose and dark under-eye circles with customized shade color wheels.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-start space-x-3 shadow-xs">
                <div className="w-6 h-6 rounded-full bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center font-serif text-xs font-bold shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--foreground)]">Dimensional Cluster Lash & Tear-Proof Seal</h4>
                  <p className="text-[11px] text-[var(--muted)] mt-0.5">
                    Individual micro-clusters mapped to eye symmetry, sealed with an invisible waterproof matrix.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PROPERLY CENTERED CALL TO ACTION */}
        <div className="pt-4 flex flex-col items-center justify-center text-center space-y-3">
          <Link
            href="/enquire"
            className="inline-flex items-center justify-center space-x-2.5 px-8 py-3.5 rounded-full bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-black text-xs tracking-luxury uppercase font-semibold transition-all shadow-md hover:shadow-xl group"
          >
            <span>Reserve Your Transformation</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <p className="text-[11px] tracking-wide text-[var(--muted)]">
            Single-client dedication — Kumkum accepts only one high-profile bridal or editorial commission per date.
          </p>
        </div>
      </div>
    </section>
  );
}
