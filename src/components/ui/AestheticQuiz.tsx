'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, ArrowUpRight, RotateCcw, CheckCircle2, Heart } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    aestheticKey: string;
  }[];
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'Where is your celebration taking place?',
    subtitle: 'Lighting, humidity, and ambiance dictate skin prep and formulation choice.',
    options: [
      {
        label: 'Grand Mayfair or Belgravia Ballroom',
        description: 'Chandelier lighting, evening black tie, and high-contrast photography.',
        aestheticKey: 'mayfair',
      },
      {
        label: 'Romantic Lake Como or Mediterranean Villa',
        description: 'Golden hour twilight over water, warm sunshine, and outdoor terraces.',
        aestheticKey: 'como',
      },
      {
        label: 'English Country Estate or Cotswolds Manor',
        description: 'Lush gardens, organic textures, and romantic candlelit dinners.',
        aestheticKey: 'natural',
      },
      {
        label: 'Regal Heritage Palace or Cultural Gala',
        description: 'Bully embroidery, heavy jewelry, ceremonial rituals, and fierce lighting.',
        aestheticKey: 'heritage',
      },
    ],
  },
  {
    id: 2,
    question: 'What is your dream skin finish?',
    subtitle: 'How you want your skin to reflect light under cameras and up-close.',
    options: [
      {
        label: 'Liquid Glass Skin & Dewy Radiance',
        description: 'High-gloss cheekbone reflection, plump hydrated texture, and zero powder look.',
        aestheticKey: 'mayfair',
      },
      {
        label: 'Sun-Drenched Honey Bronze',
        description: 'Warm golden undertones, peach flush, and luminous candlelight glow.',
        aestheticKey: 'como',
      },
      {
        label: 'Cashmere Velvet Soft-Matte',
        description: 'Flawless porcelain perfection that stops all shine under flash photography.',
        aestheticKey: 'heritage',
      },
      {
        label: 'Weightless Second-Skin Glow',
        description: 'Breathable sheer tint where your real skin and freckles peek through.',
        aestheticKey: 'natural',
      },
    ],
  },
  {
    id: 3,
    question: 'How do you want your eyes & lips to harmonize?',
    subtitle: 'The signature focal point of your beauty portrait.',
    options: [
      {
        label: 'Soft Champagne Shimmer & Nude Rose Satin Lip',
        description: 'Soft feathery lashes, delicate shimmer wash, and pillowy plump lips.',
        aestheticKey: 'mayfair',
      },
      {
        label: 'Smoldering Antique Bronze & Peach Gloss Pout',
        description: 'Warm bronze liner smudged along the waterline with juicy lip glaze.',
        aestheticKey: 'como',
      },
      {
        label: 'Gilded Kohl Liner & Statuesque Crimson Velvet Lip',
        description: 'Mesmerizing eye definition paired with unforgettable jewel-toned lips.',
        aestheticKey: 'heritage',
      },
      {
        label: 'Micro-Lash Clusters & Sheer Berry Lip Oil',
        description: 'Effortless, French-inspired minimalism celebrating authentic beauty.',
        aestheticKey: 'natural',
      },
    ],
  },
];

const RESULTS_MAP: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  lookSlug: string;
  palette: { name: string; hex: string }[];
}> = {
  mayfair: {
    title: 'The Mayfair Glass-Skin Bride',
    subtitle: 'Haute Bridal Radiance & Champagne Shimmer',
    description: 'Your aesthetic leans toward high-fashion editorial polish combined with timeless regal romance. We recommend our signature 180-minute glass skin ritual with Augustinus Bader sub-dermal hydration, individual cluster lash architecture, and soft satin rosewood lips.',
    imageUrl: '/assets/8cefb0245c79153f745fc34d21844435.jpg',
    lookSlug: 'mayfair-glass-skin-bride',
    palette: [
      { name: 'Glass Highlight', hex: '#F0E6D2' },
      { name: 'Cashmere Rose', hex: '#C88D82' },
      { name: 'Champagne Taupe', hex: '#A8927E' },
    ],
  },
  como: {
    title: 'Lake Como Golden Hour Luminous',
    subtitle: 'Sun-Drenched Bronze & Honey Glaze',
    description: 'Your vision celebrates warmth, Mediterranean twilight, and effortless romantic glow. We recommend our humidity-sealed golden hour bronze formula with peach liquid flush, champagne kajal, and high-shine peptide lip nectar that glistens over water.',
    imageUrl: '/assets/587b54ee128220d06943bf8b1e10e629.jpg',
    lookSlug: 'lake-como-golden-hour',
    palette: [
      { name: 'Honey Bronze', hex: '#C48A54' },
      { name: 'Peach Nectar', hex: '#E5957F' },
      { name: 'Sunlit Gold', hex: '#E5C582' },
    ],
  },
  heritage: {
    title: 'Royal Velvet Heritage Bridal',
    subtitle: 'Opulent Crimson & Gilded Suede Finish',
    description: 'Your aesthetic is regal, statuesque, and built for grand multi-day celebrations. We recommend a soft-focus velvet matte complexion paired with patinated gold lids, smudge-proof kohl definition, and iconic crimson velvet lips that never bleed.',
    imageUrl: '/assets/c54785dd41d0124d0ec1884c9c23b663.jpg',
    lookSlug: 'royal-velvet-heritage-bridal',
    palette: [
      { name: 'Royal Crimson', hex: '#8B1E29' },
      { name: 'Antique Kundan Gold', hex: '#D4AF37' },
      { name: 'Deep Smoked Amber', hex: '#4A2A18' },
    ],
  },
  natural: {
    title: 'Ethereal Clean Girl Radiance',
    subtitle: 'Second-Skin Dew & Sheer Botanical Washes',
    description: 'Your beauty philosophy is quiet luxury at its purest. We skip heavy coverage and focus on lymphatic sculpting, cold quartz de-puffing, sheer serum tinting, feathery brushed brows, and natural flushed lips that look freshly kissed.',
    imageUrl: '/assets/d3a107d3ee66dc6d617759fa20512c04.jpg',
    lookSlug: 'ethereal-clean-girl-radiance',
    palette: [
      { name: 'Sheer Pearl', hex: '#F7EFE4' },
      { name: 'Petal Blush', hex: '#DFA79D' },
      { name: 'Tinted Rosebud', hex: '#BD7670' },
    ],
  },
};

