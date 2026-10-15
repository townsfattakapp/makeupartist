import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Award, Star, ShieldCheck, HeartHandshake, Compass, Palette, Droplets, CheckCircle2, Clock } from 'lucide-react';
import { repository } from '@/lib/db/repository';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LookCard } from '@/components/ui/LookCard';
import { InstagramSection } from '@/components/ui/InstagramSection';
import { BeautyAnatomyCanvas } from '@/components/ui/BeautyAnatomyCanvas';

const SERVICE_THEMES = [
  {
    // Card 1: The Haute Bridal Signature Experience (Bridal • ₹45,000)
    badge: 'Signature Commission',
    badgeIcon: '👑',
    cardBorder: 'border-2 border-amber-500/60 hover:border-amber-400 shadow-lg shadow-amber-950/20 hover:shadow-2xl hover:shadow-amber-500/25',
    cardBg: 'bg-gradient-to-b from-amber-50/90 via-orange-50/40 to-amber-100/30 dark:from-[#25150a] dark:via-[#190e06] dark:to-[#110904]',
    topBar: 'bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500',
    ambientGlow: 'from-amber-500/30 via-orange-500/15 to-transparent',
    categoryBadge: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30 font-bold',
    priceText: 'text-amber-600 dark:text-amber-300 drop-shadow-sm',
    priceBadge: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/25',
    titleColor: 'text-[var(--foreground)] dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300',
    descriptionColor: 'text-[var(--muted)] dark:text-amber-100/75',
    inclusionHeading: 'text-amber-800 dark:text-amber-200/90',
    checkColor: 'text-amber-500 dark:text-amber-400',
    inclusionText: 'text-[var(--foreground)]/90 dark:text-amber-100/85',
    divider: 'border-amber-500/20',
    durationPill: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
    ctaBtn: 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/50',
    popular: true,
  },
  {
    // Card 2: Bridal Party & VIP Retinue Artistry (Bridal • ₹12,000)
    badge: 'Cohesive Elegance',
    badgeIcon: '🌸',
    cardBorder: 'border-2 border-rose-400/60 hover:border-rose-400 shadow-lg shadow-rose-950/20 hover:shadow-2xl hover:shadow-rose-500/25',
    cardBg: 'bg-gradient-to-b from-rose-50/90 via-pink-50/40 to-rose-100/30 dark:from-[#240e1b] dark:via-[#180912] dark:to-[#0f050b]',
    topBar: 'bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500',
    ambientGlow: 'from-rose-500/30 via-pink-500/15 to-transparent',
    categoryBadge: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30 font-bold',
    priceText: 'text-rose-600 dark:text-rose-300 drop-shadow-sm',
    priceBadge: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/25',
    titleColor: 'text-[var(--foreground)] dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-300',
    descriptionColor: 'text-[var(--muted)] dark:text-rose-100/75',
    inclusionHeading: 'text-rose-800 dark:text-rose-200/90',
    checkColor: 'text-rose-500 dark:text-rose-400',
    inclusionText: 'text-[var(--foreground)]/90 dark:text-rose-100/85',
    divider: 'border-rose-500/20',
    durationPill: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30',
    ctaBtn: 'bg-rose-500/20 hover:bg-rose-500 hover:text-black text-rose-700 dark:text-rose-200 border border-rose-500/40 font-semibold shadow-md shadow-rose-500/20 hover:shadow-lg hover:shadow-rose-500/40',
    popular: false,
  },
  {
    // Card 3: Red Carpet & Black Tie Gala Presence (Occasion • ₹22,000)
    badge: 'High-Impact Glam',
    badgeIcon: '💎',
    cardBorder: 'border-2 border-indigo-400/60 hover:border-indigo-400 shadow-lg shadow-indigo-950/20 hover:shadow-2xl hover:shadow-indigo-500/20',
    cardBg: 'bg-gradient-to-b from-indigo-50/90 via-sky-50/40 to-indigo-100/30 dark:from-[#0d1629] dark:via-[#080e1a] dark:to-[#050810]',
    topBar: 'bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-500',
    ambientGlow: 'from-indigo-500/30 via-purple-500/15 to-transparent',
    categoryBadge: 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30 font-bold',
    priceText: 'text-indigo-600 dark:text-indigo-300 drop-shadow-sm',
    priceBadge: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/25',
    titleColor: 'text-[var(--foreground)] dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300',
    descriptionColor: 'text-[var(--muted)] dark:text-indigo-100/75',
    inclusionHeading: 'text-indigo-800 dark:text-indigo-200/90',
    checkColor: 'text-indigo-500 dark:text-indigo-400',
    inclusionText: 'text-[var(--foreground)]/90 dark:text-indigo-100/85',
    divider: 'border-indigo-500/20',
    durationPill: 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30',
    ctaBtn: 'bg-indigo-500/20 hover:bg-indigo-500 hover:text-black text-indigo-700 dark:text-indigo-200 border border-indigo-500/40 font-semibold shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/40',
    popular: false,
  },
];

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
          </div>

          {/* Hero Beauty Content */}
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 text-center text-white py-6 sm:py-10 space-y-6 sm:space-y-8 my-auto">
            <div className="inline-flex items-center space-x-2.5 px-4 sm:px-5 py-2 rounded-full bg-black/60 backdrop-blur-md border border-[var(--accent)]/40 text-[11px] sm:text-xs tracking-widest sm:tracking-ultra-wide uppercase font-semibold text-[var(--accent)] shadow-xl animate-fadeIn">
              <Award className="w-3.5 h-3.5 shrink-0 text-[var(--accent)]" />
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

        {/* INTERACTIVE FACE CHART: ANATOMY OF HAUTE ARTISTRY (VECTOR ART) */}
        <BeautyAnatomyCanvas />

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
            {services.map((svc, idx) => {
              const theme = SERVICE_THEMES[idx % SERVICE_THEMES.length];
              return (
                <div
                  key={svc.id}
                  className={`group relative flex flex-col justify-between rounded-3xl ${theme.cardBg} ${theme.cardBorder} overflow-hidden p-6 sm:p-8 transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-[1.01]`}
                >
                  {/* Glowing Top Illuminated Bar */}
                  <div className={`absolute top-0 inset-x-0 h-1.5 ${theme.topBar} transition-all duration-300 group-hover:h-2`} />

                  {/* Ambient Radial Color Light in Background */}
                  <div className={`absolute -top-24 -right-24 w-60 h-60 rounded-full bg-gradient-to-br ${theme.ambientGlow} blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-700 opacity-60 group-hover:opacity-100`} />

                  {/* Sweeping Silk Glaze Animation on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-20" />

                  {/* Card Content */}
                  <div className="space-y-5 relative z-10">
                    {/* Top Row: Category & Price */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <span className={`text-[10px] tracking-ultra-wide uppercase font-bold px-3 py-1 rounded-full border ${theme.categoryBadge}`}>
                          {svc.category}
                        </span>
                        {theme.popular && (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[9px] tracking-wider uppercase font-bold bg-amber-500/25 text-amber-700 dark:text-amber-300 border border-amber-500/40 animate-pulse">
                            <span>{theme.badgeIcon}</span>
                            <span>{theme.badge}</span>
                          </span>
                        )}
                      </div>

                      <span className={`font-mono text-base sm:text-lg font-bold px-3 py-1 rounded-full border ${theme.priceBadge} ${theme.priceText}`}>
                        {svc.priceIndicative}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className={`font-serif text-2xl sm:text-[26px] leading-snug font-normal ${theme.titleColor} transition-colors duration-300`}>
                      {svc.title}
                    </h3>

                    {/* Short Description */}
                    <p className={`text-xs ${theme.descriptionColor} leading-relaxed font-light`}>
                      {svc.shortDescription}
                    </p>

                    {/* Key Inclusions with Animated Hover */}
                    <div className={`pt-4 border-t ${theme.divider} space-y-2.5`}>
                      <span className={`text-[11px] font-semibold uppercase tracking-wider block ${theme.inclusionHeading}`}>
                        Key Inclusions:
                      </span>
                      <ul className="space-y-2">
                        {svc.inclusions.slice(0, 3).map((inc, i) => (
                          <li
                            key={i}
                            className="flex items-start space-x-2.5 group/item transition-transform duration-200 hover:translate-x-1 text-xs"
                          >
                            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${theme.checkColor} transition-transform duration-200 group-hover/item:scale-125`} />
                            <span className={`${theme.inclusionText} leading-relaxed`}>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom Footer: Duration & Details Link */}
                  <div className={`pt-6 mt-6 border-t ${theme.divider} flex items-center justify-between gap-3 relative z-10`}>
                    <div className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono ${theme.durationPill}`}>
                      <Clock className="w-3.5 h-3.5" />
                      <span>~{svc.durationMinutes} Minutes</span>
                    </div>

                    <Link
                      href={`/services/${svc.slug}`}
                      className={`inline-flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs tracking-luxury uppercase font-semibold transition-all duration-300 group/btn ${theme.ctaBtn}`}
                    >
                      <span>Details & Prep</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
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
