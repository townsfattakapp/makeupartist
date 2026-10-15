import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Sparkles, Star, Award, ShieldCheck, HeartHandshake, Compass, Palette, Droplets } from 'lucide-react';
import { repository } from '@/lib/db/repository';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LookCard } from '@/components/ui/LookCard';
import { InstagramSection } from '@/components/ui/InstagramSection';
import { TransformationSpotlight } from '@/components/ui/TransformationSpotlight';
import { VanityKitShowcase } from '@/components/ui/VanityKitShowcase';
import { AestheticQuiz } from '@/components/ui/AestheticQuiz';
import { CosmeticSwatches } from '@/components/ui/CosmeticSwatches';
import { BeautyAnatomyCanvas } from '@/components/ui/BeautyAnatomyCanvas';
import {
  FloatingBeautyAccents,
  MakeupBrushVector,
  LipstickVector,
  SerumDropperVector,
  LashCurlerVector,
} from '@/components/ui/BeautyVectorArt';

export default async function HomePage() {
  const settings = await repository.getSettings();
  const featuredLooks = (await repository.getLooks()).slice(0, 4);
  const services = (await repository.getServices()).slice(0, 3);
  const instagramPosts = (await repository.getInstagramPosts()).slice(0, 6);
  const testimonials = await repository.getTestimonials();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] w-full max-w-full overflow-x-hidden">
      <Header />

      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {/* HERO SECTION WITH LUXURY MAKEUP ARTISTRY IMMERSION */}
        <section className="relative min-h-[96vh] lg:min-h-screen flex flex-col justify-between items-center overflow-hidden pt-28 pb-10 sm:pb-14 w-full max-w-full">
          {/* Background Video / Beauty Reel - Luminous, Warm & Cinematic */}
          <div className="absolute inset-0 z-0">
            <video
              src={settings.heroVideoUrl || '/assets/DulhanTrendz_pindown.io_1792068541.mp4'}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover filter brightness-[0.84] contrast-[1.08] saturate-[1.12]"
            />
            {/* Elegant Editorial Vignette - Subtle & Warm, letting bridal glow shine through */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-black/40 to-black/60" />
            <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/25 to-black/70" />
            <FloatingBeautyAccents className="absolute inset-0 z-[1] pointer-events-none overflow-hidden opacity-35" />
          </div>

          {/* Hero Beauty Content */}
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 text-center text-white py-6 sm:py-10 space-y-6 sm:space-y-8 my-auto">
            <div className="inline-flex items-center space-x-2.5 px-4 sm:px-5 py-2 rounded-full bg-black/60 backdrop-blur-md border border-[var(--accent)]/40 text-[11px] sm:text-xs tracking-widest sm:tracking-ultra-wide uppercase font-semibold text-[var(--accent)] shadow-xl animate-fadeIn">
              <Sparkles className="w-3.5 h-3.5 shrink-0 text-[var(--accent)]" />
              <span>Haute Bridal & Celebrity Artistry</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight leading-[1.04] font-normal drop-shadow-2xl">
              Glass Skin Radiance, <br />
              <span className="italic font-light text-[var(--accent)] font-serif">Quietly Perfected.</span>
            </h1>

            <p className="max-w-3xl mx-auto text-sm sm:text-lg md:text-xl text-white/95 font-light leading-relaxed tracking-wide px-2 drop-shadow-md">
              Bespoke facial architecture, custom hand-blended pigments, and dedicated wedding day accompaniment across Mumbai, Delhi, London, and global destination celebrations.
            </p>

            {/* Primary Actions */}
            <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg sm:max-w-none mx-auto">
              <Link
                href="/portfolio"
                id="hero-portfolio-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 sm:px-10 py-4 rounded-full bg-[var(--accent)] text-black hover:bg-[var(--accent-hover)] transition-all duration-300 text-xs sm:text-sm tracking-luxury uppercase font-semibold shadow-2xl hover:scale-105 cursor-pointer group"
              >
                <span>Explore The Artistry Archive</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="/enquire"
                id="hero-enquire-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 sm:px-10 py-4 rounded-full bg-black/45 hover:bg-white/20 border border-white/50 hover:border-white text-white transition-all duration-300 text-xs sm:text-sm tracking-luxury uppercase font-medium backdrop-blur-md shadow-xl cursor-pointer"
              >
                <span>Check Date Availability</span>
              </Link>
            </div>
          </div>

          {/* Tactile Makeup Highlights Strip & Scroll Invitation */}
          <div className="relative z-10 w-full px-4 flex flex-col items-center space-y-4">
            {/* Mobile 2x2 Luxury Grid - No Horizontal Scrolling */}
            <div className="md:hidden grid grid-cols-2 gap-2 w-full max-w-md mx-auto">
              <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-[var(--accent)]/30 shadow-md text-left">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0 shadow-xs shadow-[var(--accent)]" />
                <span className="text-[10px] tracking-wide uppercase font-semibold text-white/95 leading-tight">45-Min Lymphatic Prep</span>
              </div>
              <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-[var(--accent)]/30 shadow-md text-left">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0 shadow-xs shadow-[var(--accent)]" />
                <span className="text-[10px] tracking-wide uppercase font-semibold text-white/95 leading-tight">16-Hour Tear-Proof</span>
              </div>
              <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-[var(--accent)]/30 shadow-md text-left">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0 shadow-xs shadow-[var(--accent)]" />
                <span className="text-[10px] tracking-wide uppercase font-semibold text-white/95 leading-tight">Prestige Clean Kit</span>
              </div>
              <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-[var(--accent)]/30 shadow-md text-left">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0 shadow-xs shadow-[var(--accent)]" />
                <span className="text-[10px] tracking-wide uppercase font-semibold text-white/95 leading-tight">Single Client Focus</span>
              </div>
            </div>

            {/* Desktop & Tablet: Grand Single-Line Luxury Ribbon */}
            <div className="hidden md:inline-flex items-center space-x-6 lg:space-x-8 px-8 lg:px-12 py-3.5 sm:py-4 rounded-full bg-black/70 backdrop-blur-xl border border-[var(--accent)]/40 text-xs sm:text-[13px] tracking-luxury uppercase text-white font-medium shadow-2xl">
              <div className="flex items-center space-x-2.5 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] shadow-sm shadow-[var(--accent)]" />
                <span className="font-semibold text-white">45-Min Lymphatic Prep</span>
              </div>
              <span className="text-[var(--accent)]/60 shrink-0 font-bold">•</span>
              <div className="flex items-center space-x-2.5 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] shadow-sm shadow-[var(--accent)]" />
                <span className="font-semibold text-white">16-Hour Tear-Proof Finish</span>
              </div>
              <span className="text-[var(--accent)]/60 shrink-0 font-bold">•</span>
              <div className="flex items-center space-x-2.5 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] shadow-sm shadow-[var(--accent)]" />
                <span className="font-semibold text-white">Prestige Clean Kit</span>
              </div>
              <span className="text-[var(--accent)]/60 shrink-0 font-bold">•</span>
              <div className="flex items-center space-x-2.5 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] shadow-sm shadow-[var(--accent)]" />
                <span className="font-semibold text-white">Single Client Dedication</span>
              </div>
            </div>

            {/* Subtle Editorial Scroll Prompt */}
            <div className="pt-2 flex flex-col items-center space-y-1.5 opacity-75 hover:opacity-100 transition-opacity">
              <span className="text-[9px] tracking-ultra-wide uppercase text-[var(--accent)] font-mono">
                Scroll to Explore Artistry
              </span>
              <div className="w-4 h-7 rounded-full border border-white/25 flex items-start justify-center p-0.5">
                <div className="w-1 h-1.5 rounded-full bg-[var(--accent)] animate-bounce" />
              </div>
            </div>
          </div>
        </section>

        {/* PROMINENT BEFORE / AFTER TRANSFORMATION SPOTLIGHT */}
        <TransformationSpotlight />

        {/* INTERACTIVE FACE CHART: ANATOMY OF HAUTE ARTISTRY (VECTOR ART) */}
        <BeautyAnatomyCanvas />

        {/* INTERACTIVE BRIDAL & EVENT AESTHETIC QUIZ */}
        <section className="py-14 sm:py-24 max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading
            badge="The Aesthetic Matcher"
            title="Discover Your Signature Bridal Style"
            subtitle="Take our 60-second interactive consultation to match your wedding gown silhouette, venue lighting, and personal comfort level with a tailored makeup architecture."
            centered
            className="mb-10 sm:mb-12"
          />

          <AestheticQuiz />
        </section>

        {/* THE COUTURE COLOR BAR (SWATCHES & FORMULATION DETAILS) */}
        <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-8">
          <CosmeticSwatches />
        </section>

        {/* CURATED PORTFOLIO ARCHIVES */}
        <section className="py-14 sm:py-24 max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading
            badge="Artistry Archive"
            title="Featured Editorial & Bridal Looks"
            subtitle="Explore distinctive finishes honoring diverse skin tones, from dew-drenched glass skin to sculptured velvet matte."
            actionText="View Complete Portfolio"
            actionHref="/portfolio"
            className="mb-10 sm:mb-12"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredLooks.map((look) => (
              <LookCard key={look.id} look={look} />
            ))}
          </div>
        </section>

        {/* INSIDE THE LUXURY VANITY KIT (BRANDS & HYGIENE) */}
        <VanityKitShowcase />

        {/* SIGNATURE SERVICES & EXPERIENCES */}
        <section className="py-14 sm:py-24 max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading
            badge="The Service Catalogue"
            title="Bespoke Artistry Commissions"
            subtitle="Indicative commission tiers designed for luxury weddings, red-carpet appearances, and private vanity masterclasses."
            actionText="View All Inclusions"
            actionHref="/services"
            className="mb-10 sm:mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {services.map((svc, idx) => (
              <div
                key={svc.id}
                className="group relative flex flex-col justify-between rounded-2xl bg-[var(--card)] border border-[var(--border)] overflow-hidden p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:border-[var(--accent)]/60"
              >
                {/* Decorative Vector Watermark in Card Background */}
                <div className="absolute -top-3 -right-3 opacity-25 group-hover:opacity-45 transition-opacity pointer-events-none">
                  {idx === 0 && <LipstickVector className="w-16 h-16" />}
                  {idx === 1 && <MakeupBrushVector className="w-16 h-16" />}
                  {idx >= 2 && <SerumDropperVector className="w-16 h-16" />}
                </div>

                <div className="space-y-4 relative z-10">
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

        {/* ARTIST STORY & BACKSTAGE MANIFESTO */}
        <section className="py-14 sm:py-20 bg-[var(--background-subtle)] border-t border-[var(--border)] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-3/4 rounded-2xl overflow-hidden border border-[var(--border)] shadow-xl">
                  <Image
                    src="/assets/8cefb0245c79153f745fc34d21844435.jpg"
                    alt="Kumkum Patel, Founder and Lead Artist"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-3 right-3 sm:-bottom-6 sm:-right-6 p-3 sm:p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-lg max-w-[190px] sm:max-w-[220px]">
                  <span className="font-serif text-xl sm:text-2xl text-[var(--foreground)] block">12+ Years</span>
                  <span className="text-[10px] sm:text-[11px] text-[var(--muted)] uppercase tracking-wider">
                    London, Paris & Lake Como Artistry
                  </span>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <span className="text-[11px] tracking-ultra-wide uppercase font-semibold text-[var(--accent)]">
                  The Artist Behind The Brush
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl text-[var(--foreground)] leading-tight">
                  “Makeup should feel like liquid silk, not a theatrical mask.”
                </h2>
                <div className="space-y-4 text-sm text-[var(--muted)] leading-relaxed">
                  <p>
                    Trained in classical portrait painting before mastering backstage couture across premier bridal fashion weeks, Kumkum Patel brings an architect’s understanding of facial symmetry and a painter’s sensitivity to light.
                  </p>
                  <p>
                    Rather than imposing a signature template onto every face, Kumkum listens attentively to your personal aesthetic, wedding gown neckline, and the venue’s ambient illumination to design a bespoke look that feels authentically and effortlessly you.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-3 text-xs tracking-wide">
                  <div className="px-3.5 py-2 rounded-lg bg-[var(--card)] border border-[var(--border)]">
                    Cruelty-Free & Hypoallergenic Kit
                  </div>
                  <div className="px-3.5 py-2 rounded-lg bg-[var(--card)] border border-[var(--border)]">
                    Multi-Day Destination Logistics
                  </div>
                  <div className="px-3.5 py-2 rounded-lg bg-[var(--card)] border border-[var(--border)]">
                    Private Mayfair Preview Atelier
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
        <section className="py-14 sm:py-24 max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading
            badge="Client Voices"
            title="Editorial & Bridal Acclaim"
            subtitle="Realistic sample reflections from brides and directors experiencing the Kumkum Patel accompaniment."
            centered
            className="mb-10 sm:mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="p-6 sm:p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs flex flex-col justify-between space-y-6"
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
        <section className="py-14 sm:py-24 bg-[var(--foreground)] text-[var(--background)] overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-6">
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
