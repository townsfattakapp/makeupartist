import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Sparkles, Star, Award, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';
import { repository } from '@/lib/db/repository';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LookCard } from '@/components/ui/LookCard';
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider';
import { InstagramSection } from '@/components/ui/InstagramSection';

export default async function HomePage() {
  const settings = await repository.getSettings();
  const featuredLooks = (await repository.getLooks()).slice(0, 4);
  const services = (await repository.getServices()).slice(0, 3);
  const instagramPosts = (await repository.getInstagramPosts()).slice(0, 6);
  const testimonials = await repository.getTestimonials();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-20">
          {/* Background Video / Asset */}
          <div className="absolute inset-0 z-0">
            <video
              src={settings.heroVideoUrl || '/assets/41c5de68208bb185bacd72f4f3fa8965_720w.mp4'}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover filter brightness-[0.72] contrast-[1.08] dark:brightness-[0.55]"
            />
            {/* Cinematic Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-black/40 to-black/70" />
            <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/30 to-black/80" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center text-white py-16 space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] tracking-ultra-wide uppercase font-medium text-[var(--accent)] animate-fadeIn">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Haute Bridal & Editorial Artistry</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] font-normal drop-shadow-md">
              Timeless Radiance, <br />
              <span className="italic font-light text-[var(--accent)]">Quietly Perfected.</span>
            </h1>

            <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-white/80 font-light leading-relaxed tracking-wide">
              Bespoke glass skin architecture, tailored contouring, and devoted bridal accompaniment across London, the Cotswolds, and European destinations.
            </p>

            {/* Primary Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/portfolio"
                id="hero-portfolio-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-full bg-white text-black hover:bg-[var(--accent)] transition-all duration-300 text-xs tracking-luxury uppercase font-semibold shadow-lg hover:shadow-2xl cursor-pointer group"
              >
                <span>Explore The Portfolio</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="/enquire"
                id="hero-enquire-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-full bg-transparent border border-white/40 text-white hover:bg-white/15 hover:border-white transition-all duration-300 text-xs tracking-luxury uppercase font-medium backdrop-blur-xs cursor-pointer"
              >
                <span>Check Availability</span>
              </Link>
            </div>

            {/* Positioning Highlights */}
            <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs tracking-luxury uppercase text-white/70 border-t border-white/15 max-w-4xl mx-auto">
              <div>London Mayfair & Chelsea</div>
              <div>The Cotswolds & Oxfordshire</div>
              <div>Paris & French Riviera</div>
              <div>Lake Como & Destination Weddings</div>
            </div>
          </div>
        </section>

        {/* ARTISTIC PHILOSOPHY & METRICS STRIP */}
        <section className="py-16 border-b border-[var(--border)] bg-[var(--background-subtle)]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-start space-x-4 p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[var(--foreground)] font-medium">Bespoke Skin Architecture</h3>
                  <p className="text-xs text-[var(--muted)] leading-relaxed mt-1">
                    Every session begins with microcurrent lymphatic drainage and custom botanical hydration, ensuring weightless, cake-free longevity.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[var(--foreground)] font-medium">8K Cinema & Paparazzi Proof</h3>
                  <p className="text-xs text-[var(--muted)] leading-relaxed mt-1">
                    Formulas calibrated specifically for modern high-definition optics and flash photography without flashback or chalky oxidation.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[var(--foreground)] font-medium">Single-Client Dedication</h3>
                  <p className="text-xs text-[var(--muted)] leading-relaxed mt-1">
                    Aurelia accepts only one high-profile bridal or editorial commission per day, giving you calm, uninterrupted concierge focus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SELECTED PORTFOLIO LOOKS */}
        <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8">
          <SectionHeading
            badge="Artistry Archive"
            title="Curated Editorial & Bridal Looks"
            subtitle="Explore distinctive finishes honoring diverse skin tones, from dew-drenched glass skin to sculptured velvet matte."
            actionText="View Complete Portfolio"
            actionHref="/portfolio"
            className="mb-12"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredLooks.map((look) => (
              <LookCard key={look.id} look={look} />
            ))}
          </div>
        </section>

        {/* INTERACTIVE BEFORE & AFTER TRANSFORMATION SPOTLIGHT */}
        <section className="py-20 bg-[var(--background-subtle)] border-y border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <span className="text-[11px] tracking-ultra-wide uppercase font-semibold text-[var(--accent)]">
                  The Transformation Proof
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[var(--foreground)] leading-tight">
                  Skin First. <br />
                  <span className="italic text-[var(--accent)]">Flawless Always.</span>
                </h2>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  Notice how real texture is preserved while redness and fatigue vanish. By preparing the canvas with microcurrent lymphatic drainage and tone-balancing serums, minimal foundation is required — leaving you radiant in daylight and mesmerising under evening chandeliers.
                </p>

                <div className="space-y-3 pt-2 text-xs text-[var(--muted)]">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Consented client photography — authentic skin demonstration.</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-[var(--accent)] shrink-0" />
                    <span>Zero skin-blur filters or artificial digital retouching.</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/portfolio/mayfair-glass-skin-bride"
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-black text-xs tracking-luxury uppercase font-medium transition-colors"
                  >
                    <span>Inspect Full Technique Breakdown</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7">
                <BeforeAfterSlider
                  beforeImage="/assets/ff293627f3f413d12a8f47c2a4f6a519.jpg"
                  afterImage="/assets/8cefb0245c79153f745fc34d21844435.jpg"
                  beforeLabel="Natural Skin Prep"
                  afterLabel="Finished Glass Glow"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SIGNATURE SERVICES & EXPERIENCES */}
        <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8">
          <SectionHeading
            badge="The Service Catalogue"
            title="Bespoke Artistry Commissions"
            subtitle="Indicative commission tiers designed for luxury weddings, red-carpet appearances, and private vanity masterclasses."
            actionText="View All Inclusions"
            actionHref="/services"
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((svc) => (
              <div
                key={svc.id}
                className="group relative flex flex-col justify-between rounded-2xl bg-[var(--card)] border border-[var(--border)] overflow-hidden p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:border-[var(--accent)]/60"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-ultra-wide uppercase font-semibold text-[var(--accent)]">
                      {svc.category}
                    </span>
                    <span className="font-mono text-xs font-semibold text-[var(--foreground)]">
                      {svc.priceIndicative}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                    {svc.title}
                  </h3>

                  <p className="text-xs text-[var(--muted)] leading-relaxed">
                    {svc.shortDescription}
                  </p>

                  <div className="pt-4 border-t border-[var(--border)] space-y-2">
                    <span className="text-[11px] font-semibold text-[var(--foreground)] uppercase tracking-wide block">
                      Key Inclusions:
                    </span>
                    <ul className="text-xs text-[var(--muted)] space-y-1.5">
                      {svc.inclusions.slice(0, 3).map((inc, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="text-[var(--accent)] mt-0.5">•</span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[var(--border)] flex items-center justify-between">
                  <span className="text-[11px] text-[var(--muted)] font-mono">
                    ~{svc.durationMinutes} Minutes
                  </span>
                  <Link
                    href={`/services/${svc.slug}`}
                    className="inline-flex items-center space-x-1 text-xs tracking-luxury uppercase font-medium text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
                  >
                    <span>Details & Prep</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ARTIST STORY & EDITORIAL BIO */}
        <section className="py-20 bg-[var(--background-subtle)] border-t border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-3/4 rounded-2xl overflow-hidden border border-[var(--border)] shadow-xl">
                  <Image
                    src="/assets/8cefb0245c79153f745fc34d21844435.jpg"
                    alt="Aurelia Vance, Founder and Lead Artist"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-lg hidden sm:block max-w-[220px]">
                  <span className="font-serif text-2xl text-[var(--foreground)] block">12+ Years</span>
                  <span className="text-[11px] text-[var(--muted)] uppercase tracking-wider">
                    London, Paris & Lake Como Artistry
                  </span>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <span className="text-[11px] tracking-ultra-wide uppercase font-semibold text-[var(--accent)]">
                  The Artist
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl text-[var(--foreground)] leading-tight">
                  “Makeup should feel like liquid silk, not a theatrical mask.”
                </h2>
                <div className="space-y-4 text-sm text-[var(--muted)] leading-relaxed">
                  <p>
                    Trained in classical fine art before mastering backstage couture at Paris and London fashion weeks, Aurelia Vance brings an architect’s understanding of facial symmetry and a painter’s sensitivity to light.
                  </p>
                  <p>
                    Rather than imposing a signature template onto every face, Aurelia listens attentively to your personal aesthetic, wedding gown silhouette, and the venue’s ambient illumination to design a bespoke look that feels authentically you.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-4 text-xs tracking-wide">
                  <div className="px-3.5 py-2 rounded-lg bg-[var(--card)] border border-[var(--border)]">
                    Cruelty-Free & Dermatological Kit
                  </div>
                  <div className="px-3.5 py-2 rounded-lg bg-[var(--card)] border border-[var(--border)]">
                    Multi-Day Destination Logistics
                  </div>
                  <div className="px-3.5 py-2 rounded-lg bg-[var(--card)] border border-[var(--border)]">
                    Private Mayfair Preview Studio
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/about"
                    className="inline-flex items-center space-x-2 text-xs tracking-luxury uppercase font-semibold text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
                  >
                    <span>Read The Full Studio Manifesto</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CURATED INSTAGRAM FEED */}
        <InstagramSection posts={instagramPosts} handle={settings.instagramHandle} />

        {/* TESTIMONIALS */}
        <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8">
          <SectionHeading
            badge="Client Voices"
            title="Editorial & Bridal Acclaim"
            subtitle="Realistic sample reflections from brides and directors experiencing the Aurelia Luxe accompaniment."
            centered
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-1 text-amber-500">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <p className="font-serif text-lg text-[var(--foreground)] italic leading-relaxed">
                    “{test.quote}”
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--border)]">
                  <div className="font-semibold text-xs tracking-wide text-[var(--foreground)]">
                    {test.clientName}
                  </div>
                  <div className="text-[11px] text-[var(--muted)]">
                    {test.eventType} • {test.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL BOOKING INVITATION CTA */}
        <section className="py-24 bg-[var(--foreground)] text-[var(--background)]">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center space-y-6">
            <span className="text-xs tracking-ultra-wide uppercase text-[var(--accent)] font-semibold">
              Exclusive Commission Calendar
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[var(--background)] leading-tight font-normal">
              Reserve Your Date & <br />
              <span className="italic text-[var(--accent)] font-light">Begin Your Bespoke Journey</span>
            </h2>
            <p className="max-w-xl mx-auto text-sm sm:text-base text-[var(--background)]/80 leading-relaxed font-light">
              We accept a limited number of haute bridal and private commissions each season to ensure single-client dedication. Submit your event details to check availability.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/enquire"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-full bg-[var(--accent)] text-black hover:bg-[var(--accent-hover)] text-xs tracking-luxury uppercase font-semibold transition-all shadow-xl cursor-pointer"
              >
                <span>Request Availability & Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-full border border-white/30 text-[var(--background)] hover:border-white transition-all text-xs tracking-luxury uppercase font-medium"
              >
                <span>Studio Concierge</span>
              </Link>
            </div>
            <p className="text-[11px] text-[var(--background)]/60 pt-4">
              Response guarantee within 24 business hours • Non-binding initial availability request
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
