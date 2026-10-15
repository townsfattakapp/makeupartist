import { Award, ShieldCheck, Heart, Droplets, Feather, Eye } from 'lucide-react';

interface KitItem {
  brand: string;
  productName: string;
  role: string;
  benefit: string;
  icon: any;
  finish: string;
}

const PRESTIGE_KIT_ITEMS: KitItem[] = [
  {
    brand: 'Augustinus Bader',
    productName: 'The Rich Cream & Cellular Base',
    role: 'Sub-Dermal Lymphatic Preparation',
    benefit: 'Proprietary TFC8 cellular renewal triggers blood microcirculation for plump, glass-like hydration without oiliness.',
    icon: Droplets,
    finish: 'Biocompatible Priming',
  },
  {
    brand: 'Charlotte Tilbury',
    productName: 'Hollywood Flawless Filter Complex',
    role: 'Luminescent Youth Glow',
    benefit: 'Finely-milled airbrush polymers that smooth pores and bounce candlelight illumination across cheekbones.',
    icon: Award,
    finish: 'High-Point Radiance',
  },
  {
    brand: 'Pat McGrath Labs',
    productName: 'Mothership Chromatic Pigments',
    role: 'Dimensional Architectural Eyes',
    benefit: 'Multi-reflective crystalline shadows that shift under tungsten and daylight without creasing or fallout.',
    icon: Eye,
    finish: 'Couture Lids',
  },
  {
    brand: 'Westman Atelier',
    productName: 'Lit Up Highlight & Baby Cheeks',
    role: 'Clean Organic Sculpting',
    benefit: 'Clean, cruelty-free botanical waxes that melt with skin temperature, looking like natural flush rather than makeup.',
    icon: Feather,
    finish: 'Translucent Flush',
  },
  {
    brand: 'Tom Ford Beauty',
    productName: 'Ultra-Rich Lip Color & Suede Liners',
    role: '16-Hour Tear-Proof Lip Architecture',
    benefit: 'Rare exotic ingredients including soja seed extract and chamomilla flower oil creating creamy velvet longevity.',
    icon: Heart,
    finish: 'Velvet Satin',
  },
  {
    brand: 'Chantecaille',
    productName: 'Future Skin Gel Foundation',
    role: 'Weightless 8K Camera Camouflage',
    benefit: '60% charged water formulation that allows natural freckles to breathe while extinguishing redness and fatigue.',
    icon: ShieldCheck,
    finish: 'Second-Skin Gel',
  },
];

export function VanityKitShowcase() {
  return (
    <section className="py-14 sm:py-20 bg-[var(--background-subtle)] border-y border-[var(--border)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10 sm:space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[11px] sm:text-xs tracking-wider sm:tracking-ultra-wide uppercase font-semibold text-[var(--accent)] flex items-center space-x-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>The Professional Vanity Kit</span>
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[var(--foreground)]">
              Prestige Formulas Behind The Glow
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted)] max-w-2xl leading-relaxed">
              We never cut corners with high-street cosmetics. Every bottle, pigment, and cream in Kumkum’s mobile trunk is hand-selected from the world’s leading dermatological and luxury beauty houses.
            </p>
          </div>

          <div className="shrink-0 p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] text-xs text-[var(--muted)] space-y-1">
            <div className="flex items-center space-x-2 font-semibold text-[var(--foreground)]">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% Hospital-Grade Hygiene</span>
            </div>
            <p className="text-[11px] leading-tight">
              Stainless steel mixing palettes, disposable spatulas, and 70% IPA brush sanitation between every application.
            </p>
          </div>
        </div>

        {/* Kit Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {PRESTIGE_KIT_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group p-5 sm:p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-ultra-wide uppercase font-semibold text-[var(--accent)]">
                      {item.brand}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[var(--background-subtle)] text-[10px] font-mono text-[var(--muted)]">
                      {item.finish}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                    {item.productName}
                  </h3>

                  <div className="text-xs font-semibold text-[var(--foreground)] flex items-center space-x-1.5 pt-1">
                    <Icon className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>{item.role}</span>
                  </div>

                  <p className="text-xs text-[var(--muted)] leading-relaxed">
                    {item.benefit}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-[11px] text-[var(--muted)]">
                  <span>Cruelty-Free Certified</span>
                  <span className="text-emerald-500 font-medium">Camera Calibrated</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