export function AestheticQuiz() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<string[]>([]);
  const [result, setResult] = React.useState<any>(null);

  const handleSelectOption = (aestheticKey: string) => {
    const updated = [...answers, aestheticKey];
    setAnswers(updated);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Calculate match based on majority
      const counts: Record<string, number> = {};
      updated.forEach((k) => {
        counts[k] = (counts[k] || 0) + 1;
      });
      let highestKey = 'mayfair';
      let highestCount = 0;
      Object.keys(counts).forEach((k) => {
        if (counts[k] > highestCount) {
          highestCount = counts[k];
          highestKey = k;
        }
      });
      setResult(RESULTS_MAP[highestKey] || RESULTS_MAP.mayfair);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div className="rounded-3xl bg-[var(--card)] border border-[var(--border)] overflow-hidden shadow-2xl p-6 sm:p-10 space-y-8">
      {/* Quiz Top Header */}
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div className="flex items-center space-x-2 text-xs tracking-ultra-wide uppercase font-semibold text-[var(--accent)]">
          <Sparkles className="w-4 h-4" />
          <span>Interactive Beauty Concierge</span>
        </div>

        {result ? (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center space-x-1.5 text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Aesthetic Matcher</span>
          </button>
        ) : (
          <span className="font-mono text-xs text-[var(--muted)]">
            Step {currentStep + 1} of {QUIZ_QUESTIONS.length}
          </span>
        )}
      </div>

      {/* QUIZ IN PROGRESS */}
      {!result ? (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl text-[var(--foreground)]">
              {QUIZ_QUESTIONS[currentStep].question}
            </h3>
            <p className="text-xs sm:text-sm text-[var(--muted)]">
              {QUIZ_QUESTIONS[currentStep].subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {QUIZ_QUESTIONS[currentStep].options.map((opt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelectOption(opt.aestheticKey)}
                className="group p-5 rounded-2xl border border-[var(--border)] bg-[var(--background-subtle)] hover:bg-[var(--accent-light)] hover:border-[var(--accent)] text-left transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="font-serif text-lg font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                    {opt.label}
                  </div>
                  <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">
                    {opt.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-[var(--muted)] pt-2 border-t border-[var(--border)]/50">
                  <span className="text-[10px] tracking-widest uppercase group-hover:text-[var(--foreground)]">
                    Select Aesthetic
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--accent)] transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* QUIZ RESULT SCREEN */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
          {/* Result Image */}
          <div className="lg:col-span-5 relative aspect-4/5 rounded-2xl overflow-hidden border border-[var(--border)] shadow-xl">
            <Image
              src={result.imageUrl}
              alt={result.title}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
              priority
            />
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] tracking-widest uppercase font-semibold text-[var(--accent)] border border-white/20">
                98% Aesthetic Match
              </span>
            </div>
          </div>

          {/* Result Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs tracking-ultra-wide uppercase font-semibold text-[var(--accent)]">
                Your Bespoke Beauty Recommendation
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[var(--foreground)] leading-tight">
                {result.title}
              </h3>
              <p className="text-xs text-[var(--muted)] tracking-luxury uppercase font-medium">
                {result.subtitle}
              </p>
            </div>

            <p className="text-sm text-[var(--muted)] leading-relaxed">
              {result.description}
            </p>

            {/* Recommended Palette Swatches */}
            <div className="p-4 rounded-2xl bg-[var(--background-subtle)] border border-[var(--border)] space-y-3">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[var(--foreground)] block">
                Recommended Hand-Blended Palette:
              </span>
              <div className="flex items-center space-x-4">
                {result.palette.map((p: any, idx: number) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs">
                    <div
                      className="w-5 h-5 rounded-full border border-black/20 shadow-xs"
                      style={{ backgroundColor: p.hex }}
                    />
                    <span className="text-[11px] text-[var(--muted)]">{p.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <Link
                href={`/enquire?look=${encodeURIComponent(result.title)}`}
                className="inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-full bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-black text-xs tracking-luxury uppercase font-semibold transition-all shadow-md cursor-pointer"
              >
                <span>Check Availability For This Aesthetic</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <Link
                href={`/portfolio/${result.lookSlug}`}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full border border-[var(--border)] text-xs tracking-luxury uppercase font-medium hover:border-[var(--foreground)] transition-colors"
              >
                <span>Inspect Look Details</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
