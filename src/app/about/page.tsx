import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Sparkles, Award, ShieldCheck, Heart, Clock, Compass } from 'lucide-react';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { repository } from '@/lib/db/repository';

export default async function AboutPage() {
  const settings = await repository.getSettings();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Header */}
          <SectionHeading
            badge="The Artist & Philosophy"
            title="Aurelia Vance"
            subtitle="Bridging classical fine art discipline with backstage high-fashion technique to sculpt timeless, photographically immaculate beauty."
            className="mb-12"
          />

          {/* Portrait & Biography Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Visual Portrait */}
            <div className="lg:col-span-5 relative space-y-6">
              <div className="relative aspect-3/4 rounded-2xl overflow-hidden border border-[var(--border)] shadow-xl">
                <Image
                  src="/assets/8cefb0245c79153f745fc34d21844435.jpg"
                  alt="Aurelia Vance - Senior Makeup Artist"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Verified Credentials Box */}
              <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs space-y-3">
                <span className="text-[10px] tracking-ultra-wide uppercase font-semibold text-[var(--accent)] block">
                  Studio Credentials
                </span>
                <ul className="text-xs text-[var(--muted)] space-y-2">
                  <li className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>ITEC Level 4 Advanced Clinical & Editorial Artistry Diploma</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Hospital-Grade Sanitation & Cross-Contamination Certified</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Fully Insured Global Bridal & Production Public Liability</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Narrative Story */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <h3 className="font-serif text-3xl sm:text-4xl text-[var(--foreground)] leading-tight">
                  “I see makeup not as an act of concealment, but as an intimate architectural dialogue with light.”
                </h3>

                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  With over a decade of dedicated artistry between London, Paris, and Lake Como, Aurelia Vance has developed an international reputation for quiet luxury: skin that looks like fresh silk in daylight, defies digital cinema cameras, and feels entirely weightless to the wearer.
                </p>

                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  Having originally studied classical portrait oil painting at the Courtauld Institute, Aurelia translates chromatic theory and glaze layering directly onto human skin. Rather than using thick foundation layers that crack or oxidize over an emotional 14-hour celebration, she applies micro-pinpoint pigment only where tone balance is needed, preserving natural radiance and individuality.
                </p>
              </div>

              {/* Three Core Tenets */}
              <div className="space-y-6 pt-4 border-t border-[var(--border)]">
                <h4 className="text-xs tracking-ultra-wide uppercase font-semibold text-[var(--foreground)]">
                  The Studio Principles
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-5 rounded-xl bg-[var(--background-subtle)] border border-[var(--border)] space-y-2">
                    <div className="flex items-center space-x-2 text-xs font-semibold text-[var(--foreground)]">
                      <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                      <span>The 45-Minute Prep Ritual</span>
                    </div>
                    <p className="text-xs text-[var(--muted)] leading-relaxed">
                      Before a single drop of foundation touches your face, we use microcurrent lymphatic drainage, cold quartz rollers, and medical-grade hyaluronic infusions to sculpt bone structure and awaken blood flow.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-[var(--background-subtle)] border border-[var(--border)] space-y-2">
                    <div className="flex items-center space-x-2 text-xs font-semibold text-[var(--foreground)]">
                      <Heart className="w-4 h-4 text-[var(--accent)]" />
                      <span>Clean, Ethical Luxury Kit</span>
                    </div>
                    <p className="text-xs text-[var(--muted)] leading-relaxed">
                      Our kits contain exclusively cruelty-free, high-potency formulations from Augustinus Bader, Chantecaille, Westman Atelier, and Tom Ford. Sensitive and reactive skins are treated with utmost care.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-[var(--background-subtle)] border border-[var(--border)] space-y-2">
                    <div className="flex items-center space-x-2 text-xs font-semibold text-[var(--foreground)]">
                      <Clock className="w-4 h-4 text-[var(--accent)]" />
                      <span>Zero-Stress Presence</span>
                    </div>
                    <p className="text-xs text-[var(--muted)] leading-relaxed">
                      On your wedding morning, calm is paramount. Aurelia works seamlessly with your photographer and hair stylists, ensuring you feel relaxed, centered, and completely cared for.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-[var(--background-subtle)] border border-[var(--border)] space-y-2">
                    <div className="flex items-center space-x-2 text-xs font-semibold text-[var(--foreground)]">
                      <Compass className="w-4 h-4 text-[var(--accent)]" />
                      <span>Global Destination Mobility</span>
                    </div>
                    <p className="text-xs text-[var(--muted)] leading-relaxed">
                      Equipped with international voltage-ready lighting, climate-sealed cosmetic storage, and bespoke travel logistics for villa weddings across Lake Como, France, and Switzerland.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row gap-4">
                <Link
                  href="/enquire"
                  className="inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-full bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-black text-xs tracking-luxury uppercase font-medium transition-colors shadow-sm"
                >
                  <span>Request Availability For Your Date</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-full border border-[var(--border)] text-xs tracking-luxury uppercase font-medium hover:border-[var(--foreground)] transition-colors"
                >
                  <span>Explore Artistry Archive</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
